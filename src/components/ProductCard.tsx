import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus } from 'lucide-react';
import { Product, ProductSize } from '../types';
import { useShop } from '../context/ShopContext';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickAdding, setIsQuickAdding] = useState(false);

  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const wishlisted = isInWishlist(product.id);

  const handleQuickAdd = (size: ProductSize, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, size, 1);
    setIsQuickAdding(false);
  };

  return (
    <div
      className="group relative flex flex-col bg-[#111111] border border-neutral-900 hover:border-neutral-700 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsQuickAdding(false);
      }}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          {/* Main Image */}
          <ProductImage
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover object-top transition-all duration-500 ${
              isHovered && product.images[1] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
            loading="lazy"
          />

          {/* Secondary Image on Hover */}
          {product.images[1] && (
            <ProductImage
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-500 ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              loading="lazy"
            />
          )}
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.isNewArrival && (
            <span className="bg-white text-black text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 uppercase shadow-sm">
              NEW
            </span>
          )}
          {product.gsm && (
            <span className="bg-black/80 backdrop-blur-md text-neutral-300 border border-neutral-800 text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 uppercase">
              {product.gsm} GSM
            </span>
          )}
        </div>

        {/* Top Right: Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 z-20 p-2 rounded-full transition-all duration-200 ${
            wishlisted
              ? 'bg-white text-red-600'
              : 'bg-black/60 backdrop-blur-md text-neutral-300 hover:text-white hover:bg-black/90'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Discount Badge on bottom right of image */}
        {product.discountPercentage > 0 && (
          <span className="absolute bottom-2.5 right-2.5 bg-red-600 text-white text-[9px] font-mono font-bold px-1.5 py-0.5">
            -{product.discountPercentage}%
          </span>
        )}

        {/* Quick Add Size Bar (Desktop Hover Slide-Up) */}
        <div
          className={`absolute inset-x-0 bottom-0 bg-[#0c0c0c]/95 backdrop-blur-md border-t border-neutral-800 p-3 transition-transform duration-300 z-20 ${
            isQuickAdding
              ? 'translate-y-0 opacity-100'
              : 'translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
              SELECT SIZE:
            </span>
            <button
              type="button"
              onClick={() => setIsQuickAdding(false)}
              className="text-[10px] font-mono text-neutral-500 hover:text-white uppercase"
            >
              CLOSE
            </button>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {product.sizes.map(({ size, inStock }) => (
              <button
                key={size}
                type="button"
                disabled={!inStock}
                onClick={(e) => handleQuickAdd(size, e)}
                className={`py-1.5 text-[10px] font-mono font-bold uppercase transition-all ${
                  !inStock
                    ? 'bg-neutral-900 text-neutral-600 line-through cursor-not-allowed border border-neutral-900'
                    : 'bg-neutral-800 hover:bg-white hover:text-black text-neutral-200 border border-neutral-700'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Hover "QUICK ADD" trigger button */}
        {!isQuickAdding && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsQuickAdding(true);
            }}
            className="hidden sm:flex absolute inset-x-3 bottom-3 z-10 items-center justify-center gap-1.5 py-2.5 bg-white/95 text-black hover:bg-white text-xs font-mono font-bold tracking-widest uppercase shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>QUICK ADD</span>
          </button>
        )}
      </div>

      {/* Product Details Section */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-2">
        <div>
          {/* Category & Color */}
          <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-1">
            <span>{product.categoryLabel}</span>
            <span>{product.color}</span>
          </div>

          {/* Product Name */}
          <Link
            to={`/product/${product.id}`}
            className="block font-heading text-sm sm:text-base font-bold text-white hover:text-neutral-300 transition-colors uppercase leading-tight line-clamp-1"
          >
            {product.name}
          </Link>
        </div>

        {/* Price & Mobile Quick Add */}
        <div className="flex items-center justify-between pt-1 border-t border-neutral-900">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-sm sm:text-base font-bold text-white">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="font-mono text-xs text-neutral-500 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Mobile Quick Add Icon Trigger */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsQuickAdding(!isQuickAdding);
            }}
            className="sm:hidden p-1.5 bg-neutral-800 text-white rounded-xs hover:bg-white hover:text-black transition-colors"
            aria-label="Select size"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
