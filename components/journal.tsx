"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useSound from "use-sound";
import { JournalEntry, JournalEntryData, MoonPhase } from "@/components/journal-entry";

function moonPhaseFromDate(date: string): MoonPhase {
  // Deterministic pseudo-random mapping based on date string.
  const seed = [...date].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const phases: MoonPhase[] = ["FULL", "HALF", "CRESCENT"];
  return phases[seed % phases.length];
}

function formatStickyDate(date: string) {
  const [, m, d] = date.split("-");
  return `${m} / ${d}`;
}

const basePosts: Array<Omit<JournalEntryData, "phase">> = [
  {
    id: "log-0521",
    date: "2026-05-21",
    title: "MIDNIGHT LOG / ENTRY 01",
    preview: [
      { text: "Decrypting UI patterns. " },
      { text: "The", redacted: true },
      { text: " interface isn’t static — it breathes." },
    ],
  },
  {
    id: "log-0522",
    date: "2026-05-22",
    title: "CONFIDENTIAL / ENTRY 02",
    preview: [
      { text: "Background velocity increased. " },
      { text: "Parallax", redacted: true },
      { text: " now tracks intent." },
    ],
  },
  {
    id: "log-0523",
    date: "2026-05-23",
    title: "DARK HOUR / ENTRY 03",
    preview: [
      { text: "Clock synced. " },
      { text: "Glitch", redacted: true },
      { text: " stabilized. Green shift enabled." },
    ],
  },
  {
    id: "log-0524",
    date: "2026-05-24",
    title: "ARCHIVE / ENTRY 04",
    preview: [
      { text: "Timeline converted to grid. " },
      { text: "Redactions", redacted: true },
      { text: " reveal on hover." },
    ],
  },
];

export function Journal({ muted }: { muted: boolean }) {
  const posts = useMemo(
    () => basePosts.map((p) => ({ ...p, phase: moonPhaseFromDate(p.date) })),
    [],
  );

  const [viewMode, setViewMode] = useState<"timeline" | "grid">("timeline");
  const [activeDate, setActiveDate] = useState(posts[0]?.date ?? "2026-05-21");
  const [playThud] = useSound("/sfx/thud.mp3", { volume: 0.22, interrupt: true });

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const onScroll = () => {
      const cards = Array.from(el.querySelectorAll("[data-journal-card]")) as HTMLElement[];
      const topLine = 110;
      let nextDate = activeDate;
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        if (rect.top <= topLine) {
          const d = card.dataset.date;
          if (d) nextDate = d;
        }
      }
      if (nextDate !== activeDate) {
        setActiveDate(nextDate);
        if (!muted) playThud();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [activeDate, muted, playThud]);

  return (
    <section className="mt-8 w-full max-w-6xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="inline-block bg-p3-cyan/90 px-4 py-2 -skew-x-12">
          <h3 className="skew-x-12 font-display text-2xl uppercase tracking-[0.18em] text-p3-navy">
            JOURNAL / MIDNIGHT LOG
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setViewMode((m) => (m === "timeline" ? "grid" : "timeline"))}
          className="bg-p3-blue/80 px-4 py-2 -skew-x-12 text-xs uppercase tracking-[0.16em] text-p3-white"
        >
          <span className="block skew-x-12">{viewMode === "timeline" ? "VIEW ARCHIVES" : "VIEW TIMELINE"}</span>
        </button>
      </div>

      <div className="relative overflow-hidden border border-p3-cyan/40 bg-black/30 p-5 -skew-x-12" style={{ clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0% 100%)" }}>
        {/* Background video layer */}
        <div className="pointer-events-none absolute inset-0 skew-x-12 opacity-25">
          <video
            src="/media/journal-bg.mp4"
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,5,0.75),rgba(5,5,5,0.35))]" />
        </div>

        <div className="relative skew-x-12">
          <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
            {/* Sticky date rail */}
            <div className="relative">
              <div className="sticky top-24">
                <div className="text-p3-cyan/25 -skew-x-12">
                  <p className="font-display text-6xl uppercase tracking-[0.22em]">{formatStickyDate(activeDate)}</p>
                </div>
                <p className="mt-2 text-xs tracking-[0.18em] text-p3-white/70">DESCEND INTO ARCHIVE</p>
              </div>
            </div>

            {/* Entries */}
            <div ref={listRef}>
              <motion.div
                layout
                className={viewMode === "grid" ? "grid gap-4 md:grid-cols-2" : "flex flex-col gap-4"}
              >
                <AnimatePresence>
                  {posts.map((entry) => (
                    <motion.div
                      key={entry.id}
                      layout
                      data-journal-card
                      data-date={entry.date}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <JournalEntry entry={entry} viewMode={viewMode} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

