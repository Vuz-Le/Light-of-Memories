import { BaseScene } from './BaseScene';
import { Player } from '../objects/Player';
import { Interactable } from '../objects/Interactable';
import { gameEvents } from '../events/gameEvents';

export class TreeScene extends BaseScene {
  private treeInteractable!: Interactable;
  private benchInteractable!: Interactable;
  private portalInteractable!: Interactable;

  constructor() {
    super('TreeScene');
  }

  public create(): void {
    super.create();

    const { width } = this.scale;
    this.groundBounds = { minX: 60, maxX: width - 60 };

    // 1. Ancient Banyan Tree
    this.treeInteractable = new Interactable(this, {
      x: 390,
      y: 500,
      texture: 'banyan_tree',
      name: 'Cây Đa',
      interactRadius: 130,
      indicatorOffsetY: -220,
      onInteract: () => {
        gameEvents.emit('INTERACT_TRIGGERED', { type: 'tree' });
      },
    });
    this.registerInteractable(this.treeInteractable);

    // Tree breathing glow tween
    this.tweens.add({
      targets: this.treeInteractable.sprite,
      alpha: 0.9,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // 2. Empty Stone Bench (Ghế đá trống không của Chị Hằng)
    this.benchInteractable = new Interactable(this, {
      x: 180,
      y: 500,
      texture: 'stone_bench',
      name: 'Ghế Đá',
      interactRadius: 90,
      indicatorOffsetY: -65,
      onInteract: () => {
        gameEvents.emit('INTERACT_TRIGGERED', { type: 'bench' });
      },
    });
    this.registerInteractable(this.benchInteractable);

    // 3. Portal / Signpost leading to Crater Scene
    this.portalInteractable = new Interactable(this, {
      x: width - 80,
      y: 495,
      texture: 'signpost',
      name: 'Miệng Hố ➔',
      interactRadius: 85,
      indicatorOffsetY: -75,
      onInteract: () => {
        gameEvents.emit('INTERACT_TRIGGERED', { type: 'portal_crater' });
      },
    });
    this.registerInteractable(this.portalInteractable);

    // Dust footprints trail leading to the right
    const trailGraphics = this.add.graphics();
    trailGraphics.fillStyle(0xe2e8f0, 0.4);
    for (let tx = 520; tx < width - 90; tx += 45) {
      trailGraphics.fillEllipse(tx, 502 + (tx % 10), 10, 4);
    }

    // 4. Player Cuội
    this.player = new Player(this, 260, 495);
    this.player.setBounds(this.groundBounds.minX, this.groundBounds.maxX);

    // Listen to scene change requests from React
    const unbindChangeScene = gameEvents.on('CHANGE_SCENE', (sceneKey: string) => {
      if (sceneKey === 'CraterScene') {
        this.scene.start('CraterScene');
      }
    });
    this.unsubscribeEvents.push(unbindChangeScene);

    // Notify React that TreeScene is ready
    gameEvents.emit('SCENE_CHANGED', 'tree');
  }
}
