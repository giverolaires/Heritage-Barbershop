import React, { useState } from 'react';
import { Eye, Scissors, X } from 'lucide-react';
import { HAIRCUT_STYLES, HaircutStyle } from '../data/barbershopData';

interface HaircutGalleryProps {
  onBookStyle: (serviceId: string) => void;
}

export const HaircutGallery: React.FC<HaircutGalleryProps> = ({ onBookStyle }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'fades' | 'classics' | 'beards'>('all');
  const [selectedStyle, setSelectedStyle] = useState<HaircutStyle | null>(null);

  const filteredStyles = HAIRCUT_STYLES.filter((style) => {
    if (activeCategory === 'all') return true;
    return style.category === activeCategory;
  });

  return (
    <section id="gallery" className="py-20 bg-[#f8f7f4] border-b border-[#1c1c1c]/10 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="meta-tag">Curated Portfolio</span>
          <h2 className="serif-display text-3xl sm:text-5xl text-[#1c1c1c] mt-2 mb-3">
            Craft Gallery
          </h2>
          <p className="text-sm text-[#1c1c1c]/60 max-w-lg mx-auto">
            From surgical skin fades to executive scissor flow. Tap any signature look to examine specifications or reserve the chair.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-1.5 text-[0.72rem] uppercase tracking-[0.12em] font-bold rounded-full transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#1c1c1c] text-[#f8f7f4]'
                  : 'bg-white text-[#1c1c1c]/70 hover:text-[#1c1c1c] border border-[#1c1c1c]/10'
              }`}
            >
              All Looks ({HAIRCUT_STYLES.length})
            </button>
            <button
              onClick={() => setActiveCategory('fades')}
              className={`px-4 py-1.5 text-[0.72rem] uppercase tracking-[0.12em] font-bold rounded-full transition-all ${
                activeCategory === 'fades'
                  ? 'bg-[#1c1c1c] text-[#f8f7f4]'
                  : 'bg-white text-[#1c1c1c]/70 hover:text-[#1c1c1c] border border-[#1c1c1c]/10'
              }`}
            >
              Fades &amp; Crops
            </button>
            <button
              onClick={() => setActiveCategory('classics')}
              className={`px-4 py-1.5 text-[0.72rem] uppercase tracking-[0.12em] font-bold rounded-full transition-all ${
                activeCategory === 'classics'
                  ? 'bg-[#1c1c1c] text-[#f8f7f4]'
                  : 'bg-white text-[#1c1c1c]/70 hover:text-[#1c1c1c] border border-[#1c1c1c]/10'
              }`}
            >
              Classics &amp; Tapers
            </button>
            <button
              onClick={() => setActiveCategory('beards')}
              className={`px-4 py-1.5 text-[0.72rem] uppercase tracking-[0.12em] font-bold rounded-full transition-all ${
                activeCategory === 'beards'
                  ? 'bg-[#1c1c1c] text-[#f8f7f4]'
                  : 'bg-white text-[#1c1c1c]/70 hover:text-[#1c1c1c] border border-[#1c1c1c]/10'
              }`}
            >
              Beard Artistry
            </button>
          </div>
        </div>

        {/* Gallery Grid / Strip matching Variation 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredStyles.map((style) => (
            <div
              key={style.id}
              className="bg-white p-3.5 border border-black/5 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between group"
            >
              <div>
                {/* Image Wrap */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#ece8de]">
                  <img
                    src={style.imageUrl}
                    alt={style.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    onClick={() => setSelectedStyle(style)}
                    className="absolute top-2.5 right-2.5 p-2 bg-white/90 backdrop-blur-sm text-[#1c1c1c] hover:text-[#876d3e] rounded shadow-sm transition-colors"
                    title="Inspect style"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card Title & Info */}
                <div className="pt-3 px-1">
                  <div className="text-[0.68rem] uppercase tracking-[0.15em] text-[#876d3e] font-bold">
                    {style.categoryLabel}
                  </div>
                  <h3 className="font-serif font-semibold text-lg text-[#1c1c1c] mt-1 leading-snug">
                    {style.title}
                  </h3>
                  <div className="text-xs text-[#1c1c1c]/60 mt-1 flex items-center justify-between">
                    <span>{style.durationMinutes} mins</span>
                    <span className="font-serif font-semibold text-base text-[#1c1c1c] tabular-nums">
                      ${style.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 px-1 mt-3 border-t border-[#1c1c1c]/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedStyle(style)}
                  className="text-xs text-[#1c1c1c]/70 hover:text-[#1c1c1c] underline underline-offset-4"
                >
                  Details
                </button>
                <button
                  onClick={() => onBookStyle(style.serviceId)}
                  className="px-3.5 py-1.5 text-[0.68rem] uppercase tracking-wider font-bold text-[#f8f7f4] bg-[#1c1c1c] hover:bg-[#876d3e] transition-colors flex items-center gap-1.5"
                >
                  <Scissors className="w-3 h-3" />
                  <span>Book</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Style Details Modal */}
      {selectedStyle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl bg-white border border-[#1c1c1c]/15 shadow-2xl p-6 sm:p-8 text-[#1c1c1c]">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1c1c1c]/10">
              <div>
                <span className="meta-tag">{selectedStyle.categoryLabel} Profile</span>
                <h3 className="serif-display text-2xl sm:text-3xl text-[#1c1c1c] mt-0.5">
                  {selectedStyle.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedStyle(null)}
                className="p-1.5 text-[#1c1c1c]/60 hover:text-[#1c1c1c] hover:bg-black/5 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="aspect-[16/10] overflow-hidden bg-[#ece8de]">
                <img
                  src={selectedStyle.imageUrl}
                  alt={selectedStyle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <p className="text-sm text-[#1c1c1c]/75 leading-relaxed">
                {selectedStyle.description}
              </p>

              {/* Spec Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-[#f8f7f4] border border-[#1c1c1c]/10 text-xs">
                <div>
                  <div className="text-[0.68rem] uppercase tracking-wider text-[#876d3e] font-bold">Face Shapes</div>
                  <div className="font-medium text-[#1c1c1c] mt-0.5">{selectedStyle.suitableFace}</div>
                </div>
                <div>
                  <div className="text-[0.68rem] uppercase tracking-wider text-[#876d3e] font-bold">Hair Texture</div>
                  <div className="font-medium text-[#1c1c1c] mt-0.5">{selectedStyle.hairType}</div>
                </div>
                <div>
                  <div className="text-[0.68rem] uppercase tracking-wider text-[#876d3e] font-bold">Maintenance Cadence</div>
                  <div className="font-medium text-[#1c1c1c] mt-0.5">{selectedStyle.maintenanceWeeks}</div>
                </div>
                <div>
                  <div className="text-[0.68rem] uppercase tracking-wider text-[#876d3e] font-bold">Styling Product</div>
                  <div className="font-medium text-[#1c1c1c] mt-0.5">{selectedStyle.stylingProduct}</div>
                </div>
              </div>

              {/* Craftsman quote */}
              <div className="p-3.5 bg-white border-l-2 border-[#876d3e] text-xs italic text-[#1c1c1c]/80">
                &ldquo;{selectedStyle.barberQuote}&rdquo;
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-[#1c1c1c]/10 flex items-center justify-between">
              <div>
                <span className="font-serif text-2xl text-[#876d3e] font-bold tabular-nums">
                  ${selectedStyle.price}
                </span>
                <span className="text-xs text-[#1c1c1c]/60 ml-2">· {selectedStyle.durationMinutes} mins</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedStyle(null)}
                  className="px-4 py-2 text-xs uppercase tracking-wider font-bold text-[#1c1c1c]/70 hover:text-[#1c1c1c]"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const sid = selectedStyle.serviceId;
                    setSelectedStyle(null);
                    onBookStyle(sid);
                  }}
                  className="btn-elegant px-5 py-2.5 text-[0.7rem]"
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Book This Style</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
