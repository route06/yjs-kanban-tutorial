import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { type ChangeEvent, type FC, useCallback } from "react";
import styles from "./TaskItem.module.css";
import { updateTask } from "./taskStore";
import type { Task } from "./types";

interface Props {
  task: Task;
}

const TaskItem: FC<Props> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      updateTask(task.id, task.status, event.target.value);
    },
    [task],
  );

  return (
    <li
      className={`${styles.listitem} ${isDragging ? styles.isDragging : ""}`}
      ref={setNodeRef}
      style={style}
    >
      <button type="button" className={styles.button} {...listeners} {...attributes}>
        <svg
          width="24"
          height="24"
          viewBox="6 0 12 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>Drag</title>
          <circle cx="9" cy="12" r="1" />
          <circle cx="9" cy="5" r="1" />
          <circle cx="9" cy="19" r="1" />
          <circle cx="15" cy="12" r="1" />
          <circle cx="15" cy="5" r="1" />
          <circle cx="15" cy="19" r="1" />
        </svg>
      </button>
      <input className={styles.input} defaultValue={task.value} onChange={handleChange} />
    </li>
  );
};

export default TaskItem;
