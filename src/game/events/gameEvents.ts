// Event Bus bridging Phaser Game and React State

export type GameEventType =
  | 'PHASER_READY'
  | 'INTERACT_TRIGGERED'
  | 'PLAYER_MOVED'
  | 'SCENE_CHANGED'
  | 'LOCK_CONTROLS'
  | 'CHANGE_SCENE'
  | 'UPDATE_PROGRESS'
  | 'FRAGMENT_COLLECTED'
  | 'TRIGGER_STAR_BURST';

type Listener = (data?: any) => void;

class GameEventBus {
  private listeners: Map<string, Set<Listener>> = new Map();

  public on(event: GameEventType, callback: Listener): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    // Return unbind function
    return () => {
      this.off(event, callback);
    };
  }

  public off(event: GameEventType, callback: Listener): void {
    const set = this.listeners.get(event);
    if (set) {
      set.delete(callback);
      if (set.size === 0) {
        this.listeners.delete(event);
      }
    }
  }

  public emit(event: GameEventType, data?: any): void {
    const set = this.listeners.get(event);
    if (set) {
      set.forEach((cb) => {
        try {
          cb(data);
        } catch (err) {
          console.error(`Error in event listener for ${event}:`, err);
        }
      });
    }
  }

  public clear(): void {
    this.listeners.clear();
  }
}

export const gameEvents = new GameEventBus();
