"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { TransitionWipe } from "@/components/transition-wipe";
import { MainMenu } from "@/components/main-menu";
import { ListView } from "@/components/list-view";
import { ProfileCard } from "@/components/profile-card";
import { MediaShowcase } from "@/components/media-showcase";

type View = "HOME" | "LIST" | "PROFILE";

const menuToView: Record<string, View> = {
  "ABOUT ME": "PROFILE",
  RESUME: "LIST",
  "GITHUB LINK": "HOME",
  SOCIALS: "HOME",
  "SIDE PROJECTS": "LIST",
};

const heroVideo = "/media/inspiration-ideas.mp4";

export default function Home() {
  const [view, setView] = useState<View>("HOME");

  const subtitle = useMemo(() => {
    if (view === "LIST") return "Skill Report";
    if (view === "PROFILE") return "Persona Data";
    return "Main Operation";
  }, [view]);

  return (
    <TransitionWipe transitionKey={view}>
      <main className="relative min-h-screen overflow-hidden px-6 py-8 md:pl-10 md:pr-2 lg:pr-0">
        <div className="mb-6 inline-block bg-p3-cyan px-4 py-2 -skew-x-12">
          <span className="block skew-x-12 font-display text-lg uppercase leading-tight tracking-[0.1em] text-p3-navy md:text-xl md:tracking-[0.16em]">
            {view} / {subtitle}
          </span>
        </div>

        <div className="grid min-h-[80vh] grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_430px]">
          <section>
            <MainMenu
              onSelect={(item) => {
                if (item === "GITHUB LINK") {
                  window.open("https://github.com/yashwa39/persona", "_blank");
                  return;
                }
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
              {view === "PROFILE" && <ProfileCard />}
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
                  className="h-full w-full object-cover object-center saturate-110 contrast-110"
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
      </main>
    </TransitionWipe>
  );
}
