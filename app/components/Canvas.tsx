"use client";

import { useEffect, useState } from "react";
import { Mode, State, textTo2D, locationTo2D } from "@/lib/utils";
import * as normal from "@/lib/normalMode";
import * as insert from "@/lib/insertMode";

// TODO: determine text size dyanmically
const TEXT_SIZE = 30;

const renderTextLine = (
  textLine: string[],
  location: number,
  lineNumber: number,
) => {
  return textLine.map((l: string, i: number) => {
    return (
      <span
        key={`${lineNumber}:${i}`}
        className={location == i ? "bg-gray-500" : ""}
        style={{ whiteSpace: "pre" }}
      >
        {l}
      </span>
    );
  });
};

export default function Canvas() {
  const [state, setState] = useState<State>({
    text: "",
    location: -1,
    mode: Mode.INSERT,
  });
  const [width, setWidth] = useState(Math.floor(window.innerWidth / TEXT_SIZE));
  // TODO: to be removed
  const toggleMode = () => {
    setState({
      text: state.text,
      location: state.location,
      mode: state.mode == Mode.INSERT ? Mode.NORMAL : Mode.INSERT,
    });
  };
  // NOTE: Any state set outside of the useEffect will only last until a keypress
  useEffect(() => {
    let localState = { ...state };

    const handleResize = (event) => {
      console.log(Math.floor(window.innerWidth / TEXT_SIZE));
      setWidth(Math.floor(window.innerWidth / TEXT_SIZE));
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      const modeHandler = (): CallableFunction => {
        switch (state.mode) {
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
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="gird">
      <div className="col-start-1 row-start-1">
        {textTo2D(state.text, width).map((textLine: string[], i: number) => {
          const location2d = locationTo2D(state.location, width);
          console.log(location2d, width);
          let localLocation = -1;
          if (location2d.y === i) {
            localLocation = location2d.x;
          }
          return (
            <div className="col-start-1 row-start-1">
              {renderTextLine(textLine, localLocation, i)}
            </div>
          );
        })}
      </div>
      <div className="col-start-1 row-start-1">
        <button onClick={toggleMode}>
          {state.mode == Mode.INSERT ? "INSERT" : "NORMAL"}
        </button>
      </div>
    </div>
  );
}
