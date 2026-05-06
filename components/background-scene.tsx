"use client";

import { motion, useSpring } from "framer-motion";
import { useMemo } from "react";

const watermarks = ["LEAD", "PARTY", "EQUIP", "STATUS", "SKILLS"];

const bubbles = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 6) % 92}%`,
  size: 16 + (i % 5) * 12,
  duration: 8 + (i % 6) * 1.7,
  delay: i * 0.7,
}));

type BackgroundSceneProps = {
  mouseX: number;
  mouseY: number;
  darkHour: boolean;
};

export function BackgroundScene({ mouseX, mouseY, darkHour }: BackgroundSceneProps) {
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const shapes = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        top: 6 + i * 14,
        left: i % 2 === 0 ? -8 + i * 8 : 38 + i * 7,
        width: 260 + i * 45,
        opacity: 0.08 + i * 0.02,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className={`absolute inset-0 ${
          darkHour
            ? "bg-[radial-gradient(circle_at_20%_10%,#12351A_0%,#06120A_35%,#020503_100%)]"
            : "bg-[radial-gradient(circle_at_20%_10%,#2A0A0A_0%,#130707_35%,#050505_100%)]"
        }`}
      />

      {shapes.map((shape, idx) => (
        <motion.div
          key={shape.id}
          className={`absolute -skew-x-12 ${
            darkHour ? "bg-lime-300/10" : "bg-p3-cyan/10"
          }`}
          style={{
            top: `${shape.top}%`,
            left: `${shape.left}%`,
            width: shape.width,
            height: 58,
            opacity: shape.opacity,
            x: springX,
            y: springY,
            clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0% 100%)",
          }}
          animate={{ x: [0, -14, 10, 0], y: [0, 8, -12, 0] }}
          transition={{ duration: 12 + idx * 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {watermarks.map((word, idx) => (
        <motion.p
          key={word}
          initial={{ opacity: 0.03, x: -40 + idx * 30 }}
          animate={{ opacity: [0.04, 0.12, 0.04], x: [-30 + idx * 25, 20 + idx * 20, -10 + idx * 25] }}
          transition={{ duration: 12 + idx * 2, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute font-display text-[clamp(5rem,13vw,14rem)] tracking-[0.2em] -skew-x-12 ${
            darkHour ? "text-lime-200/10" : "text-p3-cyan/10"
          }`}
          style={{ top: `${idx * 17}%`, left: `${(idx * 9) % 40}%` }}
        >
          {word}
        </motion.p>
      ))}

      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className={`absolute bottom-[-10%] rounded-full border backdrop-blur-sm ${
            darkHour ? "border-lime-300/40 bg-lime-200/15" : "border-p3-cyan/40 bg-p3-cyan/15"
          }`}
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
