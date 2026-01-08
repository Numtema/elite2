
# Processus Reproductible

## Étapes standard
1. Définir le besoin (Fonction + UX Elite)
2. Créer une règle UX si absente dans `docs/UX/`
3. Implémenter le composant UI dans `components/`
4. Mettre à jour `ProjectService` pour intégrer la nouvelle logique
5. Connecter l'UI à `App.tsx`
6. Tester le responsive
7. Documenter dans `docs/`

## Interdits
- Coder sans règle UX Elite (arrondis 2.5rem, midnight blue)
- Ajouter une feature sans état d’erreur ou de chargement
- Bypasser le service layer
