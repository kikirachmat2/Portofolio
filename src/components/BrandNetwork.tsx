'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { motion } from 'framer-motion';

export default function BrandNetwork() {
  const { data } = usePortfolio();
  const { logos } = data;

  if (!logos || logos.length === 0) return null;

  const phLogos = logos.filter(l => l.category === 'ph');
  const brandLogos = logos.filter(l => l.category === 'brand');
  const tvLogos = logos.filter(l => l.category === 'tv');

  return (
    <section className="section-light w-full py-16 sm:py-24 md:py-32 border-t border-black/10 overflow-hidden" id="network">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header with Bi-Directional Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14 border-b border-black/10 pb-8"
        >
          <div>
            <h2
              className="text-ink font-display font-black uppercase leading-none"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(2.4rem, 6.5vw, 5.5rem)',
                letterSpacing: '-0.03em',
              }}
            >
              Networks, Studios & Brands
            </h2>
          </div>
          <p className="font-mono text-inkLight text-xs sm:text-sm">
            <strong className="text-ink font-bold">{logos.length}</strong> PARTNERS
          </p>
        </motion.div>

        {/* 1. Television Networks (Dedicated Section for Broadcast Giants) */}
        {tvLogos.length > 0 && (
          <div className="mb-10 sm:mb-14">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-inkLight font-semibold mb-4 sm:mb-6 flex items-center gap-2"
            >
              <span>Television Networks & Broadcast</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C84B2F]" />
            </motion.p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 w-full">
              {tvLogos.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.94, y: 16 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.4, delay: Math.min((idx % 6) * 0.05, 0.2) }}
                  className="group relative flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-white border border-[#C84B2F]/20 hover:border-[#C84B2F]/60 hover:shadow-lg transition-all duration-300 min-h-[95px] sm:min-h-[120px]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.logoUrl}
                    alt={item.name}
                    loading="lazy"
                    className="max-h-8 sm:max-h-14 max-w-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                  <span className="mt-2 text-[10px] sm:text-[11px] font-mono text-ink font-semibold tracking-tight text-center line-clamp-1">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Production Houses Grid with Staggered Bi-Directional Animation */}
        <div className="mb-10 sm:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-inkLight font-semibold mb-4 sm:mb-6"
          >
            Production Houses
          </motion.p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 w-full">
            {phLogos.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.4, delay: Math.min((idx % 6) * 0.05, 0.2) }}
                className="group relative flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-white border border-black/10 hover:border-black/30 hover:shadow-md transition-all duration-300 min-h-[85px] sm:min-h-[110px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.logoUrl}
                  alt={item.name}
                  loading="lazy"
                  className="max-h-7 sm:max-h-12 max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
                <span className="mt-2 text-[9px] sm:text-[10px] font-mono text-inkLight group-hover:text-ink font-medium tracking-tight text-center line-clamp-1">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3. Commercial Brands Grid with Staggered Bi-Directional Animation */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-inkLight font-semibold mb-4 sm:mb-6"
          >
            Brands & Clients
          </motion.p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 w-full">
            {brandLogos.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.4, delay: Math.min((idx % 6) * 0.05, 0.2) }}
                className="group relative flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-white border border-black/10 hover:border-black/30 hover:shadow-md transition-all duration-300 min-h-[85px] sm:min-h-[110px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.logoUrl}
                  alt={item.name}
                  loading="lazy"
                  className="max-h-7 sm:max-h-12 max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
                <span className="mt-2 text-[9px] sm:text-[10px] font-mono text-inkLight group-hover:text-ink font-medium tracking-tight text-center line-clamp-1">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
