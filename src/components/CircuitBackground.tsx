"use client";

import { useEffect, useRef } from "react";

interface Segment { x1: number; y1: number; x2: number; y2: number; }
interface Particle { segIndex: number; progress: number; speed: number; }

function generateTraces(w: number, h: number): Segment[] {
  const segments: Segment[] = [];

  // All possible directions: H, V, and 4 diagonals
  const directions = [
    (x: number, y: number, len: number) => [x + len, y],       // right
    (x: number, y: number, len: number) => [x - len, y],       // left
    (x: number, y: number, len: number) => [x, y + len],       // down
    (x: number, y: number, len: number) => [x, y - len],       // up
    (x: number, y: number, len: number) => [x + len, y + len], // SE diagonal
    (x: number, y: number, len: number) => [x - len, y + len], // SW diagonal
    (x: number, y: number, len: number) => [x + len, y - len], // NE diagonal
    (x: number, y: number, len: number) => [x - len, y - len], // NW diagonal
  ];

  for (let t = 0; t < 18; t++) {
    let x = Math.floor(Math.random() * w);
    let y = Math.floor(Math.random() * h);

    for (let step = 0; step < 6; step++) {
      const len = 60 + Math.floor(Math.random() * 160);
      const dir = directions[Math.floor(Math.random() * directions.length)];
      let [nx, ny] = dir(x, y, len);

      nx = Math.min(Math.max(nx, 0), w);
      ny = Math.min(Math.max(ny, 0), h);

      segments.push({ x1: x, y1: y, x2: nx, y2: ny });
      x = nx; y = ny;
    }
  }
  return segments;
}

export default function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const traces = generateTraces(canvas.width, canvas.height);
    const particles: Particle[] = [];

    const spawn = () => {
      particles.push({
        segIndex: Math.floor(Math.random() * traces.length),
        progress: 0,
        speed: 0.003 + Math.random() * 0.007,
      });
    };

    for (let i = 0; i < 15; i++) spawn();

    let animFrame: number;
    let lastSpawn = 0;

    const draw = (ts: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Base traces
      ctx.strokeStyle = "rgba(99,102,241,0.12)";
      ctx.lineWidth = 1.5;
      traces.forEach(s => {
        ctx.beginPath();
        ctx.moveTo(s.x1, s.y1);
        ctx.lineTo(s.x2, s.y2);
        ctx.stroke();
      });

      // Junction dots at segment endpoints
      traces.forEach(s => {
        [{ x: s.x1, y: s.y1 }, { x: s.x2, y: s.y2 }].forEach(({ x, y }) => {
          ctx.beginPath();
          ctx.arc(x, y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(129,140,248,0.3)";
          ctx.fill();
        });
      });

      // Traveling particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.progress += p.speed;
        if (p.progress >= 1) { particles.splice(i, 1); continue; }

        const s = traces[p.segIndex];
        const x = s.x1 + (s.x2 - s.x1) * p.progress;
        const y = s.y1 + (s.y2 - s.y1) * p.progress;

        ctx.shadowBlur = 20;
        ctx.shadowColor = "#818cf8";
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#c7d2fe";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (ts - lastSpawn > 200 && particles.length < 30) { spawn(); lastSpawn = ts; }
      animFrame = requestAnimationFrame(draw);
    };

    animFrame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}