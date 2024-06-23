import { nanoid } from "nanoid";
import { proxy, useSnapshot } from "valtio";
import type { Task, TaskStatus } from "./types";

interface TaskStore {
  [taskId: string]: Task;
}

const computeOrder = (prevId?: string, nextId?: string): number => {
  const prevOrder = taskStore[prevId ?? ""]?.order ?? 0;
  const nextOrder = nextId ? taskStore[nextId].order : 1;

  return (prevOrder + nextOrder) / 2;
};

export const filteredTasks = (status: TaskStatus, taskStore: TaskStore): Task[] =>
  Object.values(taskStore)
    .filter((task) => task.status === status)
    .sort((a, b) => a.order - b.order);

export const taskStore = proxy<TaskStore>({});

export const useTasks = () => useSnapshot(taskStore);

export const addTask = (status: TaskStatus) => {
  const tasks = filteredTasks(status, taskStore);
  const lastTask = tasks[tasks.length - 1];
  const order = computeOrder(lastTask?.id);
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
