import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setIsSizeGuideOpen } = useShop();

  return (
    <footer className="bg-[#080808] border-t border-neutral-900 text-neutral-400 font-sans">
      {/* Upper Footer: Value Props */}
      <div className="border-b border-neutral-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <span className="text-white font-mono text-xs font-bold tracking-widest block uppercase">
              FREE SHIPPING
            </span>
            <span className="text-[11px] text-neutral-500 font-sans block">
              On all orders over ₹1,499 across India
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-white font-mono text-xs font-bold tracking-widest block uppercase">
              7-DAY EXCHANGES
            </span>
            <span className="text-[11px] text-neutral-500 font-sans block">
              Doorstep pickup & seamless size swaps
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-white font-mono text-xs font-bold tracking-widest block uppercase">
              100% COMBED COTTON
            </span>
            <span className="text-[11px] text-neutral-500 font-sans block">
              260 to 450 GSM custom milled heavyweight textiles
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-white font-mono text-xs font-bold tracking-widest block uppercase">
              LIMITED RUNS
            </span>
            <span className="text-[11px] text-neutral-500 font-sans block">
              Numbered drops limited to 250 units
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-heading font-extrabold text-2xl tracking-tighter text-white uppercase block">
                KULT<span className="text-neutral-500">99</span>
              </span>
              <span className="text-[9px] font-mono tracking-[0.35em] text-neutral-500 uppercase block">
                NEW DELHI // STREETWEAR ATELIER
              </span>
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans max-w-sm">
              An independent Indian streetwear atelier crafting heavy architectural silhouettes. Brutalist cuts, custom-milled loopback textiles, and numbered drops.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span className="text-neutral-300">ONLINE STORE LIVE 24/7</span>
            </div>
          </div>

          {/* Column 1: Silhouettes */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-white block font-bold">
              SILHOUETTES
            </span>
            <ul className="space-y-2 text-xs font-mono tracking-wider">
              <li>
                <Link to="/shop?category=oversized-tees" className="hover:text-white transition-colors">
                  OVERSIZED TEES
                </Link>
              </li>
              <li>
                <Link to="/shop?category=hoodies" className="hover:text-white transition-colors">
                  HEAVYWEIGHT HOODIES
                </Link>
              </li>
              <li>
                <Link to="/shop?category=bottomwear" className="hover:text-white transition-colors">
                  PARACHUTE BOTTOMS
                </Link>
              </li>
              <li>
                <Link to="/shop?category=regular-fit" className="hover:text-white transition-colors">
                  REGULAR FIT
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-white transition-colors">
                  DROP 04 LOOKBOOK
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Atelier */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-white block font-bold">
              CUSTOMER CARE
            </span>
            <ul className="space-y-2 text-xs font-mono tracking-wider">
              <li>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="hover:text-white transition-colors text-left"
                >
                  STREETWEAR SIZE GUIDE
                </button>
              </li>
              <li>
                <Link to="/shipping-returns" className="hover:text-white transition-colors">
                  SHIPPING & 7-DAY EXCHANGE
                </Link>
              </li>
              <li>
                <Link to="/privacy-terms" className="hover:text-white transition-colors">
                  PRIVACY & TERMS
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-white transition-colors">
                  ORDER DISPATCH ARCHIVE
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-white transition-colors">
                  SAVED WISHLIST
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Atelier Headquarters */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-white block font-bold">
              ATELIER HQ
            </span>
            <div className="space-y-2.5 text-xs font-mono text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <span>KULT99 Design Atelier, New Delhi, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
                <Link to="/contact" className="hover:text-white underline">
                  contact@kult99.com
                </Link>
              </div>
              <div className="pt-1">
                <Link
                  to="/contact"
                  className="inline-block text-[11px] font-mono text-white underline underline-offset-4 hover:text-neutral-300"
                >
                  CONTACT STUDIO & FAQS →
                </Link>
              </div>
            </div>
            
            <div className="pt-2">
              <span className="inline-block px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-300">
                PROUDLY DESIGNED IN INDIA
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright & Demo Notice */}
      <div className="border-t border-neutral-900 py-6 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            © 2026 KULT99 STREETWEAR ATELIER. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-neutral-400 bg-neutral-900 px-2 py-0.5 border border-neutral-800">
              DEMO STORE — PORTFOLIO PROJECT
            </span>
            <Link to="/privacy-terms" className="hover:text-neutral-300">
              TERMS & DISCLOSURES
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
