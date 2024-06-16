import { proxy, useSnapshot } from "valtio";
import type { Task } from "./types";

interface TaskStore {
  [taskId: string]: Task;
}

export const taskStore = proxy<TaskStore>({});
export const useTasks = () => useSnapshot(taskStore);
