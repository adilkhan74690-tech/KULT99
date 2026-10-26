import React from 'react';
import { Compass, Sparkles, MapPin } from 'lucide-react';
import { ProductImage } from './ProductImage';

export const BrandStory: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#0c0c0c] border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-neutral-400 uppercase">
              <MapPin className="w-3.5 h-3.5 text-neutral-300" />
              <span>DELHI // TIRUPUR ATELIER</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-tight leading-tight">
              BORN IN THE SHADOW OF BRUTALIST ARCHITECTURE.
            </h2>

            <div className="space-y-4 text-neutral-400 font-sans text-sm sm:text-base leading-relaxed">
              <p>
                KULT99 was founded on a simple dissatisfaction with the Indian streetwear market: everything was either flimsy fast-fashion imports or over-hyped synthetic blends that lost their shape in the first wash cycle.
              </p>
              <p>
                We spent 18 months in the textile mills of Tamil Nadu and screen printing workshops of Okhla developing our proprietary 260-450 GSM cotton blends. We designed cuts that drape intentionally: boxy shoulders, tapered sleeves, and reinforced ribbed collars that hold their silhouette forever.
              </p>
              <p className="text-white font-medium">
                No seasons. No fast trends. Only numbered drops produced in strictly limited runs of 250 pieces per colorway.
              </p>
            </div>

            <div className="pt-4 flex items-center gap-8 border-t border-neutral-800">
              <div>
                <span className="block font-heading font-extrabold text-2xl text-white">2026</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">ESTABLISHED</span>
              </div>
              <div className="w-[1px] h-8 bg-neutral-800" />
              <div>
                <span className="block font-heading font-extrabold text-2xl text-white">100%</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">INDIAN COMBED COTTON</span>
              </div>
              <div className="w-[1px] h-8 bg-neutral-800" />
              <div>
                <span className="block font-heading font-extrabold text-2xl text-white">LTD 250</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">UNITS PER DROP</span>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] bg-neutral-900 border border-neutral-800 overflow-hidden shadow-2xl">
              <ProductImage
                src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80"
                alt="Streetwear Atelier Production"
                className="w-full h-full object-cover object-center filter contrast-[1.1] grayscale hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 block">
                  CRAFT MANIFESTO
                </span>
                <span className="font-heading font-bold text-lg text-white uppercase">
                  "FORM FOLLOWS REBELLION."
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
