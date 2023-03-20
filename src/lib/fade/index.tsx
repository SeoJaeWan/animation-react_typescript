import React, { useEffect, useRef, useState } from "react";
import useObserver from "../hooks/useObserver";
import "./Style.css";

interface Props {
  delay: number;
  duration: number;
  type: "opacity" | "top" | "bottom" | "left" | "right";
  translate: string;
  isRepeat: boolean;
  //
  children: JSX.Element;
}

// props
// delay : default 1, unit: s
//       : 이벤트 시작 시간 ( 초 )
// duration : default 1, unit : s
//          : 이벤트 진행 시간 ( 초 )
// type : default opacity, [ opacity, top, bottom, left, right ]
//      : fade 유형
// isRepeat : default false
//          : 반복 설정
// translate : default 100px,
//           : 이벤트 거리
const Fade = ({
  delay = 1,
  duration = 1,
  type = "opacity",
  isRepeat = false,
  translate = "100px",
  //
  children,
}: Props) => {
  const fadeRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isFirst, setIsFirst] = useState(false);

  useObserver({
    target: fadeRef,
    onIntersect: ([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          setIsActive(entry.isIntersecting);
        }, delay * 1000);
      } else {
        setIsActive(false);
      }
    },
  });

  useEffect(() => {
    if (isActive && !isRepeat) {
      setIsFirst(true);
    } else if (isRepeat) {
      setIsFirst(false);
    }
  }, [isActive, isRepeat]);

  const transform = {
    opacity: "",
    top: `translateY(-${translate})`,
    bottom: `translateY(${translate})`,
    left: `translateX(-${translate})`,
    right: `translateX(${translate})`,
  };

  const activeStyle = {
    transition: `transform ${duration}s, opacity ${duration}s`,
    opacity: "1",
  };

  return (
    <div className="aniation_container">
      <div
        className="animation_fade"
        style={
          isActive || isFirst
            ? { ...activeStyle }
            : {
                transform: transform[type],
                transition: `transform ${duration}s, opacity ${duration}s`,
              }
        }
      >
        {children}
      </div>
      <div className="animation_trigger" ref={fadeRef} />
    </div>
  );
};

export default Fade;
