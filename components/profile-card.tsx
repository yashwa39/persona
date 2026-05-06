"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function ProfileCard() {
  return (
    <section className="w-full max-w-5xl py-6">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative bg-p3-blue/90 p-5 -skew-x-12 shadow-[0_0_40px_rgba(0,229,255,0.18)] md:p-6"
        style={{ clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0% 100%)" }}
      >
        <div className="grid gap-6 skew-x-12 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div>
            <h3 className="mb-3 font-display text-4xl uppercase tracking-[0.1em] text-p3-cyan md:tracking-[0.16em]">
              PROFILE
            </h3>
            <p className="max-w-2xl font-body text-base leading-7 tracking-[0.02em] text-p3-white md:text-lg">
              Name: Jade, age: 23, major: Computer Science. Focused on interactive frontend architecture,
              cinematic transitions, and building high-impact web products.
            </p>
          </div>

          <div
            className="relative h-72 overflow-hidden border-2 border-p3-cyan bg-p3-navy/80"
            style={{ clipPath: "polygon(12% 0, 100% 0, 88% 100%, 0% 100%)" }}
          >
            <Image
              src="/media/persona-underwater.jpeg"
              alt="Blue underwater Persona-style character portrait"
              fill
              sizes="(max-width: 1024px) 80vw, 260px"
              className="object-cover object-center"
            />
          </div>
        </div>

        <span className="absolute left-2 top-2 h-0 w-0 border-b-[10px] border-l-[8px] border-r-[8px] border-b-p3-pink border-l-transparent border-r-transparent" />
        <span className="absolute bottom-2 right-3 h-8 w-[2px] rotate-12 bg-p3-cyan" />
      </motion.div>
    </section>
  );
}
