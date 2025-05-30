interface removalOperation {
  newText: string;
  characterRemoved: string;
}

export function deleteCharacter(text: string): removalOperation {
  return { newText: text.slice(0, -1), characterRemoved: text.slice(-1) };
}
