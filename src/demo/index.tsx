import React, { useState } from "react";
import FadeArea from "./fade";
import TextArea from "./text";
import "./style.css";

const Demo = () => {
  const [isFade, setIsFade] = useState(true);

  const ActiveFade = () => {
    setIsFade(true);
  };

  const ActiveText = () => {
    setIsFade(false);
  };

  return (
    <div>
      <div className="SelectContainer">
        <button
          className={`SelectButton${isFade ? " SelectButton__Fade" : ""}`}
          onClick={ActiveFade}
        >
          Fade
        </button>
        <button
          className={`SelectButton${!isFade ? " SelectButton__Fade" : ""}`}
          onClick={ActiveText}
        >
          Text
        </button>
      </div>
      {isFade ? <FadeArea /> : <TextArea />}
    </div>
  );
};

export default Demo;
