import { deleteCharacter } from "./insertModeActions";
import { State } from "./utils";

const allowedCharacters = "abcdefghijklmnopqrstuvwxyz,#'\".!? ".split("");

export function handle(event: KeyboardEvent, state: State): State {
  const newState = { ...state };
  if (allowedCharacters.includes(event.key.toLowerCase())) {
    newState.text = state.text.concat(event.key);
    newState.location += 1;
  } else {
    switch (event.key) {
      case "Backspace": {
        const { newText, characterRemoved } = deleteCharacter(state.text);
        newState.text = newText;
        newState.location = Math.max(state.location - 1, -1);
        break;
      }
      case "Escape": {
        // switch to normal mode
        break;
      }
      case "Enter": {
        newState.text = state.text.concat("\n");
        newState.location++;
        break;
      }
      default: {
        break;
      }
    }
  }
  return newState;
}
