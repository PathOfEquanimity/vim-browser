import { Mode, State } from "./utils";

enum Direction {
  RIGHT,
  LEFT,
}

function findNewLine(
  text: string,
  location: number,
  direction: Direction,
): number {
  if (text[location] == "\n") {
    return location;
  }

  if (direction == Direction.LEFT) {
    for (let i = location - 1; i >= 0; i--) {
      if (text[i] == "\n") return i;
    }
  } else if (direction == Direction.RIGHT) {
    for (let i = location + 1; i <= text.length; i++) {
      if (text[i] == "\n") return i;
    }
  }
  return -1;
}

export function handle(event: KeyboardEvent, state: State): State {
  console.log(event);
  const newState = { ...state };
  const rightNewLine = findNewLine(state.text, state.location, Direction.RIGHT);
  const leftNewLine = findNewLine(state.text, state.location, Direction.LEFT);
  const onNewLine =
    rightNewLine == state.location && leftNewLine == state.location;
  switch (event.key) {
    case "h": {
      if (onNewLine) break;
      newState.location = Math.max(
        state.location - 1,
        leftNewLine + 1, // +1 is to cover the case when I'm already on a new line
        -1, // I don't need this one because findNewLine covers it, but I'll keep it just in case, function implementation changes
      );
      break;
    }
    case "l": {
      if (onNewLine) break;
      newState.location = Math.min(
        state.location + 1,
        rightNewLine == -1 ? state.text.length - 1 : rightNewLine - 1,
      );
      break;
    }
    //Allowed to hit \n
    case "j": {
      if (rightNewLine == -1) break; // can't go down
      if (onNewLine) {
        if (state.text[state.location + 2] == "\n") {
          newState.location += 1;
        } else {
          newState.location += 2;
        }
        break;
      }
      if (rightNewLine == state.location) {
        newState.location = rightNewLine + 1;
        break;
      }
      if (
        state.text[rightNewLine + 1] == "\n" ||
        state.text[rightNewLine + 1] == undefined
      ) {
        newState.location = rightNewLine;
        break;
      }
      newState.location = rightNewLine + 1;
      break;
    }
    //Allowed to hit \n
    case "k": {
      if (leftNewLine == -1) break;
      if (onNewLine) {
        newState.location -= 1;
        break;
      }
      if (leftNewLine == 0) {
        newState.location = leftNewLine;
      } else if (leftNewLine != -1) {
        newState.location = leftNewLine - 1;
      }
      break;
    }
    case "i": {
      newState.mode = Mode.INSERT;
      break;
    }
  }
  return newState;
}
