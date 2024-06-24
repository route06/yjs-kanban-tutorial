import { useEffect, useState, type FC } from "react";
import { useAwareness } from "./useAwareness";
import styles from "./Cursors.module.css";

const sample = (arr: string[]) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

const names = ["Alice", "Bob", "Charlie", "David", "Eve"];
const colors = ["green", "orange", "magenta", "gold", "fuchsia"];

type MyInfo = {
  name: string;
  color: string;
};

type CursorState = MyInfo & {
  x: number;
  y: number;
};

export const Cursors: FC = () => {
  const [myInfo] = useState<MyInfo>({ name: sample(names), color: sample(colors) });
  const { states, localId, setLocalState } = useAwareness<CursorState>();
  const cursors = Array.from(states.entries()).filter(([id]) => id !== localId);

  useEffect(() => {
    const update = (event: MouseEvent) => {
      setLocalState({
        ...myInfo,
        x: event.clientX,
        y: event.clientY,
      });
    };
    window.addEventListener("mousemove", update);
    return () => window.removeEventListener("mousemove", update);
  }, [setLocalState, myInfo]);

  return (
    <div className={styles.wrapper}>
      {cursors.map(([id, state]) => (
        <div
          key={id}
          className={styles.cursor}
          style={{
            left: state.x,
            top: state.y,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.svg}
            style={{
              color: state.color,
            }}
          >
            <title>Cursor</title>
            <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
            <path d="m13 13 6 6" />
          </svg>
          <span style={{ backgroundColor: state.color }} className={styles.name}>
            {state.name}
          </span>
        </div>
      ))}
    </div>
  );
};
