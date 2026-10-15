import Phaser from 'phaser';
import { soundManager } from '../../audio/soundManager';
import { gameEvents } from '../events/gameEvents';

export class Player extends Phaser.GameObjects.Sprite {
  private speed: number = 220; // pixels per second
  private targetX: number | null = null;
  private targetInteractCallback: (() => void) | null = null;
  private isLocked: boolean = false;
  private walkAnimTimer: number = 0;
  private walkFrameState: number = 0;
  private stepSoundTimer: number = 0;

  // Key references
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keyA!: Phaser.Input.Keyboard.Key;
  private keyD!: Phaser.Input.Keyboard.Key;
  private keyE!: Phaser.Input.Keyboard.Key;

  private minX: number = 60;
  private maxX: number = 960;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'cuoi_idle');
    scene.add.existing(this);

    this.setOrigin(0.5, 0.9);
    this.setScale(1);

    if (scene.input.keyboard) {
      this.cursors = scene.input.keyboard.createCursorKeys();
      this.keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      this.keyE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }
  }

  public setBounds(minX: number, maxX: number) {
    this.minX = minX;
    this.maxX = maxX;
  }

  public setLocked(locked: boolean) {
    this.isLocked = locked;
    if (locked) {
      this.targetX = null;
      this.targetInteractCallback = null;
      this.setTexture('cuoi_idle');
    }
  }

  public getLocked(): boolean {
    return this.isLocked;
  }

  public moveTo(x: number, onArrival?: () => void) {
    if (this.isLocked) return;
    this.targetX = Phaser.Math.Clamp(x, this.minX, this.maxX);
    this.targetInteractCallback = onArrival || null;
  }

  public cancelTarget() {
    this.targetX = null;
    this.targetInteractCallback = null;
  }

  public isKeyEPressed(): boolean {
    if (this.isLocked) return false;
    return Phaser.Input.Keyboard.JustDown(this.keyE);
  }

  public update(time: number, delta: number) {
    if (this.isLocked) return;

    let moveDir = 0;

    // Check keyboard input
    const leftPressed = this.cursors?.left.isDown || this.keyA?.isDown;
    const rightPressed = this.cursors?.right.isDown || this.keyD?.isDown;

    if (leftPressed) {
      moveDir = -1;
      // KEYBOARD PRIORITY: Cancels mouse click destination
      this.cancelTarget();
    } else if (rightPressed) {
      moveDir = 1;
      // KEYBOARD PRIORITY: Cancels mouse click destination
      this.cancelTarget();
    } else if (this.targetX !== null) {
      // Move towards mouse click target
      const dist = this.targetX - this.x;
      if (Math.abs(dist) > 6) {
        moveDir = Math.sign(dist);
      } else {
        // Arrived at target
        this.x = this.targetX;
        this.targetX = null;
        if (this.targetInteractCallback) {
          const cb = this.targetInteractCallback;
          this.targetInteractCallback = null;
          cb();
        }
      }
    }

    // Apply movement
    if (moveDir !== 0) {
      const deltaSec = delta / 1000;
      this.x += moveDir * this.speed * deltaSec;
      this.x = Phaser.Math.Clamp(this.x, this.minX, this.maxX);

      // Facing orientation
      this.setFlipX(moveDir < 0);

      // Walking animation
      this.walkAnimTimer += delta;
      if (this.walkAnimTimer > 160) {
        this.walkAnimTimer = 0;
        this.walkFrameState = (this.walkFrameState + 1) % 2;
        this.setTexture(this.walkFrameState === 0 ? 'cuoi_walk_1' : 'cuoi_walk_2');
      }

      // Footstep sound
      this.stepSoundTimer += delta;
      if (this.stepSoundTimer > 320) {
        this.stepSoundTimer = 0;
        soundManager.playStep();
      }

      // Notify player position
      gameEvents.emit('PLAYER_MOVED', { x: this.x, y: this.y });
    } else {
      // Idle
      this.setTexture('cuoi_idle');
      this.walkAnimTimer = 0;
    }
  }
}
