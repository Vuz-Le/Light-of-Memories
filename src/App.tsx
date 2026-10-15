import React, { useState, useEffect, useRef } from 'react';
import { GameCanvas } from './components/GameCanvas';
import { HeaderBar } from './components/HeaderBar';
import { DialogueBox } from './components/DialogueBox';
import { BookModal } from './components/BookModal';
import { PuzzleModal } from './components/PuzzleModal';
import { MemoryViewerModal } from './components/MemoryViewerModal';
import { CharacterCardModal } from './components/CharacterCardModal';
import { MainMenu } from './components/MainMenu';
import { ConfirmModal } from './components/ConfirmModal';

import { GameProgress, DialogueNode, MemoryFragment } from './types/gameTypes';
import {
  loadGameProgress,
  saveGameProgress,
  hasExistingSave,
  clearGameProgress,
  INITIAL_PROGRESS,
} from './utils/storage';
import { DIALOGUE_GROUPS } from './data/storyData';
import { MEMORY_FRAGMENTS } from './data/puzzleData';
import { gameEvents } from './game/events/gameEvents';
import { soundManager } from './audio/soundManager';

export const App: React.FC = () => {
  // Game Progress State
  const [progress, setProgress] = useState<GameProgress>(() => loadGameProgress());
  const [isMainMenuOpen, setIsMainMenuOpen] = useState<boolean>(() => !progress.hasStarted);

  // Modals & Overlay States
  const [activeDialogueGroup, setActiveDialogueGroup] = useState<string | null>(null);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [bookInitialPage, setBookInitialPage] = useState<string>('cuoi-intro');
  const [isPuzzleOpen, setIsPuzzleOpen] = useState(false);
  const [viewingFragment, setViewingFragment] = useState<MemoryFragment | null>(null);
  const [isCardsOpen, setIsCardsOpen] = useState(false);
  const [isConfirmResetOpen, setIsConfirmResetOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Sync progress to localStorage on any state change
  useEffect(() => {
    saveGameProgress(progress);
    gameEvents.emit('UPDATE_PROGRESS', progress);
  }, [progress]);

  // Lock or unlock Phaser controls based on whether any overlay is active
  const isAnyModalActive =
    isMainMenuOpen ||
    activeDialogueGroup !== null ||
    isBookOpen ||
    isPuzzleOpen ||
    viewingFragment !== null ||
    isCardsOpen ||
    isConfirmResetOpen;

  useEffect(() => {
    gameEvents.emit('LOCK_CONTROLS', isAnyModalActive);
  }, [isAnyModalActive]);

  // Listen to Phaser Events
  useEffect(() => {
    // 1. Interaction Triggered by player in Phaser
    const unbindInteract = gameEvents.on('INTERACT_TRIGGERED', (data: { type: string; id?: string }) => {
      handleInteractTrigger(data.type, data.id);
    });

    // 2. Fragment collected
    const unbindFragment = gameEvents.on('FRAGMENT_COLLECTED', (fragmentId: string) => {
      handleFragmentCollected(fragmentId);
    });

    // 3. Scene changed notification from Phaser
    const unbindScene = gameEvents.on('SCENE_CHANGED', (sceneId: 'tree' | 'crater') => {
      setProgress((prev) => ({ ...prev, currentScene: sceneId }));
    });

    return () => {
      unbindInteract();
      unbindFragment();
      unbindScene();
    };
  }, [progress]);

  // Handle interactable triggers
  const handleInteractTrigger = (type: string, id?: string) => {
    switch (type) {
      case 'bench':
        setActiveDialogueGroup('bench_empty');
        break;

      case 'tree':
        if (!progress.hasSpokenWithTree) {
          setActiveDialogueGroup('tree_task');
        } else {
          // General reminder
          setActiveDialogueGroup('tree_task');
        }
        break;

      case 'portal_crater':
        if (!progress.hasLantern) {
          // Guide player to tree first
          setActiveDialogueGroup('bench_empty');
        } else {
          soundManager.playInteract();
          gameEvents.emit('CHANGE_SCENE', 'CraterScene');
        }
        break;

      case 'portal_tree':
        soundManager.playInteract();
        gameEvents.emit('CHANGE_SCENE', 'TreeScene');
        break;

      case 'mat_tron':
        if (!progress.hasMetMatTron) {
          setActiveDialogueGroup('crater_meet');
        } else if (progress.collectedFragments.length < 3) {
          setActiveDialogueGroup('crater_not_enough');
        } else if (!progress.isPuzzleSolved) {
          // Open puzzle
          setIsPuzzleOpen(true);
        } else {
          // Already completed
          setActiveDialogueGroup('chapter1_finish');
        }
        break;

      default:
        break;
    }
  };

  // Handle fragment collection
  const handleFragmentCollected = (fragmentId: string) => {
    const fragment = MEMORY_FRAGMENTS.find((f) => f.id === fragmentId);
    if (!fragment) return;

    setProgress((prev) => {
      const alreadyHas = prev.collectedFragments.includes(fragmentId);
      const newFragments = alreadyHas ? prev.collectedFragments : [...prev.collectedFragments, fragmentId];
      return {
        ...prev,
        collectedFragments: newFragments,
      };
    });

    // Open fragment inspection viewer
    setViewingFragment(fragment);
  };

  // Handle Dialogue Events (e.g. tree gives lantern)
  const handleDialogueEventTrigger = (event: string) => {
    switch (event) {
      case 'interacted_bench':
        setProgress((prev) => ({ ...prev, hasInteractedBench: true }));
        break;

      case 'give_lantern':
        setProgress((prev) => ({ ...prev, hasLantern: true }));
        break;

      case 'tree_finished':
        setProgress((prev) => ({
          ...prev,
          hasSpokenWithTree: true,
          hasLantern: true,
        }));
        break;

      case 'start_search_fragments':
        setProgress((prev) => ({ ...prev, hasMetMatTron: true }));
        break;

      case 'star_first_lit':
        setProgress((prev) => ({
          ...prev,
          firstStarLit: true,
          litStars: 1,
          hasCompletedChapter1: true,
          unlockedCharacterCards: ['mat-tron'],
        }));
        break;

      default:
        break;
    }
  };

  // Dialogue Completed
  const handleDialogueComplete = () => {
    setActiveDialogueGroup(null);
  };

  // Start New Game
  const handleStartNewGame = () => {
    clearGameProgress();
    const fresh: GameProgress = {
      ...INITIAL_PROGRESS,
      hasStarted: true,
    };
    setProgress(fresh);
    saveGameProgress(fresh);
    setIsMainMenuOpen(false);

    // If starting fresh, start with waking dialogue
    setTimeout(() => {
      setActiveDialogueGroup('wake_intro');
      soundManager.startAmbient();
    }, 400);
  };

  // Continue Game
  const handleContinueGame = () => {
    setIsMainMenuOpen(false);
    soundManager.startAmbient();

    // If current scene was crater, ensure Phaser moves to CraterScene
    if (progress.currentScene === 'crater') {
      setTimeout(() => {
        gameEvents.emit('CHANGE_SCENE', 'CraterScene');
      }, 300);
    }
  };

  // Request Reset
  const handleRequestReset = () => {
    setIsConfirmResetOpen(true);
  };

  const handleConfirmReset = () => {
    clearGameProgress();
    setProgress({ ...INITIAL_PROGRESS });
    setIsConfirmResetOpen(false);
    setIsMainMenuOpen(true);
  };

  // Open Book to specific page
  const handleOpenBook = (pageId: string = 'cuoi-intro') => {
    setBookInitialPage(pageId);
    setIsBookOpen(true);
  };

  // Puzzle Solved Callback
  const handlePuzzleSolved = () => {
    setIsPuzzleOpen(false);
    setProgress((prev) => ({
      ...prev,
      isPuzzleSolved: true,
      litStars: 1,
      firstStarLit: true,
      hasCompletedChapter1: true,
      unlockedCharacterCards: ['mat-tron'],
    }));

    // Trigger concluding dialogue
    setTimeout(() => {
      setActiveDialogueGroup('chapter1_finish');
    }, 400);
  };

  // Audio Toggle
  const handleToggleMute = () => {
    const nextMuted = soundManager.toggleMute();
    setIsMuted(nextMuted);
  };

  // Active Dialogue List
  const activeDialogues: DialogueNode[] = activeDialogueGroup
    ? DIALOGUE_GROUPS[activeDialogueGroup] || []
    : [];

  return (
    <main className="relative w-screen h-screen flex flex-col bg-slate-950 select-none overflow-hidden font-sans">
      {/* Top Navigation & Status Bar */}
      {!isMainMenuOpen && (
        <HeaderBar
          progress={progress}
          onOpenBook={() => handleOpenBook('cuoi-intro')}
          onOpenCards={() => setIsCardsOpen(true)}
          onRequestReset={handleRequestReset}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {/* Phaser Canvas Container */}
      <div className="flex-1 w-full h-full relative flex items-center justify-center">
        <GameCanvas />
      </div>

      {/* Main Menu Modal */}
      {isMainMenuOpen && (
        <MainMenu
          hasSavedGame={hasExistingSave()}
          onStartNewGame={handleStartNewGame}
          onContinueGame={handleContinueGame}
        />
      )}

      {/* Dialogue Box */}
      {activeDialogueGroup && activeDialogues.length > 0 && (
        <DialogueBox
          dialogues={activeDialogues}
          onComplete={handleDialogueComplete}
          onEventTrigger={handleDialogueEventTrigger}
        />
      )}

      {/* Companion Digital Book Modal */}
      <BookModal
        isOpen={isBookOpen}
        onClose={() => setIsBookOpen(false)}
        initialPageId={bookInitialPage}
      />

      {/* Timeline Arrangement Puzzle Modal */}
      <PuzzleModal
        isOpen={isPuzzleOpen}
        onClose={() => setIsPuzzleOpen(false)}
        onOpenBookClue={() => handleOpenBook('surveyor-journal')}
        onPuzzleSolved={handlePuzzleSolved}
      />

      {/* Memory Fragment Inspector Modal */}
      <MemoryViewerModal
        fragment={viewingFragment}
        totalCollected={progress.collectedFragments.length}
        onClose={() => setViewingFragment(null)}
      />

      {/* Character Cards Modal */}
      <CharacterCardModal
        isOpen={isCardsOpen}
        onClose={() => setIsCardsOpen(false)}
        unlockedCardIds={progress.unlockedCharacterCards}
      />

      {/* Reset Confirmation Modal */}
      <ConfirmModal
        isOpen={isConfirmResetOpen}
        title="Bắt đầu lại chuyến phiêu lưu?"
        message="Hành động này sẽ xóa toàn bộ tiến trình đã lưu trong trình duyệt (các mảnh nhật ký và cánh sao đã thắp). Bạn có chắc chắn muốn bắt đầu lại từ đầu không?"
        confirmText="Xác nhận bắt đầu lại"
        cancelText="Giữ tiến trình cũ"
        onConfirm={handleConfirmReset}
        onCancel={() => setIsConfirmResetOpen(false)}
      />
    </main>
  );
};

export default App;
