"use client";

import { useEffect } from "react";
import { useTextState, Mode, State } from "@/lib/utils";
import * as normal from "@/lib/normalMode";
import * as insert from "@/lib/insertMode";

export default function Canvas() {
  const { text, location, mode, setState } = useTextState({
    text: "",
    location: 0,
    mode: Mode.INSERT,
  });
  // TODO: to be removed
  const toggleMode = () => {
    setState({
      text: text,
      location: location,
      mode: mode == Mode.INSERT ? Mode.NORMAL : Mode.INSERT,
    });
  };
  // Any states outside of the useEffect will only last until a keypress
  useEffect(() => {
    let localState = { text: text, location: location, mode: mode };

    const handleKeyPress = (event: KeyboardEvent) => {
      console.log("feeding state", {
        text: text,
        location: location,
        mode: mode,
      });
      const modeHandler = (): CallableFunction => {
        switch (mode) {
          case Mode.INSERT: {
            return insert.handle;
          }
          case Mode.NORMAL: {
            return normal.handle;
          }
        }
      };
      const newState = modeHandler()(event, localState);
      setState(newState);
      localState = newState;
    };

    document.addEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="gird">
      <div className="col-start-1 row-start-1">
        <span
          key={0}
          className={location == 0 ? "bg-gray-500" : ""}
          style={{ whiteSpace: "pre" }}
        ></span>
        {Array.from(text).map((l: string, i: number) => {
          return (
            <span
              key={i + 1}
              className={location == i + 1 ? "bg-gray-500" : ""}
              style={{ whiteSpace: "pre" }}
            >
              {l}
            </span>
          );
        })}
      </div>
      <div className="col-start-1 row-start-1">
        <button onClick={toggleMode}>
          {mode == Mode.INSERT ? "INSERT" : "NORMAL"}
        </button>
      </div>
    </div>
  );
}
