import { WebsocketProvider } from "y-websocket";
import { Doc } from "yjs";

const ydoc = new Doc();
export const ymap = ydoc.getMap("taskStore.v1");
new WebsocketProvider("ws://localhost:1234", "yjs-kanban-tutorial", ydoc);
