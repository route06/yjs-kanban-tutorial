import type { FC } from "react";
import styles from "./App.module.css";
import { TaskColumn } from "./TaskColumn";
import { DndProvider } from "./dnd/DndProvider";
import { useSyncToYjsEffect } from "./yjs/useSyncToYjsEffect";
import { Cursors } from "./yjs/Cursors";

const App: FC = () => {
  useSyncToYjsEffect();

  return (
    <DndProvider>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Projects / Board</h1>
        <div className={styles.grid}>
          <TaskColumn status="To Do" />
          <TaskColumn status="In Progress" />
          <TaskColumn status="Done" />
        </div>
        <Cursors />
      </div>
    </DndProvider>
  );
};

export default App;
