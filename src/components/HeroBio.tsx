'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function HeroBio() {
  return (
    <section className="section-dark relative min-h-[100svh] min-h-[100dvh] h-screen flex flex-col justify-center overflow-hidden w-full max-w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-20 select-none">
      
      {/* Ambient background video with subtle cinematic gradient - 100% full bleed */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-25">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/projects/puma-x-mclaren-aman-studio/Built_for_the_grid_Styled.jpg"
          className="w-full h-full object-cover filter contrast-125 scale-105"
          src="/assets/projects/puma-x-mclaren-aman-studio/preview_15s.mp4"
          onTimeUpdate={(event) => {
            if (event.currentTarget.currentTime >= 15) event.currentTarget.currentTime = 0;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/75 to-[#0A0A0A]/50" />
      </div>

      {/* Subtle luxury ambient glow orb behind typography */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C84B2F]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Ultra-Clean Iconic Hero — Kiki Gede, Rachmat Proporsional & Rapi */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl flex flex-col"
        >
          {/* 1. KIKI (Bigger, Bold & Confident) */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-white font-display font-black uppercase tracking-tighter leading-[0.84] block"
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: 'clamp(4.2rem, 17vw, 12.5rem)',
              wordBreak: 'keep-all',
              overflowWrap: 'normal',
            }}
          >
            Kiki
          </motion.h1>

          {/* 2. RACHMAT (Smaller & Perfectly Proportionate to Fit Any Screen) */}
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 font-display font-black uppercase tracking-tight sm:tracking-tighter leading-[0.9] block mt-1 sm:mt-2"
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: 'clamp(2.1rem, 8.8vw, 6.8rem)',
              wordBreak: 'keep-all',
              overflowWrap: 'normal',
            }}
          >
            Rachmat.
          </motion.span>
        </motion.div>
      </div>

    </section>
  );
}
