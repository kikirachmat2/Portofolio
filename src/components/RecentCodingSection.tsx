'use client';

import React, { useState, useEffect } from 'react';
import { fallbackCodingProjects, CodingProject } from '@/data/coding-projects';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecentCodingSection() {
  const [projects, setProjects] = useState<CodingProject[]>(fallbackCodingProjects);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchRepos() {
      try {
        setLoading(true);
        const res = await fetch('https://api.github.com/users/frahmat68-beep/repos?sort=updated&direction=desc&per_page=10');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            // Filter: exclude 'Portofolio' and forks
            const valid = data.filter((r: any) => 
              !r.fork && 
              r.name.toLowerCase() !== 'portofolio' &&
              r.name.toLowerCase() !== 'portfolio'
            );

            // Merge with curated details if descriptions are empty
            const mapped: CodingProject[] = valid.map((r: any) => {
              const fallback = fallbackCodingProjects.find(f => f.name.toLowerCase() === r.name.toLowerCase());
              return {
                name: r.name,
                description: r.description || fallback?.description || 'Repository project by Fikri Mulya Rachmat.',
                language: r.language || fallback?.language || 'Code',
                html_url: r.html_url,
                homepage: r.homepage || fallback?.homepage || null,
                updated_at: r.updated_at,
                tags: fallback?.tags || [r.language || 'Code']
              };
            });

            if (mapped.length > 0) {
              setProjects(mapped.slice(0, 6));
            }
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

          <p className="font-mono text-gray-400 text-xs sm:text-sm max-w-sm sm:text-right">
            Web applications, tools, and digital experiments built alongside production work.
          </p>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group p-6 sm:p-7 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#C84B2F]/40 backdrop-blur-md transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                {/* Project Name */}
                {project.homepage ? (
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block group/link"
                  >
                    <h3 
                      className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-tight group-hover:text-[#C84B2F] transition-colors mb-2.5"
                      style={{ fontFamily: 'var(--font-syne)' }}
                    >
                      {project.name}
                    </h3>
                  </a>
                ) : (
                  <h3 
                    className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-tight group-hover:text-[#C84B2F] transition-colors mb-2.5"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {project.name}
                  </h3>
                )}

                {/* Description */}
                <p 
                  className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-3 mb-6"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {project.description}
                </p>
              </div>

              {/* Bottom Action: Live Demo Only */}
              {project.homepage && (
                <div className="pt-4 border-t border-white/5 select-auto flex items-center justify-end mt-auto">
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-[#C84B2F] hover:text-[#d95d43] uppercase tracking-wider font-semibold transition-colors"
                  >
                    <span>Live App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
