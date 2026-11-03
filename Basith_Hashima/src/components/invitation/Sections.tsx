import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CalendarPlus, Heart, MapPin, Navigation, X } from "lucide-react";
import { buildICS, rsvpMessage, timeLeft, wedding, whatsappLink } from "@/config/wedding";
import { Divider, Eyebrow, FloralCorner, GoldButton, OutlineButton, Reveal, StarMotif } from "./Ornaments";
import archHero from "@/assets/arch-hero.jpg";
import venueImg from "@/assets/venue.jpg";

const c = wedding.coupleShort;

function SectionShell({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`relative z-20 mx-auto w-full max-w-5xl px-5 py-24 sm:py-32 ${className}`}>
      {children}
    </section>
  );
}

export function GuestGreeting({ guest }: { guest: string }) {
  return (
    <SectionShell className="text-center">
      <Reveal>
        <p className="font-serif text-2xl text-cream/80 italic">Dear</p>
        <h2 className="mt-2 font-script text-5xl leading-tight break-words text-gold-foil sm:text-6xl">{guest}</h2>
        <Divider className="my-8" />
        <p className="mx-auto max-w-xl font-serif text-xl text-ivory sm:text-2xl">You are warmly invited to celebrate a beautiful beginning.</p>
        <p className="mx-auto mt-5 max-w-xl font-serif text-lg leading-relaxed text-cream/75">
          With the blessings of Allah, two families come together to celebrate a lifetime of love, companionship, and togetherness.
        </p>
      </Reveal>
    </SectionShell>
  );
}

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return (
    <section ref={ref} className="relative z-20 flex min-h-[100svh] items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0 scale-110" style={{ y: bgY }}>
        <img src={archHero} alt="" width={1024} height={1536} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/70 via-forest/30 to-forest" />
      </motion.div>
      <motion.div style={{ y: textY, opacity: fade }} className="relative px-5 pt-16 pb-24 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 0.3 }}>
          <Eyebrow>With the blessings of Allah</Eyebrow>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-script leading-[1.05] drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
        >
          <span className="block text-6xl text-gold-foil sm:text-8xl">{c.groom}</span>
          <span className="my-1 block font-serif text-3xl text-cream italic sm:text-4xl">&</span>
          <span className="block text-6xl text-gold-foil sm:text-8xl">{c.bride}</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: 1.6 }} className="mx-auto mt-8 max-w-md font-serif text-lg text-ivory/90 italic sm:text-xl">
          “Two hearts, one beautiful journey, united by faith and love.”
        </motion.p>
        <motion.figure initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 2 }} className="relative mx-auto mt-10 max-w-xs rounded-t-full border border-gold/50 bg-forest/50 px-6 pt-10 pb-6 backdrop-blur-sm">
          <StarMotif size={28} className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-forest text-gold" />
          <blockquote className="font-serif text-xl text-ivory italic">“And We created you in pairs.”</blockquote>
          <figcaption className="mt-2 font-display text-[0.65rem] tracking-[0.3em] text-gold uppercase">Qur'an 78:8</figcaption>
        </motion.figure>
      </motion.div>
    </section>
  );
}

function PersonCard({ title, p }: { title: string; p: typeof wedding.groom }) {
  return (
    <motion.div whileHover={{ y: -6, rotateX: 3 }} transition={{ type: "spring", stiffness: 200 }} className="relative w-full max-w-sm" style={{ perspective: 800 }}>
      <div className="arch-mask relative overflow-hidden border border-gold/70 bg-gradient-to-b from-emerald to-emerald-deep p-2 shadow-deep">
        <div className="arch-mask relative border border-gold/40 px-6 pt-20 pb-10 text-center islamic-pattern">
          <FloralCorner className="absolute bottom-2 left-2 h-12 w-12 -scale-y-100 text-gold/60" />
          <FloralCorner className="absolute right-2 bottom-2 h-12 w-12 -scale-100 text-gold/60" />
          <Eyebrow>{title}</Eyebrow>
          <h3 className="mt-4 font-script text-5xl leading-tight text-gold-foil">{p.name}</h3>
          <p className="mt-5 font-serif text-base text-cream/70 italic">{p.relation}</p>
          <p className="mt-1 font-serif text-xl text-ivory">{p.parents}</p>
          {p.address && (
            <div className="mt-5 font-display text-[0.7rem] leading-relaxed tracking-[0.2em] text-cream/70 uppercase">
              {p.address.map((l) => <p key={l}>{l}</p>)}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function CoupleDetails() {
  return (
    <SectionShell className="text-center">
      <Reveal>
        <Eyebrow>The blessed couple</Eyebrow>
        <h2 className="mt-3 font-serif text-4xl text-ivory sm:text-5xl">Two Families, United</h2>
        <Divider className="mt-6 mb-14" />
      </Reveal>
      <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:items-stretch md:gap-6">
        <Reveal className="flex w-full justify-center"><PersonCard title="The Groom" p={wedding.groom} /></Reveal>
        <Reveal delay={0.2} className="flex shrink-0 items-center justify-center">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 bg-forest shadow-gold">
            <Heart className="h-5 w-5 fill-gold text-gold" />
            <StarMotif size={64} className="absolute animate-[spin_30s_linear_infinite] text-gold/40" />
          </div>
        </Reveal>
        <Reveal delay={0.35} className="flex w-full justify-center"><PersonCard title="The Bride" p={wedding.bride} /></Reveal>
      </div>
    </SectionShell>
  );
}

export function CountdownTimer() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const t = timeLeft(now);
  if (t.done) return <p className="font-script text-4xl text-gold-foil sm:text-5xl">Alhamdulillah, the beautiful day has arrived.</p>;
  const items: [string, number][] = [["Days", t.days], ["Hours", t.hours], ["Minutes", t.minutes], ["Seconds", t.seconds]];
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4" role="timer" aria-live="off">
      {items.map(([label, v]) => (
        <div key={label} className="rounded-lg border border-gold/40 bg-emerald-deep/70 px-1 py-4 backdrop-blur-sm sm:px-4">
          <motion.p key={v} initial={{ rotateX: -90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="font-display text-3xl text-gold-foil tabular-nums sm:text-5xl">
            {String(v).padStart(2, "0")}
          </motion.p>
          <p className="mt-1 font-display text-[0.55rem] tracking-[0.2em] text-cream/70 uppercase sm:text-xs">{label}</p>
        </div>
      ))}
    </div>
  );
}

function downloadICS() {
  const blob = new Blob([buildICS()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "basith-hashima-wedding.ics";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function WeddingDate() {
  const d = wedding.dateParts;
  return (
    <SectionShell className="text-center">
      <Reveal>
        <Eyebrow>Nikkah celebration</Eyebrow>
        <h2 className="mt-3 font-script text-6xl text-gold-foil sm:text-7xl">Save the Date</h2>
      </Reveal>
      <Reveal delay={0.15} className="mt-12 flex justify-center" style={{ perspective: 1000 }}>
        <motion.div
          initial={{ rotateX: 25, rotateY: -15 }}
          whileInView={{ rotateX: 8, rotateY: 0 }}
          whileHover={{ rotateX: 0, rotateY: 8 }}
          transition={{ duration: 1.2 }}
          className="relative w-64 rounded-xl border border-gold/70 bg-ivory text-forest shadow-deep sm:w-72"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="flex items-center justify-around rounded-t-xl bg-gold-foil py-3">
            {[0, 1].map((i) => <span key={i} className="h-3 w-3 rounded-full bg-forest/70 shadow-inner" />)}
          </div>
          <p className="pt-4 font-display text-sm tracking-[0.4em] text-emerald uppercase">{d.month}</p>
          <p className="font-display text-[7.5rem] leading-none font-medium text-emerald-deep" style={{ transform: "translateZ(30px)" }}>{d.day}</p>
          <p className="font-display text-lg tracking-[0.3em] text-emerald">{d.year}</p>
          <div className="mx-6 my-3 h-px bg-gold" />
          <p className="font-display text-xs tracking-[0.35em] text-emerald uppercase">{d.weekday}</p>
          <p className="pt-1 pb-5 font-serif text-xl text-emerald-deep italic">{d.time}</p>
        </motion.div>
      </Reveal>
      <Reveal delay={0.3} className="mx-auto mt-14 max-w-xl">
        <CountdownTimer />
        <GoldButton onClick={downloadICS} className="mt-10">
          <CalendarPlus className="h-4 w-4" /> Add to calendar
        </GoldButton>
      </Reveal>
    </SectionShell>
  );
}

export function VenueSection() {
  const v = wedding.venue;
  return (
    <SectionShell className="text-center">
      <Reveal>
        <Eyebrow>The venue</Eyebrow>
        <h2 className="mt-3 font-serif text-4xl text-ivory sm:text-5xl">Join Us at the Celebration</h2>
        <Divider className="mt-6 mb-12" />
      </Reveal>
      <Reveal delay={0.1}>
        <div className="arch-mask relative mx-auto max-w-2xl overflow-hidden border border-gold/60 p-2 shadow-deep">
          <div className="arch-mask relative overflow-hidden">
            <img src={venueImg} alt="Illustration of an elegant nikkah venue" width={1280} height={800} loading="lazy" className="aspect-[4/5] w-full object-cover sm:aspect-[16/11]" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <MapPin className="mx-auto h-6 w-6 text-gold" />
              <h3 className="mt-3 font-display text-3xl tracking-[0.15em] text-gold-foil uppercase sm:text-4xl">{v.name}</h3>
              <p className="mt-1 font-serif text-xl text-ivory italic">{v.place}</p>
              <p className="mt-4 font-display text-xs tracking-[0.25em] text-cream/80 uppercase">{wedding.dateParts.long} · {wedding.dateParts.time}</p>
            </div>
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.2} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a href={v.mapsUrl} target="_blank" rel="noopener noreferrer"><GoldButton tabIndex={-1}><MapPin className="h-4 w-4" /> View location</GoldButton></a>
        <a href={v.mapsUrl} target="_blank" rel="noopener noreferrer"><OutlineButton tabIndex={-1}><Navigation className="h-4 w-4" /> Get directions</OutlineButton></a>
      </Reveal>
      <Reveal delay={0.3} className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-xl border border-gold/40">
        <iframe
          title="Map preview of the venue"
          src={`https://www.google.com/maps?q=${encodeURIComponent(v.mapsEmbedQuery)}&output=embed`}
          className="h-64 w-full grayscale-[40%] sepia-[20%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Reveal>
    </SectionShell>
  );
}

export function RSVPSection({ guest }: { guest: string }) {
  const [sent, setSent] = useState<null | boolean>(null);
  const ready = !!whatsappLink(true);
  const go = (yes: boolean) => {
    const link = whatsappLink(yes, guest);
    setSent(yes);
    if (link) window.open(link, "_blank", "noopener");
  };
  return (
    <SectionShell className="text-center">
      <Reveal>
        <div className="relative mx-auto max-w-2xl rounded-2xl border border-gold/50 bg-emerald-deep/60 px-6 py-14 shadow-deep backdrop-blur-sm sm:px-12">
          <FloralCorner className="absolute top-2 left-2 h-14 w-14 text-gold/50" />
          <FloralCorner className="absolute top-2 right-2 h-14 w-14 -scale-x-100 text-gold/50" />
          <Eyebrow>RSVP</Eyebrow>
          <h2 className="mt-3 font-script text-5xl text-gold-foil sm:text-6xl">Will You Be There?</h2>
          <p className="mx-auto mt-5 max-w-md font-serif text-lg leading-relaxed text-cream/80">
            Your presence will make our special day even more memorable. We would be delighted to celebrate this beautiful occasion with you.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <GoldButton onClick={() => go(true)}><Heart className="h-4 w-4" /> Yes, I'll be there</GoldButton>
            <OutlineButton onClick={() => go(false)}><X className="h-4 w-4" /> Sorry, I can't make it</OutlineButton>
          </div>
          {sent !== null && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto mt-6 max-w-md font-serif text-base text-cream/80 italic">
              {ready
                ? sent ? "JazakAllahu khairan! We can't wait to celebrate with you." : "JazakAllahu khairan for your kind prayers."
                : `JazakAllahu khairan! Please share your reply with the family: “${rsvpMessage(sent, guest)}”`}
            </motion.p>
          )}
        </div>
      </Reveal>
    </SectionShell>
  );
}

export function ClosingSection() {
  return (
    <section className="relative z-20 overflow-hidden">
      <img src={archHero} alt="" width={1024} height={1536} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-forest via-forest/70 to-forest" />
      <div className="relative mx-auto max-w-3xl px-5 py-28 text-center sm:py-36">
        <Reveal>
          <p className="font-serif text-2xl text-ivory italic sm:text-3xl">Two families, one beautiful beginning, and a lifetime of blessings.</p>
          <p className="mx-auto mt-5 max-w-xl font-serif text-lg text-cream/80">May Allah bless this union with endless love, mercy, happiness, understanding, and tranquillity.</p>
          <Divider className="my-10" />
        </Reveal>
        <Reveal delay={0.15}>
          <p dir="rtl" lang="ar" className="font-arabic text-3xl leading-loose text-gold-foil sm:text-4xl">بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ</p>
          <p className="mx-auto mt-4 max-w-lg font-serif text-lg text-cream/80 italic">“May Allah bless you both, shower His blessings upon you, and unite you both in goodness.”</p>
        </Reveal>
        <Reveal delay={0.3} className="mt-16">
          <h2 className="font-script text-5xl leading-tight text-gold-foil sm:text-7xl">{c.groom} & {c.bride}</h2>
          <p className="mt-4 font-display text-lg tracking-[0.4em] text-gold">{wedding.dateParts.dots}</p>
          <p className="mt-6 font-serif text-xl text-ivory italic">With love and prayers.</p>
        </Reveal>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-12 flex justify-center">
          <svg width="160" height="90" viewBox="-10 -10 160 90" className="shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
            {[0, 30, 60, 90, 120, 150, 180].map((a) => (
              <g key={a} transform={`rotate(${a - 90} 70 66)`}>
                <motion.path d="M70 66C70 46 60 30 70 10C80 30 70 46 70 66Z"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, delay: a / 200, ease: "easeInOut" }} />
              </g>
            ))}
            <circle cx="70" cy="66" r="3" fill="currentColor" />
          </svg>
        </motion.div>
      </div>
      <div className="h-24 bg-gradient-to-b from-transparent to-forest" />
    </section>
  );
}
