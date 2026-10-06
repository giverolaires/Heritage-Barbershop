import React, { useState } from 'react';
import { Menu, X, Calendar, Scissors } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenMyAppointments: () => void;
  activeSection: string;
  confirmedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenMyAppointments,
  confirmedCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0d0f12]/95 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element in display face, no pills/subtitles) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-2xl sm:text-3xl font-serif tracking-wider font-semibold text-[#f4efe6] hover:text-[#c59b27] transition-colors whitespace-nowrap"
        >
          HERITAGE &amp; BLADE
        </a>

        {/* Zone 2: Clean 4-6 text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#c0bbb2]">
          <button
            onClick={() => scrollTo('services')}
            className="hover:text-[#f4efe6] transition-colors whitespace-nowrap"
          >
            Services &amp; Pricing
          </button>
          <button
            onClick={() => scrollTo('gallery')}
            className="hover:text-[#f4efe6] transition-colors whitespace-nowrap"
          >
            Haircut Gallery
          </button>
          <button
            onClick={() => scrollTo('barbers')}
            className="hover:text-[#f4efe6] transition-colors whitespace-nowrap"
          >
            Master Barbers
          </button>
          <button
            onClick={() => scrollTo('social-feed')}
            className="hover:text-[#f4efe6] transition-colors whitespace-nowrap"
          >
            Client Feed
          </button>
          <button
            onClick={() => scrollTo('testimonials')}
            className="hover:text-[#f4efe6] transition-colors whitespace-nowrap"
          >
            Reviews
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {confirmedCount > 0 && (
            <button
              onClick={onOpenMyAppointments}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#e4decb] border border-white/15 rounded-md hover:bg-white/5 transition-colors whitespace-nowrap"
              title="View your booked appointments"
            >
              <Calendar className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Bookings ({confirmedCount})</span>
            </button>
          )}

          <button
            onClick={onOpenBooking}
            className="px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-medium text-[#0d0f12] bg-[#c59b27] hover:bg-[#d8ab34] rounded-md transition-colors whitespace-nowrap shadow-sm font-semibold tracking-wide"
          >
            Book Appointment
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#c0bbb2] hover:text-[#f4efe6] hover:bg-white/5 rounded-md transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#12151b] border-b border-white/10 px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-3 text-base text-[#c0bbb2]">
            <button
              onClick={() => scrollTo('services')}
              className="text-left py-1 hover:text-[#f4efe6] transition-colors"
            >
              Services &amp; Pricing
            </button>
            <button
              onClick={() => scrollTo('gallery')}
              className="text-left py-1 hover:text-[#f4efe6] transition-colors"
            >
              Haircut Gallery
            </button>
            <button
              onClick={() => scrollTo('barbers')}
              className="text-left py-1 hover:text-[#f4efe6] transition-colors"
            >
              Master Barbers
            </button>
            <button
              onClick={() => scrollTo('social-feed')}
              className="text-left py-1 hover:text-[#f4efe6] transition-colors"
            >
              Client Feed &amp; Updates
            </button>
            <button
              onClick={() => scrollTo('testimonials')}
              className="text-left py-1 hover:text-[#f4efe6] transition-colors"
            >
              Verified Reviews
            </button>
          </nav>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            {confirmedCount > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyAppointments();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-[#e4decb] border border-white/15 rounded-md"
              >
                <Calendar className="w-4 h-4 text-[#c59b27]" />
                <span>My Appointments ({confirmedCount})</span>
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[#0d0f12] bg-[#c59b27] rounded-md"
            >
              <Scissors className="w-4 h-4" />
              <span>Book Appointment Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
