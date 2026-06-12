import { useState, useEffect } from "react";
import { Play, RotateCcw, Volume2, VolumeX, Eye } from "lucide-react";

export default function TacticalCalculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [history, setHistory] = useState<string[]>(["// CALC_ENGINE_INIT //"]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Core audio context synth for beautiful tactile sound feedback
  const playClickSound = (type: "key" | "operator" | "clear" | "execute") => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (type === "execute") {
        // Higher pitched satisfying ping
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.16);
      } else if (type === "operator") {
        // Mid low click
        osc.type = "triangle";
        osc.frequency.setValueAtTime(330, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      } else if (type === "clear") {
        // Downward sweep click
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.11);
      } else {
        // Soft standard high-end click
        osc.type = "sine";
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      }
    } catch (e) {
      // Ignored if browser blocked context
    }
  };

  const handleNum = (num: string) => {
    playClickSound("key");
    if (display === "0" || display === "Error") {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    playClickSound("operator");
    if (display === "Error") return;
    setEquation(display + " " + op + " ");
    setDisplay("0");
  };

  const handleClear = () => {
    playClickSound("clear");
    setDisplay("0");
    setEquation("");
  };

  const handleBackspace = () => {
    playClickSound("key");
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  };

  const handleSquare = () => {
    playClickSound("operator");
    const val = parseFloat(display);
    if (isNaN(val)) return;
    const result = Math.pow(val, 2);
    setHistory((prev) => [...prev, `[SQUARE] ${val}² = ${result}`]);
    setDisplay(result.toString());
  };

  const handleSqrt = () => {
    playClickSound("operator");
    const val = parseFloat(display);
    if (isNaN(val) || val < 0) {
      setDisplay("Error");
      return;
    }
    const result = Math.sqrt(val);
    setHistory((prev) => [...prev, `[SQRT] √${val} = ${result}`]);
    setDisplay(result.toString());
  };

  const handleCalculate = () => {
    if (!equation) return;
    playClickSound("execute");
    
    try {
      const parts = equation.trim().split(" ");
      if (parts.length < 2) return;
      
      const num1 = parseFloat(parts[0]);
      const op = parts[1];
      const num2 = parseFloat(display);
      
      if (isNaN(num1) || isNaN(num2)) {
        setDisplay("Error");
        return;
      }

      let res = 0;
      switch (op) {
        case "+": res = num1 + num2; break;
        case "-": res = num1 - num2; break;
        case "*": res = num1 * num2; break;
        case "/": 
          if (num2 === 0) {
            setDisplay("Error");
            return;
          }
          res = num1 / num2; 
          break;
        case "%": res = num1 % num2; break;
        default: return;
      }

      // Round to 8 decimal places max to avoid floating point issues
      const formattedRes = Number(res.toFixed(8)).toString();
      
      setHistory((prev) => [...prev, `[EXEC] ${num1} ${op} ${num2} = ${formattedRes}`]);
      setDisplay(formattedRes);
      setEquation("");
    } catch {
      setDisplay("Error");
    }
  };

  return (
    <div id="tactical-calculator-module" className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[var(--theme-bg-card)] border border-[var(--theme-border)] p-5 rounded-2xl relative overflow-hidden">
      
      {/* Decorative accent indicators */}
      <div className="absolute top-2 right-4 flex gap-1.5 items-center">
        <span className="text-[8px] font-mono text-neutral-500 uppercase">SYS_AUDIO</span>
        <button
          id="calc-sound-toggle"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
            soundEnabled 
              ? "text-[var(--theme-accent)] border-[var(--theme-border)] bg-[var(--theme-glow)]" 
              : "text-neutral-500 border-[var(--theme-border)] bg-[var(--theme-bg-base)]"
          }`}
        >
          {soundEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
        </button>
      </div>

      {/* Main Grid: Left is Calculator keypad, Right is Terminal Execution Log */}
      <div className="lg:col-span-7 flex flex-col space-y-3.5">
        
        {/* Virtual screen display */}
        <div className="bg-[var(--theme-bg-base)] border border-[var(--theme-border)] rounded-xl p-4 flex flex-col items-end justify-between min-h-[90px] font-mono relative overflow-hidden shadow-inner">
          <div className="absolute top-1 left-2 text-[8px] text-neutral-500 font-bold uppercase tracking-widest">// COGNITIVE_BUFFER</div>
          
          <div className="text-[10px] text-neutral-500 select-all tracking-wider h-5 flex items-center justify-end w-full pr-1">
            {equation}
          </div>
          <div className="text-2xl font-black text-[var(--theme-text-heading)] select-all w-full text-right overflow-x-auto whitespace-nowrap scrollbar-none pr-1 tracking-tight">
            {display}
          </div>
        </div>

        {/* Tactical Keypad */}
        <div className="grid grid-cols-4 gap-2">
          
          {/* Scientific row */}
          <button id="calc-btn-clear" onClick={handleClear} className="py-3 bg-[var(--theme-bg-base)] hover:opacity-80 text-[var(--theme-text)] font-mono text-xs font-bold rounded-lg border border-[var(--theme-border)] transition-all cursor-pointer uppercase">C</button>
          <button id="calc-btn-square" onClick={handleSquare} className="py-3 bg-[var(--theme-bg-base)] hover:opacity-80 text-[var(--theme-text-muted)] font-mono text-xs rounded-lg border border-[var(--theme-border)] transition-all cursor-pointer">x²</button>
          <button id="calc-btn-sqrt" onClick={handleSqrt} className="py-3 bg-[var(--theme-bg-base)] hover:opacity-80 text-[var(--theme-text-muted)] font-mono text-xs rounded-lg border border-[var(--theme-border)] transition-all cursor-pointer">√x</button>
          <button id="calc-btn-back" onClick={handleBackspace} className="py-3 bg-[var(--theme-bg-base)] hover:opacity-80 text-[var(--theme-text)] font-mono text-xs rounded-lg border border-[var(--theme-border)] transition-all cursor-pointer font-bold select-none">&larr;</button>

          {/* Numbers & standard operations */}
          {["7", "8", "9"].map((num) => (
            <button
              id={`calc-btn-${num}`}
              key={num}
              onClick={() => handleNum(num)}
              className="py-3.5 bg-[var(--theme-bg-base)] hover:opacity-85 text-[var(--theme-text)] font-mono text-sm font-semibold rounded-lg border border-[var(--theme-border)] transition-all cursor-pointer"
            >
              {num}
            </button>
          ))}
          <button id="calc-btn-div" onClick={() => handleOperator("/")} className="py-3.5 bg-[var(--theme-glow)] hover:bg-[var(--theme-border)] text-[var(--theme-accent)] font-mono text-sm font-bold rounded-lg border border-[var(--theme-border)] transition-all cursor-pointer">/</button>

          {["4", "5", "6"].map((num) => (
            <button
              id={`calc-btn-${num}`}
              key={num}
              onClick={() => handleNum(num)}
              className="py-3.5 bg-[var(--theme-bg-base)] hover:opacity-85 text-[var(--theme-text)] font-mono text-sm font-semibold rounded-lg border border-[var(--theme-border)] transition-all cursor-pointer"
            >
              {num}
            </button>
          ))}
          <button id="calc-btn-mul" onClick={() => handleOperator("*")} className="py-3.5 bg-[var(--theme-glow)] hover:bg-[var(--theme-border)] text-[var(--theme-accent)] font-mono text-sm font-bold rounded-lg border border-[var(--theme-border)] transition-all cursor-pointer">*</button>

          {["1", "2", "3"].map((num) => (
            <button
              id={`calc-btn-${num}`}
              key={num}
              onClick={() => handleNum(num)}
              className="py-3.5 bg-[var(--theme-bg-base)] hover:opacity-85 text-[var(--theme-text)] font-mono text-sm font-semibold rounded-lg border border-[var(--theme-border)] transition-all cursor-pointer"
            >
              {num}
            </button>
          ))}
          <button id="calc-btn-sub" onClick={() => handleOperator("-")} className="py-3.5 bg-[var(--theme-glow)] hover:bg-[var(--theme-border)] text-[var(--theme-accent)] font-mono text-sm font-bold rounded-lg border border-[var(--theme-border)] transition-all cursor-pointer">-</button>

          {/* Bottom row */}
          <button id="calc-btn-0" onClick={() => handleNum("0")} className="col-span-2 py-3.5 bg-[var(--theme-bg-base)] hover:opacity-85 text-[var(--theme-text)] font-mono text-sm font-semibold rounded-lg border border-[var(--theme-border)] transition-all cursor-pointer">0</button>
          <button id="calc-btn-dot" onClick={() => handleNum(".")} className="py-3.5 bg-[var(--theme-bg-base)] hover:opacity-85 text-[var(--theme-text)] font-mono text-sm font-semibold rounded-lg border border-[var(--theme-border)] transition-all cursor-pointer">.</button>
          <button id="calc-btn-add" onClick={() => handleOperator("+")} className="py-3.5 bg-[var(--theme-glow)] hover:bg-[var(--theme-border)] text-[var(--theme-accent)] font-mono text-sm font-bold rounded-lg border border-[var(--theme-border)] transition-all cursor-pointer">+</button>
          
          <button
            id="calc-btn-eq"
            onClick={handleCalculate}
            className="col-span-4 mt-2 py-4 bg-gradient-to-r from-[var(--theme-accent)] to-[var(--theme-accent-hover)] text-[#050807] font-sans text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_4px_12px_var(--theme-glow)] hover:scale-[1.01] cursor-pointer cursor-interactive"
          >
            Execute Computation
          </button>
        </div>
      </div>

      {/* Terminal History Tape Output */}
      <div className="lg:col-span-5 flex flex-col h-full justify-between space-y-3">
        <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-2">
          <div className="flex items-center gap-1.5 font-mono text-[9px] text-[var(--theme-accent)] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] animate-pulse"></span>
            <span>COMPILING_LEDGER_TAPE</span>
          </div>
          <button
            id="clear-calc-history"
            onClick={() => {
              playClickSound("clear");
              setHistory(["// CONSOLE_CLEARED //"]);
            }}
            className="text-[8px] font-mono text-neutral-500 hover:text-[var(--theme-accent)] transition-colors uppercase cursor-pointer"
          >
            Clear Log
          </button>
        </div>

        <div className="bg-[var(--theme-bg-base)] border border-[var(--theme-border)] rounded-xl p-3.5 h-[230px] overflow-y-auto custom-scrollbar font-mono text-[9px] text-neutral-400 space-y-1.5 flex flex-col justify-end">
          <div className="space-y-1">
            {history.map((line, idx) => (
              <div key={idx} className="leading-tight break-all border-l-2 border-dashed border-[var(--theme-border)]/50 pl-2">
                <span className="text-neutral-500 block text-[8px] opacity-70">
                  [{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}] // SECURE
                </span>
                <span className={line.includes("EXEC") || line.includes("SQUARE") || line.includes("SQRT") ? "text-[var(--theme-accent)] font-semibold" : "text-neutral-500"}>
                  {line}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-2.5 bg-[var(--theme-glow)] border border-[var(--theme-border)] text-[8px] font-mono rounded-lg flex items-center justify-between text-neutral-400">
          <span>COEFF SPEED: ~0.02ms</span>
          <span>SENS: HIGH_TAPE</span>
        </div>
      </div>
    </div>
  );
}
