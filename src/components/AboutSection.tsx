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
              className="text-white font-display font-black uppercase tracking-tight sm:tracking-tighter leading-[0.95] mb-6 sm:mb-8"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)',
                wordBreak: 'keep-all',
              }}
            >
              Fikri Mulya Rachmat
            </h2>

            {/* 3 Body Copy Paragraphs with Narrative Storytelling & Visual Anchor Highlights */}
            <div 
              className="space-y-4 sm:space-y-5 font-sans text-gray-300 text-sm sm:text-base md:text-[17px] leading-relaxed max-w-2xl"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              <p>
                <span className="text-amber-400 font-semibold">Fikri Mulya Rachmat</span> grew up drawn to sets, scripts, and the quiet chaos of a production day. That pull eventually turned into a path, professionally known today as <span className="text-amber-400 font-semibold">Kiki Rachmat</span>: a fresh graduate in <span className="text-cyan-300 font-medium">Multimedia Engineering Technology</span> with a <span className="text-amber-300 font-mono font-medium">3.71 GPA</span>, who spent the last few years learning how a story actually gets made, not just how it looks on screen.
              </p>

              <p>
                Across more than <span className="text-amber-400 font-semibold">45 productions</span>, spanning short films, series, commercials, and music videos, I&apos;ve worked as a <span className="text-white font-medium">Line Producer</span>, <span className="text-white font-medium">Unit Production Manager</span>, and <span className="text-white font-medium">Producer</span>: the person keeping <span className="text-neutral-100 font-medium">teams</span>, <span className="text-neutral-100 font-medium">budgets</span>, and <span className="text-neutral-100 font-medium">schedules</span> moving so the creative side can focus on the work itself. I care about that structure, but I&apos;m just as pulled toward the craft in front of the camera as the planning behind it.
              </p>

              <p>
                Lately, that curiosity has stretched into <span className="text-cyan-400 font-semibold">AI</span>, exploring how it speeds up a production workflow, and how it let me build this website myself through <span className="text-cyan-400 font-semibold">coding</span>. It&apos;s a new chapter I&apos;m still writing.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
