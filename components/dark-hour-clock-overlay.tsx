"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type DarkHourClockOverlayProps = {
  trigger: boolean;
};

export function DarkHourClockOverlay({ trigger }: DarkHourClockOverlayProps) {
  if (!trigger) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.4, times: [0, 0.12, 0.75, 1], ease: "easeOut" }}
    >
      <motion.div
        initial={{ scale: 0.65, rotate: -18, opacity: 0 }}
        animate={{ scale: [0.65, 1.12, 1], rotate: [-18, 6, 0], opacity: [0, 1, 1] }}
        transition={{ duration: 0.55, ease: [0.2, 1, 0.2, 1], delay: 0.08 }}
        className="relative h-[70vmin] w-[70vmin] max-h-[520px] max-w-[520px]"
      >
        <Image
          src="/media/dark-hour-clock.png"
          alt="Dark Hour clock"
          fill
          priority
          className="object-contain drop-shadow-[0_0_45px_rgba(180,255,80,0.32)]"
        />
      </motion.div>

      {/* Slanted green flashes */}
      <motion.div
        className="absolute -left-1/3 top-0 h-full w-2/3 bg-lime-300/25 -skew-x-12"
        initial={{ x: "-120%", opacity: 0 }}
        animate={{ x: ["-120%", "140%"], opacity: [0, 1, 0] }}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
      />
      <motion.div
        className="absolute -right-1/3 top-0 h-full w-2/3 bg-lime-200/15 -skew-x-12"
        initial={{ x: "120%", opacity: 0 }}
        animate={{ x: ["120%", "-140%"], opacity: [0, 1, 0] }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
      />
    </motion.div>
  );
}

