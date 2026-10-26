import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Heart, ShoppingBag, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const AccountPage: React.FC = () => {
  const { wishlist, orders, cart, cartSubtotal } = useShop();

  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));
  const latestCustomerName = orders.length > 0 ? orders[0].customer.name : 'GUEST MEMBER';
  const latestEmail = orders.length > 0 ? orders[0].customer.email : 'atelier.guest@kult99.com';

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      {/* Header */}
      <div className="border-b border-neutral-900 bg-[#0f0f0f] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 mb-1">
              DEMO STORE MEMBER PORTAL
            </div>
            <h1 className="font-heading text-2xl sm:text-4xl font-extrabold uppercase tracking-tight">
              {latestCustomerName}
            </h1>
            <p className="text-xs font-mono text-neutral-400 mt-1">
              SESSION PROFILE • {latestEmail}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link
              to="/wishlist"
              className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-xs font-mono uppercase text-neutral-300 hover:text-white flex items-center gap-2"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>SAVED ({wishlist.length})</span>
            </Link>
            <Link
              to="/shop"
              className="px-4 py-2 bg-white text-black font-bold text-xs font-mono uppercase hover:bg-neutral-200"
            >
              BROWSE CATALOG
            </Link>
          </div>
        </div>
      </div>

      {/* Main Account Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Order History */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-850">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-neutral-400" />
                <h2 className="font-heading text-base uppercase font-bold text-white">
                  DEMO ORDER DISPATCH ARCHIVE
                </h2>
              </div>
              <span className="text-[11px] font-mono text-neutral-500">
                {orders.length} {orders.length === 1 ? 'ORDER RECORDED' : 'ORDERS RECORDED'}
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="p-8 bg-[#121212] border border-dashed border-neutral-800 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 mx-auto">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-base uppercase text-white">
                  NO DEMO ORDERS PLACED YET
                </h3>
                <p className="text-xs font-mono text-neutral-400 max-w-sm mx-auto">
                  When you test the checkout flow, your simulated order reference, item details, and status will appear here.
                </p>
                <div className="pt-2">
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors"
                  >
                    <span>TEST SHOPPING FLOW</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-5 bg-[#121212] border border-neutral-850 space-y-4 hover:border-neutral-750 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                      <div>
                        <span className="font-mono text-xs font-bold text-white block">
                          {ord.id}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-500">
                          PLACED ON {ord.createdAt}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 border text-emerald-400 bg-emerald-950/70 border-emerald-800">
                        {ord.status}
                      </span>
                    </div>

                    {/* Order items list */}
                    <div className="space-y-2">
                      {ord.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-xs font-mono">
                          <span className="text-neutral-300">
                            {item.product.name} (Size: {item.size}) × {item.quantity}
                          </span>
                          <span className="font-bold text-white">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 flex flex-wrap items-center justify-between text-[11px] font-mono text-neutral-400 border-t border-neutral-850/60 gap-2">
                      <span>
                        DELIVER TO: <strong className="text-white">{ord.customer.name}</strong>, {ord.customer.city} ({ord.customer.pincode})
                      </span>
                      <span className="font-bold text-white">
                        TOTAL: ₹{ord.total.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Demo Notice */}
            <div className="p-4 bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400">
              <strong>DEMO STORE NOTICE:</strong> Orders are stored in your browser session for portfolio testing. No real orders are dispatched or charged.
            </div>
          </div>

          {/* Right Column: Bag & Wishlist Overview */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Active Bag Summary */}
            <div className="p-5 bg-[#121212] border border-neutral-850 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800 text-white font-heading font-bold text-sm uppercase">
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-neutral-400" />
                  <span>CURRENT BAG</span>
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {cart.length} ITEMS
                </span>
              </div>
              <div className="text-xs font-mono text-neutral-300 space-y-1">
                <div className="flex justify-between">
                  <span className="text-neutral-400">BAG SUBTOTAL:</span>
                  <span className="font-bold text-white">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
              {cart.length > 0 && (
                <div className="pt-2">
                  <Link
                    to="/checkout"
                    className="block w-full py-2.5 bg-white text-black text-center text-xs font-mono font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                  >
                    GO TO CHECKOUT
                  </Link>
                </div>
              )}
            </div>

            {/* Saved Wishlist Highlights */}
            <div className="p-5 bg-[#121212] border border-neutral-850 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800 text-white font-heading font-bold text-sm uppercase">
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-neutral-400" />
                  <span>SAVED WISHLIST</span>
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {wishlist.length} PIECES
                </span>
              </div>
              
              {wishlistedProducts.length > 0 ? (
                <div className="space-y-2">
                  {wishlistedProducts.slice(0, 3).map((item) => (
                    <Link
                      key={item.id}
                      to={`/product/${item.id}`}
                      className="flex items-center justify-between text-xs font-mono text-neutral-300 hover:text-white py-1 border-b border-neutral-850 last:border-b-0"
                    >
                      <span className="truncate pr-2">{item.name}</span>
                      <span className="font-bold shrink-0">₹{item.price.toLocaleString('en-IN')}</span>
                    </Link>
                  ))}
                  <div className="pt-2">
                    <Link
                      to="/wishlist"
                      className="block text-center text-[11px] font-mono text-neutral-400 hover:text-white uppercase underline"
                    >
                      VIEW ALL SAVED ITEMS
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="text-xs font-mono text-neutral-500">
                  No saved items in your session yet.
                </p>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
