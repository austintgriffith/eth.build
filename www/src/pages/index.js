import { graphql } from 'gatsby';
import React from 'react';
import Container from '../components/Container';
import Layout from '../components/layout';
import SEO from '../components/seo';

//  <h1 className="text-4xl lg:text-6xl font-bold">Eth.Build</h1>

/*

console.log("SCROLL",e)
window.scrollTo({
  top: 580,
  left: 0,
  behavior: 'smooth'
});

<section className="my-8 py-20 bg-gray-800 text-white">
  <Container>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div>
        <img src="https://via.placeholder.com/680x400" alt="Eth.build demo video" />
      </div>
      <div>
        <h2 className="mt-4 lg:mt-0 text-4xl font-semibold">Lessons</h2>
        <p className="mt-4 text-xl">
          Educational sandbox for building on web3. Visually understand how Ethereum works by
          doing.
        </p>
        <p className="mt-4">
          <Link to="/lessons/" className="btn btn-secondary">
            View Lessons
          </Link>
        </p>
      </div>
    </div>
  </Container>
</section>

<section className="my-8 py-20">
  <Container>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="mt-4 lg:mt-0 text-4xl font-semibold">Builder</h2>
        <p className="mt-4 text-xl">
          Educational sandbox for building on web3. Visually understand how Ethereum works by
          doing.
        </p>
        <p className="mt-4">
          <a className="btn btn-secondary" href="#">
            Start Building Now
          </a>
        </p>
      </div>
      <div>
        <img src="https://via.placeholder.com/680x400" alt="Eth.build demo video" />
      </div>
    </div>
  </Container>
</section>

*/

const Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />

      <section className="my-8 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-2xl mt-4">🖍 Educational sandbox for Web3</p>
              <p className="text-2xl mt-4">👉 Drag-and-drop programming</p>
              <p className="text-2xl mt-4">🧩 Open Source building blocks</p>
              <p className="text-2xl mt-4">🧐 Visually understand how Ethereum works</p>

              <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 items-center">
                <p className="mt-4">
                  <a className="btn btn-primary" href="https://sandbox.eth.build">
                    <span role="img" aria-label="build">
                      🔧
                    </span>{' '}
                    Build
                  </a>
                </p>
                <p className="mt-4">
                  <a
                    className="inline-block text-xl bg-transparent hover:bg-blue-600 text-blue-700 font-semibold hover:text-white py-3 px-6 border border-blue-700 hover:border-transparent rounded"
                    href="https://www.youtube.com/playlist?list=PLJz1HruEnenCXH7KW7wBCEBnBLOVkiqIi"
                  >
                    <span role="img" aria-label="learn">
                      💡
                    </span>{' '}
                    Learn
                  </a>
                </p>
              </div>
            </div>
            <div>
              <div className="relative aspect-16x9">
                <iframe
                  className="absolute pin"
                  title="WTF is 🛠ETH.BUILD"
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/30pa790tIIA"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
