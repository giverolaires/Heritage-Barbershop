import React from 'react';
import { Star, Scissors, Award } from 'lucide-react';
import { BARBERS } from '../data/barbershopData';

interface BarberTeamProps {
  onBookWithBarber: (barberId: string) => void;
}

export const BarberTeamSection: React.FC<BarberTeamProps> = ({ onBookWithBarber }) => {
  return (
    <section id="barbers" className="py-20 bg-[#f8f7f4] border-b border-[#1c1c1c]/10 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="meta-tag">The Craftsmen</span>
          <h2 className="serif-display text-3xl sm:text-5xl text-[#1c1c1c] mt-2 mb-3">
            The Master Barbers
          </h2>
          <p className="text-sm text-[#1c1c1c]/60 max-w-lg mx-auto">
            Trained in classical London academies and modern editorial salons. Each craftsman maintains an exacting personal touch.
          </p>
        </div>

        {/* Barbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BARBERS.map((barber) => (
            <div
              key={barber.id}
              className="bg-white p-6 sm:p-7 border border-black/5 hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Photo Wrap */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#ece8de]">
                  <img
                    src={barber.avatarUrl}
                    alt={barber.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  {barber.badge && (
                    <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-sm px-2.5 py-1 text-[0.68rem] uppercase tracking-wider font-bold text-[#876d3e]">
                      {barber.badge}
                    </div>
                  )}
                </div>

                {/* Barber Info */}
                <div className="pt-5 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <h3 className="serif-display text-2xl text-[#1c1c1c]">
                        {barber.name}
                      </h3>
                      <div className="text-xs text-[#876d3e] font-semibold mt-0.5">
                        {barber.title}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-[#1c1c1c] font-semibold tabular-nums">
                      <Star className="w-3.5 h-3.5 fill-[#876d3e] text-[#876d3e]" />
                      <span>{barber.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#1c1c1c]/65 leading-relaxed">
                    {barber.bio}
                  </p>

                  <div className="pt-3 border-t border-[#1c1c1c]/10 text-xs space-y-1">
                    <div className="flex justify-between text-[#1c1c1c]/60">
                      <span>Specialty:</span>
                      <span className="font-semibold text-[#1c1c1c]">{barber.specialty}</span>
                    </div>
                    <div className="flex justify-between text-[#1c1c1c]/60">
                      <span>Experience:</span>
                      <span className="font-semibold text-[#876d3e] tabular-nums">{barber.experienceYears} Years</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-6 pt-4 border-t border-[#1c1c1c]/10">
                <button
                  onClick={() => onBookWithBarber(barber.id)}
                  className="w-full py-2.5 px-4 text-[0.72rem] uppercase tracking-[0.14em] font-bold text-[#1c1c1c] bg-[#f8f7f4] hover:bg-[#1c1c1c] hover:text-[#f8f7f4] border border-[#1c1c1c]/20 transition-all flex items-center justify-center gap-2"
                >
                  <Scissors className="w-3.5 h-3.5 text-[#876d3e]" />
                  <span>Book with {barber.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
