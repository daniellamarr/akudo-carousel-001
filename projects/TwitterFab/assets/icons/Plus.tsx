import React from 'react';
import Svg, {Path} from 'react-native-svg';

const Plus = ({color}: {color?: string}) => {
  return (
    <Svg width="23" height="23" viewBox="0 0 23 23" fill="none">
      <Path
        d="M3.59375 11.5H19.4062"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.5 3.59375V19.4062"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

Plus.defaultProps = {
  color: '#fff',
};

export default Plus;
