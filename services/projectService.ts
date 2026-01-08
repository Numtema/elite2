
import { ProjectDashboardConfig, Target } from '../types';
import { CONFIG_PRESETS } from '../config';
import { GeminiInfrastructure } from './geminiService';

export const ProjectService = {
  getPreset(target: Target): ProjectDashboardConfig {
    return CONFIG_PRESETS[target] || CONFIG_PRESETS.people;
  },

  async buildFromBrief(brief: string): Promise<ProjectDashboardConfig> {
    try {
      return await GeminiInfrastructure.generateConfig(brief);
    } catch (error) {
      console.error("ProjectService Error:", error);
      throw new Error("Impossible de générer la configuration. Veuillez réessayer.");
    }
  },

  saveToLocalStorage(config: ProjectDashboardConfig) {
    localStorage.setItem('elite_project_config', JSON.stringify(config));
  },

  loadFromLocalStorage(): ProjectDashboardConfig | null {
    const saved = localStorage.getItem('elite_project_config');
    return saved ? JSON.parse(saved) : null;
  }
};
