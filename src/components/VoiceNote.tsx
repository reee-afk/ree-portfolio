import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import voiceNoteAsset from "@/assets/voice-note.asset.json";

export function VoiceNote({ className = "" }: { className?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      void el
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTime = () => setProgress(el.duration ? el.currentTime / el.duration : 0);
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
      el.currentTime = 0;
    };
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", onEnd);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", onEnd);
    };
  }, []);

  return (
    <div className={className}>
      <motion.button
        type="button"
        onClick={toggle}
        data-cursor="grab"
        aria-label={playing ? "Pause voice note from Ree" : "Play voice note from Ree"}
        style={{ rotate: -4 }}
        whileHover={{ rotate: 0, scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 220, damping: 14 }}
        className="relative flex h-[76px] w-[76px] shrink-0 cursor-pointer flex-col items-center justify-center gap-1.5 overflow-hidden rounded-lg border-2 border-[var(--ink)]/25 bg-[var(--tape-red)] text-white shadow-sticker"
      >
        {/* washi top strip */}
        <span aria-hidden className="absolute inset-x-0 top-0 h-2 bg-[var(--tape-yellow)]/90" />

        {playing ? (
          <span className="font-mono text-[13px] leading-none tracking-tighter text-white">❚❚</span>
        ) : (
          <span className="font-mono text-[13px] leading-none text-white">▶</span>
        )}

        <div className="flex h-2.5 items-end gap-[2px]">
          {playing
            ? [0, 0.25, 0.5, 0.75].map((d, i) => (
                <motion.span
                  key={i}
                  animate={{ scaleY: [0.35, 1, 0.5, 0.9, 0.35] }}
                  transition={{ repeat: Infinity, duration: 1.1, delay: d, ease: "easeInOut" }}
                  className="w-[3px] origin-bottom rounded-full bg-white"
                />
              ))
            : [0.6, 1, 0.45, 0.8].map((h, i) => (
                <span
                  key={i}
                  className="w-[3px] rounded-full bg-white/70"
                  style={{ height: `${h * 10}px` }}
                />
              ))}
        </div>

        <span className="type-tag font-normal leading-none text-white/90">voice note</span>

        {/* progress fill */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1 bg-white/80 transition-[width] duration-200 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />
      </motion.button>
      <audio ref={audioRef} src={voiceNoteAsset.url} preload="metadata" className="hidden" />
    </div>
  );
}
