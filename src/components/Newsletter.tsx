import React, { useState } from 'react';
import { Mail, Check, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useShop();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setIsSubscribed(true);
    showToast('Welcome to the Cult. Use code RAW10 for 10% off.', 'success');
  };

  return (
    <section className="py-16 sm:py-20 bg-[#090909] border-b border-neutral-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400 bg-neutral-900 px-3 py-1 border border-neutral-800">
          <Mail className="w-3.5 h-3.5 text-white" />
          <span>INNER CIRCLE DISPATCH</span>
        </div>

        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-tight">
          UNLOCK DROP 05 ACCESS.
        </h2>

        <p className="text-neutral-400 font-sans text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
          Our drops sell out in hours. Subscribe to receive private password-protected links 30 minutes before public release, plus an instant 10% code for today's order.
        </p>

        {isSubscribed ? (
          <div className="p-4 bg-neutral-900 border border-neutral-800 text-white font-mono text-xs max-w-md mx-auto flex items-center justify-center gap-2 animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>YOU ARE ON THE LIST. USE CODE <strong className="text-white underline">RAW10</strong> AT CHECKOUT.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER YOUR EMAIL ADDRESS"
              required
              className="flex-1 bg-[#141414] border border-neutral-800 text-white text-xs font-mono tracking-wider px-4 py-3.5 focus:outline-none focus:border-white placeholder:text-neutral-600 uppercase"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-white text-black hover:bg-neutral-200 text-xs font-mono font-bold tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 shrink-0"
            >
              <span>JOIN</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <div className="text-[10px] font-mono text-neutral-600 tracking-wider">
          ZERO SPAM. STRICTLY PRIVATE RELEASE ALERTS & INVENTORY RESTOCKS.
        </div>

      </div>
    </section>
  );
};
