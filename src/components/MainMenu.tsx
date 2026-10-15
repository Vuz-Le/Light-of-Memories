import React, { useState } from 'react';
import { Play, RotateCcw, HelpCircle, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { soundManager } from '../audio/soundManager';

interface MainMenuProps {
  hasSavedGame: boolean;
  onStartNewGame: () => void;
  onContinueGame: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  hasSavedGame,
  onStartNewGame,
  onContinueGame,
}) => {
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md text-slate-100">
      {/* Background Starfield Visual */}
      <div className="relative w-full max-w-xl p-6 sm:p-8 bg-slate-900/90 rounded-3xl border-2 border-amber-500/50 shadow-2xl flex flex-col items-center text-center overflow-hidden">
        {/* Glow behind title */}
        <div className="absolute -top-24 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Challenge Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-slate-800/90 border border-slate-700 text-[11px] font-bold text-amber-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>NASA Space Apps Challenge 2026 • STEM Storytelling</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-black text-amber-300 tracking-tight leading-tight">
          Cuội Đi Tìm Chị Hằng
        </h1>
        <p className="mt-1.5 text-sm sm:text-base text-slate-300 font-medium">
          Những Người Bạn Bị Bỏ Lại Trên Mặt Trăng
        </p>

        {/* 5-Star Lantern Visual */}
        <div className="my-5 flex items-center justify-center gap-2">
          <svg viewBox="0 0 100 100" className="w-16 h-16 filter drop-shadow(0 0 12px rgba(251,191,36,0.5))">
            <polygon points="50,5 61,38 95,38 68,58 78,92 50,72 22,92 32,58 5,38 39,38" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
            <circle cx="50" cy="52" r="14" fill="#ca8a04" />
          </svg>
        </div>

        {!showHowToPlay ? (
          <div className="w-full max-w-sm space-y-3 mt-1">
            {/* Continue Button if saved */}
            {hasSavedGame && (
              <button
                onClick={() => {
                  soundManager.playInteract();
                  onContinueGame();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-sm sm:text-base rounded-xl shadow-lg transition active:scale-98 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Tiếp tục cuộc hành trình</span>
              </button>
            )}

            {/* Start New Game Button */}
            <button
              onClick={() => {
                soundManager.playInteract();
                onStartNewGame();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm sm:text-base rounded-xl shadow-lg transition active:scale-98 cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>{hasSavedGame ? 'Bắt đầu chuyến đi mới' : 'Bắt đầu trò chơi'}</span>
            </button>

            {/* How to Play Button */}
            <button
              onClick={() => {
                soundManager.playInteract();
                setShowHowToPlay(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm rounded-xl border border-slate-700 transition cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Hướng dẫn điều khiển & Câu đố</span>
            </button>
          </div>
        ) : (
          /* How to Play Guide View */
          <div className="w-full text-left space-y-3 p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-200 animate-in fade-in duration-200">
            <h3 className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" /> Cách chơi và phím điều khiển:
            </h3>

            <div className="space-y-2 text-slate-300">
              <p>
                ⌨️ <strong className="text-white">Bàn phím:</strong> Dùng phím <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-amber-300 border border-slate-700">A</kbd> / <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-amber-300 border border-slate-700">D</kbd> hoặc phím mũi tên <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-amber-300 border border-slate-700">←</kbd> / <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-amber-300 border border-slate-700">→</kbd> để bước đi. Phím <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-amber-300 border border-slate-700">E</kbd> để tương tác.
              </p>
              <p>
                🖱️ <strong className="text-white">Chuột:</strong> Bấm chuột vào nền đất để Cuội đi tới. Bấm vào nhân vật hoặc đồ vật để Cuội tự động lại gần và trò chuyện.
              </p>
              <p>
                📖 <strong className="text-white">Sách Đồng Hành:</strong> Chứa các mẩu chuyện và manh mối bí mật để giải các câu đố lịch sử khoa học.
              </p>
            </div>

            <button
              onClick={() => {
                soundManager.playInteract();
                setShowHowToPlay(false);
              }}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition cursor-pointer text-center mt-2"
            >
              Quay lại
            </button>
          </div>
        )}

        <div className="mt-6 text-[11px] text-slate-500">
          Chương 1: Nhật ký của Mắt Tròn (Surveyor 3) • Phiên bản 1.0
        </div>
      </div>
    </div>
  );
};
