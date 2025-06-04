import * as React from "react";
import Svg, { Rect, Defs, LinearGradient, Stop } from "react-native-svg";

const ActiveBox = (props:any) => (
  <Svg
    width={283}
    height={49}
    viewBox="0 0 283 49"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect
      x={0.835938}
      y={0.170044}
      width={281.72}
      height={48.1188}
      rx={6.13982}
      fill="url(#paint0_linear_1333_1279)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_1333_1279"
        x1={-27.9496}
        y1={33.4164}
        x2={294.491}
        y2={33.4164}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#D9AA59" />
        <Stop offset={1} stopColor="#1C1C1A" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default ActiveBox;
