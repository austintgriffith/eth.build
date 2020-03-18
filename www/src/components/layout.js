import React from 'react';

const Layout = ({ title, children }) => {
  return (
    <div>
      <header />
      <main>{children}</main>
      <footer>find us on github</footer>
    </div>
  );
};

export default Layout;
