import React from 'react';
import AngleShape from '../components/AngleShape';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Tester = () => {
  return (
    <Layout>
      <SEO title="ETH.Build - Educational Sandbox For Web3" />

      <div className="bg-black text-white py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="px-6 xl:px-16">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-wide">
              <span role="img" aria-label="build" className="mr-4">
                🛠️
              </span>
              ETH.Build
            </h1>
            <p className="text-lg lg:text-2xl mt-1">
              An Educational Sandbox For Web3... And Much More.
            </p>
            <ul className="mt-10 text-xl list-spaced">
              <li>
                <span role="img" aria-label="Drag-and-drop" className="inline-block mr-2 md:mr-3">
                  👉
                </span>
                Drag-and-Drop Programming
              </li>
              <li>
                <span role="img" aria-label="Open Source" className="inline-block mr-2 md:mr-3">
                  🧩
                </span>
                Open Source Building Blocks
              </li>
              <li>
                <span
                  role="img"
                  aria-label="Visually Understand"
                  className="inline-block mr-2 md:mr-3"
                >
                  🧐
                </span>
                Visually Understand How Ethereum Works
              </li>
            </ul>
            <p className="mt-8 md:mt-10">
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
                className="text-center mt-4 md:mt-0 md:ml-4 block md:inline-block btn border text-lg md:text-xl border-blue-600 hover:bg-blue-500 px-12"
                href="https://www.youtube.com/playlist?list=PLJz1HruEnenCXH7KW7wBCEBnBLOVkiqIi"
              >
                <span role="img" aria-label="learn" className="-ml-1 mr-2 text-base">
                  💡
                </span>
                Learn
              </a>
            </p>
          </div>
          <div className="mt-12 lg:mt-0 relative aspect-16x9">
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
      <AngleShape className="hidden md:block" />

      {/* <AngleShape className="hidden md:block" reverse /> */}
      <div className="py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
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
          <div className="px-24">
            <h2 className="inline-block bg-purple-700 text-white px-5 py-2 text-4xl font-semibold">
              Hash Function
            </h2>
            <p className="mt-6 md:text-lg leading-8">
              Think of it like a fingerprint of any given input data. Input can be any size, output
              is always the same size (64 hex chars). Deterministic, you will always get the same
              hash for a specific input. One directional, given a hash it is impossible to guess the
              seed.
            </p>
          </div>
        </div>
      </div>
      {/* <AngleShape className="hidden md:block" reverse /> */}
    </Layout>
  );
};

export default Tester;
