import { useSyncExternalStore } from "react";
import { provider } from "./yjs";

type UseAwarenessResult<T> = {
  states: Record<number, T>;
  localId: number;
  setLocalState: (nextState: T) => void;
};

const awareness = provider.awareness

const subscribe = (callback: () => void) => {
  awareness.on("change", callback);
  return () => {
    awareness.off("change", callback);
  }
}
const getSnapshot = () => JSON.stringify(Object.fromEntries(awareness.getStates()))
const setLocalState = <T extends {}>(nextState: T) => awareness.setLocalState(nextState)

export const useAwareness = <T extends {}>(): UseAwarenessResult<T> => {
  const states = JSON.parse(useSyncExternalStore(subscribe, getSnapshot)) as Record<number, T>;

  return {
    states,
    localId: awareness.clientID,
    setLocalState,
  };
};
