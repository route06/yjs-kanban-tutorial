import { useDroppable } from "@dnd-kit/core";
import { type FC, useId } from "react";
import type { TaskStatus } from "../types";
import styles from "./DroppableBorder.module.css";

type Props = {
  status: TaskStatus;
  prevId?: string | undefined;
  nextId?: string | undefined;
};

export const DroppableBorder: FC<Props> = ({ status, prevId, nextId }) => {
  const id = useId();
  const { isOver, setNodeRef } = useDroppable({ id, data: { status, prevId, nextId } });

  return <div ref={setNodeRef} className={`${styles.wrapper} ${isOver ? styles.isOver : ""}`} />;
};
