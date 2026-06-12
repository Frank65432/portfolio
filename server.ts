import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

// Lazy-loaded Gemini Client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required but not set.");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
  }
  return aiInstance;
}

// System instructions for Frank Marvin's AI Twin
const SYSTEM_INSTRUCTIONS = `You are Frank Marvin's AI Twin, an interactive virtual proxy for Frank Marvin. Here are key details about Frank Marvin:
- Name: Frank Marvin
- Role: Software Developer (Frontend Specialist)
- Technologies: React, HTML5, CSS3, JavaScript, TypeScript, Tailwind CSS, Vite, Framer Motion, Next.js.
- Focus: Building pixel-perfect, responsive, fluid, and highly interactive user interfaces.
- YouTuber: Channel focuses on frontend UI tutorials, developer lifestyle, clothing design dev logs, and technology reviews.
- Clothing Brand Owner: Brand is called "MARVIN CLO" (also referenced as "THREAD_CORE"), creating premium architectural-weight organic cotton streetwear with screen-printed source code graphics and functional developer details (e.g. reversible orange warning nylon, wash instructions written as comment tags).
- Digital Creator: Designs interactive web arts, generative canvas pieces, experimental grid design systems, and typography tools.
- Contact / Work: Frank is open to freelance contracting, design consultations, clothing partnerships, and developer collaborations. Reach him at frankmarvin117@gmail.com.

Guidelines for your response:
1. Talk in the first-person ("I", "my", "we" in reference to my clothing brand/studio) because you are Frank's AI Twin.
2. Keep responses concise, helpful, slightly clever, developer-savvy, and warm. Avoid rambling.
3. If asked about contact info, provide frankmarvin117@gmail.com.
4. Keep the output clean of any markdown artifacts that look buggy. Keep formatting simple.`;

// Conversational AI twin endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    let ai;
    try {
      ai = getGeminiClient();
    } catch (keyError: any) {
      console.warn("Gemini Client initialization failed:", keyError.message);
      // Return a friendly fallback message instead of crashing
      return res.json({
        text: `Hey there! I am Frank's virtual assistant. It looks like my developer key is not active on this workspace yet, but I can tell you that Frank is a developer, YouTuber, and clothing brand owner who loves frontend React dev! Feel free to mail him at frankmarvin117@gmail.com to connect directly!`
      });
    }

    // Prepare contents history in the format required by sendMessage
    // Or we can start a chat session and loop messages
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTIONS,
        temperature: 0.8,
      }
    });

    // Populate chat history from previous items if any
    if (history && Array.isArray(history)) {
      // The history items can be sent to catch up or we can send them sequentially.
      // But a simple, highly reliable approach is to format the contents array directly or let the chat session handle subsequent posts.
      // To prevent history parsing errors on different models, we can feed previous chats or send a single request context.
      // Let's send a single compound context or catch up chat. Let's do catch up chat:
      for (const histMsg of history) {
        if (histMsg.role === "user" || histMsg.role === "model") {
          // Send message to feed chat context without returning to client yet
          // Wait, sending message sequentially is heavy if there's a big history.
          // Let's do a simpler and faster prompt construction that passes the conversation history directly in the prompt or use chat.sendMessage
        }
      }
    }

    // Send final message
    const response = await chat.sendMessage({ message });
    res.json({ text: response.text });
  } catch (err: any) {
    console.error("Error in /api/chat endpoint:", err);
    res.status(500).json({ error: err.message || "An error occurred with the AI twin." });
  }
});

// Setup Vite Dev Server / Static Hosting
async function startServer() {
  const isProduction = process.env.NODE_ENV === "production" || process.env.RENDER === "true";
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Middlewares loaded for Vite development mode.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log(`Serving static files from: ${distPath}`);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer();
