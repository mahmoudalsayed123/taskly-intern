import { TaskStatus } from "@/types/types";
import ProjectIcon from "@/assets/icons/project.svg";
import EpicIcon from "@/assets/icons/epic.svg";
import TaskIcon from "@/assets/icons/task.svg";
import MemberIcon from "@/assets/icons/members.svg";
import DetailsIcon from "@/assets/icons/details.svg";
export const navLinks = [
  {
    id: 1,
    path: "/project",
    name: "projects",
    icon: ProjectIcon,
  },
  {
    id: 2,
    path: "/epics",
    name: "epics",
    icon: EpicIcon,
  },
  {
    id: 3,
    path: "/tasks?view=board",
    name: "tasks",
    icon: TaskIcon,
  },
  {
    id: 4,
    path: "/members",
    name: "members",
    icon: MemberIcon,
  },
  {
    id: 5,
    path: "/edit",
    name: "details",
    icon: DetailsIcon,
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
export interface EpicTasks {
  id: string;
  title: string;
  assignee: {
    name: string;
  };
  due_date: string;
}

export interface Tasks {
  id: string;
  task_id?: string;
  title: string;
  description?: string;
  assignee: {
    name: string;
  };
  created_by: {
    name: string;
  };
  due_date: string;
  status?: TaskStatus;
  created_at: string;
}

export const viewOptions = [
  {
    value: "board",
    label: "Board View",
    icon: "@/assets/icons/board.svg",
    width: 13.5,
    height: 13.5,
  },
  {
    value: "list",
    label: "List View",
    icon: "@/assets/icons/list.svg",
    width: 10.5,
    height: 5.83,
  },
];

export const status = [
  {
    label: "TO_DO",
    value: "todo",
    color: "bg-[#2563EB]",
    numTasksColor: "bg-slate-20",
  },
  {
    label: "IN_PROGRESS",
    value: "in_progress",
    color: "bg-[#7E5FEB]",
    numTasksColor: "bg-slate-20",
  },
  {
    label: "BLOCKED",
    value: "blocked",
    color: "bg-[#E11D48]",
    numTasksColor: "bg-slate-20",
  },
  {
    label: "IN_REVIEW",
    value: "in_review",
    color: "bg-[#3B82F6]",
    numTasksColor: "bg-slate-20",
  },
  {
    label: "READY_FOR_QA",
    value: "ready_for_qa",
    color: "bg-[#F97316]",
    numTasksColor: "bg-slate-20",
  },
  {
    label: "REOPENED",
    value: "reopened",
    color: "bg-[#F97316]",
    numTasksColor: "bg-slate-20",
  },
  {
    label: "READY_FOR_PRODUCTION",
    value: "ready_for_production",
    color: "bg-[#F97316]",
    numTasksColor: "bg-slate-20",
  },
  {
    label: "DONE",
    value: "done",
    color: "bg-[#10B981]",
    numTasksColor: "bg-slate-20",
  },
];
