import { useState, useEffect, FormEvent } from "react";
import { Plus, Check, Trash2, ListFilter, Activity, AlignLeft, ShieldAlert } from "lucide-react";

interface GeometricTask {
  id: string;
  label: string;
  priority: "critical" | "high" | "routine";
  category: "engineering" | "apparel" | "creator";
  completed: boolean;
  createdAt: string;
}

export default function GeometricTodo() {
  const [tasks, setTasks] = useState<GeometricTask[]>(() => {
    const saved = localStorage.getItem("frank_portfolio_tasks");
    if (saved) {
      try { return JSON.parse(saved); } catch { return []; }
    }
    // High-fidelity default tasks aligned to Frank Marvin's portfolio
    return [
      {
        id: "t1",
        label: "Benchmark canvas render speed & reduce CPU coordinate calculations",
        priority: "critical",
        category: "engineering",
        completed: false,
        createdAt: "10:30 AM"
      },
      {
        id: "t2",
        label: "Finalize high-density puff ink sample print layout for react archive tee",
        priority: "high",
        category: "apparel",
        completed: true,
        createdAt: "Yesterday"
      },
      {
        id: "t3",
        label: "Construct design layout system video for Framer Motion v4 animations",
        priority: "routine",
        category: "creator",
        completed: false,
        createdAt: "2 days ago"
      }
    ];
  });

  const [newLabel, setNewLabel] = useState("");
  const [priority, setPriority] = useState<"critical" | "high" | "routine">("high");
  const [category, setCategory] = useState<"engineering" | "apparel" | "creator">("engineering");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    localStorage.setItem("frank_portfolio_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;

    const newTask: GeometricTask = {
      id: "task-" + Date.now(),
      label: newLabel.trim(),
      priority,
      category,
      completed: false,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTasks((prev) => [newTask, ...prev]);
    setNewLabel("");
  };

  const handleToggle = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const ratio = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div id="geometric-todo-module" className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[var(--theme-bg-card)] border border-[var(--theme-border)] p-5 rounded-2xl relative overflow-hidden">
      
      {/* Upper info band */}
      <div className="lg:col-span-12 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[var(--theme-border)] pb-4 gap-4">
        <div>
          <span className="text-[9px] font-mono tracking-widest text-[var(--theme-accent)] uppercase block">// SECURE TASK INGESTION ENGINE</span>
          <h4 className="font-display font-black text-sm text-[var(--theme-text-heading)] uppercase tracking-tight mt-0.5">Tactical Objective Ledger</h4>
        </div>
        
        {/* Progress Telemetry */}
        <div className="flex items-center gap-4 bg-[var(--theme-bg-base)]/80 px-3 py-2 rounded-xl border border-[var(--theme-border)] w-full md:w-auto">
          <div className="space-y-1">
            <div className="flex justify-between font-mono text-[8px] text-neutral-400">
              <span>LEDGER COMPILATION</span>
              <span className="text-[var(--theme-accent)] font-bold">{ratio}% DONE</span>
            </div>
            <div className="w-36 bg-neutral-900 border border-neutral-800/85 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[var(--theme-accent)] to-[var(--theme-accent-hover)] h-full transition-all duration-500 rounded-full"
                style={{ width: `${ratio}%` }}
              ></div>
            </div>
          </div>
          <div className="font-display font-extrabold text-[var(--theme-text)] text-sm tracking-tight border-l border-[var(--theme-border)] pl-3">
            {completedCount}/{tasks.length}
          </div>
        </div>
      </div>

      {/* Left Columns: Ingestion Input Form */}
      <form onSubmit={handleAddTask} className="lg:col-span-5 space-y-4">
        <div className="space-y-1">
          <label className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider block font-bold">New System Task Node</label>
          <div className="relative">
            <input
              id="todo-add-input"
              type="text"
              placeholder="Inject new task coordinate..."
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              className="w-full bg-[var(--theme-bg-base)] border border-[var(--theme-border)] rounded-xl px-3.5 py-3 text-xs text-[var(--theme-text)] placeholder:text-neutral-500 font-sans focus:outline-none focus:border-[var(--theme-accent)]/50 transition-all font-medium"
            />
          </div>
        </div>

        {/* Priority Segments selector */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider block font-bold">Priority Status</label>
          <div className="grid grid-cols-3 gap-1.5">
            {(["critical", "high", "routine"] as const).map((p) => {
              const isActive = priority === p;
              return (
                <button
                  id={`todo-priority-${p}`}
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`py-2 text-[9px] font-mono rounded-lg border tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? p === "critical"
                        ? "bg-red-500/10 border-red-500/50 text-red-500 dark:text-red-400 font-bold"
                        : p === "high"
                        ? "bg-amber-500/10 border-amber-500/50 text-amber-600 dark:text-amber-400 font-bold"
                        : "bg-emerald-500/10 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 font-bold"
                      : "bg-[var(--theme-bg-base)] border-[var(--theme-border)] text-neutral-500 hover:text-neutral-400"
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category segment selectors */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider block font-bold">Division Segment</label>
          <div className="grid grid-cols-3 gap-1.5">
            {(["engineering", "apparel", "creator"] as const).map((cat) => {
              const isActive = category === cat;
              return (
                <button
                  id={`todo-category-${cat}`}
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-2 text-[9px] font-mono rounded-lg border tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[var(--theme-glow)] border-[var(--theme-accent)] text-[var(--theme-text-heading)] font-bold"
                      : "bg-[var(--theme-bg-base)] border-[var(--theme-border)] text-neutral-500 hover:text-neutral-400"
                  }`}
                >
                  {cat === "engineering" ? "ENGINE" : cat === "apparel" ? "APPAREL" : "CREATOR"}
                </button>
              );
            })}
          </div>
        </div>

        <button
          id="todo-submit-btn"
          type="submit"
          disabled={!newLabel.trim()}
          className="w-full py-3.5 bg-gradient-to-r from-[var(--theme-accent)] to-[var(--theme-accent-hover)] disabled:from-neutral-900 disabled:to-neutral-900 disabled:text-neutral-600 disabled:border-transparent text-white dark:text-[#050807] font-semibold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow-[0_4px_12px_var(--theme-glow)] hover:scale-[1.01] cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 font-extrabold" />
          <span>Ingest Task Node</span>
        </button>
      </form>

      {/* Right Columns: Target Node List */}
      <div className="lg:col-span-7 flex flex-col space-y-3">
        
        {/* Toggle Filters bar */}
        <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-2">
          <div className="flex items-center gap-1.5 text-neutral-500 font-mono text-[9px]">
            <ListFilter className="w-3 h-3 text-[var(--theme-accent)]" />
            <span>SORT_BY:</span>
          </div>
          <div className="flex items-center gap-1">
            {(["all", "active", "completed"] as const).map((f) => (
              <button
                id={`todo-filter-${f}`}
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`px-2.5 py-1 rounded text-[8px] font-mono uppercase tracking-wide transition-all cursor-pointer ${
                  filter === f
                    ? "bg-[var(--theme-border)] text-[var(--theme-text-heading)] border border-[var(--theme-border)]"
                    : "text-neutral-500 hover:text-neutral-400 border border-transparent"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Nodes lists */}
        <div className="space-y-2 h-[260px] overflow-y-auto custom-scrollbar pr-1">
          {filteredTasks.map((t) => {
            const priorityColors = {
              critical: "border-red-500/25 bg-red-950/5 text-red-500 dark:text-red-400",
              high: "border-amber-500/25 bg-amber-950/5 text-amber-600 dark:text-amber-400",
              routine: "border-emerald-500/25 bg-emerald-950/5 text-emerald-600 dark:text-emerald-400",
            };

            const categoryLabels = {
              engineering: "SYS_ENGINEERING",
              apparel: "PHYSICAL_APPAREL",
              creator: "CREATOR_ASSET",
            };

            return (
              <div
                id={`todo-item-${t.id}`}
                key={t.id}
                className={`p-3.5 border rounded-xl flex items-center justify-between gap-3 backdrop-blur-sm transition-all duration-300 ${
                  t.completed 
                    ? "border-[var(--theme-border)]/30 bg-[var(--theme-bg-base)]/40 opacity-55" 
                    : "border-[var(--theme-border)] bg-[var(--theme-bg-card)] hover:border-[var(--theme-accent)]/20"
                }`}
              >
                <div className="flex items-center gap-3 w-full min-w-0">
                  {/* Styled Check checkbox frame */}
                  <button
                    id={`todo-checkbox-${t.id}`}
                    type="button"
                    onClick={() => handleToggle(t.id)}
                    className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-all ${
                      t.completed
                        ? "bg-[var(--theme-accent)] border-transparent text-white dark:text-[#050807]"
                        : "border-[var(--theme-border)] hover:border-[var(--theme-accent)]"
                    }`}
                  >
                    {t.completed && <Check className="w-2.5 h-2.5 stroke-[3px]" />}
                  </button>

                  <div className="space-y-1 min-w-0 flex-1">
                    <span 
                      className={`text-xs block font-sans truncate ${
                        t.completed ? "line-through text-neutral-500 font-normal" : "text-[var(--theme-text-heading)] font-medium"
                      }`}
                    >
                      {t.label}
                    </span>
                    <div className="flex items-center gap-2 font-mono text-[8px] tracking-wider font-semibold">
                      <span className={`px-2 py-0.5 rounded border ${priorityColors[t.priority]}`}>
                        {t.priority.toUpperCase()}
                      </span>
                      <span className="text-neutral-500">
                        {categoryLabels[t.category]}
                      </span>
                      <span className="text-neutral-500/80 font-normal">
                        @{t.createdAt}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  id={`todo-delete-${t.id}`}
                  type="button"
                  onClick={() => handleDelete(t.id)}
                  className="text-neutral-500 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-500/5 cursor-pointer shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}

          {filteredTasks.length === 0 && (
            <div className="py-12 text-center text-neutral-500/70 text-[10px] font-mono uppercase bg-[var(--theme-bg-base)]/25 rounded-xl border border-dashed border-[var(--theme-border)]">
              [ NO_CORRESPONDENT_TASKS_DETAILED ]
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-[8px] font-mono text-neutral-500 pt-1">
          <span>PERSISTENCE: LOCAL_STORAGE (SYNCED)</span>
          <span>STABLE SECURE ENGINE</span>
        </div>
      </div>
    </div>
  );
}
