"use client";

import { useEffect, useState } from "react";
import { Mode, State } from "@/lib/utils";
import * as normal from "@/lib/normalMode";
import * as insert from "@/lib/insertMode";
import Paragraph from "@/components/Paragraph";

export function createParagraphs(text: string, location: number) {
  let paragraphSize = -1;
  return text.split("\n").map((textLine: string, i: number) => {
    console.log(paragraphSize, textLine.length, location);
    paragraphSize += 1;
    const lineSize = textLine.length;
    const currentActiveLine =
      location >= paragraphSize - 1 && location <= paragraphSize - 1 + lineSize;

    let localLocation = -1;
    if (currentActiveLine) {
      localLocation = location - paragraphSize;
    }

    paragraphSize += lineSize;
    return (
      <Paragraph
        key={i}
        text={textLine}
        location={localLocation}
        currentActiveLine={currentActiveLine}
      />
    );
  });
}

export function Canvas() {
  const [state, setState] = useState<State>({
    text: "",
    location: -1,
    mode: Mode.INSERT,
  });

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
  }, []);

  return (
    <div className="grid">
      <div className="col-start-1 row-start-1">
        {createParagraphs(state.text, state.location)}
      </div>
      <div className="col-start-2 row-start-2">
        <button onClick={toggleMode}>
          {state.mode == Mode.INSERT ? "INSERT" : "NORMAL"}
        </button>
      </div>
    </div>
  );
}
