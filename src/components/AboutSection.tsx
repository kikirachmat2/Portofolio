'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section 
      id="about" 
      className="section-dark relative w-full py-16 sm:py-24 md:py-32 overflow-hidden border-t border-white/10 select-none"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#C84B2F]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Portrait Column: Mobile (first), Desktop (left 5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-start"
          >
            <div className="w-48 sm:w-56 lg:w-full max-w-[340px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] shadow-2xl relative">
              {/* Clean image without any text overlays or captions */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/profile/foto-kiki.png"
                alt="Fikri Mulya Rachmat"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </motion.div>

          {/* Bio Text Column: Mobile (second), Desktop (right 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Main Name Heading */}
            <h2
              className="text-white font-display font-black uppercase tracking-tight sm:tracking-tighter leading-[0.95] mb-2 sm:mb-3"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)',
                wordBreak: 'keep-all',
              }}
            >
              Fikri Mulya Rachmat
            </h2>

            {/* Single Tagline & Location Line */}
            <p className="font-mono text-xs sm:text-sm text-gray-400 font-medium mb-6 sm:mb-8">
              Kiki Rachmat · Jakarta, Indonesia
            </p>

            {/* 3 Body Copy Paragraphs */}
            <div 
              className="space-y-4 sm:space-y-5 font-sans text-gray-300 text-sm sm:text-base md:text-[17px] leading-relaxed max-w-2xl"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              <p>
                Fikri Mulya Rachmat, professionally known as Kiki Rachmat. Fresh graduate in Multimedia Engineering Technology with a 3.71 GPA.
              </p>

              <p>
                My focus is production management: leading teams, budgets, and schedules across more than 45 productions as a Line Producer, Unit Production Manager, and Producer, spanning film, series, commercials, and music videos. I&apos;m equally drawn to the creative and technical side of video production itself, not just managing it from behind the scenes.
              </p>

              <p>
                I&apos;m also exploring how AI fits into my workflow, from video production to coding, including this website.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
