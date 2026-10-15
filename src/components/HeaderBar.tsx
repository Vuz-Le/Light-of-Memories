import React from 'react';
import { BookOpen, Award, Volume2, VolumeX, RotateCcw, Compass } from 'lucide-react';
import { GameProgress } from '../types/gameTypes';
import { soundManager } from '../audio/soundManager';

interface HeaderBarProps {
  progress: GameProgress;
  onOpenBook: () => void;
  onOpenCards: () => void;
  onRequestReset: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  progress,
  onOpenBook,
  onOpenCards,
  onRequestReset,
  isMuted,
  onToggleMute,
}) => {
  // Determine current quest text
  const getQuestText = (): string => {
    if (!progress.hasInteractedBench) {
      return 'Cuội vừa tỉnh giấc. Hãy bước lại xem chiếc ghế đá bên cạnh.';
    }
    if (!progress.hasSpokenWithTree) {
      return 'Ghế đá trống không! Hãy lại gần hỏi Cây Đa ngàn năm.';
    }
    if (progress.currentScene === 'tree') {
      return 'Nhận Đèn Ông Sao! Đi sang phải đến Miệng Hố Thiên Thạch.';
    }
    if (!progress.hasMetMatTron) {
      return 'Nói chuyện với người bạn Mắt Tròn (Surveyor 3) trong miệng hố.';
    }
    if (progress.collectedFragments.length < 3) {
      return `Tìm 3 mảnh nhật ký quanh miệng hố (${progress.collectedFragments.length}/3 mảnh).`;
    }
    if (!progress.isPuzzleSolved) {
      return 'Đã đủ 3 mảnh! Nói chuyện với Mắt Tròn & mở Sách để giải đố.';
    }
    return 'Chúc mừng! Đã hoàn thành Chương 1 & thắp sáng cánh sao đầu tiên!';
  };

  return (
    <header className="absolute top-2 left-2 right-2 z-20 flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-700/60 shadow-lg text-slate-100">
      {/* Left: Star Lantern Progress (Đèn Ông Sao) */}
      <div className="flex items-center gap-2.5">
        <div className="relative flex items-center justify-center w-10 h-10 bg-slate-950/70 rounded-lg border border-amber-500/30">
          {/* Traditional 5-pointed star icon */}
          <svg viewBox="0 0 100 100" className="w-8 h-8">
            {/* 5 Petals: top, top-right, bottom-right, bottom-left, top-left */}
            {/* Center circle */}
            <circle cx="50" cy="50" r="14" fill="#1e293b" stroke="#475569" strokeWidth="2" />
            
            {/* Petal 1 (Top) - Lights up in Chapter 1 */}
            <polygon
              points="50,10 58,40 42,40"
              fill={progress.litStars >= 1 ? '#fbbf24' : '#475569'}
              className={progress.litStars >= 1 ? 'glow-star' : ''}
              stroke={progress.litStars >= 1 ? '#d97706' : '#334155'}
              strokeWidth="1.5"
            />
            {/* Petal 2 (Top-Right) */}
            <polygon
              points="88,38 60,45 52,60"
              fill={progress.litStars >= 2 ? '#fbbf24' : '#334155'}
            />
            {/* Petal 3 (Bottom-Right) */}
            <polygon
              points="74,85 55,62 40,68"
              fill={progress.litStars >= 3 ? '#fbbf24' : '#334155'}
            />
            {/* Petal 4 (Bottom-Left) */}
            <polygon
              points="26,85 45,68 60,62"
              fill={progress.litStars >= 4 ? '#fbbf24' : '#334155'}
            />
            {/* Petal 5 (Top-Left) */}
            <polygon
              points="12,38 40,45 48,60"
              fill={progress.litStars >= 5 ? '#fbbf24' : '#334155'}
            />
          </svg>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm tracking-wide text-amber-300">Đèn Ông Sao</span>
            <span className="px-1.5 py-0.5 text-xs font-semibold rounded bg-amber-950/80 text-amber-200 border border-amber-500/40">
              {progress.hasLantern ? `${progress.litStars}/5 Cánh` : 'Chưa có'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            {progress.litStars === 0
              ? 'Thắp sáng sao bằng tình bạn'
              : 'Cánh sao Mắt Tròn đang tỏa sáng'}
          </p>
        </div>
      </div>

      {/* Center: Quest / Objective Prompt */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-950/60 rounded-lg border border-slate-700/50 max-w-md">
        <Compass className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
        <span className="text-xs font-medium text-slate-200 truncate">
          {getQuestText()}
        </span>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Book Button */}
        <button
          onClick={() => {
            soundManager.playPageFlip();
            onOpenBook();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-bold rounded-lg shadow-md transition-all cursor-pointer"
          title="Mở Sách Đồng Hành"
        >
          <BookOpen className="w-4 h-4" />
          <span>Sách Đồng Hành</span>
          {progress.hasMetMatTron && !progress.isPuzzleSolved && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          )}
        </button>

        {/* Character Cards Button (unlocked after chapter 1) */}
        {progress.unlockedCharacterCards.length > 0 && (
          <button
            onClick={() => {
              soundManager.playInteract();
              onOpenCards();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold rounded-lg shadow-md transition-all cursor-pointer"
            title="Thẻ Nhân Vật & STEM"
          >
            <Award className="w-4 h-4" />
            <span>Thẻ Nhân Vật</span>
          </button>
        )}

        {/* Audio Toggle */}
        <button
          onClick={() => {
            onToggleMute();
          }}
          className="p-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition cursor-pointer"
          title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
        </button>

        {/* Reset button */}
        <button
          onClick={() => {
            soundManager.playInteract();
            onRequestReset();
          }}
          className="p-1.5 bg-slate-800 hover:bg-rose-950/60 active:scale-95 text-slate-400 hover:text-rose-300 rounded-lg border border-slate-700 transition cursor-pointer"
          title="Chơi lại từ đầu"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
