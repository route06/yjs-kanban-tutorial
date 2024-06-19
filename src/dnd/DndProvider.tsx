import {
  DndContext,
  type DragEndEvent,
  MouseSensor as LibMouseSensor,
  useSensor,
} from "@dnd-kit/core";
import {
  type FC,
  type MouseEvent,
  type PropsWithChildren,
  type TouchEvent,
  useCallback,
} from "react";
import { moveTask } from "../taskStore";

// Block DnD event propagation if element have "data-no-dnd" attribute
// https://github.com/clauderic/dnd-kit/issues/477#issuecomment-1713536492
const handler = ({ nativeEvent: event }: MouseEvent | TouchEvent) => {
  let cur = event.target as HTMLElement;

  while (cur) {
    if (cur.dataset?.noDnd) {
      return false;
    }
    cur = cur.parentElement as HTMLElement;
  }

  return true;
};

export class MouseSensor extends LibMouseSensor {
  static activators = [
    { eventName: "onMouseDown", handler },
  ] as (typeof LibMouseSensor)["activators"];
}

export const DndProvider: FC<PropsWithChildren> = ({ children }) => {
  const mouseSensor = useSensor(MouseSensor);
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
  return (
    <DndContext sensors={[mouseSensor]} onDragEnd={handleDragEnd}>
      {children}
    </DndContext>
  );
};
