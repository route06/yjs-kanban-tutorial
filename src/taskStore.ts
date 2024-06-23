import { proxy, useSnapshot } from "valtio";
import type { Task, TaskStatus } from "./types";

interface TaskStore {
  [taskId: string]: Task;
}

export const filteredTasks = (status: TaskStatus, taskStore: TaskStore): Task[] =>
  Object.values(taskStore).filter((task) => task.status === status);

export const taskStore = proxy<TaskStore>({});

export const useTasks = () => useSnapshot(taskStore);
