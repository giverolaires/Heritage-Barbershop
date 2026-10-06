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
    <header className="sticky top-0 z-40 bg-[#f8f7f4]/95 backdrop-blur-md border-b border-[#1c1c1c]/10 transition-colors">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-5 flex items-center justify-between">
        
        {/* Logo in Cormorant Garamond italic */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-serif italic text-3xl sm:text-4xl text-[#1c1c1c] hover:text-[#876d3e] transition-colors tracking-tight whitespace-nowrap"
        >
          Heritage &amp; Blade
        </a>

        {/* Editorial Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[0.75rem] uppercase tracking-[0.14em] font-bold text-[#1c1c1c]/70">
          <button
            onClick={() => scrollTo('services')}
            className="hover:text-[#1c1c1c] transition-colors whitespace-nowrap"
          >
            The Menu
          </button>
          <button
            onClick={() => scrollTo('gallery')}
            className="hover:text-[#1c1c1c] transition-colors whitespace-nowrap"
          >
            The Portfolio
          </button>
          <button
            onClick={() => scrollTo('barbers')}
            className="hover:text-[#1c1c1c] transition-colors whitespace-nowrap"
          >
            The Team
          </button>
          <button
            onClick={() => scrollTo('social-feed')}
            className="hover:text-[#1c1c1c] transition-colors whitespace-nowrap"
          >
            Client Feed
          </button>
          <button
            onClick={() => scrollTo('reviews-quote')}
            className="hover:text-[#1c1c1c] transition-colors whitespace-nowrap"
          >
            Reviews
          </button>
        </nav>

        {/* Primary Action Button */}
        <div className="flex items-center gap-3">
          {confirmedCount > 0 && (
            <button
              onClick={onOpenMyAppointments}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#1c1c1c] bg-white border border-[#1c1c1c]/15 hover:border-[#1c1c1c]/40 transition-colors whitespace-nowrap shadow-sm"
              title="View your booked appointments"
            >
              <Calendar className="w-3.5 h-3.5 text-[#876d3e]" />
              <span>Bookings ({confirmedCount})</span>
            </button>
          )}

          <button
            onClick={onOpenBooking}
            className="btn-elegant px-5 py-2.5 sm:px-6 sm:py-3 text-[0.7rem] whitespace-nowrap shadow-sm"
          >
            Secure Appointment
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1c1c1c] hover:bg-black/5 rounded transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#ffffff] border-b border-[#1c1c1c]/10 px-6 py-6 space-y-4 shadow-lg">
          <nav className="flex flex-col space-y-3.5 text-xs uppercase tracking-[0.15em] font-bold text-[#1c1c1c]/80">
            <button
              onClick={() => scrollTo('services')}
              className="text-left py-1 hover:text-[#876d3e] transition-colors"
            >
              The Menu
            </button>
            <button
              onClick={() => scrollTo('gallery')}
              className="text-left py-1 hover:text-[#876d3e] transition-colors"
            >
              The Portfolio
            </button>
            <button
              onClick={() => scrollTo('barbers')}
              className="text-left py-1 hover:text-[#876d3e] transition-colors"
            >
              The Team
            </button>
            <button
              onClick={() => scrollTo('social-feed')}
              className="text-left py-1 hover:text-[#876d3e] transition-colors"
            >
              Client Feed
            </button>
            <button
              onClick={() => scrollTo('reviews-quote')}
              className="text-left py-1 hover:text-[#876d3e] transition-colors"
            >
              Reviews
            </button>
          </nav>
          <div className="pt-4 border-t border-[#1c1c1c]/10 flex flex-col gap-2.5">
            {confirmedCount > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyAppointments();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#1c1c1c] bg-[#f8f7f4] border border-[#1c1c1c]/15"
              >
                <Calendar className="w-4 h-4 text-[#876d3e]" />
                <span>My Appointments ({confirmedCount})</span>
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="btn-elegant w-full py-3"
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>Secure Appointment</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
