interface removalOperation {
  newText: string;
  characterRemoved: string;
}

export function deleteCharacter(
  text: string,
  location: number,
): removalOperation {
  return {
    newText: text.slice(0, location) + text.slice(location + 1),
    characterRemoved: text[location],
  };
}
