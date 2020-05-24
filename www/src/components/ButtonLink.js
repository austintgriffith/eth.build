import React from 'react';

const ButtonLink = ({ children, href }) => (
  <a className="btn btn-primary" href={href}>
    {children}
  </a>
);

export default ButtonLink;
