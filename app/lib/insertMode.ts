import { deleteCharacter } from "./insertModeActions";
import { State } from "./utils";

const alphabet = "abcdefghijklmnopqrstuvwxyz ".split("");

export function handle(event: KeyboardEvent, state: State): State {
  const newState = { ...state };
  if (alphabet.includes(event.key.toLowerCase())) {
    newState.text = state.text.concat(event.key);
    newState.location += 1;
  } else {
    switch (event.key) {
      case "Backspace": {
        newState.text = deleteCharacter(state.text, state.location);
        newState.location = Math.max(state.location - 1, 0);
        break;
      }
      case "ESC": {
        // switch to normal mode
        break;
      }
      default: {
        break;
      }
    }
  }
  return newState;
}
