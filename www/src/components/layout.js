import React from 'react';
// import Navigation from './Navigation';
import Container from './Container';

const Layout = ({ children }) => {
  return (
    <>
      {/* <Navigation /> */}
      <main>{children}</main>
      <footer className="py-8">
        <Container>
          <p>
            <a
              className="text-blue-500 hover:text-blue-700"
              href="https://github.com/austintgriffith/eth.build"
            >
              ⚖️ MIT -
            </a>
            <a
              className="text-blue-500 hover:text-blue-700"
              href="https://twitter.com/austingriffith"
            >
              - @austingriffith
            </a>
          </p>
        </Container>
      </footer>
    </>
  );
};

export default Layout;
