import React from 'react';

function ColorTitle({ children, className }) {
  return (
    <h2
      className={`inline-block px-5 py-2 mb-6 text-white text-3xl md:text-4xl font-semibold ${className}`}
    >
      {children}
    </h2>
  );
}

export default ColorTitle;
