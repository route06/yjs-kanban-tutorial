import type { FC } from "react";
import { TaskAddButton } from "./TaskAddButton";
import styles from "./TaskColumn.module.css";
import TaskItem from "./TaskItem";
import type { Task, TaskStatus } from "./types";

interface Props {
  status: TaskStatus;
}

// TODO
const tasks: Task[] = [];

const TaskColumn: FC<Props> = ({ status }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{status}</h2>
      <ul className={styles.list}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        <li>
          <TaskAddButton />
        </li>
      </ul>
    </div>
  );
};

export default TaskColumn;
