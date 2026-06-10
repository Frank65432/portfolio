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
  };

  const handleQuickTwinPrompt = (prompt: string) => {
    console.log("Auto-prompted AI Twin:", prompt);
  };

  return (
    <div className="min-h-screen bg-[#050807] text-[#E2E8F0] bg-tech-grid relative overflow-hidden flex flex-col font-sans selection:bg-[#10B981]/30 selection:text-[#10B981]">
      
      {/* Decorative ambient glowing grids behind cards */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none select-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[150px] pointer-events-none select-none"></div>
      
      {/* Dynamic top ticker signaling active telemetry */}
      <div className="w-full bg-[#0A100C]/90 border-b border-emerald-950/40 px-6 py-2 flex justify-between items-center text-[9px] font-mono uppercase tracking-[0.2em] text-[#10B981]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>SYSTEM_ONLINE // ZE_BEYOND_ENGINEv2</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span>COORDINATES: 51.5074° N, 0.1278° W</span>
          <span>CPU_CORE: {cpuLoad}%</span>
          <span>UPTIME: {systemUptime}</span>
        </div>
      </div>

      {/* Styled Micro-Header */}
      <header className="flex flex-col md:flex-row justify-between items-center px-6 py-8 md:px-12 border-b border-emerald-950/40 bg-[#0A100C]/45 backdrop-blur-md gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#10B981] to-[#047857] p-[1.5px] shadow-[0_0_20px_rgba(16,185,129,0.25)]">
            <div className="w-full h-full bg-[#050807] rounded-[10px] flex items-center justify-center font-display font-black text-sm text-[#10B981]">
              FM
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-widest uppercase text-[#10B981]/70">PORTFOLIO VOL. 04</div>
            <h1 className="font-display font-black text-2xl tracking-tight text-white uppercase leading-none mt-1">
              FRANK MARVIN
            </h1>
          </div>
        </div>
        
        {/* Contact credentials */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-mono uppercase tracking-widest text-[#E2E8F0]/70">
          <div className="flex items-center gap-2 bg-emerald-950/30 px-3 py-1.5 rounded-full border border-emerald-900/40">
            <Phone className="w-3.5 h-3.5 text-[#10B981]" />
            <span>07026100477</span>
          </div>
          
          <button
            id="copy-email-header-btn"
            onClick={handleCopyEmail}
            className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-[#10B981] border border-emerald-500/20 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all cursor-pointer"
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
            <div className="tech-card p-6 md:p-8 space-y-6 relative overflow-hidden bg-dot-matrix">
              <div className="flex items-center justify-between border-b border-emerald-950/50 pb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#10B981] bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/40">
                  SYSTEM OVERVIEW
                </span>
                <div className="flex items-center gap-1.5 text-xs text-[#10B981]/60 font-mono">
                  <Activity className="w-3 h-3 animate-pulse text-[#10B981]" />
                  <span>ACTIVE</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <h2 className="text-4xl font-display font-extrabold tracking-tight text-white uppercase leading-none">
                  FRANK MARVIN
                </h2>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
                    FRONTEND ENGINEER / DESIGN SYSTEMS
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#94A3B8] leading-relaxed font-normal">
                I engineer highly performant, visual frontend systems that combine design physics with production code complexity. Focusing on clean grid networks, low CPU rendering, micro-interactions, and beautiful user experience frameworks. Founder of <span className="text-white hover:text-[#10B981] transition-all font-semibold cursor-pointer">MARVIN CLO</span> and developer educator on YouTube.
              </p>

              {/* Social Channels List with high-tech badge styling */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-emerald-950/30">
                <button 
                  onClick={() => window.open("https://github.com", "_blank")}
                  className="tech-btn-secondary flex items-center gap-1.5 px-3.5 py-2 text-[10px] font-mono tracking-wider cursor-pointer font-bold"
                >
                  <Github className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>GITHUB</span>
                </button>
                <button 
                  onClick={() => window.open("https://youtube.com", "_blank")}
                  className="tech-btn-secondary flex items-center gap-1.5 px-3.5 py-2 text-[10px] font-mono tracking-wider cursor-pointer font-bold"
                >
                  <Youtube className="w-3.5 h-3.5 text-emerald-500" />
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
              <div className="border-t border-emerald-950/30 pt-4">
                <button
                  id="toggle-story-btn"
                  onClick={() => setShowFullStory(!showFullStory)}
                  className="w-full flex items-center justify-between text-left text-[11px] font-mono font-bold uppercase tracking-wider text-[#10B981] hover:text-[#22C55E] transition-colors cursor-pointer"
                >
                  <span>{showFullStory ? "// COLLAPSE SCHEMATICS" : "// EXPAND EXPERIENCES"}</span>
                  <span className="text-xs font-mono">{showFullStory ? "[-]" : "[+]"}</span>
                </button>
                
                {showFullStory && (
                  <div className="mt-4 space-y-5 text-xs text-[#94A3B8] leading-relaxed border-t border-dashed border-emerald-950/50 pt-4 animate-fade-in">
                    <div className="space-y-1">
                      <strong className="text-white block uppercase font-mono text-[9px] tracking-wider font-semibold">
                        <span className="text-[#10B981]">// 01_ </span> FRONTEND ENGINEERING
                      </strong>
                      <p>
                        Specialized in modular layout rendering, low-overhead UI bundling, and beautiful physics-based components built inside React networks.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <strong className="text-white block uppercase font-mono text-[9px] tracking-wider font-semibold">
                        <span className="text-[#10B981]">// 02_ </span> CONTENT BROADCASTANDER
                      </strong>
                      <p>
                        Publishing high-fidelity build guides, custom vector math tutorials, and structural layout breakdowns to 240,000+ developers globally.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <strong className="text-white block uppercase font-mono text-[9px] tracking-wider font-semibold">
                        <span className="text-[#10B981]">// 03_ </span> STREETWEAR GEOMETRICS
                      </strong>
                      <p>
                        Transforming grid-aligned coding coordinates into heavy organic apparel drops at my clothing design lab, MARVIN CLO.
                      </p>
                    </div>
                    <div className="bg-[#0A100C]/75 p-3.5 rounded-xl border border-emerald-950/50 text-[10px]">
                      <span className="font-mono text-[#10B981] block uppercase tracking-wider font-bold mb-1">CORE STATEMENT</span>
                      <p className="text-[#8492A6]">
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
          <div className="lg:col-span-8 space-y-8">
            
            {/* Elegant high-tech tab system mimicking ZeBeyond */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 p-1.5 bg-[#0A100C]/80 border border-emerald-950/40 rounded-2xl">
              <button
                id="tab-btn-software"
                onClick={() => setActiveTab("software")}
                className={`py-3 px-4 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center ${
                  activeTab === "software"
                    ? "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 font-bold shadow-[0_0_15px_rgba(16,185,129,0.06)]"
                    : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
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
                    ? "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 font-bold shadow-[0_0_15px_rgba(16,185,129,0.06)]"
                    : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
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
                    ? "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 font-bold shadow-[0_0_15px_rgba(16,185,129,0.06)]"
                    : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
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
                    ? "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 font-bold shadow-[0_0_15px_rgba(16,185,129,0.06)]"
                    : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
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
                    ? "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 font-bold shadow-[0_0_15px_rgba(16,185,129,0.06)]"
                    : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
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
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#10B981]/30 to-transparent"></div>
              
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
      <footer className="border-t border-emerald-950/40 bg-[#0A100C]/80 px-8 py-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-mono uppercase tracking-[0.15em] text-[#E2E8F0]/50">
        <div className="flex items-center gap-3">
          <Layers className="w-4 h-4 text-[#10B981]" />
          <span>&copy; 2026 FRANK MARVIN STUDIO • Inspired by ZeBeyond Engineering System v4</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <span className="text-[#10B981]/80 hover:text-[#10B981] transition-all cursor-pointer">TEL: 07026100477</span>
          <span className="hover:text-white transition-all cursor-pointer">SPECS: React 18 / Tailwind / Canvas</span>
          <span className="hover:text-white transition-all cursor-pointer">GRID_DETERMINISTIC_MATRIX</span>
        </div>
      </footer>
    </div>
  );
}
