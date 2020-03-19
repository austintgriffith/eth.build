import React from 'react';
import Container from '../components/Container';
import Layout from '../components/layout';
import SEO from '../components/seo';

const BuilderIndex = () => {
  return (
    <Layout>
      <SEO title="Lessons" />
      <div className="py-8">
        <Container>
          <h1 className="text-4xl lg:text-5xl font-semibold">Builder</h1>
        </Container>
      </div>
    </Layout>
  );
};

export default BuilderIndex;
