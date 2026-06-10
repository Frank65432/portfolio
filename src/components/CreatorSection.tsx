import { useState, useRef, useEffect } from "react";
import { Palette, Sliders, Wand2, RefreshCw, Cpu, Layers, Hexagon } from "lucide-react";

export default function CreatorSection() {
  const [activePreset, setActivePreset] = useState<string>("de-stijl");
  const [lineWidth, setLineWidth] = useState<number>(3);
  const [gridCount, setGridCount] = useState<number>(8);
  const [chaosFactor, setChaosFactor] = useState<number>(30);
  const [primaryHue, setPrimaryHue] = useState<number>(135); // Default forest green hue
  const [patternSeed, setPatternSeed] = useState<number>(44);

  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const applyPresetRules = (preset: string) => {
    setActivePreset(preset);
    switch (preset) {
      case "de-stijl":
        setLineWidth(4);
        setGridCount(6);
        setChaosFactor(25);
        setPrimaryHue(135); // Lively forest green
        break;
      case "modernist":
        setLineWidth(2);
        setGridCount(10);
        setChaosFactor(15);
        setPrimaryHue(200); // Technical Slate blue
        break;
      case "brutalist":
        setLineWidth(6);
        setGridCount(5);
        setChaosFactor(60);
        setPrimaryHue(45); // Warm gold pitch
        break;
      case "generative":
        setLineWidth(1);
        setGridCount(14);
        setChaosFactor(80);
        setPrimaryHue(155); // Emerald-mint pitch
        break;
    }
  };

  // Seeded deterministic pseudo-random helper to make generative art stable per seed
  const randomSeedRandom = (seedIndex: number) => {
    const x = Math.sin(patternSeed + seedIndex) * 10000;
    return x - Math.floor(x);
  };

  const generateSvgElements = () => {
    const elements = [];
    const size = 320;
    const step = size / gridCount;

    // Background block underlay
    elements.push(
      <rect key="bg" width={size} height={size} fill="#040806" />
    );

    // Matrix background coordinates
    for (let c = 0; c < gridCount; c++) {
      for (let r = 0; r < gridCount; r++) {
        const x = c * step;
        const y = r * step;
        elements.push(
          <circle key={`dot-${c}-${r}`} cx={x} cy={y} r="1" fill="rgba(16, 185, 129, 0.15)" />
        );
      }
    }

    // Dynamic blocks
    let k = 0;
    for (let i = 0; i < gridCount; i++) {
      for (let j = 0; j < gridCount; j++) {
        k++;
        const prob = randomSeedRandom(k);
        const cellWidth = step;
        const cellHeight = step;
        
        let cx = i * step;
        let cy = j * step;

        // Apply asymmetry factor math
        if (prob < (chaosFactor / 100)) {
          cx += (randomSeedRandom(k * 2) - 0.5) * (step * 0.45);
          cy += (randomSeedRandom(k * 3) - 0.5) * (step * 0.45);
        }

        // Color selection
        let fillColor = "transparent";
        const rollColor = randomSeedRandom(k * 8);

        if (activePreset === "de-stijl") {
          if (rollColor < 0.25) fillColor = "#10B981"; // Forest Green (Emerald)
          else if (rollColor < 0.5) fillColor = "rgba(16, 185, 129, 0.25)"; 
          else if (rollColor < 0.7) fillColor = "#1E293B"; // slate solid
          else if (rollColor < 0.85) fillColor = "#050807"; // pitch black block
        } else if (activePreset === "modernist") {
          const hslColor = `hsl(${(primaryHue + (rollColor * 20 - 10)) % 360}, 75%, 45%)`;
          if (rollColor < 0.4) fillColor = hslColor;
          else if (rollColor < 0.75) fillColor = "rgba(255, 255, 255, 0.05)";
        } else if (activePreset === "brutalist") {
          if (rollColor < 0.35) fillColor = "#F5F5F0";
          else if (rollColor < 0.7) fillColor = `hsl(${primaryHue}, 70%, 50%)`;
        } else {
          // Generative mesh gradients
          if (rollColor < 0.6) {
            fillColor = `hsla(${(primaryHue + rollColor * 120) % 360}, 80%, 50%, 0.15)`;
          }
        }

        if (fillColor !== "transparent") {
          elements.push(
            <rect
              key={`block-${i}-${j}`}
              x={cx + 1}
              y={cy + 1}
              width={cellWidth - 2}
              height={cellHeight - 2}
              fill={fillColor}
              stroke="rgba(16, 185, 129, 0.2)"
              strokeWidth="0.5"
            />
          );
        }

        // Add structural line strands
        if (rollColor > 0.82) {
          elements.push(
            <line
              key={`line-h-${i}-${j}`}
              x1={cx}
              y1={cy}
              x2={cx + cellWidth}
              y2={cy}
              stroke="currentColor"
              strokeWidth={lineWidth}
              className="text-[#10B981]"
            />
          );
          if (rollColor > 0.91) {
            elements.push(
              <line
                key={`line-v-${i}-${j}`}
                x1={cx}
                y1={cy}
                x2={cx}
                y2={cy + cellHeight}
                stroke="currentColor"
                strokeWidth={lineWidth}
                className="text-white"
              />
            );
          }
        }
      }
    }

    // Focal vector nodes representing active points inside canvas limits
    for (let j = 0; j < 6; j++) {
      const ax = randomSeedRandom(j * 9) * size;
      const ay = randomSeedRandom(j * 10) * size;
      const radius = randomSeedRandom(j * 11) * 8 + 3;

      const accentColor = j % 2 === 0 ? "#10B981" : "#F8FAFC";

      if (j % 2 === 0) {
        elements.push(
          <circle
            key={`feat-circle-${j}`}
            cx={ax}
            cy={ay}
            r={radius}
            fill="transparent"
            stroke={accentColor}
            strokeWidth={lineWidth}
          />
        );
      } else {
        elements.push(
          <rect
            key={`feat-rect-${j}`}
            x={ax - radius}
            y={ay - radius}
            width={radius * 2}
            height={radius * 2}
            fill="transparent"
            stroke={accentColor}
            strokeWidth={lineWidth / 2}
          />
        );
      }
    }

    return elements;
  };

  return (
    <div className="space-y-12 animate-fade-in text-[#F1F5F9]">
      
      {/* Brand Lab Introduction Header */}
      <div className="bg-[#0A100C]/70 border border-emerald-950/60 rounded-2xl p-6 md:p-8 space-y-4 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-md relative overflow-hidden bg-dot-matrix">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/5 rounded-full blur-2xl"></div>
        
        <div className="flex items-center gap-3 border-b border-emerald-950/50 pb-4">
          <Palette className="w-5 h-5 text-[#10B981]" />
          <h2 className="font-display font-black text-2xl uppercase tracking-tight text-white">
            04_ DIGITAL CANVAS LAB
          </h2>
        </div>
        <p className="text-xs text-[#94A3B8] leading-relaxed max-w-2xl font-normal">
          A client-side layout simulator testing structural composition limits. Play with node densities, line weights, color pitches, and asymmetry presets to generate distinct high-contrast vector geometries (deterministic SVG arrays).
        </p>
      </div>

      {/* Main interactive controls panel grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Fine-Tuning Parameter controls column (Left 5 cols) */}
        <div className="lg:col-span-5 bg-[#0A100C]/70 border border-emerald-950/60 rounded-2xl p-6 space-y-6 shadow-[0_5px_20px_rgba(0,0,0,0.4)] relative">
          <div className="flex items-center gap-2 border-b border-emerald-950/50 pb-3">
            <Sliders className="w-4 h-4 text-[#10B981]" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#10B981]">AESTHETIC_PARAMETERS</h3>
          </div>

          <div className="space-y-5">
            {/* Matrix presets buttons selection */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 block uppercase">Visualizer Preset</span>
              <div className="grid grid-cols-2 gap-2">
                {["de-stijl", "modernist", "brutalist", "generative"].map((preset) => (
                  <button
                    id={`preset-btn-${preset}`}
                    key={preset}
                    onClick={() => applyPresetRules(preset)}
                    className={`py-2 px-3 rounded-xl font-mono text-[10px] uppercase tracking-wider transition-all duration-300 cursor-pointer text-center ${
                      activePreset === preset
                        ? "bg-[#10B981] text-[#050807] font-black shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                        : "bg-emerald-950/25 border border-emerald-900/40 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {preset.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 1: grid count */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono font-bold uppercase text-[#10B981]">
                <span>MATRIX_GRID_DIVISIONS</span>
                <span>{gridCount}x{gridCount}</span>
              </div>
              <input
                id="grid-slider"
                type="range"
                min="3"
                max="16"
                step="1"
                value={gridCount}
                onChange={(e) => setGridCount(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#040806] rounded-full appearance-none cursor-pointer accent-[#10B981]"
              />
            </div>

            {/* Slider 2: Stroke line width */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono font-bold uppercase text-[#10B981]">
                <span>STROKE_WEIGHT_WEIGHT</span>
                <span>{lineWidth}px</span>
              </div>
              <input
                id="stroke-slider"
                type="range"
                min="1"
                max="8"
                step="1"
                value={lineWidth}
                onChange={(e) => setLineWidth(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#040806] rounded-full appearance-none cursor-pointer accent-[#10B981]"
              />
            </div>

            {/* Slider 3: Asymmetry Chaos factor */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono font-bold uppercase text-[#10B981]">
                <span>ASYMMETRY_CHAOS_FACTOR</span>
                <span>{chaosFactor}%</span>
              </div>
              <input
                id="chaos-slider"
                type="range"
                min="0"
                max="100"
                step="5"
                value={chaosFactor}
                onChange={(e) => setChaosFactor(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#040806] rounded-full appearance-none cursor-pointer accent-[#10B981]"
              />
            </div>

            {/* Slider 4: HSL Primary Hue pitch */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono font-bold uppercase text-[#10B981]">
                <span>PRIMARY_COLOR_PITCH</span>
                <span>{primaryHue}°</span>
              </div>
              <input
                id="hue-slider"
                type="range"
                min="0"
                max="360"
                step="10"
                value={primaryHue}
                onChange={(e) => setPrimaryHue(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#040806] rounded-full appearance-none cursor-pointer accent-[#10B981]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-emerald-950/40 flex gap-2">
            <button
              id="synthesize-art-btn"
              onClick={() => setPatternSeed((prev) => prev + Math.floor(Math.random() * 50) + 1)}
              className="flex-1 py-3 bg-[#10B981] hover:bg-emerald-400 text-[#050807] font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_4px_12px_rgba(16,185,129,0.3)] hover:scale-102"
            >
              <Wand2 className="w-4 h-4" />
              <span>SYNTHESIZE MATRIX</span>
            </button>
          </div>
        </div>

        {/* Live Vector Viewport Display column (Right 7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-[#040806] border border-emerald-950/60 rounded-3xl min-h-[380px] shadow-inner relative overflow-hidden">
          {/* Subtle top horizontal decorative grid */}
          <div className="absolute top-4 left-4 flex items-center gap-2 text-[8px] font-mono text-[#10B981]/60">
            <Cpu className="w-3.5 h-3.5 text-[#10B981] animate-spin" />
            <span>RENDER_MATRIX_VECTOR_OUTPUT_PREV</span>
          </div>
          
          <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[8px] font-mono text-neutral-500">
            <span>SEED_ADDR: 0x{patternSeed.toString(16).toUpperCase()}</span>
          </div>

          {/* Render container matching the live size bounds */}
          <div 
            ref={canvasContainerRef}
            className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] bg-[#050807] border border-emerald-950/80 rounded-2xl shadow-2xl relative overflow-hidden scale-95 transition-transform duration-300"
          >
            <svg
              className="w-full h-full select-none"
              viewBox="0 0 320 320"
              xmlns="http://www.w3.org/2000/svg"
            >
              {generateSvgElements()}
            </svg>
          </div>

          {/* Subheader parameters specs readouts */}
          <div className="w-full mt-6 grid grid-cols-3 gap-2 text-center border-t border-emerald-950/30 pt-4 font-mono text-[9px] text-[#94A3B8]">
            <div className="border-r border-emerald-950/30">
              <span className="text-neutral-500 block uppercase tracking-wider">ELEMENT COUNT</span>
              <span className="font-bold text-white uppercase">{gridCount * gridCount} Units</span>
            </div>
            <div className="border-r border-emerald-950/30">
              <span className="text-neutral-500 block uppercase tracking-wider">ASYMMETRICAL</span>
              <span className="font-bold text-[#10B981] uppercase">{chaosFactor > 0 ? "TRUE" : "FALSE"}</span>
            </div>
            <div>
              <span className="text-neutral-500 block uppercase tracking-wider">STROKE MODE</span>
              <span className="font-bold text-white uppercase">{lineWidth}px Solid</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
