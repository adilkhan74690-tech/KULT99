import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Hero } from '../components/Hero';
import { CategoryGrid } from '../components/CategoryGrid';
import { ProductCard } from '../components/ProductCard';
import { FeaturedBanner } from '../components/FeaturedBanner';
import { BrandStory } from '../components/BrandStory';
import { AtelierStandards } from '../components/AtelierStandards';
import { Newsletter } from '../components/Newsletter';
import { PRODUCTS } from '../data/products';
import { ProductCategory } from '../types';

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | ProductCategory>('all');

  const filteredProducts = activeTab === 'all'
    ? PRODUCTS.slice(0, 8)
    : PRODUCTS.filter(p => p.category === activeTab).slice(0, 8);

  const tabs: { label: string; value: 'all' | ProductCategory }[] = [
    { label: 'ALL NEW DROPS', value: 'all' },
    { label: 'OVERSIZED TEES', value: 'oversized-tees' },
    { label: 'HEAVY HOODIES', value: 'hoodies' },
    { label: 'PARACHUTE BOTTOMS', value: 'bottomwear' },
    { label: 'REGULAR FIT', value: 'regular-fit' },
  ];

  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      {/* Hero Section */}
      <Hero />

      {/* New Arrivals Product Grid Section */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-900">
        {/* Section Header with Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-neutral-800 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400 mb-1">
              <Sparkles className="w-3 h-3 text-white" />
              <span>INVENTORY RELEASE // DROP 04</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
              NEW ARRIVALS
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`px-3 py-1.5 text-[11px] font-mono tracking-wider uppercase whitespace-nowrap transition-all border ${
                  activeTab === tab.value
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-neutral-700 text-white hover:bg-white hover:text-black hover:border-white text-xs font-mono font-bold tracking-[0.25em] uppercase transition-all duration-300"
          >
            <span>VIEW COMPLETE CATALOG ({PRODUCTS.length} STYLES)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Shop by Category */}
      <CategoryGrid />

      {/* Fabric / Lookbook Feature Banner */}
      <FeaturedBanner />

      {/* Brand Story */}
      <BrandStory />

      {/* Atelier Garment Architecture & Engineering Standards */}
      <AtelierStandards />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};
