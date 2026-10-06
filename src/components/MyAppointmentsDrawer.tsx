import React from 'react';
import { X, Calendar, Clock, Scissors, Trash2 } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl max-h-[85vh] flex flex-col bg-[#f8f7f4] border border-[#1c1c1c]/15 shadow-2xl overflow-hidden text-[#1c1c1c]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#1c1c1c]/10 flex items-center justify-between">
          <div>
            <span className="meta-tag">Your Ledger</span>
            <h2 className="serif-display text-2xl text-[#1c1c1c] mt-0.5">
              Scheduled Chair Sessions
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#1c1c1c]/60 hover:text-[#1c1c1c] rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {appointments.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-black/5 flex items-center justify-center text-[#876d3e]">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="serif-display text-xl text-[#1c1c1c]">No Active Reservations</h3>
              <p className="text-xs text-[#1c1c1c]/60 max-w-xs mx-auto">
                Ready to refresh your look? Select a treatment from our master craftsmen.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBookNew();
                }}
                className="btn-elegant px-5 py-2.5 text-[0.7rem] mt-2"
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>Book Appointment</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-white border border-[#1c1c1c]/10 p-5 space-y-3 shadow-sm"
                >
                  <div className="flex items-center justify-between border-b border-[#1c1c1c]/10 pb-3">
                    <div>
                      <span className="meta-tag text-[0.65rem] text-[#876d3e]">
                        {apt.bookingRef}
                      </span>
                      <h4 className="serif-display text-xl text-[#1c1c1c] mt-0.5">
                        {apt.service.name}
                      </h4>
                    </div>
                    <span className="serif-display text-2xl font-bold text-[#876d3e] tabular-nums">
                      ${apt.totalPrice}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-[#1c1c1c]/70">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#876d3e]" />
                      <span>{apt.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#876d3e]" />
                      <span className="font-semibold text-[#1c1c1c]">{apt.timeSlot}</span>
                    </div>
                  </div>

                  <div className="text-xs text-[#1c1c1c]/60 flex items-center justify-between pt-1">
                    <div>
                      Master Barber: <strong className="text-[#1c1c1c]">{apt.barber.name}</strong>
                    </div>
                    {apt.status === 'confirmed' ? (
                      <span className="text-[0.68rem] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Confirmed
                      </span>
                    ) : (
                      <span className="text-[0.68rem] uppercase font-bold tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                        Cancelled
                      </span>
                    )}
                  </div>

                  {apt.status === 'confirmed' && (
                    <div className="pt-2 border-t border-[#1c1c1c]/5 flex justify-end">
                      <button
                        onClick={() => onCancelAppointment(apt.id)}
                        className="inline-flex items-center gap-1 text-xs text-rose-600 hover:underline font-medium"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Cancel Reservation</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#1c1c1c]/10 flex items-center justify-between text-xs text-[#1c1c1c]/60">
          <span>Studio Inquiries: (555) 234-5678</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs uppercase tracking-wider font-bold text-[#1c1c1c] border border-[#1c1c1c]/20 hover:border-[#1c1c1c]"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
