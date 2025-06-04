import { Mode, State } from "./utils";

export function handle(event: KeyboardEvent, state: State): State {
  const newState = { ...state };
  console.log(state, event);
  switch (event.key) {
    case "h": {
      newState.location = Math.max(state.location - 1, -1);
      break;
    }
    case "j": {
      // Scan forward until next \n, and when found put location there.
      // For now I would support only jumping to the beginning of the line
      for (let i = state.location + 1; i < state.text.length; i++) {
        if (state.text[i] == "\n") {
          newState.location = i;
          break;
        }
      }
      break;
    }
    case "k": {
      if (state.text[state.location] == "\n") {
        newState.location = Math.max(state.location - 1, -1);
        break;
      }
      for (let i = state.location - 1; i >= 0; i--) {
        console.log(state, i);
        if (state.text[i] == "\n") {
          newState.location = Math.max(i - 1, -1);
          break;
        }
      }
      break;
    }
    case "l": {
      newState.location = Math.min(state.location + 1, state.text.length - 1);
      break;
    }
    case "i": {
      newState.mode = Mode.INSERT;
      break;
    }
  }
  return newState;
}
