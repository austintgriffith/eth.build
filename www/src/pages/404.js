import { graphql } from 'gatsby';
import React, { useEffect } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  useEffect(() => {
    const url = window.location.pathname;
    if (url.length > 1) {
      window.location.href = `https://sandbox.eth.build${url}`;
    }
  }, []);

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <div className="container mx-auto">
        <h1 className="text-2xl py-8">Loading...</h1>
      </div>
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
