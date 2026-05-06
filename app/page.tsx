"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { TransitionWipe } from "@/components/transition-wipe";
import { MainMenu } from "@/components/main-menu";
import { ListView } from "@/components/list-view";
import { ProfileCard } from "@/components/profile-card";
import { MediaShowcase } from "@/components/media-showcase";
import { BackgroundScene } from "@/components/background-scene";
import { SocialStatsRadar } from "@/components/social-stats-radar";
import { useKonami, useUiSfx } from "@/components/ui-hooks";
import { AllOutAttackCutIn } from "@/components/all-out-attack-cut-in";
import { DarkHourClockOverlay } from "@/components/dark-hour-clock-overlay";
import { Journal } from "@/components/journal";

type View = "HOME" | "LIST" | "PROFILE" | "JOURNAL";

const menuToView: Record<string, View> = {
  "ABOUT ME": "PROFILE",
  RESUME: "LIST",
  JOURNAL: "JOURNAL",
  "GITHUB LINK": "HOME",
  SOCIALS: "HOME",
  "SIDE PROJECTS": "LIST",
};

const heroVideo = "/media/inspiration-ideas.mp4";

export default function Home() {
  const [view, setView] = useState<View>("HOME");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState("");
  const [darkHour, setDarkHour] = useState(false);
  const [summonActive, setSummonActive] = useState(false);
  const [finishActive, setFinishActive] = useState(false);
  const [cutInActive, setCutInActive] = useState(false);
  const [darkHourOverlay, setDarkHourOverlay] = useState(false);
  const sfx = useUiSfx();

  useKonami(() => {
    setSummonActive(true);
    sfx.playConfirm();
    window.setTimeout(() => setSummonActive(false), 2600);
  });

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!cutInActive) return;
    const t = window.setTimeout(() => setCutInActive(false), 1400);
    return () => window.clearTimeout(t);
  }, [cutInActive]);

  useEffect(() => {
    if (!darkHourOverlay) return;
    const t = window.setTimeout(() => setDarkHourOverlay(false), 1500);
    return () => window.clearTimeout(t);
  }, [darkHourOverlay]);

  const subtitle = useMemo(() => {
    if (view === "LIST") return "Skill Report";
    if (view === "PROFILE") return "Persona Data";
    return "Main Operation";
  }, [view]);

  return (
    <TransitionWipe transitionKey={view}>
      <main
        onMouseMove={(event) => {
          const x = ((event.clientX / window.innerWidth) - 0.5) * -20;
          const y = ((event.clientY / window.innerHeight) - 0.5) * -20;
          setMousePos({ x, y });
        }}
        className={`scanline-overlay relative min-h-screen overflow-hidden px-6 py-8 md:pl-10 md:pr-2 lg:pr-0 ${
          darkHour ? "dark-hour" : ""
        }`}
      >
        <AllOutAttackCutIn trigger={cutInActive} />
        <DarkHourClockOverlay trigger={darkHourOverlay} />
        <BackgroundScene mouseX={mousePos.x} mouseY={mousePos.y} darkHour={darkHour} />
        <div className="absolute right-4 top-4 z-30 flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setDarkHour((value) => {
                const next = !value;
                if (next) setDarkHourOverlay(true);
                return next;
              })
            }
            className="bg-p3-blue/80 px-3 py-1 -skew-x-12 text-xs uppercase tracking-[0.1em]"
          >
            <span className="block skew-x-12">{darkHour ? "Exit Dark Hour" : "Dark Hour"}</span>
          </button>
          <button
            type="button"
            onClick={() => sfx.setMuted(!sfx.muted)}
            className="bg-p3-blue/80 px-3 py-1 -skew-x-12 text-xs uppercase tracking-[0.1em]"
          >
            <span className="block skew-x-12">{sfx.muted ? "Unmute" : "Mute"}</span>
          </button>
          <div className="bg-p3-cyan px-3 py-1 -skew-x-12 text-xs uppercase tracking-[0.1em] text-p3-navy">
            <span className={`block skew-x-12 font-display ${darkHour ? "glitch-text" : ""}`}>{time}</span>
          </div>
        </div>

        <div className="mb-6 inline-block bg-p3-cyan px-4 py-2 -skew-x-12">
          <span className="block skew-x-12 font-display text-lg uppercase leading-tight tracking-[0.1em] text-p3-navy md:text-xl md:tracking-[0.16em]">
            {view} / {subtitle}
          </span>
        </div>

        <div className="grid min-h-[80vh] grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_430px]">
          <section>
            <MainMenu
              onHover={sfx.playHover}
              onSelect={(item) => {
                sfx.playSelect();
                if (item === "GITHUB LINK") {
                  window.open("https://github.com/yashwa39/persona", "_blank");
                  return;
                }
                if (item === "RESUME") setCutInActive(true);
                setView(menuToView[item] ?? "HOME");
              }}
            />

            <motion.div
              key={view}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-8"
            >
              {view === "LIST" && <ListView />}
              {view === "LIST" && <SocialStatsRadar />}
              {view === "PROFILE" && <ProfileCard />}
              {view === "JOURNAL" && <Journal muted={sfx.muted} />}
              {view === "PROFILE" && (
                <button
                  type="button"
                  onClick={() => {
                    setFinishActive(true);
                    setCutInActive(true);
                    sfx.playConfirm();
                    window.setTimeout(() => setFinishActive(false), 2200);
                  }}
                  className="mt-5 bg-p3-cyan px-4 py-2 -skew-x-12 text-p3-navy"
                >
                  <span className="block skew-x-12 font-display uppercase tracking-[0.12em]">Send / All-Out Finish</span>
                </button>
              )}
              {view === "HOME" && <MediaShowcase />}
            </motion.div>
          </section>

          <motion.aside
            initial={{ x: 90, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative justify-self-end lg:self-start lg:mt-24"
          >
            <div
              className="relative h-[58vh] min-h-[370px] w-[320px] max-w-[85vw] overflow-hidden border-2 border-p3-cyan bg-p3-blue/70 shadow-[0_0_45px_rgba(255,43,43,0.32)] md:w-[430px]"
              style={{ clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0% 100%)" }}
            >
              <motion.div
                className="relative h-full w-full"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <video
                  src={heroVideo}
                  className={`h-full w-full object-cover object-center saturate-110 contrast-110 ${
                    darkHour ? "hue-rotate-[65deg]" : ""
                  }`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,5,0.68),rgba(5,5,5,0.15))]" />
              </motion.div>
            </div>
          </motion.aside>
        </div>

        {summonActive && (
          <motion.div
            initial={{ x: "-110%" }}
            animate={{ x: "110%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-y-[25%] left-0 z-40 flex h-56 w-[65vw] max-w-3xl items-center gap-4 bg-p3-cyan/90 px-6 -skew-x-12"
          >
            <div className="relative h-44 w-44">
              <Image src="/media/persona-underwater.jpeg" alt="Persona summon cut-in" fill className="object-cover" sizes="176px" />
            </div>
            <span className="skew-x-12 font-display text-5xl uppercase tracking-[0.12em] text-p3-navy">PERSONA SUMMONED</span>
          </motion.div>
        )}

        {finishActive && (
          <motion.div
            initial={{ x: "-120%" }}
            animate={{ x: "120%" }}
            transition={{ duration: 0.95, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-y-[35%] left-0 z-40 flex h-40 w-[60vw] max-w-2xl items-center gap-4 bg-p3-cyan px-6 -skew-x-12"
          >
            <div className="relative h-28 w-28">
              <Image src="/media/persona-clock.jpeg" alt="Finish cut-in" fill className="object-cover" sizes="112px" />
            </div>
            <span className="skew-x-12 font-display text-6xl uppercase tracking-[0.12em] text-p3-navy">FINISH!</span>
          </motion.div>
        )}
      </main>
    </TransitionWipe>
  );
}
