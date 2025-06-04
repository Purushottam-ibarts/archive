import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Search = (props) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M15.535 15.535L19 19M17.9999 9.52863C17.9999 14.239 14.194 18.0573 9.5005 18.0573C4.80588 18.0573 1 14.239 1 9.52975C1 4.81712 4.80587 1 9.49937 1C14.194 1 17.9999 4.81825 17.9999 9.52863Z"
      stroke="white"
      strokeWidth={1.63}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Search;
 
