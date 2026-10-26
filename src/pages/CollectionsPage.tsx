import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ProductImage } from '../components/ProductImage';

export const CollectionsPage: React.FC = () => {
  const collections = [
    {
      id: 'drop-04',
      title: 'DROP 04 // CHROMA OBSIDIAN',
      subtitle: 'Winter 2026 Architectural Heavyweights',
      description: 'Engineered for cold Northern streets. 450 GSM unbrushed loopback cotton fleece, double layered hoods with zero drawstrings, and extreme drop-shoulder boxy tailoring.',
      image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85',
      category: 'hoodies',
      pieces: '5 Silhouettes',
      specs: '420 - 450 GSM'
    },
    {
      id: 'acid-minerals',
      title: 'ACID MINERAL WASH ARCHIVE',
      subtitle: 'Organic Cotton Band & Industrial Graphics',
      description: 'Each piece undergoes a 12-hour mineral bath and stone tumbled finish, yielding a one-of-a-kind vintage fade. Finished with 3D high-density puff spine typography.',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85',
      category: 'oversized-tees',
      pieces: '8 Silhouettes',
      specs: '260 - 280 GSM'
    },
    {
      id: 'parachute-util',
      title: 'TACTICAL PARACHUTE & DENIMS',
      subtitle: 'Voluminous Stacking Bottoms',
      description: '8-pocket ripstop parachute pants with ankle bungee adjusters alongside 14oz rigid Indian denim with raw distressed hems that stack perfectly over sneakers.',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=85',
      category: 'bottomwear',
      pieces: '6 Silhouettes',
      specs: 'Ripstop & 14oz Denim'
    },
    {
      id: 'core-atelier',
      title: 'CORE ATELIER ESSENTIALS',
      subtitle: 'Clean Cut Daily Tailoring',
      description: 'Standard tailored silhouettes crafted with 220 GSM high-gauge combed cotton and subtle silicone chest micro-badges for minimalist layering.',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85',
      category: 'regular-fit',
      pieces: '4 Silhouettes',
      specs: '220 GSM Enzyme Finish'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      {/* Header */}
      <div className="border-b border-neutral-900 bg-[#0f0f0f] py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 mb-2">
            EDITORIAL LOOKBOOKS // SEASONAL DROPS
          </div>
          <h1 className="font-heading text-3xl sm:text-6xl font-extrabold uppercase tracking-tight">
            COLLECTIONS ARCHIVE
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-2 max-w-xl">
            Strictly numbered production batches. No fast seasonal re-runs. Explore the campaign visual journals below.
          </p>
        </div>
      </div>

      {/* Collections Stack */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {collections.map((col, index) => (
          <div
            key={col.id}
            className="border border-neutral-800 bg-[#121212] grid grid-cols-1 lg:grid-cols-12 overflow-hidden hover:border-neutral-700 transition-all duration-300"
          >
            {/* Image (alternating order on desktop) */}
            <div className={`lg:col-span-6 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto min-h-[350px] overflow-hidden ${
              index % 2 === 1 ? 'lg:order-2' : ''
            }`}>
              <ProductImage
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover object-center filter contrast-[1.08] hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
              
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 border border-neutral-800 text-[10px] font-mono tracking-widest uppercase">
                {col.specs}
              </div>
            </div>

            {/* Info */}
            <div className={`lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 ${
              index % 2 === 1 ? 'lg:order-1' : ''
            }`}>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  <span>{col.pieces}</span>
                  <span>•</span>
                  <span>LIMITED RUN</span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight leading-snug">
                  {col.title}
                </h2>

                <p className="text-xs font-mono text-neutral-300 uppercase tracking-wider">
                  {col.subtitle}
                </p>

                <p className="text-xs font-sans text-neutral-400 leading-relaxed pt-2">
                  {col.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800">
                <Link
                  to={`/shop?category=${col.category}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black text-xs font-mono font-bold tracking-[0.2em] uppercase hover:bg-neutral-200 transition-colors"
                >
                  <span>SHOP THIS DROP</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
