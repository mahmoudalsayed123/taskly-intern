import { TaskStatus } from "@/types/types";
import ProjectIcon from "@/assets/icons/project.svg";
import EpicIcon from "@/assets/icons/epic.svg";
import TaskIcon from "@/assets/icons/task.svg";
import MemberIcon from "@/assets/icons/members.svg";
import DetailsIcon from "@/assets/icons/details.svg";
import StatisticsIcon from "@/assets/icons/my-static.svg";

export const navLinks = [
  {
    id: 1,
    path: "/project",
    name: "projects",
    icon: ProjectIcon,
  },
  {
    id: 2,
    path: "/my-statistics",
    name: "My Statistics",
    icon: StatisticsIcon,
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

export const viewOptions = [
  {
    value: "board",
    label: "Board View",
    icon: "/assets/icons/taskBoard.svg",
    width: 15,
    height: 15,
  },
  {
    value: "list",
    label: "List View",
    icon: "/assets/icons/taskList.svg",
    width: 15,
    height: 15,
  },
];

export const status = [
  {
    label: "TO_DO",
    value: "todo",
  },
  {
    label: "IN_PROGRESS",
    value: "in_progress",
  },
  {
    label: "BLOCKED",
    value: "blocked",
  },
  {
    label: "IN_REVIEW",
    value: "in_review",
  },
  {
    label: "READY_FOR_QA",
    value: "ready_for_qa",
  },
  {
    label: "REOPENED",
    value: "reopened",
  },
  {
    label: "READY_FOR_PRODUCTION",
    value: "ready_for_production",
  },
  {
    label: "DONE",
    value: "done",
  },
];

export const statusBackgroundColors = {
  TO_DO: "bg-TO_DO",
  IN_PROGRESS: "bg-IN_PROGRESS",
  BLOCKED: "bg-BLOCKED",
  IN_REVIEW: "bg-IN_REVIEW",
  READY_FOR_QA: "bg-READY_FOR_QA",
  REOPENED: "bg-REOPENED",
  READY_FOR_PRODUCTION: "bg-READY_FOR_PRODUCTION",
  DONE: "bg-DONE",
};
