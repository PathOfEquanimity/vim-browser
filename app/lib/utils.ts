import { useState } from "react";

export enum Mode {
  INSERT = "INSERT",
  NORMAL = "NORMAL",
}

export interface State {
  text: string;
  location: number;
  mode: Mode;
}

export const useTextState = (defaultState: State) => {
  const [text, setText] = useState(defaultState.text);
  const [location, setLocation] = useState(defaultState.location);
  const [mode, setMode] = useState<Mode>(defaultState.mode);
  const setState = (state: State) => {
    setText(state.text);
    setLocation(state.location);
    setMode(state.mode);
  };
  return { text, mode, location, setState };
};
