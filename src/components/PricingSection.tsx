import React, { useState } from 'react';
import { Check, Scissors, Clock, Sparkles } from 'lucide-react';
import { SERVICES, ADDONS, BarberService } from '../data/barbershopData';

interface PricingSectionProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectServiceToBook }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'cuts' | 'beards' | 'combos' | 'vip'>('all');

  const filteredServices = SERVICES.filter((s) => {
    if (selectedFilter === 'all') return true;
    return s.category === selectedFilter;
  });

  return (
    <section id="services" className="py-20 bg-[#f8f7f4] border-b border-[#1c1c1c]/10 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="meta-tag">Selected Treatments</span>
          <h2 className="serif-display text-3xl sm:text-5xl text-[#1c1c1c] mt-2 mb-3">
            The Service Menu
          </h2>
          <p className="text-sm text-[#1c1c1c]/60 max-w-lg mx-auto">
            All appointments include thorough personal consultation, hot towel nape shave, and signature botanical grooming finish.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-1.5 text-[0.72rem] uppercase tracking-[0.12em] font-bold rounded-full transition-all ${
                selectedFilter === 'all'
                  ? 'bg-[#1c1c1c] text-[#f8f7f4] shadow-sm'
                  : 'bg-white text-[#1c1c1c]/70 hover:text-[#1c1c1c] border border-[#1c1c1c]/10'
              }`}
            >
              All Treatments
            </button>
            <button
              onClick={() => setSelectedFilter('cuts')}
              className={`px-4 py-1.5 text-[0.72rem] uppercase tracking-[0.12em] font-bold rounded-full transition-all ${
                selectedFilter === 'cuts'
                  ? 'bg-[#1c1c1c] text-[#f8f7f4] shadow-sm'
                  : 'bg-white text-[#1c1c1c]/70 hover:text-[#1c1c1c] border border-[#1c1c1c]/10'
              }`}
            >
              Haircuts
            </button>
            <button
              onClick={() => setSelectedFilter('beards')}
              className={`px-4 py-1.5 text-[0.72rem] uppercase tracking-[0.12em] font-bold rounded-full transition-all ${
                selectedFilter === 'beards'
                  ? 'bg-[#1c1c1c] text-[#f8f7f4] shadow-sm'
                  : 'bg-white text-[#1c1c1c]/70 hover:text-[#1c1c1c] border border-[#1c1c1c]/10'
              }`}
            >
              Shaves &amp; Beards
            </button>
            <button
              onClick={() => setSelectedFilter('combos')}
              className={`px-4 py-1.5 text-[0.72rem] uppercase tracking-[0.12em] font-bold rounded-full transition-all ${
                selectedFilter === 'combos'
                  ? 'bg-[#1c1c1c] text-[#f8f7f4] shadow-sm'
                  : 'bg-white text-[#1c1c1c]/70 hover:text-[#1c1c1c] border border-[#1c1c1c]/10'
              }`}
            >
              Combos
            </button>
            <button
              onClick={() => setSelectedFilter('vip')}
              className={`px-4 py-1.5 text-[0.72rem] uppercase tracking-[0.12em] font-bold rounded-full transition-all ${
                selectedFilter === 'vip'
                  ? 'bg-[#1c1c1c] text-[#f8f7f4] shadow-sm'
                  : 'bg-white text-[#1c1c1c]/70 hover:text-[#1c1c1c] border border-[#1c1c1c]/10'
              }`}
            >
              VIP Ritual
            </button>
          </div>
        </div>

        {/* Services Card Grid matching Variation 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white p-7 sm:p-8 border border-black/5 hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="price-circle">${service.price}</span>
                  {service.popular && (
                    <span className="text-[0.68rem] uppercase tracking-[0.15em] font-bold text-[#876d3e] bg-[#f8f7f4] px-2.5 py-1">
                      Popular
                    </span>
                  )}
                </div>

                <h3 className="font-serif font-semibold text-xl text-[#1c1c1c] mt-2 mb-2">
                  {service.name}
                </h3>

                <p className="text-xs sm:text-[0.85rem] text-[#1c1c1c]/65 leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-4 pt-3 border-t border-[#1c1c1c]/10 flex items-center gap-1.5 text-[0.7rem] uppercase tracking-wider font-bold text-[#1c1c1c]/80">
                  <Clock className="w-3.5 h-3.5 text-[#876d3e]" />
                  <span>{service.durationMinutes} MINUTES</span>
                </div>

                {/* What's Included */}
                <div className="mt-4 space-y-1.5">
                  <div className="text-[0.68rem] uppercase tracking-widest text-[#876d3e] font-bold">
                    Includes:
                  </div>
                  <ul className="space-y-1 text-xs text-[#1c1c1c]/75">
                    {service.includes.map((inc, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3 h-3 text-[#876d3e] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-[#1c1c1c]/10">
                <button
                  onClick={() => onSelectServiceToBook(service.id)}
                  className="w-full py-2.5 px-4 text-[0.72rem] uppercase tracking-[0.14em] font-bold text-[#1c1c1c] bg-[#f8f7f4] hover:bg-[#1c1c1c] hover:text-[#f8f7f4] border border-[#1c1c1c]/20 transition-all flex items-center justify-center gap-2"
                >
                  <Scissors className="w-3.5 h-3.5 text-[#876d3e]" />
                  <span>Book Treatment</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Chair Add-ons & Scalp Treatments */}
        <div className="mt-16 bg-white p-6 sm:p-8 border border-black/5 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1c1c1c]/10">
            <div>
              <span className="meta-tag">Chair Enhancements</span>
              <h3 className="serif-display text-2xl text-[#1c1c1c] mt-1">
                Apothecary &amp; Scalp Add-Ons
              </h3>
            </div>
            <p className="text-xs text-[#1c1c1c]/60 max-w-sm">
              Incorporate any of these restorative steps into your booking.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            {ADDONS.map((addon) => (
              <div
                key={addon.id}
                className="bg-[#f8f7f4] p-4 border border-[#1c1c1c]/5"
              >
                <div className="flex items-start justify-between">
                  <span className="font-serif font-semibold text-base text-[#1c1c1c]">
                    {addon.name}
                  </span>
                  <span className="text-base font-serif font-bold text-[#876d3e] tabular-nums">
                    +${addon.price}
                  </span>
                </div>
                <div className="text-[0.68rem] uppercase tracking-wider text-[#1c1c1c]/50 font-bold mt-1">
                  +{addon.durationMinutes} MIN
                </div>
                <p className="text-xs text-[#1c1c1c]/65 mt-2 leading-relaxed">
                  {addon.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Membership Banner */}
        <div className="mt-10 bg-white border border-[#876d3e]/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <span className="meta-tag">The Gentleman's Circle</span>
            <h3 className="serif-display text-2xl sm:text-3xl text-[#1c1c1c] mt-1">
              Unlimited Nape Cleanups &amp; Priority Booking
            </h3>
            <p className="text-xs sm:text-sm text-[#1c1c1c]/65 mt-2 max-w-xl">
              $89 / month. Includes 2 signature haircut sessions, unlimited walk-in neckline razor trims, and 15% off all apothecary styling pomades.
            </p>
          </div>

          <button
            onClick={() => onSelectServiceToBook('srv-signature-cut')}
            className="btn-elegant whitespace-nowrap"
          >
            Inquire at Chair
          </button>
        </div>

      </div>
    </section>
  );
};
