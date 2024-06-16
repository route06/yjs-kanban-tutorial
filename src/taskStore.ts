import { nanoid } from "nanoid";
import { proxy, useSnapshot } from "valtio";
import type { Task, TaskStatus } from "./types";

interface TaskStore {
  [taskId: string]: Task;
}

export const taskStore = proxy<TaskStore>({});
export const useTasks = () => useSnapshot(taskStore);

export const addTask = (status: TaskStatus) => {
  const order = computeOrder(lastTask(status)?.id);
  const id = nanoid();
  taskStore[id] = {
    id,
    status,
    value: "",
    order,
  };
};

export const updateTask = (id: string, status: TaskStatus, value: string) => {
  const task = taskStore[id];
  if (task) {
    task.status = status;
    task.value = value;
  }
};

export const filteredTasks = (status: TaskStatus, taskStore: TaskStore) =>
  Object.values(taskStore)
    .filter((task) => task.status === status)
    .sort((a, b) => a.order - b.order);

const computeOrder = (prevId?: string, nextId?: string): number => {
  const prevOrder = taskStore[prevId ?? ""]?.order ?? 0;
  const nextOrder = nextId ? taskStore[nextId].order : 1;

  return (prevOrder + nextOrder) / 2;
};

const lastTask = (status: TaskStatus): Task | undefined => {
  const tasks = filteredTasks(status, taskStore);
  return tasks[tasks.length - 1];
};
