import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { ProductImage } from './ProductImage';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#0c0c0c] border-b border-neutral-900">
      {/* Editorial Grid Split on Desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Bold Typography & Brand Manifesto */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-8 z-10">
            {/* Drop Identifier Tag */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-neutral-900/90 border border-neutral-800 rounded-xs text-[11px] font-mono tracking-[0.25em] text-neutral-300 uppercase">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping inline-block" />
              <span>COLLECTION DROP 04 // 2026</span>
            </div>

            {/* Massive Streetwear Headline */}
            <div className="space-y-1">
              <h1 className="font-heading text-4xl sm:text-6xl xl:text-7xl font-extrabold uppercase tracking-tighter text-white leading-[0.92]">
                RAW FORM.<br />
                <span className="text-stroke-white text-transparent">HEAVYWEIGHT</span><br />
                SILHOUETTES.
              </h1>
            </div>

            {/* Editorial manifesto */}
            <p className="text-neutral-400 font-sans text-sm sm:text-base max-w-lg leading-relaxed">
              Crafted in limited runs across Tirupur and New Delhi. Custom 260 GSM to 450 GSM combed Indian cottons, non-sagging collar ribs, and intentional oversized drapes.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black text-xs font-mono font-bold tracking-[0.25em] uppercase hover:bg-neutral-200 transition-all shadow-xl group"
              >
                <span>EXPLORE DROP 04</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                to="/shop?category=oversized-tees"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-neutral-700 text-white text-xs font-mono font-bold tracking-[0.25em] uppercase hover:bg-neutral-900 hover:border-neutral-500 transition-all"
              >
                <span>OVERSIZED TEES</span>
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-4 border-t border-neutral-800/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="block font-heading font-bold text-lg sm:text-xl text-white">450 GSM</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">MAX FLEECE</span>
              </div>
              <div>
                <span className="block font-heading font-bold text-lg sm:text-xl text-white">100%</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">COMBED COTTON</span>
              </div>
              <div>
                <span className="block font-heading font-bold text-lg sm:text-xl text-white">LTD 250</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">PER COLORWAY</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Campaign Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-neutral-900 border border-neutral-800">
              <ProductImage
                src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85"
                alt="KULT99 Drop 04 Streetwear Campaign"
                className="w-full h-full object-cover object-top filter contrast-[1.08] brightness-[0.95] hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay gradient for editorial depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-60" />

              {/* Floating aesthetic labels */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-neutral-800 px-3 py-1.5 text-[10px] font-mono tracking-widest text-white uppercase flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-white" />
                <span>OBSIDIAN RECKONING // LOOK 01</span>
              </div>

              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-neutral-800 px-3 py-1.5 text-[10px] font-mono tracking-widest text-neutral-300 uppercase">
                <span>NEW DELHI ATELIER</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Marquee Ticker along bottom of hero */}
      <div className="border-t border-b border-neutral-900 bg-[#111111] py-2.5 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-[11px] font-mono tracking-[0.3em] uppercase text-neutral-400">
          <span>• 260 TO 450 GSM ARCHIVAL COTTONS</span>
          <span>• BOX-CUT DROP SHOULDER SILHOUETTES</span>
          <span>• ZERO-SAG COLLAR REINFORCEMENT</span>
          <span>• NO SYNTHETIC BLENDS</span>
          <span>• FREE SHIPPING ACROSS INDIA OVER ₹1499</span>
          <span>• 260 TO 450 GSM ARCHIVAL COTTONS</span>
          <span>• BOX-CUT DROP SHOULDER SILHOUETTES</span>
          <span>• ZERO-SAG COLLAR REINFORCEMENT</span>
          <span>• NO SYNTHETIC BLENDS</span>
          <span>• FREE SHIPPING ACROSS INDIA OVER ₹1499</span>
        </div>
      </div>
    </section>
  );
};
