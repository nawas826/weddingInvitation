import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-gold ${className}`} aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold sm:w-24" />
      <svg width="44" height="22" viewBox="0 0 44 22" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M22 1l5 10-5 10-5-10z" />
        <path d="M22 5l2.5 6L22 17l-2.5-6z" fill="currentColor" />
        <circle cx="8" cy="11" r="2" />
        <circle cx="36" cy="11" r="2" />
        <path d="M0 11h4M40 11h4" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold sm:w-24" />
    </div>
  );
}

export function StarMotif({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden>
      <rect x="8" y="8" width="24" height="24" />
      <rect x="8" y="8" width="24" height="24" transform="rotate(45 20 20)" />
      <circle cx="20" cy="20" r="5" />
    </svg>
  );
}

export function FloralCorner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" stroke="currentColor" strokeWidth="0.9" aria-hidden>
      <path d="M2 78C2 40 40 2 78 2" />
      <path d="M2 60C10 40 20 30 40 22" />
      <path d="M18 78C22 60 36 46 58 40" />
      {[[14, 46], [30, 30], [46, 14], [36, 50]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d="M0 -5C3 -2 3 2 0 5C-3 2 -3 -2 0 -5Z" fill="currentColor" opacity="0.5" />
          <path d="M-5 0C-2 3 2 3 5 0C2 -3 -2 -3 -5 0Z" fill="currentColor" opacity="0.5" />
          <circle r="1.3" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}

export function Reveal({ children, delay = 0, ...rest }: { children: ReactNode; delay?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="font-display text-[0.7rem] tracking-[0.35em] text-gold uppercase sm:text-xs">{children}</p>;
}

export function GoldButton({ children, className = "", ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={`group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-gold-foil px-7 py-3 font-display text-xs font-semibold tracking-[0.2em] text-forest uppercase shadow-gold transition-transform duration-300 hover:scale-[1.03] active:scale-95 disabled:opacity-50 ${className}`}
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-ivory/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative flex items-center gap-2">{children}</span>
    </button>
  );
}

export function OutlineButton({ children, className = "", ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-gold/60 px-7 py-3 font-display text-xs tracking-[0.2em] text-gold uppercase transition-colors duration-300 hover:bg-gold/10 active:scale-95 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
