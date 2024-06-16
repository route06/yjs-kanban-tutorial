import type { FC } from "react";
import styles from "./TaskAddButton.module.css";
import { addTask } from "./taskStore";
import type { TaskStatus } from "./types";

interface Props {
  status: TaskStatus;
}

export const TaskAddButton: FC<Props> = ({ status }) => {
  return (
    <button type="button" className={styles.button} onClick={() => addTask(status)}>
      +
    </button>
  );
};
