import Phaser from 'phaser';
import { Player } from './Player';
import { soundManager } from '../../audio/soundManager';

export interface InteractableConfig {
  x: number;
  y: number;
  texture: string;
  name: string;
  interactRadius?: number;
  indicatorOffsetY?: number;
  onInteract: () => void;
}

export class Interactable extends Phaser.GameObjects.Container {
  public sprite: Phaser.GameObjects.Sprite;
  private promptContainer: Phaser.GameObjects.Container;
  private interactRadius: number;
  private onInteractCallback: () => void;
  private isNear: boolean = false;

  constructor(scene: Phaser.Scene, config: InteractableConfig) {
    super(scene, config.x, config.y);
    scene.add.existing(this);

    this.interactRadius = config.interactRadius || 110;
    this.onInteractCallback = config.onInteract;

    // Sprite
    this.sprite = scene.add.sprite(0, 0, config.texture);
    this.sprite.setOrigin(0.5, 0.9);
    this.add(this.sprite);

    // Make sprite interactive for mouse click
    this.sprite.setInteractive({ useHandCursor: true });
    this.sprite.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      // Handled in scene to order Cuội to walk or interact
      this.emit('interactable_clicked', this);
    });

    // Hover effect
    this.sprite.on('pointerover', () => {
      this.sprite.setTint(0xfff3a0);
    });
    this.sprite.on('pointerout', () => {
      this.sprite.clearTint();
    });

    // Floating Interaction Prompt Badge [E]
    const promptY = config.indicatorOffsetY || -120;
    this.promptContainer = scene.add.container(0, promptY);
    this.promptContainer.setVisible(false);

    // Prompt background badge
    const bg = scene.add.graphics();
    bg.fillStyle(0x0f172a, 0.85);
    bg.fillRoundedRect(-55, -16, 110, 32, 10);
    bg.lineStyle(2, 0xfbbf24, 1);
    bg.strokeRoundedRect(-55, -16, 110, 32, 10);
    this.promptContainer.add(bg);

    // Key icon badge [E]
    const keyBadge = scene.add.graphics();
    keyBadge.fillStyle(0xd97706, 1);
    keyBadge.fillRoundedRect(-48, -11, 22, 22, 6);
    this.promptContainer.add(keyBadge);

    const keyText = scene.add.text(-37, 0, 'E', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '14px',
      color: '#ffffff',
      fontStyle: 'bold',
    }).setOrigin(0.5);
    this.promptContainer.add(keyText);

    // Action text
    const labelText = scene.add.text(4, 0, config.name, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '13px',
      color: '#fef08a',
      fontStyle: 'bold',
    }).setOrigin(0.5);
    this.promptContainer.add(labelText);

    this.add(this.promptContainer);

    // Subtle up-down floating tween for the badge
    scene.tweens.add({
      targets: this.promptContainer,
      y: promptY - 6,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  public checkPlayerProximity(player: Player): boolean {
    const dist = Phaser.Math.Distance.Between(this.x, 0, player.x, 0);
    const wasNear = this.isNear;
    this.isNear = dist <= this.interactRadius;

    if (this.isNear !== wasNear) {
      this.promptContainer.setVisible(this.isNear);
    }

    if (this.isNear && player.isKeyEPressed()) {
      soundManager.playInteract();
      this.onInteractCallback();
      return true;
    }

    return this.isNear;
  }

  public getIsNear(): boolean {
    return this.isNear;
  }

  public triggerInteract(): void {
    soundManager.playInteract();
    this.onInteractCallback();
  }
}
