import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { createParagraphs } from "../app/components/Canvas";
import Paragraph from "@/app/components/Paragraph";

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
