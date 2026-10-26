import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductImage } from './ProductImage';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some(tag => tag.toLowerCase().includes(q))
        );
      })
    : [];

  const handleSelectProduct = (productId: string) => {
    setIsSearchOpen(false);
    navigate(`/product/${productId}`);
  };

  const quickSearchTags = ['OVERSIZED', '450 GSM', 'ACID WASH', 'HOODIE', 'PARACHUTE', 'PUFF PRINT'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative w-full max-w-2xl bg-[#111111] border border-neutral-800 shadow-2xl p-6 sm:p-8 my-8 sm:my-16">
          
          {/* Search Header & Input */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400">
              SEARCH ARCHIVE
            </span>
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="text-neutral-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative my-4">
            <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH BY PRODUCT NAME, FABRIC, OR GSM..."
              className="w-full bg-[#181818] border border-neutral-800 text-white pl-11 pr-4 py-3.5 text-xs font-mono tracking-wider focus:outline-none focus:border-white uppercase placeholder:text-neutral-600"
            />
          </div>

          {/* Quick Search Tags */}
          <div className="flex items-center gap-2 flex-wrap pb-4 border-b border-neutral-850">
            <span className="text-[10px] font-mono text-neutral-500 uppercase flex items-center gap-1">
              <Tag className="w-3 h-3" /> SUGGESTIONS:
            </span>
            {quickSearchTags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => setQuery(tag)}
                className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-neutral-300 text-[10px] font-mono tracking-wider uppercase transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Results */}
          <div className="mt-4 max-h-96 overflow-y-auto space-y-2">
            {query.trim() === '' ? (
              <div className="py-8 text-center text-xs font-mono text-neutral-500">
                Type above to inspect Drop 04 items, fabrics, and weights.
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-neutral-400">
                No matching silhouettes found for "{query}".
              </div>
            ) : (
              filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleSelectProduct(p.id)}
                  className="flex items-center gap-4 p-2.5 bg-neutral-900/60 border border-neutral-850 hover:border-neutral-700 hover:bg-neutral-850 cursor-pointer transition-all group"
                >
                  <div className="w-12 h-14 bg-neutral-950 overflow-hidden shrink-0">
                    <ProductImage
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-500">
                        {p.categoryLabel}
                      </span>
                      {p.gsm && (
                        <span className="text-[9px] font-mono text-neutral-400">
                          • {p.gsm} GSM
                        </span>
                      )}
                    </div>
                    <h4 className="font-heading font-bold text-xs uppercase text-white truncate group-hover:text-neutral-200">
                      {p.name}
                    </h4>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-xs font-bold text-white block">
                      ₹{p.price.toLocaleString('en-IN')}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white ml-auto mt-1 transition-colors" />
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
