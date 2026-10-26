import React from 'react';
import { Lock, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyTermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      {/* Header */}
      <div className="border-b border-neutral-900 bg-[#0f0f0f] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500">
            LEGAL DISCLOSURE // ATELIER POLICIES
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight">
            PRIVACY & TERMS
          </h1>
          <p className="text-xs font-mono text-neutral-400 max-w-lg mx-auto">
            Transparent disclosure regarding data handling, session storage, and demo terms of service.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 text-xs font-mono leading-relaxed">
        
        {/* Section 1: Privacy & Data */}
        <div className="space-y-4 border-b border-neutral-850 pb-8">
          <div className="flex items-center gap-2 text-sm font-heading font-bold uppercase text-white">
            <Lock className="w-5 h-5 text-neutral-300" />
            <h2>PRIVACY POLICY & DATA PRACTICES</h2>
          </div>
          <p className="text-neutral-400 font-sans">
            At KULT99, privacy is treated with the same minimalism as our garments. We do not sell, rent, or trade your personal data to third-party ad networks or tracking brokers.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-neutral-300">
            <li><strong>Local Storage:</strong> Your shopping bag, saved wishlist items, and simulated demo orders are persisted locally inside your browser via web storage.</li>
            <li><strong>No Financial Data Collection:</strong> Since this is a demo environment, no real payment credentials, CVVs, or bank logins are ever requested or stored on any server.</li>
            <li><strong>Analytics:</strong> Minimal performance telemetry is used purely to ensure smooth page load times across mobile and desktop devices.</li>
          </ul>
        </div>

        {/* Section 2: Terms of Service */}
        <div className="space-y-4 border-b border-neutral-850 pb-8">
          <div className="flex items-center gap-2 text-sm font-heading font-bold uppercase text-white">
            <FileText className="w-5 h-5 text-neutral-300" />
            <h2>TERMS OF SERVICE</h2>
          </div>
          <p className="text-neutral-400 font-sans">
            By browsing KULT99, you acknowledge that this web application represents a showcase clothing e-commerce demo. All branding, garments, specifications, and photography are displayed for portfolio and aesthetic demonstration purposes.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-neutral-300">
            <li><strong>Portfolio Store:</strong> No commercial transactions are completed. Any simulated orders placed during your session generate mock confirmation references.</li>
            <li><strong>Intellectual Property:</strong> All original layout designs, code implementations, and typography systems are the property of the creator. Product imagery rights remain with respective editorial photographers.</li>
            <li><strong>Governing Jurisdiction:</strong> This showcase project complies with Indian digital technology standards.</li>
          </ul>
        </div>

        <div className="pt-4 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors"
          >
            <span>CONTINUE SHOPPING</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
