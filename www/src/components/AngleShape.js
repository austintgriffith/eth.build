import React from 'react';

function AngleShape({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 90"
      fill="#000000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="0,0 1200,0 0,90" />
    </svg>
  );
}

export default AngleShape;
