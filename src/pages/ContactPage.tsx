import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, MapPin, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: 'sizing',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill out all required fields', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Inquiry received. The atelier will respond shortly.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      {/* Header */}
      <div className="border-b border-neutral-900 bg-[#0f0f0f] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500">
            CONNECT // ATELIER DISPATCH
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight">
            CONTACT ATELIER
          </h1>
          <p className="text-xs font-mono text-neutral-400 max-w-lg mx-auto">
            Direct communication line for sizing consultations, batch inquiries, and press dispatches.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-[#121212] border border-neutral-850 p-6 sm:p-8 space-y-6">
            <div className="border-b border-neutral-800 pb-3">
              <h2 className="font-heading text-lg font-bold uppercase text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-neutral-400" />
                <span>DIRECT INQUIRY</span>
              </h2>
              <span className="text-[10px] font-mono text-neutral-500">
                AVERAGE ATELIER RESPONSE TIME: WITHIN 12 HOURS
              </span>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold uppercase text-white">
                  DISPATCH RECEIVED
                </h3>
                <p className="text-xs font-mono text-neutral-400 max-w-sm mx-auto">
                  Thank you, {form.name}. Your inquiry has been forwarded to our New Delhi atelier team.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', topic: 'sizing', message: '' });
                  }}
                  className="px-6 py-2.5 bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-neutral-400 mb-1">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="ENTER YOUR NAME"
                    className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-white focus:outline-none focus:border-white uppercase placeholder:text-neutral-600"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="YOUR.NAME@EXAMPLE.COM"
                    className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-white focus:outline-none focus:border-white uppercase placeholder:text-neutral-600"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">TOPIC OF INQUIRY</label>
                  <select
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-white focus:outline-none focus:border-white uppercase"
                  >
                    <option value="sizing">SIZING & FIT ADVICE</option>
                    <option value="orders">ORDER DISPATCH STATUS</option>
                    <option value="exchange">7-DAY SIZE EXCHANGE</option>
                    <option value="press">PRESS & LOOKBOOK COLLABORATION</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">MESSAGE</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="DESCRIBE YOUR INQUIRY..."
                    className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-white focus:outline-none focus:border-white placeholder:text-neutral-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-white text-black hover:bg-neutral-200 text-xs font-mono font-bold tracking-[0.25em] uppercase transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>TRANSMIT DISPATCH</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Studio Info & FAQ */}
          <div className="lg:col-span-5 space-y-6 text-xs font-mono">
            
            {/* Atelier Info */}
            <div className="p-6 bg-[#121212] border border-neutral-850 space-y-4">
              <h3 className="font-heading text-sm font-bold uppercase text-white pb-2 border-b border-neutral-800">
                STUDIO HEADQUARTERS
              </h3>
              <div className="space-y-2 text-neutral-400">
                <div className="text-white font-bold">KULT99 DESIGN ATELIER</div>
                <div>New Delhi // NCR, India</div>
                <div className="text-neutral-500 pt-1">
                  General Inquiries: <span className="text-neutral-300">contact@kult99.com</span>
                </div>
              </div>
              <div className="pt-2 text-[10px] text-neutral-500">
                OPERATIONAL HOURS: MONDAY – SATURDAY, 10:00 – 19:00 IST
              </div>
            </div>

            {/* Quick FAQs */}
            <div className="p-6 bg-[#121212] border border-neutral-850 space-y-4">
              <h3 className="font-heading text-sm font-bold uppercase text-white pb-2 border-b border-neutral-800">
                FREQUENTLY ASKED
              </h3>
              
              <div className="space-y-3">
                <div>
                  <span className="text-white font-bold block mb-1">Q: How do the oversized tees fit?</span>
                  <p className="text-neutral-400 font-sans text-[11px] leading-relaxed">
                    Designed with an intended drop shoulder and boxy chest. Buy your true size for our signature runway silhouette.
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-850">
                  <span className="text-white font-bold block mb-1">Q: How do I wash 450 GSM fleece?</span>
                  <p className="text-neutral-400 font-sans text-[11px] leading-relaxed">
                    Machine wash cold inside out, gentle cycle. Lay flat in shade to dry. Never hang dry while saturated wet to maintain shoulder structure.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
