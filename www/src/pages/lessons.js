import { graphql, Link } from 'gatsby';
import React from 'react';
import Container from '../components/Container';
import Layout from '../components/layout';
import SEO from '../components/seo';

const LessonsIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <SEO title="Lessons" />
      <div className="py-16">
        <Container>
          <h1 className="text-4xl lg:text-5xl font-semibold">Lessons</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug;
              return (
                <article key={node.fields.slug}>
                  <header>
                    <h3>
                      <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                        {title}
                      </Link>
                    </h3>
                    <small>{node.frontmatter.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.excerpt
                      }}
                    />
                  </section>
                </article>
              );
            })}
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default LessonsIndex;

export const pageQuery = graphql`
  query {
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
