import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Clock,
  User,
  Scissors,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Phone,
  Mail,
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

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setConfirmedAppointment(null);
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleAddon = (addon: BarberAddon) => {
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const totalCost = selectedService.price + addonsTotal;
  const totalDuration =
    selectedService.durationMinutes +
    selectedAddons.reduce((sum, a) => sum + a.durationMinutes, 0);

  const validateContactForm = () => {
    const errors: { [key: string]: string } = {};
    if (!clientName.trim()) {
      errors.name = 'Full name is required';
    }
    if (!clientPhone.trim() || clientPhone.replace(/\D/g, '').length < 8) {
      errors.phone = 'Valid phone number required for SMS update';
    }
    if (!clientEmail.trim() || !clientEmail.includes('@') || !clientEmail.includes('.')) {
      errors.email = 'Valid email address required';
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
      const textToCopy = `Appointment ${confirmedAppointment.bookingRef} at Heritage & Blade: ${confirmedAppointment.service.name} with ${confirmedAppointment.barber.name} on ${confirmedAppointment.date} at ${confirmedAppointment.timeSlot}`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            setCopiedCode(true);
            setTimeout(() => setCopiedCode(false), 2500);
          })
          .catch(() => {
            setCopiedCode(true);
            setTimeout(() => setCopiedCode(false), 2500);
          });
      } else {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2500);
      }
    }
  };

  const handleDownloadCalendar = () => {
    if (!confirmedAppointment) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Heritage and Blade Barbershop//EN
BEGIN:VEVENT
SUMMARY:${confirmedAppointment.service.name} - Heritage & Blade
DESCRIPTION:Barber: ${confirmedAppointment.barber.name}\\nService: ${confirmedAppointment.service.name}\\nTotal: $${confirmedAppointment.totalPrice}\\nBooking Reference: ${confirmedAppointment.bookingRef}
LOCATION:Heritage & Blade, 418 St. Clair Ave, Suite 4
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-[#f8f7f4] border border-[#1c1c1c]/15 shadow-2xl overflow-hidden text-[#1c1c1c]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-white border-b border-[#1c1c1c]/10 flex items-center justify-between shrink-0">
          <div>
            <span className="meta-tag">
              {step === 5 ? 'Confirmed' : `Step ${step} of 4`}
            </span>
            <h2 className="serif-display text-2xl sm:text-3xl text-[#1c1c1c] mt-0.5">
              {step === 5 ? 'Chair Reserved' : 'Secure Your Chair'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#1c1c1c]/60 hover:text-[#1c1c1c] hover:bg-black/5 rounded transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Tabs */}
        {step < 5 && (
          <div className="grid grid-cols-4 bg-[#f1efe9] border-b border-[#1c1c1c]/10 text-[0.68rem] uppercase tracking-wider font-bold text-center">
            <button
              onClick={() => setStep(1)}
              className={`py-2.5 transition-colors border-b-2 ${
                step === 1
                  ? 'border-[#876d3e] text-[#1c1c1c] bg-white'
                  : 'border-transparent text-[#1c1c1c]/60'
              }`}
            >
              1. Service
            </button>
            <button
              onClick={() => setStep(2)}
              className={`py-2.5 transition-colors border-b-2 ${
                step === 2
                  ? 'border-[#876d3e] text-[#1c1c1c] bg-white'
                  : 'border-transparent text-[#1c1c1c]/60'
              }`}
            >
              2. Barber
            </button>
            <button
              onClick={() => (step > 2 ? setStep(3) : null)}
              disabled={step < 2}
              className={`py-2.5 transition-colors border-b-2 ${
                step === 3
                  ? 'border-[#876d3e] text-[#1c1c1c] bg-white'
                  : 'border-transparent text-[#1c1c1c]/60'
              }`}
            >
              3. Date &amp; Time
            </button>
            <button
              onClick={() => (step > 3 ? setStep(4) : null)}
              disabled={step < 3}
              className={`py-2.5 transition-colors border-b-2 ${
                step === 4
                  ? 'border-[#876d3e] text-[#1c1c1c] bg-white'
                  : 'border-transparent text-[#1c1c1c]/60'
              }`}
            >
              4. Contact
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">

          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="serif-display text-xl text-[#1c1c1c]">Select Primary Treatment</h3>
                <p className="text-xs text-[#1c1c1c]/60 mt-0.5">
                  Every chair session includes tailored consultation, hot towel nape shave, and tonic finish.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((srv) => {
                  const isSelected = selectedService.id === srv.id;
                  return (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedService(srv)}
                      className={`p-4 bg-white border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#876d3e] ring-2 ring-[#876d3e]/20 shadow-sm'
                          : 'border-[#1c1c1c]/10 hover:border-[#1c1c1c]/30'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="serif-display font-semibold text-lg text-[#1c1c1c]">
                          {srv.name}
                        </span>
                        <span className="font-serif text-lg font-bold text-[#876d3e] tabular-nums">
                          ${srv.price}
                        </span>
                      </div>
                      <div className="text-[0.68rem] uppercase tracking-wider text-[#1c1c1c]/50 font-bold mt-1">
                        {srv.durationMinutes} MIN · {srv.category}
                      </div>
                      <p className="text-xs text-[#1c1c1c]/70 mt-2 line-clamp-2">
                        {srv.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Addons enhancement */}
              <div className="pt-4 border-t border-[#1c1c1c]/10 space-y-3">
                <span className="meta-tag">Optional Enhancements</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ADDONS.map((addon) => {
                    const isChecked = selectedAddons.some((a) => a.id === addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon)}
                        className={`p-3 bg-white border cursor-pointer transition-all flex items-center justify-between ${
                          isChecked
                            ? 'border-[#876d3e] ring-1 ring-[#876d3e]'
                            : 'border-[#1c1c1c]/10 hover:border-[#1c1c1c]/30'
                        }`}
                      >
                        <div className="pr-2">
                          <div className="text-xs font-semibold text-[#1c1c1c]">{addon.name}</div>
                          <div className="text-[11px] text-[#1c1c1c]/60">+{addon.durationMinutes}m · {addon.description}</div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-serif font-bold text-[#876d3e] text-sm tabular-nums">+${addon.price}</span>
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center ${
                              isChecked
                                ? 'bg-[#876d3e] border-[#876d3e] text-white'
                                : 'border-[#1c1c1c]/30'
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
                <h3 className="serif-display text-xl text-[#1c1c1c]">Select Master Barber</h3>
                <p className="text-xs text-[#1c1c1c]/60 mt-0.5">
                  Choose your dedicated craftsman or opt for the earliest open chair.
                </p>
              </div>

              <div
                onClick={() => {
                  setAnyBarber(true);
                  setSelectedBarber(null);
                }}
                className={`p-4 bg-white border cursor-pointer transition-all flex items-center justify-between ${
                  anyBarber
                    ? 'border-[#876d3e] ring-2 ring-[#876d3e]/20'
                    : 'border-[#1c1c1c]/10 hover:border-[#1c1c1c]/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f8f7f4] flex items-center justify-center text-[#876d3e]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="serif-display font-semibold text-lg text-[#1c1c1c]">
                      First Available Craftsman
                    </div>
                    <div className="text-xs text-[#1c1c1c]/60">Recommended for optimal schedule flexibility</div>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${anyBarber ? 'border-[#876d3e] bg-[#876d3e]' : 'border-[#1c1c1c]/30'}`}>
                  {anyBarber && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>

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
                      className={`p-4 bg-white border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isSelected
                          ? 'border-[#876d3e] ring-2 ring-[#876d3e]/20'
                          : 'border-[#1c1c1c]/10 hover:border-[#1c1c1c]/30'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={barber.avatarUrl}
                          alt={barber.name}
                          className="w-14 h-14 object-cover border border-[#1c1c1c]/10 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="serif-display font-semibold text-lg text-[#1c1c1c]">{barber.name}</span>
                            <span className="text-[10px] uppercase font-bold text-[#876d3e] border border-[#876d3e]/30 px-1.5 py-0.5">
                              {barber.badge}
                            </span>
                          </div>
                          <div className="text-xs text-[#1c1c1c]/60 mt-0.5">
                            <span>{barber.experienceYears} Years Exp</span>
                            <span className="mx-1.5">·</span>
                            <span>{barber.rating}★ ({barber.reviewCount} cuts)</span>
                          </div>
                          <div className="text-xs text-[#1c1c1c]/80 mt-1">{barber.specialty}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[0.68rem] uppercase tracking-wider text-[#1c1c1c]/50 font-bold">Chairs</span>
                        <div className="text-xs text-[#1c1c1c] font-semibold">Mon – Sat</div>
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
                <h3 className="serif-display text-xl text-[#1c1c1c]">Select Date &amp; Window</h3>
                <p className="text-xs text-[#1c1c1c]/60 mt-0.5">
                  We guarantee single-chair arrival punctuality.
                </p>
              </div>

              <div>
                <label className="block text-[0.68rem] uppercase tracking-wider text-[#876d3e] mb-2 font-bold">
                  Select Day
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {availableDates.map((item) => {
                    const isSelected = selectedDate === item.dateStr;
                    return (
                      <button
                        key={item.dateStr}
                        onClick={() => setSelectedDate(item.dateStr)}
                        className={`flex flex-col items-center justify-center p-3 rounded min-w-[70px] border transition-all ${
                          isSelected
                            ? 'bg-[#1c1c1c] text-[#f8f7f4] border-[#1c1c1c] font-semibold shadow-md'
                            : 'bg-white text-[#1c1c1c]/70 border-[#1c1c1c]/10 hover:border-[#1c1c1c]/30'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-bold">{item.dayName}</span>
                        <span className="serif-display text-xl font-bold tabular-nums">{item.dayNumber}</span>
                        <span className="text-[10px] opacity-75">{item.monthName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[0.68rem] uppercase tracking-wider text-[#876d3e] mb-2 font-bold">
                  Chair Arrival Times ({selectedDate})
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {TIME_SLOTS.map((time) => {
                    const isSelected = selectedTimeSlot === time;
                    return (
                      <button
                        key={time}
                        onClick={() => setSelectedTimeSlot(time)}
                        className={`py-2 px-3 text-xs font-semibold border text-center transition-all tabular-nums ${
                          isSelected
                            ? 'bg-[#1c1c1c] text-white border-[#1c1c1c]'
                            : 'bg-white border-[#1c1c1c]/15 text-[#1c1c1c]/80 hover:border-[#1c1c1c]'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 bg-white border border-[#1c1c1c]/10 text-xs text-[#1c1c1c]/70 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#876d3e] shrink-0" />
                <span>
                  Expected chair duration: <strong className="text-[#1c1c1c]">{totalDuration} minutes</strong> including consultation.
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: Client Info */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="serif-display text-xl text-[#1c1c1c]">Patron Contact Details</h3>
                <p className="text-xs text-[#1c1c1c]/60 mt-0.5">
                  We send an SMS confirmation code and an appointment pass.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1c1c1c] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => {
                      setClientName(e.target.value);
                      if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                    }}
                    placeholder="e.g. Thomas Shelby"
                    className="w-full bg-white border border-[#1c1c1c]/20 rounded px-3.5 py-2.5 text-sm text-[#1c1c1c] focus:outline-none focus:border-[#876d3e]"
                  />
                  {formErrors.name && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1c1c1c] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => {
                        setClientPhone(e.target.value);
                        if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                      }}
                      placeholder="e.g. (555) 234-5678"
                      className="w-full bg-white border border-[#1c1c1c]/20 rounded px-3.5 py-2.5 text-sm text-[#1c1c1c] focus:outline-none focus:border-[#876d3e]"
                    />
                    {formErrors.phone && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1c1c1c] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => {
                        setClientEmail(e.target.value);
                        if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                      }}
                      placeholder="e.g. thomas@example.com"
                      className="w-full bg-white border border-[#1c1c1c]/20 rounded px-3.5 py-2.5 text-sm text-[#1c1c1c] focus:outline-none focus:border-[#876d3e]"
                    />
                    {formErrors.email && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1c1c1c] mb-1">
                    Style Notes or Requests (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    placeholder="e.g. Prefer scissors on top, skin fade on sides, sensitive skin around neck."
                    className="w-full bg-white border border-[#1c1c1c]/20 rounded px-3.5 py-2 text-sm text-[#1c1c1c] focus:outline-none focus:border-[#876d3e]"
                  />
                </div>
              </div>

              {/* Cost review */}
              <div className="bg-white p-4 border border-[#1c1c1c]/10 space-y-2 text-xs">
                <div className="flex justify-between text-[#1c1c1c]/70">
                  <span>{selectedService.name}</span>
                  <span className="font-serif font-bold text-sm text-[#1c1c1c] tabular-nums">${selectedService.price}</span>
                </div>
                {selectedAddons.map((a) => (
                  <div key={a.id} className="flex justify-between text-[#1c1c1c]/60">
                    <span>+ {a.name}</span>
                    <span className="tabular-nums">+${a.price}</span>
                  </div>
                ))}
                <div className="border-t border-[#1c1c1c]/10 pt-2 flex justify-between items-center text-sm font-semibold">
                  <span className="text-[#1c1c1c]">Total Payable in Chair</span>
                  <span className="serif-display text-xl text-[#876d3e] font-bold tabular-nums">${totalCost}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Confirmed Pass */}
          {step === 5 && confirmedAppointment && (
            <div className="space-y-6 text-center py-2">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#876d3e]/10 border border-[#876d3e] flex items-center justify-center text-[#876d3e]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="serif-display text-3xl font-bold text-[#1c1c1c]">
                  Chair Reserved
                </h3>
                <p className="text-xs text-[#1c1c1c]/60 mt-1">
                  We look forward to welcoming you, {confirmedAppointment.clientName}.
                </p>
              </div>

              {/* Pass Card */}
              <div className="max-w-md mx-auto bg-white border border-[#1c1c1c]/15 p-6 text-left space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-[#1c1c1c]/10">
                  <div>
                    <span className="meta-tag">Booking Reference</span>
                    <div className="serif-display text-2xl font-bold text-[#876d3e] tracking-widest">
                      {confirmedAppointment.bookingRef}
                    </div>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs border border-[#1c1c1c]/20 hover:border-[#1c1c1c] text-[#1c1c1c]"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="text-[#1c1c1c]/50">Date &amp; Arrival</div>
                    <div className="font-semibold text-[#1c1c1c] mt-0.5">{confirmedAppointment.date}</div>
                    <div className="text-[#876d3e] font-bold">{confirmedAppointment.timeSlot}</div>
                  </div>
                  <div>
                    <div className="text-[#1c1c1c]/50">Master Barber</div>
                    <div className="font-semibold text-[#1c1c1c] mt-0.5">{confirmedAppointment.barber.name}</div>
                    <div className="text-[#1c1c1c]/60">{confirmedAppointment.barber.title}</div>
                  </div>
                </div>

                <div className="text-xs pt-3 border-t border-[#1c1c1c]/10">
                  <div className="text-[#1c1c1c]/50">Treatment:</div>
                  <div className="text-[#1c1c1c] font-semibold">{confirmedAppointment.service.name}</div>
                  {confirmedAppointment.addons.length > 0 && (
                    <div className="text-[#1c1c1c]/60 mt-0.5">
                      + {confirmedAppointment.addons.map((a) => a.name).join(', ')}
                    </div>
                  )}
                  <div className="mt-2 text-right serif-display text-xl font-bold text-[#876d3e] tabular-nums">
                    Total: ${confirmedAppointment.totalPrice}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadCalendar}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-bold text-[#1c1c1c] bg-white border border-[#1c1c1c]/20 hover:border-[#1c1c1c] transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#876d3e]" />
                  <span>Download .ICS Calendar Pass</span>
                </button>
                <button
                  onClick={onClose}
                  className="btn-elegant px-6 py-2.5 text-[0.7rem]"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Bar Navigation (Steps 1-4) */}
        {step < 5 && (
          <div className="px-6 py-4 bg-white border-t border-[#1c1c1c]/10 flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                onClick={() => setStep((step - 1) as any)}
                className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-bold text-[#1c1c1c]/70 hover:text-[#1c1c1c]"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div className="text-xs text-[#1c1c1c]/60">
                Selected: <strong className="text-[#1c1c1c]">{selectedService.name}</strong> (${totalCost})
              </div>
            )}

            <div>
              {step < 4 ? (
                <button
                  onClick={() => setStep((step + 1) as any)}
                  className="btn-elegant px-5 py-2.5 text-[0.7rem]"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleFinalizeBooking}
                  className="btn-elegant px-6 py-2.5 text-[0.7rem]"
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
