export type SceneId = 'tree' | 'crater';

export interface GameProgress {
  version: number;
  hasStarted: boolean;
  currentScene: SceneId;
  hasSeenIntro: boolean;
  hasInteractedBench: boolean;
  hasSpokenWithTree: boolean;
  hasLantern: boolean; // Received the 5-point star lantern
  litStars: number; // 0 to 5
  firstStarLit: boolean;
  hasMetMatTron: boolean;
  collectedFragments: string[]; // IDs: ['fragment_1', 'fragment_2', 'fragment_3']
  isPuzzleSolved: boolean;
  hasCompletedChapter1: boolean;
  unlockedCharacterCards: string[];
  lastSavedAt: string;
}

export interface DialogueNode {
  id: string;
  speaker: string;
  avatar: string; // 'cuoi' | 'tree' | 'mat_tron' | 'chi_hang'
  text: string;
  emotion?: 'neutral' | 'sad' | 'surprised' | 'happy' | 'determined';
  nextId?: string | null;
  triggerEvent?: string; // e.g., 'give_lantern', 'complete_dialogue', 'open_book'
}

export interface BookPageData {
  id: string;
  pageNumber: number;
  title: string;
  subtitle?: string;
  category: 'story' | 'character' | 'clue' | 'stem';
  content: string[];
  illustration: string; // identifier or SVG key
  badgeText?: string;
}

export interface MemoryFragment {
  id: string;
  title: string;
  orderIndex: number; // 1, 2, or 3
  thumbnail: string;
  fullImage: string;
  hint: string;
  description: string;
  historicalDate: string;
  nasaFact: string;
}

export interface CharacterCard {
  id: string;
  name: string;
  codename: string;
  year: string;
  role: string;
  avatar: string;
  storyDescription: string;
  nasaFacts: string[];
  stemSkill: string;
}
