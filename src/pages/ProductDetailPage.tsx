import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductSize } from '../types';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { ProductImage } from '../components/ProductImage';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'sizing' | 'shipping'>('details');

  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    showToast
  } = useShop();

  const isWishlisted = isInWishlist(product.id);

  // Set default in-stock size when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
    const firstInStock = product.sizes.find(s => s.inStock)?.size || null;
    setSelectedSize(firstInStock);
    setSelectedImageIndex(0);
    setQuantity(1);
  }, [product]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast('Please select a size first', 'error');
      return;
    }
    addToCart(product, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      showToast('Please select a size first', 'error');
      return;
    }
    addToCart(product, selectedSize, quantity);
    navigate('/checkout');
  };

  // Related products from same category or featured
  const relatedProducts = PRODUCTS.filter(
    p => p.id !== product.id && (p.category === product.category || p.isFeatured)
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      
      {/* Breadcrumb Navigation */}
      <nav className="border-b border-neutral-900 bg-[#0f0f0f] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider uppercase text-neutral-500 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-white transition-colors">HOME</Link>
            <ChevronRight className="w-3 h-3 text-neutral-600" />
            <Link to="/shop" className="hover:text-white transition-colors">SHOP</Link>
            <ChevronRight className="w-3 h-3 text-neutral-600" />
            <Link to={`/shop?category=${product.category}`} className="hover:text-white transition-colors">
              {product.categoryLabel}
            </Link>
            <ChevronRight className="w-3 h-3 text-neutral-600" />
            <span className="text-neutral-300 font-bold truncate">{product.name}</span>
          </div>
        </div>
      </nav>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 bg-neutral-900 border overflow-hidden shrink-0 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-white ring-1 ring-white'
                      : 'border-neutral-800 opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <ProductImage
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="relative aspect-[3/4] w-full bg-neutral-900 border border-neutral-850 overflow-hidden group">
              <ProductImage
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top filter contrast-[1.05] transition-transform duration-500 group-hover:scale-105"
              />

              {/* Badges on Main Image */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.dropNumber && (
                  <span className="bg-white text-black text-[10px] font-mono font-bold tracking-widest px-2.5 py-0.5 uppercase shadow-md">
                    {product.dropNumber}
                  </span>
                )}
                {product.gsm && (
                  <span className="bg-black/80 backdrop-blur-md text-white border border-neutral-700 text-[10px] font-mono font-bold tracking-widest px-2.5 py-0.5 uppercase">
                    {product.gsm} GSM HEAVYWEIGHT
                  </span>
                )}
              </div>

              {/* Wishlist Button on image */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all ${
                  isWishlisted
                    ? 'bg-white text-red-600'
                    : 'bg-black/60 text-neutral-300 hover:text-white hover:bg-black/90'
                }`}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

          </div>

          {/* Right Column: Product Purchasing & Specs */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header / Title */}
            <div className="space-y-2 border-b border-neutral-850 pb-5">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 uppercase tracking-widest">
                <span>{product.categoryLabel}</span>
                <span className="text-emerald-400">IN STOCK & READY TO SHIP</span>
              </div>
              
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Price & MRP */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="font-mono text-base text-neutral-500 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="bg-red-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 uppercase">
                      SAVE {product.discountPercentage}%
                    </span>
                  </>
                )}
              </div>

              <div className="text-[11px] font-mono text-neutral-400">
                MRP inclusive of all taxes. Free express shipping on this order.
              </div>
            </div>

            {/* Fabric Highlight Badge */}
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-neutral-900/60 border border-neutral-850 text-xs font-mono">
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">FABRIC</span>
                <span className="text-white font-medium">{product.gsm} GSM French Terry</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">FIT PROFILE</span>
                <span className="text-white font-medium">{product.fit}</span>
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-widest uppercase text-white font-bold">
                  SELECT SIZE: {selectedSize ? `[${selectedSize}]` : ''}
                </span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white uppercase transition-colors underline underline-offset-4"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>SIZE GUIDE</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map(({ size, inStock }) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      disabled={!inStock}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-xs font-mono font-bold uppercase transition-all border ${
                        !inStock
                          ? 'bg-neutral-950 text-neutral-600 border-neutral-900 line-through cursor-not-allowed'
                          : isSelected
                          ? 'bg-white text-black border-white ring-2 ring-white/50 shadow-lg'
                          : 'bg-neutral-900 text-neutral-200 border-neutral-800 hover:border-neutral-600 hover:bg-neutral-850'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono tracking-widest uppercase text-white font-bold">
                QUANTITY:
              </span>
              <div className="flex items-center border border-neutral-700 bg-neutral-900">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-neutral-400 hover:text-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 py-1 text-xs font-mono font-bold text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-neutral-400 hover:text-white transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Action Buttons: Add to Cart & Buy Now */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-4 bg-white text-black hover:bg-neutral-200 text-xs font-mono font-bold tracking-[0.25em] uppercase transition-all flex items-center justify-center gap-2 shadow-xl"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO BAG • ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-neutral-900 border border-neutral-700 text-white hover:bg-neutral-800 text-xs font-mono font-bold tracking-[0.25em] uppercase transition-all"
              >
                BUY IT NOW (DEMO EXPRESS)
              </button>
            </div>

            {/* Store Guarantees */}
            <div className="pt-4 border-t border-neutral-850 space-y-2.5 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-neutral-300 shrink-0" />
                <span>DISPATCHED WITHIN 24-48 HOURS FROM NEW DELHI ATELIER</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-neutral-300 shrink-0" />
                <span>EASY 7-DAY DOORSTEP EXCHANGE POLICY</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-neutral-300 shrink-0" />
                <span>100% AUTHENTIC COMBED COTTON GUARANTEE</span>
              </div>
            </div>

            {/* Accordion Tabs for Product Details */}
            <div className="pt-6 border-t border-neutral-850">
              <div className="flex border-b border-neutral-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('details')}
                  className={`py-2 px-3 text-xs font-mono tracking-wider uppercase border-b-2 transition-all ${
                    activeTab === 'details'
                      ? 'border-white text-white font-bold'
                      : 'border-transparent text-neutral-500 hover:text-white'
                  }`}
                >
                  DETAILS & FABRIC
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('sizing')}
                  className={`py-2 px-3 text-xs font-mono tracking-wider uppercase border-b-2 transition-all ${
                    activeTab === 'sizing'
                      ? 'border-white text-white font-bold'
                      : 'border-transparent text-neutral-500 hover:text-white'
                  }`}
                >
                  FIT & SILHOUETTE
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('shipping')}
                  className={`py-2 px-3 text-xs font-mono tracking-wider uppercase border-b-2 transition-all ${
                    activeTab === 'shipping'
                      ? 'border-white text-white font-bold'
                      : 'border-transparent text-neutral-500 hover:text-white'
                  }`}
                >
                  CARE & WASH
                </button>
              </div>

              <div className="py-4 text-xs font-sans text-neutral-400 leading-relaxed">
                {activeTab === 'details' && (
                  <div className="space-y-3">
                    <p>{product.description}</p>
                    <ul className="list-disc pl-4 space-y-1 font-mono text-[11px] text-neutral-300">
                      <li>Fabric: {product.fabric}</li>
                      <li>Weight: {product.gsm} GSM Heavyweight Construction</li>
                      <li>Color: {product.color}</li>
                      <li>Double-needle construction across stress points</li>
                    </ul>
                  </div>
                )}

                {activeTab === 'sizing' && (
                  <div className="space-y-2">
                    <p>
                      <strong>Fit:</strong> {product.fit}. Features a relaxed dropped shoulder cut with intentional boxiness through the chest.
                    </p>
                    <p>
                      Model is 6'1" (185 cm) wearing size L. We recommend choosing your typical size for our signature oversized look.
                    </p>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-2">
                    <ul className="list-disc pl-4 space-y-1 font-mono text-[11px] text-neutral-300">
                      {product.care.map((careItem, i) => (
                        <li key={i}>{careItem}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-neutral-900">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-neutral-800">
              <h2 className="font-heading text-xl sm:text-2xl font-extrabold uppercase text-white tracking-tight">
                COMPLETE THE LOOK
              </h2>
              <Link
                to="/shop"
                className="text-xs font-mono text-neutral-400 hover:text-white uppercase flex items-center gap-1"
              >
                <span>EXPLORE ALL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Sticky Mobile Add To Bag Bar (Fixed to bottom for mobile view) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-[#111111]/95 backdrop-blur-md border-t border-neutral-800 p-3 z-30 flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <span className="font-heading text-xs font-bold text-white block uppercase truncate max-w-[150px]">
            {product.name}
          </span>
          <span className="font-mono text-sm font-bold text-white">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 max-w-[200px] py-3 bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1.5"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>ADD TO BAG</span>
        </button>
      </div>

    </div>
  );
};
