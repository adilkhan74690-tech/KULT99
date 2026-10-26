import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { ProductImage } from './ProductImage';

export const CategoryGrid: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#0c0c0c] border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-neutral-800">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 block mb-1">
              ARCHITECTURAL FORM
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
              SHOP BY CATEGORY
            </h2>
          </div>
          <Link
            to="/shop"
            className="mt-2 sm:mt-0 text-xs font-mono tracking-widest text-neutral-400 hover:text-white uppercase flex items-center gap-1.5 transition-colors group"
          >
            <span>VIEW ALL SILHOUETTES</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.id}`}
              className="group relative aspect-[3/4] overflow-hidden bg-neutral-900 border border-neutral-800 flex flex-col justify-end p-5 transition-all duration-300 hover:border-neutral-600"
            >
              {/* Background Photography */}
              <ProductImage
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.8] group-hover:scale-105 group-hover:brightness-[0.95] transition-all duration-700"
                loading="lazy"
              />

              {/* Dark Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

              {/* Top Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[9px] font-mono tracking-widest uppercase bg-black/70 backdrop-blur-md text-neutral-300 border border-neutral-800 px-2 py-0.5">
                  {cat.itemCount}
                </span>
              </div>

              {/* Bottom Card Content */}
              <div className="relative z-10 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-lg sm:text-xl font-bold uppercase text-white group-hover:text-neutral-200 transition-colors">
                    {cat.name}
                  </h3>
                  <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-[11px] font-mono tracking-wider text-neutral-400">
                  {cat.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
