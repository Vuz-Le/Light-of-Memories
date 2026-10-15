import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { createPhaserGame } from '../game/PhaserGame';
import { gameEvents } from '../game/events/gameEvents';

interface GameCanvasProps {
  onPhaserReady?: () => void;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({ onPhaserReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!gameRef.current) {
      const game = createPhaserGame(containerRef.current);
      gameRef.current = game;

      game.events.once('ready', () => {
        gameEvents.emit('PHASER_READY');
        if (onPhaserReady) {
          onPhaserReady();
        }
      });
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-slate-950 overflow-hidden select-none">
      <div
        ref={containerRef}
        id="phaser-canvas-wrapper"
        className="w-full max-w-[1024px] aspect-[16/9] shadow-2xl rounded-lg overflow-hidden border border-slate-800"
      />
    </div>
  );
};
