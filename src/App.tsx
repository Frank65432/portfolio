import { useState, useEffect } from "react";
import { 
  Code, 
  Youtube, 
  Tag, 
  Palette, 
  Github, 
  Twitter, 
  Instagram, 
  Mail, 
  Check,
  Cpu,
  Layers,
  Activity,
  Phone,
  Radio,
  ExternalLink,
  ChevronRight,
  Layout
} from "lucide-react";
import SoftwareSection from "./components/SoftwareSection";
import YouTubeSection from "./components/YouTubeSection";
import ClothingBrandSection from "./components/ClothingBrandSection";
import CreatorSection from "./components/CreatorSection";
import FigmaSection from "./components/FigmaSection";
import AITwinChat from "./components/AITwinChat";

type TabChoice = "software" | "youtube" | "clothing" | "creator" | "figma";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabChoice>("software");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showFullStory, setShowFullStory] = useState(false);
  const [systemUptime, setSystemUptime] = useState("00:00:00");
  const [cpuLoad, setCpuLoad] = useState(4);
  const [theme, setTheme] = useState<"emerald" | "void" | "light">(() => {
    const saved = localStorage.getItem("frank_portfolio_theme");
    return (saved === "void" || saved === "emerald" || saved === "light") 
      ? (saved as "void" | "emerald" | "light") 
      : "light";
  });

  // Track the active system theme class
  useEffect(() => {
    localStorage.setItem("frank_portfolio_theme", theme);
    document.documentElement.classList.remove("theme-void", "theme-light");
    if (theme === "void") {
      document.documentElement.classList.add("theme-void");
    } else if (theme === "light") {
      document.documentElement.classList.add("theme-light");
    }
  }, [theme]);

  // Simulate a live digital system monitoring telemetry (similar to ZeBeyond calculations)
  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const diff = Date.now() - startTime;
      const hrs = String(Math.floor(diff / 3600000)).padStart(2, "0");
      const mins = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
      const secs = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
      setSystemUptime(`${hrs}:${mins}:${secs}`);
      
      // Gentle fluctuation for lively UI
      setCpuLoad(Math.floor(Math.sin(Date.now() / 2000) * 3) + 6);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("frankmarvin518@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2005);
    window.location.href = "mailto:frankmarvin518@gmail.com";
  };

  const handleQuickTwinPrompt = (prompt: string) => {
    console.log("Auto-prompted AI Twin:", prompt);
  };

  return (
    <div className="min-h-screen bg-[var(--theme-bg-base)] text-[var(--theme-text)] bg-tech-grid relative overflow-hidden flex flex-col font-sans selection:bg-[var(--selection-bg)] selection:text-[var(--selection-text)] transition-colors duration-500">
      
      {/* Decorative ambient glowing grids behind cards */}
      <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none select-none transition-all duration-500 ${theme === 'void' ? 'bg-zinc-500/3' : theme === 'light' ? 'bg-emerald-500/3' : 'bg-emerald-500/5'}`}></div>
      <div className={`absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none select-none transition-all duration-500 ${theme === 'void' ? 'bg-neutral-500/3' : theme === 'light' ? 'bg-emerald-600/3' : 'bg-emerald-600/5'}`}></div>
      
      {/* Dynamic top ticker signaling active telemetry */}
      <div className="w-full bg-[var(--theme-navbar-bg)] border-b border-[var(--theme-border)] px-6 py-2 flex justify-between items-center text-[9px] font-mono uppercase tracking-[0.2em] text-[var(--theme-accent)] transition-all">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${theme === 'void' ? 'bg-zinc-400' : 'bg-emerald-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${theme === 'void' ? 'bg-zinc-200' : 'bg-emerald-500'}`}></span>
          </span>
          <span>SYSTEM_ONLINE // ZE_BEYOND_ENGINEv2 // COLOR_THEME: {theme.toUpperCase()}</span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-neutral-400">
          <span>COORDINATES: 51.5074° N, 0.1278° W</span>
          <span>CPU_CORE: {cpuLoad}%</span>
          <span>UPTIME: {systemUptime}</span>
        </div>
      </div>

      {/* Styled Micro-Header */}
      <header className="flex flex-col lg:flex-row justify-between items-center px-6 py-8 md:px-12 border-b border-[var(--theme-border)] bg-[var(--theme-bg-card)] backdrop-blur-md gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[var(--theme-accent)] to-[var(--theme-accent-hover)] p-[1.5px] shadow-[0_0_20px_var(--theme-glow)] transition-all duration-500">
            <div className="w-full h-full bg-[var(--theme-bg-base)] rounded-[10px] flex items-center justify-center font-display font-black text-sm text-[var(--theme-accent)] transition-all">
              FM
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-widest uppercase text-[var(--theme-accent)] opacity-70 transition-all">// PORTFOLIO VOL. 04</div>
            <h1 className="font-display font-black text-2xl tracking-tight text-[var(--theme-text-heading)] uppercase leading-none mt-1">
              FRANK MARVIN
            </h1>
          </div>
        </div>
        
        {/* Contact credentials & Theme Switching controller */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 text-[10px] font-mono uppercase tracking-widest text-[var(--theme-text-muted)]">
          
          {/* Theme switcher segmented array */}
          <div className="flex items-center bg-[var(--theme-bg-base)] border border-[var(--theme-border)] p-1 rounded-xl text-[9px] font-mono shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            <span className="px-2 text-[8px] text-neutral-500 select-none uppercase font-bold">THEME:</span>
            <button
              id="theme-light-btn"
              type="button"
              onClick={() => setTheme("light")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer font-bold ${
                theme === "light"
                  ? "bg-[#059669] text-white font-black shadow-[0_0_10px_rgba(5,150,105,0.2)]"
                  : "text-neutral-500 hover:text-[var(--theme-accent)]"
              }`}
            >
              LIGHT PRO
            </button>
            <button
              id="theme-emerald-btn"
              type="button"
              onClick={() => setTheme("emerald")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer font-bold ${
                theme === "emerald"
                  ? "bg-[#10B981] text-[#050807] font-black shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                  : "text-neutral-500 hover:text-[var(--theme-accent)]"
              }`}
            >
              EMERALD
            </button>
            <button
              id="theme-void-btn"
              type="button"
              onClick={() => setTheme("void")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer font-bold ${
                theme === "void"
                  ? "bg-white text-black font-black shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                  : "text-neutral-500 hover:text-[var(--theme-accent)]"
              }`}
            >
              VOID (MONO)
            </button>
          </div>

          <div className="flex items-center gap-2 bg-[var(--theme-glow)] px-3 py-1.5 rounded-full border border-[var(--theme-border)] text-[var(--theme-text)]">
            <Phone className="w-3.5 h-3.5 text-[var(--theme-accent)] transition-all" />
            <span>07026100477</span>
          </div>
          
          <button
            id="copy-email-header-btn"
            onClick={handleCopyEmail}
            className="flex items-center gap-2 px-4 py-1.5 bg-[var(--theme-glow)] hover:opacity-85 text-[var(--theme-accent)] border border-[var(--theme-border)] rounded-full text-[10px] font-mono tracking-widest uppercase transition-all cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{copiedEmail ? "COPIED TO CLIPBOARD" : "frankmarvin518@gmail.com"}</span>
          </button>
        </div>
      </header>

      {/* Main Layout Screen */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Sticky Identity, Bios & Assistant Console) */}
          <div className="lg:col-span-4 lg:sticky lg:top-8 space-y-8">
            
            {/* Elegant glassmorphism Card */}
            <div className="tech-card p-6 md:p-8 space-y-6 relative overflow-hidden bg-dot-matrix animate-fade-in-up">
              <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--theme-accent)] bg-[var(--theme-glow)] px-2.5 py-1 rounded-full border border-[var(--theme-border)]">
                  SYSTEM OVERVIEW
                </span>
                <div className="flex items-center gap-1.5 text-xs text-[var(--theme-accent)] opacity-75 font-mono">
                  <Activity className="w-3 h-3 animate-pulse text-[var(--theme-accent)]" />
                  <span>ACTIVE</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <h2 className="text-4xl font-display font-extrabold tracking-tight text-[var(--theme-text-heading)] uppercase leading-none">
                  FRANK MARVIN
                </h2>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full animate-ping ${theme === 'void' ? 'bg-zinc-400' : 'bg-emerald-400'}`}></span>
                  <span className={`text-[10px] font-mono tracking-widest uppercase ${theme === 'void' ? 'text-zinc-400' : 'text-[var(--theme-accent)]'}`}>
                    FRONTEND ENGINEER / DESIGN SYSTEMS
                  </span>
                </div>
              </div>

              <p className="text-xs text-[var(--theme-text-muted)] leading-relaxed font-normal">
                I engineer highly performant, visual frontend systems that combine design physics with production code complexity. Focusing on clean grid networks, low CPU rendering, micro-interactions, and beautiful user experience frameworks. Founder of <span className="text-[var(--theme-text-heading)] hover:text-[var(--theme-accent)] transition-all font-semibold cursor-pointer">MARVIN CLO</span> and developer educator on YouTube.
              </p>

              {/* Social Channels List with high-tech badge styling */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-emerald-950/30">
                <button 
                  onClick={() => window.open("https://github.com", "_blank")}
                  className="tech-btn-secondary flex items-center gap-1.5 px-3.5 py-2 text-[10px] font-mono tracking-wider cursor-pointer font-bold"
                >
                  <Github className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                  <span>GITHUB</span>
                </button>
                <button 
                  onClick={() => window.open("https://youtube.com", "_blank")}
                  className="tech-btn-secondary flex items-center gap-1.5 px-3.5 py-2 text-[10px] font-mono tracking-wider cursor-pointer font-bold"
                >
                  <Youtube className={`w-3.5 h-3.5 ${theme === 'void' ? 'text-white' : 'text-emerald-500'}`} />
                  <span>YOUTUBE</span>
                </button>
                <button 
                  onClick={() => window.open("https://twitter.com", "_blank")}
                  className="tech-btn-secondary flex items-center gap-1.5 px-3.5 py-2 text-[10px] font-mono tracking-wider cursor-pointer font-bold"
                >
                  <Twitter className="w-3.5 h-3.5 text-sky-400" />
                  <span>TWITTER</span>
                </button>
                <button 
                  onClick={() => window.open("https://instagram.com", "_blank")}
                  className="tech-btn-secondary flex items-center gap-1.5 px-3.5 py-2 text-[10px] font-mono tracking-wider cursor-pointer font-bold"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>INSTAGRAM</span>
                </button>
              </div>

              {/* Collapsible Technical Detail Journey */}
              <div className="border-t border-[var(--theme-border)] pt-4">
                <button
                  id="toggle-story-btn"
                  onClick={() => setShowFullStory(!showFullStory)}
                  className="w-full flex items-center justify-between text-left text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--theme-accent)] hover:opacity-80 transition-all cursor-pointer"
                >
                  <span>{showFullStory ? "// COLLAPSE SCHEMATICS" : "// EXPAND EXPERIENCES"}</span>
                  <span className="text-xs font-mono">{showFullStory ? "[-]" : "[+]"}</span>
                </button>
                
                {showFullStory && (
                  <div className="mt-4 space-y-5 text-xs text-[var(--theme-text-muted)] leading-relaxed border-t border-dashed border-[var(--theme-border)] pt-4 animate-fade-in">
                    <div className="space-y-1">
                      <strong className="text-[var(--theme-text-heading)] block uppercase font-mono text-[9px] tracking-wider font-semibold">
                        <span className="text-[var(--theme-accent)]">// 01_ </span> FRONTEND ENGINEERING
                      </strong>
                      <p>
                        Specialized in modular layout rendering, low-overhead UI bundling, and beautiful physics-based components built inside React networks.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <strong className="text-[var(--theme-text-heading)] block uppercase font-mono text-[9px] tracking-wider font-semibold">
                        <span className="text-[var(--theme-accent)]">// 02_ </span> CONTENT BROADCASTANDER
                      </strong>
                      <p>
                        Publishing high-fidelity build guides, custom vector math tutorials, and structural layout breakdowns to 240,000+ developers globally.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <strong className="text-[var(--theme-text-heading)] block uppercase font-mono text-[9px] tracking-wider font-semibold">
                        <span className="text-[var(--theme-accent)]">// 03_ </span> STREETWEAR GEOMETRICS
                      </strong>
                      <p>
                        Transforming grid-aligned coding coordinates into heavy organic apparel drops at my clothing design lab, MARVIN CLO.
                      </p>
                    </div>
                    <div className="bg-[var(--theme-glow)] p-3.5 rounded-xl border border-[var(--theme-border)] text-[10px]">
                      <span className="font-mono text-[var(--theme-accent)] block uppercase tracking-wider font-bold mb-1">CORE STATEMENT</span>
                      <p className="text-[var(--theme-text-muted)]">
                        Perfect products don't come from default layouts. They come from rigorous calculations, strict typography standards, and exceptional craft.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Premium emulated twin console */}
            <AITwinChat onSuggestedClick={handleQuickTwinPrompt} />

          </div>

          {/* Right Column (Dynamic Workspace Grid Area) */}
          <div className="lg:col-span-8 space-y-8 animate-fade-in-up md:animation-delay-200">
            
            {/* Elegant high-tech tab system mimicking ZeBeyond */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 p-1.5 bg-[var(--theme-bg-card)] border border-[var(--theme-border)] rounded-2xl">
              <button
                id="tab-btn-software"
                onClick={() => setActiveTab("software")}
                className={`py-3 px-4 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center ${
                  activeTab === "software"
                    ? "bg-[var(--theme-glow)] text-[var(--theme-accent)] border border-[var(--theme-border-hover)] font-bold shadow-[0_0_15px_var(--theme-glow)]"
                    : "text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] hover:bg-[var(--theme-glow)] border border-transparent"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <Code className="w-4 h-4" />
                  <span className="text-[10px]">01_ENGIN</span>
                </div>
              </button>

              <button
                id="tab-btn-youtube"
                onClick={() => setActiveTab("youtube")}
                className={`py-3 px-4 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center ${
                  activeTab === "youtube"
                    ? "bg-[var(--theme-glow)] text-[var(--theme-accent)] border border-[var(--theme-border-hover)] font-bold shadow-[0_0_15px_var(--theme-glow)]"
                    : "text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] hover:bg-[var(--theme-glow)] border border-transparent"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <Youtube className="w-4 h-4" />
                  <span className="text-[10px]">02_YOUTUBE</span>
                </div>
              </button>

              <button
                id="tab-btn-clothing"
                onClick={() => setActiveTab("clothing")}
                className={`py-3 px-4 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center ${
                  activeTab === "clothing"
                    ? "bg-[var(--theme-glow)] text-[var(--theme-accent)] border border-[var(--theme-border-hover)] font-bold shadow-[0_0_15px_var(--theme-glow)]"
                    : "text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] hover:bg-[var(--theme-glow)] border border-transparent"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <Tag className="w-4 h-4" />
                  <span className="text-[10px]">03_APPAREL</span>
                </div>
              </button>

              <button
                id="tab-btn-creator"
                onClick={() => setActiveTab("creator")}
                className={`py-3 px-4 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center ${
                  activeTab === "creator"
                    ? "bg-[var(--theme-glow)] text-[var(--theme-accent)] border border-[var(--theme-border-hover)] font-bold shadow-[0_0_15px_var(--theme-glow)]"
                    : "text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] hover:bg-[var(--theme-glow)] border border-transparent"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <Palette className="w-4 h-4" />
                  <span className="text-[10px]">04_CANVAS</span>
                </div>
              </button>

              <button
                id="tab-btn-figma"
                onClick={() => setActiveTab("figma")}
                className={`py-3 px-4 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center ${
                  activeTab === "figma"
                    ? "bg-[var(--theme-glow)] text-[var(--theme-accent)] border border-[var(--theme-border-hover)] font-bold shadow-[0_0_15px_var(--theme-glow)]"
                    : "text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] hover:bg-[var(--theme-glow)] border border-transparent"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <Layout className="w-4 h-4" />
                  <span className="text-[10px]">05_FIGMA</span>
                </div>
              </button>
            </div>

            {/* Active section viewport stage */}
            <div className="tech-card p-6 md:p-8 relative min-h-[500px]">
              {/* Subtle top horizontal decorative grid */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--theme-accent)]/30 to-transparent"></div>
              
              {activeTab === "software" && <SoftwareSection />}
              {activeTab === "youtube" && <YouTubeSection />}
              {activeTab === "clothing" && <ClothingBrandSection />}
              {activeTab === "creator" && <CreatorSection />}
              {activeTab === "figma" && <FigmaSection />}
            </div>

          </div>

        </div>
      </main>

      {/* Technical coordinate footer */}
      <footer className="border-t border-[var(--theme-border)] bg-[var(--theme-bg-card)] px-8 py-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-mono uppercase tracking-[0.15em] text-[var(--theme-text-muted)]">
        <div className="flex items-center gap-3">
          <Layers className="w-4 h-4 text-[var(--theme-accent)] transition-all" />
          <span>&copy; 2026 FRANK MARVIN STUDIO • Inspired by ZeBeyond Engineering System v4</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <span className="text-[var(--theme-accent)] opacity-85 hover:opacity-100 transition-all cursor-pointer">TEL: 07026100477</span>
          <span className="hover:text-[var(--theme-text-heading)] transition-all cursor-pointer">SPECS: React 18 / Tailwind / Canvas</span>
          <span className="hover:text-[var(--theme-text-heading)] transition-all cursor-pointer">GRID_DETERMINISTIC_MATRIX</span>
        </div>
      </footer>
    </div>
  );
}
