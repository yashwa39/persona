"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import useSound from "use-sound";
import { useEffect } from "react";

type AllOutAttackCutInProps = {
  trigger: boolean;
};

// Easily adjustable timing constants
const T_BLACK_IN = 0;
const T_PANELS = 0;
const T_EYE_IN = 0.1;
const T_EXCLAIM_IN = 0.2;
const T_FADE_OUT_AT = 1.0;
const T_FADE_OUT_DUR = 0.3;

export function AllOutAttackCutIn({ trigger }: AllOutAttackCutInProps) {
  const [playSlash] = useSound("/sfx/slash.mp3", { volume: 0.65, interrupt: true });

  useEffect(() => {
    if (!trigger) return;
    const t = window.setTimeout(() => {
      playSlash();
    }, Math.round(T_EYE_IN * 1000));
    return () => window.clearTimeout(t);
  }, [trigger, playSlash]);

  if (!trigger) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{
        times: [0, 0.08, T_FADE_OUT_AT / (T_FADE_OUT_AT + T_FADE_OUT_DUR), 1],
        duration: T_FADE_OUT_AT + T_FADE_OUT_DUR,
        ease: "easeOut",
        delay: T_BLACK_IN,
      }}
    >
      {/* White slanted panels */}
      <motion.div
        className="absolute left-[-25%] top-[-20%] h-[55vh] w-[70vw] bg-white -skew-x-12"
        initial={{ x: "-40%", y: "-40%", opacity: 0 }}
        animate={{ x: "0%", y: "0%", opacity: [0, 1, 0.9] }}
        transition={{ duration: 0.26, ease: "easeOut", delay: T_PANELS }}
      />
      <motion.div
        className="absolute bottom-[-20%] right-[-25%] h-[55vh] w-[70vw] bg-white -skew-x-12"
        initial={{ x: "40%", y: "40%", opacity: 0 }}
        animate={{ x: "0%", y: "0%", opacity: [0, 1, 0.9] }}
        transition={{ duration: 0.26, ease: "easeOut", delay: T_PANELS }}
      />

      {/* Eye cut-in strip */}
      <motion.div
        className="relative w-[92vw] max-w-5xl -skew-x-12"
        style={{ clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0% 100%)" }}
        initial={{ opacity: 0, scaleX: 0, y: 50 }}
        animate={{ opacity: 1, scaleX: 1, y: 0 }}
        transition={{
          duration: 0.2,
          ease: [0.2, 1, 0.3, 1],
          delay: T_EYE_IN,
        }}
      >
        <div className="relative h-[180px] w-full overflow-hidden border-2 border-white bg-black md:h-[220px]">
          <Image src="/media/image_32.png" alt="Critical cut-in eye strip" fill className="object-cover" priority />
        </div>

        {/* Exclamation accent */}
        <motion.div
          className="absolute right-[-18px] top-[-22px] -skew-x-[-12] md:right-[-28px] md:top-[-32px]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: 1 }}
          transition={{ duration: 0.22, ease: "backOut", delay: T_EXCLAIM_IN }}
        >
          <div
            className="bg-white px-4 py-2 font-display text-6xl leading-none text-black md:text-7xl"
            style={{ clipPath: "polygon(12% 0, 100% 0, 88% 100%, 0% 100%)" }}
          >
            !!
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

