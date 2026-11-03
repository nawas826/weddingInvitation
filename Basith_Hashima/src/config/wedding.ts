// Central wedding configuration. Edit details here only.
export interface Person {
  name: string;
  relation: string;
  parents: string;
  address?: string[];
}

export interface WeddingConfig {
  groom: Person;
  bride: Person;
  coupleShort: { groom: string; bride: string };
  dateISO: string; // with IST offset
  timezone: string;
  dateParts: { day: string; month: string; year: string; weekday: string; time: string; dots: string; long: string };
  venue: { name: string; place: string; mapsUrl: string; mapsEmbedQuery: string };
  /** WhatsApp number in international format, digits only (e.g. "919876543210"). Leave empty until provided. */
  whatsappNumber: string;
  defaultGuest: string;
  /** Background music: place your audio file at public/music/wedding.mp3 (MP3/WAV/OGG) or change src below. */
  music: { src: string; volume: number };
}

export const wedding: WeddingConfig = {
  groom: {
    name: "Basith CK",
    relation: "Son of",
    parents: "Abdul Azeez & Bushra",
    address: ["Valappil House", "Tirur, Malappuram"],
  },
  bride: {
    name: "Hashima Sherin PK",
    relation: "Daughter of",
    parents: "Shabeerali PK & Sainaba",
  },
  coupleShort: { groom: "Basith CK", bride: "Hashima Sherin" },
  dateISO: "2026-11-21T11:00:00+05:30",
  timezone: "Asia/Kolkata",
  dateParts: {
    day: "21",
    month: "November",
    year: "2026",
    weekday: "Saturday",
    time: "11:00 AM",
    dots: "21 • 11 • 2026",
    long: "21 November 2026",
  },
  venue: {
    name: "Planet Auditorium",
    place: "Parapputhadam",
    mapsUrl: "https://maps.app.goo.gl/XUPNNwSp3Kpjeiqq9",
    mapsEmbedQuery: "Planet Auditorium Parapputhadam",
  },
  whatsappNumber: "",
  defaultGuest: "Family & Friends",
  music: { src: "music/wedding.mp3", volume: 0.55 },
};

export function rsvpMessage(attending: boolean, guest?: string) {
  const c = wedding.coupleShort;
  const from = guest && guest !== wedding.defaultGuest ? ` This is ${guest}.` : "";
  return attending
    ? `Assalamu Alaikum!${from} I am happy to confirm my attendance at the nikkah of ${c.groom} and ${c.bride} on ${wedding.dateParts.long} at ${wedding.dateParts.time}.`
    : `Assalamu Alaikum!${from} Thank you for inviting me. Unfortunately, I won't be able to attend the nikkah of ${c.groom} and ${c.bride}. My heartfelt wishes and prayers are with the couple.`;
}

export function whatsappLink(attending: boolean, guest?: string): string | null {
  const n = wedding.whatsappNumber.replace(/\D/g, "");
  if (!n) return null;
  return `https://wa.me/${n}?text=${encodeURIComponent(rsvpMessage(attending, guest))}`;
}

export function timeLeft(now: number, target = Date.parse(wedding.dateISO)) {
  const ms = Math.max(0, target - now);
  return {
    done: target - now <= 0,
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

export function buildICS(): string {
  const start = new Date(wedding.dateISO);
  const end = new Date(start.getTime() + 4 * 3600000);
  const f = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const c = wedding.coupleShort;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Basith Hashima Wedding//EN",
    "BEGIN:VEVENT",
    `UID:basith-hashima-20261121@wedding`,
    `DTSTAMP:${f(new Date())}`,
    `DTSTART:${f(start)}`,
    `DTEND:${f(end)}`,
    `SUMMARY:Nikkah of ${c.groom} & ${c.bride}`,
    `LOCATION:${wedding.venue.name}\\, ${wedding.venue.place}`,
    `DESCRIPTION:Location: ${wedding.venue.mapsUrl}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
