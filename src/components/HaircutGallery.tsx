import React, { useState } from 'react';
import { Eye, Scissors, Sparkles, X, Check, ArrowRight } from 'lucide-react';
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
    <section id="gallery" className="py-20 bg-[#0d0f12] border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            {/* Clean unboxed kicker */}
            <div className="text-xs uppercase tracking-widest text-[#c59b27] font-medium mb-2">
              Haircut Lookbook &amp; Craft Gallery
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#f8f5ee] tracking-tight">
              Curated Haircut Portfolio
            </h2>
            <p className="text-sm text-[#a09a8e] mt-2 max-w-xl">
              From razor-sharp skin fades to executive scissor flow. Explore our signature silhouettes and book the exact look for your chair session.
            </p>
          </div>

          {/* Interactive filter tabs (functional buttons with active states) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#161922] rounded-lg border border-white/10 self-start md:self-end">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-[#c59b27] text-[#0d0f12] font-semibold shadow-sm'
                  : 'text-[#c0bbb2] hover:text-[#f8f5ee]'
              }`}
            >
              All Styles ({HAIRCUT_STYLES.length})
            </button>
            <button
              onClick={() => setActiveCategory('fades')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeCategory === 'fades'
                  ? 'bg-[#c59b27] text-[#0d0f12] font-semibold shadow-sm'
                  : 'text-[#c0bbb2] hover:text-[#f8f5ee]'
              }`}
            >
              Fades &amp; Crops
            </button>
            <button
              onClick={() => setActiveCategory('classics')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeCategory === 'classics'
                  ? 'bg-[#c59b27] text-[#0d0f12] font-semibold shadow-sm'
                  : 'text-[#c0bbb2] hover:text-[#f8f5ee]'
              }`}
            >
              Classics &amp; Tapers
            </button>
            <button
              onClick={() => setActiveCategory('beards')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeCategory === 'beards'
                  ? 'bg-[#c59b27] text-[#0d0f12] font-semibold shadow-sm'
                  : 'text-[#c0bbb2] hover:text-[#f8f5ee]'
              }`}
            >
              Beard Artistry
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
          {filteredStyles.map((style) => (
            <div
              key={style.id}
              className="group bg-[#151820] border border-white/10 rounded-lg overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:border-white/25 hover:shadow-xl"
            >
              {/* Image Container with 4:3 Aspect Ratio */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#1a1e28]">
                <img
                  src={style.imageUrl}
                  alt={style.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151820] via-transparent to-transparent opacity-80" />

                {/* Quick inspect button */}
                <button
                  onClick={() => setSelectedStyle(style)}
                  className="absolute top-3 right-3 p-2 bg-[#12141ae6]/90 backdrop-blur-md rounded text-[#ede7de] hover:text-[#c59b27] transition-colors border border-white/10"
                  aria-label={`Inspect ${style.title}`}
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Clean unboxed metadata */}
                  <div className="text-xs text-[#8c867a] flex items-center gap-1.5 mb-1.5">
                    <span>{style.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{style.durationMinutes} mins</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-[#c59b27] tabular-nums">${style.price}</span>
                  </div>

                  <h3 className="font-serif font-semibold text-lg text-[#f8f5ee] leading-snug group-hover:text-[#c59b27] transition-colors">
                    {style.title}
                  </h3>

                  <p className="text-xs text-[#a09a8e] mt-2 line-clamp-2 leading-relaxed">
                    {style.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedStyle(style)}
                    className="text-xs text-[#c0bbb2] hover:text-[#f8f5ee] underline-offset-4 hover:underline transition-colors"
                  >
                    Style Details
                  </button>

                  <button
                    onClick={() => onBookStyle(style.serviceId)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0d0f12] bg-[#c59b27] hover:bg-[#d8ab34] rounded transition-colors"
                  >
                    <Scissors className="w-3.5 h-3.5" />
                    <span>Book Cut</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Style Details Modal */}
      {selectedStyle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#141720] border border-white/15 rounded-lg shadow-2xl overflow-hidden text-[#ede7de]">
            
            {/* Header */}
            <div className="p-4 sm:p-5 bg-[#171a24] border-b border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#c59b27] font-medium">
                  {selectedStyle.categoryLabel} Profile
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f8f5ee]">
                  {selectedStyle.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedStyle(null)}
                className="p-1.5 text-[#8c867a] hover:text-[#f8f5ee] hover:bg-white/5 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              <div className="aspect-[16/9] rounded overflow-hidden border border-white/10">
                <img
                  src={selectedStyle.imageUrl}
                  alt={selectedStyle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <p className="text-sm text-[#b8b2a5] leading-relaxed">
                {selectedStyle.description}
              </p>

              {/* Style Blueprint Spec Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-[#181c26] rounded border border-white/10 text-xs">
                <div>
                  <div className="text-[#8c867a]">Recommended Face Shapes</div>
                  <div className="font-medium text-[#f8f5ee] mt-0.5">{selectedStyle.suitableFace}</div>
                </div>
                <div>
                  <div className="text-[#8c867a]">Hair Texture</div>
                  <div className="font-medium text-[#f8f5ee] mt-0.5">{selectedStyle.hairType}</div>
                </div>
                <div>
                  <div className="text-[#8c867a]">Maintenance Frequency</div>
                  <div className="font-medium text-[#f8f5ee] mt-0.5">{selectedStyle.maintenanceWeeks}</div>
                </div>
                <div>
                  <div className="text-[#8c867a]">Recommended Styling Product</div>
                  <div className="font-medium text-[#f8f5ee] mt-0.5">{selectedStyle.stylingProduct}</div>
                </div>
              </div>

              {/* Master Barber Quote */}
              <div className="p-3.5 bg-[#1b1f2b] border-l-2 border-[#c59b27] rounded-r text-xs text-[#cfc8ba] italic">
                &ldquo;{selectedStyle.barberQuote}&rdquo;
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-[#171a24] border-t border-white/10 flex items-center justify-between">
              <div className="text-sm font-semibold text-[#c59b27] tabular-nums">
                ${selectedStyle.price} <span className="text-xs text-[#8c867a] font-normal">· {selectedStyle.durationMinutes} mins</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedStyle(null)}
                  className="px-4 py-2 text-xs font-medium text-[#c0bbb2] hover:text-[#f8f5ee] border border-white/15 rounded"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const sid = selectedStyle.serviceId;
                    setSelectedStyle(null);
                    onBookStyle(sid);
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-[#0d0f12] bg-[#c59b27] hover:bg-[#d8ab34] rounded transition-colors"
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
