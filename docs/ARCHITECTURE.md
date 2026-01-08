
# Architecture Générale

## Pattern
Service Layer Architecture + Configuration Driven UI

## Layers
1. **Presentation Layer**
   - App.tsx (Main orchestrator)
   - components/ (UI, modules)
   - hooks/ (UI Logic)

2. **Application Layer**
   - services/projectService.ts (Orchestrates domain logic)

3. **Domain Layer**
   - types.ts (Pure entities and interfaces)
   - config.ts (Static presets)

4. **Infrastructure Layer**
   - services/geminiService.ts (External AI API)

## Flux type
UI Action → ProjectService → GeminiService → Gemini API → UI Update
