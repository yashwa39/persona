"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useUiSfx() {
  const [muted, setMuted] = useState(false);

  const playTone = useCallback(
    (frequency: number, duration = 0.06) => {
      if (muted || typeof window === "undefined") return;
      const audioCtx = new window.AudioContext();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = "square";
      oscillator.frequency.value = frequency;
      gainNode.gain.value = 0.05;
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      oscillator.stop(audioCtx.currentTime + duration);
      oscillator.onended = () => {
        void audioCtx.close();
      };
    },
    [muted],
  );

  return {
    muted,
    setMuted,
    playHover: () => playTone(520, 0.05),
    playSelect: () => playTone(200, 0.11),
    playConfirm: () => playTone(720, 0.14),
  };
}

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export function useKonami(onSuccess: () => void) {
  const indexRef = useRef(0);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (key === KONAMI[indexRef.current]) {
        indexRef.current += 1;
        if (indexRef.current === KONAMI.length) {
          indexRef.current = 0;
          onSuccess();
        }
      } else {
        indexRef.current = 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onSuccess]);
}
