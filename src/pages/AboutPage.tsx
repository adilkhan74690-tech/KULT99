import React from 'react';
import { Link } from 'react-router-dom';
import { ProductImage } from '../components/ProductImage';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      {/* Banner */}
      <div className="border-b border-neutral-900 bg-[#0f0f0f] py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500">
            THE ATELIER MANIFESTO // 2026
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold uppercase tracking-tight">
            NO COMPROMISE. NO DISPOSABLE CLOTHING.
          </h1>
          <p className="text-xs font-mono text-neutral-400 max-w-xl mx-auto leading-relaxed">
            KULT99 was founded in New Delhi with a singular mission: to challenge flimsy fast-fashion culture and manufacture the heaviest, most durable streetwear in India.
          </p>
        </div>
      </div>

      {/* Main Story & Values */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 text-xs font-sans text-neutral-300 leading-relaxed">
            <h2 className="font-heading text-2xl font-bold uppercase text-white tracking-tight">
              THE 260-450 GSM PHILOSOPHY
            </h2>
            <p>
              Standard fast fashion brands produce t-shirts using thin 140-160 GSM fabrics with cheap synthetic polyester threads. Within 3 washes, their neck ribs sag, the drape warps, and the piece ends up in a landfill.
            </p>
            <p>
              We took the exact opposite path. By partnering directly with historical spinning mills in Tirupur, Tamil Nadu, we custom-develop 100% combed cotton jersey starting at 260 GSM for summer tees and culminating in a brutalist 450 GSM loopback fleece for our hoodies.
            </p>
            <p>
              The result is a structure that doesn't collapse against your body. It creates clean architectural drape, dropped shoulders, and confidence every time you step outside.
            </p>
          </div>

          <div className="relative aspect-[4/5] bg-neutral-900 border border-neutral-800 overflow-hidden shadow-2xl">
            <ProductImage
              src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80"
              alt="Atelier Screenprinting Craft"
              className="w-full h-full object-cover object-center filter grayscale contrast-[1.1]"
            />
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/85 backdrop-blur-md border border-neutral-800 text-[10px] font-mono tracking-widest uppercase">
              DELHI WORKSHOP // TEXTILE ATELIER
            </div>
          </div>
        </div>

        {/* 4 Atelier Pillars */}
        <div className="border border-neutral-800 bg-[#121212] p-8 sm:p-12">
          <h2 className="font-heading text-2xl font-bold uppercase text-white tracking-tight mb-8 text-center sm:text-left">
            OUR ATELIER CODE
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-mono">
            <div className="space-y-2 border-l-2 border-white pl-4">
              <span className="text-white font-bold text-sm block uppercase">
                01. STRICTLY LIMITED RUNS
              </span>
              <p className="text-neutral-400 font-sans leading-relaxed">
                We make a maximum of 250 pieces per colorway. When an archive run sells out, it is archived forever. No mass-market reproduction.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-white pl-4">
              <span className="text-white font-bold text-sm block uppercase">
                02. ZERO SYNTHETIC BLENDS
              </span>
              <p className="text-neutral-400 font-sans leading-relaxed">
                Every single piece of our fleece and jersey line is 100% natural Indian combed cotton. Biodegradable, breathable, and infinitely softer over time.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-white pl-4">
              <span className="text-white font-bold text-sm block uppercase">
                03. ZERO-SAG REINFORCED RIBS
              </span>
              <p className="text-neutral-400 font-sans leading-relaxed">
                We integrate custom double-spun 2x2 spandex-infused collar ribbing that resists neck baconing for years of high-rotation wear.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-white pl-4">
              <span className="text-white font-bold text-sm block uppercase">
                04. FAIR CRAFT ETHICS
              </span>
              <p className="text-neutral-400 font-sans leading-relaxed">
                All garments are cut, dyed, printed, and assembled by master craftsmen in New Delhi and Tirupur receiving above-market living wages.
              </p>
            </div>
          </div>
        </div>

        {/* Contact info box */}
        <div className="p-8 bg-[#161616] border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="font-heading font-bold text-lg uppercase text-white">
              CONNECT WITH OUR DESIGN WORKSHOP
            </h3>
            <p className="text-xs font-mono text-neutral-400">
              KULT99 Design Atelier, New Delhi, India • contact@kult99.com
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/contact"
              className="px-6 py-3.5 bg-neutral-900 border border-neutral-700 hover:border-white text-white text-xs font-mono font-bold tracking-widest uppercase transition-colors"
            >
              CONTACT ATELIER
            </Link>
            <Link
              to="/shop"
              className="px-6 py-3.5 bg-white text-black hover:bg-neutral-200 text-xs font-mono font-bold tracking-widest uppercase transition-colors shrink-0"
            >
              EXPLORE CATALOG
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
