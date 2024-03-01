import React from 'react';

const Span = ({ style, text }: { style?: any; text: string }) => {
  return (
    <span style={style}>
      {/* Cnter text as in the state */}
      {text}
    </span>
  );
};

export default Span;
