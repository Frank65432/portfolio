import { useState } from "react";
import { 
  Layout, 
  ExternalLink, 
  Layers, 
  Cpu, 
  CheckCircle, 
  Compass, 
  Activity, 
  Wand2, 
  Settings,
  ShieldCheck,
  RefreshCw
} from "lucide-react";

export default function FigmaSection() {
  const [isFullscreenOn, setIsFullscreenOn] = useState(false);
  const [tokensStatus, setTokensStatus] = useState("SYNCHRONIZED");
  const [loadProgress, setLoadProgress] = useState("100%");
  const [activeTabSub, setActiveTabSub] = useState<"viewer" | "tokens">("viewer");

  const handleRefreshTokens = () => {
    setTokensStatus("DYNAMIC_COMPILING");
    setTimeout(() => {
      setTokensStatus("SYNCHRONIZED");
    }, 1200);
  };

  const figmaStylesTokensList = [
    { token: "--color-emerald-primary", value: "#10B981", type: "Color (Accent)", theme: "ZeBeyond Core" },
    { token: "--color-slate-background", value: "#050807", type: "Color (Base)", theme: "ZeBeyond Dark" },
    { token: "--font-family-sans", value: "Inter, sans-serif", type: "Typography", theme: "Universal UI" },
    { token: "--font-family-display", value: "Outfit, sans-serif", type: "Typography", theme: "Header display" },
    { token: "--font-family-mono", value: "Space Mono, monospace", type: "Typography", theme: "Telemetry Code" },
    { token: "--border-radius-card", value: "16px / 1rem", type: "Structure", theme: "Tech Standard" },
    { token: "--box-shadow-tech-glow", value: "0 0 20px rgba(16,185,129,0.08)", type: "Effects", theme: "High Glass" }
  ];

  return (
    <div className="space-y-12 animate-fade-in text-[#F1F5F9]">
      
      {/* Top Welcome Spec Card */}
      <div className="bg-[#0A100C]/70 border border-emerald-950/60 rounded-2xl p-6 md:p-8 space-y-4 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-md relative overflow-hidden bg-dot-matrix">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/5 rounded-full blur-2xl"></div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-emerald-950/50 pb-4">
          <div className="flex items-center gap-3">
            <Layout className="w-8 h-8 text-[#10B981]" />
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#10B981] font-semibold">// INTERACTIVE SCHEMATICS</span>
              <h2 className="font-display font-black text-2xl uppercase tracking-tight text-white leading-none mt-1">
                05_ Figma Design System
              </h2>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://embed.figma.com/site/ej6wE1R7RID64VdCpxWQRR/Untitled?node-id=0-1&embed-host=share"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#10B981] hover:bg-emerald-400 text-[#050807] text-xs font-mono font-bold uppercase tracking-wider rounded-full cursor-pointer transition-all duration-300 shadow-[0_4px_12px_rgba(16,185,129,0.35)]"
            >
              <span>launch_figma_workspace</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <p className="text-xs text-[#94A3B8] max-w-2xl leading-relaxed font-normal">
          Explore the exact vector layout formulas, typography pairings, grid guides, and component modules representing Frank's digital architecture models. This embedded canvas streams directly from the design system repository.
        </p>

        {/* Technical Data specs representing files */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-emerald-950/20">
          <div className="space-y-0.5">
            <span className="text-[9px] uppercase font-mono tracking-wider text-neutral-500 block">VECTOR COEF</span>
            <span className="text-sm font-display font-bold text-white uppercase flex items-center gap-1">
              Infinite Scale <Cpu className="w-3.5 h-3.5 text-[#10B981]" />
            </span>
          </div>
          <div className="space-y-0.5">
            <span className="text-[9px] uppercase font-mono tracking-wider text-neutral-500 block">DESIGN BUILD</span>
            <span className="text-sm font-display font-bold text-white uppercase font-mono">SPEC_v9.0.4</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-[9px] uppercase font-mono tracking-wider text-neutral-500 block">TOKENS_PORT</span>
            <span className={`text-sm font-display font-bold uppercase font-mono transition-all ${tokensStatus === "SYNCHRONIZED" ? "text-[#10B981]" : "text-amber-500 animate-pulse"}`}>
              {tokensStatus}
            </span>
          </div>
          <div className="space-y-0.5">
            <span className="text-[9px] uppercase font-mono tracking-wider text-neutral-500 block">RESOLUTIONS</span>
            <span className="text-sm font-display font-bold text-white">4K UHD Adaptive</span>
          </div>
        </div>
      </div>

      {/* Primary Frame Section and tokens viewer tabs */}
      <div className="space-y-6">
        
        {/* Toggle sub-tabs */}
        <div className="flex items-center justify-between border-b border-emerald-950/40 pb-2">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTabSub("viewer")}
              className={`text-xs font-mono uppercase tracking-widest pb-2 cursor-pointer transition-all ${
                activeTabSub === "viewer"
                  ? "text-white border-b-2 border-[#10B981] font-bold"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              Interactive Blueprint
            </button>
            <button
              onClick={() => setActiveTabSub("tokens")}
              className={`text-xs font-mono uppercase tracking-widest pb-2 cursor-pointer transition-all ${
                activeTabSub === "tokens"
                  ? "text-white border-b-2 border-[#10B981] font-bold"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              Design Tokens Matrix
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 hidden sm:inline-block">
              ACTIVE_NODE: 0x24_EMBED_SHUTTLE
            </span>
          </div>
        </div>

        {activeTabSub === "viewer" ? (
          <div className="space-y-4">
            {/* Interactive Embedded Iframe Frame */}
            <div className="relative border border-emerald-950/60 rounded-2xl overflow-hidden bg-neutral-950 shadow-2xl group transition-all duration-500">
              
              {/* Ticker bar for simulator */}
              <div className="w-full bg-[#050807] px-4 py-2.5 border-b border-emerald-950/50 flex justify-between items-center text-[9px] font-mono text-neutral-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 tech-glow-glow"></span>
                  <span>FIGMA_LIVE_STREAM_MATRIX // RENDERER: OK</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>SCALE: AUTO_FLUID</span>
                  <span>LOAD: {loadProgress}</span>
                </div>
              </div>

              {/* Real Embedded Interactive Frame */}
              <div className="relative aspect-video w-full min-h-[460px] bg-neutral-950">
                <iframe 
                  id="figma-embed-frame"
                  style={{ border: "none" }} 
                  width="100%" 
                  height="100%" 
                  src="https://embed.figma.com/site/ej6wE1R7RID64VdCpxWQRR/Untitled?node-id=0-1&embed-host=share" 
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            </div>

            {/* Spec guidance */}
            <div className="p-4 bg-emerald-950/20 border border-emerald-950/40 rounded-xl flex items-start gap-3.5 text-xs text-[#94A3B8]">
              <Compass className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="text-white block uppercase font-mono text-[10px] tracking-wider font-bold">NAVIGATION INSTRUCTIONS</strong>
                <p className="leading-relaxed">
                  The embedded Figma frame is highly interactive. You can use your mouse wheel / trackpad to zoom in or pan across the workspace layers. To inspect exact coordinate numbers and type bounds offline, follow the direct launcher link above.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Tokens List Viewer */
          <div className="space-y-6">
            <div className="bg-[#050807] border border-emerald-950/60 rounded-xl overflow-hidden shadow-lg">
              <div className="p-4 bg-emerald-950/10 border-b border-emerald-950/40 flex justify-between items-center">
                <span className="font-mono text-[10px] font-bold text-[#10B981] uppercase tracking-wider">DESIGN_VARIABLES SYSTEM_EXPORT</span>
                <button
                  onClick={handleRefreshTokens}
                  className="flex items-center gap-1.5 text-[9px] font-mono font-bold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 hover:bg-[#10B981] hover:text-[#050807] transition-all px-2.5 py-1 rounded cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${tokensStatus === "DYNAMIC_COMPILING" ? "animate-spin" : ""}`} />
                  <span>REFRESH_MUTATOR</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-[11px] text-[#A3B3C1]">
                  <thead>
                    <tr className="bg-[#0A100C] text-neutral-500 uppercase tracking-wider text-[9px] border-b border-emerald-950/50">
                      <th className="py-3 px-4">CSS CUSTOM TOKEN</th>
                      <th className="py-3 px-4">VALUE</th>
                      <th className="py-3 px-4">TYPE</th>
                      <th className="py-3 px-4">THEME TARGET</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-950/30">
                    {figmaStylesTokensList.map((tokenObj) => (
                      <tr key={tokenObj.token} className="hover:bg-emerald-950/10 transition-colors">
                        <td className="py-3 px-4 font-bold text-white selection:bg-[#10B981]/20">{tokenObj.token}</td>
                        <td className="py-3 px-4 font-mono text-[#10B981]">
                          <span className="flex items-center gap-1.5">
                            {tokenObj.value.startsWith("#") && (
                              <span 
                                className="w-2.5 h-2.5 rounded border border-white/10 shrink-0" 
                                style={{ backgroundColor: tokenObj.value }}
                              ></span>
                            )}
                            {tokenObj.value}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs font-sans text-neutral-400 font-medium">{tokenObj.type}</td>
                        <td className="py-3 px-4 text-xs font-sans text-[#E2E8F0]/80">{tokenObj.theme}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#0A100C]/65 border border-emerald-950/45 p-5 rounded-2xl space-y-3">
              <span className="text-[10px] font-mono text-[#10B981] tracking-widest font-bold uppercase block">// INTEGRATION VERIFIED</span>
              <p className="text-xs text-[#94A3B8] leading-relaxed font-normal">
                These design variables are mapped directly to our global styles layer in <span className="text-white hover:text-[#10B981] font-semibold cursor-pointer">src/index.css</span>. When updating the master design system specification file inside the Figma frame, our automatic bundler pipeline intercepts variables mapping seamlessly with sub-second reload budgets.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Modern Stark CTA block */}
      <div className="bg-[#0A100C]/80 border border-emerald-800/40 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-[0_12px_30px_rgba(0,0,0,0.5)] relative overflow-hidden bg-tech-grid">
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#10B981]/5 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="space-y-3 z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-800/40 text-[#10B981] px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider">
            WORKSPACE CONNECTION
          </div>
          <h3 className="font-display font-black text-xl uppercase tracking-tight text-white">INTEGRATED DESIGN-DEV STACK</h3>
          <p className="text-xs text-[#94A3B8] max-w-md font-normal leading-relaxed">
            Interested in the complete design system layout blueprint? Launch the master workspace to fork layout templates or modify theme tokens.
          </p>
        </div>

        <a
          id="figma-footer-cta-link"
          href="https://embed.figma.com/site/ej6wE1R7RID64VdCpxWQRR/Untitled?node-id=0-1&embed-host=share"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3.5 bg-gradient-to-r from-[#10B981] to-[#047857] hover:from-[#22C55E] hover:to-[#059669] text-[#050807] font-bold text-xs uppercase tracking-widest rounded-full cursor-pointer flex items-center justify-center gap-2 shrink-0 transition-all duration-300 shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:scale-105"
        >
          <Compass className="w-4 h-4" />
          <span>LAUNCH_FIGMA_RESOURCES</span>
        </a>
      </div>

    </div>
  );
}
