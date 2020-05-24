import React from 'react';
import AngleShape from '../components/AngleShape';
import Layout from '../components/layout';
import SEO from '../components/seo';
import VideoSection from '../components/VideoSection';

const Index = () => {
  return (
    <Layout>
      <SEO title="ETH.Build - Educational Sandbox For Web3" />
      <div className="bg-gray-200">
        <div className="bg-black text-white py-12 lg:py-24">
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
              <ul className="mt-10 md:text-xl list-spaced">
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
                  className="btn btn-primary block md:inline-block px-12 text-lg md:text-xl"
                  href="https://sandbox.eth.build"
                >
                  <span role="img" aria-label="build" className="-ml-1 mr-2 text-base">
                    🔧
                  </span>
                  Build
                </a>
                <a
                  className="btn border mt-4 md:mt-0 md:ml-4 block md:inline-block px-12 text-lg md:text-xl border-blue-600 hover:bg-blue-500"
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
        <AngleShape className="hidden md:block text-black" />
      </div>
      <VideoSection
        className="bg-gray-200"
        videoFirst
        videoTitle="Hash Function - ETH.BUILD"
        videoId="QJ010l-pBpE"
        content={
          <>
            <h2 className="mb-4 text-4xl font-semibold">Hash Function</h2>
            <p className="mt-3 md:text-lg">
              Think of it like a fingerprint of any given input data.
            </p>
            <p className="mt-3 md:text-lg">
              Input can be any size, output is always the same size (64 hex chars).
            </p>
            <p className="mt-3 md:text-lg">
              Deterministic, you will always get the same hash for a specific input.
            </p>
            <p className="mt-3 md:text-lg">
              One directional, given a hash it is impossible to guess the seed.
            </p>
            <p className="mt-6">
              <a
                className="btn btn-secondary"
                href="https://sandbox.eth.build/wofCrGxhc3Rfbm9kZV9pZCLEgcSDxIVsaW5rxItkFsKlxIfEiXPClMKKwqLEjCDCpHR5cGXCqklucHV0L1RleHTCo3Bvc8KSZcOMw7_CpHNpemXCksONASwywqVmxIJnc8KAwqVvcsSJcgDCpG3EiGUAwqbEk8SqdHPCkcKDwqRuYW1lwqDEosSkxZPCpMSSxJTDgMKnb8SrxZfFmcWbxZ3Fn8WhxKPEpcKmxIRyxJNnwqXFpmvFmRXCqnByb8SlcnRpZXPChMKrYmxvY2vGhVPEvGUywqtwxIJjZWhvbMWNwq9lbnRlciDGoMSwIGjGoWXCpcaEdGxlwqTErsSwwqV2YWx1xq7GoMSExJ7EjB_FosSlwqtDcsSkdG8vSMSDaMSyxLTEvwHDl8S4xLrGkcKSeB7FhMWGxYjFisWMxqECxZDFksWUxZbEq8WtxZzFnsapx550xr1lwq3FtcW3LG51bWLGocWlxJNrFcWpxavHn8Wax6HFn8KkaMeHx6bFtHTFtm7FuMW6xZkWxb7GgMaCxoTGhsKAxrpkIcemwq1EaXPGlWF5L1dhdGPHiMSzxLXDjQLCs8OMw7XHj8S9xL8DMTzHlGHFh8WJxYvFjQPHm8SJx53Eqce3woTHucWgx6bFj8W6xJjEgsevbMKgx7V0xazCkci3xa_IucWyxZPFuceyc8OAxblhyL_CoMiHxoHGociKc8KBxqppxqzGqciZyJtowojEn8SNyJDIksiUxILIl1TJmsatx4nEtTx4yKXEvsigJgTIq8itx5fFjQHIssWTyZPIicaFc8KHwqhmb8afxpDEvSzGicaLxo3Gj8aRxpPIlcaXxpnGm8ahwqDJmcmbwqXJqMqUxrPGtcenx4ZzaCBGdW5jxoTKgsKqyoHGn0bFnmlsecK8J1J1YmlrIE3Kgm8gT25lJywgc2Fucy1zxqFpZsKlY8aaxYvCpyNky47Lj8mLxJTEtcKWFSAAHwDHqMiAx6rHrMeuxqHClhbLmCEAxZRnxoB1cHPCkMKmy4luZmlnwoDCp3bGocS7yoLDiz_DmcKZy7vLu8Ka"
              >
                <span role="img" aria-label="build" className="-ml-2 mr-2 text-base">
                  🔧
                </span>
                Build A Hash Function
              </a>
            </p>
          </>
        }
      />
      <AngleShape className="hidden md:block text-gray-200" />
      <VideoSection
        className="bg-white"
        videoTitle="Key Pair - ETH.BUILD"
        videoId="9LtBDy67Tho"
        content={
          <>
            {/* <ColorTitle className="bg-orange-700">Key Pair</ColorTitle> */}
            <h2 className="mb-4 text-4xl font-semibold">Key Pair</h2>
            <p className="mt-3 md:text-lg">Consists of a public key and private key</p>
            <p className="mt-3 md:text-lg">Your public key is derived from your private key.</p>
            <p className="mt-3 md:text-lg">Your address is derived from your public key.</p>
            <p className="mt-3 md:text-lg">
              Can be used to sign and recover / encrypt and decrypt.
            </p>
            <p className="mt-3 md:text-lg">
              Anyone can generate an Ethereum account by just generating a random private key.
            </p>
            <p className="mt-6">
              <a
                className="btn btn-secondary"
                href="https://sandbox.eth.build/wofCrGxhc3Rfbm9kZV9pZMONAQ_EgcSDxIVsaW5rxItkw4zDrsKlxIfEiXPCnsKKwqLEjMOMw73CpHR5cGXCrElucHV0L0LEr3RvbsKjcG9zwpJ1xI4NwqRzaXplwpLDjMOIMsKlZsSCZ3PCgMKlb3LEiXIAwqRtxIhlAMKmxJXErnRzwpHCg8KkbmFtZcKgxKbEqGXDv8KkxJTElsOAwqdvxK_Fm8S6xZ_FocWjxaXEp8Spw7_CpcWra8Wdw4zDmsWzxaLFpMWmxKnCrm51bWJlcixib29sZWFuxbrElcW8w4DCqnByb8SpcnRpZXPCg8KldmFsdWXCqGPElGNrIMWjwqXGnnTGkMKmxLJ0xLTGk2PFr250AMShxIzEjgHGg2XCrURpc3DEgnkvV2F0Y2jEt8S5wpLDjQLCnsOMwrTEv8WBxYPHlBE8xYjFisWMxY7FkMaKBsWUxZbFmMWaxK_FncKExaDGgcW2xafFk8W7w4zDnsW6YcaJbMKgxa7FsMeqwpHHrMW0xoLFt8WXxpTElnPDgMe1x7fCoMaYxprGnMaexqDCgcawacayZcKlx4zHjmjCicSixI0BAseCwq_HhceHx4kvQWRkcsagc8eRxLrDjQUKw4zCqseZxYLHkwFWT8efYcWLxY3Fj8WRB8emxInHqMStx7zGgMW1x4LHscaVw4zDn8iKxpvGisiNc8KEwqtibG_GrMafU8eaMsKrx4hhY2Voxo_FkcKgyJDIksKnyKPIpcinxqPGpcanw5kqMHgzMmE5ZTkxOWNmODJkybY4ZDUwMjRlMcqCMGE1M2IwMzU1ybJlNGZixr7ImselyIHHhMeGyZnHisiVx4_IqceTAsKUxI7DoMiwx5sGSceexYnIt8ehyLrGigjIvcWXxZnJgMWcx73HrcmDyIHJhcSWw4zDo8iHZce4x7p0xbHKs8e_x6_EqQDIg8aWyrvHuMmJyIzGn3PIj8axxpDIlMeNx4_Kk8SOyLzIgcKuQ3LEqMS0L1Jlxrl2xorKnceUCMeUw7jKo8KCwqEww4pDITMzwqExLsi2yLjHosWRCcquyL_FscKSyYJlwqlbxaNzc8i3ZV3HgsKmxIRyxJVnxarJhsOpy73Cq1vFgGfFoXR1yKbMhsiBzIh0zIpuzIzHssOoyr7LgMu9wqdhyKTIpsyCzIfMicyLy4bEusOMw6bDjMOny4rJi8uMwoLCp8yBzINnZcK9dGhlIMaJYXIgx4YgxIRpxqx5IHfIkWggyZ1uZXnCqcyTzJXMl2XDmcKEyaw4NzVkMjBlYsqAZsuvNTlmyKTNnDLNp8uvMjM4NDk5NGEyzbM3NzEyODbNt2Mwzac2YjkwMTPEic27ZDFiZsqKMc2xzok0zoY3YTfNt2TKiMqQNsm4M82oxok4Nc6Nzb1jNzY5OMm_Y86AMmY3ZGE2zafJvc2izbTOpcm5MWE4zozLlAEDx4LCq8uZy5tvL8mVzJTLowHCrsqhy6jLqsusOmZmy7FWy7TKqsejcgTLucqwxbHClMu9wqxbxplpxqR0ZWvNksyZxafMm8ydzJ_JhsOgy73Cqs-fxpp2xIzGis-nxKnPqcyLzI3FrMu9y7_MuMyEz7Vlz7fMns-5a8OMw6HLvceZzJTHgsWpxbvFrcWvyr_Hqs-cyrRlzKXMp8inzKrMnMysxbvIhcykz73MutCXz6rMrcOAz7vNlceNzZfQn9CZxpXMrsOjw4zDqMu9zIhpzJRlZNCK0KHMs8ady4zChcy3yKfMhMy8zL7NgMaRzYPNhc2HzYnNi82NzY_Etc2SyIrPoceNZUvNksOZQsmszbo3zq5jOM2iybjNvmZhzobNocqJzqg5ya9izqdjzbbNsGXOp829N2LOi86uzbtmMTY2zKbOpjLNucm4NTTNusKoxplvz7LFkcK6aMa2cHM6Ly9hdc2HzJ7Mis-QzY0uxrltzZTQsM2WyKbDgMKo0onEtM-GbsODzr0Kx4LKl8igYcqay5LHkMS4yKoDIMeUwp7Ko8qex53PlMi5z5YLz5nHqcqyx77HrsmE0IPMr8uIx7nQjsuA0rfKtcew0KHSvNC2yYzLjsiRy5DKm8iXyJnEjtKzyIHInsqYyKHJpMyoyKjSp8eTAyrDjQM00q3EjkBQ0rDLtsaKDNK0yrHFncu9y4PFl9K6zLLRvcuLxqDJjsmQyZJryZTJlsmYxILJm8mdbMmfyaHGkMmj0JXMgsmnxqbNmMmrya3Jr8mxybPJtcm3ybnJu8m9yb_KgcqDMcqFyofKicqLyo3JscqQYsKI04wB06TKlsifypkvVNOIZcqdUFrTnQHDtMuFyqjLtcqrcseBxZXIvtOFy4zCh8KoZsS1dMmVxYIsyY_JkcmTZdS6ZcmXyZnTuMmexorJoMuPyJPUosiS1IHGp8Ko0Y7NilBhaXLCqtS3xrtGxaJpbHnCvCdSdWJpxq1NxLVvIE_NkScszYbGknMtc8aKaWbCpca5yZFywqcjyKTVu2TOvc-YyIHCqsSsxZvUoWV4dNSlxI7DqtSoLMWH1KzPlcWRyJzUscqv0rXTp9CS06nKt2vQjce7yrLTqNCnzJ7MrcKT0IXDjMOpw4zDq9Sz06_UvdOy07TFgtWD07fJnNWGcsKvZca7xoogz6PWhs2PxorIk9WJwqRU1oV01Y3Mu8y9zL_NgdGBc82Gxp7RhM2MzL3Rh82RecqTw4zDvMidz4Jwy5zVkCDVktWUz4jCg8OMw5vPjMurQ1PCmcKay7FC06HUrs6_1pLLuseqy7zQksKtz7DRi8-jIM-lec-_0IHPq8-60JLCqMy6zZFy0YzQitK6w5rMoseqwpPMkM-gz6LMv9e01p5nzK3FhMOgxJrPrsSuyZDNiNezzZLYi8ytwpHDjMOqzKTMpsmlzKnMmsyr1p_QmsWEw57Jh9any43RitiI1ZDRkM2bN82xZc6pZsmvzqHNqWLKiDA0zqvRrM23Nc27zaEwzrfVgmPNtM2dybjGidSU2LDNndi5Mc6zN2XNp9GWzr0Ox4LLmMua15XPhETLn9mW1ofTlseUworDjQTHpcWAyLHHly3Xp8-W0p_Xqs-a16zYhsyK2IjYlXnYi9K6w67Pu9azY9mb0LLZsseyw6zYg9ac0JLCqcSJ2bfLm9m5zJpvYmrLn9eA0JrYmcOt2KfCgM69xL7Ll9eUy5xFbtqC15XPiHLZoNmix5rFhMK02abWjtKxxZEF06XLu9iR1aHGq9mw2brJhtib0JLQusyCzITaq8q4w6vZvcWy0JLCptqG2ohjdMyH2rnaidCh2bXaltm40LPYoNCY2KLQqdiZw6zajs69D9Kg1J_IodOKy6MDwo7am9Sodcqnx6DaosaKxL7ZqtaUy4HSuMq20rrDrdK82rXbn9OBy4TTg8SCyIjYp9OH1YzTisytwp_ClsW-xKQA15EBw7_bstilw7wCx4AAANuyw5_Xkdu8yJvbvtuy2I_DvADEjgPFmNihZ9uyw6HEjgTcic6-Ate327LDo9yK3IMG3IXMr8uV3JMK3JzDp9ye043cnMOo3JnLlQHcltaj3JHckwfcjNuG3I7Ymtu2xL3cr8-q27LDq9ysxL3cqdyN27LDrNy6xI4O3LvcsNuyw63dgNyTD9ycw67XkdyTDty1zIvCpmfGmnXShMKQwqbGuW5m0LDCgMKny6FyxYDEtcOLP8OZwpndpN2kwpo"
              >
                <span role="img" aria-label="build" className="-ml-1 mr-2 text-base">
                  🔧
                </span>
                Build A Key Pair
              </a>
            </p>
          </>
        }
      />

      <VideoSection
        graySection
        className="bg-gray-200"
        videoFirst
        videoTitle="Sending and Receiving Value"
        videoId="mhwSGYRmkEU"
        content={
          <>
            <h2 className="mb-4 text-4xl font-semibold">Look Ahead: Transactions</h2>
            <p className="mt-3 md:text-lg">
              Users can sign messages that go on-chain to send and receive value.
            </p>
            <p className="mt-3 md:text-lg">
              No decimals! Amounts are integers, in Wei. 1 ETH is 10^18 Wei.
            </p>
            <p className="mt-3 md:text-lg">
              You can generate accounts by just randomly generating private keys.
            </p>
            <p className="mt-6">
              <a
                className="btn btn-secondary"
                href="https://sandbox.eth.build/wofCrGxhc3Rfbm9kZV9pZMONASrEgcSDxIVsaW5rxIvEjQEJwqXEh8SJc8OcABXCisKixIzEjhLCpHR5cGXCq0NyxKp0by9IxINowqNwb3PCksSOw6rDjMK-wqRzaXplwpJ4HsKlZsSCZ3PCgMKlb3LEiXIIwqRtxIhlAMKmxJVwdXRzwpHCg8KkbmFtZcKlxZrFnMSoxKplwq3EhHLElWcsbnVtYmVywqTElMSWw4zDscKnb8WcxZvFncWfxaHFo2XCpGjEtcWpxKvCpsWtxa_CpcW5a8S6w4zDsMOMw7LCqnByb8SrcnRpZcWMxKPEpQEWxonFq0Rpc3DEgnkvV2F0Y8S2xLjEusONAsKAUMWAxYLFhMONAzE8xYjFisWMxY7FkMW2CsWUxZbFmMWnxoHChMaDxaTCoMakAMW4xJVrxpTGjmHFtWzCoMW9xb_FnMWex4vFoseNx4_GjseSc8OAx5XHl8KgxpbGmMaaxpzGnsKBwqXGnHRsxaXGrcavaMKJxKTEmRnGpMKvxqbGqMaqL0FkZHLGnnPEt8S5xLsEEMOMw4jGuMWDxLsBQFDGv2HFi8WNxY_FkQzHhsSJx4huxoDFnsWgx59lx47EqcSrx5DGj8OMw7XHqcaZxbbHrHPChMKrYmxvY2vGnVPGuTLCq8apYWNlaG9sxZHCoMevacexZcKnyIHIg8iFwqV2YWx1ZcOZKjB4MzhiNDhhNmE4ZTdiNmMxZjkwNjQ1NTNjNGVhMmNjyawyZDNkMjlmY8agxJkdxqTCrEnInsWcL0LFnMSxbsiHxrMDcMa0TsiOxYTIjDLIlMiWx4LFkceQxZXInMWZyoTGgcihxoTIpMWqw7_HkcSWw4DHmnTIn8KSyp_HoMilZcO_x6LElsWew4zDusqryKPGpMKuxbLFtMW2LGJvyYHJsG7KsMaQw4DIq8erxp1zwoPJjcmPyZHCqGPElMi1IMWkyYXJh8Kmyod0yonCpWPFvm50AMe3xqEexqTCqse9yLzGq1FSyovEuwbCmlrKkciQwpDEjsKQypXHgciYxbYOyJvFl8qcyJ_CkceeyqDHj8qkx5PDu8emZWzJk8mVyZfJmcmbyZ3Jn8mhyaPJpcmnyanJq8mtya_JscmzybXJt8m5ybtjy4XIrcuHwoLCpnFyyLjFg8SOGMeiZ2h0w4LJvsSOGsqBV2ViM8qGyY9hbsi-y6nDjQRgxI7CpMqRwoLCoTDDjMOSwqExQsuzyJfHg3INy7jIncifwpPKtcKnYciCyIRzc8akxot0xa5uZ8yAw4zDtsq1wqxbyLLItGvGsGHElV3NmMaMzZzNnsO5yrXLmWhlyLXGpMqjyKjDusqny7vLvcWkwqdizLXMt8aFyq3Cpsq5xbVyy4LKssO8zINswq81McmpN8mpMM6SzpPOksycxpvMns2SzZTIhcyGyZbJmMmayZzJnsmgyaLJpMmmyajJqsmsya7JsMmyybQzybbJuMm6ybzCqMaXb3bEjMW2wrfMqcqoczovL2TNqC7EuGEubmV0d8WPa8ysAR_Kt1XGnGxzL0bGmG0gzLBpzLkFWsqPzL_NgcOMwqDNhRrNiMqXxbbEp8qay7nHicigx4zFpceJzZjOhMW2zZ7DvM25x5zGgsiiwqbFvsqoxajOgs-wzobGj8qyw73OlsiuwoHCqMSJY2ltyY9zEs-LIMe7y6THv0TJgcSCcsiGxrLLqkDGtDDLrsS-N8-ky7VyFM2Ny7rPtcq1yqHIps2ew73PtMqez6zQp2XOg8WzzoXOh8uEzrPLhsaeyLDNpMi1yLfIuci7xILIvsmAyYLFtsKvZcucxbYgdGV4dCDNssiEy5PHssKn0JJs0JRzy4rJkGXDiz9Aw6zChMKfwqLDjT7PixPHu8SuxLDEsktleSBQzahyzLkCw67Ng8-eMMOKQ1PCmcKazYXNh8WJyJXLtM2KCdCjz6rKqs-swq1bxpdpyY7RiCBr0anNqs6CzazNnciow7DKtcKoZ9GExbbGrs6ByqLMgMqmz7nNj8q1yLvFrtKJZdKL0anNq82axo3Pv8KRw4zDvsq1xpZ1yLJpY9KledKnzZtn0LPNkc2TyYvNltK20qnHo8KTyKnNn8OMw7vQgsuHwoHHqdKI0pnRqHnDmULJlThmODczN8i-MDhjNjdhyasxNzdmyaBlNmIyZtOWNDDJu8mYMDXJuTTOrTk205JmMTIw06fJmmNk07TOrTjTk2bPiyPKgcqDxoAvTtCxxbbMuQPCtsa7wpjQnMK-ypTRvMqW0KAB0oHKnc-ryKLQrsinx5LSnceb0KzUm8-v1IrPvsejwpHEjgHThtC30L3Ivci_yYHFkcKhI9GP0K_Uicq6zobJjtGXwqMwLjHIsciz0LplzKNlMs-LJMqBz49pz5EvVG_Pl2XPmdCXzLrCsNSP0bPDjMKqz6LQn82KB9SYy7vNsM-uz7zUpMyA1KjQq9SaxoTPuNSg1KPUts6H1KcBAtSqc9CE0IbQiNCK0IzHuMSOIsui1IbKhVTRiXTUjMKOxrvGo8WByI_EjsOUNdWZxZEC1ZzQpdCty7_Gj9Sfz7rUocu-0o_SqM2c1avDjMO_1a_QuNS_yLbVgdC8yLzQv9Sv0YLRhNGIctGH1b3RjMW2xaXHsMeywqTVvNGK0ZbJkc6cMzRhQTNGMzU5QTlENjE0MjPJpzHOjTI2Nta6Q0XToM6tyaTTkUTWuc-LJdSFyp3KhsqIb8qK1ZEEw5jMuhDQnMOI1JPHgM2JxZED1ovWksqs0pvWj9Wk0oPUosqtyq_SqsSOA9CmyrfPvcq8yr7Hssy20LPVr8uJ1LjLjMuO0rJry5HWq8mGx7LLldeZy4HLmnXLnADPiyfGpMKt0JBhxqvHtMawzLkHRMSOw6DLrsa7JMOMw5XWiMW2D9eox53Wjcqt1J3ElsSOBc6Kx5nSns-1zbvKttio0LPYrdWvx67WrMezxq7GsM-LJtiR2JPYldi6xrHIiMONB2zGtMO42J0Kaca-1JTRvsWR16DPqM2O2LDYp8Wq2KlrxI4E2K3VpMu82ZTIpti0xILHp9i21LPCpdiWaM-L0KLKrcKq1bp01YvVvcupZMOMwrTYnQEs16PRvdelxbYE2KXPttaT2ZXSnNmb17XWlNK31pfDsdaa1L7NpdC7xYPIutag1K7RgXLRg9GF1qbRiNGK1qnRjti41q7VvdaxZcKsyr13x6xmxa7Ov3nPixzVudeX1q_VvtWRAsK8xI7Dgtmz2bXYonIF2bvagdm-16zYr9ep2LLFqs2Z2oPPv8KSw4zDucSOBtqG0LnWndWC2ovQvtqNxZHakNal1qfalNGN2IXJh9qY1rDXv2XOuMuXcM67zr3Ov2nPgW_Pg8-Fz4fPic-LIcakwrDMsMyy1YtyzLZzyL3GnNeazLkGBMa0w5rVlcOwzYXDjMK62rEL2KXCmc2hzaPWnM2nzanSvs2t1o_bv9KH0qPSjHnSjtq70pDNntKtz6zCpFvEsdyMxorcjsiow7_NkVvbldyVxavXt9yXx5LEjgLKtcKmW86_dGHcndq8xa_SnM2wW2fEg9ydwq3cn9aV0pHUntKu3K_Eg1DFrsi-3LLctNK33K3PrMKnW8SHzoDcvtSkLNygyqXKtca4Z27NtdWiAQPVpMKU0qDNmtus265p15rNmG9ias2zdNWr2KvcpMWB3Y5lZNyE0rjavtmYxI4H3aRp3abdqNew0rnckcaHc2jdqde80LXMncaewojamsOLQ3Y0V8KFw5jCoADEnNeayL7DgMKk3KdhwqLJlcKj3LBzw41Zw5jSldy63Lxlw47DtGEJAM6yxpjOtcWRw5k9zrnbmc68L9CJxJXboS7ElWZ126versSydsyzZda7ya7JqWPOrdO6N9WD07MzZjVmzpLXismY1YPTktOJ0qPTjNOO05DTktOU05Zl05jTmtOc057ToNOi3r7TpdOn06nTq9OSYtOu07DTstO005HTt9O5ZtO7071m07_UgcKixLHWs9a11rfWuda71r3Wv9eB14PXhdeH14nXi9eN05TJsjHXkdeT1bYBKMyvzLHMs1PRhGQgVHjbscK4xrvDstGz0bUp0bjRutqxEdilzZDPrMaL3bDPhd2y3I3ctd2R3a7PrM2i24Xcgm7cqt2K2ZcBBt2Mc-Cgid2Qxo_EjgnXrd2M3bbduNqC0r_KsdWsCM2RyITIvmlwdN2c3Z7doN26x6rdvHPCgs6Z0rxzwqDeoc60zrZy25fOut6p25zbntugz4bPiHLPiuCggirXltSHy5bKic-aw6bMusKI16HZttSVzYoG2rTZncqu2b_auMS62rXEq9ex1KbgoLPgobNlyrjdiMq9yr_Xu8-_0LTgoYjOl8ae177Li2XLjcuP2IPLkti42IjLl9eay5nLm8udz4sp2L7Gp8ulxqzZgdiYdsa7wo7Ynca82YzXpM-lctGj2ZHQpMeK4KGu2ZbEjgjZmuChsdmc16_Zldmfx5bMhMeo3bvgooLVsNmj2aXOh8SgFcKWxpLEpgDEjhPFmNKQ4KK8w7HEjhTgor8BEgDFrNy1xbHUpOCivMOy4KK-xI4WAADgorzDteCjgALEjhngo5XgorzDtuCjmcyt4KOC3LXgorzbgQEc4KOIGgHcq82c4KK8w7rEjh3go6gCw7_gorzDu-CjoAEe4KOdw4zDvOCjocSOH8WYz73gorzDveCjveCjiCDgo7nDvuCjgOCjiCHgo6rgo4PWmNW34KSJAuCjq2fCltSoxI4j4KOIJOCjv-Cjj9yixI7gpJjEjiED3LPdiOCjg9ezxI4l4KSJCOCjs92sAeCkisSOJuCjndir4KSe4KOIJ-Ckr-CgrMSO4KOnxI4o4KSL4KOj3a3gpJ4B4KS44KOi0rfgpJMBCOCkv8SOKeCktAnEjirgo4go4KOywqZnxph125nCkMKmy5puZt2wwoDCp3bFtsWB15rRmcOZwpngpaLgpaLCmg"
              >
                <span role="img" aria-label="build" className="-ml-1 mr-2 text-base">
                  🔧
                </span>
                Build A Key Pair
              </a>
            </p>
          </>
        }
      />
    </Layout>
  );
};

export default Index;
