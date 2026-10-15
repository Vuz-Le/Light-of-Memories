import React, { useState } from 'react';
import { X, HelpCircle, BookOpen, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MEMORY_FRAGMENTS } from '../data/puzzleData';
import { MemoryFragment } from '../types/gameTypes';
import { soundManager } from '../audio/soundManager';
import {
  ScoopEventArt,
  CameraEventArt,
  ApolloEventArt,
} from './illustrations/StoryIllustrations';

interface PuzzleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBookClue: () => void;
  onPuzzleSolved: () => void;
}

export const PuzzleModal: React.FC<PuzzleModalProps> = ({
  isOpen,
  onClose,
  onOpenBookClue,
  onPuzzleSolved,
}) => {
  // Slots can hold fragment IDs or null
  const [slots, setSlots] = useState<(string | null)[]>([null, null, null]);
  const [selectedFragmentId, setSelectedFragmentId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'error' | 'hint' | 'success' | null; message: string }>({
    type: null,
    message: '',
  });
  const [isSuccessPlayback, setIsSuccessPlayback] = useState(false);

  if (!isOpen) return null;

  // Unplaced fragments currently in tray
  const placedIds = slots.filter(Boolean) as string[];
  const availableFragments = MEMORY_FRAGMENTS.filter((f) => !placedIds.includes(f.id));

  const handleSelectFragment = (id: string) => {
    soundManager.playInteract();
    setSelectedFragmentId(selectedFragmentId === id ? null : id);
  };

  const handlePlaceIntoSlot = (slotIndex: number) => {
    soundManager.playInteract();

    const newSlots = [...slots];
    const currentInSlot = newSlots[slotIndex];

    if (selectedFragmentId) {
      // Place selected fragment into this slot
      newSlots[slotIndex] = selectedFragmentId;
      setSlots(newSlots);
      setSelectedFragmentId(null);
      setFeedback({ type: null, message: '' });
    } else if (currentInSlot) {
      // Clicked on filled slot without selection: pick it up / remove it
      newSlots[slotIndex] = null;
      setSlots(newSlots);
      setSelectedFragmentId(currentInSlot);
    }
  };

  const handleClearSlots = () => {
    soundManager.playInteract();
    setSlots([null, null, null]);
    setSelectedFragmentId(null);
    setFeedback({ type: null, message: '' });
  };

  const handleShowHint = () => {
    soundManager.playInteract();
    setFeedback({
      type: 'hint',
      message:
        '💡 Gợi ý: Hãy nghĩ về hành trình của Mắt Tròn: Trước tiên là hạ cánh đào đất để thử nghiệm bề mặt ➔ Sau đó là chụp hàng ngàn bức ảnh gửi về Trái Đất ➔ Cuối cùng là các phi hành gia Apollo 12 đến thăm và mang camera về!',
    });
  };

  const handleCheckOrder = () => {
    if (slots.some((s) => s === null)) {
      soundManager.playError();
      setFeedback({
        type: 'error',
        message: 'Bạn hãy xếp đủ cả 3 mảnh ký ức vào 3 ô thời gian trước khi kiểm tra nhé!',
      });
      return;
    }

    // Correct order: fragment_1 (order 1) -> fragment_2 (order 2) -> fragment_3 (order 3)
    const isCorrect =
      slots[0] === 'fragment_1' &&
      slots[1] === 'fragment_2' &&
      slots[2] === 'fragment_3';

    if (isCorrect) {
      soundManager.playFanfare();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
      setIsSuccessPlayback(true);
      setFeedback({
        type: 'success',
        message: 'Chính xác rồi! Toàn bộ chuỗi ký ức của Mắt Tròn đã được khôi phục trọn vẹn!',
      });
    } else {
      soundManager.playError();
      setFeedback({
        type: 'error',
        message:
          'Thứ tự thời gian chưa đúng rồi Cuội ơi! Bạn hãy mở Sách Đồng Hành trang 3 để xem manh mối, hoặc bấm nút "Gợi Ý" để kiểm tra lại nhé!',
      });
    }
  };

  const handleFinishPuzzle = () => {
    soundManager.playStarLit();
    onPuzzleSolved();
  };

  // Render illustration for each fragment card
  const renderFragmentArt = (id: string) => {
    switch (id) {
      case 'fragment_1':
        return <ScoopEventArt className="w-full h-24 rounded-lg" />;
      case 'fragment_2':
        return <CameraEventArt className="w-full h-24 rounded-lg" />;
      case 'fragment_3':
        return <ApolloEventArt className="w-full h-24 rounded-lg" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-slate-900 rounded-2xl border-2 border-amber-500/60 shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-base sm:text-lg font-bold text-amber-300">
              Khôi Phục Nhật Ký Của Mắt Tròn
            </h2>
          </div>

          <button
            onClick={() => {
              soundManager.playInteract();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            title="Đóng câu đố"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {!isSuccessPlayback ? (
            <>
              {/* Objective Description */}
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="font-bold text-amber-300">Mục tiêu:</span> Hãy chọn và sắp xếp 3 mảnh nhật ký vào 3 ô bên dưới theo đúng thứ tự diễn ra trong lịch sử (từ quá khứ đến hiện tại). Cuốn Sách Đồng Hành có ghi lại thứ tự này!
              </div>

              {/* Three Timeline Slots */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Dòng thời gian sự kiện (1 ➔ 2 ➔ 3)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[0, 1, 2].map((idx) => {
                    const fragmentId = slots[idx];
                    const fragment = MEMORY_FRAGMENTS.find((f) => f.id === fragmentId);
                    const slotLabels = ['1. Sự kiện đầu tiên', '2. Sự kiện tiếp theo', '3. Sự kiện sau cùng'];

                    return (
                      <div
                        key={idx}
                        onClick={() => handlePlaceIntoSlot(idx)}
                        className={`relative flex flex-col items-center justify-between min-h-[170px] p-2.5 rounded-xl border-2 transition-all cursor-pointer ${
                          fragment
                            ? 'bg-slate-800/90 border-amber-400 shadow-md'
                            : 'bg-slate-950/60 border-dashed border-slate-700 hover:border-amber-500/50'
                        }`}
                      >
                        <span className="text-[11px] font-bold text-amber-400/90 mb-1">
                          {slotLabels[idx]}
                        </span>

                        {fragment ? (
                          <div className="w-full flex flex-col items-center gap-1.5 text-center">
                            {renderFragmentArt(fragment.id)}
                            <span className="font-bold text-xs text-amber-100 line-clamp-1">
                              {fragment.title}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              (Bấm để gỡ bỏ)
                            </span>
                          </div>
                        ) : (
                          <div className="my-auto text-center text-slate-500 text-xs flex flex-col items-center gap-1">
                            <span className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center font-bold text-slate-400">
                              {idx + 1}
                            </span>
                            <span>{selectedFragmentId ? 'Bấm để đặt vào đây' : 'Ô còn trống'}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Memory Fragment Tray */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Mảnh ký ức chưa xếp ({availableFragments.length} mảnh)
                </h4>
                {availableFragments.length === 0 ? (
                  <p className="text-xs text-emerald-400 font-semibold p-2 bg-emerald-950/40 rounded-lg border border-emerald-800/40">
                    ✓ Toàn bộ 3 mảnh đã được đặt vào các ô thời gian! Bấm "Kiểm Tra" để xem kết quả.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {availableFragments.map((frag) => {
                      const isSelected = selectedFragmentId === frag.id;
                      return (
                        <div
                          key={frag.id}
                          onClick={() => handleSelectFragment(frag.id)}
                          className={`flex flex-col items-center p-2.5 rounded-xl border-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-950/70 border-amber-400 scale-[1.02] shadow-lg ring-2 ring-amber-400/30'
                              : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700'
                          }`}
                        >
                          {renderFragmentArt(frag.id)}
                          <span className="font-bold text-xs text-slate-100 mt-2 text-center">
                            {frag.title}
                          </span>
                          <span className="text-[11px] text-slate-400 text-center mt-1 line-clamp-2">
                            {frag.description}
                          </span>
                          <span className="mt-2 px-2 py-0.5 text-[10px] font-bold rounded bg-slate-900 text-amber-300">
                            {isSelected ? 'Đã chọn (Bấm ô ở trên)' : 'Bấm để chọn'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Feedback Alert */}
              {feedback.type && (
                <div
                  className={`p-3 rounded-xl border text-xs sm:text-sm font-medium leading-relaxed ${
                    feedback.type === 'error'
                      ? 'bg-rose-950/60 border-rose-500/50 text-rose-200'
                      : 'bg-amber-950/60 border-amber-500/50 text-amber-200'
                  }`}
                >
                  {feedback.message}
                </div>
              )}
            </>
          ) : (
            /* Success Playback View */
            <div className="space-y-4 text-center py-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400 mb-1">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-amber-300">
                Nhật Ký Của Mắt Tròn Đã Khôi Phục!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                Tất cả các mốc lịch sử đã được kết nối lại đúng trình tự thời gian:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                {MEMORY_FRAGMENTS.map((frag, idx) => (
                  <div key={frag.id} className="p-3 bg-slate-800/90 rounded-xl border border-amber-500/30">
                    {renderFragmentArt(frag.id)}
                    <div className="mt-2">
                      <span className="text-[10px] font-bold text-amber-400 uppercase">
                        Bước {idx + 1} ({frag.historicalDate})
                      </span>
                      <h4 className="font-bold text-xs text-white">{frag.title}</h4>
                      <p className="text-[11px] text-slate-300 mt-1 leading-snug">{frag.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-400/40 rounded-xl text-xs sm:text-sm text-amber-200 font-medium">
                🌟 "Xin đừng quên tên mình" — Lời hứa nhớ về Mắt Tròn sẽ thắp sáng cánh sao đầu tiên trên chiếc Đèn Ông Sao của bạn!
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5 bg-slate-950 border-t border-slate-800">
          {!isSuccessPlayback ? (
            <>
              <div className="flex items-center gap-2">
                {/* Open Book Button */}
                <button
                  onClick={() => {
                    soundManager.playPageFlip();
                    onOpenBookClue();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Mở Sách Manh Mối</span>
                </button>

                {/* Hint Button */}
                <button
                  onClick={handleShowHint}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold rounded-lg border border-slate-700 transition cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Gợi Ý</span>
                </button>

                {/* Reset button */}
                <button
                  onClick={handleClearSlots}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg border border-slate-700 transition cursor-pointer"
                  title="Xếp lại từ đầu"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Check Order Button */}
              <button
                onClick={handleCheckOrder}
                className="flex items-center gap-1.5 px-5 py-2 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 text-xs sm:text-sm font-extrabold rounded-lg shadow-lg transition cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Kiểm Tra</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleFinishPuzzle}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-sm font-extrabold rounded-xl shadow-lg transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Tiếp Tục & Thắp Sáng Cánh Sao Đầu Tiên ➔</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
