
import { ProjectDashboardConfig } from './types';

export const CONFIG_PRESETS: Record<string, ProjectDashboardConfig> = {
  people: {
    project: {
      name: "Elite Prompting — B2C Essentials",
      type: "landing_page",
      target: "people",
      owner: "Sarah Jenkins",
      startDate: "2026-01-08",
      endDate: "2026-02-05",
      status: "on_track",
      estimated: true
    },
    sidebar: {
      items: [
        { id: "overview", label: "Vue d'ensemble" },
        { id: "backlog", label: "Backlog" },
        { id: "milestones", label: "Jalons" },
        { id: "deliverables", label: "Livrables" },
        { id: "risks", label: "Risques" },
        { id: "kpis", label: "KPIs" },
        { id: "docs", label: "Docs" },
        { id: "ai-builder", label: "AI Builder" }
      ]
    },
    overview: {
      kpiTiles: [
        { label: "Avancement", value: "18%", trend: "up", note: "Wireframe validé, copy en cours" },
        { label: "Budget", value: "12%", trend: "flat", note: "Design + dev interne" },
        { label: "Délais", value: "6", trend: "flat", note: "6 jours de marge" },
        { label: "Qualité", value: "2", trend: "down", note: "2 points UX à corriger" }
      ],
      spotlight: {
        badge: "Jalon clé",
        title: "Finaliser le Hero + Preuves Sociales",
        subtitle: "Objectif : augmenter le taux de clic CTA et réduire la confusion sur l'offre."
      },
      weeklyGoal: {
        percent: 35,
        title: "Objectif hebdomadaire",
        subtitle: "Livrer 1er draft complet (Hero → FAQ) + 2 variantes de copy."
      }
    },
    backlog: {
      items: [
        { id: "T-001", title: "Définir proposition de valeur (1 phrase + 3 preuves)", priority: "P0", status: "doing", owner: "PM", dueDate: "2026-01-10" },
        { id: "T-002", title: "Écrire copy Hero + CTA (2 variantes)", priority: "P0", status: "todo", owner: "Copy", dueDate: "2026-01-11" },
        { id: "T-003", title: "Section 'Ce que vous apprendrez' (5 bullets action)", priority: "P1", status: "todo", owner: "Copy", dueDate: "2026-01-12" },
        { id: "T-004", title: "Syllabus (4 modules) + durées", priority: "P1", status: "todo", owner: "PM", dueDate: "2026-01-12" }
      ]
    },
    milestones: {
      items: [
        { id: "M-01", title: "Contenu V1 complet", date: "2026-01-14", status: "in_progress", notes: "Hero, valeur, syllabus, témoignages, FAQ." },
        { id: "M-02", title: "Intégration + tracking", date: "2026-01-17", status: "planned", notes: "GA4/Matomo + events CTA." }
      ]
    },
    deliverables: {
      items: [
        { id: "D-01", title: "Wireframe + structure sections", status: "approved", validator: "Stakeholder", dueDate: "2026-01-09" },
        { id: "D-02", title: "Copy V1 (Hero→FAQ)", status: "draft", validator: "Marketing", dueDate: "2026-01-14" }
      ]
    },
    risks: {
      items: [
        { id: "R-01", risk: "Promesse floue → faible conversion", severity: "high", probability: "med", mitigation: "2 versions Hero + tests rapides.", owner: "PM", status: "open" }
      ]
    },
    docs: {
      decisionLog: [
        { id: "DEC-01", date: "2026-01-08", decision: "Structure type Coursera (Hero→FAQ)", impact: "Permet duplications rapides par segment." }
      ]
    }
  },
  business: {
    project: {
      name: "Enterprise AI Training — Scaling ROI",
      type: "landing_page",
      target: "business",
      owner: "Marc Lefebvre",
      startDate: "2026-01-08",
      endDate: "2026-02-12",
      status: "at_risk",
      estimated: true
    },
    sidebar: {
      items: [
        { id: "overview", label: "Vue d'ensemble" },
        { id: "backlog", label: "Backlog" },
        { id: "milestones", label: "Jalons" },
        { id: "deliverables", label: "Livrables" },
        { id: "risks", label: "Risques" },
        { id: "kpis", label: "KPIs" },
        { id: "docs", label: "Docs" },
        { id: "ai-builder", label: "AI Builder" }
      ]
    },
    overview: {
      kpiTiles: [
        { label: "Avancement", value: "12%", trend: "flat", note: "Proposition ROI à préciser" },
        { label: "Budget", value: "8%", trend: "flat", note: "OK" },
        { label: "Délais", value: "-2", trend: "down", note: "2 jours de retard (validation)" },
        { label: "Qualité", value: "4", trend: "up", note: "Points sécurité à clarifier" }
      ],
      spotlight: {
        badge: "Risque critique",
        title: "Aligner l'offre B2B (prix, démo, process)",
        subtitle: "Sans cadrage, la page convertit mal et l'équipe sales perd du temps."
      },
      weeklyGoal: {
        percent: 20,
        title: "Objectif hebdomadaire",
        subtitle: "1 page offre + 1 page sécurité + CTA démo."
      }
    },
    backlog: {
      items: [
        { id: "T-101", title: "Définir ICP + use-cases par métier", priority: "P0", status: "doing", owner: "PM", dueDate: "2026-01-12" },
        { id: "T-102", title: "Page 'ROI & impact' (temps gagné)", priority: "P0", status: "todo", owner: "Marketing", dueDate: "2026-01-15" }
      ]
    },
    milestones: { items: [] },
    deliverables: { items: [] },
    risks: { items: [] },
    docs: { decisionLog: [] }
  },
  university: {
    project: {
      name: "Campus AI Integration — Student Mastery",
      type: "landing_page",
      target: "university",
      owner: "Dr. Amélie Durand",
      startDate: "2026-01-08",
      endDate: "2026-03-05",
      status: "on_track",
      estimated: true
    },
    sidebar: {
      items: [
        { id: "overview", label: "Vue d'ensemble" },
        { id: "backlog", label: "Backlog" },
        { id: "milestones", label: "Jalons" },
        { id: "deliverables", label: "Livrables" },
        { id: "risks", label: "Risques" },
        { id: "kpis", label: "KPIs" },
        { id: "docs", label: "Docs" },
        { id: "ai-builder", label: "AI Builder" }
      ]
    },
    overview: {
      kpiTiles: [
        { label: "Avancement", value: "10%", trend: "up", note: "Plan de cours esquissé" },
        { label: "Budget", value: "5%", trend: "flat", note: "OK" },
        { label: "Délais", value: "12", trend: "flat", note: "Marge confortable" },
        { label: "Qualité", value: "1", trend: "flat", note: "1 point: intégrité académique" }
      ],
      spotlight: {
        badge: "Jalon clé",
        title: "Formaliser Rubrics + Politique IA",
        subtitle: "Condition d'acceptation majeure côté pédagogie campus."
      },
      weeklyGoal: {
        percent: 15,
        title: "Objectif hebdomadaire",
        subtitle: "Rubrics V1 + 4 activités TP + modalités d'évaluation."
      }
    },
    backlog: { items: [] },
    milestones: { items: [] },
    deliverables: { items: [] },
    risks: { items: [] },
    docs: { decisionLog: [] }
  },
  government: {
    project: {
      name: "Secteur Public — IA Responsable",
      type: "landing_page",
      target: "government",
      owner: "Directeur Innovation",
      startDate: "2026-01-08",
      endDate: "2026-03-19",
      status: "at_risk",
      estimated: true
    },
    sidebar: {
      items: [
        { id: "overview", label: "Vue d'ensemble" },
        { id: "backlog", label: "Backlog" },
        { id: "milestones", label: "Jalons" },
        { id: "deliverables", label: "Livrables" },
        { id: "risks", label: "Risques" },
        { id: "kpis", label: "KPIs" },
        { id: "docs", label: "Docs" },
        { id: "ai-builder", label: "AI Builder" }
      ]
    },
    overview: {
      kpiTiles: [
        { label: "Avancement", value: "8%", trend: "flat", note: "Cadre à formaliser" },
        { label: "Budget", value: "6%", trend: "flat", note: "OK" },
        { label: "Délais", value: "4", trend: "down", note: "Validation juridique attendue" },
        { label: "Qualité", value: "3", trend: "up", note: "3 points conformité" }
      ],
      spotlight: {
        badge: "Risque critique",
        title: "Conformité (RGPD / Données / Traçabilité)",
        subtitle: "Sans cadre explicite, pas de go-live possible pour les ministères."
      },
      weeklyGoal: {
        percent: 10,
        title: "Objectif hebdomadaire",
        subtitle: "Charte d'usage + périmètres données + processus de revue."
      }
    },
    backlog: { items: [] },
    milestones: { items: [] },
    deliverables: { items: [] },
    risks: { items: [] },
    docs: { decisionLog: [] }
  }
};
