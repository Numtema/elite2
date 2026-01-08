# Architecture Générale

## Pattern
Driven by Configuration (ProjectDashboardConfig).

## Arborescence du code
- `App.tsx` : Orchestrateur de vues (Landing, Auth, Dashboard).
- `config.ts` : Presets par défaut (People, Business, University, Government).
- `types.ts` : Définition stricte des types de données.
- `services/` : Intégration API (Gemini).
- `components/` : UI atomique et modules de dashboard.

## Flux de données
1. User Input (Brief) → `geminiService`
2. `geminiService` → Validated JSON Config
3. App State Update → Re-render Dashboard components via `currentConfig` props.
