import Phaser from 'phaser';
import { TreeScene } from './scenes/TreeScene';
import { CraterScene } from './scenes/CraterScene';

export const createPhaserGame = (parentEl: HTMLElement): Phaser.Game => {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: parentEl,
    width: 1024,
    height: 576,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 },
        debug: false,
      },
    },
    scene: [TreeScene, CraterScene],
    backgroundColor: '#020617',
    render: {
      antialias: true,
      pixelArt: false,
    },
  };

  return new Phaser.Game(config);
};
