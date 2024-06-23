import { nanoid } from "nanoid";
import { proxy, useSnapshot } from "valtio";
import type { Task, TaskStatus } from "./types";

interface TaskStore {
  [taskId: string]: Task;
}

export const filteredTasks = (status: TaskStatus, taskStore: TaskStore): Task[] =>
  Object.values(taskStore).filter((task) => task.status === status);

export const taskStore = proxy<TaskStore>({});

export const useTasks = () => useSnapshot(taskStore);

export const addTask = (status: TaskStatus) => {
  const order = 0; // dummy
  const id = nanoid();
  taskStore[id] = {
    id,
    status,
    value: "",
    order,
  };
};

export const updateTask = (id: string, value: string) => {
  const task = taskStore[id];
  if (task) {
    task.value = value;
  }
};
