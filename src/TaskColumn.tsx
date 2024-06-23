import { type FC, Fragment } from "react";
import { TaskAddButton } from "./TaskAddButton";
import styles from "./TaskColumn.module.css";
import { TaskItem } from "./TaskItem";
import { DroppableMarker } from "./dnd/DroppableMarker";
import { filteredTasks, useTasks } from "./taskStore";
import type { TaskStatus } from "./types";

interface Props {
  status: TaskStatus;
}

export const TaskColumn: FC<Props> = ({ status }) => {
  const snapshot = useTasks();
  const tasks = filteredTasks(status, snapshot);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{status}</h2>
      <ul className={styles.list}>
        <DroppableMarker status={status} nextId={tasks[0]?.id} />
        {tasks.map((task, index) => (
          <Fragment key={task.id}>
            <TaskItem task={task} />
            <DroppableMarker
              key={`${task.id}-border`}
              status={status}
              prevId={task.id}
              nextId={tasks[index + 1]?.id}
            />
          </Fragment>
        ))}
      </ul>
      <TaskAddButton status={status} />
    </div>
  );
};
