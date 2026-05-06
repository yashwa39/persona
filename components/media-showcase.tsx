"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const reels = [
  {
    title: "Playroom Ideas Reel",
    subtitle: "Budget-friendly organization flow",
    video: "/media/playroom-ideas.mp4",
  },
  {
    title: "Bridesmaid Gift Reel",
    subtitle: "Creative gift styling inspiration",
    video: "/media/inspiration-ideas.mp4",
  },
];

const stills = [
  { src: "/media/persona-clock.jpeg", alt: "Persona clock artwork" },
  { src: "/media/persona-underwater.jpeg", alt: "Persona underwater artwork" },
];

export function MediaShowcase() {
  return (
    <section className="mt-10 w-full max-w-5xl">
      <div className="mb-4 inline-block bg-p3-cyan/90 px-4 py-2 -skew-x-12">
        <h3 className="skew-x-12 font-display text-xl uppercase tracking-[0.12em] text-p3-navy md:text-2xl md:tracking-[0.18em]">
          Media Deck
        </h3>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {reels.map((reel, index) => (
            <motion.article
              key={reel.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
              className="overflow-hidden border border-p3-cyan/70 bg-p3-blue/70 p-2 -skew-x-6 shadow-[0_0_28px_rgba(0,229,255,0.2)]"
              style={{ clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0% 100%)" }}
            >
              <div className="skew-x-6">
                <video
                  src={reel.video}
                  className="h-52 w-full rounded-sm object-cover md:h-56"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                />
                <p className="mt-3 font-display text-lg uppercase tracking-[0.09em] text-p3-white md:tracking-[0.12em]">
                  {reel.title}
                </p>
                <p className="font-body text-sm tracking-[0.04em] text-p3-cyan/90">{reel.subtitle}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="grid gap-4">
          {stills.map((still, index) => (
            <motion.div
              key={still.src}
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative h-36 overflow-hidden border border-p3-cyan/80 bg-p3-blue/60 -skew-x-12 md:h-[178px]"
              style={{ clipPath: "polygon(12% 0, 100% 0, 88% 100%, 0% 100%)" }}
            >
              <div className="relative h-full w-full skew-x-12">
                <Image src={still.src} alt={still.alt} fill sizes="(max-width: 1024px) 50vw, 280px" className="object-cover" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
