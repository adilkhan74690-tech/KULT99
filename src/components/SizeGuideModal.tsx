import React, { useState } from 'react';
import { X, Ruler, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isSizeGuideOpen) return null;

  const sizeChartInches = [
    { size: 'S', chest: '42.0"', length: '28.5"', shoulder: '21.5"', sleeve: '9.0"' },
    { size: 'M', chest: '44.0"', length: '29.5"', shoulder: '22.5"', sleeve: '9.5"' },
    { size: 'L', chest: '46.0"', length: '30.5"', shoulder: '23.5"', sleeve: '10.0"' },
    { size: 'XL', chest: '48.0"', length: '31.5"', shoulder: '24.5"', sleeve: '10.5"' },
    { size: 'XXL', chest: '50.0"', length: '32.0"', shoulder: '25.5"', sleeve: '11.0"' },
  ];

  const sizeChartCm = [
    { size: 'S', chest: '106 cm', length: '72 cm', shoulder: '55 cm', sleeve: '23 cm' },
    { size: 'M', chest: '112 cm', length: '75 cm', shoulder: '57 cm', sleeve: '24 cm' },
    { size: 'L', chest: '117 cm', length: '77 cm', shoulder: '60 cm', sleeve: '25 cm' },
    { size: 'XL', chest: '122 cm', length: '80 cm', shoulder: '62 cm', sleeve: '27 cm' },
    { size: 'XXL', chest: '127 cm', length: '81 cm', shoulder: '65 cm', sleeve: '28 cm' },
  ];

  const currentChart = unit === 'inches' ? sizeChartInches : sizeChartCm;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSizeGuideOpen(false)}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-xl bg-[#111111] border border-neutral-800 shadow-2xl p-6 sm:p-8">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-neutral-300" />
              <h2 className="font-heading font-extrabold text-lg uppercase tracking-tight text-white">
                STREETWEAR SIZE MATRIX
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsSizeGuideOpen(false)}
              className="text-neutral-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Unit Toggle & Description */}
          <div className="py-4 flex items-center justify-between flex-wrap gap-2">
            <p className="text-xs font-mono text-neutral-400">
              SIGNATURE BOXY FIT • MEASUREMENTS IN {unit.toUpperCase()}
            </p>
            <div className="flex border border-neutral-700 bg-neutral-900 text-xs font-mono">
              <button
                type="button"
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 font-bold ${
                  unit === 'inches' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                INCHES
              </button>
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 font-bold ${
                  unit === 'cm' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                CM
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="border border-neutral-800 overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-neutral-900 text-neutral-400 border-b border-neutral-800 uppercase tracking-widest text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">SIZE</th>
                  <th className="py-2.5 px-3">CHEST</th>
                  <th className="py-2.5 px-3">LENGTH</th>
                  <th className="py-2.5 px-3">SHOULDER</th>
                  <th className="py-2.5 px-3">SLEEVE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-850">
                {currentChart.map((row) => (
                  <tr key={row.size} className="hover:bg-neutral-900/60 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-white bg-neutral-900/40">{row.size}</td>
                    <td className="py-2.5 px-3 text-neutral-300">{row.chest}</td>
                    <td className="py-2.5 px-3 text-neutral-300">{row.length}</td>
                    <td className="py-2.5 px-3 text-neutral-300">{row.shoulder}</td>
                    <td className="py-2.5 px-3 text-neutral-300">{row.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Fit Advice */}
          <div className="mt-5 p-3.5 bg-neutral-900/80 border border-neutral-800 text-neutral-300 space-y-1.5 text-xs font-mono">
            <div className="flex items-center gap-2 text-white font-bold">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>STYLING RECOMMENDATION:</span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
              Our silhouettes feature an intentional drop shoulder and oversized chest circumference. 
              <strong> Buy your standard size</strong> for the signature runway slouch. If you prefer a snug or fitted cut, we recommend sizing down one size.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
