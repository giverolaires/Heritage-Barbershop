import React from 'react';
import { ArrowRight, Clock, ShieldCheck, MapPin } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExploreGallery: () => void;
  onExplorePricing: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onExploreGallery,
  onExplorePricing,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#f8f7f4] border-b border-[#1c1c1c]/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-14 lg:py-20">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center min-h-[65vh]">
          
          {/* Left Column: Proposition & CTA */}
          <div className="lg:col-span-7 space-y-6">
            <span className="meta-tag">Mastering the Blade / Est. 2018</span>

            <h1 className="serif-display text-4xl sm:text-5xl lg:text-6xl text-[#1c1c1c] leading-[1.06] tracking-tight">
              Refinement for the Modern Man
            </h1>

            <p className="text-[#1c1c1c]/70 text-base sm:text-lg leading-relaxed max-w-xl font-light">
              Bespoke shear craft, surgical skin fades, and traditional hot towel straight-razor shaves. We treat grooming as an enduring art form — no rushed cuts, no assembly lines.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="btn-elegant"
              >
                <span>Secure Your Appointment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onExplorePricing}
                className="px-6 py-3 text-xs uppercase tracking-[0.14em] font-bold text-[#1c1c1c] bg-white border border-[#1c1c1c]/20 hover:border-[#1c1c1c] transition-colors"
              >
                The Menu
              </button>

              <button
                onClick={onExploreGallery}
                className="px-4 py-3 text-xs uppercase tracking-[0.14em] font-bold text-[#876d3e] hover:text-[#1c1c1c] transition-colors"
              >
                Craft Gallery &rarr;
              </button>
            </div>

            {/* Proof metrics with editorial hairline */}
            <div className="pt-8 border-t border-[#1c1c1c]/15 grid grid-cols-3 gap-4 text-xs sm:text-sm">
              <div>
                <div className="serif-display font-semibold text-xl sm:text-2xl text-[#1c1c1c]">4.95 / 5.0</div>
                <div className="text-[#1c1c1c]/60 text-xs mt-0.5">1,200+ Verified Visits</div>
              </div>
              <div>
                <div className="serif-display font-semibold text-xl sm:text-2xl text-[#1c1c1c]">3 Craftsmen</div>
                <div className="text-[#1c1c1c]/60 text-xs mt-0.5">London Academy Trained</div>
              </div>
              <div>
                <div className="serif-display font-semibold text-xl sm:text-2xl text-[#1c1c1c]">Zero Wait</div>
                <div className="text-[#1c1c1c]/60 text-xs mt-0.5">Punctual Chair Times</div>
              </div>
            </div>
          </div>

          {/* Right Column: Framed Image Showcase */}
          <div className="lg:col-span-5">
            <div className="img-wrap">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#ece8de]">
                <img
                  src="/src/assets/images/hero_barbershop_interior_1791282714553.jpg"
                  alt="Heritage and Blade Studio"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.15em] text-[#1c1c1c]/60 font-semibold">
                <span>MIDTOWN DISTRICT, TORONTO</span>
                <span className="text-[#876d3e]">OPEN MON – SUN</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
