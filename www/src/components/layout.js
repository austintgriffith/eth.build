import { Link } from 'gatsby';
import React from 'react';

const Layout = ({ title, children }) => {
  return (
    <div>
      <header>
        <h1 className="my-4 text-2xl">
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`
            }}
            to="/"
          >
            {title}
          </Link>
        </h1>
      </header>
      <main>{children}</main>
      <footer>find us on github</footer>
    </div>
  );
};

export default Layout;
