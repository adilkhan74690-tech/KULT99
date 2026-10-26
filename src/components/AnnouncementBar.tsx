import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Flame } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#141414] border-b border-neutral-800 text-[11px] font-mono tracking-widest uppercase text-neutral-300 py-2 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Desktop left info */}
        <div className="hidden md:flex items-center gap-6 text-neutral-400">
          <Link to="/collections" className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors">
            <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>DROP 04 LIVE IN ATELIER</span>
          </Link>
          <Link to="/shipping-returns" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Truck className="w-3.5 h-3.5 text-neutral-400" />
            <span>FREE SHIPPING OVER ₹1499</span>
          </Link>
        </div>

        {/* Center */}
        <div className="flex-1 text-center md:flex-initial">
          <span className="inline-block text-white font-medium">
            USE CODE <span className="text-white underline underline-offset-4 font-bold bg-neutral-800 px-1.5 py-0.5 rounded">RAW10</span> FOR 10% OFF DEMO ORDERS
          </span>
        </div>

        {/* Desktop right info */}
        <div className="hidden md:flex items-center gap-4 text-neutral-400">
          <Link to="/shipping-returns" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
            <span>7-DAY EXCHANGE</span>
          </Link>
          <span className="text-neutral-600">|</span>
          <span className="text-neutral-300 font-bold">IN (₹)</span>
        </div>
      </div>
    </div>
  );
};
