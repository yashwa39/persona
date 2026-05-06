"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function ProfileCard() {
  return (
    <section className="relative w-full max-w-4xl py-6">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative max-w-2xl bg-p3-blue/90 p-6 -skew-x-12"
        style={{ clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0% 100%)" }}
      >
        <div className="skew-x-12">
          <h3 className="mb-3 font-display text-4xl uppercase tracking-[0.16em] text-p3-cyan">PROFILE</h3>
          <p className="font-body text-lg leading-relaxed text-p3-white">
            Name: Jade, age: 23, major: Computer Science. Focused on interactive frontend architecture,
            cinematic transitions, and building high-impact web products.
          </p>
        </div>

        <span className="absolute left-2 top-2 h-0 w-0 border-b-[10px] border-l-[8px] border-r-[8px] border-b-p3-pink border-l-transparent border-r-transparent" />
        <span className="absolute bottom-2 right-3 h-8 w-[2px] rotate-12 bg-p3-cyan" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.35 }}
        className="absolute -bottom-2 right-0 h-64 w-52 overflow-hidden border-2 border-p3-cyan bg-p3-navy/80 shadow-[0_0_40px_rgba(0,229,255,0.25)]"
        style={{ clipPath: "polygon(12% 0, 100% 0, 88% 100%, 0% 100%)" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=600&q=80"
          alt="Character portrait"
          fill
          sizes="(max-width: 768px) 45vw, 208px"
          className="object-cover"
        />
      </motion.div>
    </section>
  );
}
