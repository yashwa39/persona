"use client";

import { motion } from "framer-motion";

const menuItems = ["ABOUT ME", "RESUME", "GITHUB LINK", "SOCIALS", "SIDE PROJECTS"];

type MainMenuProps = {
  onSelect: (item: string) => void;
};

export function MainMenu({ onSelect }: MainMenuProps) {
  return (
    <div className="w-full max-w-2xl pt-6">
      <div className="mb-8 inline-block bg-p3-blue/70 px-6 py-3 -skew-x-12 shadow-[0_0_30px_rgba(0,229,255,0.2)]">
        <h1 className="skew-x-12 font-display text-4xl uppercase leading-none tracking-[0.08em] text-p3-white md:text-6xl md:tracking-[0.16em]">
          Jade&apos;s Persona
        </h1>
      </div>

      <ul className="space-y-3">
        {menuItems.map((item, index) => (
          <motion.li
            key={item}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.15 * index, duration: 0.45, ease: "easeOut" }}
            className="group relative"
            style={{ marginLeft: `${index * 14}px` }}
          >
            <button
              type="button"
              onClick={() => onSelect(item)}
              className="relative block w-full text-left"
            >
              <motion.div
                whileHover={{ x: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative min-h-16 overflow-hidden px-5 py-4 -skew-x-12 transition-all duration-150"
                style={{ clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0% 100%)" }}
              >
                <span className="absolute inset-0 bg-p3-blue/80 group-hover:bg-p3-pink transition-colors duration-150" />
                <span
                  className={`relative z-10 block skew-x-12 font-display text-2xl uppercase leading-none tracking-[0.1em] md:text-3xl md:tracking-[0.16em] ${
                    index % 2 === 0 ? "text-p3-cyan group-hover:text-p3-white" : "text-p3-white"
                  }`}
                >
                  {item}
                </span>
              </motion.div>
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
