import React from 'react';
import { Truck, RotateCcw, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ShippingReturnsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      {/* Header */}
      <div className="border-b border-neutral-900 bg-[#0f0f0f] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500">
            CUSTOMER CARE // ATELIER LOGISTICS
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight">
            SHIPPING & 7-DAY EXCHANGE
          </h1>
          <p className="text-xs font-mono text-neutral-400 max-w-lg mx-auto">
            Comprehensive guidelines for all-India dispatches, discrete packaging, and hassle-free size swaps.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 text-xs font-mono leading-relaxed">
        
        {/* Notice */}
        <div className="p-4 bg-neutral-900 border border-neutral-800 text-neutral-300">
          <strong>DEMO STORE NOTICE:</strong> This website is an e-commerce portfolio demonstration. While shipping timelines and exchange policies reflect real streetwear retail standards, no actual physical merchandise will be dispatched.
        </div>

        {/* Section 1: Shipping */}
        <div className="space-y-4 border-b border-neutral-850 pb-8">
          <div className="flex items-center gap-2 text-sm font-heading font-bold uppercase text-white">
            <Truck className="w-5 h-5 text-neutral-300" />
            <h2>ALL-INDIA SHIPPING TERMS</h2>
          </div>
          <p className="text-neutral-400 font-sans">
            All orders placed with KULT99 are processed within 24 to 48 business hours at our New Delhi atelier. Orders are shipped via verified air express logistics partners (Blue Dart, Delhivery Air, and Xpressbees).
          </p>
          <ul className="list-disc pl-5 space-y-2 text-neutral-300">
            <li><strong>Complimentary Shipping:</strong> Free express shipping on all orders totaling ₹1,499 or more across all serviceable PIN codes in India.</li>
            <li><strong>Standard Flat Rate:</strong> A flat ₹149 delivery charge applies to orders under ₹1,499.</li>
            <li><strong>Transit Estimates:</strong> Metro cities (Delhi-NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata): 2-3 business days. Rest of India: 3-5 business days.</li>
            <li><strong>Packaging:</strong> Dispatched in heavy-duty matte black waterproof mailers with tamper-evident security seal.</li>
          </ul>
        </div>

        {/* Section 2: 7-Day Exchange */}
        <div className="space-y-4 border-b border-neutral-850 pb-8">
          <div className="flex items-center gap-2 text-sm font-heading font-bold uppercase text-white">
            <RotateCcw className="w-5 h-5 text-neutral-300" />
            <h2>7-DAY EXCHANGE POLICY</h2>
          </div>
          <p className="text-neutral-400 font-sans">
            We want your boxy silhouette to drape exactly as intended. If you need a size exchange or different colorway from an active drop, you may initiate an exchange within 7 days of delivery.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-neutral-300">
            <li>Garments must be unworn, unwashed, with all original tags attached and security ribbons intact.</li>
            <li>Doorstep pickup is arranged by our logistics team free of charge for approved exchanges.</li>
            <li>Once our atelier receives the garment and verifies the condition, your replacement size is dispatched within 24 hours.</li>
          </ul>
        </div>

        {/* Section 3: Damaged or Defective */}
        <div className="space-y-4 pb-4">
          <div className="flex items-center gap-2 text-sm font-heading font-bold uppercase text-white">
            <ShieldCheck className="w-5 h-5 text-neutral-300" />
            <h2>QUALITY COMMITMENT</h2>
          </div>
          <p className="text-neutral-400 font-sans">
            Every garment passes through manual inspection for seam tension, rib alignment, and print density before sealing. If any item reaches you with a manufacturer defect, contact contact@kult99.com with order details for an immediate replacement.
          </p>
        </div>

        <div className="pt-4 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors"
          >
            <span>RETURN TO SHOPPING</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
