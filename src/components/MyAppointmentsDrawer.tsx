import React from 'react';
import { X, Calendar, Clock, Scissors, Trash2, CheckCircle2 } from 'lucide-react';
import { Appointment } from '../data/barbershopData';

interface MyAppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onBookNew: () => void;
}

export const MyAppointmentsDrawer: React.FC<MyAppointmentsModalProps> = ({
  isOpen,
  onClose,
  appointments,
  onCancelAppointment,
  onBookNew,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl max-h-[85vh] flex flex-col bg-[#12141a] border border-white/15 rounded-lg shadow-2xl overflow-hidden text-[#ede7de]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#161922] border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-serif font-semibold text-[#f8f5ee]">
              Your Appointments
            </h2>
            <p className="text-xs text-[#9d9688] mt-0.5">
              Review and manage upcoming visits at Heritage &amp; Blade
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#9d9688] hover:text-[#f8f5ee] hover:bg-white/5 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {appointments.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-white/5 flex items-center justify-center text-[#8c867a]">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="text-sm font-medium text-[#f8f5ee]">No upcoming appointments found</div>
              <p className="text-xs text-[#8c867a] max-w-xs mx-auto">
                Ready to secure your chair? Reserve a slot with one of our master craftsmen.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBookNew();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0d0f12] bg-[#c59b27] hover:bg-[#d8ab34] rounded mt-2"
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>Book Appointment Now</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-[#171a23] border border-white/10 rounded-lg p-4 space-y-3 relative"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#c59b27]">
                        {apt.bookingRef}
                      </span>
                      <h4 className="font-serif font-semibold text-base text-[#f8f5ee]">
                        {apt.service.name}
                      </h4>
                    </div>
                    <span className="text-xs font-semibold text-[#c59b27] tabular-nums">
                      ${apt.totalPrice}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-[#b8b2a5]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#8c867a]" />
                      <span>{apt.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#8c867a]" />
                      <span className="text-[#f8f5ee] font-medium">{apt.timeSlot}</span>
                    </div>
                  </div>

                  <div className="text-xs text-[#8c867a] flex items-center justify-between pt-1">
                    <div>
                      Barber: <span className="text-[#f8f5ee]">{apt.barber.name}</span>
                    </div>
                    {apt.status === 'confirmed' ? (
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                      </span>
                    ) : (
                      <span className="text-[11px] text-rose-400">Cancelled</span>
                    )}
                  </div>

                  {apt.status === 'confirmed' && (
                    <div className="pt-2 border-t border-white/5 flex justify-end">
                      <button
                        onClick={() => onCancelAppointment(apt.id)}
                        className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 hover:underline"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Cancel Appointment</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#161922] border-t border-white/10 flex items-center justify-between text-xs text-[#8c867a]">
          <span>Need to reschedule? Call us at (555) 234-5678</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-[#ede7de] border border-white/15 rounded hover:bg-white/5"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
