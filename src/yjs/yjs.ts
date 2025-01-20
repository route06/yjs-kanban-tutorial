import { WebrtcProvider } from 'y-webrtc'
import { Doc } from "yjs";

const ydoc = new Doc();
export const ymap = ydoc.getMap("taskStore.v1");
export const provider = new WebrtcProvider("yjs-kanban-tutorial", ydoc);
