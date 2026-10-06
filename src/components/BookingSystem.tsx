import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Calendar as CalendarIcon,
  Clock,
  User,
  Scissors,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Phone,
  Mail,
  FileText,
  AlertCircle,
  Copy,
  Download,
  CheckCircle2,
} from 'lucide-react';
import {
  SERVICES,
  ADDONS,
  BARBERS,
  TIME_SLOTS,
  BarberService,
  BarberAddon,
  BarberMaster,
  Appointment,
} from '../data/barbershopData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string | null;
  preselectedBarberId?: string | null;
  onBookingConfirmed: (appointment: Appointment) => void;
}

export const BookingSystem: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  preselectedBarberId,
  onBookingConfirmed,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Selections
  const [selectedService, setSelectedService] = useState<BarberService>(
    SERVICES.find((s) => s.id === preselectedServiceId) || SERVICES[0]
  );
  const [selectedAddons, setSelectedAddons] = useState<BarberAddon[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<BarberMaster | null>(
    BARBERS.find((b) => b.id === preselectedBarberId) || BARBERS[0]
  );
  const [anyBarber, setAnyBarber] = useState<boolean>(false);

  // Date generation (next 14 days)
  const today = new Date();
  const availableDates = Array.from({ length: 14 }).map((_, idx) => {
    const d = new Date();
    d.setDate(today.getDate() + idx);
    return {
      dateStr: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      monthName: d.toLocaleDateString('en-US', { month: 'short' }),
      isSunday: d.getDay() === 0,
    };
  });

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0].dateStr);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(TIME_SLOTS[2]);

  // Client info
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Created appointment result
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Update preselected props when modal opens or props change
  useEffect(() => {
    if (preselectedServiceId) {
      const match = SERVICES.find((s) => s.id === preselectedServiceId);
      if (match) setSelectedService(match);
    }
    if (preselectedBarberId) {
      const match = BARBERS.find((b) => b.id === preselectedBarberId);
      if (match) {
        setSelectedBarber(match);
        setAnyBarber(false);
      }
    }
  }, [preselectedServiceId, preselectedBarberId, isOpen]);

  // Reset step if closed and reopen
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setConfirmedAppointment(null);
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Addon toggling
  const toggleAddon = (addon: BarberAddon) => {
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  // Calculations
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const totalCost = selectedService.price + addonsTotal;
  const totalDuration =
    selectedService.durationMinutes +
    selectedAddons.reduce((sum, a) => sum + a.durationMinutes, 0);

  // Validate step 4
  const validateContactForm = () => {
    const errors: { [key: string]: string } = {};
    if (!clientName.trim()) {
      errors.name = 'Please enter your full name';
    }
    if (!clientPhone.trim() || clientPhone.replace(/\D/g, '').length < 8) {
      errors.phone = 'Valid phone number is required for SMS confirmation';
    }
    if (!clientEmail.trim() || !clientEmail.includes('@') || !clientEmail.includes('.')) {
      errors.email = 'Valid email address is required for calendar invite';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFinalizeBooking = () => {
    if (!validateContactForm()) return;

    const assignedBarber = anyBarber
      ? BARBERS[Math.floor(Math.random() * BARBERS.length)]
      : (selectedBarber || BARBERS[0]);

    const randomRefNum = Math.floor(1000 + Math.random() * 9000);
    const bookingRef = `HB-${randomRefNum}`;

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      bookingRef,
      service: selectedService,
      addons: selectedAddons,
      barber: assignedBarber,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim(),
      notes: clientNotes.trim() || undefined,
      totalPrice: totalCost,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    setConfirmedAppointment(newAppointment);
    onBookingConfirmed(newAppointment);
    setStep(5);
  };

  const handleCopyCode = () => {
    if (confirmedAppointment) {
      navigator.clipboard.writeText(
        `Appointment ${confirmedAppointment.bookingRef} at Heritage & Blade: ${confirmedAppointment.service.name} with ${confirmedAppointment.barber.name} on ${confirmedAppointment.date} at ${confirmedAppointment.timeSlot}`
      );
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  const handleDownloadCalendar = () => {
    if (!confirmedAppointment) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Heritage and Blade Barbershop//EN
BEGIN:VEVENT
SUMMARY:${confirmedAppointment.service.name} - Heritage & Blade Barbershop
DESCRIPTION:Barber: ${confirmedAppointment.barber.name}\\nService: ${confirmedAppointment.service.name}\\nTotal: $${confirmedAppointment.totalPrice}\\nBooking Reference: ${confirmedAppointment.bookingRef}
LOCATION:Heritage & Blade Barbershop, 418 St. Clair Ave
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `HeritageBlade-${confirmedAppointment.bookingRef}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-[#12141a] border border-white/15 rounded-lg shadow-2xl overflow-hidden text-[#ede7de]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#161922] border-b border-white/10 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#f8f5ee] tracking-wide">
              {step === 5 ? 'Appointment Confirmed' : 'Reserve Your Chair'}
            </h2>
            <div className="text-xs text-[#9d9688] mt-0.5 flex items-center gap-2">
              <span>Heritage &amp; Blade</span>
              <span aria-hidden="true">·</span>
              <span>418 St. Clair Ave</span>
              {step < 5 && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#c59b27]">Step {step} of 4</span>
                </>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#9d9688] hover:text-[#f8f5ee] hover:bg-white/5 rounded transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar (for Steps 1-4) */}
        {step < 5 && (
          <div className="grid grid-cols-4 bg-[#0e1015] border-b border-white/10 text-xs font-medium text-center">
            <button
              onClick={() => setStep(1)}
              className={`py-2.5 transition-colors border-b-2 ${
                step === 1
                  ? 'border-[#c59b27] text-[#c59b27] bg-[#161922]'
                  : step > 1
                  ? 'border-transparent text-[#e4decb]'
                  : 'border-transparent text-[#6e685d]'
              }`}
            >
              1. Service
            </button>
            <button
              onClick={() => setStep(2)}
              className={`py-2.5 transition-colors border-b-2 ${
                step === 2
                  ? 'border-[#c59b27] text-[#c59b27] bg-[#161922]'
                  : step > 2
                  ? 'border-transparent text-[#e4decb]'
                  : 'border-transparent text-[#6e685d]'
              }`}
            >
              2. Barber
            </button>
            <button
              onClick={() => (step > 2 ? setStep(3) : null)}
              disabled={step < 2}
              className={`py-2.5 transition-colors border-b-2 ${
                step === 3
                  ? 'border-[#c59b27] text-[#c59b27] bg-[#161922]'
                  : step > 3
                  ? 'border-transparent text-[#e4decb]'
                  : 'border-transparent text-[#6e685d]'
              }`}
            >
              3. Date &amp; Time
            </button>
            <button
              onClick={() => (step > 3 ? setStep(4) : null)}
              disabled={step < 3}
              className={`py-2.5 transition-colors border-b-2 ${
                step === 4
                  ? 'border-[#c59b27] text-[#c59b27] bg-[#161922]'
                  : 'border-transparent text-[#6e685d]'
              }`}
            >
              4. Client Details
            </button>
          </div>
        )}

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">

          {/* STEP 1: Select Service & Addons */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-[#f8f5ee]">Select Primary Service</h3>
                <p className="text-xs text-[#9d9688] mt-1">
                  Every service includes consultation, nape shave, and precision styling finish.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((srv) => {
                  const isSelected = selectedService.id === srv.id;
                  return (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedService(srv)}
                      className={`p-4 rounded border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#c59b27] bg-[#1d212c] shadow-md ring-1 ring-[#c59b27]'
                          : 'border-white/10 bg-[#151820] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="font-serif font-medium text-base text-[#f8f5ee]">
                          {srv.name}
                        </div>
                        <div className="text-sm font-semibold text-[#c59b27] tabular-nums">
                          ${srv.price}
                        </div>
                      </div>
                      <div className="text-xs text-[#8c867a] mt-1 flex items-center gap-2">
                        <span>{srv.durationMinutes} mins</span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">{srv.category}</span>
                      </div>
                      <p className="text-xs text-[#b0a99c] mt-2 line-clamp-2">
                        {srv.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Addons enhancement block */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[#f8f5ee]">Service Enhancements (Optional)</h4>
                    <p className="text-xs text-[#9d9688]">Enhance your session with artisanal treatments.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ADDONS.map((addon) => {
                    const isChecked = selectedAddons.some((a) => a.id === addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon)}
                        className={`p-3 rounded border cursor-pointer transition-all flex items-center justify-between ${
                          isChecked
                            ? 'border-[#c59b27] bg-[#1d212c]'
                            : 'border-white/10 bg-[#151820] hover:border-white/20'
                        }`}
                      >
                        <div className="pr-2">
                          <div className="text-xs font-medium text-[#f8f5ee]">{addon.name}</div>
                          <div className="text-[11px] text-[#8c867a]">+{addon.durationMinutes}m · {addon.description}</div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs font-semibold text-[#c59b27] tabular-nums">+${addon.price}</span>
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center ${
                              isChecked
                                ? 'bg-[#c59b27] border-[#c59b27] text-[#0d0f12]'
                                : 'border-white/30'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Choose Barber */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-[#f8f5ee]">Select Master Barber</h3>
                <p className="text-xs text-[#9d9688] mt-1">
                  Choose a specialist or opt for the earliest available chair.
                </p>
              </div>

              {/* Any available barber toggle */}
              <div
                onClick={() => {
                  setAnyBarber(true);
                  setSelectedBarber(null);
                }}
                className={`p-4 rounded border cursor-pointer transition-all flex items-center justify-between ${
                  anyBarber
                    ? 'border-[#c59b27] bg-[#1d212c] ring-1 ring-[#c59b27]'
                    : 'border-white/10 bg-[#151820] hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#202532] flex items-center justify-center text-[#c59b27]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#f8f5ee]">First Available Craftsman</div>
                    <div className="text-xs text-[#9d9688]">Recommended for optimal time slot flexibility</div>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${anyBarber ? 'border-[#c59b27] bg-[#c59b27]' : 'border-white/30'}`}>
                  {anyBarber && <div className="w-1.5 h-1.5 rounded-full bg-[#0d0f12]" />}
                </div>
              </div>

              {/* Master Barber Cards */}
              <div className="space-y-3">
                {BARBERS.map((barber) => {
                  const isSelected = !anyBarber && selectedBarber?.id === barber.id;
                  return (
                    <div
                      key={barber.id}
                      onClick={() => {
                        setAnyBarber(false);
                        setSelectedBarber(barber);
                      }}
                      className={`p-4 rounded border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isSelected
                          ? 'border-[#c59b27] bg-[#1d212c] ring-1 ring-[#c59b27]'
                          : 'border-white/10 bg-[#151820] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={barber.avatarUrl}
                          alt={barber.name}
                          className="w-14 h-14 rounded object-cover border border-white/15 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-serif font-medium text-base text-[#f8f5ee]">{barber.name}</span>
                            <span className="text-[11px] text-[#c59b27] border border-[#c59b27]/30 px-1.5 py-0.5 rounded">
                              {barber.badge}
                            </span>
                          </div>
                          <div className="text-xs text-[#8c867a] mt-0.5">
                            <span>{barber.experienceYears} Years Exp</span>
                            <span className="mx-1.5">·</span>
                            <span>{barber.rating}★ ({barber.reviewCount} reviews)</span>
                          </div>
                          <div className="text-xs text-[#b5ae9f] mt-1">{barber.specialty}</div>
                        </div>
                      </div>

                      <div className="text-right flex items-center sm:flex-col sm:items-end justify-between">
                        <span className="text-xs text-[#8c867a]">Schedule</span>
                        <span className="text-xs text-[#d6d0c2] font-medium">Mon - Sat</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Date & Time Picker */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-[#f8f5ee]">Select Date &amp; Arrival Window</h3>
                <p className="text-xs text-[#9d9688] mt-1">
                  We maintain a punctual single-chair guarantee. Please arrive 5 minutes prior to appointment.
                </p>
              </div>

              {/* 14-day horizontal strip */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8c867a] mb-2 font-medium">
                  Select Day
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {availableDates.map((item) => {
                    const isSelected = selectedDate === item.dateStr;
                    return (
                      <button
                        key={item.dateStr}
                        onClick={() => setSelectedDate(item.dateStr)}
                        className={`flex flex-col items-center justify-center p-3 rounded min-w-[70px] border transition-all ${
                          isSelected
                            ? 'bg-[#c59b27] text-[#0d0f12] border-[#c59b27] font-semibold shadow-md'
                            : 'bg-[#151820] text-[#c0bbb2] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <span className="text-[11px] uppercase">{item.dayName}</span>
                        <span className="text-lg font-bold tabular-nums">{item.dayNumber}</span>
                        <span className="text-[10px] opacity-75">{item.monthName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time slots */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8c867a] mb-2 font-medium">
                  Available Chairs on {selectedDate}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {TIME_SLOTS.map((time) => {
                    const isSelected = selectedTimeSlot === time;
                    return (
                      <button
                        key={time}
                        onClick={() => setSelectedTimeSlot(time)}
                        className={`py-2.5 px-3 rounded text-xs font-medium border text-center transition-all tabular-nums ${
                          isSelected
                            ? 'bg-[#1e2330] border-[#c59b27] text-[#c59b27] ring-1 ring-[#c59b27]'
                            : 'bg-[#151820] border-white/10 text-[#c0bbb2] hover:border-white/25 hover:text-[#f8f5ee]'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 bg-[#161922] rounded border border-white/10 text-xs text-[#9d9688] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#c59b27] shrink-0" />
                <span>
                  Expected chair duration: <strong className="text-[#f8f5ee]">{totalDuration} minutes</strong> including consultation and styling.
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: Client Information */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-[#f8f5ee]">Client Contact &amp; Preferences</h3>
                <p className="text-xs text-[#9d9688] mt-1">
                  We send an SMS confirmation and a downloadable calendar invite.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-[#c0bbb2] mb-1 font-medium">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => {
                        setClientName(e.target.value);
                        if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                      }}
                      placeholder="e.g. Thomas Shelby"
                      className="w-full bg-[#151820] border border-white/15 rounded px-3.5 py-2.5 text-sm text-[#f8f5ee] placeholder-[#6e685d] focus:outline-none focus:border-[#c59b27]"
                    />
                    <User className="w-4 h-4 text-[#6e685d] absolute right-3 top-3" />
                  </div>
                  {formErrors.name && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#c0bbb2] mb-1 font-medium">
                      Mobile Phone (for SMS) <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => {
                          setClientPhone(e.target.value);
                          if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                        }}
                        placeholder="e.g. (555) 234-5678"
                        className="w-full bg-[#151820] border border-white/15 rounded px-3.5 py-2.5 text-sm text-[#f8f5ee] placeholder-[#6e685d] focus:outline-none focus:border-[#c59b27]"
                      />
                      <Phone className="w-4 h-4 text-[#6e685d] absolute right-3 top-3" />
                    </div>
                    {formErrors.phone && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs text-[#c0bbb2] mb-1 font-medium">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => {
                          setClientEmail(e.target.value);
                          if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                        }}
                        placeholder="e.g. thomas@example.com"
                        className="w-full bg-[#151820] border border-white/15 rounded px-3.5 py-2.5 text-sm text-[#f8f5ee] placeholder-[#6e685d] focus:outline-none focus:border-[#c59b27]"
                      />
                      <Mail className="w-4 h-4 text-[#6e685d] absolute right-3 top-3" />
                    </div>
                    {formErrors.email && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#c0bbb2] mb-1 font-medium">
                    Notes or Style Requests (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    placeholder="e.g. Prefer scissors on top, skin fade on sides, sensitive skin around neck."
                    className="w-full bg-[#151820] border border-white/15 rounded px-3.5 py-2 text-sm text-[#f8f5ee] placeholder-[#6e685d] focus:outline-none focus:border-[#c59b27]"
                  />
                </div>
              </div>

              {/* Summary review box */}
              <div className="bg-[#161922] p-4 rounded border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-[#c0bbb2]">
                  <span>{selectedService.name}</span>
                  <span className="tabular-nums font-medium text-[#f8f5ee]">${selectedService.price}</span>
                </div>
                {selectedAddons.map((a) => (
                  <div key={a.id} className="flex justify-between text-[#8c867a]">
                    <span>+ {a.name}</span>
                    <span className="tabular-nums">+${a.price}</span>
                  </div>
                ))}
                <div className="border-t border-white/10 pt-2 flex justify-between items-center text-sm font-semibold">
                  <span className="text-[#f8f5ee]">Due in Chair (Cash / Card)</span>
                  <span className="text-[#c59b27] tabular-nums text-base">${totalCost}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Digital Appointment Pass & Confirmation */}
          {step === 5 && confirmedAppointment && (
            <div className="space-y-6 text-center py-2">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#c59b27]/10 border border-[#c59b27] flex items-center justify-center text-[#c59b27]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-[#f8f5ee]">
                  Chair Reserved Successfully
                </h3>
                <p className="text-xs text-[#9d9688] mt-1">
                  We look forward to welcoming you, {confirmedAppointment.clientName}.
                </p>
              </div>

              {/* Pass Card */}
              <div className="max-w-md mx-auto bg-[#171a23] border border-white/15 rounded-lg p-5 text-left space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#8c867a]">Booking Reference</span>
                    <div className="text-xl font-bold font-mono text-[#c59b27] tracking-widest">
                      {confirmedAppointment.bookingRef}
                    </div>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs border border-white/15 rounded hover:bg-white/5 text-[#c0bbb2]"
                    title="Copy booking details"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="text-[#8c867a]">Date &amp; Arrival</div>
                    <div className="font-semibold text-[#f8f5ee] mt-0.5">{confirmedAppointment.date}</div>
                    <div className="text-[#c59b27] font-medium">{confirmedAppointment.timeSlot}</div>
                  </div>
                  <div>
                    <div className="text-[#8c867a]">Master Craftsman</div>
                    <div className="font-semibold text-[#f8f5ee] mt-0.5">{confirmedAppointment.barber.name}</div>
                    <div className="text-[#8c867a]">{confirmedAppointment.barber.title}</div>
                  </div>
                </div>

                <div className="text-xs pt-2 border-t border-white/10">
                  <div className="text-[#8c867a]">Selected Service:</div>
                  <div className="text-[#f8f5ee] font-medium">{confirmedAppointment.service.name}</div>
                  {confirmedAppointment.addons.length > 0 && (
                    <div className="text-[#8c867a] mt-0.5">
                      + {confirmedAppointment.addons.map((a) => a.name).join(', ')}
                    </div>
                  )}
                  <div className="mt-2 text-right text-sm font-semibold text-[#c59b27] tabular-nums">
                    Total: ${confirmedAppointment.totalPrice}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadCalendar}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#f8f5ee] bg-white/10 hover:bg-white/15 rounded border border-white/10 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#c59b27]" />
                  <span>Download .ICS Calendar Event</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-semibold text-[#0d0f12] bg-[#c59b27] hover:bg-[#d8ab34] rounded transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Bar Navigation (Steps 1-4) */}
        {step < 5 && (
          <div className="px-6 py-4 bg-[#161922] border-t border-white/10 flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                onClick={() => setStep((step - 1) as any)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#c0bbb2] hover:text-[#f8f5ee] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div className="text-xs text-[#8c867a]">
                Selected: <span className="text-[#f8f5ee] font-medium">{selectedService.name}</span> (${totalCost})
              </div>
            )}

            <div className="flex items-center gap-3">
              {step < 4 ? (
                <button
                  onClick={() => setStep((step + 1) as any)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-[#0d0f12] bg-[#c59b27] hover:bg-[#d8ab34] rounded transition-colors tracking-wide"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleFinalizeBooking}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-semibold text-[#0d0f12] bg-[#c59b27] hover:bg-[#d8ab34] rounded transition-colors tracking-wide"
                >
                  <span>Confirm Reservation (${totalCost})</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
