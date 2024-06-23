import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { type FC, type PropsWithChildren, useCallback } from "react";
import { moveTask } from "../taskStore";

export const DndProvider: FC<PropsWithChildren> = ({ children }) => {
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    if (!event.over) {
      return;
    }
    const data = event.over.data.current;
    if (!data?.status) {
      return;
    }

    moveTask(String(event.active.id), data.status, data?.prevId, data?.nextId);
  }, []);

  return <DndContext onDragEnd={handleDragEnd}>{children}</DndContext>;
};
