export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  genre: string;
  date: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  coverImage: string;
  spotifyUrl: string;
  duration: string;
  vibe: string;
}

export const MUSIC_LIBRARY_ITEMS: MusicTrack[] = [
  {
    id: "beyond-surface",
    title: "Beyond the Surface",
    artist: "Parallel Audio",
    genre: "Augmented Reality",
    date: "01 sep",
    bgColor: "#0ea59a", // Exact emerald turquoise from media_1790592549456.png
    textColor: "#000000",
    accentColor: "#2dd4bf",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80",
    spotifyUrl: "https://open.spotify.com",
    duration: "3:45",
    vibe: "Spatial Ambience / Future Bass",
  },
  {
    id: "parallel-worlds",
    title: "Parallel Worlds",
    artist: "Fairytale Traps",
    genre: "UX/UI Design",
    date: "01 sep",
    bgColor: "#8555f8", // Signature vibrant Skiper24 lavender purple
    textColor: "#000000",
    accentColor: "#facc15",
    coverImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1000&q=80",
    spotifyUrl: "https://open.spotify.com",
    duration: "4:12",
    vibe: "Experimental / Glitch / Ambient",
  },
  {
    id: "dark-side-moon",
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    genre: "Progressive Rock",
    date: "1973",
    bgColor: "#6366f1", // Deep electric indigo
    textColor: "#07071f",
    accentColor: "#38bdf8",
    coverImage: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=1000&q=80",
    spotifyUrl: "https://open.spotify.com/album/4waRx4B15gq73Qsm0wT09f",
    duration: "42:50",
    vibe: "Atmospheric / Prism / Masterpiece",
  },
  {
    id: "blonde",
    title: "Blonde",
    artist: "Frank Ocean",
    genre: "R&B / Avant-Pop",
    date: "2016",
    bgColor: "#608658", // Organic olive meadow
    textColor: "#081409",
    accentColor: "#bef264",
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80",
    spotifyUrl: "https://open.spotify.com/album/3mH6qwIy9crq0I9YQbOuDf",
    duration: "60:08",
    vibe: "Introspective / Warm / Acoustic Soul",
  },
  {
    id: "currents",
    title: "Currents",
    artist: "Tame Impala",
    genre: "Psychedelic Rock",
    date: "2015",
    bgColor: "#a855f7", // Hypnotic magenta purple
    textColor: "#120524",
    accentColor: "#e879f9",
    coverImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1000&q=80",
    spotifyUrl: "https://open.spotify.com/album/79dL7FLiJFOO0Eoeh0Far0",
    duration: "51:12",
    vibe: "Swirling Synths / Phasers / Groove",
  },
  {
    id: "random-access-memories",
    title: "Random Access Memories",
    artist: "Daft Punk",
    genre: "Electronic / Disco",
    date: "2013",
    bgColor: "#eab308", // Golden electrum
    textColor: "#1c1402",
    accentColor: "#fef08a",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",
    spotifyUrl: "https://open.spotify.com/album/4m2880jivSbbyEGAKfITCa",
    duration: "74:24",
    vibe: "Analog Studio / Robotic Harmony",
  },
  {
    id: "after-hours",
    title: "After Hours",
    artist: "The Weeknd",
    genre: "Synthwave / Dark Pop",
    date: "2020",
    bgColor: "#dc2626", // Blood red neon
    textColor: "#1a0303",
    accentColor: "#fca5a5",
    coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=80",
    spotifyUrl: "https://open.spotify.com/album/4yP0hdKOJeuuhStVUmAylD",
    duration: "56:19",
    vibe: "Cinematic Noir / 80s Reverberation",
  },
  {
    id: "ok-computer",
    title: "OK Computer",
    artist: "Radiohead",
    genre: "Alternative Rock",
    date: "1997",
    bgColor: "#0284c7", // Glacial sky cyan
    textColor: "#031424",
    accentColor: "#bae6fd",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80",
    spotifyUrl: "https://open.spotify.com/album/6dVIqQ8qmQ5GBnJ9shOYGE",
    duration: "53:21",
    vibe: "Dystopian / Melodic Distortion",
  },
  {
    id: "igor",
    title: "IGOR",
    artist: "Tyler, The Creator",
    genre: "Neo-Soul / Hip Hop",
    date: "2019",
    bgColor: "#ec4899", // Pastel punch pink
    textColor: "#210416",
    accentColor: "#fbcfe8",
    coverImage: "https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?auto=format&fit=crop&w=1000&q=80",
    spotifyUrl: "https://open.spotify.com/album/5zi7WsKlIiUXv09tbGLKsE",
    duration: "39:43",
    vibe: "Raw Emotion / Lo-fi Chords / Distortion",
  },
  {
    id: "in-rainbows",
    title: "In Rainbows",
    artist: "Radiohead",
    genre: "Art Rock",
    date: "2007",
    bgColor: "#ea580c", // Solar fire tangerine
    textColor: "#1f0902",
    accentColor: "#fed7aa",
    coverImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80",
    spotifyUrl: "https://open.spotify.com/album/5vkqYmiPIGWEalfdRuwr3v",
    duration: "42:39",
    vibe: "Lush Poly-rhythms / Timeless Warmth",
  },
  {
    id: "swimming",
    title: "Swimming",
    artist: "Mac Miller",
    genre: "Conscious Rap",
    date: "2018",
    bgColor: "#0d9488", // Deep oceanic teal
    textColor: "#031715",
    accentColor: "#99f6e4",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    spotifyUrl: "https://open.spotify.com/album/5wtE5YWkqqPvaTeBY4mXHg",
    duration: "58:38",
    vibe: "Poignant Jazz / Healing Self-Reflection",
  },
  {
    id: "discovery",
    title: "Discovery",
    artist: "Daft Punk",
    genre: "French Touch House",
    date: "2001",
    bgColor: "#2563eb", // Deep hyper cobalt
    textColor: "#050e26",
    accentColor: "#93c5fd",
    coverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80",
    spotifyUrl: "https://open.spotify.com/album/2noRn2Aes5aoNVsU6iWThc",
    duration: "60:50",
    vibe: "Nostalgic Voyage / One More Time",
  },
  {
    id: "to-pimp-a-butterfly",
    title: "To Pimp a Butterfly",
    artist: "Kendrick Lamar",
    genre: "Jazz Rap / Funk",
    date: "2015",
    bgColor: "#78716c", // Earthy granite sepia
    textColor: "#12100e",
    accentColor: "#e7e5e4",
    coverImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80",
    spotifyUrl: "https://open.spotify.com/album/7ycBtnsMtyVbbw3fRypxc5",
    duration: "78:51",
    vibe: "Free Jazz / Sociopolitical Symphony",
  },
];
