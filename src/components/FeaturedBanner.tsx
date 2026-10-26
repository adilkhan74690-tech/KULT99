import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Sparkles, Cpu, ShieldCheck } from 'lucide-react';
import { ProductImage } from './ProductImage';

export const FeaturedBanner: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-[#090909] border-b border-neutral-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Box */}
        <div className="relative border border-neutral-800 bg-[#111111] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 relative min-h-[340px] sm:min-h-[420px] bg-neutral-900">
              <ProductImage
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80"
                alt="450 GSM Heavyweight Terry Fleece Detail"
                className="absolute inset-0 w-full h-full object-cover object-center filter contrast-[1.1] grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/40" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/85 backdrop-blur-md border border-neutral-800">
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 block mb-0.5">
                  FABRIC CODE // SPEC-450
                </span>
                <span className="font-heading font-bold text-base text-white uppercase block">
                  100% UNBRUSHED LOOPBACK TERRY
                </span>
              </div>
            </div>

            {/* Editorial Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-neutral-200" />
                  <span>THE HEAVYWEIGHT REVOLUTION</span>
                </div>

                <h2 className="font-heading text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-tight leading-tight">
                  ENGINEERED TO RESIST TIME & TRENDS.
                </h2>

                <p className="text-neutral-400 font-sans text-xs sm:text-sm leading-relaxed max-w-xl">
                  Fast fashion made clothes disposable with flimsy 140 GSM synthetics. At KULT99, every garment begins with custom-milled long-staple Indian combed cotton starting at 260 GSM for tees and peaking at 450 GSM for winter armor. No shrinkage. No collapsing necklines. Ever.
                </p>
              </div>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-800/80">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-white">
                    <Layers className="w-4 h-4 text-neutral-400" />
                    <span className="font-mono text-xs font-bold tracking-wider">ZERO SAG RIB</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 font-sans">
                    2x2 reinforced spandex-infused ribbing that retains tension forever.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-white">
                    <Cpu className="w-4 h-4 text-neutral-400" />
                    <span className="font-mono text-xs font-bold tracking-wider">3D PUFF PRINTS</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 font-sans">
                    High-density industrial curing for crack-resistant tactile graphics.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-white">
                    <ShieldCheck className="w-4 h-4 text-neutral-400" />
                    <span className="font-mono text-xs font-bold tracking-wider">PRE-SHRUNK</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 font-sans">
                    Bio-washed and pre-laundered to guarantee zero sizing changes.
                  </p>
                </div>
              </div>

              {/* CTA link */}
              <div className="pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-3 px-6 py-3.5 bg-white text-black text-xs font-mono font-bold tracking-[0.2em] uppercase hover:bg-neutral-200 transition-colors"
                >
                  <span>SHOP DROP 04 COLLECTION</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
