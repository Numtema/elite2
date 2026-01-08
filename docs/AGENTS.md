
# AGENTS – Règles Globales

Ces documents définissent les règles obligatoires pour tout humain ou agent IA
intervenant sur ce projet.

## Stack cible
- Next.js (Conceptuel) / React ESM
- Bun (Runtime recommandé)
- TypeScript strict
- Service Layer Architecture
- Design System centralisé (Elite Theme)
- Mobile-first

## Principes non négociables
- Séparation stricte des responsabilités (UI ≠ Business Logic)
- Aucun contournement de layer (Infrastructure → Service → Presentation)
- Aucun composant sans règles UX "Elite"
- Aucun écran sans accessibilité minimale (WCAG AA)
- Aucun “magic number” sans token Tailwind

## Définition de DONE
- Fonctionnel mobile / tablet / desktop
- Accessible clavier
- États gérés (loading / empty / error)
- Documentation mise à jour
