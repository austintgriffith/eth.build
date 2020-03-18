import React from 'react';

const Button = ({ children }) => (
  <button
    type="button"
    className="bg-blue-500 hover:bg-blue-700 text-xl text-white py-4 px-6 rounded"
  >
    {children}
  </button>
);

export default Button;
