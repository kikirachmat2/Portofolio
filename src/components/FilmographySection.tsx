'use client';

import React, { useState, useMemo } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { FilmographyEntry } from '@/types/portfolio';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ITEMS_PER_PAGE = 10;

const CATEGORIES = [
  { id: 'ALL', label: 'All Works' },
  { id: 'FILM', label: 'Films', types: ['Short Film', 'Feature Film'] },
  { id: 'SERIES', label: 'Series', types: ['Series', 'Mini Series'] },
  { id: 'INFOTAINMENT', label: 'Infotainment', types: ['Infotainment'] },
  { id: 'COMMERCIAL', label: 'Commercial & MVs', types: ['Commercial', 'Campaign', 'Music Video', 'Company Profile'] },
];

export default function FilmographySection() {
  const { data } = usePortfolio();
  const { filmography } = data;

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  // Filtering Logic
  const filtered = useMemo(() => {
    return filmography.filter(item => {
      // 1. Search Query
      const matchSearch =
        search === '' ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.productionHouse.toLowerCase().includes(search.toLowerCase()) ||
        item.role.toLowerCase().includes(search.toLowerCase()) ||
        item.type.toLowerCase().includes(search.toLowerCase());

      // 2. Category Filter
      let matchCat = true;
      if (activeCategory !== 'ALL') {
        const cat = CATEGORIES.find(c => c.id === activeCategory);
        if (cat && cat.types) {
          matchCat = cat.types.includes(item.type);
        }
      }

      return matchSearch && matchCat;
    });
  }, [filmography, search, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  // Paginated slice
  const paginatedItems = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, safePage]);

  const goToPage = (page: number) => {
    if (page === safePage) return;
    setSlideDirection(page > safePage ? 'right' : 'left');
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (safePage < totalPages) {
      setSlideDirection('right');
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (safePage > 1) {
      setSlideDirection('left');
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  // Slide Animation Variants
  const slideVariants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? 35 : -35,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? -35 : 35,
      opacity: 0,
    }),
  };

  return (
    <section className="section-light w-full py-16 sm:py-24 md:py-32 border-t border-black/10 overflow-hidden" id="filmography">
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
              className="text-ink font-display font-black uppercase leading-none tracking-tight sm:tracking-tighter"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(2.2rem, 7.5vw, 5.5rem)',
                wordBreak: 'keep-all',
                overflowWrap: 'normal',
              }}
            >
              Archive
            </h2>
          </div>

          <p className="font-mono text-inkLight text-xs sm:text-sm shrink-0">
            <strong className="text-ink font-bold">{filtered.length}</strong> PRODUCTIONS ARCHIVED
          </p>
        </motion.div>

        {/* Controls: Category Tabs & Search (Touch Swipe Safe) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 sm:mb-8"
        >
          {/* Category Tabs with safe mobile padding */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1.5 -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                onClick={() => handleCategoryChange(c.id)}
                className={`px-4 py-2 text-xs font-mono font-medium rounded-full transition-all whitespace-nowrap border shrink-0 ${
                  activeCategory === c.id
                    ? 'bg-ink text-[#F0ECE5] border-ink shadow-sm'
                    : 'bg-white/80 text-inkLight border-black/10 hover:border-black/30 hover:text-ink'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-inkLight pointer-events-none" />
            <input
              type="text"
              placeholder="Search title, PH, or role..."
              value={search}
              onChange={e => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-black/10 rounded-full text-ink placeholder-inkLight/60 text-xs focus:outline-none focus:border-[#C84B2F] transition-all font-mono shadow-sm"
            />
            {search && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-inkLight hover:text-ink px-1.5 py-0.5 rounded bg-black/5"
              >
                ✕
              </button>
            )}
          </div>
        </motion.div>

        {/* ─── SLIDING DECK OF 10 ITEMS (Desktop Table & Mobile Cards) ─── */}
        <div className="relative min-h-[500px] sm:min-h-[560px] flex flex-col justify-between">
          <AnimatePresence mode="wait" custom={slideDirection}>
            <motion.div
              key={`${activeCategory}-${safePage}-${search}`}
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {/* 1. Desktop & Tablet Table Layout */}
              <div className="hidden md:block bg-white rounded-3xl border border-black/10 overflow-hidden shadow-sm">
                <div className="flex items-center px-6 py-4 bg-black/[0.03] border-b border-black/10 text-[10px] font-mono uppercase tracking-widest text-inkLight font-bold">
                  <div className="w-12">#</div>
                  <div className="flex-1 pr-4">PROJECT TITLE</div>
                  <div className="w-48 pr-4">ROLE</div>
                  <div className="w-56 pr-4">PRODUCTION HOUSE / CLIENT</div>
                  <div className="w-32 text-right">TYPE</div>
                </div>

                <div className="divide-y divide-black/5">
                  {paginatedItems.map((item, idx) => {
                    const globalIdx = (safePage - 1) * ITEMS_PER_PAGE + idx + 1;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center px-6 py-3.5 hover:bg-black/[0.025] transition-colors group relative"
                      >
                        {/* Hover Left Accent Line */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C84B2F] opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Number */}
                        <div className="w-12 text-xs font-mono text-inkLight/60 group-hover:text-ink">
                          {String(globalIdx).padStart(2, '0')}
                        </div>

                        {/* Title */}
                        <div className="flex-1 pr-4 min-w-0">
                          <h4
                            className="font-bold text-sm lg:text-base uppercase text-ink group-hover:text-[#C84B2F] transition-colors truncate"
                            style={{ fontFamily: 'var(--font-syne)' }}
                          >
                            {item.title}
                          </h4>
                        </div>

                        {/* Role */}
                        <div className="w-48 pr-4 truncate font-mono text-xs text-ink font-semibold">
                          {item.role}
                        </div>

                        {/* PH / Client */}
                        <div className="w-56 pr-4 truncate font-mono text-xs text-inkLight">
                          {item.productionHouse}
                        </div>

                        {/* Type */}
                        <div className="w-32 text-right">
                          <span className="inline-block px-2.5 py-1 rounded-full bg-black/5 text-[10px] font-mono font-medium text-inkLight uppercase tracking-wider">
                            {item.type}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {paginatedItems.length === 0 && (
                    <div className="py-16 text-center text-inkLight font-mono text-xs">
                      No productions found matching &ldquo;{search}&rdquo;.
                    </div>
                  )}
                </div>
              </div>

              {/* 2. Mobile Adaptive Cards Layout */}
              <div className="block md:hidden space-y-2.5 w-full">
                {paginatedItems.map((item, idx) => {
                  const globalIdx = (safePage - 1) * ITEMS_PER_PAGE + idx + 1;
                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white border border-black/10 shadow-sm space-y-2 w-full min-w-0"
                    >
                      <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                        <span className="text-inkLight/70 font-bold">
                          #{String(globalIdx).padStart(2, '0')}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-black/5 text-[9px] uppercase tracking-wider text-inkLight font-medium">
                          {item.type}
                        </span>
                      </div>

                      <h4
                        className="font-bold text-sm sm:text-base uppercase text-ink leading-snug break-words"
                        style={{ fontFamily: 'var(--font-syne)' }}
                      >
                        {item.title}
                      </h4>

                      <div className="pt-2 border-t border-black/5 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-ink font-semibold truncate pr-2">
                          {item.role}
                        </span>
                        <span className="text-inkLight shrink-0 text-right">
                          {item.productionHouse}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {paginatedItems.length === 0 && (
                  <div className="py-12 text-center text-inkLight font-mono text-xs bg-white rounded-2xl border border-black/10">
                    No productions found.
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ─── SLICK PAGINATION CONTROLS ─── */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              className="mt-8 pt-6 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs"
            >
              <span className="text-inkLight text-[11px] sm:text-xs order-2 sm:order-1 text-center sm:text-left">
                Showing {paginatedItems.length} of {filtered.length} items (Page {safePage} of {totalPages})
              </span>

              {/* Page Number Selector & Prev/Next */}
              <div className="flex items-center gap-1.5 self-center sm:self-auto order-1 sm:order-2">
                <button
                  onClick={prevPage}
                  disabled={safePage <= 1}
                  className="px-3 py-1.5 rounded-xl border border-black/10 bg-white text-ink disabled:opacity-30 disabled:pointer-events-none hover:border-black/30 transition-all flex items-center gap-1 font-bold text-xs"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">PREV</span>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`w-8 h-8 rounded-xl font-bold text-xs transition-all flex items-center justify-center border ${
                      p === safePage
                        ? 'bg-ink text-[#F0ECE5] border-ink shadow-sm'
                        : 'bg-white text-inkLight border-black/10 hover:border-black/30 hover:text-ink'
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={nextPage}
                  disabled={safePage >= totalPages}
                  className="px-3 py-1.5 rounded-xl border border-black/10 bg-white text-ink disabled:opacity-30 disabled:pointer-events-none hover:border-black/30 transition-all flex items-center gap-1 font-bold text-xs"
                >
                  <span className="hidden sm:inline">NEXT</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
