import React from 'react';

function AngleShape({ className, reverse }) {
  if (reverse) {
    return (
      <svg
        className={`fill-current ${className}`}
        viewBox="0 0 1200 60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="0,0 1200,60 0,60" />
      </svg>
    );
  }
  return (
    <svg
      className={`fill-current ${className}`}
      viewBox="0 0 1200 60"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="0,0 1200,0 1200,60" />
    </svg>
  );
}

export default AngleShape;
