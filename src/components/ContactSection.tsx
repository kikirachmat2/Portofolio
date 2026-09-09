'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const { data } = usePortfolio();
  const { profile } = data;

  return (
    <footer className="w-full relative bg-[#0A0A0A] text-[#F0ECE5] overflow-hidden" id="contact">
      {/* Cinematic ambient video horizon */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/projects/puma-x-mclaren-aman-studio/Built_for_the_grid_Styled.jpg"
          className="w-full h-full object-cover filter contrast-125 scale-105"
          src="/assets/projects/puma-x-mclaren-aman-studio/preview_15s.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]/60" />
      </div>

      {/* Ambient glowing radial orb in the footer */}
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#C84B2F]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 md:pt-32 pb-12 sm:pb-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="pb-12 sm:pb-16 border-b border-white/10"
        >
          <div className="flex flex-col mb-8 sm:mb-12 select-none">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-white font-display font-black uppercase tracking-tighter leading-[0.84] block"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(3.8rem, 13vw, 10rem)',
                wordBreak: 'keep-all',
                overflowWrap: 'normal',
              }}
            >
              Kiki
            </motion.h2>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 font-display font-black uppercase tracking-tight sm:tracking-tighter leading-[0.9] block mt-1 sm:mt-2"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(2rem, 7vw, 5.5rem)',
                wordBreak: 'keep-all',
                overflowWrap: 'normal',
              }}
            >
              Rachmat.
            </motion.span>
          </div>

          {/* Understated, Clean Text Links (Email and Instagram) */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 font-mono text-xs sm:text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 uppercase tracking-widest text-[10px]">Email</span>
              <a
                href={`mailto:${profile.contact.email}`}
                className="text-gray-200 hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                {profile.contact.email}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-600 uppercase tracking-widest text-[10px]">Instagram</span>
              <a
                href={profile.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                @kikiirch
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom Minimal Copyright & Location */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="pt-6 sm:pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] sm:text-xs font-mono text-gray-500"
        >
          <div>
            © {new Date().getFullYear()} Kiki Rachmat. All Rights Reserved.
          </div>
          <div>
            Jakarta, Indonesia
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
