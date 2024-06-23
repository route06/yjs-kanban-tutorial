import { useEffect } from "react";
import { bind } from "valtio-yjs";

import { taskStore } from "../taskStore";
import { ymap } from "./yjs";

export const useSyncToYjsEffect = () => {
  useEffect(() => {
    const unbind = bind(taskStore, ymap);
    return () => {
      unbind();
    };
  }, []);
};
