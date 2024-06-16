import type { FC } from "react";
import { TaskAddButton } from "./TaskAddButton";
import styles from "./TaskColumn.module.css";
import TaskItem from "./TaskItem";
import { filteredTasks, useTasks } from "./taskStore";
import type { TaskStatus } from "./types";

interface Props {
  status: TaskStatus;
}

const TaskColumn: FC<Props> = ({ status }) => {
  const snapshot = useTasks();
  const tasks = filteredTasks(status, snapshot);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{status}</h2>
      <ul className={styles.list}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        <li>
          <TaskAddButton status={status} />
        </li>
      </ul>
    </div>
  );
};

export default TaskColumn;
