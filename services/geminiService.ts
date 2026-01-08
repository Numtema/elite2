import { GoogleGenAI, Type, Modality } from "@google/genai";
import { ProjectDashboardConfig } from "../types";
import { CONFIG_PRESETS } from "../config";

// Note: GoogleGenAI is instantiated per-call to ensure usage of the most current API key and state.

export const GeminiInfrastructure = {
  async generateConfig(brief: string): Promise<ProjectDashboardConfig> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts: [{ text: `Tu es un "Project Dashboard AI Builder". Génère un objet JSON COMPLET pour un dashboard de projet. Brief: ${brief}` }] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            project: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                type: { type: Type.STRING },
                target: { type: Type.STRING },
                owner: { type: Type.STRING },
                startDate: { type: Type.STRING },
                endDate: { type: Type.STRING },
                status: { type: Type.STRING },
                estimated: { type: Type.BOOLEAN }
              },
              required: ["name", "type", "target", "owner", "startDate", "endDate", "status", "estimated"]
            },
            sidebar: {
              type: Type.OBJECT,
              properties: {
                items: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.STRING }, label: { type: Type.STRING } } } }
              }
            },
            overview: {
              type: Type.OBJECT,
              properties: {
                kpiTiles: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { label: { type: Type.STRING }, value: { type: Type.STRING }, trend: { type: Type.STRING }, note: { type: Type.STRING } } } },
                spotlight: { type: Type.OBJECT, properties: { badge: { type: Type.STRING }, title: { type: Type.STRING }, subtitle: { type: Type.STRING } } },
                weeklyGoal: { type: Type.OBJECT, properties: { percent: { type: Type.NUMBER }, title: { type: Type.STRING }, subtitle: { type: Type.STRING } } }
              }
            },
            backlog: { type: Type.OBJECT, properties: { items: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.STRING }, title: { type: Type.STRING }, priority: { type: Type.STRING }, status: { type: Type.STRING }, owner: { type: Type.STRING }, dueDate: { type: Type.STRING } } } } } },
            milestones: { type: Type.OBJECT, properties: { items: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.STRING }, title: { type: Type.STRING }, date: { type: Type.STRING }, status: { type: Type.STRING }, notes: { type: Type.STRING } } } } } },
            deliverables: { type: Type.OBJECT, properties: { items: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.STRING }, title: { type: Type.STRING }, status: { type: Type.STRING }, validator: { type: Type.STRING }, dueDate: { type: Type.STRING } } } } } },
            risks: { type: Type.OBJECT, properties: { items: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.STRING }, risk: { type: Type.STRING }, severity: { type: Type.STRING }, probability: { type: Type.STRING }, mitigation: { type: Type.STRING }, owner: { type: Type.STRING }, status: { type: Type.STRING } } } } } },
            docs: { type: Type.OBJECT, properties: { decisionLog: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.STRING }, date: { type: Type.STRING }, decision: { type: Type.STRING }, impact: { type: Type.STRING } } } } } }
          }
        }
      }
    });

    const generated = JSON.parse(response.text || "{}");
    const base = CONFIG_PRESETS.people;
    return { ...base, ...generated };
  },

  async generateMarketingImage(prompt: string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: `Luxurious SaaS high-tech visual for: ${prompt}. Cinematic lighting, emerald green and midnight blue palette, professional, 4k.` }] },
      config: { imageConfig: { aspectRatio: "16:9" } }
    });
    // Iterate to find the image part as recommended
    const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    return part ? `data:image/png;base64,${part.inlineData.data}` : "";
  },

  async generateVideoDemo(prompt: string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `Premium SaaS dashboard demo animation showing growth and AI features for: ${prompt}. Midnight blue and green emerald aesthetic.`,
      config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
    });
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.getVideosOperation({ operation });
    }
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    return downloadLink ? `${downloadLink}&key=${process.env.API_KEY}` : "";
  },

  async generateDataLayer(brief: string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const systemPrompt = `Tu es DataBuilderAgent, un agent senior data + backend.
    Output : Markdown structuré avec sections (Summary, Model, SQL DDL, Migrations, Seeds, Analytics Queries, API Contract).`;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: { parts: [{ text: `Génère le document Markdown complet pour ce brief SaaS : ${brief}` }] },
      config: { systemInstruction: systemPrompt }
    });
    return response.text || "Erreur de génération.";
  },

  async chat(message: string, history: any[]): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "Tu es 'Elite Assistant', un expert en management de projet et IA.",
      }
    });
    const response = await chat.sendMessage({ message });
    return response.text || "Erreur.";
  },

  connectLive(callbacks: any) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    return ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-12-2025',
      callbacks,
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
        systemInstruction: "Tu es un Business Strategist de haut niveau. Tu aides à concevoir des SaaS. Ton ton est calme, intelligent et visionnaire. Tu parles uniquement par voix."
      }
    });
  }
};