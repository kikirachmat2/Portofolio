'use client';

import React, { useEffect, useState } from 'react';
import { Project } from '@/types/portfolio';
import { X, Images, ChevronLeft, ChevronRight, ExternalLink, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoPreviewPopup from './VideoPreviewPopup';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeStillIdx, setActiveStillIdx] = useState<number | null>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeStillIdx !== null) {
          setActiveStillIdx(null);
        } else {
          onClose();
        }
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      // Reset video state when a new project is opened
      setActiveVideoIndex(null);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, activeStillIdx]);

  if (!project) return null;

  const gallery = project.gallery || [];
  const isBrandLogo = project.posterUrl?.includes('logo-brand');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container with Dynamic Viewport Height for Mobile & Tablet */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl max-h-[90dvh] sm:max-h-[88vh] bg-[#0E0E0E] border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col"
      >
        {/* Close Button (Fixed Top-Right with High Z-Index & Safe Tap Target) */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-30 p-2 sm:p-2.5 rounded-full bg-black/80 hover:bg-black text-gray-300 hover:text-white border border-white/15 transition-all backdrop-blur-md shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto overflow-x-hidden p-4 sm:p-7 md:p-8 space-y-6 touch-scroll">
          
          {/* Hero Media Layer: Video Loop, Active Online Video, or Poster */}
          <div className="w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black/80 relative border border-white/10 shadow-inner">
            {project.previewVideoUrl ? (
              <video
                src={project.previewVideoUrl}
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                poster={project.posterUrl}
                onTimeUpdate={(event) => {
                  if (event.currentTarget.currentTime >= 15) event.currentTarget.currentTime = 0;
                }}
                className="w-full h-full object-cover"
              />
            ) : project.posterUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={project.posterUrl}
                alt={project.title}
                className={`w-full h-full ${
                  isBrandLogo
                    ? 'object-contain p-8 sm:p-14 bg-[#141414]'
                    : 'object-cover'
                }`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#161616]">
                <span className="text-gray-500 font-mono text-xs uppercase tracking-widest">
                  {project.title}
                </span>
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className="space-y-5">
            {/* Header: Title + Meta */}
            <div className="border-b border-white/10 pb-5">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#C84B2F]/15 border border-[#C84B2F]/30 text-[#C84B2F] text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase">
                  {project.category}
                </span>
              </div>

              <h2
                className="text-xl sm:text-3xl md:text-4xl font-black font-display text-white uppercase tracking-tight"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                {project.title}
              </h2>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2.5 text-xs font-mono text-gray-400">
                {project.client && (
                  <span>
                    {project.slug === 'insert-reguler' ? 'TV Networks' : 'Client / PH'}: <strong className="text-gray-200">{project.client}</strong>
                  </span>
                )}
                {project.role && (
                  <span>
                    • Role: <strong className="text-[#F0ECE5]">{project.role}</strong>
                  </span>
                )}
              </div>
            </div>

            {/* Synopsis / Description */}
            {project.description && (
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans font-normal">
                {project.description}
              </p>
            )}

            {/* External Video Links CTA Buttons with Live Hover Preview */}
            {project.videos && project.videos.length > 0 ? (
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400 font-bold">
                    WATCH ONLINE ({project.videos.length} LINKS)
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                  {project.videos.map((video, i) => {
                    const ytId = getYouTubeId(video.url);
                    return (
                      <div
                        key={i}
                        className="min-w-0"
                      >
                        {true ? (
                          <button
                            type="button"
                            onClick={() => setActiveVideoIndex(i)}
                            className="w-full inline-flex items-center justify-between gap-2 px-4 py-3 sm:py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md bg-[#C84B2F] hover:bg-[#D85A3F] active:scale-[0.98] text-white shadow-[#C84B2F]/20"
                            aria-label={`Preview ${video.label}`}
                          >
                            <span className="inline-flex min-w-0 items-center gap-2">
                              <Play className="w-3.5 h-3.5 fill-current shrink-0" />
                              <span className="truncate">{video.label}</span>
                            </span>
                            <Play className="w-3 h-3 fill-current opacity-80 shrink-0" />
                          </button>
                        ) : (
                          <a
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-between gap-2 px-4 py-3 sm:py-2.5 rounded-xl bg-[#C84B2F] hover:bg-[#D85A3F] active:scale-[0.98] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shadow-[#C84B2F]/20"
                          >
                            <span className="inline-flex min-w-0 items-center gap-2">
                              <Play className="w-3.5 h-3.5 fill-current shrink-0" />
                              <span className="truncate">{video.label}</span>
                            </span>
                            <ExternalLink className="w-3 h-3 opacity-60 shrink-0" />
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : project.externalUrl ? (
              <div className="space-y-2.5 pt-1">
                <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400 font-bold">
                  WATCH ONLINE
                </p>
                <div>
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 rounded-xl bg-[#C84B2F] hover:bg-[#D85A3F] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Online</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </div>
              </div>
            ) : null}

            {/* Production Stills Gallery (Horizontal Snap Scroll on Touch Devices) */}
            {gallery.length > 0 && (
              <div className="pt-5 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Images className="w-4 h-4 text-[#C84B2F]" />
                    <span className="text-[10px] sm:text-xs font-mono text-gray-300 uppercase tracking-wider font-bold">
                      PRODUCTION STILLS & FRAMES ({gallery.length})
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono hidden sm:inline">
                    Tap to expand
                  </span>
                </div>

                {/* Snap Horizontal Slider */}
                <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory touch-scroll">
                  {gallery.map((imgUrl, i) => (
                    <div
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveStillIdx(i);
                      }}
                      className="snap-start relative h-24 sm:h-32 md:h-36 aspect-[16/10] rounded-xl overflow-hidden cursor-pointer shrink-0 bg-black/90 border border-white/10 hover:border-[#C84B2F] transition-all hover:scale-[1.03] group"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imgUrl}
                        alt={`${project.title} still ${i + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[9px] sm:text-[10px] px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-gray-400 font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

        </div>
      </motion.div>

      {activeVideoIndex !== null && project.videos[activeVideoIndex] && <VideoPreviewPopup videos={project.videos} index={activeVideoIndex} projectTitle={project.title} poster={project.posterUrl} onClose={() => setActiveVideoIndex(null)} onChange={setActiveVideoIndex} />}

      {/* High-Res Gallery Still Lightbox */}
      <AnimatePresence>
        {activeStillIdx !== null && gallery[activeStillIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-lg flex items-center justify-center p-3 sm:p-6 md:p-8"
            onClick={() => setActiveStillIdx(null)}
          >
            <div
              className="relative max-w-5xl w-full bg-[#111] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveStillIdx(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 bg-black/80 hover:bg-black text-white rounded-full transition-colors border border-white/10"
                aria-label="Close image"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Navigation Arrows */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveStillIdx((activeStillIdx - 1 + gallery.length) % gallery.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 bg-black/70 hover:bg-black text-white rounded-full border border-white/10 transition-colors"
                    aria-label="Previous frame"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => setActiveStillIdx((activeStillIdx + 1) % gallery.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 bg-black/70 hover:bg-black text-white rounded-full border border-white/10 transition-colors"
                    aria-label="Next frame"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </>
              )}

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={gallery[activeStillIdx]}
                alt={`${project.title} frame ${activeStillIdx + 1}`}
                className="w-full max-h-[70dvh] sm:max-h-[76vh] object-contain bg-black"
              />

              <div className="p-3.5 sm:p-5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
                <span className="text-white font-bold truncate pr-2">{project.title}</span>
                <span className="shrink-0">Frame {activeStillIdx + 1} / {gallery.length}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
