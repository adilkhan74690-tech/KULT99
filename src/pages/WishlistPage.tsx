import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist } = useShop();

  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      {/* Banner */}
      <div className="border-b border-neutral-900 bg-[#0f0f0f] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 mb-2">
            ARCHIVE // PERSONAL CURATION
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight">
            SAVED WISHLIST ({wishlistedProducts.length})
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-2 max-w-xl">
            Items saved to your local session. Stock is limited to 250 units per numbered drop.
          </p>
        </div>
      </div>

      {/* Grid or Empty State */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {wishlistedProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 border border-dashed border-neutral-800 p-8 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-heading text-lg uppercase text-white font-bold">
              YOUR WISHLIST IS CURRENTLY EMPTY
            </h3>
            <p className="text-xs font-mono text-neutral-400 max-w-sm mx-auto">
              Tap the heart icon on any oversized tee, hoodie, or parachute bottom to track and save pieces.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors"
              >
                <span>EXPLORE DROP 04</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
