import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { createParagraphs } from "../app/components/Canvas";
import Paragraph from "@/app/components/Paragraph";
import { deleteCharacter } from "@/app/lib/insertModeActions";
import { handle } from "@/app/lib/normalMode";
import { Mode, State } from "@/app/lib/utils";

describe("paragraphs creation", () => {
  it("creates one paragraph when no new line", () => {
    const location = 10;
    const text = "hello world";
    const paragraphs = createParagraphs(text, location);
    const expectedParagraphs = [
      <Paragraph
        key={0}
        text={text}
        location={location}
        currentActiveLine={true}
      />,
    ];

    expect(paragraphs).toEqual(expectedParagraphs);
  });
  it("creates two paragraphs with empty new line", () => {
    const location = 11;
    const text = "hello world\n";
    const paragraphs = createParagraphs(text, location);
    const expectedParagraphs = [
      <Paragraph
        key={0}
        text={"hello world"}
        location={-1}
        currentActiveLine={false}
      />,
      <Paragraph key={1} text={""} location={-1} currentActiveLine={true} />,
    ];

    expect(paragraphs).toEqual(expectedParagraphs);
  });
  it("creates two paragraphs with new line and text", () => {
    const location = 12;
    const text = "hello world\nw";
    const paragraphs = createParagraphs(text, location);
    const expectedParagraphs = [
      <Paragraph
        key={0}
        text={"hello world"}
        location={-1}
        currentActiveLine={false}
      />,
      <Paragraph key={1} text={"w"} location={0} currentActiveLine={true} />,
    ];

    expect(paragraphs).toEqual(expectedParagraphs);
  });
});

describe("test insert mode", () => {
  test.each([
    ["hello", 0, "ello", "h"],
    ["hello", 4, "hell", "o"],
  ])(
    "test character deletion",
    (string, location, expectedString, expectedCharacterRemoved) => {
      const { newText, characterRemoved } = deleteCharacter(string, location);
      expect(newText).toEqual(expectedString);
      expect(characterRemoved).toEqual(expectedCharacterRemoved);
    },
  );
});

describe("test normal mode", () => {
  test.each([
    ["h", "hello", 1, 0, "Base case"],
    ["h", "hello", 0, 0, "Stay on the line"],
    ["h", "hello\nh", 6, 6, "Stay on the line 2nd line"],
    ["l", "hello", 3, 4, "Base case"],
    ["l", "hello", 4, 4, "Stay on the line end of line"],
    ["l", "hello\nwhy", 4, 4, "Stay on the line next line"],
    ["j", "hello\nwhy", 0, 6, "Base case"],
    ["j", "hello\nwhy", 7, 7, "Can't jump beyond"],
    ["j", "hello\n\nwhy", 0, 5, "Jump down to empty new line"],
    ["j", "hello\n\nwhy", 5, 7, "Jump down from empty new line"],
    [
      "j",
      "hello\n\n\nwhy",
      5,
      6,
      "Jump down from empty new line to empty new line",
    ],
    ["j", "hello\nwhy\n", 7, 9, "Jump down to an empty new line at the end"],
    ["k", "hello\nwhy", 6, 4, "Base case"],
    ["k", "hello\nwhy", 1, 1, "Can't jump beyond"],
    ["k", "hello\n\nwhy", 8, 5, "Jump up to empty new line"],
    ["k", "hello\n\nwhy", 5, 4, "Jump up from empty new line"],
    [
      "k",
      "hello\n\n\nwhy",
      5,
      4,
      "Jump up from empty new line to empty new line",
    ],
    [
      "k",
      "\nhello\nwhy",
      3,
      0,
      "Jump up to an empty new line at the beginning",
    ],
  ])(
    "test movement (%s, %s, %s)=%s: %s",
    (key, text, location, expectedLocation) => {
      const state: State = {
        text: text,
        location: location,
        mode: Mode.NORMAL,
      };
      const dummyEvent = new KeyboardEvent("keydown", { key: key });
      const { location: newLocation } = handle(dummyEvent, state);
      expect(newLocation).toEqual(expectedLocation);
    },
  );
});
