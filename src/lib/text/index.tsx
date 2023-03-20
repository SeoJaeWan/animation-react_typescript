import React, { useCallback, useEffect, useRef, useState } from "react";
import useObserver from "../hooks/useObserver";
import "./Style.css";

type Option = {
  [key: string]: string | number;
};

type Type = "opacity" | "underline" | "slide" | "drop";

interface Props {
  value: string;
  delay: number;
  duration: number;
  type: Type;
  isRepeat: boolean;
  option: Option;
  //
}

const wordAnimate = {
  opacity: ({ duration }: { duration: number }) => ({
    animation: `opacity ${duration}s ease-in`,
    opacity: 1,
  }),
  underline: () => ({}),
  slide: ({ duration, idx }: { duration: number; idx: number }) => ({
    transform: `translate(0)`,
    transition: `transform ${duration + idx * 0.1}s ease-in, opacity ${
      duration + idx * 0.1
    }s ease-in`,
    opacity: 1,
  }),
  drop: ({ idx }: { idx: number }) => ({
    opacity: 0,
    animation: `dropIn 0.30s forwards`,
    animationDelay: `${idx * 0.08}s`,
  }),
};

const defaultStyle = {
  opacity: () => ({
    opacity: 0,
  }),
  underline: () => ({
    opacity: 1,
  }),
  slide: ({ option }: { option: Option }) => ({
    opacity: 0,
    transform: option.translate,
  }),
  drop: () => ({
    opacity: 0,
  }),
};

interface wordProps {
  char: string;
  type: Type;
  isActive: boolean;
  wordAnimate: Option;
  defaultStyle: Option;
}

const Word = ({
  char,
  type,
  isActive,
  wordAnimate,
  defaultStyle,
}: wordProps) => {
  const [isWordActive, setIsWordActive] = useState(false);

  const wordActiveEvent = useCallback(() => {
    switch (type) {
      case "opacity":
        setTimeout(() => {
          setIsWordActive(true);
        }, Math.random() * 1000);
        break;
      default:
        setIsWordActive(true);
    }
  }, [type]);

  useEffect(() => {
    if (isActive) wordActiveEvent();
    else {
      setIsWordActive(false);
    }
  }, [isActive, wordActiveEvent]);

  return (
    <span
      className="animation_word"
      style={isWordActive ? { ...wordAnimate } : { ...defaultStyle }}
    >
      {char}
    </span>
  );
};

/*
props
value : 출력할 문자열
delay : default 1, unit: s
      : 이벤트 시작 시간 ( 초 )
duration : default 1, unit : s
         : 이벤트 진행 시간 ( 초 )
type : default opacity, [ opacity, underline, slide, drop ]
     : fade 유형
isRepeat : default false
         : 반복 설정
option : default {}
       underLine : { 
         background: "red"
         height: "10px";
       }, 
       slide : {
        translate: "translateX(100px)"
       }

*/
const Text = ({
  value,
  delay = 1,
  duration = 1,
  type = "opacity",
  isRepeat = false,
  option = {},
}: //
Props) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isFirst, setIsFirst] = useState(false);

  const underlineEvent = useCallback(() => {
    const underline = underlineRef.current;

    if (!underline) return;

    if (isActive || isFirst) {
      const style = Object.keys(option).map((key) => `${key}: ${option[key]};`);
      style.push(`width: 100%; transition: width ${duration}s`);
      underline.setAttribute("style", style.join(""));
    } else {
      underline.setAttribute("style", "width: 0;");
    }
  }, [isActive, isFirst, duration, option]);

  useObserver({
    target: textRef,
    onIntersect: ([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          setIsActive(true);
        }, delay * 1000);
      } else if (isRepeat) {
        setIsActive(false);
      }
    },
  });

  useEffect(() => {
    const underline = underlineRef.current;

    if (!underline) return;

    if (type === "underline") {
      underlineEvent();
    } else {
      underline.setAttribute("style", "width: 0;");
    }
  }, [isActive, isFirst, type, underlineEvent]);

  useEffect(() => {
    if (isActive && !isRepeat) {
      setIsFirst(true);
    } else if (isRepeat) {
      setIsFirst(false);
    }
  }, [isActive, isRepeat]);

  return (
    <span className="animation_text" ref={textRef}>
      {value
        .split("")
        .map((char, idx) =>
          char === " " ? (
            <span key={`${char}-${idx}`}>{char}</span>
          ) : (
            <Word
              char={char}
              key={`${char}-${idx}`}
              type={type}
              isActive={isActive || isFirst}
              wordAnimate={wordAnimate[type]({ duration, idx })}
              defaultStyle={defaultStyle[type]({ option })}
            />
          )
        )}

      <span className="animation_underline" ref={underlineRef} />
    </span>
  );
};

export default Text;
