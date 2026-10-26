import React from 'react';
import { Check, Info, AlertTriangle, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Toast: React.FC = () => {
  const { toast } = useShop();

  if (!toast.visible) return null;

  const icons = {
    success: <Check className="w-4 h-4 text-emerald-400 shrink-0" />,
    info: <Info className="w-4 h-4 text-neutral-300 shrink-0" />,
    error: <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-slide-up">
      <div className="bg-[#181818] border border-neutral-700 text-white p-3.5 shadow-2xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {icons[toast.type]}
          <span className="text-xs font-mono tracking-wider uppercase leading-snug">
            {toast.message}
          </span>
        </div>
      </div>
    </div>
  );
};
