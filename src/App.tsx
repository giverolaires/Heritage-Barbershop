import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HaircutGallery } from './components/HaircutGallery';
import { PricingSection } from './components/PricingSection';
import { SocialFeedSection } from './components/SocialFeedSection';
import { BarberTeamSection } from './components/BarberTeamSection';
import { Footer } from './components/Footer';
import { BookingSystem } from './components/BookingSystem';
import { MyAppointmentsDrawer } from './components/MyAppointmentsDrawer';
import { Appointment } from './data/barbershopData';
import { CheckCircle2, Scissors } from 'lucide-react';

const STORAGE_KEY = 'heritage_blade_appointments';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);
  const [preselectedBarberId, setPreselectedBarberId] = useState<string | null>(null);
  const [isAppointmentsOpen, setIsAppointmentsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Appointments state with LocalStorage persistence
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load appointments from localStorage', e);
    }
    // Default initial mock confirmed appointment so user immediately sees how it looks in "My Appointments"
    return [
      {
        id: 'apt-demo-1',
        bookingRef: 'HB-8492',
        service: {
          id: 'srv-signature-cut',
          name: 'The Signature Haircut',
          category: 'cuts',
          price: 45,
          durationMinutes: 45,
          description: 'Precision scissor and clipper craft tailored to your head shape.',
          includes: ['Consultation', 'Bespoke clipper / shear cut', 'Hot towel nape shave'],
        },
        addons: [],
        barber: {
          id: 'barber-marcus',
          name: 'Marcus Vance',
          title: 'Master Craftsman & Co-Founder',
          experienceYears: 14,
          specialty: 'Architectural Fades & Beard Sculpting',
          bio: 'Trained in traditional London barbering.',
          rating: 4.98,
          reviewCount: 384,
          avatarUrl: '/src/assets/images/barber_craft_action_1791282769913.jpg',
          workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        },
        date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        timeSlot: '10:45 AM',
        clientName: 'Alexander Hayes',
        clientPhone: '(555) 234-8899',
        clientEmail: 'alex.hayes@example.com',
        notes: 'Low skin fade, natural scissor length on top.',
        totalPrice: 45,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    } catch (e) {
      console.error('Failed to save appointments to localStorage', e);
    }
  }, [appointments]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenBooking = (serviceId?: string, barberId?: string) => {
    setPreselectedServiceId(serviceId || null);
    setPreselectedBarberId(barberId || null);
    setIsBookingOpen(true);
  };

  const handleBookingConfirmed = (newAppointment: Appointment) => {
    setAppointments([newAppointment, ...appointments]);
    showToast(`Chair confirmed for ${newAppointment.date} at ${newAppointment.timeSlot} (${newAppointment.bookingRef})`);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a))
    );
    showToast('Appointment has been cancelled.');
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const confirmedCount = appointments.filter((a) => a.status === 'confirmed').length;

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#1c1c1c] selection:bg-[#876d3e] selection:text-white flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenMyAppointments={() => setIsAppointmentsOpen(true)}
        activeSection="home"
        confirmedCount={confirmedCount}
      />

      {/* Main Barbershop Sections */}
      <main className="flex-1">
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onExploreGallery={() => scrollTo('gallery')}
          onExplorePricing={() => scrollTo('services')}
        />

        <HaircutGallery
          onBookStyle={(serviceId) => handleOpenBooking(serviceId)}
        />

        <PricingSection
          onSelectServiceToBook={(serviceId) => handleOpenBooking(serviceId)}
        />

        <BarberTeamSection
          onBookWithBarber={(barberId) => handleOpenBooking(undefined, barberId)}
        />

        <SocialFeedSection
          onBookAppointment={() => handleOpenBooking()}
        />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Booking Modal System */}
      <BookingSystem
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedServiceId={preselectedServiceId}
        preselectedBarberId={preselectedBarberId}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* My Appointments Drawer */}
      <MyAppointmentsDrawer
        isOpen={isAppointmentsOpen}
        onClose={() => setIsAppointmentsOpen(false)}
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
        onBookNew={() => {
          setIsAppointmentsOpen(false);
          handleOpenBooking();
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1c1c1c] border border-[#876d3e] text-[#f8f7f4] px-4 py-3 rounded shadow-2xl flex items-center gap-3 text-xs animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-[#876d3e] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
