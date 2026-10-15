import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { soundManager } from '../audio/soundManager';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Xác nhận xóa',
  cancelText = 'Hủy bỏ',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 rounded-2xl border-2 border-rose-500/60 shadow-2xl overflow-hidden text-slate-100 p-5 space-y-4">
        <div className="flex items-center gap-3 text-rose-400">
          <div className="p-2 bg-rose-500/20 rounded-xl border border-rose-500/30">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          {message}
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => {
              soundManager.playInteract();
              onCancel();
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-bold rounded-lg transition cursor-pointer"
          >
            {cancelText}
          </button>

          <button
            onClick={() => {
              soundManager.playInteract();
              onConfirm();
            }}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-lg shadow-md transition cursor-pointer"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
