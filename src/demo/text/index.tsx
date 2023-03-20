import React, { useEffect, useRef, useState } from "react";
import { Text } from "../../lib";
import "./style.css";

type Type = "opacity" | "underline" | "slide" | "drop";

type Object = {
  [key: string]: string | number;
};

interface Option {
  type: Type;
  delay: number;
  duration: number;
  isRepeat: boolean;
  option: Object;
  value: string;
}

const TextArea = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [option, setOption] = useState<Option>({
    type: "slide",
    delay: 1,
    duration: 1,
    isRepeat: true,
    option: { translate: "translateX(100px)" },
    value: "Hello! Text Animation!",
  });

  const updateOption = (
    key: string,
    value: string | number | boolean | Object
  ) => {
    let defaultOption = {};

    if (typeof value === "string")
      if (["opacity", "drop"].includes(value)) {
        defaultOption = { option: {} };
      } else if (value === "slide") {
        defaultOption = { option: { translate: "translateX(100px)" } };
      } else if (value === "underline") {
        defaultOption = { option: { background: "#2D4A91", height: "20px" } };
      }

    setOption({ ...option, [key]: value, ...defaultOption });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container)
      if (option.isRepeat) {
        container.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
  }, [option]);

  return (
    <div className="EventField">
      <div className="EventBox" ref={containerRef}>
        <div className="EventPrevBox">
          <span>Scroll Down!</span>
        </div>
        <Text {...option} />
      </div>

      <div className="EventOptionBox">
        <h2 className="EventTitle">Option</h2>
        <div className="EventOptionWrapper">
          <div className="EventOptionField">
            <p>Type</p>
            <button
              className={`EventOptionButton ${
                option.type === "slide" && "EventOptionButton_Active"
              }`}
              onClick={() => {
                updateOption("type", "slide");
              }}
            >
              slide
            </button>
            <button
              className={`EventOptionButton ${
                option.type === "opacity" && "EventOptionButton_Active"
              }`}
              onClick={() => {
                updateOption("type", "opacity");
              }}
            >
              opacity
            </button>
            <button
              className={`EventOptionButton ${
                option.type === "underline" && "EventOptionButton_Active"
              }`}
              onClick={() => {
                updateOption("type", "underline");
              }}
            >
              underline
            </button>
            <button
              className={`EventOptionButton ${
                option.type === "drop" && "EventOptionButton_Active"
              }`}
              onClick={() => {
                updateOption("type", "drop");
              }}
            >
              drop
            </button>
          </div>

          <div className="EventOptionField">
            <p>IsRepeat</p>
            <button
              className={`EventOptionButton ${
                option.isRepeat && "EventOptionButton_Active"
              }`}
              onClick={() => updateOption("isRepeat", true)}
            >
              true
            </button>
            <button
              className={`EventOptionButton ${
                !option.isRepeat && "EventOptionButton_Active"
              }`}
              onClick={() => updateOption("isRepeat", false)}
            >
              false
            </button>
          </div>
        </div>

        <div className="EventOptionWrapper">
          <div className="EventOptionField">
            <p>Delay</p>
            <input
              type="text"
              value={option.delay}
              onChange={(e) => {
                updateOption("delay", e.target.value);
              }}
            />
          </div>

          <div className="EventOptionField">
            <p>Duration</p>
            <input
              type="text"
              value={option.duration}
              onChange={(e) => updateOption("duration", e.target.value)}
            />
          </div>
        </div>
        <div className="EventOptionWrapper">
          <div className="EventOptionField">
            <p>option</p>
            <textarea
              value={JSON.stringify(option.option)}
              onChange={(e) => {
                updateOption("option", JSON.parse(e.target.value));
              }}
            />
          </div>
        </div>

        <div className="EventOptionAll">
          <div className="EventOptionField">
            <p>Value</p>
            <input
              type="text"
              value={option.value}
              onChange={(e) => updateOption("value", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="EventTextField">
        <h2 className="EventTitle">Result</h2>
        <pre>
          {`<Text 
        value="${option.value}"
        type="${option.type}"
        delay={${option.delay}}
        duration={${option.duration}}
        isRepeat={${option.isRepeat}}
        option=${JSON.stringify(option.option)}
/>
          `}
        </pre>
      </div>
    </div>
  );
};

export default TextArea;
