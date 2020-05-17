import React from 'react';
import Container from './Container';
import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <>
      <header />
      <Navigation />
      <main>{children}</main>
      <footer className="py-8 border-t border-gray-300">
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
