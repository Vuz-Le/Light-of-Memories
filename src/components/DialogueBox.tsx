import React, { useState, useEffect } from 'react';
import { DialogueNode } from '../types/gameTypes';
import { soundManager } from '../audio/soundManager';
import { ChevronRight } from 'lucide-react';

interface DialogueBoxProps {
  dialogues: DialogueNode[];
  onComplete: () => void;
  onEventTrigger?: (event: string) => void;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  dialogues,
  onComplete,
  onEventTrigger,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentDialogue = dialogues[currentIndex];

  useEffect(() => {
    // Play subtle dialogue blip when a new line appears
    soundManager.playDialogueBlip(currentIndex * 25);
  }, [currentIndex]);

  const advanceDialogue = () => {
    soundManager.playInteract();

    // Trigger event if attached to this dialogue node
    if (currentDialogue?.triggerEvent && onEventTrigger) {
      onEventTrigger(currentDialogue.triggerEvent);
    }

    if (currentIndex < dialogues.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  // Listen to keyboard shortcut (Space, Enter, E)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['Space', 'Enter', 'KeyE'].includes(e.code)) {
        e.preventDefault();
        advanceDialogue();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, dialogues]);

  if (!currentDialogue) return null;

  // Speaker Badge colors
  const getSpeakerBadgeClass = (speaker: string) => {
    switch (speaker) {
      case 'Cuội':
        return 'bg-amber-600 text-amber-50 border-amber-400';
      case 'Cây Đa':
        return 'bg-emerald-600 text-emerald-50 border-emerald-400';
      case 'Mắt Tròn':
        return 'bg-sky-600 text-sky-50 border-sky-400';
      case 'Chị Hằng':
        return 'bg-fuchsia-600 text-fuchsia-50 border-fuchsia-400';
      default:
        return 'bg-slate-700 text-slate-100 border-slate-500';
    }
  };

  return (
    <div className="absolute bottom-4 left-4 right-4 z-30 max-w-3xl mx-auto">
      <div className="relative flex flex-col md:flex-row items-center gap-4 p-4 bg-slate-900/95 backdrop-blur-xl rounded-2xl border-2 border-amber-400/50 shadow-2xl animate-in fade-in duration-200">
        {/* Speaker Avatar */}
        <div className="shrink-0 flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-slate-950 border border-slate-700 shadow-inner overflow-hidden">
          {currentDialogue.avatar === 'cuoi' && (
            <svg viewBox="0 0 100 100" className="w-full h-full p-2">
              <circle cx="50" cy="50" r="45" fill="#fcd5b5" />
              {/* Hair */}
              <circle cx="50" cy="20" r="14" fill="#292524" />
              <rect x="42" y="30" width="16" height="6" fill="#ef4444" rx="2" />
              <path d="M 20 40 Q 50 15 80 40" stroke="#292524" strokeWidth="12" fill="none" />
              {/* Eyes */}
              <circle cx="36" cy="48" r="5" fill="#1e293b" />
              <circle cx="64" cy="48" r="5" fill="#1e293b" />
              <circle cx="34" cy="46" r="2" fill="#ffffff" />
              <circle cx="62" cy="46" r="2" fill="#ffffff" />
              {/* Cheeks */}
              <circle cx="28" cy="58" r="6" fill="#f43f5e" opacity="0.4" />
              <circle cx="72" cy="58" r="6" fill="#f43f5e" opacity="0.4" />
              {/* Smile */}
              <path d="M 40 64 Q 50 74 60 64" stroke="#be123c" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
          )}

          {currentDialogue.avatar === 'tree' && (
            <svg viewBox="0 0 100 100" className="w-full h-full p-2">
              <circle cx="50" cy="50" r="42" fill="#064e3b" />
              <circle cx="35" cy="40" r="24" fill="#059669" />
              <circle cx="65" cy="40" r="24" fill="#10b981" />
              <circle cx="50" cy="30" r="26" fill="#34d399" />
              <rect x="44" y="60" width="12" height="30" fill="#78350f" rx="3" />
              {/* Star sparkles */}
              <circle cx="40" cy="35" r="3" fill="#fde047" />
              <circle cx="60" cy="45" r="3" fill="#fde047" />
            </svg>
          )}

          {currentDialogue.avatar === 'mat_tron' && (
            <svg viewBox="0 0 100 100" className="w-full h-full p-2">
              <circle cx="50" cy="50" r="45" fill="#0f172a" />
              <polygon points="30,70 70,70 50,45" fill="#cbd5e1" />
              <line x1="50" y1="45" x2="50" y2="20" stroke="#64748b" strokeWidth="4" />
              <rect x="30" y="14" width="40" height="8" rx="2" fill="#1d4ed8" />
              {/* Camera Eye */}
              <circle cx="50" cy="38" r="16" fill="#38bdf8" stroke="#0284c7" strokeWidth="3" />
              <circle cx="52" cy="38" r="8" fill="#0f172a" />
              <circle cx="48" cy="35" r="3" fill="#ffffff" />
            </svg>
          )}
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between w-full">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`px-2.5 py-0.5 text-xs font-bold rounded-md border ${getSpeakerBadgeClass(currentDialogue.speaker)}`}>
              {currentDialogue.speaker}
            </span>
            <span className="text-[11px] text-slate-400">
              {currentIndex + 1} / {dialogues.length}
            </span>
          </div>

          <p className="text-slate-100 text-sm md:text-base leading-relaxed font-medium">
            {currentDialogue.text}
          </p>

          <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Nhấn <kbd className="px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">Space</kbd> hoặc <kbd className="px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">E</kbd> để tiếp tục
            </span>

            <button
              onClick={advanceDialogue}
              className="ml-auto flex items-center gap-1 px-4 py-1.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 text-xs md:text-sm font-extrabold rounded-lg shadow-md cursor-pointer transition"
            >
              <span>{currentIndex === dialogues.length - 1 ? 'Đóng' : 'Tiếp tục'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
