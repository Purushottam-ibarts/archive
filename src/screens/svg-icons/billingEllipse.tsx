import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
const BillingEllipse = (props:any) => (
  <Svg
    width={260}
    height={139}
    viewBox="0 0 260 139"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M259.627 0.670334C259.627 18.7078 256.273 36.5686 249.759 53.2331C243.244 69.8975 233.695 85.0392 221.657 97.7936C209.619 110.548 195.327 120.665 179.599 127.568C163.871 134.471 147.013 138.023 129.989 138.023C112.964 138.023 96.1067 134.471 80.3783 127.568C64.6499 120.665 50.3587 110.548 38.3207 97.7936C26.2827 85.0392 16.7336 69.8975 10.2187 53.2331C3.70377 36.5686 0.350584 18.7078 0.350586 0.670319L129.989 0.670334H259.627Z"
      fill="url(#paint0_linear_1479_1700)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_1479_1700"
        x1={129.989}
        y1={-83.6757}
        x2={129.989}
        y2={217.324}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#D9AA59" />
        <Stop offset={1} stopColor="#FFAD20" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default BillingEllipse;
