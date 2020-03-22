import { graphql, Link } from 'gatsby';
import React from 'react';
import Button from '../components/Button';
import Container from '../components/Container';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />

      <section className="my-8 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold">Eth.Build</h1>
              <p className="text-2xl mt-4">
                Educational sandbox for building on web3. Visually understand how Ethereum works by
                doing.
              </p>
              <p className="mt-4">
                <Button>Start Building Now</Button>
              </p>
            </div>
            <div>
              <div className="relative aspect-16x9">
                <iframe
                  className="absolute pin"
                  title="Eth.Build Video"
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/QJ010l-pBpE"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

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
