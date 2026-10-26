import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen
  } = useShop();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'SHOP ALL', path: '/shop', badge: 'NEW' },
    { label: 'COLLECTIONS', path: '/collections' },
    { label: 'ABOUT', path: '/about' },
    { label: 'CONTACT', path: '/contact' },
  ];

  const categoryQuickLinks = [
    { label: 'OVERSIZED TEES', path: '/shop?category=oversized-tees' },
    { label: 'HEAVYWEIGHT HOODIES', path: '/shop?category=hoodies' },
    { label: 'PARACHUTE BOTTOMS', path: '/shop?category=bottomwear' },
    { label: 'REGULAR FIT', path: '/shop?category=regular-fit' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-[#0c0c0c]/95 backdrop-blur-md border-b border-neutral-800/90 shadow-2xl py-3.5'
            : 'bg-[#0c0c0c] border-b border-neutral-900 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Mobile hamburger & desktop main nav */}
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden text-neutral-300 hover:text-white p-1 focus:outline-none"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map(link => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`text-xs font-mono uppercase tracking-[0.2em] transition-colors relative py-1 ${
                        isActive
                          ? 'text-white font-bold'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {link.label}
                      {link.badge && (
                        <span className="ml-1.5 px-1.5 py-0.2 text-[9px] font-sans font-bold bg-white text-black rounded-xs tracking-normal align-middle">
                          {link.badge}
                        </span>
                      )}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white animate-fade-in" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Center: Brand Logo */}
            <div className="text-center">
              <Link to="/" className="inline-block group">
                <span className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tighter text-white uppercase block leading-none group-hover:opacity-90 transition-opacity">
                  KULT<span className="text-neutral-400">99</span>
                </span>
                <span className="text-[9px] font-mono tracking-[0.35em] text-neutral-500 uppercase block -mt-0.5">
                  NEW DELHI // ATELIER
                </span>
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 sm:gap-5">
              {/* Search */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="text-neutral-300 hover:text-white p-1.5 transition-colors rounded-sm hover:bg-neutral-900"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative text-neutral-300 hover:text-white p-1.5 transition-colors rounded-sm hover:bg-neutral-900"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                to="/account"
                className="hidden sm:inline-flex text-neutral-300 hover:text-white p-1.5 transition-colors rounded-sm hover:bg-neutral-900"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Cart Bag */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 bg-white text-black hover:bg-neutral-200 px-3.5 py-1.5 text-xs font-mono font-bold tracking-wider transition-colors"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">BAG</span>
                <span className="bg-black text-white text-[10px] px-1.5 py-0.2 rounded-xs font-mono">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-[#111111] border-r border-neutral-800 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto animate-slide-right">
            <div>
              {/* Drawer header */}
              <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
                <div>
                  <span className="font-heading font-extrabold text-2xl tracking-tighter text-white">
                    KULT<span className="text-neutral-400">99</span>
                  </span>
                  <span className="text-[8px] font-mono tracking-widest text-neutral-500 uppercase block">
                    STREETWEAR ATELIER
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-neutral-400 hover:text-white p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Main Links */}
              <div className="py-6 space-y-4">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block text-sm font-mono tracking-[0.2em] uppercase text-neutral-200 hover:text-white py-1.5 flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] bg-white text-black font-bold">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              {/* Category Quick Links */}
              <div className="pt-6 border-t border-neutral-800">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 block mb-3">
                  CATEGORIES
                </span>
                <div className="space-y-2.5">
                  {categoryQuickLinks.map(cat => (
                    <Link
                      key={cat.label}
                      to={cat.path}
                      className="block text-xs font-mono tracking-widest text-neutral-400 hover:text-white flex items-center justify-between group"
                    >
                      <span>{cat.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer footer */}
            <div className="pt-6 border-t border-neutral-800 space-y-3">
              <Link
                to="/account"
                className="flex items-center gap-2 text-xs font-mono tracking-wider text-neutral-400 hover:text-white"
              >
                <User className="w-4 h-4" />
                <span>MY ACCOUNT / ORDERS</span>
              </Link>
              <Link
                to="/shipping-returns"
                className="block text-xs font-mono tracking-wider text-neutral-400 hover:text-white"
              >
                SHIPPING & 7-DAY EXCHANGE
              </Link>
              <div className="text-[10px] font-mono text-neutral-500 tracking-wider">
                CURRENCY: <span className="text-white font-bold">INR (₹)</span> • NEW DELHI, INDIA
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
