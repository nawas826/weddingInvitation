import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useEffect, useState } from "react";
import { wedding } from "@/config/wedding";
import { InvitationEnvelope } from "@/components/invitation/InvitationEnvelope";
import { MusicToggle } from "@/components/invitation/MusicToggle";
import { useWeddingMusic } from "@/hooks/useWeddingMusic";
import { ClosingSection, CoupleDetails, GuestGreeting, HeroSection, RSVPSection, VenueSection, WeddingDate } from "@/components/invitation/Sections";

const FloatingDecorations = lazy(() => import("@/components/invitation/FloatingDecorations"));

export const Route = createFileRoute("/")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>): { guest?: string } => (typeof s["guest"] === "string" ? { guest: s["guest"] } : {}),
  head: () => ({
    meta: [
      { title: "Basith CK & Hashima Sherin · Wedding Invitation · 21 November 2026" },
      { name: "description", content: "With the blessings of Allah, you are cordially invited to the wedding of Basith CK & Hashima Sherin on 21 November 2026 at Planet Auditorium, Parapputhadam." },
      { property: "og:title", content: "Basith CK & Hashima Sherin · Wedding Invitation" },
      { property: "og:description", content: "You are cordially invited · 21 November 2026 · 11:00 AM · Planet Auditorium, Parapputhadam" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

function Invitation() {
  const { guest } = Route.useSearch();
  const guestName = guest?.trim() || wedding.defaultGuest;
  const [opened, setOpened] = useState(false);
  const music = useWeddingMusic();
  const [lowPower, setLowPower] = useState(false);
  useEffect(() => {
    setLowPower(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  useEffect(() => {
    if (opened) window.scrollTo(0, 0);
    document.body.style.overflow = opened ? "" : "hidden";
  }, [opened]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-forest" data-scene-ready>
      {!lowPower && (
        <Suspense fallback={null}>
          <FloatingDecorations petals={opened} />
        </Suspense>
      )}
      <AnimatePresence>
        {!opened && <InvitationEnvelope key="env" onOpened={() => { setOpened(true); music.start(); }} />}
      </AnimatePresence>
      {opened && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
          <GuestGreeting guest={guestName} />
          <HeroSection />
          <CoupleDetails />
          <WeddingDate />
          <VenueSection />
          <RSVPSection guest={guestName} />
          <ClosingSection />
          <MusicToggle playing={music.playing} onToggle={music.toggle} />
        </motion.div>
      )}
    </main>
  );
}
