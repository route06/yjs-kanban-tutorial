import type { FC } from "react";
import styles from "./TaskAddButton.module.css";

export const TaskAddButton: FC = () => {
  return (
    <button type="button" className={styles.button}>
      +
    </button>
  );
};
