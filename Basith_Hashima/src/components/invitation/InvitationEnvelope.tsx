import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MailOpen } from "lucide-react";
import { wedding } from "@/config/wedding";
import { FloralCorner, GoldButton, StarMotif } from "./Ornaments";

type Phase = "closed" | "seal" | "flap" | "card" | "zoom";

function WaxSeal({ broken }: { broken: boolean }) {
  const half = (side: "l" | "r") => (
    <motion.div
      className="absolute inset-0"
      style={{ clipPath: side === "l" ? "polygon(0 0, 52% 0, 46% 40%, 54% 62%, 48% 100%, 0 100%)" : "polygon(52% 0, 100% 0, 100% 100%, 48% 100%, 54% 62%, 46% 40%)" }}
      animate={broken ? { x: side === "l" ? -26 : 26, y: 40, rotate: side === "l" ? -28 : 28, opacity: 0 } : {}}
      transition={{ duration: 0.9, ease: "easeIn" }}
    >
      <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gold-foil shadow-[inset_0_-6px_12px_rgba(90,60,10,0.55),inset_0_6px_10px_rgba(255,245,210,0.6),0_8px_18px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-[10%] rounded-full border border-forest/30" />
        <StarMotif size={34} className="text-forest/60" />
        <span className="absolute font-script text-xl text-forest/80">B&H</span>
      </div>
    </motion.div>
  );
  return (
    <div className="relative h-20 w-20 sm:h-24 sm:w-24">
      {half("l")}
      {half("r")}
    </div>
  );
}

export function InvitationEnvelope({ onOpened }: { onOpened: () => void }) {
  const [phase, setPhase] = useState<Phase>("closed");
  const [flapBehind, setFlapBehind] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const c = wedding.coupleShort;

  const open = () => {
    if (phase !== "closed") return;
    if (reduced) return onOpened();
    setPhase("seal");
    timers.current = [
      setTimeout(() => setPhase("flap"), 800),
      setTimeout(() => setPhase("card"), 2100),
      setTimeout(() => setPhase("zoom"), 3900),
      setTimeout(onOpened, 5000),
    ];
  };
  const after = (p: Phase) => ["seal", "flap", "card", "zoom"].indexOf(phase) >= ["seal", "flap", "card", "zoom"].indexOf(p);

  return (
    <motion.section
      className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden bg-velvet px-4"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 islamic-pattern opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--forest)_100%)]" />
      <FloralCorner className="absolute top-3 left-3 h-20 w-20 text-gold/50 sm:h-28 sm:w-28" />
      <FloralCorner className="absolute top-3 right-3 h-20 w-20 -scale-x-100 text-gold/50 sm:h-28 sm:w-28" />
      <FloralCorner className="absolute bottom-3 left-3 h-20 w-20 -scale-y-100 text-gold/50 sm:h-28 sm:w-28" />
      <FloralCorner className="absolute right-3 bottom-3 h-20 w-20 -scale-100 text-gold/50 sm:h-28 sm:w-28" />

      <button onClick={onOpened} className="absolute top-4 left-1/2 z-50 -translate-x-1/2 font-display text-[0.65rem] tracking-[0.3em] text-gold/70 uppercase hover:text-gold">
        Skip animation
      </button>

      <AnimatePresence>
        <motion.div animate={{ opacity: phase === "closed" ? 1 : 0 }} transition={{ duration: 0.4 }} aria-hidden={phase !== "closed"}>
        {(
          <motion.div key="top" className="relative z-20 mb-6 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 1 }}>
            <p dir="rtl" lang="ar" className="font-arabic text-2xl text-gold-foil sm:text-3xl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            <p className="mt-2 font-serif text-base text-cream/80 italic">With the blessings of Allah</p>
          </motion.div>
        )}
        </motion.div>
      </AnimatePresence>

      {/* 3D envelope */}
      <motion.div
        className="relative z-10 [--envelope-opening-offset:85px] sm:[--envelope-opening-offset:190px]"
        style={{ perspective: 1400 }}
        initial={{ opacity: 0, scale: 0.9, rotateX: 12 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0, y: after("flap") ? "var(--envelope-opening-offset)" : "0px" }}
        transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
      >
        <motion.div
          className="relative h-[220px] w-[320px] sm:h-[280px] sm:w-[420px]"
          style={{ transformStyle: "flat" }}
          animate={phase === "closed" ? { rotateX: [3, 0, 3], rotateY: [-3, 3, -3] } : { rotateX: 0, rotateY: 0 }}
          transition={phase === "closed" ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : { duration: 0.8 }}
        >
          {/* back */}
          <motion.div className="absolute inset-0 rounded-md bg-emerald-deep shadow-deep" animate={phase === "zoom" ? { y: 160, opacity: 0 } : { y: 0, opacity: 1 }} transition={{ duration: 1 }} />
          {/* card */}
          <motion.div
            className="absolute inset-x-4 top-3 bottom-3 flex flex-col items-center justify-center rounded-sm bg-ivory text-center shadow-lg"
            animate={phase === "zoom" ? { y: "-35%", scale: 1.15 } : after("card") ? { y: "-112%", scale: 1 } : { y: "0%", scale: 1 }}
            transition={{ duration: phase === "zoom" ? 1 : 1.6, ease: [0.45, 0, 0.2, 1] }}
            style={{ zIndex: phase === "zoom" ? 3 : 1 }}
          >
            <div className="absolute inset-2 rounded-sm border border-gold/70" />
            <div className="absolute inset-3 rounded-sm border border-gold/30" />
            <p className="font-display text-[0.55rem] tracking-[0.3em] text-emerald uppercase">The nikkah of</p>
            <p className="mt-1 font-script text-3xl leading-tight text-emerald-deep sm:text-4xl">{c.groom}</p>
            <p className="font-script text-2xl text-gold">&</p>
            <p className="font-script text-3xl leading-tight text-emerald-deep sm:text-4xl">{c.bride}</p>
          </motion.div>
          {/* front pocket */}
          <motion.div
            className="absolute inset-0 rounded-md bg-emerald islamic-pattern"
            style={{ clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)", zIndex: 2 }}
            animate={phase === "zoom" ? { y: 160, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-forest/50 to-transparent" />
            <div className="absolute inset-x-6 bottom-4 h-px bg-gold/60" />
          </motion.div>
          {/* flap */}
          <motion.div
            className="absolute inset-x-0 top-0 h-[62%] origin-top"
            style={{ transformStyle: "preserve-3d", zIndex: flapBehind ? 0 : 4 }}
            animate={{ rotateX: after("flap") ? -180 : 0, y: phase === "zoom" ? 160 : 0, opacity: phase === "zoom" ? 0 : 1 }}
            onUpdate={(latest) => { if (typeof latest["rotateX"] === "number" && latest["rotateX"] < -90 && !flapBehind) setFlapBehind(true); }}
            transition={{ duration: 1.2, ease: [0.45, 0, 0.2, 1] }}
          >
            <div className="absolute inset-0 bg-emerald islamic-pattern" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", backfaceVisibility: "hidden" }}>
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep/20 to-forest/40" />
            </div>
            <div className="absolute inset-0 bg-emerald-deep" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", transform: "rotateY(180deg)", backfaceVisibility: "hidden" }} />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ backfaceVisibility: "hidden" }}>
              <path d="M0 0 L50 100 L100 0" fill="none" stroke="var(--gold)" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
            </svg>
          </motion.div>
          {/* seal */}
          <div className="absolute top-[62%] left-1/2" style={{ zIndex: 5, transform: "translate(-50%,-50%) translateZ(10px)" }}>
            <WaxSeal broken={phase !== "closed"} />
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        <motion.div animate={{ opacity: phase === "closed" ? 1 : 0 }} transition={{ duration: 0.4 }} className={phase === "closed" ? "" : "pointer-events-none"} aria-hidden={phase !== "closed"}>
        {(
          <motion.div key="bottom" className="relative z-20 mt-8 flex flex-col items-center text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 1, delay: 0.3 }}>
            <p className="font-display text-[0.7rem] tracking-[0.4em] text-gold uppercase">You are cordially invited</p>
            <h1 className="mt-2 font-script text-4xl leading-tight text-ivory sm:text-5xl">
              {c.groom} <span className="text-gold">&</span> {c.bride}
            </h1>
            <p className="mt-2 font-display text-sm tracking-[0.3em] text-cream/80">{wedding.dateParts.long.toUpperCase()}</p>
            <GoldButton onClick={open} disabled={phase !== "closed"} className="mt-6">
              <MailOpen className="h-4 w-4" /> Open your invitation
            </GoldButton>
          </motion.div>
        )}
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
