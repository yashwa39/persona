"use client";

import { AnimatePresence, motion } from "framer-motion";

type TransitionWipeProps = {
  transitionKey: string;
  children: React.ReactNode;
};

const panelColors = ["bg-p3-navy", "bg-p3-cyan", "bg-p3-white", "bg-p3-blue"];

export function TransitionWipe({ transitionKey, children }: TransitionWipeProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={transitionKey}
          initial={{ opacity: 0.3, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0.2, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative z-10"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${transitionKey}-wipe`}
          className="pointer-events-none fixed inset-0 z-40"
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {panelColors.map((colorClass, index) => (
            <motion.div
              key={colorClass}
              className={`absolute -left-1/2 top-0 h-full w-1/2 ${colorClass} -skew-x-12`}
              style={{ transformOrigin: "left center" }}
              variants={{
                hidden: { x: "-220%" },
                show: { x: ["-220%", "160%", "420%"], opacity: [1, 1, 0] },
                exit: { x: "500%", opacity: 0 },
              }}
              transition={{
                duration: 0.85,
                ease: [0.25, 1, 0.5, 1],
                delay: index * 0.1,
                times: [0, 0.6, 1],
              }}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
