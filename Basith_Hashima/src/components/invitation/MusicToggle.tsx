import { Music, VolumeX } from "lucide-react";

// Playback logic lives in useWeddingMusic; the music file is public/music/wedding.mp3
// (configured in src/config/wedding.ts). Music starts when the invitation opens.
interface MusicToggleProps {
  playing: boolean;
  onToggle: () => void;
}

export function MusicToggle({ playing, onToggle }: MusicToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={playing ? "Mute music" : "Play music"}
      className="fixed right-4 bottom-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-forest/80 text-gold shadow-gold backdrop-blur-md transition-transform hover:scale-105"
    >
      {playing ? <Music className="h-5 w-5 animate-pulse" /> : <VolumeX className="h-5 w-5" />}
    </button>
  );
}
