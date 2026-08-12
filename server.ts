import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

app.use(express.json());

// API Routes
app.post("/api/generate-site", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: `
        Crie o código HTML e CSS de uma única página para um site baseado no seguinte prompt: "${prompt}".
        O código deve ser moderno, responsivo e usar Tailwind CSS.
        Retorne APENAS o código HTML/CSS pronto para uso.
      `,
    });
    res.json({ content: response.text });
  } catch (error: any) {
    console.error("Gemini Error:", error);
    if (error.message?.includes("API_KEY_INVALID") || !process.env.GEMINI_API_KEY) {
      return res.status(401).json({ error: "Gemini API Key não configurada ou inválida. Por favor, adicione sua chave em Settings > Secrets com o nome GEMINI_API_KEY." });
    }
    res.status(500).json({ error: "Erro ao gerar site: " + error.message });
  }
});

app.post("/api/generate-script", async (req, res) => {
  try {
    const { prompt, language } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: `
        Gere um script funcional em ${language} baseado no seguinte prompt: "${prompt}".
        O código deve ser bem comentado e seguir as melhores práticas.
        Retorne APENAS o código do script.
      `,
    });
    res.json({ code: response.text });
  } catch (error: any) {
    console.error("Gemini Error:", error);
    if (error.message?.includes("API_KEY_INVALID") || !process.env.GEMINI_API_KEY) {
      return res.status(401).json({ error: "Gemini API Key não configurada ou inválida. Por favor, adicione sua chave em Settings > Secrets com o nome GEMINI_API_KEY." });
    }
    res.status(500).json({ error: "Erro ao gerar script: " + error.message });
  }
});

app.post("/api/search-customers", async (req, res) => {
  try {
    const { query } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: `
        Sugira 5 potenciais perfis de clientes (nome, empresa fictícia, nicho, motivo do contato) para o seguinte serviço/produto: "${query}".
        Retorne os dados como um array JSON válido de objetos com as chaves: name, company, niche, reason.
      `,
    });
    const text = response.text || "[]";
    const jsonMatch = text.match(/\[.*\]/s);
    if (jsonMatch) {
      res.json({ results: JSON.parse(jsonMatch[0]) });
    } else {
      res.status(500).json({ error: "Erro ao processar dados de clientes" });
    }
  } catch (error: any) {
    console.error("Gemini Error:", error);
    if (error.message?.includes("API_KEY_INVALID") || !process.env.GEMINI_API_KEY) {
      return res.status(401).json({ error: "Gemini API Key não configurada ou inválida. Por favor, adicione sua chave em Settings > Secrets." });
    }
    res.status(500).json({ error: "Erro ao buscar clientes: " + error.message });
  }
});

// Vite middleware for development
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupVite();
