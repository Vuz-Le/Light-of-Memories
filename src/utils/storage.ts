import { GameProgress } from '../types/gameTypes';

const STORAGE_KEY = 'cuoi_moon_adventure_save_v1';

export const INITIAL_PROGRESS: GameProgress = {
  version: 1,
  hasStarted: false,
  currentScene: 'tree',
  hasSeenIntro: false,
  hasInteractedBench: false,
  hasSpokenWithTree: false,
  hasLantern: false,
  litStars: 0,
  firstStarLit: false,
  hasMetMatTron: false,
  collectedFragments: [],
  isPuzzleSolved: false,
  hasCompletedChapter1: false,
  unlockedCharacterCards: [],
  lastSavedAt: new Date().toISOString(),
};

export const loadGameProgress = (): GameProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...INITIAL_PROGRESS };
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return { ...INITIAL_PROGRESS, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load save data from localStorage:', e);
  }
  return { ...INITIAL_PROGRESS };
};

export const saveGameProgress = (progress: GameProgress): void => {
  try {
    const dataToSave: GameProgress = {
      ...progress,
      lastSavedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (e) {
    console.error('Failed to save data to localStorage:', e);
  }
};

export const hasExistingSave = (): boolean => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed && parsed.hasStarted);
  } catch {
    return false;
  }
};

export const clearGameProgress = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear save data:', e);
  }
};
