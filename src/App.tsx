import type { FC } from "react";
import styles from "./App.module.css";
import { TaskColumn } from "./TaskColumn";
import { useSyncToYjsEffect } from "./yjs/useSyncToYjsEffect";

const App: FC = () => {
  useSyncToYjsEffect();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Projects / Board</h1>
      <div className={styles.grid}>
        <TaskColumn status="To Do" />
        <TaskColumn status="In Progress" />
        <TaskColumn status="Done" />
      </div>
    </div>
  );
};

export default App;
