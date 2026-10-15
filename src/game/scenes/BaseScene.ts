import Phaser from 'phaser';
import { Player } from '../objects/Player';
import { Interactable } from '../objects/Interactable';
import { TextureGenerator } from '../textures/TextureGenerator';
import { gameEvents } from '../events/gameEvents';

export abstract class BaseScene extends Phaser.Scene {
  protected player!: Player;
  protected interactables: Interactable[] = [];
  protected groundY: number = 490;
  protected groundBounds = { minX: 60, maxX: 940 };
  protected unsubscribeEvents: (() => void)[] = [];

  constructor(key: string) {
    super({ key });
  }

  public create(): void {
    // Generate all procedural canvas textures if not already present
    TextureGenerator.generateAll(this);

    // Draw cosmic starfield
    this.createCosmicBackground();

    // Register event listeners
    const unbindLock = gameEvents.on('LOCK_CONTROLS', (locked: boolean) => {
      if (this.player) {
        this.player.setLocked(locked);
      }
    });
    this.unsubscribeEvents.push(unbindLock);

    // Handle clicking anywhere on the ground to walk
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      // If clicking directly on an interactable, the interactable's listener handles it
      // Otherwise, move player to clicked X coordinate
      if (this.player && !this.player.getLocked()) {
        const targetX = Phaser.Math.Clamp(pointer.worldX, this.groundBounds.minX, this.groundBounds.maxX);
        this.player.moveTo(targetX);
      }
    });

    // Cleanup on scene shutdown
    this.events.once('shutdown', () => {
      this.unsubscribeEvents.forEach((unsub) => unsub());
      this.unsubscribeEvents = [];
    });
  }

  protected createCosmicBackground(): void {
    const { width, height } = this.scale;

    // Sky gradient (Deep space nebula)
    const sky = this.add.graphics();
    sky.fillGradientStyle(0x020617, 0x020617, 0x0f172a, 0x1e1b4b, 1);
    sky.fillRect(0, 0, width, height);

    // Twinkling stars
    for (let i = 0; i < 90; i++) {
      const sx = Phaser.Math.Between(10, width - 10);
      const sy = Phaser.Math.Between(10, this.groundY - 60);
      const radius = Math.random() < 0.8 ? 1 : 2;
      const star = this.add.circle(sx, sy, radius, 0xffffff, Phaser.Math.FloatBetween(0.4, 0.95));

      if (Math.random() < 0.4) {
        this.tweens.add({
          targets: star,
          alpha: Phaser.Math.FloatBetween(0.1, 0.3),
          duration: Phaser.Math.Between(1200, 2400),
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut',
          delay: Phaser.Math.Between(0, 2000),
        });
      }
    }

    // Distant Blue Marble Earth
    const earth = this.add.image(width - 140, 110, 'earth_sky');
    earth.setScale(0.9);
    earth.setAlpha(0.9);
    this.tweens.add({
      targets: earth,
      y: 114,
      duration: 3500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Moon Ground Surface
    const ground = this.add.tileSprite(width / 2, this.groundY + 60, width + 50, 140, 'moon_surface');
    ground.setAlpha(0.95);
  }

  protected registerInteractable(interactable: Interactable): void {
    this.interactables.push(interactable);

    // If interactable was clicked by mouse
    interactable.on('interactable_clicked', () => {
      if (!this.player || this.player.getLocked()) return;

      const dist = Math.abs(this.player.x - interactable.x);
      if (dist <= 110) {
        // Near enough: interact immediately
        interactable.triggerInteract();
      } else {
        // Far away: Cuội walks close first, then automatically interacts!
        const approachX = interactable.x > this.player.x ? interactable.x - 70 : interactable.x + 70;
        this.player.moveTo(approachX, () => {
          interactable.triggerInteract();
        });
      }
    });
  }

  public update(time: number, delta: number): void {
    if (this.player) {
      this.player.update(time, delta);

      // Check proximity for all interactables
      this.interactables.forEach((item) => {
        item.checkPlayerProximity(this.player);
      });
    }
  }
}
