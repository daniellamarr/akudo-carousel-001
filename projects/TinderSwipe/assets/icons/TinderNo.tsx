import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

const TinderNo = () => {
  return (
    <Svg width="45" height="45" viewBox="0 0 45 45" fill="none">
      <Circle cx="22.5" cy="22.5" r="21.5" stroke="#FF4545" stroke-width="2" />
      <Path
        d="M29.5312 15.4688L15.4688 29.5312"
        stroke="#FF4545"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M29.5312 29.5312L15.4688 15.4688"
        stroke="#FF4545"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default TinderNo;
