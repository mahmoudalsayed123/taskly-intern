import { TaskStatus } from "@/types/types";

export const navLinks = [
  {
    id: 1,
    path: "/project",
    name: "projects",
    icon: "/assets/icons/project.svg",
  },
  {
    id: 2,
    path: "/epics",
    name: "epics",
    icon: "/assets/icons/epic.svg",
  },
  {
    id: 3,
    path: "/tasks",
    name: "tasks",
    icon: "/assets/icons/task.svg",
  },
  {
    id: 4,
    path: "/members",
    name: "members",
    icon: "/assets/icons/members.svg",
  },
  {
    id: 5,
    path: "/edit",
    name: "details",
    icon: "/assets/icons/details.svg",
  },
];

export type Projects = {
  id: string;
  name: string;
  description: string;
  created_at: string;
};

export interface Member {
  user_id: string;
  role: string;
  email: string;
  metadata: {
    name: string;
    email: string;
    department: string;
  };
}
export interface Epic {
  id: string;
  project_id: string;
  title: string;
  description: string;
  created_at: string;
  deadline: string;
  epic_id: string;
  created_by: {
    sub: string;
    name: string;
    email: string;
    department: string;
  };
  assignee: {
    sub: string;
    name: string;
    email: string;
    department: string;
  };
}

export interface Task {
  project_id: string;
  epic_id?: string | null;
  title: string;
  description?: string | null;
  assignee_id?: string | null;
  due_date?: string;
  status?: TaskStatus;
}

export const taskStatus: TaskStatus[] = [
  TaskStatus.TO_DO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.BLOCKED,
  TaskStatus.IN_REVIEW,
  TaskStatus.READY_FOR_QA,
  TaskStatus.REOPENED,
  TaskStatus.READY_FOR_PRODUCTION,
  TaskStatus.DONE,
];
