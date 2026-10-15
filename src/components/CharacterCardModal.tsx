import React from 'react';
import { X, Award, Eye, ShieldCheck, Sparkles } from 'lucide-react';
import { CHARACTER_CARDS } from '../data/nasaData';
import { soundManager } from '../audio/soundManager';
import { SurveyorArt } from './illustrations/StoryIllustrations';

interface CharacterCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedCardIds: string[];
}

export const CharacterCardModal: React.FC<CharacterCardModalProps> = ({
  isOpen,
  onClose,
  unlockedCardIds,
}) => {
  if (!isOpen) return null;

  const card = CHARACTER_CARDS['mat-tron'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-2xl border-2 border-emerald-400/60 shadow-2xl overflow-hidden text-slate-100 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base sm:text-lg font-bold text-emerald-300">
              Bộ Sưu Tập Thẻ Nhân Vật & STEM
            </h3>
          </div>
          <button
            onClick={() => {
              soundManager.playInteract();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Main Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border-2 border-emerald-500/40 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-700 pb-3">
              <div>
                <span className="px-2.5 py-0.5 text-xs font-bold rounded bg-emerald-950 text-emerald-300 border border-emerald-700/60">
                  {card.codename} • {card.year}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-amber-200 mt-1">
                  {card.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  {card.role}
                </p>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-400/40 rounded-full text-xs font-bold text-emerald-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Đã mở khóa</span>
              </div>
            </div>

            {/* Illustration */}
            <div className="rounded-xl overflow-hidden border border-slate-700 shadow-inner">
              <SurveyorArt className="w-full h-44" />
            </div>

            {/* Story Description */}
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Câu chuyện nhân vật
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {card.storyDescription}
              </p>
            </div>

            {/* NASA Facts */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-sky-500/30 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-300 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Tư liệu lịch sử NASA (Đã kiểm chứng)</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4 leading-relaxed">
                {card.nasaFacts.map((fact, idx) => (
                  <li key={idx}>{fact}</li>
                ))}
              </ul>
            </div>

            {/* STEM Skill Reward */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-amber-300 uppercase">
                  Phần Thưởng Kỹ Năng STEM
                </h5>
                <p className="text-xs text-slate-200 mt-0.5 leading-snug">
                  {card.stemSkill}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 text-right">
          <button
            onClick={() => {
              soundManager.playInteract();
              onClose();
            }}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-lg shadow-md transition cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
