import { textTo2D, locationTo2D } from "@/lib/utils";
import { useEffect, useState } from "react";

const TEXT_SIZE = 30;

const renderTextLine = (
  textLine: string[],
  location: number,
  lineNumber: number,
) => {
  return textLine.map((l: string, i: number) => {
    return (
      <span
        key={`${lineNumber}:${i}`}
        className={location == i ? "bg-gray-500" : ""}
        style={{ whiteSpace: "pre" }}
      >
        {l}
      </span>
    );
  });
};

export default function Paragraph({
  text,
  location,
  currentActiveLine,
}: {
  text: string;
  location: number;
  currentActiveLine: boolean;
}) {
  const [width, setWidth] = useState(0);
  const handleResize = () => {
    setWidth(Math.floor(window.innerWidth / TEXT_SIZE));
  };

  useEffect(() => {
    setWidth(Math.floor(window.innerWidth / TEXT_SIZE));
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {text.length >= 1 ? (
        textTo2D(text, width).map((textLine: string[], i: number) => {
          const location2d = locationTo2D(location, width);
          let localLocation = -1;
          if (location2d.y === i) {
            localLocation = location2d.x;
          }
          return (
            <div key={i} className="col-start-1 row-start-1">
              {renderTextLine(textLine, localLocation, i)}
            </div>
          );
        })
      ) : (
        <div className="col-start-1 row-start-1">
          <span
            className={currentActiveLine ? "bg-gray-500" : ""}
            style={{ whiteSpace: "pre-wrap" }}
          >
            {" "}
          </span>
        </div>
      )}
    </>
  );
}
