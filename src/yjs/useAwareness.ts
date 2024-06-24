import { type Dispatch, type SetStateAction, useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { provider } from "./yjs";

type UseAwarenessResult<T> = {
  states: Map<number, T>;
  localId: number;
  localState: T;
  setLocalState: Dispatch<SetStateAction<T>>;
};

export const useAwareness = <T extends {}>(): UseAwarenessResult<T> => {
  const awareness = provider.awareness
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);
  useEffect(() => {
    awareness.on("change", forceUpdate);

    return () => awareness.off("change", forceUpdate);
  }, [awareness]);

  const [localState, setLocalState] = useState<T>({} as unknown as T);

  return {
    states: useMemo(() => awareness.getStates() as Map<number, T>, [awareness]),
    localId: awareness.clientID,
    localState,
    setLocalState: useCallback(
      (nextState) => {
        awareness.setLocalState(nextState);

        setLocalState(nextState);
      },
      [awareness],
    ),
  };
};
