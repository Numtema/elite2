
import { GoogleGenAI, Type } from "@google/genai";
import { ProjectDashboardConfig } from "../types";
import { CONFIG_PRESETS } from "../config";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const GeminiInfrastructure = {
  async generateConfig(brief: string): Promise<ProjectDashboardConfig> {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Tu es un "Project Dashboard AI Builder". 
      Génère un objet JSON COMPLET pour un dashboard de projet. 
      Brief: ${brief}`,
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

  async chat(message: string, history: any[]): Promise<string> {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "Tu es 'Elite Assistant', un expert en management de projet et IA. Tu aides l'utilisateur à structurer ses idées, définir ses KPIs et gérer ses risques. Ton ton est professionnel, précis et encourageant.",
      }
    });
    const response = await chat.sendMessage({ message });
    return response.text || "Désolé, je n'ai pas pu traiter votre demande.";
  }
};
