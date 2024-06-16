import type { FC } from "react";
import { TaskAddButton } from "./TaskAddButton";
import styles from "./TaskColumn.module.css";
import { TaskItem } from "./TaskItem";
import type { Task, TaskStatus } from "./types";

interface Props {
  status: TaskStatus;
}

export const TaskColumn: FC<Props> = ({ status }) => {
  // TODO
  const tasks: Task[] = [
    { id: "1", status, value: "Task 1", order: 1 },
    { id: "2", status, value: "Task 2", order: 2 },
    { id: "3", status, value: "Task 3", order: 3 },
  ];

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{status}</h2>
      <ul className={styles.list}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
      <TaskAddButton />
    </div>
  );
};
