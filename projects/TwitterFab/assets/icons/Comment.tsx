import React from 'react';
import Svg, {Rect, Defs, Pattern, Use, Image} from 'react-native-svg';

const Comment = () => {
  return (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <Rect width="18" height="18" fill="url(#pattern_comment)" />
      <Defs>
        <Pattern
          id="pattern_comment"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1">
          <Use xlinkHref="#image0_18_432" transform="scale(0.01)" />
        </Pattern>
        <Image
          id="image0_18_432"
          width="100"
          height="100"
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
};

export default Comment;