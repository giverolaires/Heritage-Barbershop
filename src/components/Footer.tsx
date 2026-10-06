import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-[#0b0c0f] text-[#c0bbb2] border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <span className="text-2xl font-serif font-bold text-[#f8f5ee] tracking-wider">
              HERITAGE &amp; BLADE
            </span>
            <p className="text-xs text-[#8c867a] leading-relaxed max-w-xs">
              An authentic barbershop devoted to classical scissor craft, skin fades, and hot-towel straight-razor shaving. Est. 2018.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="px-4 py-2 text-xs font-semibold text-[#0d0f12] bg-[#c59b27] hover:bg-[#d8ab34] rounded transition-colors"
              >
                Book Appointment
              </button>
            </div>
          </div>

          {/* Hours Col */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#f8f5ee] font-semibold">
              Studio Hours
            </h4>
            <div className="space-y-1.5 text-xs text-[#8c867a]">
              <div className="flex justify-between">
                <span>Monday – Friday</span>
                <span className="text-[#f8f5ee] tabular-nums">8:00 AM – 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="text-[#f8f5ee] tabular-nums">8:00 AM – 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="text-[#f8f5ee] tabular-nums">10:00 AM – 5:00 PM</span>
              </div>
              <p className="text-[11px] text-[#6e685d] pt-2">
                *Early 7:30 AM executive slots available upon request.
              </p>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#f8f5ee] font-semibold">
              Location &amp; Inquiries
            </h4>
            <div className="space-y-2 text-xs text-[#8c867a]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                <span>418 St. Clair Ave, Suite 4<br />Toronto / Midtown District</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#c59b27] shrink-0" />
                <span>(555) 234-5678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#c59b27] shrink-0" />
                <span>appointments@heritageblade.com</span>
              </div>
            </div>
          </div>

          {/* Shop Policies */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#f8f5ee] font-semibold">
              Chair Policies
            </h4>
            <ul className="space-y-1.5 text-xs text-[#8c867a]">
              <li>· Punctuality: Please arrive 5 minutes prior to appointment.</li>
              <li>· Cancellation: 4-hour advance notice appreciated.</li>
              <li>· Payment: Major cards, contactless Apple/Google Pay, and cash.</li>
              <li>· Walk-ins: Subject to daily chair availability.</li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6e685d]">
          <div>
            &copy; {new Date().getFullYear()} Heritage &amp; Blade Craft Barbershop. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
