import { useCallback, useEffect, useRef, useState } from "react";
import { wedding } from "@/config/wedding";

/**
 * Controls the wedding background music from a single audio file.
 * The file lives at public/music/wedding.mp3 (path set in src/config/wedding.ts).
 * Playback starts on the "open invitation" tap (a user gesture, so it is allowed)
 * and the floating button mutes/unmutes.
 */
export function useWeddingMusic() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => () => audioRef.current?.pause(), []);

  const start = useCallback(() => {
    if (playing) return;
    const a = (audioRef.current ??= new Audio(wedding.music.src));
    a.loop = true;
    a.volume = wedding.music.volume;
    a.play()
      .then(() => setPlaying(true))
      .catch(() => {
        // File missing or playback blocked — stay silent, the toggle can retry.
      });
  }, [playing]);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (playing) stop();
    else start();
  }, [playing, start, stop]);

  return { playing, start, stop, toggle };
}
