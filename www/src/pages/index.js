import { graphql } from 'gatsby';
import React from 'react';
import Button from '../components/Button';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />

      <section className="my-8 py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold">Eth.build</h1>
              <p className="text-2xl mt-4">
                Educational sandbox for building on web3. Visually understand how Ethereum works by
                doing.
              </p>
              <p className="mt-4">
                <Button>Start Building Now</Button>
              </p>
            </div>
            <div>
              <button type="button" className="mt-4 lg:mt-0">
                <img src="https://via.placeholder.com/680x400" alt="Eth.build demo video" />
              </button>
            </div>
          </div>
        </div>
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
