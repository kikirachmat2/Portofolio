'use client';

import React, { useState, useEffect } from 'react';
import { fallbackCodingProjects, CodingProject } from '@/data/coding-projects';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PAGE_SIZE = 6;

export default function RecentCodingSection() {
  const [projects, setProjects] = useState<CodingProject[]>(fallbackCodingProjects);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    async function fetchRepos() {
      try {
        setLoading(true);
        const res = await fetch('/api/repos');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProjects(data);
          }
        }
      } catch (_) {
        // Fallback to curated projects seamlessly
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  const totalPages = Math.ceil(projects.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleProjects = projects.slice(startIndex, startIndex + PAGE_SIZE);

  const paginate = (newDirection: number) => {
    const nextPage = currentPage + newDirection;
    if (nextPage >= 1 && nextPage <= totalPages) {
      setDirection(newDirection);
      setCurrentPage(nextPage);
    }
  };

  return (
    <section 
      id="coding" 
      className="section-dark relative w-full py-20 sm:py-28 md:py-32 overflow-hidden border-t border-white/10 select-none"
    >
      {/* Ambient background glow */}
      <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-[#C84B2F]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14 border-b border-white/10 pb-6 sm:pb-8"
        >
          <div>
            <h2
              className="text-white font-display font-black uppercase leading-none tracking-tight sm:tracking-tighter"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(2.2rem, 6.5vw, 4.5rem)',
                wordBreak: 'keep-all',
              }}
            >
              Recent Code
            </h2>
          </div>

          <div className="flex flex-col sm:items-end gap-3">
            <p className="font-mono text-gray-400 text-xs sm:text-sm max-w-sm sm:text-right">
              Web applications, tools, and digital experiments built alongside production work.
            </p>

            {/* Archive Horizontal Controls (if > 6 projects) */}
            {totalPages > 1 && (
              <div className="flex items-center gap-2 pt-1 font-mono text-xs text-gray-400">
                <span className="text-gray-500 uppercase tracking-widest text-[11px] mr-1">
                  Archive {String(currentPage).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  onClick={() => paginate(-1)}
                  disabled={currentPage === 1}
                  aria-label="Previous archive page"
                  className="p-1.5 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.1] hover:text-white disabled:opacity-25 disabled:cursor-not-allowed text-gray-300 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => paginate(1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next archive page"
                  className="p-1.5 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.1] hover:text-white disabled:opacity-25 disabled:cursor-not-allowed text-gray-300 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Project Cards Grid with Sideways Archive Transition */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
            >
              {visibleProjects.map((project, idx) => (
                <div
                  key={project.name}
                  className="group p-6 sm:p-7 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#C84B2F]/40 backdrop-blur-md transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1"
                >
                  <div>
                    {/* Top Row: Project Name & GitHub Icon */}
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      {project.homepage ? (
                        <a
                          href={project.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block group/link"
                        >
                          <h3 
                            className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-tight group-hover:text-[#C84B2F] transition-colors"
                            style={{ fontFamily: 'var(--font-syne)' }}
                          >
                            {project.name}
                          </h3>
                        </a>
                      ) : (
                        <h3 
                          className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-tight group-hover:text-[#C84B2F] transition-colors"
                          style={{ fontFamily: 'var(--font-syne)' }}
                        >
                          {project.name}
                        </h3>
                      )}

                      <a
                        href={project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.name} repository`}
                        className="text-gray-400 hover:text-white transition-colors p-1 flex-shrink-0"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>

                    {/* Description */}
                    <p 
                      className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-3 mb-6"
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom Actions: Source Code & Live App */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5 select-auto mt-auto">
                    <a
                      href={project.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-gray-300 hover:text-white uppercase tracking-wider font-semibold transition-colors"
                    >
                      <span>Source Code</span>
                      <ExternalLink className="w-3 h-3 text-[#C84B2F]" />
                    </a>

                    {project.homepage && (
                      <a
                        href={project.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-[#C84B2F] hover:text-[#d95d43] uppercase tracking-wider font-semibold transition-colors ml-auto"
                      >
                        <span>Live App</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Archive Pagination Footer (if > 6 projects) */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 sm:mt-12 pt-6 border-t border-white/10 font-mono text-xs">
            <div className="text-gray-500 text-[11px] uppercase tracking-wider">
              Showing {startIndex + 1}–{Math.min(startIndex + PAGE_SIZE, projects.length)} of {projects.length} Repositories
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => paginate(-1)}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:text-white text-gray-300 disabled:opacity-25 disabled:cursor-not-allowed uppercase tracking-wider text-[11px] font-semibold transition-all cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              <span className="text-white font-semibold text-xs px-2">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                onClick={() => paginate(1)}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:text-white text-gray-300 disabled:opacity-25 disabled:cursor-not-allowed uppercase tracking-wider text-[11px] font-semibold transition-all cursor-pointer"
              >
                <span>Next Archive</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
