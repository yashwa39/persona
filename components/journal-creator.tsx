"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useSound from "use-sound";
import { AllOutAttackCutIn } from "@/components/all-out-attack-cut-in";
import type { JournalEntryData, MoonPhase } from "@/components/journal-entry";

type Mood = "ANGRY" | "HAPPY" | "MELANCHOLIC";

type JournalCreatorProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (entry: JournalEntryData) => void;
  muted: boolean;
};

const MAX_CHARS = 500;

function moonPhaseFromDate(date: string): MoonPhase {
  const seed = [...date].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const phases: MoonPhase[] = ["FULL", "HALF", "CRESCENT"];
  return phases[seed % phases.length];
}

function phaseIntensity(phase: MoonPhase) {
  if (phase === "FULL") return 1;
  if (phase === "HALF") return 0.72;
  return 0.5;
}

function toPreview(content: string): JournalEntryData["preview"] {
  const text = content.trim().slice(0, 180);
  // Minimal markdown glow: **word**
  const tokens = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return tokens.map((t) => {
    const isMd = t.startsWith("**") && t.endsWith("**") && t.length > 4;
    return isMd
      ? { text: t.slice(2, -2), redacted: false }
      : { text: t, redacted: false };
  });
}

export function JournalCreator({ open, onClose, onCreate, muted }: JournalCreatorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<Mood>("MELANCHOLIC");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successCut, setSuccessCut] = useState(false);
  const [cursorOn, setCursorOn] = useState(true);

  const [playType] = useSound("/sfx/type.mp3", { volume: 0.25, interrupt: true, soundEnabled: !muted });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const lastTypeAtRef = useRef(0);

  const dateStr = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const phase = useMemo(() => moonPhaseFromDate(dateStr), [dateStr]);
  const intensity = useMemo(() => phaseIntensity(phase), [phase]);

  const moodColor = useMemo(() => {
    if (mood === "HAPPY") return "shadow-[0_0_40px_rgba(142,14,14,0.45)] border-p3-pink";
    if (mood === "ANGRY") return "shadow-[0_0_45px_rgba(255,43,43,0.45)] border-p3-cyan";
    return "shadow-[0_0_45px_rgba(245,245,245,0.12)] border-p3-white/40";
  }, [mood]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => textareaRef.current?.focus(), 120);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const t = window.setInterval(() => setCursorOn((v) => !v), 500);
    return () => window.clearInterval(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const chars = content.length;
  const progress = Math.min(1, chars / MAX_CHARS);

  async function submit() {
    if (isSubmitting) return;
    setIsSubmitting(true);

    // “upload” scanline + shake
    window.setTimeout(() => {
      const entry: JournalEntryData = {
        id: `user-${Date.now()}`,
        date: dateStr,
        title: (title.trim() || "VELVET RECORD / ENTRY").toUpperCase(),
        preview: toPreview(content),
        phase,
      };
      onCreate(entry);
      setSuccessCut(true);
      window.setTimeout(() => setSuccessCut(false), 1400);
      window.setTimeout(() => {
        setIsSubmitting(false);
        setTitle("");
        setContent("");
        onClose();
      }, 1500);
    }, 520);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AllOutAttackCutIn trigger={successCut} />

          <motion.div
            className="absolute inset-0 bg-p3-navy/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center p-3 md:p-8"
          >
            <div
              className={`relative w-full max-w-4xl overflow-hidden bg-p3-blue/85 -skew-x-3 border-4 ${moodColor}`}
              style={{
                clipPath: "polygon(3% 0, 100% 0, 97% 100%, 0% 100%)",
                transformOrigin: "center",
              }}
            >
              <div className="skew-x-3 max-h-[86vh] overflow-y-auto p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="bg-p3-cyan px-4 py-2 -skew-x-12">
                    <p className="block skew-x-12 font-display text-sm uppercase tracking-[0.18em] text-p3-navy">
                      ESTABLISHING LINK...
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-p3-blue/70 px-3 py-2 -skew-x-12 text-xs uppercase tracking-[0.16em] text-p3-white"
                  >
                    <span className="block skew-x-12">CLOSE</span>
                  </button>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_240px]">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.16em] text-p3-white/80">TITLE</label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value.slice(0, 60))}
                      className="mt-2 w-full bg-black/45 px-4 py-3 text-p3-white outline-none"
                      style={{ clipPath: "polygon(3% 0, 100% 0, 97% 100%, 0% 100%)" }}
                      placeholder="VELVET RECORD / ENTRY"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="bg-black/45 px-4 py-3" style={{ clipPath: "polygon(3% 0, 100% 0, 97% 100%, 0% 100%)" }}>
                      <p className="text-xs uppercase tracking-[0.16em] text-p3-white/80">MOON PHASE</p>
                      <p className="font-display text-lg tracking-[0.14em] text-p3-cyan">
                        {phase} / INTENSITY {(intensity * 100).toFixed(0)}%
                      </p>
                    </div>
                    <div className="bg-black/45 px-4 py-3" style={{ clipPath: "polygon(3% 0, 100% 0, 97% 100%, 0% 100%)" }}>
                      <p className="text-xs uppercase tracking-[0.16em] text-p3-white/80">MOOD</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(["ANGRY", "HAPPY", "MELANCHOLIC"] as const).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setMood(m)}
                            className={`px-3 py-1 -skew-x-12 text-[11px] uppercase tracking-[0.16em] ${
                              mood === m ? "bg-p3-cyan text-p3-navy" : "bg-p3-blue/70 text-p3-white"
                            }`}
                          >
                            <span className="block skew-x-12">{m}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <label className="block text-xs uppercase tracking-[0.16em] text-p3-white/80">VELVET RECORDS TERMINAL</label>
                  <div
                    className="relative mt-2 bg-black/55 p-4 border border-p3-cyan/80"
                    style={{
                      clipPath: "polygon(3% 0, 100% 0, 97% 100%, 0% 100%)",
                      boxShadow: `0 0 48px rgba(255,43,43,${0.12 + intensity * 0.22})`,
                    }}
                  >
                    {/* Upload scanline on submit */}
                    <AnimatePresence>
                      {isSubmitting && (
                        <motion.div
                          className="pointer-events-none absolute inset-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <motion.div
                            className="absolute left-0 top-0 h-10 w-full bg-p3-cyan/35"
                            initial={{ y: "-20%" }}
                            animate={{ y: "120%" }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.div
                      animate={isSubmitting ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
                      transition={{ duration: 0.35 }}
                      className=""
                    >
                      <textarea
                        ref={textareaRef}
                        value={content}
                        onChange={(e) => {
                          const next = e.target.value.slice(0, MAX_CHARS);
                          setContent(next);
                        }}
                        onKeyDown={() => {
                          if (muted) return;
                          const now = performance.now();
                          if (now - lastTypeAtRef.current < 45) return;
                          lastTypeAtRef.current = now;
                          playType();
                        }}
                        className="h-56 w-full resize-none bg-transparent font-mono text-[15px] leading-6 tracking-[0.02em] text-p3-white antialiased outline-none md:h-72 md:text-[16px]"
                        placeholder="Type… use **double asterisks** for glow."
                      />
                      <div className="mt-2 text-[13px] text-p3-white/90 font-mono tracking-[0.02em] antialiased">
                        {cursorOn && content.length === 0 ? "_" : ""}
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Sync progress */}
                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-p3-white/70">SYNC PROGRESS</p>
                    <div className="mt-2 h-2 w-full bg-black/60 -skew-x-12">
                      <motion.div
                        className={`h-full origin-left ${chars >= MAX_CHARS ? "bg-p3-pink" : "bg-p3-cyan"}`}
                        animate={{ scaleX: progress }}
                        transition={{ duration: 0.15 }}
                      />
                    </div>
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-p3-white/70">
                    {chars}/{MAX_CHARS}
                  </div>
                </div>

                {/* Submit */}
                <div className="mt-5 flex justify-end">
                  <motion.button
                    type="button"
                    onClick={submit}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    animate={isSubmitting ? { filter: ["hue-rotate(0deg)", "hue-rotate(50deg)", "hue-rotate(0deg)"] } : {}}
                    transition={{ duration: 0.2 }}
                    className="bg-p3-blue/80 px-6 py-3 -skew-x-12 border border-p3-cyan text-p3-white"
                  >
                    <span className="block skew-x-12 font-display uppercase tracking-[0.18em]">
                      {isSubmitting ? "SYNCING..." : "FILE RECORD"}
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

