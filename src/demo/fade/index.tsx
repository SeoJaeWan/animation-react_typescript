import React, { useEffect, useRef, useState } from "react";
import { Fade } from "../../lib";
import "./style.css";

type Type = "opacity" | "top" | "bottom" | "left" | "right";

interface optionType {
  type: Type;
  delay: number;
  duration: number;
  isRepeat: boolean;
  translate: string;
}

const FadeArea = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [option, setOption] = useState<optionType>({
    type: "opacity",
    delay: 1,
    duration: 1,
    isRepeat: true,
    translate: "200px",
  });

  const updateOption = (key: string, value: number | string | boolean) => {
    setOption({ ...option, [key]: value });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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
        <Fade {...option}>
          <div className="FadeBox">Hello! Fade Animation!</div>
        </Fade>
      </div>

      <div className="EventOptionBox">
        <h2 className="EventTitle">Option</h2>
        <div className="EventOptionHalf">
          <div className="EventOptionField">
            <p>Type</p>
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
                option.type === "top" && "EventOptionButton_Active"
              }`}
              onClick={() => {
                updateOption("type", "top");
              }}
            >
              top
            </button>
            <button
              className={`EventOptionButton ${
                option.type === "bottom" && "EventOptionButton_Active"
              }`}
              onClick={() => {
                updateOption("type", "bottom");
              }}
            >
              bottom
            </button>
            <button
              className={`EventOptionButton ${
                option.type === "left" && "EventOptionButton_Active"
              }`}
              onClick={() => {
                updateOption("type", "left");
              }}
            >
              left
            </button>
            <button
              className={`EventOptionButton ${
                option.type === "right" && "EventOptionButton_Active"
              }`}
              onClick={() => {
                updateOption("type", "right");
              }}
            >
              right
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

        <div className="EventOptionHalf">
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

          <div className="EventOptionField">
            <p>Translate</p>
            <input
              type="text"
              value={option.translate}
              onChange={(e) => updateOption("translate", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="EventTextField">
        <h2 className="EventTitle">Result</h2>
        <pre>
          {`<Fade 
        type="${option.type}"
        translate="${option.translate}"
        delay={${option.delay}}
        duration={${option.duration}}
        isRepeat={${option.isRepeat}}
> 
  <div>Hello! Fade Animation!</div>
</Fade>
          `}
        </pre>
      </div>
    </div>
  );
};

export default FadeArea;
