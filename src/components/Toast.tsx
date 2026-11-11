import React from 'react';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed z-150 bottom-5 right-5 flex flex-col gap-2 max-w-sm w-[calc(100%-40px)] sm:w-auto pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className="pointer-events-auto p-3.5 rounded-xl bg-[#14161b]/95 border border-[#373a42] text-xs text-[#f0f2f5] shadow-2xl flex items-center justify-between gap-3 animate-fadeIn backdrop-blur-md"
        >
          <div className="flex items-center gap-2.5">
            {t.type === 'info' ? (
              <Info className="w-4 h-4 text-blue-400 shrink-0" />
            ) : t.type === 'warning' ? (
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span className="font-medium leading-snug">{t.message}</span>
          </div>
          <button
            onClick={() => onDismiss(t.id)}
            className="text-[#787c86] hover:text-white p-1 text-sm font-bold leading-none"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};
