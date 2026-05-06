"use client";

import { motion } from "framer-motion";

const watermarks = ["LEAD", "PARTY", "EQUIP", "STATUS", "SKILLS"];

const bubbles = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 6) % 92}%`,
  size: 16 + (i % 5) * 12,
  duration: 8 + (i % 6) * 1.7,
  delay: i * 0.7,
}));

export function BackgroundScene() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,#2A0A0A_0%,#130707_35%,#050505_100%)]" />

      {watermarks.map((word, idx) => (
        <motion.p
          key={word}
          initial={{ opacity: 0.03, x: -40 + idx * 30 }}
          animate={{ opacity: [0.04, 0.12, 0.04], x: [-30 + idx * 25, 20 + idx * 20, -10 + idx * 25] }}
          transition={{ duration: 12 + idx * 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute font-display text-[clamp(5rem,13vw,14rem)] tracking-[0.2em] text-p3-cyan/10 -skew-x-12"
          style={{ top: `${idx * 17}%`, left: `${(idx * 9) % 40}%` }}
        >
          {word}
        </motion.p>
      ))}

      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute bottom-[-10%] rounded-full border border-p3-cyan/40 bg-p3-cyan/15 backdrop-blur-sm"
          style={{
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
          }}
          animate={{
            y: ["0%", "-130vh"],
            x: [0, 12, -8, 5],
            opacity: [0, 0.4, 0.25, 0],
            scale: [0.7, 1, 1.1, 1.2],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
