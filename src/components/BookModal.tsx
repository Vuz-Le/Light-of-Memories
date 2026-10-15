import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Bookmark, Sparkles, BookOpen } from 'lucide-react';
import { BOOK_PAGES } from '../data/bookData';
import { soundManager } from '../audio/soundManager';
import {
  MoonTreeArt,
  SurveyorArt,
  ScoopEventArt,
  CameraEventArt,
} from './illustrations/StoryIllustrations';

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPageId?: string;
}

export const BookModal: React.FC<BookModalProps> = ({
  isOpen,
  onClose,
  initialPageId = 'cuoi-intro',
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  // Jump to initialPageId if requested
  useEffect(() => {
    if (initialPageId) {
      const idx = BOOK_PAGES.findIndex((p) => p.id === initialPageId);
      if (idx !== -1) {
        setCurrentPageIndex(idx);
      }
    }
  }, [initialPageId, isOpen]);

  if (!isOpen) return null;

  const page = BOOK_PAGES[currentPageIndex];

  const goPrev = () => {
    if (currentPageIndex > 0) {
      soundManager.playPageFlip();
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  const goNext = () => {
    if (currentPageIndex < BOOK_PAGES.length - 1) {
      soundManager.playPageFlip();
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  const jumpToPage = (index: number) => {
    soundManager.playPageFlip();
    setCurrentPageIndex(index);
  };

  // Render illustration component based on page.illustration
  const renderIllustration = (key: string) => {
    switch (key) {
      case 'moon_tree':
        return <MoonTreeArt />;
      case 'surveyor_art':
        return <SurveyorArt />;
      case 'journal_clues':
        return (
          <div className="grid grid-cols-2 gap-2 my-2">
            <ScoopEventArt className="w-full h-28" />
            <CameraEventArt className="w-full h-28" />
          </div>
        );
      case 'nasa_facts':
        return <SurveyorArt className="w-full h-36" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#141b2d] rounded-2xl border-2 border-amber-500/50 shadow-2xl overflow-hidden text-slate-100">
        {/* Book Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="text-base sm:text-lg font-bold text-amber-300">
              Sách Đồng Hành: Cuội Đi Tìm Chị Hằng
            </h2>
          </div>

          <button
            onClick={() => {
              soundManager.playInteract();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            title="Đóng sách"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Table of Contents Quick Tabs */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-950/60 border-b border-slate-800/80 overflow-x-auto">
          {BOOK_PAGES.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => jumpToPage(idx)}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg shrink-0 transition cursor-pointer ${
                currentPageIndex === idx
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <Bookmark className="w-3 h-3" />
              <span>Trang {p.pageNumber}: {p.badgeText}</span>
              {p.id === 'surveyor-journal' && (
                <Sparkles className="w-3 h-3 text-amber-200 animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Page Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
            <div>
              <span className="inline-block px-2.5 py-0.5 mb-1 text-xs font-bold rounded bg-amber-950 text-amber-300 border border-amber-600/40">
                {page.badgeText} • Trang {page.pageNumber} / {BOOK_PAGES.length}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-amber-100">
                {page.title}
              </h3>
              {page.subtitle && (
                <p className="text-sm font-medium text-slate-400">{page.subtitle}</p>
              )}
            </div>

            {page.id === 'surveyor-journal' && (
              <div className="px-3 py-1 bg-amber-500/10 border border-amber-400/40 rounded-lg text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Chứa manh mối giải đố Màn 1</span>
              </div>
            )}
          </div>

          {/* Illustration */}
          <div className="rounded-xl overflow-hidden shadow-inner border border-slate-800">
            {renderIllustration(page.illustration)}
          </div>

          {/* Text Paragraphs */}
          <div className="space-y-3 pt-2">
            {page.content.map((paragraph, idx) => (
              <p
                key={idx}
                className={`text-sm sm:text-base leading-relaxed text-slate-200 ${
                  paragraph.startsWith('👉') || paragraph.startsWith('🔍') || paragraph.startsWith('✨')
                    ? 'p-3 rounded-xl bg-slate-900/80 border border-amber-500/20 font-semibold text-amber-200'
                    : ''
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Book Footer with Previous / Next Controls */}
        <div className="flex items-center justify-between px-5 py-3 bg-slate-900/90 border-t border-slate-800">
          <button
            onClick={goPrev}
            disabled={currentPageIndex === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer ${
              currentPageIndex === 0
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-100'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Trang trước</span>
          </button>

          <span className="text-xs text-slate-400 font-semibold">
            {currentPageIndex + 1} / {BOOK_PAGES.length}
          </span>

          <button
            onClick={goNext}
            disabled={currentPageIndex === BOOK_PAGES.length - 1}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer ${
              currentPageIndex === BOOK_PAGES.length - 1
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
            }`}
          >
            <span>Trang sau</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
