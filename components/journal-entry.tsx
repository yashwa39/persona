"use client";

import { motion } from "framer-motion";

export type MoonPhase = "FULL" | "HALF" | "CRESCENT";

export type JournalEntryData = {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  preview: Array<{ text: string; redacted?: boolean }>;
  phase: MoonPhase;
};

const phaseIcon: Record<MoonPhase, string> = {
  FULL: "◉",
  HALF: "◐",
  CRESCENT: "◔",
};

export function JournalEntry({
  entry,
  viewMode,
}: {
  entry: JournalEntryData;
  viewMode: "timeline" | "grid";
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, x: -40, rotate: -15 }}
      whileInView={{ opacity: 1, x: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ type: "spring", stiffness: 140, damping: 16 }}
      className="group relative"
    >
      <div
        className={`relative overflow-hidden border border-p3-cyan/70 bg-p3-blue/65 p-4 pl-7 -skew-x-12 shadow-[0_0_30px_rgba(255,43,43,0.18)] ${
          viewMode === "grid" ? "min-h-44" : ""
        }`}
        style={{ clipPath: "polygon(0 0, 100% 5%, 100% 100%, 0 95%)" }}
      >
        {/* Hover glitch overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 2px, transparent 6px)",
            mixBlendMode: "overlay",
          }}
          whileHover={{ opacity: [0, 0.35, 0.1, 0.25, 0] }}
          transition={{ duration: 0.35 }}
        />

        <div className="skew-x-12">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-xl uppercase tracking-[0.14em] text-p3-white">{entry.title}</p>
              <p className="mt-1 text-xs tracking-[0.16em] text-p3-cyan/90">
                {phaseIcon[entry.phase]} {entry.phase} MOON
              </p>
            </div>
            <div className="bg-p3-cyan px-2 py-1 -skew-x-12 text-[10px] uppercase tracking-[0.18em] text-p3-navy">
              <span className="block skew-x-12">TOP SECRET</span>
            </div>
          </div>

          {/* “Typewriter” decrypt reveal via clip-path */}
          <motion.p
            className="mt-3 font-body text-sm leading-6 tracking-[0.02em] text-p3-white/90"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.05 }}
          >
            {entry.preview.map((chunk, idx) => (
              <span
                key={`${entry.id}-${idx}`}
                className={
                  chunk.redacted
                    ? "mx-1 rounded-sm bg-black px-1 text-transparent transition-colors duration-150 group-hover:bg-p3-cyan group-hover:text-p3-navy"
                    : ""
                }
              >
                {chunk.text}
              </span>
            ))}
          </motion.p>
        </div>

        {/* Hover loading bar */}
        <div className="mt-4 h-2 w-full -skew-x-12 bg-black/60">
          <motion.div
            className="h-full origin-left bg-p3-cyan"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.article>
  );
}

