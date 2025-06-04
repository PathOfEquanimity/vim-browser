import { deleteCharacter } from "./insertModeActions";
import { Mode, State } from "./utils";

const allowedCharacters = "abcdefghijklmnopqrstuvwxyz,#'\".!? ".split("");

export function handle(event: KeyboardEvent, state: State): State {
  console.log(state);
  const newState = { ...state };
  if (allowedCharacters.includes(event.key.toLowerCase())) {
    newState.text =
      state.text.slice(0, state.location + 1) +
      event.key +
      state.text.slice(state.location + 1);
    newState.location += 1;
  } else {
    switch (event.key) {
      case "Backspace": {
        const { newText, characterRemoved } = deleteCharacter(
          state.text,
          state.location,
        );
        newState.text = newText;
        newState.location = Math.max(state.location - 1, -1);
        break;
      }
      case "Escape": {
        newState.mode = Mode.NORMAL;
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
