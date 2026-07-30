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
