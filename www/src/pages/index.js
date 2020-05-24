import React from 'react';
import AngleShape from '../components/AngleShape';
import Container from '../components/Container';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Index = () => {
  return (
    <Layout>
      <SEO title="ETH.Build - Educational Sandbox For Web3" />

      <div className="text-center bg-black text-white pt-12 md:pt-32 pb-8 md:pb-64 xl:pb-56">
        <Container>
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
            <span role="img" aria-label="build" className="mr-4">
              🛠️
            </span>
            ETH.Build
          </h1>
          <p className="text-lg md:text-2xl mt-6">
            An Educational Sandbox For Web3... And Much More
          </p>
          {/* <p className="mt-12 text-lg">Better Description of ETH.Build goes here</p> */}
          <p className="mt-8 md:mt-6">
            <a
              className="text-center block md:inline-block btn btn-primary text-lg md:text-xl px-12"
              href="https://sandbox.eth.build"
            >
              <span role="img" aria-label="build" className="-ml-1 mr-2 text-base">
                🔧
              </span>
              Build
            </a>
            <a
              className="mt-4 md:mt-0 md:ml-4 block md:inline-block btn border text-lg md:text-xl border-blue-700 hover:bg-blue-600 px-12"
              href="https://www.youtube.com/playlist?list=PLJz1HruEnenCXH7KW7wBCEBnBLOVkiqIi"
            >
              <span role="img" aria-label="learn" className="-ml-1 mr-2 text-base">
                💡
              </span>
              Learn
            </a>
          </p>
        </Container>
      </div>
      <AngleShape className="hidden md:block" />
      <div className="max-w-screen-lg bg-black p-6 md:p-0 mx-auto md:-mt-64">
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

      <AngleShape className="hidden md:block" reverse />
      <div className="bg-black text-white py-12">
        <Container>
          {/* <h2 className="inline-block bg-blue-700 text-white px-6 text-4xl font-semibold">
            Hash Function
          </h2> */}
          <h2 className="text-4xl font-semibold">Hash Function</h2>
          <p className="mt-6 md:text-lg">
            Think of it like a fingerprint of any given input data. Input can be any size, output is
            always the same size (64 hex chars). Deterministic, you will always get the same hash
            for a specific input. One directional, given a hash it is impossible to guess the seed.
          </p>
        </Container>
      </div>
      <AngleShape className="hidden md:block" />

      {/* <section className="bg-black text-white pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="flex text-lg md:text-2xl">
              <span role="img" aria-label="Educational" className="inline-block mr-2 md:mr-3">
                🖍
              </span>{' '}
              Educational sandbox for Web3
            </p>
            <p className="flex text-lg md:text-2xl mt-4">
              <span role="img" aria-label="Drag-and-drop" className="inline-block mr-2 md:mr-3">
                👉
              </span>{' '}
              Drag-and-drop programming
            </p>
            <p className="flex text-lg md:text-2xl mt-4">
              <span role="img" aria-label="Open Source" className="inline-block mr-2 md:mr-3">
                🧩
              </span>{' '}
              Open source building blocks
            </p>
            <p className="flex text-lg md:text-2xl mt-4">
              <span
                role="img"
                aria-label="Visually Understand"
                className="inline-block mr-2 md:mr-3"
              >
                🧐
              </span>{' '}
              Visually understand how Ethereum works
            </p>

            <div className="mt-4 sm:grid sm:grid-cols-2 sm:gap-4 lg:gap-16 items-center">
              <p className="mt-4">
                <a className="block text-center btn btn-primary" href="https://sandbox.eth.build">
                  <span role="img" aria-label="build">
                    🔧
                  </span>{' '}
                  Build
                </a>
              </p>
              <p className="mt-4">
                <a
                  className="block text-center text-xl bg-transparent hover:bg-blue-600 text-blue-700 font-semibold hover:text-white py-3 px-6 border border-blue-700 hover:border-transparent rounded"
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
      </section> */}
    </Layout>
  );
};

export default Index;
