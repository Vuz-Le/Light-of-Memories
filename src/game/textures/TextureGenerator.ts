import Phaser from 'phaser';

export class TextureGenerator {
  public static generateAll(scene: Phaser.Scene): void {
    if (!scene.textures.exists('cuoi_idle')) {
      this.createCuoiFrames(scene);
      this.createTreeTexture(scene);
      this.createBenchTexture(scene);
      this.createMatTronTexture(scene);
      this.createMemoryFragmentTexture(scene);
      this.createMoonGroundTexture(scene);
      this.createEarthInSkyTexture(scene);
      this.createSignpostTexture(scene);
      this.createSparkleParticle(scene);
    }
  }

  // Draw Cuội: Cute Vietnamese boy with brown Ao Ba Ba, scarf, hair tuft
  private static createCuoiFrames(scene: Phaser.Scene): void {
    const width = 64;
    const height = 96;

    // Frame 0: Idle
    const canvasIdle = scene.textures.createCanvas('cuoi_idle', width, height);
    if (canvasIdle) {
      const ctx = canvasIdle.context;
      this.drawCuoiFigure(ctx, width, height, 0, 0);
      canvasIdle.refresh();
    }

    // Frame 1: Walk A (left leg forward)
    const canvasWalk1 = scene.textures.createCanvas('cuoi_walk_1', width, height);
    if (canvasWalk1) {
      const ctx = canvasWalk1.context;
      this.drawCuoiFigure(ctx, width, height, -6, -2);
      canvasWalk1.refresh();
    }

    // Frame 2: Walk B (right leg forward)
    const canvasWalk2 = scene.textures.createCanvas('cuoi_walk_2', width, height);
    if (canvasWalk2) {
      const ctx = canvasWalk2.context;
      this.drawCuoiFigure(ctx, width, height, 6, -2);
      canvasWalk2.refresh();
    }
  }

  private static drawCuoiFigure(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    legOffset: number,
    bobOffset: number
  ): void {
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2 + 10 + bobOffset;

    // Shadow on moon dust
    ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
    ctx.beginPath();
    ctx.ellipse(cx, h - 6, 20, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Legs / Pants (Brown traditional loose trousers)
    ctx.fillStyle = '#6b4324';
    // Left leg
    ctx.beginPath();
    ctx.roundRect(cx - 10 + legOffset, cy + 18, 8, 16, 4);
    ctx.fill();
    // Right leg
    ctx.beginPath();
    ctx.roundRect(cx + 2 - legOffset, cy + 18, 8, 16, 4);
    ctx.fill();

    // Bare feet
    ctx.fillStyle = '#f6d3b3';
    ctx.beginPath();
    ctx.roundRect(cx - 11 + legOffset, cy + 32, 10, 5, 2);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(cx + 1 - legOffset, cy + 32, 10, 5, 2);
    ctx.fill();

    // Torso - Brown traditional tunic (Áo nâu)
    ctx.fillStyle = '#8b5a2b';
    ctx.beginPath();
    ctx.roundRect(cx - 14, cy - 4, 28, 24, 6);
    ctx.fill();

    // Belt / Sash (Reddish orange)
    ctx.fillStyle = '#d97706';
    ctx.fillRect(cx - 14, cy + 12, 28, 4);

    // Cute scarf / Khăn rằn tie around neck
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(cx - 10, cy - 5, 20, 4);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(cx - 8, cy - 5, 4, 4);
    ctx.fillRect(cx + 4, cy - 5, 4, 4);

    // Head / Face
    ctx.fillStyle = '#fcd5b5';
    ctx.beginPath();
    ctx.arc(cx, cy - 18, 14, 0, Math.PI * 2);
    ctx.fill();

    // Rosy cheeks
    ctx.fillStyle = 'rgba(244, 63, 94, 0.45)';
    ctx.beginPath();
    ctx.arc(cx - 8, cy - 15, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 8, cy - 15, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Cute Big Anime / Cartoon Eyes
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(cx - 5, cy - 19, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 5, cy - 19, 3, 0, Math.PI * 2);
    ctx.fill();

    // Eye catchlights (sparkle)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx - 6, cy - 20, 1.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 4, cy - 20, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Happy smiling mouth
    ctx.strokeStyle = '#831843';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy - 13, 3.5, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();

    // Traditional Hair Tuft (Tóc trái đào / búi tóc chú Cuội)
    ctx.fillStyle = '#292524';
    // Back hair
    ctx.beginPath();
    ctx.arc(cx, cy - 22, 13, Math.PI, Math.PI * 2);
    ctx.fill();
    // Top tuft (chỏm tóc)
    ctx.beginPath();
    ctx.arc(cx, cy - 34, 6, 0, Math.PI * 2);
    ctx.fill();
    // Red hair ribbon
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(cx - 4, cy - 31, 8, 3);
  }

  // Ancient Majestic Banyan Tree (Cây Đa ngàn năm trên Mặt Trăng)
  private static createTreeTexture(scene: Phaser.Scene): void {
    const canvas = scene.textures.createCanvas('banyan_tree', 340, 380);
    if (!canvas) return;
    const ctx = canvas.context;
    ctx.clearRect(0, 0, 340, 380);

    const bx = 170;
    const by = 350;

    // Glowing aura around tree
    const auraGrad = ctx.createRadialGradient(bx, by - 160, 40, bx, by - 160, 170);
    auraGrad.addColorStop(0, 'rgba(52, 211, 153, 0.35)');
    auraGrad.addColorStop(0.6, 'rgba(16, 185, 129, 0.15)');
    auraGrad.addColorStop(1, 'rgba(5, 150, 105, 0)');
    ctx.fillStyle = auraGrad;
    ctx.beginPath();
    ctx.arc(bx, by - 160, 170, 0, Math.PI * 2);
    ctx.fill();

    // Trunk & Branches (Deep rich ancient bark)
    ctx.fillStyle = '#452b1f';
    ctx.beginPath();
    ctx.moveTo(bx - 35, by);
    ctx.quadraticCurveTo(bx - 20, by - 100, bx - 50, by - 160);
    ctx.quadraticCurveTo(bx - 10, by - 190, bx, by - 140);
    ctx.quadraticCurveTo(bx + 40, by - 180, bx + 55, by - 140);
    ctx.quadraticCurveTo(bx + 25, by - 80, bx + 40, by);
    ctx.closePath();
    ctx.fill();

    // Aerial roots hanging down (Rễ phụ cây đa)
    ctx.strokeStyle = '#5c3a2a';
    ctx.lineWidth = 4;
    [ -25, -12, 12, 25 ].forEach((rx) => {
      ctx.beginPath();
      ctx.moveTo(bx + rx, by - 140);
      ctx.quadraticCurveTo(bx + rx * 1.3, by - 60, bx + rx * 1.1, by);
      ctx.stroke();
    });

    // Lush Emerald Celestial Foliage Canopy (Tán lá xanh biếc thần tiên)
    const foliageClusters = [
      { x: bx - 70, y: by - 180, r: 60, col: '#065f46' },
      { x: bx + 70, y: by - 170, r: 58, col: '#065f46' },
      { x: bx, y: by - 210, r: 75, col: '#047857' },
      { x: bx - 40, y: by - 240, r: 55, col: '#059669' },
      { x: bx + 40, y: by - 235, r: 55, col: '#10b981' },
      { x: bx, y: by - 260, r: 45, col: '#34d399' },
    ];

    foliageClusters.forEach((c) => {
      ctx.fillStyle = c.col;
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // Golden celestial fireflies / star leaves
    ctx.fillStyle = '#fde047';
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      const dist = 30 + (i % 5) * 18;
      const lx = bx + Math.cos(angle) * dist;
      const ly = by - 210 + Math.sin(angle) * (dist * 0.7);
      ctx.beginPath();
      ctx.arc(lx, ly, 2 + (i % 3), 0, Math.PI * 2);
      ctx.fill();
    }

    canvas.refresh();
  }

  // Stone Bench (Ghế đá trống không của Chị Hằng)
  private static createBenchTexture(scene: Phaser.Scene): void {
    const canvas = scene.textures.createCanvas('stone_bench', 120, 70);
    if (!canvas) return;
    const ctx = canvas.context;
    ctx.clearRect(0, 0, 120, 70);

    // Bench shadow
    ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
    ctx.beginPath();
    ctx.ellipse(60, 64, 45, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Bench legs
    ctx.fillStyle = '#64748b';
    ctx.fillRect(26, 38, 12, 22);
    ctx.fillRect(82, 38, 12, 22);

    // Bench seat slab
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.roundRect(14, 32, 92, 10, 4);
    ctx.fill();

    // Bench backrest
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.roundRect(18, 14, 84, 16, 4);
    ctx.fill();

    // Delicate Vietnamese lotus engraving on stone
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(60, 22, 6, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.stroke();

    // Faint magical ribbon / cinnamon aroma glow
    const ribbonGrad = ctx.createLinearGradient(30, 20, 90, 20);
    ribbonGrad.addColorStop(0, 'rgba(244, 114, 182, 0)');
    ribbonGrad.addColorStop(0.5, 'rgba(251, 207, 232, 0.4)');
    ribbonGrad.addColorStop(1, 'rgba(244, 114, 182, 0)');
    ctx.fillStyle = ribbonGrad;
    ctx.fillRect(25, 6, 70, 8);

    canvas.refresh();
  }

  // Mắt Tròn (Surveyor 3 NASA lander)
  private static createMatTronTexture(scene: Phaser.Scene): void {
    const canvas = scene.textures.createCanvas('mat_tron', 140, 160);
    if (!canvas) return;
    const ctx = canvas.context;
    ctx.clearRect(0, 0, 140, 160);

    const cx = 70;
    const cy = 110;

    // Shadow
    ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
    ctx.beginPath();
    ctx.ellipse(cx, 148, 48, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tripod Landing Legs (3 chân đỡ bằng kim loại ống với đệm tròn)
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 4;
    // Leg 1 (Left)
    ctx.beginPath();
    ctx.moveTo(cx - 15, cy + 5);
    ctx.lineTo(cx - 52, 146);
    ctx.stroke();
    // Leg 2 (Right)
    ctx.beginPath();
    ctx.moveTo(cx + 15, cy + 5);
    ctx.lineTo(cx + 52, 146);
    ctx.stroke();
    // Leg 3 (Center back)
    ctx.beginPath();
    ctx.moveTo(cx, cy + 5);
    ctx.lineTo(cx, 150);
    ctx.stroke();

    // Foot pads (Đệm chân tròn tránh lún vào cát Mặt Trăng)
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.ellipse(cx - 52, 146, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + 52, 146, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx, 150, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Triangular chassis / main body
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.moveTo(cx - 28, cy + 8);
    ctx.lineTo(cx + 28, cy + 8);
    ctx.lineTo(cx, cy - 25);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Mast (Trụ đỡ đứng)
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 25);
    ctx.lineTo(cx, cy - 70);
    ctx.stroke();

    // Planar Solar Array on top (Tấm pin mặt trời phẳng trên đỉnh)
    ctx.fillStyle = '#1e3a8a';
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 2;
    ctx.fillRect(cx - 24, cy - 82, 48, 12);
    ctx.strokeRect(cx - 24, cy - 82, 48, 12);

    // Mắt Tròn - Television Camera Unit with spherical cute glass eye
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(cx + 12, cy - 45, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Friendly friendly cartoon pupil & shine
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(cx + 14, cy - 45, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx + 11, cy - 48, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 16, cy - 43, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Soil Sampler Scoop Arm (Cánh tay cơ học xúc đất vươn sang trái)
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(cx - 18, cy);
    ctx.lineTo(cx - 40, cy + 18);
    ctx.lineTo(cx - 58, cy + 32);
    ctx.stroke();

    // Scoop bucket (Xẻng xúc đất)
    ctx.fillStyle = '#ca8a04';
    ctx.beginPath();
    ctx.roundRect(cx - 65, cy + 28, 14, 10, 3);
    ctx.fill();

    // Soft moon dust coating on shoulders (Lớp bụi xám phủ như tuyết mỏng)
    ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
    ctx.fillRect(cx - 24, cy - 72, 48, 3);
    ctx.fillRect(cx - 22, cy + 5, 44, 4);

    canvas.refresh();
  }

  // Floating Memory Fragment (Mảnh ký ức phát sáng)
  private static createMemoryFragmentTexture(scene: Phaser.Scene): void {
    const canvas = scene.textures.createCanvas('memory_fragment', 48, 48);
    if (!canvas) return;
    const ctx = canvas.context;
    ctx.clearRect(0, 0, 48, 48);

    const cx = 24;
    const cy = 24;

    // Glowing halo
    const halo = ctx.createRadialGradient(cx, cy, 4, cx, cy, 22);
    halo.addColorStop(0, 'rgba(251, 191, 36, 0.9)');
    halo.addColorStop(0.5, 'rgba(245, 158, 11, 0.4)');
    halo.addColorStop(1, 'rgba(217, 119, 6, 0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(cx, cy, 22, 0, Math.PI * 2);
    ctx.fill();

    // Diamond / parchment memory gem
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.moveTo(cx, cy - 14);
    ctx.lineTo(cx + 12, cy);
    ctx.lineTo(cx, cy + 14);
    ctx.lineTo(cx - 12, cy);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Inner glowing star spark
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();

    canvas.refresh();
  }

  // Moon ground repeating pattern / surface
  private static createMoonGroundTexture(scene: Phaser.Scene): void {
    const canvas = scene.textures.createCanvas('moon_surface', 256, 128);
    if (!canvas) return;
    const ctx = canvas.context;
    ctx.clearRect(0, 0, 256, 128);

    // Deep lunar surface gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 128);
    grad.addColorStop(0, '#475569');
    grad.addColorStop(0.2, '#334155');
    grad.addColorStop(1, '#1e293b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 128);

    // Lunar dust craters / speckles
    ctx.fillStyle = '#1e293b';
    [
      { x: 40, y: 35, r: 16 },
      { x: 120, y: 70, r: 24 },
      { x: 210, y: 45, r: 18 },
      { x: 170, y: 20, r: 10 },
      { x: 80, y: 95, r: 14 }
    ].forEach((c) => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // White dust highlights
    ctx.fillStyle = 'rgba(241, 245, 249, 0.2)';
    for (let i = 0; i < 40; i++) {
      ctx.fillRect((i * 37) % 256, (i * 23) % 128, 2, 2);
    }

    canvas.refresh();
  }

  // Blue Marble Earth in the black starry sky
  private static createEarthInSkyTexture(scene: Phaser.Scene): void {
    const canvas = scene.textures.createCanvas('earth_sky', 96, 96);
    if (!canvas) return;
    const ctx = canvas.context;
    ctx.clearRect(0, 0, 96, 96);

    const cx = 48;
    const cy = 48;

    // Atmospheric cyan glow
    const atm = ctx.createRadialGradient(cx, cy, 32, cx, cy, 47);
    atm.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
    atm.addColorStop(0.8, 'rgba(14, 165, 233, 0.15)');
    atm.addColorStop(1, 'rgba(3, 105, 161, 0)');
    ctx.fillStyle = atm;
    ctx.beginPath();
    ctx.arc(cx, cy, 47, 0, Math.PI * 2);
    ctx.fill();

    // Ocean blue globe
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(cx, cy, 34, 0, Math.PI * 2);
    ctx.fill();

    // Continents (Green/brown patches)
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(cx - 10, cy - 8, 12, 0, Math.PI * 2);
    ctx.arc(cx + 8, cy + 10, 14, 0, Math.PI * 2);
    ctx.arc(cx - 6, cy + 14, 8, 0, Math.PI * 2);
    ctx.fill();

    // Swirling White Clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(cx - 12, cy + 4, 9, 0, Math.PI * 2);
    ctx.arc(cx + 10, cy - 10, 11, 0, Math.PI * 2);
    ctx.arc(cx + 4, cy + 6, 8, 0, Math.PI * 2);
    ctx.fill();

    canvas.refresh();
  }

  // Wooden / Metal Signpost for transition zones
  private static createSignpostTexture(scene: Phaser.Scene): void {
    const canvas = scene.textures.createCanvas('signpost', 80, 80);
    if (!canvas) return;
    const ctx = canvas.context;
    ctx.clearRect(0, 0, 80, 80);

    // Post
    ctx.fillStyle = '#78350f';
    ctx.fillRect(36, 30, 8, 50);

    // Board
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.roundRect(10, 10, 60, 26, 4);
    ctx.fill();
    ctx.strokeStyle = '#fef3c7';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Arrow sign
    ctx.fillStyle = '#fef3c7';
    ctx.beginPath();
    ctx.moveTo(32, 17);
    ctx.lineTo(48, 23);
    ctx.lineTo(32, 29);
    ctx.closePath();
    ctx.fill();

    canvas.refresh();
  }

  // Sparkle particle for footstep and interaction
  private static createSparkleParticle(scene: Phaser.Scene): void {
    const canvas = scene.textures.createCanvas('sparkle_particle', 16, 16);
    if (!canvas) return;
    const ctx = canvas.context;
    ctx.clearRect(0, 0, 16, 16);

    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(8, 8, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(8, 8, 2.5, 0, Math.PI * 2);
    ctx.fill();

    canvas.refresh();
  }
}
