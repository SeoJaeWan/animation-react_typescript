# animation-react

Fade, Text 애니메이션을 React에서 사용할 수 있게 구현한 라이브러리입니다.

<a href="https://seojaewan.github.io/animation-react/" target="_blank">Demo</a>

## Install

```bash
npm install animation-react
# or
yarn add animation-react
```

## Simple Usage

### Fade

```jsx live
return (
  <Fade type="left" delay={1} duration={1} isRepeat={false} translate="100px">
    <div>// Your Code</div>
  </Fade>
);
```

#### props

type : Fade 유형 ( default : "opacity" )
[ opacity, top, bottom, left, right ]

delay : 이벤트 실행 대기 시간 ( default : 1, unit : s )

duration : 이벤트 진행 시간 ( default : 1, unit : s )

isRepeat : 반복 설정 ( default : false )

translate : Fade 이동 거리 ( default : "100px" )

### Text

```jsx live
return (
  <Text
    value="Hello! World!"
    type="slide"
    isRepeat={true}
    option={{ translate: "translateX(100px)" }}
  />
);
```

#### props

type : Text Animation 유형 ( default : "opacity" )
[ opacity, underline, slide, drop ]

delay : 이벤트 실행 대기 시간 ( default : 1, unit : s )

duration : 이벤트 진행 시간 ( default : 1, unit : s )

isRepeat : 반복 설정 ( default : false )

option : 이벤트 옵션 ( default : {} )

```jsx live
option as underLine : {
background: "red",
height: "10px",
}

option as slide : {
translate: "translateX(100px)"
}
```
