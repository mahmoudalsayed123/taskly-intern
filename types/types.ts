export type Project = {
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

export interface EpicTasks {
  id: string;
  epic_id?: string;
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
    id: string;
    name: string;
  };
  created_by: {
    name: string;
  };
  due_date: string;
  status?: TaskStatus;
  epic?: {
    id: string;
    title: string;
  };
  created_at: string;
}

export enum TaskStatus {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  BLOCKED = "BLOCKED",
  IN_REVIEW = "IN_REVIEW",
  READY_FOR_QA = "READY_FOR_QA",
  REOPENED = "REOPENED",
  READY_FOR_PRODUCTION = "READY_FOR_PRODUCTION",
  DONE = "DONE",
}
