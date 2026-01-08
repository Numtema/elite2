
import { GoogleGenAI, Type } from "@google/genai";
import { ProjectDashboardConfig } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function generateProjectConfig(brief: string): Promise<ProjectDashboardConfig> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Tu es un "Project Dashboard AI Builder". Génère une configuration JSON complète basée sur ce brief : ${brief}`,
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
              target: { type: Type.STRING, description: "people|business|university|government" },
              owner: { type: Type.STRING },
              startDate: { type: Type.STRING },
              endDate: { type: Type.STRING },
              status: { type: Type.STRING, description: "on_track|at_risk|delayed" },
              estimated: { type: Type.BOOLEAN }
            },
            required: ["name", "type", "target", "owner", "startDate", "endDate", "status", "estimated"]
          },
          sidebar: {
            type: Type.OBJECT,
            properties: {
              items: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    label: { type: Type.STRING }
                  }
                }
              }
            }
          },
          overview: {
            type: Type.OBJECT,
            properties: {
              kpiTiles: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING },
                    value: { type: Type.STRING },
                    trend: { type: Type.STRING, description: "up|down|flat" },
                    note: { type: Type.STRING }
                  }
                }
              },
              spotlight: {
                type: Type.OBJECT,
                properties: {
                  badge: { type: Type.STRING },
                  title: { type: Type.STRING },
                  subtitle: { type: Type.STRING }
                }
              },
              weeklyGoal: {
                type: Type.OBJECT,
                properties: {
                  percent: { type: Type.NUMBER },
                  title: { type: Type.STRING },
                  subtitle: { type: Type.STRING }
                }
              }
            }
          },
          backlog: {
            type: Type.OBJECT,
            properties: {
              items: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING },
                    priority: { type: Type.STRING },
                    status: { type: Type.STRING },
                    owner: { type: Type.STRING },
                    dueDate: { type: Type.STRING }
                  }
                }
              }
            }
          },
          milestones: {
            type: Type.OBJECT,
            properties: {
              items: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING },
                    date: { type: Type.STRING },
                    status: { type: Type.STRING },
                    notes: { type: Type.STRING }
                  }
                }
              }
            }
          },
          deliverables: {
            type: Type.OBJECT,
            properties: {
              items: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING },
                    status: { type: Type.STRING },
                    validator: { type: Type.STRING },
                    dueDate: { type: Type.STRING }
                  }
                }
              }
            }
          },
          risks: {
            type: Type.OBJECT,
            properties: {
              items: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    risk: { type: Type.STRING },
                    severity: { type: Type.STRING },
                    probability: { type: Type.STRING },
                    mitigation: { type: Type.STRING },
                    owner: { type: Type.STRING },
                    status: { type: Type.STRING }
                  }
                }
              }
            }
          },
          docs: {
            type: Type.OBJECT,
            properties: {
              decisionLog: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    date: { type: Type.STRING },
                    decision: { type: Type.STRING },
                    impact: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  return JSON.parse(response.text);
}
