import { useState } from "react";
import { Terminal, AppWindow, ExternalLink, Github, Search, Code, CheckCircle, Mail, Activity, Cpu, Settings, Calculator, CheckSquare } from "lucide-react";
import { DEV_SKILLS, PORTFOLIO_PROJECTS } from "../data";
import TacticalCalculator from "./TacticalCalculator";
import GeometricTodo from "./GeometricTodo";

export default function SoftwareSection() {
  const [skillSearch, setSkillSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showcaseTab, setShowcaseTab] = useState<"calculator" | "todo">("calculator");

  const skillCategories = ["All", "Languages", "Frameworks", "UI & Styling", "Tools", "Design", "Engineering"];

  const filteredSkills = DEV_SKILLS.filter((skill) => {
    const matchesSearch = skill.name.toLowerCase().includes(skillSearch.toLowerCase());
    const matchesCategory = activeCategory === "All" || skill.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("frankmarvin518@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="space-y-12 animate-fade-in text-[#F1F5F9]">
      
      {/* Editorial Introduction block */}
      <div className="bg-[#0A100C]/70 border border-emerald-950/60 rounded-2xl p-6 md:p-8 space-y-4 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-md relative overflow-hidden bg-dot-matrix">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/5 rounded-full blur-2xl"></div>
        
        <div className="flex items-center justify-between border-b border-emerald-950/50 pb-4">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-[#10B981]" />
            <h2 className="font-display font-black text-2xl uppercase tracking-tight text-white">
              01_ Engineering Studio
            </h2>
          </div>
          <div className="flex items-center gap-2 text-[9px] font-mono text-[#10B981] bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-900/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>MATRIX_STABLE</span>
          </div>
        </div>

        <p className="text-sm text-[#94A3B8] leading-relaxed max-w-3xl font-normal">
          I design and construct premium web interfaces with the highest level of performance. Specializing in advanced modular components, TypeScript integrity, sub-millisecond route transitions, and responsive fluid grid layers. Inspired directly by professional data interfaces, I treat web layouts as complex mathematical equations where user delight is the output.
        </p>

        {/* Dynamic decorative flow simulation representing ZeBeyond Platform nodes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 mt-2">
          <div className="bg-[#040806]/60 border border-emerald-950/40 rounded-xl p-3.5 space-y-1 text-center font-mono">
            <span className="text-[9px] text-neutral-500 block">RENDER_OPTIMIZATION</span>
            <span className="text-sm font-bold text-[#10B981]">140fps / Ultra</span>
          </div>
          <div className="bg-[#040806]/60 border border-emerald-950/40 rounded-xl p-3.5 space-y-1 text-center font-mono">
            <span className="text-[9px] text-neutral-500 block">BUNDLE_BOUNDS</span>
            <span className="text-sm font-bold text-[#10B981]">&lt; 14KB static</span>
          </div>
          <div className="bg-[#040806]/60 border border-emerald-950/40 rounded-xl p-3.5 space-y-1 text-center font-mono">
            <span className="text-[9px] text-neutral-500 block">FIDELITY_COEFF</span>
            <span className="text-sm font-bold text-[#10B981]">0.998 / Dec</span>
          </div>
          <div className="bg-[#040806]/60 border border-emerald-950/40 rounded-xl p-3.5 space-y-1 text-center font-mono">
            <span className="text-[9px] text-neutral-500 block">INTEGRITY_INDEX</span>
            <span className="text-sm font-bold text-[#10B981]">100% Typing</span>
          </div>
        </div>
      </div>

      {/* Selected projects list */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#10B981] font-semibold">// EXHIBITIONS</span>
            <h3 className="font-display font-black text-xl text-white uppercase tracking-tight flex items-center gap-2 mt-1">
              <AppWindow className="w-5 h-5 text-[#10B981]" />
              Selected Systems & Engines
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_PROJECTS.map((proj) => (
            <div
              id={`project-${proj.id}`}
              key={proj.id}
              className="bg-[#0A100C]/70 border border-emerald-950/60 rounded-2xl p-6 flex flex-col justify-between hover:border-[#10B981]/30 transition-all duration-300 backdrop-blur-md shadow-[0_5px_20px_rgba(0,0,0,0.5)] group h-full"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] font-bold tracking-wider uppercase bg-emerald-950/60 text-[#10B981] border border-emerald-900/40 px-2.5 py-1 rounded-full">
                    {proj.featured ? "[ STABLE BUILD ]" : "[ EXPERIMENTAL ]"}
                  </span>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => window.open("https://github.com/frankmarvin518", "_blank")}
                      className="text-[#94A3B8] hover:text-[#10B981] transition-colors cursor-pointer"
                    >
                      <Github className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => window.open("https://github.com/frankmarvin518", "_blank")}
                      className="text-[#94A3B8] hover:text-[#10B981] transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h4 className="font-display font-extrabold text-base text-white uppercase tracking-tight group-hover:text-[#10B981] transition-colors">
                  {proj.title}
                </h4>

                <p className="text-xs text-[#94A3B8] leading-relaxed font-normal">
                  {proj.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-6 mt-6 border-t border-emerald-950/40">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] font-semibold text-[#10B981] bg-emerald-950/20 border border-emerald-900/30 px-2.5 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Micro-Applications Interactive Showcase */}
      <div className="space-y-6">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-mono text-[var(--theme-accent)] font-semibold">// LIVE SYSTEM RUNTIMES</span>
          <h3 className="font-display font-black text-xl text-white uppercase tracking-tight flex items-center gap-2 mt-1">
            <Cpu className="w-5 h-5 text-[var(--theme-accent)] animate-spin" />
            Interactive Micro-Applications
          </h3>
        </div>

        {/* Tab Selection controller */}
        <div className="flex bg-[#0A100C]/75 border border-emerald-950/60 p-1 rounded-xl text-xs font-mono max-w-md shadow-lg">
          <button
            id="showcase-calc-toggle"
            type="button"
            onClick={() => setShowcaseTab("calculator")}
            className={`flex-1 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-bold uppercase tracking-wider ${
              showcaseTab === "calculator"
                ? "bg-[var(--theme-accent)] text-[#050807] font-black shadow-[0_3px_12px_var(--theme-glow)]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            Tactical Calculator
          </button>
          <button
            id="showcase-todo-toggle"
            type="button"
            onClick={() => setShowcaseTab("todo")}
            className={`flex-1 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-bold uppercase tracking-wider ${
              showcaseTab === "todo"
                ? "bg-[var(--theme-accent)] text-[#050807] font-black shadow-[0_3px_12px_var(--theme-glow)]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            Geometric Objectives
          </button>
        </div>

        {/* Viewport Render Stage */}
        <div className="transition-all duration-300">
          {showcaseTab === "calculator" ? (
            <TacticalCalculator />
          ) : (
            <GeometricTodo />
          )}
        </div>
      </div>

      {/* Interactive Skills Metrics directory */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#10B981] font-semibold">// CAPABILITIES</span>
            <h3 className="font-display font-black text-xl text-white uppercase tracking-tight flex items-center gap-2 mt-1">
              <Code className="w-5 h-5 text-[#10B981]" />
              Interactive Skill Index
            </h3>
          </div>

          {/* Elegant Slate Search Box of ZeBeyond shot */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-emerald-500/50" />
            <input
              id="skill-search-input"
              type="text"
              placeholder="Filter platform tech..."
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-[#0A100C]/95 border border-emerald-950/80 rounded-full text-xs font-mono font-medium tracking-wide text-[#E2E8F0] w-full sm:w-60 focus:outline-none focus:border-[#10B981]/50 focus:ring-1 focus:ring-[#10B981]/25 transition-all placeholder:text-neutral-600"
            />
          </div>
        </div>

        {/* Dynamic Tabs list tailored with modern rounded design */}
        <div className="flex flex-wrap gap-1.5 border-b border-emerald-950/40 pb-3">
          {skillCategories.map((cat) => (
            <button
              id={`skill-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#10B981] text-[#050807] font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                  : "text-[#94A3B8] hover:text-white bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-900/20"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Dynamic Grid list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <div
              id={`skill-card-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
              key={skill.name}
              className="bg-[#0A100C]/65 border border-emerald-950/50 rounded-xl p-4 space-y-3 hover:border-emerald-500/20 hover:bg-[#0A100C]/90 transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-xs uppercase tracking-tight text-white">{skill.name}</span>
                <span className="font-mono text-[10px] font-bold text-[#10B981] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/20">{skill.level}%</span>
              </div>
              
              {/* Thick Technical emerald progress segment */}
              <div className="w-full bg-[#040806]/80 rounded-full h-2 overflow-hidden border border-emerald-950/50">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-[8px] font-mono font-bold text-neutral-500 uppercase">
                <span>PORT // {skill.category}</span>
                <span className="text-[#10B981] align-middle">● ONLINE</span>
              </div>
            </div>
          ))}
          {filteredSkills.length === 0 && (
            <div className="col-span-full py-12 text-center text-neutral-500 text-xs font-mono">
              [ NO_TECHNICAL_COERCIONS_FOUND ]
            </div>
          )}
        </div>
      </div>

      {/* Modern Stark CTA block */}
      <div className="bg-[#0A100C]/80 border border-emerald-800/40 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_12px_30px_rgba(0,0,0,0.5)] relative overflow-hidden bg-tech-grid">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="space-y-2 z-10">
          <span className="text-[9px] uppercase font-mono tracking-[0.2em] bg-[#10B981]/15 text-[#10B981] px-3 py-1 rounded-full border border-[#10B981]/30">
            COLLABORATION_PORT_ACTIVE
          </span>
          <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white mt-1">Ready to Optimize Your Interface?</h3>
          <p className="text-xs text-[#94A3B8] max-w-xl leading-relaxed font-normal">
            I customize frontend performance budgets, modular component systems, and high-fidelity React dashboards. Currently accepting selective contracts, brand partnerships, and UI auditing projects.
          </p>
        </div>
        
        <button
          id="copy-email-btn-software"
          onClick={handleCopyEmail}
          className="px-6 py-3.5 bg-gradient-to-r from-[#10B981] to-[#047857] hover:from-[#22C55E] hover:to-[#059669] text-[#050807] font-bold text-xs uppercase tracking-widest rounded-full flex items-center justify-center gap-2 cursor-pointer self-start md:self-auto shrink-0 transition-all duration-300 shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:scale-105"
        >
          {copiedEmail ? (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>COPIED SUCCESSFULLY</span>
            </>
          ) : (
            <>
              <Mail className="w-4 h-4" />
              <span>frankmarvin518@gmail.com</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
