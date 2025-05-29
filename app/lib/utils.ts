export enum Mode {
  INSERT = "INSERT",
  NORMAL = "NORMAL",
}

export interface State {
  text: string;
  location: number;
  mode: Mode;
}

export interface windowSize {
  width: number;
  height: number;
}

export interface Location {
  y: number;
  x: number;
}

export const textTo2D = (text: string, width: number): string[][] => {
  const text2d: string[][] = [];
  const textArray = Array.from(text);
  let currentLine = -1;
  for (let i = 0; i < textArray.length; i++) {
    if (i % width == 0) {
      text2d.push([]);
      currentLine++;
    }
    text2d[currentLine].push(textArray[i]);
  }
  return text2d;
};

export const locationTo2D = (location: number, width: number): Location => {
  const y = Math.floor(location / width);
  const x = location % width;
  return { y: y, x: x };
};
