
export type Target = "people" | "business" | "university" | "government";
export type Trend = "up" | "down" | "flat";
export type Status = "on_track" | "at_risk" | "delayed";
export type Priority = "P0" | "P1" | "P2";
export type TaskStatus = "todo" | "doing" | "done";

export interface KPITile {
  label: string;
  value: string | number;
  trend: Trend;
  note?: string;
}

export interface ProjectDashboardConfig {
  project: {
    name: string;
    type: string;
    target: Target;
    owner: string;
    startDate: string;
    endDate: string;
    status: Status;
    estimated: boolean;
  };
  sidebar: {
    items: { id: string; label: string }[];
  };
  overview: {
    kpiTiles: KPITile[];
    spotlight: {
      badge: string;
      title: string;
      subtitle: string;
    };
    weeklyGoal: {
      percent: number;
      title: string;
      subtitle: string;
    };
  };
  backlog: {
    items: {
      id: string;
      title: string;
      priority: Priority;
      status: TaskStatus;
      owner: string;
      dueDate: string;
    }[];
  };
  milestones: {
    items: {
      id: string;
      title: string;
      date: string;
      status: "planned" | "in_progress" | "done";
      notes: string;
    }[];
  };
  deliverables: {
    items: {
      id: string;
      title: string;
      status: "draft" | "review" | "approved" | "released";
      validator: string;
      dueDate: string;
    }[];
  };
  risks: {
    items: {
      id: string;
      risk: string;
      severity: "low" | "med" | "high";
      probability: "low" | "med" | "high";
      mitigation: string;
      owner: string;
      status: "open" | "mitigated" | "closed";
    }[];
  };
  docs: {
    decisionLog: {
      id: string;
      date: string;
      decision: string;
      impact: string;
    }[];
  };
}
