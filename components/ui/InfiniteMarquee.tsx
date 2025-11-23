"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface InfiniteMarqueeProps {
  text: string;
  baseVelocity?: number;
}

export function InfiniteMarquee({
  text,
  baseVelocity = 1,
}: InfiniteMarqueeProps) {
  const [velocity, setVelocity] = useState(baseVelocity);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const x = useRef(0);
  const directionFactor = useRef(1);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollVelocity = Math.abs(scrollY - (handleScroll as any).lastY || 0);
      (handleScroll as any).lastY = scrollY;

      const newVelocity = baseVelocity + scrollVelocity * 0.05;
      setVelocity(Math.min(newVelocity, baseVelocity * 5));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [baseVelocity]);

  useAnimationFrame((t, delta) => {
    if (!textRef.current) return;

    const moveBy = directionFactor.current * velocity * (delta / 1000) * 100;
    x.current += moveBy;

    const textWidth = textRef.current.offsetWidth / 2;

    if (x.current < -textWidth) {
      x.current = 0;
    } else if (x.current > 0) {
      x.current = -textWidth;
    }

    if (textRef.current) {
      textRef.current.style.transform = `translateX(${x.current}px)`;
    }
  });

  const repeatedText = Array(20).fill(text).join(" • ");

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden py-8 bg-gradient-to-r from-void via-void-light to-void"
    >
      <div
        ref={textRef}
        className="flex whitespace-nowrap font-mono text-6xl md:text-8xl font-bold text-white/10"
      >
        {repeatedText}
      </div>
    </div>
  );
}
