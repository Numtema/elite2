# Processus Reproductible

## Étapes standard pour une nouvelle feature
1. **Analyse du Type** : Mettre à jour `types.ts` si la config change.
2. **Preset Update** : Ajouter les données par défaut dans `config.ts`.
3. **Composant UI** : Créer le module dans `components/Dashboard/`.
4. **Integration Page** : Brancher le composant dans `App.tsx` via `activeTab`.
5. **AI Builder Alignment** : Mettre à jour le prompt dans `geminiService.ts` pour que l'IA sache générer cette nouvelle feature.
