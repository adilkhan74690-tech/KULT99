import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown, Check, RotateCcw, ArrowUpDown } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { ProductCategory, ProductSize, SortOption } from '../types';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as ProductCategory) || 'all';

  const [category, setCategory] = useState<ProductCategory | 'all'>(initialCategory);
  const [selectedSizes, setSelectedSizes] = useState<ProductSize[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(5500);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state if URL changes
  useEffect(() => {
    const cat = searchParams.get('category') as ProductCategory;
    if (cat) {
      setCategory(cat);
    }
  }, [searchParams]);

  const categories: { label: string; value: 'all' | ProductCategory }[] = [
    { label: 'ALL SILHOUETTES', value: 'all' },
    { label: 'OVERSIZED TEES', value: 'oversized-tees' },
    { label: 'HEAVYWEIGHT HOODIES', value: 'hoodies' },
    { label: 'PARACHUTE BOTTOMS', value: 'bottomwear' },
    { label: 'REGULAR FIT', value: 'regular-fit' },
  ];

  const availableSizes: ProductSize[] = ['S', 'M', 'L', 'XL', 'XXL'];

  const toggleSize = (size: ProductSize) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleCategorySelect = (val: 'all' | ProductCategory) => {
    setCategory(val);
    if (val === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: val });
    }
  };

  const resetFilters = () => {
    setCategory('all');
    setSelectedSizes([]);
    setMaxPrice(5500);
    setInStockOnly(false);
    setSortBy('featured');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category
    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }

    // Sizes
    if (selectedSizes.length > 0) {
      result = result.filter(p =>
        p.sizes.some(s => selectedSizes.includes(s.size) && s.inStock)
      );
    }

    // Max price
    result = result.filter(p => p.price <= maxPrice);

    // In stock only
    if (inStockOnly) {
      result = result.filter(p => p.sizes.some(s => s.inStock));
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [category, selectedSizes, maxPrice, inStockOnly, sortBy]);

  const activeFilterCount =
    (category !== 'all' ? 1 : 0) +
    selectedSizes.length +
    (maxPrice < 5500 ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      {/* Top Banner / Breadcrumb */}
      <div className="border-b border-neutral-900 bg-[#0f0f0f] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 mb-2">
            CATALOG // ARCHIVE RELEASES
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight">
            {category === 'all'
              ? 'ALL STREETWEAR SILHOUETTES'
              : categories.find(c => c.value === category)?.label}
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-2 max-w-xl">
            Custom engineered 260 GSM to 450 GSM heavyweight cottons. Each design cut with oversized architectural drape and reinforced details.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Controls Toolbar: Mobile filter button, active counts, and sort */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-850">
          
          {/* Mobile Filter Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-neutral-900 border border-neutral-800 text-xs font-mono font-bold tracking-wider uppercase hover:border-neutral-700"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>FILTERS</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-white text-black text-[9px] flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <span className="text-xs font-mono text-neutral-400">
              SHOWING <strong className="text-white">{filteredProducts.length}</strong> PIECES
            </span>
          </div>

          {/* Active Filter Chips & Clear Button */}
          {activeFilterCount > 0 && (
            <div className="hidden sm:flex items-center gap-2 flex-wrap">
              {category !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-300">
                  {category.toUpperCase()}
                  <button type="button" onClick={() => handleCategorySelect('all')}>
                    <X className="w-3 h-3 text-neutral-500 hover:text-white" />
                  </button>
                </span>
              )}
              {selectedSizes.map(s => (
                <span key={s} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-300">
                  SIZE: {s}
                  <button type="button" onClick={() => toggleSize(s)}>
                    <X className="w-3 h-3 text-neutral-500 hover:text-white" />
                  </button>
                </span>
              ))}
              <button
                type="button"
                onClick={resetFilters}
                className="text-[10px] font-mono text-neutral-500 hover:text-white uppercase flex items-center gap-1 underline underline-offset-2 ml-2"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                CLEAR ALL
              </button>
            </div>
          )}

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs font-mono text-neutral-500 uppercase hidden sm:inline">
              SORT:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-[#141414] border border-neutral-800 text-xs font-mono text-white tracking-wider px-3.5 py-2 pr-8 focus:outline-none focus:border-white uppercase cursor-pointer"
              >
                <option value="featured">FEATURED</option>
                <option value="newest">NEWEST ARRIVALS</option>
                <option value="price-low">PRICE: LOW TO HIGH</option>
                <option value="price-high">PRICE: HIGH TO LOW</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Layout: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-4">
            
            {/* Category Filter */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-bold pb-2 border-b border-neutral-850">
                CATEGORY
              </h3>
              <div className="space-y-1.5">
                {categories.map(cat => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => handleCategorySelect(cat.value)}
                    className={`w-full text-left py-1 text-xs font-mono tracking-wider uppercase transition-colors flex items-center justify-between ${
                      category === cat.value
                        ? 'text-white font-bold underline underline-offset-4'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {category === cat.value && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-bold pb-2 border-b border-neutral-850">
                SIZE
              </h3>
              <div className="grid grid-cols-5 gap-1.5">
                {availableSizes.map(size => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`py-2 text-xs font-mono font-bold uppercase transition-all border ${
                        isSelected
                          ? 'bg-white text-black border-white'
                          : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-600'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-850">
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-bold">
                  MAX PRICE
                </h3>
                <span className="font-mono text-xs text-neutral-300 font-bold">
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="1200"
                max="5500"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-white bg-neutral-800 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                <span>₹1,200</span>
                <span>₹5,500</span>
              </div>
            </div>

            {/* In-Stock Toggle */}
            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded-none bg-neutral-900 border-neutral-700 text-white focus:ring-0 w-4 h-4 accent-white cursor-pointer"
                />
                <span className="text-xs font-mono tracking-wider uppercase text-neutral-400 group-hover:text-white transition-colors">
                  IN-STOCK ONLY
                </span>
              </label>
            </div>

            {/* Reset Button */}
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono tracking-wider text-neutral-300 hover:text-white uppercase transition-colors"
              >
                RESET ALL FILTERS
              </button>
            )}

          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center space-y-4 border border-dashed border-neutral-800 p-8">
                <h3 className="font-heading text-lg uppercase text-white font-bold">
                  NO SILHOUETTES MATCH YOUR CRITERIA
                </h3>
                <p className="text-xs font-mono text-neutral-500 max-w-sm mx-auto">
                  Try clearing your size or price filters to discover all available archival items.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-6 py-3 bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors"
                >
                  RESET FILTERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filters Slide-over Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#111111] border-l border-neutral-800 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <span className="font-heading font-bold text-base uppercase text-white">
                  REFINE ARCHIVE
                </span>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="text-neutral-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block">
                  CATEGORY
                </span>
                <div className="space-y-1.5">
                  {categories.map(cat => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => handleCategorySelect(cat.value)}
                      className={`block w-full text-left py-1 text-xs font-mono uppercase ${
                        category === cat.value
                          ? 'text-white font-bold underline'
                          : 'text-neutral-400'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block">
                  SIZES
                </span>
                <div className="grid grid-cols-5 gap-1.5">
                  {availableSizes.map(size => {
                    const isSelected = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => toggleSize(size)}
                        className={`py-2 text-xs font-mono font-bold uppercase border ${
                          isSelected
                            ? 'bg-white text-black border-white'
                            : 'bg-neutral-900 text-neutral-300 border-neutral-800'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-neutral-500">MAX PRICE</span>
                  <span className="text-white font-bold">₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="1200"
                  max="5500"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-white bg-neutral-800"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800 space-y-2">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-white text-black text-xs font-mono font-bold tracking-widest uppercase"
              >
                APPLY FILTERS ({filteredProducts.length})
              </button>
              <button
                type="button"
                onClick={resetFilters}
                className="w-full py-2 text-center text-xs font-mono text-neutral-500 hover:text-white uppercase"
              >
                RESET ALL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
