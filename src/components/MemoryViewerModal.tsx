import React from 'react';
import { X, Sparkles, Check } from 'lucide-react';
import { MemoryFragment } from '../types/gameTypes';
import { soundManager } from '../audio/soundManager';
import {
  ScoopEventArt,
  CameraEventArt,
  ApolloEventArt,
} from './illustrations/StoryIllustrations';

interface MemoryViewerModalProps {
  fragment: MemoryFragment | null;
  onClose: () => void;
  totalCollected: number;
}

export const MemoryViewerModal: React.FC<MemoryViewerModalProps> = ({
  fragment,
  onClose,
  totalCollected,
}) => {
  if (!fragment) return null;

  const renderArt = (id: string) => {
    switch (id) {
      case 'fragment_1':
        return <ScoopEventArt className="w-full h-40" />;
      case 'fragment_2':
        return <CameraEventArt className="w-full h-40" />;
      case 'fragment_3':
        return <ApolloEventArt className="w-full h-40" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 rounded-2xl border-2 border-amber-400/60 shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-amber-300">
              Mảnh Ký Ức Thu Thập Được ({totalCollected}/3)
            </h3>
          </div>
          <button
            onClick={() => {
              soundManager.playInteract();
              onClose();
            }}
            className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="rounded-xl overflow-hidden border border-slate-800 shadow-inner">
            {renderArt(fragment.id)}
          </div>

          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Mốc Lịch Sử: {fragment.historicalDate}
              </span>
              <span className="px-2 py-0.5 text-[11px] font-semibold rounded bg-emerald-950 text-emerald-300 border border-emerald-700/50 flex items-center gap-1">
                <Check className="w-3 h-3" /> Đã thu thập
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-white mt-1">
              {fragment.title}
            </h2>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed font-medium">
            {fragment.description}
          </p>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-sky-500/30 text-xs text-sky-200 leading-relaxed">
            <span className="font-bold text-sky-300">🔍 Hồ sơ NASA: </span>
            {fragment.nasaFact}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 text-right">
          <button
            onClick={() => {
              soundManager.playInteract();
              onClose();
            }}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold rounded-lg shadow-md transition cursor-pointer"
          >
            Tiếp tục tìm kiếm
          </button>
        </div>
      </div>
    </div>
  );
};
