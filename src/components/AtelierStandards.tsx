import React from 'react';
import { Layers, ShieldCheck, Sparkles, Cpu, Check, Box } from 'lucide-react';

export const AtelierStandards: React.FC = () => {
  const standards = [
    {
      num: '01',
      title: '260-450 GSM HEAVYWEIGHT FIBER',
      desc: 'We reject flimsy 140 GSM fast-fashion fabrics. Every KULT99 silhouette is cut from custom-milled long-staple Indian combed cotton. Summer tees start at 260 GSM; our winter fleece tops out at 450 GSM for an imposing, intentional silhouette.',
      icon: <Layers className="w-5 h-5 text-neutral-300" />
    },
    {
      num: '02',
      title: 'ZERO-SAG NECKLINE ARCHITECTURE',
      desc: 'The most common defect in streetwear is collar baconing. Our collars use a high-gauge, spandex-reinforced 2x2 rib that expands smoothly over the head and snaps back flush against the clavicle, retaining tension wash after wash.',
      icon: <ShieldCheck className="w-5 h-5 text-neutral-300" />
    },
    {
      num: '03',
      title: 'HIGH-DENSITY 3D INDUSTRIAL PRINTS',
      desc: 'Our graphics use specialized high-density silicone and puff inks cured under high thermal pressure. This gives tactile depth to our typography while remaining pliable so prints will never split, flake, or crack.',
      icon: <Cpu className="w-5 h-5 text-neutral-300" />
    },
    {
      num: '04',
      title: 'INTENTIONAL BOXY CUT GEOMETRY',
      desc: 'Streetwear proportions should never feel like an upsized standard t-shirt. We engineer drop-shoulder sleeves with a calculated pitch and wider body circumferences, balancing torso drape perfectly against our parachute pants.',
      icon: <Box className="w-5 h-5 text-neutral-300" />
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#0a0a0a] border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>THE PRODUCTION MATRIX</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
              GARMENT ARCHITECTURE
            </h2>
          </div>
          <div className="mt-2 sm:mt-0 text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
            ENGINEERED WITHOUT COMPROMISE
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {standards.map((item) => (
            <div
              key={item.num}
              className="bg-[#121212] border border-neutral-850 p-6 flex flex-col justify-between hover:border-neutral-700 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-neutral-500 group-hover:text-white transition-colors">
                    {item.num}
                  </span>
                  <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-xs">
                    {item.icon}
                  </div>
                </div>

                <h3 className="font-heading font-bold text-sm text-white uppercase tracking-tight leading-snug">
                  {item.title}
                </h3>

                <p className="text-neutral-400 font-sans text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-neutral-850 text-[10px] font-mono text-neutral-500 flex items-center gap-1.5 uppercase">
                <Check className="w-3 h-3 text-white" />
                <span>KULT99 ATELIER STANDARD</span>
              </div>
            </div>
          ))}
        </div>

        {/* Spec Matrix Banner */}
        <div className="mt-12 p-6 bg-[#141414] border border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center sm:text-left">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
              FIBER INTEGRITY
            </span>
            <span className="font-heading font-bold text-sm text-white block uppercase">
              100% COMBED COTTON
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
              PRE-SHRUNK
            </span>
            <span className="font-heading font-bold text-sm text-white block uppercase">
              ZERO POST-WASH SHRINKAGE
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
              STITCH DENSITY
            </span>
            <span className="font-heading font-bold text-sm text-white block uppercase">
              REINFORCED TOPSTITCHING
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
              BATCH LIMIT
            </span>
            <span className="font-heading font-bold text-sm text-white block uppercase">
              250 UNITS PER RUN
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
