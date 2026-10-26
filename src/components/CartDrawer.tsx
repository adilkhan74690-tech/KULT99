import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductImage } from './ProductImage';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    shippingFee,
    freeShippingThreshold,
    discountAmount,
    promoCode,
    applyPromoCode,
    removePromoCode
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const freeShippingDifference = freeShippingThreshold - cartSubtotal;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + (cart.length > 0 ? shippingFee : 0));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#111111] border-l border-neutral-800 text-white flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-neutral-300" />
              <h2 className="font-heading font-extrabold text-lg uppercase tracking-tight">
                SHOPPING BAG ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#181818] border-b border-neutral-800 px-5 py-3">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider mb-2">
              <Truck className="w-4 h-4 text-neutral-300 shrink-0" />
              {freeShippingDifference <= 0 ? (
                <span className="text-emerald-400 font-bold uppercase">
                  UNLOCKED: FREE ALL-INDIA EXPRESS SHIPPING!
                </span>
              ) : (
                <span className="text-neutral-300">
                  ADD <strong className="text-white">₹{freeShippingDifference.toLocaleString('en-IN')}</strong> MORE FOR FREE SHIPPING
                </span>
              )}
            </div>
            <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-white h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base uppercase text-white">
                    YOUR BAG IS EMPTY
                  </h3>
                  <p className="text-xs font-mono text-neutral-500 mt-1 max-w-xs">
                    Drop 04 inventory is moving rapidly. Add your preferred sizes before they archive.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="px-6 py-3 bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors"
                >
                  DISCOVER NEW ARRIVALS
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-[#161616] border border-neutral-850 hover:border-neutral-750 transition-colors"
                >
                  {/* Thumbnail */}
                  <Link
                    to={`/product/${item.product.id}`}
                    onClick={() => setIsCartOpen(false)}
                    className="w-20 h-24 bg-neutral-900 border border-neutral-800 overflow-hidden shrink-0"
                  >
                    <ProductImage
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${item.product.id}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-heading font-bold text-xs uppercase text-white hover:text-neutral-300 line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-1.5 py-0.5 bg-neutral-800 text-[10px] font-mono font-bold text-neutral-200 border border-neutral-700">
                          SIZE: {item.size}
                        </span>
                        {item.product.gsm && (
                          <span className="text-[10px] font-mono text-neutral-500">
                            {item.product.gsm} GSM
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stepper & Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-neutral-700 bg-neutral-900">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-neutral-400 hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-1 text-xs font-mono font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-neutral-400 hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right font-mono text-xs font-bold text-white">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary (Visible only if cart has items) */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-neutral-800 bg-[#0e0e0e] space-y-4">
              
              {/* Promo code form */}
              {promoCode ? (
                <div className="flex items-center justify-between p-2.5 bg-neutral-900 border border-neutral-700 text-xs font-mono">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Tag className="w-3.5 h-3.5" />
                    <span>CODE: <strong>{promoCode}</strong> APPLIED (-₹{discountAmount})</span>
                  </div>
                  <button
                    type="button"
                    onClick={removePromoCode}
                    className="text-neutral-400 hover:text-white text-[11px] underline"
                  >
                    REMOVE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="PROMO CODE (e.g. RAW10)"
                      className="flex-1 bg-neutral-900 border border-neutral-800 px-3 py-2 text-xs font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-white uppercase"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-mono font-bold text-white uppercase border border-neutral-700 transition-colors"
                    >
                      APPLY
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[10px] font-mono text-red-400">{promoError}</p>
                  )}
                </form>
              )}

              {/* Subtotal, Shipping, Total */}
              <div className="space-y-2 text-xs font-mono text-neutral-400 pt-2 border-t border-neutral-850">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span className="text-white font-bold">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>DISCOUNT ({promoCode})</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>ESTIMATED ALL-INDIA SHIPPING</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-800">
                  <span>ESTIMATED TOTAL</span>
                  <span className="font-heading text-base">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[10px] text-neutral-500">
                  Taxes and GST calculated at checkout.
                </p>
              </div>

              {/* Checkout CTA */}
              <button
                type="button"
                onClick={handleCheckoutClick}
                className="w-full py-4 bg-white text-black hover:bg-neutral-200 text-xs font-mono font-bold tracking-[0.25em] uppercase transition-all flex items-center justify-center gap-2 shadow-2xl"
              >
                <span>PROCEED TO DEMO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="w-full text-center text-[11px] font-mono text-neutral-500 hover:text-white uppercase transition-colors"
              >
                OR CONTINUE SHOPPING
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
