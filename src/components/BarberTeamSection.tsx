import React from 'react';
import { Star, Award, Scissors, Clock } from 'lucide-react';
import { BARBERS, BarberMaster } from '../data/barbershopData';

interface BarberTeamProps {
  onBookWithBarber: (barberId: string) => void;
}

export const BarberTeamSection: React.FC<BarberTeamProps> = ({ onBookWithBarber }) => {
  return (
    <section id="barbers" className="py-20 bg-[#0f1117] border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#c59b27] font-medium mb-2">
              The Craftsmen
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#f8f5ee] tracking-tight">
              Master Barbers Behind the Blade
            </h2>
            <p className="text-sm text-[#a09a8e] mt-2 max-w-xl">
              Trained in classical London academies and modern editorial studios. Each craftsman maintains their own distinct signature touch.
            </p>
          </div>
        </div>

        {/* Barber Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
          {BARBERS.map((barber) => (
            <div
              key={barber.id}
              className="bg-[#141720] border border-white/10 rounded-lg overflow-hidden flex flex-col justify-between group transition-all hover:border-white/20 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#1a1e28]">
                <img
                  src={barber.avatarUrl}
                  alt={barber.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141720] via-transparent to-transparent opacity-90" />
                
                {barber.badge && (
                  <div className="absolute top-3 left-3 bg-[#0d0f12]/90 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-medium text-[#c59b27] border border-white/10">
                    {barber.badge}
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-[#f8f5ee]">
                        {barber.name}
                      </h3>
                      <div className="text-xs text-[#8c867a] mt-0.5">{barber.title}</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs text-[#c59b27] font-medium tabular-nums">
                        <Star className="w-3.5 h-3.5 fill-[#c59b27]" />
                        <span>{barber.rating}</span>
                      </div>
                      <div className="text-[10px] text-[#6e685d]">({barber.reviewCount} cuts)</div>
                    </div>
                  </div>

                  <p className="text-xs text-[#a09a8e] leading-relaxed">
                    {barber.bio}
                  </p>

                  <div className="pt-3 border-t border-white/5 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-[#8c867a]">
                      <span>Signature Style:</span>
                      <span className="text-[#f8f5ee] font-medium text-right">{barber.specialty}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#8c867a]">
                      <span>Experience:</span>
                      <span className="text-[#c59b27] font-medium tabular-nums">{barber.experienceYears} Years</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={() => onBookWithBarber(barber.id)}
                    className="w-full py-2.5 px-4 rounded text-xs font-semibold text-[#0d0f12] bg-[#c59b27] hover:bg-[#d8ab34] transition-colors flex items-center justify-center gap-2"
                  >
                    <Scissors className="w-3.5 h-3.5" />
                    <span>Book with {barber.name.split(' ')[0]}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
