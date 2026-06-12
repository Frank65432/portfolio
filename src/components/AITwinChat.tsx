import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Bot, Check, Sparkles, Wand2, Terminal, RefreshCw, X } from "lucide-react";

interface Message {
  sender: "user" | "twin";
  text: string;
  timestamp: string;
}

interface AITwinChatProps {
  onSuggestedClick?: (prompt: string) => void;
}

export default function AITwinChat({ onSuggestedClick }: AITwinChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "twin",
      text: "ONLINE // EMULATED_TWIN: I am Frank's virtual memory block. Ask me about custom react architectures, Marvin Clo drop layouts, or YouTube video script algorithms.",
      timestamp: "20:40:02"
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const twinResponses: Record<string, string> = {
    "tell me about marvin clo": 
      "MARVIN CLO is our dynamic apparel laboratory. Every design blends heavyweight long-staple organic cotton loopbacks (450+ GSM) with custom physical branding, double-lined layouts, and high-density technical typography.",
    "what is your tech stack?": 
      "Frank builds specialized design systems with React 18/19, custom Vite bundlers, typed TypeScript records, high-contrast Tailwind v4 layouts, and Framer Motion micro-physics loops.",
    "are you available for contracting work?": 
      "Frank accepts select, performance-driven frontend contracts, modular design system engineering roles, and selective technical consulting. Contact him at frankmarvin518@gmail.com.",
    "default": 
      "SYSTEM: Prompt compiled. Emulated consciousness is analyzing. Feel free to ask about custom react components, clothing brand collections, or review YouTube statistics!"
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const timestamp = new Date().toTimeString().split(' ')[0].substring(0, 5);
    const userMsg: Message = { sender: "user", text: textToSend, timestamp };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setUserInput("");
    setIsTyping(true);

    if (onSuggestedClick) {
      onSuggestedClick(textToSend);
    }

    try {
      // Map existing messages to a simple sender role structure for history context
      const history = updatedMessages.slice(0, -1).map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

      const apiMeta = (import.meta as any);
      const apiBase = apiMeta.env?.VITE_API_URL || (apiMeta.env?.DEV ? "" : "https://portfolio-tvf3.onrender.com");
      const res = await fetch(`${apiBase}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, history }),
      });

      if (!res.ok) {
        throw new Error("Backend response error");
      }

      const data = await res.json();
      const botMsg: Message = {
        sender: "twin",
        text: data.text || "SYSTEM: Received empty response coordinate from model segment.",
        timestamp: new Date().toTimeString().split(' ')[0].substring(0, 5),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.warn("Dynamic API error, switching to twin emulation matrix:", error);
      
      // Intelligent fallback logic if local server key isn't active
      setTimeout(() => {
        const normalized = textToSend.toLowerCase().trim();
        let replyText = twinResponses["default"];

        if (normalized.includes("clo") || normalized.includes("apparel") || normalized.includes("clothing")) {
          replyText = twinResponses["tell me about marvin clo"];
        } else if (normalized.includes("stack") || normalized.includes("typescript") || normalized.includes("tech")) {
          replyText = twinResponses["what is your tech stack?"];
        } else if (normalized.includes("contract") || normalized.includes("work") || normalized.includes("hire")) {
          replyText = twinResponses["are you available for contracting work?"];
        } else {
          replyText = `SYSTEM Fallback [Local Decoders]: I analyzed "${textToSend}". Connect with Frank directly at frankmarvin117@gmail.com for custom React projects, architectural streetwear drops, or video productions.`;
        }

        setMessages((prev) => [
          ...prev,
          { sender: "twin", text: replyText, timestamp: new Date().toTimeString().split(' ')[0].substring(0, 5) },
        ]);
      }, 700);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const renderMessageText = (text: string) => {
    const email = "frankmarvin518@gmail.com";
    if (text.includes(email)) {
      const parts = text.split(email);
      return (
        <span>
          {parts[0]}
          <a
            href={`mailto:${email}`}
            className="text-[var(--theme-accent)] hover:underline font-semibold"
          >
            {email}
          </a>
          {parts[1]}
        </span>
      );
    }
    return text;
  };

  return (
    <div className="tech-card overflow-hidden flex flex-col h-[420px] bg-[var(--theme-bg-card)] border border-[var(--theme-border)] shadow-[0_10px_25px_rgba(0,0,0,0.05)]">
      
      {/* Bot Header band */}
      <div className="p-4 bg-[var(--theme-glow)] border-b border-[var(--theme-border)] text-[var(--theme-text-heading)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-[var(--theme-accent)] animate-bounce" />
          <h3 className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[var(--theme-accent)]">
            AI_TWIN_EMULATION_v4
          </h3>
        </div>
        <span className="text-[8px] font-mono bg-[var(--theme-glow)] border border-[var(--theme-border)] px-2 py-0.5 font-bold uppercase tracking-wider text-[var(--theme-accent)] rounded-full">
          CONSOLE_ONLINE
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[var(--theme-bg-base)]/40" ref={scrollRef}>
        {messages.map((message, idx) => (
          <div
            id={`chat-msg-${idx}`}
            key={idx}
            className={`flex flex-col ${message.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div className="flex items-center gap-1.5 text-[8px] font-mono tracking-wider text-neutral-500 mb-1 font-bold uppercase">
              <span>{message.sender === "twin" ? "COGNITIVE_NODE" : "CLIENT_VISITOR"}</span>
              <span>•</span>
              <span>{message.timestamp}</span>
            </div>

            <div
              className={`max-w-[85%] text-xs p-3 leading-relaxed rounded-xl border ${
                message.sender === "user"
                  ? "bg-[var(--theme-accent)] text-white dark:text-[#050807] border-transparent font-semibold rounded-br-none shadow-[0_4px_10px_var(--theme-glow)]"
                  : "bg-[var(--theme-bg-card)] text-[var(--theme-text)] border-[var(--theme-border)] rounded-bl-none font-normal"
              }`}
            >
              {renderMessageText(message.text)}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 p-3 bg-[var(--theme-bg-base)]/50 border border-[var(--theme-border)] rounded-lg self-start max-w-[80%] text-xs font-mono text-neutral-500">
            <span className="w-1.5 h-1.5 bg-[var(--theme-accent)] rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-[var(--theme-accent)] rounded-full animate-bounce delay-100"></span>
            <span className="w-1.5 h-1.5 bg-[var(--theme-accent)] rounded-full animate-bounce delay-200"></span>
            <span className="text-[8px] uppercase font-bold tracking-widest pl-1 text-[var(--theme-accent)]/80">COMPILING...</span>
          </div>
        )}
      </div>

      {/* Quick Prompts options list */}
      <div className="p-3 bg-[var(--theme-bg-card)] border-t border-[var(--theme-border)] flex flex-wrap gap-1.5">
        <button
          id="chat-quick-btn-stack"
          onClick={() => handleSendMessage("What is your tech stack?")}
          className="px-2.5 py-1.5 bg-[var(--theme-bg-base)] hover:bg-[var(--theme-accent)] hover:text-white border border-[var(--theme-border)] text-[8px] font-mono font-bold uppercase rounded-lg cursor-pointer transition-colors"
        >
          [ TECH_STACK ]
        </button>
        <button
          id="chat-quick-btn-brand"
          onClick={() => handleSendMessage("Tell me about Marvin Clo")}
          className="px-2.5 py-1.5 bg-[var(--theme-bg-base)] hover:bg-[var(--theme-accent)] hover:text-white border border-[var(--theme-border)] text-[8px] font-mono font-bold uppercase rounded-lg cursor-pointer transition-colors"
        >
          [ CLO_DROP ]
        </button>
        <button
          id="chat-quick-btn-contract"
          onClick={() => handleSendMessage("Are you available for contracting work?")}
          className="px-2.5 py-1.5 bg-[var(--theme-bg-base)] hover:bg-[var(--theme-accent)] hover:text-white border border-[var(--theme-border)] text-[8px] font-mono font-bold uppercase rounded-lg cursor-pointer transition-colors"
        >
          [ APPOINT_FRANK ]
        </button>
      </div>

      {/* Input Message Form */}
      <div className="p-3 bg-[var(--theme-bg-card)] border-t border-[var(--theme-border)] flex gap-2">
        <input
          id="chat-user-input"
          type="text"
          placeholder="ENTER STREAM COMMAND..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage(userInput);
          }}
          className="flex-1 py-1.5 px-3 bg-[var(--theme-bg-base)] border border-[var(--theme-border)] rounded-lg text-xs font-mono text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-accent)] placeholder:text-neutral-500 uppercase"
        />
        <button
          id="chat-send-btn"
          onClick={() => handleSendMessage(userInput)}
          className="w-9 h-9 bg-[var(--theme-accent)] hover:opacity-90 text-white rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 shadow-[0_2px_10px_var(--theme-glow)]"
        >
          <Send className="w-3.5 h-3.5 text-white dark:text-[#050807]" />
        </button>
      </div>

    </div>
  );
}
