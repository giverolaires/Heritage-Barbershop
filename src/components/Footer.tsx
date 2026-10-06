import React from 'react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-[#1c1c1c] text-[#f8f7f4] py-16 sm:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 text-center sm:text-left">
        
        <div className="flex flex-col sm:flex-row items-center sm:items-baseline justify-between mb-12">
          <h3 className="serif-display italic text-4xl sm:text-5xl text-[#f8f7f4] mb-4 sm:mb-0">
            H &amp; B
          </h3>
          <button
            onClick={onOpenBooking}
            className="px-6 py-2.5 text-[0.72rem] uppercase tracking-[0.16em] font-bold text-[#1c1c1c] bg-[#f8f7f4] hover:bg-white transition-colors"
          >
            Secure Your Chair
          </button>
        </div>

        {/* 3-Column Studio Grid matching Variation 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 text-left gap-8 sm:gap-14">
          <div>
            <span className="meta-tag text-[#f8f7f4]">Studio</span>
            <p className="text-xs sm:text-[0.85rem] mt-3 leading-relaxed opacity-60">
              418 St. Clair Ave, Suite 4<br />
              Toronto / Midtown District
            </p>
          </div>

          <div>
            <span className="meta-tag text-[#f8f7f4]">Hours</span>
            <p className="text-xs sm:text-[0.85rem] mt-3 leading-relaxed opacity-60">
              Mon–Fri: 8:00 – 20:00<br />
              Sat: 8:00 – 18:00<br />
              Sun: 10:00 – 17:00
            </p>
          </div>

          <div>
            <span className="meta-tag text-[#f8f7f4]">Direct</span>
            <p className="text-xs sm:text-[0.85rem] mt-3 leading-relaxed opacity-60">
              (555) 234-5678<br />
              appointments@heritageblade.com
            </p>
          </div>
        </div>

        {/* Editorial Divider */}
        <div className="editorial-line" style={{ background: '#ffffff', opacity: 0.12 }} />

        <div className="flex flex-col sm:flex-row items-center justify-between text-[0.68rem] opacity-50 tracking-wider uppercase font-medium">
          <p>© {new Date().getFullYear()} HERITAGE &amp; BLADE CRAFT BARBERSHOP</p>
          <div className="flex gap-6 mt-3 sm:mt-0">
            <span>CHAIR ETIQUETTE</span>
            <span>PRIVACY NOTICE</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
