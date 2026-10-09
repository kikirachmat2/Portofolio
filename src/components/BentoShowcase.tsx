'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Project } from '@/types/portfolio';
import ProjectModal from './ProjectModal';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES: { id: string; label: string; filterTypes?: string[] }[] = [
  { id: 'all', label: 'All Works' },
  { id: 'films', label: 'Films', filterTypes: ['Feature Film', 'Short Film'] },
  { id: 'Series', label: 'Series', filterTypes: ['Series'] },
  { id: 'Infotainment', label: 'Infotainment', filterTypes: ['Infotainment'] },
  { id: 'Commercial', label: 'Commercial', filterTypes: ['Commercial'] },
  { id: 'Music Video', label: 'Music Videos', filterTypes: ['Music Video'] },
];

function ProjectCard({ project, idx, isHero, onOpenModal }: {
  project: Project;
  idx: number;
  isHero?: boolean;
  onOpenModal: (p: Project) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {});

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: '100px 0px', threshold: 0.05 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const isBrandLogo = project.posterUrl?.includes('logo-brand');

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.55, delay: Math.min((idx % 3) * 0.08, 0.2), ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onOpenModal(project)}
      className={`project-card group cursor-pointer flex flex-col w-full min-w-0 ${
        isHero ? 'sm:col-span-2 lg:col-span-2' : 'col-span-1'
      }`}
    >
      {/* Living Video / Visual Cover Container with Fluid Adaptive Aspect Ratios */}
      <div className={`overflow-hidden bg-[#0F0F0F] relative w-full ${
        isHero
          ? 'aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/9]'
          : 'aspect-[16/10] sm:aspect-[16/10] lg:aspect-[16/10]'
      } rounded-2xl sm:rounded-3xl border border-black/10 shadow-sm group-hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.015]`}>

        {project.previewVideoUrl ? (
          <div className="w-full h-full relative">
            {/* Instant Poster Layer */}
            {project.posterUrl && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={project.posterUrl}
                alt={project.title}
                loading={idx < 4 ? "eager" : "lazy"}
                decoding="async"
                className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-105 ${
                  isVideoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              />
            )}
            
            {/* Ultra-Fast Streamed Video Loop */}
            <video
              ref={videoRef}
              src={shouldLoadVideo ? project.previewVideoUrl : undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={project.posterUrl}
              onCanPlay={() => setIsVideoLoaded(true)}
              onPlaying={() => setIsVideoLoaded(true)}
              onTimeUpdate={(event) => {
                if (event.currentTarget.currentTime >= 15) event.currentTarget.currentTime = 0;
              }}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        ) : project.posterUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={project.posterUrl}
            alt={project.title}
            loading={idx < 4 ? "eager" : "lazy"}
            decoding="async"
            className={`w-full h-full ${
              isBrandLogo
                ? 'object-contain p-8 sm:p-14 bg-[#121212]'
                : 'object-cover object-center filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100'
            } transition-all duration-700 ease-out group-hover:scale-105`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#161616] p-6 text-center">
            <span className="text-gray-500 font-mono text-xs uppercase tracking-widest">
              {project.title}
            </span>
          </div>
        )}

        {/* Luxury Vignette & Interactive Editorial Glass Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-7 pointer-events-none">
          
          {/* Top Row: Category Pill & Overview Action */}
          <div className="flex items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[9px] sm:text-[10px] font-mono text-white/95 uppercase tracking-widest font-bold border border-white/15 shadow-md">
              {project.category}
            </span>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C84B2F] text-white text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider shadow-xl transform translate-x-2 group-hover:translate-x-0 transition-transform duration-300">
              <span>Explore</span>
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>

          {/* Bottom Title & Client details */}
          <div className="space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <h3
              className="text-white font-bold text-base sm:text-2xl uppercase tracking-tight line-clamp-2"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {project.title}
            </h3>
            {project.client && (
              <p className="text-gray-300 text-xs font-mono line-clamp-1">
                {project.client} {project.role && `• ${project.role}`}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Clean Metadata below card (Always Visible & Accessible on Mobile/Touch) */}
      <div className="mt-3.5 flex items-baseline justify-between gap-2 px-1 w-full min-w-0">
        <div className="min-w-0 flex-1">
          <h3
            className="font-bold text-sm sm:text-base md:text-lg uppercase text-ink group-hover:text-[#C84B2F] transition-colors truncate"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {project.title}
          </h3>
          <p className="text-xs font-mono text-inkLight truncate mt-0.5">
            {project.client || project.role}
          </p>
        </div>
        <span className="font-mono text-inkLight text-[10px] sm:text-[11px] font-bold shrink-0 uppercase tracking-wider px-2 py-0.5 rounded bg-black/5">
          {project.category}
        </span>
      </div>
    </motion.div>
  );
}

export default function BentoShowcase() {
  const { data } = usePortfolio();
  const { projects } = data;

  const [activeCat, setActiveCat] = useState('all');
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = projects.filter(p => {
    if (activeCat === 'all') return true;
    const catObj = CATEGORIES.find(c => c.id === activeCat);
    if (catObj && catObj.filterTypes) {
      return catObj.filterTypes.includes(p.category);
    }
    return p.category === activeCat;
  });

  return (
    <section className="section-light w-full py-16 sm:py-24 md:py-32 overflow-hidden border-t border-black/10" id="works">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Section Header with Bi-Directional Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12 border-b border-black/10 pb-6 sm:pb-8"
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
              Selected Works
            </h2>
          </div>

          <p className="font-mono text-inkLight text-xs sm:text-sm">
            <strong className="text-ink font-bold">{projects.length}</strong> CURATED PRODUCTIONS
          </p>
        </motion.div>

        {/* Minimal Category Filter Tabs with Touch-Safe Horizontal Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1.5 -mx-4 px-4 sm:mx-0 sm:px-0 mb-8 sm:mb-12"
        >
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={`px-4 py-2 text-xs font-mono font-medium rounded-full transition-all whitespace-nowrap border shrink-0 ${
                activeCat === c.id
                  ? 'bg-ink text-[#F0ECE5] border-ink shadow-sm'
                  : 'bg-white/80 text-inkLight border-black/10 hover:border-black/30 hover:text-ink'
              }`}
            >
              {c.label}
            </button>
          ))}
        </motion.div>

        {/* Bento Grid Layout (Hero Card + Grid Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 w-full">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <ProjectCard
                key={project.slug}
                project={project}
                idx={idx}
                isHero={idx === 0 && activeCat === 'all'}
                onOpenModal={setSelected}
              />
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Overview Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
