import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  CheckCircle2,
  Lock,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    shippingFee,
    discountAmount,
    promoCode,
    clearCart,
    addOrder
  } = useShop();

  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    firstName: 'Guest',
    lastName: 'Customer',
    email: 'customer@kult99.com',
    phone: '9876543210',
    address: '42, Hauz Khas Village',
    apartment: 'Floor 2',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110016',
    paymentMethod: 'upi', // 'upi' | 'cod' | 'card'
  });

  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const finalTotal = Math.max(0, cartSubtotal - discountAmount + (cart.length > 0 ? shippingFee : 0));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `K99-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      
      // Save order to ShopContext/localStorage
      addOrder({
        id: generatedId,
        createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        items: [...cart],
        subtotal: cartSubtotal,
        discount: discountAmount,
        shipping: shippingFee,
        total: finalTotal,
        customer: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        paymentMethod: formData.paymentMethod as any,
        status: 'DISPATCH CONFIRMED',
      });

      setIsSubmitting(false);
      setOrderComplete(true);
      clearCart();
    }, 900);
  };

  // If order is completed successfully, render celebration view
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#0c0c0c] text-white py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto bg-[#141414] border border-neutral-800 p-8 sm:p-12 shadow-2xl text-center space-y-6 animate-fade-in">
          
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-emerald-400 font-bold block">
              DEMO SIMULATION SUCCESSFUL
            </span>
            <h1 className="font-heading text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              DISPATCH CONFIRMED!
            </h1>
            <p className="text-xs font-mono text-neutral-400">
              ORDER REFERENCE: <strong className="text-white underline">{orderId}</strong>
            </p>
          </div>

          <div className="p-4 bg-[#181818] border border-neutral-800 text-left space-y-3 font-mono text-xs">
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-500">DELIVER TO:</span>
              <span className="text-white text-right">{formData.firstName} {formData.lastName} ({formData.city})</span>
            </div>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-500">ESTIMATED ARRIVAL:</span>
              <span className="text-emerald-400 text-right">3-4 BUSINESS DAYS (DELHI ATELIER EXPRESS)</span>
            </div>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-500">TOTAL SIMULATED:</span>
              <span className="text-white text-right font-bold">₹{finalTotal.toLocaleString('en-IN')} ({formData.paymentMethod.toUpperCase()})</span>
            </div>
          </div>

          {/* Demo Alert Box */}
          <div className="p-3.5 bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-400">
            <strong>NOTICE:</strong> This is a portfolio demonstration website. No money was charged, and no real physical garments will be delivered.
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/shop"
              className="px-8 py-3.5 bg-white text-black hover:bg-neutral-200 text-xs font-mono font-bold tracking-widest uppercase transition-colors"
            >
              EXPLORE MORE PIECES
            </Link>
            <Link
              to="/"
              className="px-8 py-3.5 bg-transparent border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 text-xs font-mono font-bold tracking-widest uppercase transition-colors"
            >
              RETURN TO ATELIER
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // If cart is empty and not ordered
  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-[#0c0c0c] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-4 border border-dashed border-neutral-800 p-8">
          <ShoppingBag className="w-12 h-12 text-neutral-600 mx-auto" />
          <h2 className="font-heading text-xl uppercase font-bold text-white">
            YOUR BAG IS EMPTY
          </h2>
          <p className="text-xs font-mono text-neutral-400">
            Please add an oversized tee, hoodie, or parachute pant before proceeding to checkout.
          </p>
          <Link
            to="/shop"
            className="inline-block px-8 py-3.5 bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors"
          >
            DISCOVER CATALOG
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* MANDATORY PROMINENT DEMO BANNER */}
        <div className="mb-8 p-4 bg-amber-950/40 border-2 border-amber-600/70 text-amber-200 text-xs font-mono flex items-center gap-3 shadow-lg">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <strong className="text-white block uppercase tracking-wider">
              DEMO STORE NOTICE — ORDERS ARE NOT ACTUALLY PLACED
            </strong>
            <span>
              This is a portfolio demo store for the KULT99 streetwear brand. No real payments are processed, and no real credit card or bank details are requested.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Demo Order Form */}
          <div className="lg:col-span-7 space-y-8">
            
            <form onSubmit={handlePlaceOrder} className="space-y-8">
              
              {/* Section 1: Contact Information */}
              <div className="p-6 bg-[#121212] border border-neutral-850 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <h2 className="font-heading text-base uppercase font-bold text-white">
                    1. CONTACT INFORMATION
                  </h2>
                  <span className="text-[10px] font-mono text-neutral-500">
                    STEP 1 OF 3
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <label className="block text-neutral-400 mb-1">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-white focus:outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">MOBILE NUMBER (INDIA)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-white focus:outline-none focus:border-white"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Shipping Address */}
              <div className="p-6 bg-[#121212] border border-neutral-850 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <h2 className="font-heading text-base uppercase font-bold text-white">
                    2. SHIPPING ADDRESS (INDIA)
                  </h2>
                  <span className="text-[10px] font-mono text-neutral-500">
                    STEP 2 OF 3
                  </span>
                </div>

                <div className="space-y-4 text-xs font-mono">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-neutral-400 mb-1">FIRST NAME</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-white focus:outline-none focus:border-white uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">LAST NAME</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-white focus:outline-none focus:border-white uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1">STREET ADDRESS / HOUSE NUMBER</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-white focus:outline-none focus:border-white uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1">APARTMENT / SUITE / LANDMARK (OPTIONAL)</label>
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleChange}
                      className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-white focus:outline-none focus:border-white uppercase"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-neutral-400 mb-1">CITY</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-white focus:outline-none focus:border-white uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">STATE</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-white focus:outline-none focus:border-white uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">PIN CODE</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-white focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Dummy Payment Selection */}
              <div className="p-6 bg-[#121212] border border-neutral-850 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <h2 className="font-heading text-base uppercase font-bold text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span>3. SIMULATED PAYMENT (DEMO ONLY)</span>
                  </h2>
                  <span className="text-[10px] font-mono text-neutral-500">
                    STEP 3 OF 3
                  </span>
                </div>

                <p className="text-xs font-mono text-neutral-400">
                  Select any simulated method below. No real transaction will occur:
                </p>

                <div className="space-y-3 font-mono text-xs">
                  {/* Option 1: Demo UPI */}
                  <label
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                      formData.paymentMethod === 'upi'
                        ? 'border-white bg-[#1a1a1a]'
                        : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleChange}
                        className="accent-white"
                      />
                      <QrCode className="w-4 h-4 text-neutral-300" />
                      <div>
                        <span className="font-bold text-white block">UPI / QR CODE (SIMULATED)</span>
                        <span className="text-[10px] text-neutral-400">GPay, PhonePe, Paytm (Instant Demo Approval)</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5">
                      FASTEST
                    </span>
                  </label>

                  {/* Option 2: Demo COD */}
                  <label
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-white bg-[#1a1a1a]'
                        : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                        className="accent-white"
                      />
                      <Banknote className="w-4 h-4 text-neutral-300" />
                      <div>
                        <span className="font-bold text-white block">CASH ON DELIVERY (SIMULATED)</span>
                        <span className="text-[10px] text-neutral-400">Pay cash upon simulated delivery</span>
                      </div>
                    </div>
                  </label>

                  {/* Option 3: Demo Card */}
                  <label
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-white bg-[#1a1a1a]'
                        : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleChange}
                        className="accent-white"
                      />
                      <CreditCard className="w-4 h-4 text-neutral-300" />
                      <div>
                        <span className="font-bold text-white block">TEST CREDIT / DEBIT CARD (SIMULATED)</span>
                        <span className="text-[10px] text-neutral-400">No card digits required</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-white text-black hover:bg-neutral-200 text-xs font-mono font-bold tracking-[0.25em] uppercase transition-all flex items-center justify-center gap-2 shadow-2xl disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>GENERATING DEMO DISPATCH...</span>
                ) : (
                  <>
                    <span>COMPLETE DEMO ORDER (₹{finalTotal.toLocaleString('en-IN')})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>

          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="p-6 bg-[#121212] border border-neutral-850 sticky top-28 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <h3 className="font-heading text-base uppercase font-bold text-white">
                  ORDER SUMMARY ({cart.reduce((s, i) => s + i.quantity, 0)})
                </h3>
                <Link
                  to="/shop"
                  className="text-xs font-mono text-neutral-400 hover:text-white uppercase flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>EDIT</span>
                </Link>
              </div>

              {/* Cart items review */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-3 text-xs font-mono pb-3 border-b border-neutral-850">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-14 h-16 object-cover bg-neutral-900 border border-neutral-800 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-white uppercase block truncate">
                        {item.product.name}
                      </span>
                      <span className="text-neutral-500 block">
                        SIZE: {item.size} • QTY: {item.quantity}
                      </span>
                    </div>
                    <div className="font-bold text-white shrink-0">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-2 text-xs font-mono text-neutral-400 pt-2">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span className="text-white">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>PROMO CODE ({promoCode})</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>ALL-INDIA EXPRESS DELIVERY</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-3 border-t border-neutral-800">
                  <span>FINAL TOTAL</span>
                  <span className="font-heading text-lg">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Dispatch Guarantee */}
              <div className="p-3 bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-400 space-y-1">
                <div className="text-white font-bold uppercase flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-neutral-300" />
                  <span>ALL-INDIA AIR EXPRESS</span>
                </div>
                <p>
                  Dispatched in discrete biodegradable heavy-duty mailers with security seal.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
