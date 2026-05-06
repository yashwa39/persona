"use client";

import { motion } from "framer-motion";

const rows = [
  { id: "01", label: "EDUCATION", rank: 4 },
  { id: "02", label: "SKILLS", rank: 5 },
  { id: "03", label: "PROJECTS", rank: 4 },
  { id: "04", label: "EXPERIENCE", rank: 3 },
];

export function ListView() {
  return (
    <section className="w-full max-w-4xl py-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="bg-p3-cyan px-3 py-1 -skew-x-12">
          <span className="block skew-x-12 font-display text-p3-navy">LB</span>
        </div>
        <div className="bg-p3-white px-3 py-1 -skew-x-12">
          <span className="block skew-x-12 font-display text-p3-navy">RB</span>
        </div>
      </div>

      <h2 className="mb-6 font-display text-7xl uppercase leading-none tracking-[0.1em] text-p3-white -skew-x-12 md:tracking-[0.18em]">
        <span className="inline-block skew-x-12">LIST</span>
      </h2>

      <div className="space-y-3">
        {rows.map((row, i) => (
          <motion.div
            key={row.id}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            whileHover={{ x: 8 }}
            className="group grid grid-cols-[1fr_auto] items-center gap-4 bg-p3-blue/70 px-4 py-3 -skew-x-12"
            style={{ clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0% 100%)" }}
          >
            <div className="skew-x-12">
              <span className="mr-3 font-display text-p3-cyan">{row.id}</span>
              <span className="font-display text-2xl tracking-[0.1em] text-p3-white group-hover:text-p3-cyan md:text-3xl md:tracking-[0.14em]">
                {row.label}
              </span>
            </div>
            <div className="bg-p3-pink px-3 py-1 -skew-x-12">
              <span className="block skew-x-12 font-display tracking-[0.1em] text-p3-white md:tracking-[0.12em]">
                RANK {row.rank}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
