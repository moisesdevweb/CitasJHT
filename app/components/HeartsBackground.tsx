"use client";

import { useEffect, useRef } from "react";

export default function HeartsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener("resize", resize);
    resize();

    const hearts = Array.from({ length: 25 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 20 + 10,
      speed: Math.random() * 1 + 0.5,
      opacity: Math.random() * 0.5 + 0.3
    }));

    function animate() {
      ctx!.clearRect(0, 0, width, height);
      hearts.forEach(h => {
        h.y -= h.speed;
        if (h.y + h.size < 0) {
          h.y = height + h.size;
          h.x = Math.random() * width;
        }
        ctx!.globalAlpha = h.opacity;
        ctx!.font = `${h.size}px serif`;
        ctx!.fillText("❤️", h.x, h.y);
      });
      requestAnimationFrame(animate);
    }
    
    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}