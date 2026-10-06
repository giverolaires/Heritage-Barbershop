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
    <section className="relative overflow-hidden bg-[#0d0f12] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Proposition & CTA */}
        <div className="lg:col-span-7 space-y-8 z-10">
          {/* Quiet unboxed kicker */}
          <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-medium text-[#c59b27]">
            <span>Est. 2018</span>
            <span aria-hidden="true">·</span>
            <span>Handcrafted Grooming</span>
            <span aria-hidden="true">·</span>
            <span>418 St. Clair Ave</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#fbf8f3] tracking-tight leading-[1.1] text-balance">
            Master Barbering for the Discerning Gentleman
          </h1>

          <p className="text-base sm:text-lg text-[#b8b2a5] leading-relaxed max-w-2xl font-light">
            Bespoke shear craft, surgical skin fades, and traditional hot towel straight-razor shaves. We treat grooming as an enduring art form — no rushed cuts, no assembly lines, just dedicated time in the chair.
          </p>

          {/* Primary Action Zone */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold tracking-wide text-[#0d0f12] bg-[#c59b27] hover:bg-[#d8ab34] rounded-md transition-all shadow-md group"
            >
              <span>Book Your Chair</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onExploreGallery}
              className="inline-flex items-center justify-center px-5 py-3.5 text-sm font-medium text-[#e4decb] bg-white/5 hover:bg-white/10 border border-white/15 rounded-md transition-colors"
            >
              View Haircut Gallery
            </button>

            <button
              onClick={onExplorePricing}
              className="inline-flex items-center justify-center px-4 py-3.5 text-sm font-medium text-[#a09a8e] hover:text-[#f4efe6] transition-colors"
            >
              See Service Menu
            </button>
          </div>

          {/* Proof Adjacency: Clean unboxed metadata with separators */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-xs sm:text-sm">
            <div>
              <div className="font-semibold text-[#f4efe6] font-serif text-lg sm:text-xl">4.95 / 5.0</div>
              <div className="text-[#8c867a] mt-0.5">Over 1,200+ Verified Cuts</div>
            </div>
            <div>
              <div className="font-semibold text-[#f4efe6] font-serif text-lg sm:text-xl">3 Master Barbers</div>
              <div className="text-[#8c867a] mt-0.5">Bespoke 45-90m Sessions</div>
            </div>
            <div>
              <div className="font-semibold text-[#f4efe6] font-serif text-lg sm:text-xl">Zero Wait Time</div>
              <div className="text-[#8c867a] mt-0.5">Guaranteed Chair Slot</div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Focal Carrier */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-lg overflow-hidden border border-white/15 shadow-2xl bg-[#161920]">
            <img
              src="/src/assets/images/hero_barbershop_interior_1791282714553.jpg"
              alt="Heritage and Blade Artisanal Barbershop Interior"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Measured scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12]/80 via-transparent to-transparent pointer-events-none" />
            
            {/* Floating studio status tag */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#12151be6]/90 backdrop-blur-md p-3.5 rounded border border-white/10 flex items-center justify-between text-xs text-[#cfc8ba]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-medium text-[#f4efe6]">Chairs Open Today</span>
                <span className="text-white/40">·</span>
                <span>8:00 AM – 8:00 PM</span>
              </div>
              <button
                onClick={onOpenBooking}
                className="text-[#c59b27] hover:underline font-medium text-xs whitespace-nowrap"
              >
                Reserve Slot &rarr;
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
