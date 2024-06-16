import { useEffect } from "react";
import { bind } from "valtio-yjs";
import { WebsocketProvider } from "y-websocket";
import { Doc } from "yjs";
import { taskStore } from "./taskStore";

const ydoc = new Doc();
const ymap = ydoc.getMap("taskStore");
new WebsocketProvider("ws://localhost:1234", "taskStore", ydoc);

export const useSyncToYjsEffect = () => {
  useEffect(() => {
    const unbind = bind(taskStore, ymap);
    return () => {
      unbind();
    };
  }, []);
};
