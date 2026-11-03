import { Music, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Original ambient pad synthesized live with Web Audio — no copyrighted music.
function startPad(ctx: AudioContext) {
  const master = ctx.createGain();
  master.gain.value = 0;
  master.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 3);
  const delay = ctx.createDelay();
  delay.delayTime.value = 0.45;
  const fb = ctx.createGain();
  fb.gain.value = 0.35;
  delay.connect(fb).connect(delay);
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 1400;
  lp.connect(master);
  delay.connect(master);
  master.connect(ctx.destination);
  const chords: number[][] = [[220, 277.18, 329.63], [196, 246.94, 293.66], [174.61, 220, 261.63], [196, 246.94, 329.63]];
  let i = 0;
  const play = () => {
    const t = ctx.currentTime;
    chords[i % chords.length]!.forEach((f, k) => {
      [1, 2].forEach((mult) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = mult === 1 ? "sine" : "triangle";
        o.frequency.value = f * mult;
        o.detune.value = (k - 1) * 4;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(mult === 1 ? 0.25 : 0.05, t + 2);
        g.gain.linearRampToValueAtTime(0, t + 7.5);
        o.connect(g);
        g.connect(lp);
        g.connect(delay);
        o.start(t);
        o.stop(t + 8);
      });
    });
    // gentle bell melody note
    const b = ctx.createOscillator();
    const bg = ctx.createGain();
    b.frequency.value = chords[i % chords.length]![2]! * 2;
    bg.gain.setValueAtTime(0.08, t + 1);
    bg.gain.exponentialRampToValueAtTime(0.0001, t + 4);
    b.connect(bg).connect(delay);
    b.start(t + 1);
    b.stop(t + 4.2);
    i++;
  };
  play();
  const id = window.setInterval(play, 6000);
  return () => {
    window.clearInterval(id);
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
  };
}

export function MusicToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const stopRef = useRef<(() => void) | null>(null);
  useEffect(() => () => { stopRef.current?.(); ctxRef.current?.close(); }, []);
  const toggle = async () => {
    if (on) {
      stopRef.current?.();
      stopRef.current = null;
      setOn(false);
      return;
    }
    ctxRef.current ??= new AudioContext();
    await ctxRef.current.resume();
    stopRef.current = startPad(ctxRef.current);
    setOn(true);
  };
  return (
    <button
      onClick={toggle}
      aria-label={on ? "Mute music" : "Play music"}
      className="fixed right-4 bottom-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-forest/80 text-gold shadow-gold backdrop-blur-md transition-transform hover:scale-105"
    >
      {on ? <Music className="h-5 w-5 animate-pulse" /> : <VolumeX className="h-5 w-5" />}
    </button>
  );
}
