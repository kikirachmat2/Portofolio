'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section 
      id="about" 
      className="section-dark relative w-full py-20 sm:py-28 md:py-36 overflow-hidden border-t border-white/10 select-none"
    >
      {/* Subtle ambient lighting orb */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-[#C84B2F]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Section Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-12"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#C84B2F] font-semibold">
            // Profile &amp; Statement
          </span>
        </motion.div>

        {/* 1. Name & Professional Alias Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-14 pb-8 sm:pb-10 border-b border-white/10"
        >
          <h2
            className="text-white font-display font-black uppercase tracking-tight sm:tracking-tighter leading-[0.95]"
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: 'clamp(2.5rem, 7.2vw, 5.8rem)',
              wordBreak: 'keep-all',
            }}
          >
            Fikri Mulya Rachmat
          </h2>

          <div className="mt-3 sm:mt-4 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[#C84B2F]" />
            <span className="font-mono text-xs sm:text-sm uppercase tracking-wider text-gray-400 font-medium">
              Known professionally as <span className="text-white font-semibold">Kiki Rachmat</span>
            </span>
          </div>
        </motion.div>

        {/* 2. Grid: Body Copy + Editorial Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left: 3 Structured Paragraphs (~65-75 chars measure) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 sm:space-y-8 font-sans text-gray-300 text-base sm:text-lg md:text-[19px] leading-relaxed md:leading-[1.8]"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {/* Paragraph 1 */}
            <p>
              Fikri Mulya Rachmat, dikenal secara profesional sebagai Kiki Rachmat. Fresh graduate{' '}
              <strong className="text-white font-semibold">Teknologi Rekayasa Multimedia</strong> dengan{' '}
              <span className="text-[#C84B2F] font-mono font-bold tracking-tight">IPK 3,71/4,00</span>.
            </p>

            {/* Paragraph 2 */}
            <p>
              Fokus dan minat utama saya ada di{' '}
              <strong className="text-white font-semibold">production management</strong> — mengelola tim, budget, dan jadwal produksi agar sebuah project berjalan efisien dari perencanaan sampai eksekusi. Ini saya asah lewat pengalaman sebagai{' '}
              <span className="text-white font-medium">Line Producer, Unit Production Manager, dan Producer</span> di{' '}
              <strong className="text-[#C84B2F] font-semibold">lebih dari 45 produksi</strong> film, series, iklan, dan music video, berkolaborasi dengan berbagai production house dan brand di bawah tekanan deadline yang ketat. Di luar peran manajerial itu, saya juga punya minat yang sama besarnya di proses video production itu sendiri — bukan cuma mengelola dari belakang layar, tapi juga terlibat langsung memahami proses kreatif dan teknis di lapangan.
            </p>

            {/* Paragraph 3 */}
            <p>
              Belakangan saya juga aktif eksplorasi{' '}
              <strong className="text-white font-semibold">pemanfaatan AI</strong> dalam cara kerja saya — baik di sisi video production (workflow AI-assisted untuk pra-produksi/editing) maupun di sisi coding, termasuk website portofolio ini sendiri yang saya bangun dengan bantuan AI. Kombinasi antara kepekaan manajerial, produksi visual, dan{' '}
              <strong className="text-white font-semibold">literasi teknis</strong> ini yang terus saya kembangkan.
            </p>
          </motion.div>

          {/* Right: Natural Cinematic Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full max-w-sm mx-auto lg:max-w-none"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-2xl group">
              {/* Subtle top and bottom gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 z-10 pointer-events-none" />

              {/* Photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/profile/foto-kiki.png"
                alt="Fikri Mulya Rachmat (Kiki Rachmat)"
                className="w-full h-auto aspect-[4/5] object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 ease-out"
              />

              {/* Minimal caption plate */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-20 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider">
                <span className="text-gray-300 font-medium">Fikri M. Rachmat</span>
                <span className="text-[#C84B2F] font-semibold">Jakarta, ID</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
