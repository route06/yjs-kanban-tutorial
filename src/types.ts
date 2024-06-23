export type TaskStatus = "To Do" | "In Progress" | "Done";

export interface Task {
  id: string;
  status: TaskStatus;
  value: string;
  order: number;
}
