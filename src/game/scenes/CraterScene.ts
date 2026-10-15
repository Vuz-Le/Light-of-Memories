import { BaseScene } from './BaseScene';
import { Player } from '../objects/Player';
import { Interactable } from '../objects/Interactable';
import { gameEvents } from '../events/gameEvents';
import { soundManager } from '../../audio/soundManager';

interface FragmentItem {
  id: string;
  interactable: Interactable;
  collected: boolean;
}

export class CraterScene extends BaseScene {
  private matTronInteractable!: Interactable;
  private backPortalInteractable!: Interactable;
  private fragments: FragmentItem[] = [];

  constructor() {
    super('CraterScene');
  }

  public create(): void {
    super.create();

    const { width } = this.scale;
    this.groundBounds = { minX: 60, maxX: width - 60 };

    // Crater Rim Visual Curve
    const craterGraphics = this.add.graphics();
    craterGraphics.fillStyle(0x334155, 0.45);
    craterGraphics.fillEllipse(width / 2, 525, width - 160, 70);

    // Trench lines in soil dug by Surveyor 3's mechanical arm (4 rãnh đất)
    craterGraphics.lineStyle(3, 0x1e293b, 0.8);
    for (let i = 0; i < 4; i++) {
      craterGraphics.lineBetween(420 - i * 15, 508 + i * 4, 450 - i * 12, 514 + i * 4);
    }

    // 1. Back Portal to Banyan Tree
    this.backPortalInteractable = new Interactable(this, {
      x: 75,
      y: 495,
      texture: 'signpost',
      name: '⬅ Gốc Đa',
      interactRadius: 80,
      indicatorOffsetY: -75,
      onInteract: () => {
        gameEvents.emit('INTERACT_TRIGGERED', { type: 'portal_tree' });
      },
    });
    this.registerInteractable(this.backPortalInteractable);

    // 2. Mắt Tròn (Surveyor 3 Robot)
    this.matTronInteractable = new Interactable(this, {
      x: 520,
      y: 495,
      texture: 'mat_tron',
      name: 'Mắt Tròn',
      interactRadius: 120,
      indicatorOffsetY: -150,
      onInteract: () => {
        gameEvents.emit('INTERACT_TRIGGERED', { type: 'mat_tron' });
      },
    });
    this.registerInteractable(this.matTronInteractable);

    // Subtle antenna bobbing
    this.tweens.add({
      targets: this.matTronInteractable.sprite,
      y: -3,
      duration: 1800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // 3. Three Floating Memory Fragments
    const fragConfigs = [
      { id: 'fragment_1', x: 280, y: 505, name: 'Mảnh Ký Ức 1' },
      { id: 'fragment_2', x: 700, y: 495, name: 'Mảnh Ký Ức 2' },
      { id: 'fragment_3', x: 860, y: 505, name: 'Mảnh Ký Ức 3' },
    ];

    this.fragments = [];
    fragConfigs.forEach((cfg) => {
      const item = new Interactable(this, {
        x: cfg.x,
        y: cfg.y,
        texture: 'memory_fragment',
        name: 'Nhặt Ký Ức',
        interactRadius: 75,
        indicatorOffsetY: -50,
        onInteract: () => {
          this.collectFragment(cfg.id);
        },
      });

      // Floating / spinning shimmer
      this.tweens.add({
        targets: item.sprite,
        y: -10,
        angle: 8,
        duration: 1200 + Math.random() * 400,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });

      this.registerInteractable(item);
      this.fragments.push({ id: cfg.id, interactable: item, collected: false });
    });

    // 4. Player Cuội
    this.player = new Player(this, 150, 495);
    this.player.setBounds(this.groundBounds.minX, this.groundBounds.maxX);

    // Listen to scene change requests from React
    const unbindChangeScene = gameEvents.on('CHANGE_SCENE', (sceneKey: string) => {
      if (sceneKey === 'TreeScene') {
        this.scene.start('TreeScene');
      }
    });
    this.unsubscribeEvents.push(unbindChangeScene);

    // Listen to progress updates to hide already collected fragments
    const unbindProgress = gameEvents.on('UPDATE_PROGRESS', (progress: any) => {
      if (progress && progress.collectedFragments) {
        this.updateFragmentsVisibility(progress.collectedFragments);
      }
    });
    this.unsubscribeEvents.push(unbindProgress);

    // Notify React that CraterScene is ready
    gameEvents.emit('SCENE_CHANGED', 'crater');
  }

  private collectFragment(id: string): void {
    const frag = this.fragments.find((f) => f.id === id);
    if (!frag || frag.collected) return;

    frag.collected = true;
    soundManager.playPickup();

    // Fly up and sparkle animation
    this.tweens.add({
      targets: frag.interactable,
      y: frag.interactable.y - 60,
      alpha: 0,
      scale: 1.4,
      duration: 600,
      ease: 'Back.easeIn',
      onComplete: () => {
        frag.interactable.setVisible(false);
      },
    });

    // Notify React
    gameEvents.emit('FRAGMENT_COLLECTED', id);
  }

  private updateFragmentsVisibility(collectedIds: string[]): void {
    this.fragments.forEach((frag) => {
      if (collectedIds.includes(frag.id)) {
        frag.collected = true;
        frag.interactable.setVisible(false);
      }
    });
  }
}
