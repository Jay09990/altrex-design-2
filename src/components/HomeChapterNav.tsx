import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { HOME_CHAPTERS } from "@/data/homeChapters";

const HOME_CHAPTER_IDS = HOME_CHAPTERS.map((chapter) => chapter.id);

const scrollToChapter = (chapterId: string) => {
  const target = document.getElementById(chapterId);

  if (!target) return;

  const lenis = (window as any).lenis as
    | {
        scrollTo: (
          node: Element,
          options?: { offset?: number; duration?: number },
        ) => void;
      }
    | undefined;

  if (lenis?.scrollTo) {
    lenis.scrollTo(target, {
      offset: -96,
      duration: 1.1,
    });

    return;
  }

  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const HomeChapterNav = () => {
  const [activeChapter, setActiveChapter] = useState(HOME_CHAPTER_IDS[0]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const sections = HOME_CHAPTER_IDS.map((chapterId) =>
      document.getElementById(chapterId),
    ).filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    let rafId = 0;

    const updateActiveChapter = () => {
      const marker = window.innerHeight * 0.34;

      let bestChapter = sections[0].id;
      let bestTop = Number.NEGATIVE_INFINITY;

      for (const section of sections) {
        const top = section.getBoundingClientRect().top;

        if (top <= marker && top > bestTop) {
          bestTop = top;
          bestChapter = section.id;
        }
      }

      if (bestTop === Number.NEGATIVE_INFINITY) {
        bestChapter = sections[0].id;
      }

      setActiveChapter(bestChapter);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateActiveChapter);
    };

    updateActiveChapter();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <aside className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <AnimatePresence mode="wait" initial={false}>
        {isCollapsed ? (
          <motion.button
            key="collapsed"
            type="button"
            onClick={() => setIsCollapsed(false)}
            initial={{ opacity: 0, x: 20, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="flex items-center gap-2 rounded-full border border-black/[0.08] bg-[var(--bg-surface)]/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-primary)] shadow-[0_24px_80px_rgba(0,0,0,0.12)]"
          >
            <ChevronLeft className="h-3.5 w-3.5 text-[var(--text-muted)]" />
            Chapters
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, x: 20, width: 0 }}
            animate={{ opacity: 1, x: 0, width: 252 }}
            exit={{ opacity: 0, x: 20, width: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="overflow-hidden rounded-[28px] border border-black/[0.08] bg-[var(--bg-surface)]/70 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.12)]"
          >
            <div className="mb-3 flex items-center justify-between px-2 pt-1">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
                Chapters
              </div>

              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                className="rounded-full border border-black/[0.08] bg-black/[0.04] p-1 text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] hover:bg-black/[0.08]"
                aria-label="Hide chapter navigation"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <motion.div
              initial={false}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              {HOME_CHAPTERS.map((chapter) => {
                const isActive = activeChapter === chapter.id;

                return (
                  <motion.button
                    key={chapter.id}
                    type="button"
                    onClick={() => scrollToChapter(chapter.id)}
                    whileHover={{ x: -3 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className={`group flex w-[220px] items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-all duration-300 ${
                      isActive
                        ? "border-violet-400/30 bg-violet-500/12 shadow-[0_0_0_1px_rgba(139,92,246,0.18),0_12px_30px_rgba(139,92,246,0.06)]"
                        : "border-black/[0.06] bg-black/[0.02] hover:border-black/[0.1] hover:bg-black/[0.04]"
                    }`}
                  >
                    <motion.div
                      layout
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border font-mono text-[11px] font-bold tracking-[0.18em] transition-colors ${
                        isActive
                          ? "border-violet-400/30 bg-violet-500/12 text-violet-600"
                          : "border-black/[0.06] bg-black/[0.02] text-[var(--text-muted)]"
                      }`}
                    >
                      {chapter.number}
                    </motion.div>

                    <div className="min-w-0">
                      <div
                        className={`text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                          isActive
                            ? "text-[var(--text-primary)]"
                            : "text-[var(--text-secondary)]"
                        }`}
                      >
                        {chapter.name}
                      </div>

                      <div className="mt-0.5 text-[11px] text-[var(--text-muted)]">
                        {chapter.description}
                      </div>
                    </div>

                    <div
                      className={`ml-auto h-2 w-2 rounded-full transition-all ${
                        isActive
                          ? "bg-[var(--accent-violet)] shadow-[0_0_16px_rgba(139,92,246,0.65)]"
                          : "bg-black/20"
                      }`}
                    />
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};

export default HomeChapterNav;
