import { Project, YouTubeVideo, ClothingItem, DigitalCreation } from "./types";

export const DEV_SKILLS = [
  { name: "React", category: "Frameworks", level: 95 },
  { name: "JavaScript / ES6+", category: "Languages", level: 95 },
  { name: "TypeScript", category: "Languages", level: 90 },
  { name: "HTML5 / CSS3", category: "Languages", level: 98 },
  { name: "Tailwind CSS", category: "UI & Styling", level: 98 },
  { name: "Next.js", category: "Frameworks", level: 85 },
  { name: "Framer Motion", category: "UI & Styling", level: 90 },
  { name: "Vite & Build Tools", category: "Tools", level: 88 },
  { name: "Responsive UI Architecture", category: "Design", level: 95 },
  { name: "Performance Optimization", category: "Engineering", level: 85 },
];

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Verve Canvas - Interactive Creative Builder",
    description: "A highly customized design studio and canvas editor built entirely in React, allowing digital creators to arrange, rotate, and style typographical templates and coordinate brand exports.",
    tags: ["React", "HTML5 Canvas", "Framer Motion", "Tailwind CSS"],
    featured: true,
  },
  {
    id: "p2",
    title: "ThreadCore Commerce Engine",
    description: "The custom full-stack e-commerce engine behind my clothing brand, designed with custom smooth page transitions, pre-loaded cart architecture, and responsive layouts.",
    tags: ["React", "Vite", "Node.js", "Express", "Tailwind CSS"],
    featured: true,
  },
  {
    id: "p3",
    title: "Chronos Parallax Space Engine",
    description: "An immersive 3D-space timeline browser showcasing architectural milestones with deep inertia-scroll mechanics and custom CSS matrix parallax shifts.",
    tags: ["TypeScript", "React", "Framer Motion", "Tailwind CSS"],
    featured: true,
  },
  {
    id: "p4",
    title: "SleekMotion UI Component Ecosystem",
    description: "A beautiful, lightweight library of micro-interactions, spring physics cards, and fluid interactive responsive panels for React projects.",
    tags: ["TypeScript", "React", "Framer Motion", "Tailwind CSS"],
    featured: false,
  },
  {
    id: "p5",
    title: "GridCraft Canvas IDE & Flex Matrix",
    description: "An ultra-performant drag-and-drop web page layout engine with interactive flex grid models, viewport adjustments, and raw clean tailwind class export code.",
    tags: ["React", "HTML5 Canvas", "TypeScript", "Tailwind CSS"],
    featured: false,
  },
  {
    id: "p6",
    title: "Spectral MIDI Keyboard Emulator",
    description: "A digital audio workspace and piano emulator that translates local and MIDI keyboard input into gorgeous canvas spectral wave patterns.",
    tags: ["Web Audio API", "Web MIDI", "JavaScript", "HTML5 Canvas"],
    featured: false,
  },
  {
    id: "p7",
    title: "Vapor Wave CSS generative synth graphics",
    description: "A digital CSS art space displaying dynamic visual loops reflecting keyboard audio synth controls.",
    tags: ["JavaScript", "HTML3 / CSS3", "Web Audio API"],
    featured: false,
  },
];

export const YOUTUBE_VIDEOS: YouTubeVideo[] = [
  {
    id: "yt1",
    title: "How I Built My Premium Streetwear Shop from Scratch (Dev Vlog)",
    viewCount: "42.5K views",
    publishedAt: "2 weeks ago",
    thumbnailUrl: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=80",
    category: "Lifestyle",
    url: "https://youtube.com",
    duration: "14:22"
  },
  {
    id: "yt2",
    title: "React Spring & Framer Motion Tutorial: Master Fluid Web Animations",
    viewCount: "128K views",
    publishedAt: "1 month ago",
    thumbnailUrl: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=600&q=80",
    category: "Code",
    url: "https://youtube.com",
    duration: "25:40"
  },
  {
    id: "yt3",
    title: "A Day in the Life of a Frontend Developer & Clothing Brand Owner",
    viewCount: "95K views",
    publishedAt: "2 months ago",
    thumbnailUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
    category: "Lifestyle",
    url: "https://youtube.com",
    duration: "18:05"
  },
  {
    id: "yt4",
    title: "Is Tailwind CSS v4 actually faster? Speed test & migration review",
    viewCount: "34K views",
    publishedAt: "3 months ago",
    thumbnailUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
    category: "Tech Review",
    url: "https://youtube.com",
    duration: "12:15"
  },
];

export const CLOTHING_CATALOG: ClothingItem[] = [
  {
    id: "c1",
    name: "CORE OVERSIZED HOODIE",
    price: 85.00,
    category: "Hoodies",
    description: "450GSM Ultra-heavyweight organic combed cotton loopback French terry. Cut-and-sew relaxed drop shoulder fit, bespoke technical embroidery overlay on the chest.",
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=80",
    sizes: ["S", "M", "L", "XL"],
    inStock: true
  },
  {
    id: "c2",
    name: "0x1A REACT ARCHIVE TEE",
    price: 45.00,
    category: "Tees",
    description: "280GSM heavy-weight compact jersey tee. Graphic representation of structural virtual DOM node diff cycles printed in high-density matte puff ink on mid-tone slate grey.",
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80",
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true
  },
  {
    id: "c3",
    name: "INDEX SIGNATURE CAP",
    price: 32.00,
    category: "Accessories",
    description: "Premium washed cotton 6-panel unstructured cap. Featuring subtle tone-on-tone embroidered 'import { Core }' declaration on front panels and adjustable metal clasp.",
    imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=500&q=80",
    sizes: ["One Size"],
    inStock: true
  },
  {
    id: "c4",
    name: "THREADCORE REVERSIBLE MA-1 FLIGHT JACKET",
    price: 185.00,
    category: "Hoodies",
    description: "Luxe waterproof flight nylon outer with high-density poly insulation. Side A: Sleek minimalist black; Side B: Glowing emergency CSS warning orange. Utility arm pocket with cord-grip pullers.",
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80",
    sizes: ["M", "L", "XL"],
    inStock: false
  }
];

export const DIGITAL_CREATIONS: DigitalCreation[] = [
  {
    id: "dc1",
    title: "Typography Shift Canvas",
    type: "Typography",
    description: "A fluid variable font playground displaying words reacting to cursor-velocity and mouse proximity, rendering clean grids that self-organize elegantly.",
    colorHex: "#f0fdf4" // soft emerald
  },
  {
    id: "dc2",
    title: "Neo-Brutalist Layout Grid",
    type: "Design Mock",
    description: "An experimental responsive web layout pairing harsh Swiss border grids with vibrant primary stickers, exploring physical weight representations.",
    colorHex: "#fef2f2" // soft red
  },
  {
    id: "dc3",
    title: "Audio Wave Visualizer SVG",
    type: "Interactive",
    description: "Real-time reactive Bezier curve graphics mapped directly to device input microphone frequencies, displaying floating micro-shapes.",
    colorHex: "#eff6ff" // soft blue
  },
  {
    id: "dc4",
    title: "CSS-Only Orbit Physics",
    type: "Web Art",
    description: "A self-contained solar solar arrangement utilizing custom CSS transform-3d keyframes and composite clip-paths to simulate dynamic depth perspective.",
    colorHex: "#faf5ff" // soft purple
  }
];

export const PRESET_PROMPTS = [
  "What is your clothing brand's philosophy?",
  "Tell me about your tech stack and experience.",
  "How do you manage software, YouTube, and clothing all at once?",
  "Are you open to contract frontend work?",
  "What's your advice for starting a YouTube channel?"
];
