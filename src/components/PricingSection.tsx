import React, { useState } from 'react';
import { Check, Scissors, Sparkles, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
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
    <section id="services" className="py-20 bg-[#0f1117] border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#c59b27] font-medium mb-2">
              Transparent Craft Pricing
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#f8f5ee] tracking-tight">
              Service Menu &amp; Treatments
            </h2>
            <p className="text-sm text-[#a09a8e] mt-2 max-w-xl">
              All appointments include thorough personal consultation, hot towel nape shave, and signature botanical grooming finish. No hidden fees.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#161922] rounded-lg border border-white/10 self-start md:self-end">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                selectedFilter === 'all'
                  ? 'bg-[#c59b27] text-[#0d0f12] font-semibold shadow-sm'
                  : 'text-[#c0bbb2] hover:text-[#f8f5ee]'
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => setSelectedFilter('cuts')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                selectedFilter === 'cuts'
                  ? 'bg-[#c59b27] text-[#0d0f12] font-semibold shadow-sm'
                  : 'text-[#c0bbb2] hover:text-[#f8f5ee]'
              }`}
            >
              Haircuts
            </button>
            <button
              onClick={() => setSelectedFilter('beards')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                selectedFilter === 'beards'
                  ? 'bg-[#c59b27] text-[#0d0f12] font-semibold shadow-sm'
                  : 'text-[#c0bbb2] hover:text-[#f8f5ee]'
              }`}
            >
              Shaves &amp; Beards
            </button>
            <button
              onClick={() => setSelectedFilter('combos')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                selectedFilter === 'combos'
                  ? 'bg-[#c59b27] text-[#0d0f12] font-semibold shadow-sm'
                  : 'text-[#c0bbb2] hover:text-[#f8f5ee]'
              }`}
            >
              Combos
            </button>
            <button
              onClick={() => setSelectedFilter('vip')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                selectedFilter === 'vip'
                  ? 'bg-[#c59b27] text-[#0d0f12] font-semibold shadow-sm'
                  : 'text-[#c0bbb2] hover:text-[#f8f5ee]'
              }`}
            >
              VIP Ritual
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`relative bg-[#141720] border rounded-lg p-6 flex flex-col justify-between transition-all duration-200 hover:border-white/25 hover:shadow-lg ${
                service.popular ? 'border-[#c59b27]/40 ring-1 ring-[#c59b27]/30' : 'border-white/10'
              }`}
            >
              <div>
                {/* Quiet unboxed kicker for popular services */}
                <div className="flex items-center justify-between text-xs text-[#8c867a] mb-2">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#c59b27]" />
                    <span className="tabular-nums">{service.durationMinutes} minutes</span>
                  </div>
                  {service.popular && (
                    <span className="text-[#c59b27] font-medium tracking-wide">
                      Client Favorite
                    </span>
                  )}
                </div>

                <div className="flex items-baseline justify-between gap-2 mt-1">
                  <h3 className="font-serif font-bold text-xl text-[#f8f5ee]">
                    {service.name}
                  </h3>
                  <div className="text-2xl font-serif font-bold text-[#c59b27] tabular-nums shrink-0">
                    ${service.price}
                  </div>
                </div>

                <p className="text-xs text-[#a09a8e] mt-3 leading-relaxed">
                  {service.description}
                </p>

                {/* What's included */}
                <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
                  <div className="text-[11px] uppercase tracking-wider text-[#8c867a] font-medium">
                    What's Included:
                  </div>
                  <ul className="space-y-1.5">
                    {service.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#c0bbb2]">
                        <Check className="w-3.5 h-3.5 text-[#c59b27] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={() => onSelectServiceToBook(service.id)}
                  className={`w-full py-2.5 px-4 rounded text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 ${
                    service.popular
                      ? 'bg-[#c59b27] text-[#0d0f12] hover:bg-[#d8ab34]'
                      : 'bg-white/5 text-[#f8f5ee] hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Book This Service (${service.price})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons & Grooming Bar */}
        <div className="mt-12 bg-[#141720] border border-white/10 rounded-lg p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#c59b27] font-medium">
                Chair Enhancements
              </div>
              <h3 className="text-xl font-serif font-bold text-[#f8f5ee] mt-1">
                Apothecary &amp; Scalp Add-Ons
              </h3>
            </div>
            <p className="text-xs text-[#8c867a] max-w-md">
              Add any of these treatments seamlessly during your online booking or consult directly with your barber on chair arrival.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            {ADDONS.map((addon) => (
              <div
                key={addon.id}
                className="bg-[#171b26] p-4 rounded border border-white/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="font-medium text-sm text-[#f8f5ee]">{addon.name}</span>
                    <span className="text-sm font-semibold text-[#c59b27] tabular-nums">+${addon.price}</span>
                  </div>
                  <div className="text-[11px] text-[#8c867a] mt-1">+{addon.durationMinutes} mins</div>
                  <p className="text-xs text-[#a09a8e] mt-2 leading-relaxed">
                    {addon.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grooming Club Card / Membership */}
        <div className="mt-12 bg-gradient-to-r from-[#171a24] to-[#1d222f] border border-[#c59b27]/30 rounded-lg p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#c59b27] font-medium uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>The Gentleman's Circle Membership</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#f8f5ee]">
              Unlimited Nape Cleanups &amp; Priority Booking
            </h3>
            <p className="text-xs sm:text-sm text-[#a09a8e] max-w-2xl leading-relaxed">
              $89 / month. Includes 2 full signature haircut sessions, unlimited walk-in neckline razor cleanups between cuts, and 15% off all apothecary styling pomades.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-4">
            <button
              onClick={() => onSelectServiceToBook('srv-signature-cut')}
              className="px-5 py-3 text-xs font-semibold text-[#0d0f12] bg-[#c59b27] hover:bg-[#d8ab34] rounded transition-colors whitespace-nowrap shadow-md"
            >
              Inquire at Chair
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
