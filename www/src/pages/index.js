import { graphql, Link } from 'gatsby';
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




*/

const Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="ETH.Build - Educational sandbox for Web3" />

      <section className="my-4 md:my-8 py-4 md:py-16">
        <Container>
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
        </Container>
      </section>












      <section className="my-8 py-20 bg-gray-800 text-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-16x9">
              <iframe
                className="absolute pin"
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/QJ010l-pBpE"
                frameBorder="0"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div>
              <h2 className="mt-4 lg:mt-0 text-4xl font-semibold">Hash Function</h2>
              <p className="mt-4 text-xl">
                <ul>
                  <li>Think of it like a fingerprint of any given input data.</li>
                  <li>Input can be any size, output is always the same size (64 hex chars).</li>
                  <li>Deterministic, you will always get the same hash for a specific input.</li>
                  <li>One Directional, given a hash it is impossible to guess the seed.</li>
                </ul>
              </p>
              <p className="mt-4">
                <a className="btn btn-primary" href="https://sandbox.eth.build/wofCrGxhc3Rfbm9kZV9pZCLEgcSDxIVsaW5rxItkFsKlxIfEiXPClMKKwqLEjCDCpHR5cGXCqklucHV0L1RleHTCo3Bvc8KSZcOMw7_CpHNpemXCksONASwywqVmxIJnc8KAwqVvcsSJcgDCpG3EiGUAwqbEk8SqdHPCkcKDwqRuYW1lwqDEosSkxZPCpMSSxJTDgMKnb8SrxZfFmcWbxZ3Fn8WhxKPEpcKmxIRyxJNnwqXFpmvFmRXCqnByb8SlcnRpZXPChMKrYmxvY2vGhVPEvGUywqtwxIJjZWhvbMWNwq9lbnRlciDGoMSwIGjGoWXCpcaEdGxlwqTErsSwwqV2YWx1xq7GoMSExJ7EjB_FosSlwqtDcsSkdG8vSMSDaMSyxLTEvwHDl8S4xLrGkcKSeB7FhMWGxYjFisWMxqECxZDFksWUxZbEq8WtxZzFnsapx550xr1lwq3FtcW3LG51bWLGocWlxJNrFcWpxavHn8Wax6HFn8KkaMeHx6bFtHTFtm7FuMW6xZkWxb7GgMaCxoTGhsKAxrpkIcemwq1EaXPGlWF5L1dhdGPHiMSzxLXDjQLCs8OMw7XHj8S9xL8DMTzHlGHFh8WJxYvFjQPHm8SJx53Eqce3woTHucWgx6bFj8W6xJjEgsevbMKgx7V0xazCkci3xa_IucWyxZPFuceyc8OAxblhyL_CoMiHxoHGociKc8KBxqppxqzGqciZyJtowojEn8SNyJDIksiUxILIl1TJmsatx4nEtTx4yKXEvsigJgTIq8itx5fFjQHIssWTyZPIicaFc8KHwqhmb8afxpDEvSzGicaLxo3Gj8aRxpPIlcaXxpnGm8ahwqDJmcmbwqXJqMqUxrPGtcenx4ZzaCBGdW5jxoTKgsKqyoHGn0bFnmlsecK8J1J1YmlrIE3Kgm8gT25lJywgc2Fucy1zxqFpZsKlY8aaxYvCpyNky47Lj8mLxJTEtcKWFSAAHwDHqMiAx6rHrMeuxqHClhbLmCEAxZRnxoB1cHPCkMKmy4luZmlnwoDCp3bGocS7yoLDiz_DmcKZy7vLu8Ka">
                  🛠 Build
                </a>
              </p>
            </div>
          </div>
        </Container>
      </section>




      <section className="my-8 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="mt-4 lg:mt-0 text-4xl font-semibold">Key Pair</h2>
              <p className="mt-4 text-xl">
              <ul>
                <li>Consists of a public key and private key</li>
                <li>Your public key is derived from your private key.</li>
                <li>Your address is derived from your public key.</li>
                <li>Can be used to sign and recover / encrypt and decrypt.</li>
                <li>Anyone can generate an Ethereum account by just generating a random private key.</li>

              </ul>
              </p>
              <p className="mt-4">
                <a className="btn btn-primary" href="https://sandbox.eth.build/wofCrGxhc3Rfbm9kZV9pZMONAQ_EgcSDxIVsaW5rxItkw4zDrsKlxIfEiXPCnsKKwqLEjMOMw73CpHR5cGXCrElucHV0L0LEr3RvbsKjcG9zwpJ1xI4NwqRzaXplwpLDjMOIMsKlZsSCZ3PCgMKlb3LEiXIAwqRtxIhlAMKmxJXErnRzwpHCg8KkbmFtZcKgxKbEqGXDv8KkxJTElsOAwqdvxK_Fm8S6xZ_FocWjxaXEp8Spw7_CpcWra8Wdw4zDmsWzxaLFpMWmxKnCrm51bWJlcixib29sZWFuxbrElcW8w4DCqnByb8SpcnRpZXPCg8KldmFsdWXCqGPElGNrIMWjwqXGnnTGkMKmxLJ0xLTGk2PFr250AMShxIzEjgHGg2XCrURpc3DEgnkvV2F0Y2jEt8S5wpLDjQLCnsOMwrTEv8WBxYPHlBE8xYjFisWMxY7FkMaKBsWUxZbFmMWaxK_FncKExaDGgcW2xafFk8W7w4zDnsW6YcaJbMKgxa7FsMeqwpHHrMW0xoLFt8WXxpTElnPDgMe1x7fCoMaYxprGnMaexqDCgcawacayZcKlx4zHjmjCicSixI0BAseCwq_HhceHx4kvQWRkcsagc8eRxLrDjQUKw4zCqseZxYLHkwFWT8efYcWLxY3Fj8WRB8emxInHqMStx7zGgMW1x4LHscaVw4zDn8iKxpvGisiNc8KEwqtibG_GrMafU8eaMsKrx4hhY2Voxo_FkcKgyJDIksKnyKPIpcinxqPGpcanw5kqMHgzMmE5ZTkxOWNmODJkybY4ZDUwMjRlMcqCMGE1M2IwMzU1ybJlNGZixr7ImselyIHHhMeGyZnHisiVx4_IqceTAsKUxI7DoMiwx5sGSceexYnIt8ehyLrGigjIvcWXxZnJgMWcx73HrcmDyIHJhcSWw4zDo8iHZce4x7p0xbHKs8e_x6_EqQDIg8aWyrvHuMmJyIzGn3PIj8axxpDIlMeNx4_Kk8SOyLzIgcKuQ3LEqMS0L1Jlxrl2xorKnceUCMeUw7jKo8KCwqEww4pDITMzwqExLsi2yLjHosWRCcquyL_FscKSyYJlwqlbxaNzc8i3ZV3HgsKmxIRyxJVnxarJhsOpy73Cq1vFgGfFoXR1yKbMhsiBzIh0zIpuzIzHssOoyr7LgMu9wqdhyKTIpsyCzIfMicyLy4bEusOMw6bDjMOny4rJi8uMwoLCp8yBzINnZcK9dGhlIMaJYXIgx4YgxIRpxqx5IHfIkWggyZ1uZXnCqcyTzJXMl2XDmcKEyaw4NzVkMjBlYsqAZsuvNTlmyKTNnDLNp8uvMjM4NDk5NGEyzbM3NzEyODbNt2Mwzac2YjkwMTPEic27ZDFiZsqKMc2xzok0zoY3YTfNt2TKiMqQNsm4M82oxok4Nc6Nzb1jNzY5OMm_Y86AMmY3ZGE2zafJvc2izbTOpcm5MWE4zozLlAEDx4LCq8uZy5tvL8mVzJTLowHCrsqhy6jLqsusOmZmy7FWy7TKqsejcgTLucqwxbHClMu9wqxbxplpxqR0ZWvNksyZxafMm8ydzJ_JhsOgy73Cqs-fxpp2xIzGis-nxKnPqcyLzI3FrMu9y7_MuMyEz7Vlz7fMns-5a8OMw6HLvceZzJTHgsWpxbvFrcWvyr_Hqs-cyrRlzKXMp8inzKrMnMysxbvIhcykz73MutCXz6rMrcOAz7vNlceNzZfQn9CZxpXMrsOjw4zDqMu9zIhpzJRlZNCK0KHMs8ady4zChcy3yKfMhMy8zL7NgMaRzYPNhc2HzYnNi82NzY_Etc2SyIrPoceNZUvNksOZQsmszbo3zq5jOM2iybjNvmZhzobNocqJzqg5ya9izqdjzbbNsGXOp829N2LOi86uzbtmMTY2zKbOpjLNucm4NTTNusKoxplvz7LFkcK6aMa2cHM6Ly9hdc2HzJ7Mis-QzY0uxrltzZTQsM2WyKbDgMKo0onEtM-GbsODzr0Kx4LKl8igYcqay5LHkMS4yKoDIMeUwp7Ko8qex53PlMi5z5YLz5nHqcqyx77HrsmE0IPMr8uIx7nQjsuA0rfKtcew0KHSvNC2yYzLjsiRy5DKm8iXyJnEjtKzyIHInsqYyKHJpMyoyKjSp8eTAyrDjQM00q3EjkBQ0rDLtsaKDNK0yrHFncu9y4PFl9K6zLLRvcuLxqDJjsmQyZJryZTJlsmYxILJm8mdbMmfyaHGkMmj0JXMgsmnxqbNmMmrya3Jr8mxybPJtcm3ybnJu8m9yb_KgcqDMcqFyofKicqLyo3JscqQYsKI04wB06TKlsifypkvVNOIZcqdUFrTnQHDtMuFyqjLtcqrcseBxZXIvtOFy4zCh8KoZsS1dMmVxYIsyY_JkcmTZdS6ZcmXyZnTuMmexorJoMuPyJPUosiS1IHGp8Ko0Y7NilBhaXLCqtS3xrtGxaJpbHnCvCdSdWJpxq1NxLVvIE_NkScszYbGknMtc8aKaWbCpca5yZFywqcjyKTVu2TOvc-YyIHCqsSsxZvUoWV4dNSlxI7DqtSoLMWH1KzPlcWRyJzUscqv0rXTp9CS06nKt2vQjce7yrLTqNCnzJ7MrcKT0IXDjMOpw4zDq9Sz06_UvdOy07TFgtWD07fJnNWGcsKvZca7xoogz6PWhs2PxorIk9WJwqRU1oV01Y3Mu8y9zL_NgdGBc82Gxp7RhM2MzL3Rh82RecqTw4zDvMidz4Jwy5zVkCDVktWUz4jCg8OMw5vPjMurQ1PCmcKay7FC06HUrs6_1pLLuseqy7zQksKtz7DRi8-jIM-lec-_0IHPq8-60JLCqMy6zZFy0YzQitK6w5rMoseqwpPMkM-gz6LMv9e01p5nzK3FhMOgxJrPrsSuyZDNiNezzZLYi8ytwpHDjMOqzKTMpsmlzKnMmsyr1p_QmsWEw57Jh9any43RitiI1ZDRkM2bN82xZc6pZsmvzqHNqWLKiDA0zqvRrM23Nc27zaEwzrfVgmPNtM2dybjGidSU2LDNndi5Mc6zN2XNp9GWzr0Ox4LLmMua15XPhETLn9mW1ofTlseUworDjQTHpcWAyLHHly3Xp8-W0p_Xqs-a16zYhsyK2IjYlXnYi9K6w67Pu9azY9mb0LLZsseyw6zYg9ac0JLCqcSJ2bfLm9m5zJpvYmrLn9eA0JrYmcOt2KfCgM69xL7Ll9eUy5xFbtqC15XPiHLZoNmix5rFhMK02abWjtKxxZEF06XLu9iR1aHGq9mw2brJhtib0JLQusyCzITaq8q4w6vZvcWy0JLCptqG2ohjdMyH2rnaidCh2bXaltm40LPYoNCY2KLQqdiZw6zajs69D9Kg1J_IodOKy6MDwo7am9Sodcqnx6DaosaKxL7ZqtaUy4HSuMq20rrDrdK82rXbn9OBy4TTg8SCyIjYp9OH1YzTisytwp_ClsW-xKQA15EBw7_bstilw7wCx4AAANuyw5_Xkdu8yJvbvtuy2I_DvADEjgPFmNihZ9uyw6HEjgTcic6-Ate327LDo9yK3IMG3IXMr8uV3JMK3JzDp9ye043cnMOo3JnLlQHcltaj3JHckwfcjNuG3I7Ymtu2xL3cr8-q27LDq9ysxL3cqdyN27LDrNy6xI4O3LvcsNuyw63dgNyTD9ycw67XkdyTDty1zIvCpmfGmnXShMKQwqbGuW5m0LDCgMKny6FyxYDEtcOLP8OZwpndpN2kwpo">
                  🛠 Build
                </a>
              </p>
            </div>
            <div className="relative aspect-16x9">
              <iframe
                className="absolute pin"
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/9LtBDy67Tho"
                frameBorder="0"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </Container>
      </section>






      <section className="my-8 py-20 bg-gray-800 text-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-16x9">
              <iframe
                className="absolute pin"
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/z11wj9OcA4U"
                frameBorder="0"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div>
              <h2 className="mt-4 lg:mt-0 text-4xl font-semibold">Distributed Ledger</h2>
              <p className="mt-4 text-xl">
                <ul>
                  <li>Once we have key pairs and we can sign messages, our messages can be objects with to, from, value, etc.</li>
                  <li>A ledger keeps track of everyone's balance and new transactions are added to it.</li>
                  <li>Everyone keeps a copy of the same ledger.</li>
                  <li>Need a 'nonce' to prevent replay attacks.</li>
                  <li>Problems with network topology and consensus...</li>
                </ul>
              </p>
              <p className="mt-4">
                <a className="btn btn-primary" href="https://sandbox.eth.build/wofCrGxhc3Rfbm9kZV9pZMOMwp_EgcSDxIVsaW5rxItkw40BDcKlxIfEiXPDnAAeworCosSMdsKkdHlwZcKrT2JqZWN0L0pTT07Co3Bvc8KSw40Fw4nDjQPDpMKkc2l6ZcKSw4zCjB7CpWbEgmdzwoHCqWNvbMSCcHNlZMODwqVvcsSJchjCpG3EiGUAwqbElHB1dHPCkcKDwqRuYW1lwqNvxK7Ep8SpxaXCpMSTxJXDjMKGwqdvxarFqcWrxa3Fr8WxZcKkanNvbsW3xKrCpsSEcsSUZ8KlxbtrxazDjMKHwqpwcm_EqnJ0aWXFkMKldmFsdWXColtdxKPEjG3GjcSrxK3Er8SxxLPEtcS3xLnEu8S9xK3Fg8WFxYfFicWLxY1hxY_FkcWTxZVhxZfFmcWbxZ3FnxXFosWkxabFqMWqxazFrsWwxbLFtMW2xKjEqgDFusSUa3TFv8aBx5LGhMeVxofGicaLxrDGj3TGkW7Gk8aVxax1xprGnMaexqDGosKBxqTGpsaow5koeyJ0byI6IsamaWNlIiwiZsacbciAyILEk8iFyIcixqXGp8iGOjEwfcatZHTGsMKxTmV0d8Wday9TdWJzY8aRYsWzxrjEvAVdw40CwrvGvMWGwoLCoTDDjMOwwqExLsWMxY5zwoDFnMWeZXLHm8WjxInHkG7GgseTxoXFssKpW2NoYW5uZWxdx6jGkMaSx5zElcOAx6B0yYzCkseUxobCp8Wyc3PHgsaHx5llx6nHq8etx53Gl8KJyaTFssKocsSwZWl2xZnGsMO_xpTJscKRw4zCisexxp3Jhce0c8KCwqfJksmUyZZswrBsxZlnyYUuyKBoLmJ1aWxkwqfJlsihyKPDmSBodMmhczovL8qeyKJya8qUdMqWypjKmmQ6NDQzODYvyJp8xrDCrcayxLDEssqQx6zKr8S4xLrIr3HIsmvItca-wr7HgMmAyYLHi8mFFMeOyYnFp8mLx6LJtMmtxbXGs8icyazHm8aVw4zCksmgyYzCkcKEyY7JrcuCZ8qvxrDCoMm_xJVzw4DGlGHIrGwAyoTHs8ahxqPIk8aowqDImnHGsMKsyr_GtFBhcsWYy4XGuQbIsQHCnsuLyLfIucKMyLzLjseCxZDFksWUxZbFmMWayYPFnxHLlMWly5bLpMuZxojGisaMyazJrsmcy6DCjcujx5LJo8unx5dqy6zLrsaWwpF5y5nCoMm9zLLLsMu3yobLuce2y7tlwoTCose-wqXJknVjy4rIim9twqXIg8iFx7fIlGTEnMaLyIUByJpnxrDCrlXGoGxzL0Z1bsSxacaLzIjEvAHDqsOQwrDMjsi4w4zDiMi8Qsi_zJTHhMyXx4fMmceKyYRyGsyeyYrJjMKTzLbGsMKoZs2gzaLHp8aVacyiY8ambMm9yZ1rdsuZwqdhZGTJt8moyZrHqsyox51tzKvFq8ytx6TNj8aoxrAAzLnCkWvNv8msyb7HrsOAzLvGn8u5woLLp8KnYsamyZTIhcKpzIVndcWybsWrwpDImnnKvUPGi8eqxZQvRMmXYXnNpcONBmDIssOpzavMkMi8Gs2xx4PMlseGx4hkw4LMm8mFDM27zKDLmMunwqVlybvOu86My6DCis6cyY3HpMW_bl_GoMWyzLjHrsqBw4zOrMqHwoHCqs-vxIrElF9tc82tyJpyz4DPgsacbM-Fz4fPiciuz4vDpMSZwqrPkMWJz5LPlMyVx4XMmMeJz5tyE8-ex5HGg8uZz6LPpMudxbjDv86Nw4zCjs-px6PJpcaLz65pz7DOqM6ke8-1zL3PuNCqz7rPrc-9z7_EpGR4zIDMgsSyzITMhsity4bPi2jIssKo0I7MkTHMk8-V0JPNtcWZz5rLkXIL0JnLl9Cby6fMo8enzKbJm8es0KLCic-pzp7GhsyvzLHHrsWIxYjDjc6n0KDMuc6rxpvKhc6tx7XOoMWHzYHHvsKjYsW1wqTNic2LzY1l0a3NkcSHzaHFpdGvb82EaM2GzYjIi82MyI_RuMy_0brNk2XNldC3e8q90Lsvy6nLhNCJBcKMxYDCmMuLxYjLjdCRy5DNuBnRkcyhy6fCpsuby4DOotCiwpHQpcumx6TCptKSaNGgybHLscSCy7TLttGpy7jRrMy_y73Qt8mrxbjKvsSuy4Av0LvNpVfEmVfSmcSZRcOMwpHSnNCWDtKgx5LClNGlxo7SpMSxzo3DgMuZzYJvxrDCtNGYZyxuzrnIrHIs05PInMaV05bRlNG105rTnNOe06DJhdOj0r7TlMaVxJkM0JzMv9OqzpjHrNOsbdOh06_LnNOVz6nTkMunzLfMptOkzqR005fHvs6Xya_Tlcyi06nRl9O4zZfTptO1x7jSu8aO05_Tu8mF05XQr8aiwoTCpcagdMqQwqbQu82ExZTFncKnIzVh1KnUqc6Bz4JTxr0Q0a3DmTV7CiAgx73HvzrUuNG3yIfUttS40bXIgNS80obUvtS3yJLUlNWCyJcKfcKJ0LfDjMKQxrDCr0Rpc3DEgnkvQmxvzYfGoc2lJcOMw5XSmUs904vRjg3TjtGTx6TUg8W4y5_HncOMw6jUm3PChMKrYtWb1Z1l1K_FhjLCq9WWYciFaMWUxZ_LrdSfypDLrcy_0oXIhGXImtKuyazCrdWT1ZXVly9XYXTJks-KAcOn1aHSmc2tPNWmzbgd1anFrNKqxobVrMeazo1ry7LLtMKg0qnUgs6i0afWqsmXwqDVsse21oXRuNaU1pZoyJp3zIBJ0ZLVmcWqx75uzaXDjMOFxYBB1pzDiDLWn8WfAdai0KbFstamZdCh06bRnNOR15POpMOMwojXl86xb8WUZcmU0afVssKD0a3Cp8Wp1bbVlGjUnmnUoMmtQteBxovUpM2gdBLImsywyazCqta-xoIvVGV4dNeEwonWm8WExYbNpgg-14zJhQLXj9eX1a7JntCl15fMp8eszLnClG3VsMOMw67Ts9Wy1bTVttWca8ah1bpl1bzVvtaA1oLJhcKvZc67yYUgdNe-dMqiyYXRuNa2wqTXvde_0a3WiciFyJrMpdK8z4HOu9CE17zQsnLWmHLDkMOE0YXQkMeB0YnNtM-YzbfFnwPNu9atz6vQqMagzYfPscmxwpJ2w4zDrdaxbMKlMzAwz73VssKCwqjElNitcsiTxJks0J3YqcudyIRrwqjRsnjHhcWdwqQjMtm4yJrTic2YzZrKms2dzZ_NocagzaTQic2nw5DDmNCOza4xzbDZidCS2YvNttCWG9aizb7WrsmszoHOg9qCxozLoMOszojOis-m1a_Drc6QzpLOlMaic9SKzpnFvMOu15bPodO2y57MucKQ15fOqdKw2aPPodG7zrXOt8652a1zzr3Qt9OZyazCrNe6xarXgMqk2oPLhsOMw4_Ish_XideL2ozSncWfBNiM2pTQoNO_xoDJocys2rDOpHfXnNGy15_Xoc6q16PRrcWD2KnNkda2wqbXr9uDbteyzrs21Y3EjHXVkcifyp_KrC9QyKfEk3Noz4oFbsONBBDQjsi72orYiXIc2pLLmcmQyovJlcmXyZnUj9SL1JLOsMmnyanKktqm0ZnLoMKHzpDXp9u21o3bksugwojZo8qKyZPcicqOypBkypJyyq7KsMqZypvKncigyqtryqHKo8qlyqfKqdysyKPcp8qX3KnKs8q1yrfKudm6wprWvda_26bXgs2lVtu8w4zbityCBduQ1avantiP25TJotuXz7LDjMO_25rXnsqQ253astK1zLzGotekzL_CqGPIj2sgxbLXq9et26XXsNuoxZPXswDZusKd3L_Xu92B24TGuQLCudu8w5Ldh9uM0JYG3YrWpd2Ma8mf3Y7bltuRxKrascuvwpHEmQHdlNuc26jbnt2Z0atz3ZzUlN2e3aDdotiy16zUod2w3ajGgM67ANusxI3Cm9uv3LTbstu016jbt8-KA8K727zCo9u_za_cgtu-yYjMn9Cac9qTx6Tch9ygyo3ci8W42JLUkced06fPq9yQyarck967xJXEmQDcl9u116ndvd6H3J7ciMqNyo_KkcqTypXct8qy3KvbsdyuyqLKpMWX3LLKqty135HKscqbyrTKtsq4L96dw4zSmMmswq_bsNyt27Pfh96l2oRa27zcvtiEZcyPyLrerN240Y4P3IXLp961yozcit-B1Izcj9qk34DcjNqna8OMw77fht6k3Jreg9Ciw7_fi962yZfCsdyj3KVh3Lbfnsqc35vKrNyv35jKpsqo4KCZyq3fndy436Dcu9-j1Y7CmcidU8e-csmqzZ7KmmUgRMeyzaXfrwRW1pzDgiTcggfZkN6A1arGhtKjx6HQn8aO05zXmcO-1rTRtOCgrsKie9WM1Y7CnOCgqOCgquCgrEbgoK7goLDgoLLQiQLCstu84KC237LFiOCguNyCCOCgvOChgc-q4KC_4KC934HOpN-E4KGHZuChieChi8iaZM2YU8SqY2nGpi9M34_ZgtqEw6DEmVTSmcOLQMKCwr4xw4ccAADIssOh3IIW1qLUgcekzYLQudSE07DTpcedzLXMrtqi3b17zpDKksmWxYTapeCij9O-y6DRpM-hzpXIoN29w4zDjNSA15fCrMyF4KCredO9y4DMucWIwobTidyGzrLEgtG8KCnOgM6C2oHNo96LyoDOh86w2rVl4KK34KK52pfgorzXmdqby6fCqmRpZuChqWN1bMSox6jUl9Oh16LejcqHwojdpNSh4KG13KTJhcKsybdxypnJt07SisOD4KOK4KOM4KOO4KOQxKgAwqngo6Dgo6JlVG_DgsKpzL9UxbjIv2_WlcKoxIngobFtxqZzAMKn27dvd0fEg8-axJNt16wUwojVjsyN1o7WkNW-1ZhU3pbQv8S7KFrThgMKBNyCCc271bLCh9StzrvYoSzVtdW32J_Vuca92KPEgtilypvJhdaE4KSVwqXgpJTXrdGtwrLWkM6YypjYrWQg4KOc3KXCqmbPgkbFscqaecK8J1LIp2ndoU3Gi28gT8mWJywgyalucy3FmMaRZtSk1Zty1KfOk-CloWTImnrInd-pyKPIpcinyKnIq-CklsivxJgBwobeq8i93IIK3bvJj8mR4KCQyZjfv9eV4KC9xLvOkN6_3JLgoITYk9Ghw4zCjcSZDcuZybbJuMm6ybzQrN2Rwo7goI_fvWzCseCgn-Cglty435TcreCgm9yx4KCe3qHgoKDKr9-S35_cut-i2brCn8q94KSR1pLWuNaX0IkGwpDNrdOGAcO51p7ft824EteP1qTXkdKm07LEmtmc1qzgpb3Lpd6CxaXWsNKy1rLWtOCjmta31pXJkt6dzovfp-Clp96i36zbuOCmqywo4KWy2ovLj9CWF9-63rTgpbjgppLeuOChg9SQ4KCA3r7goILgpoHeudOczo114KCJ3JndvXfgppHcoeCmlOCmneCmlt-T4KCf4Kaa35ngppzfleCnsOCmod-hyrnMucSgHsKWxIwBZwDaluCiu8aLwpZr4KiBaOCihMKWbWoAZwLeusKW2K0AbeCois65AGwB4KiRdm7gqI4Bw7_Clsii4KiYAuCooHlxAGTFptOkwpZ7yYZk4KifwpbFveCoqXbgqIrGmOCotHXgqJrTnOCoscKIdwB14Kik4Kixwol0AHjFpuCousqCdAF5AOCooOCmhXoA4Kin4KiR0KN6AcmG4KmNwpHgqKl74Ki1wpLgqYV84Ki1w4zgqYtkA-CpjcON4KmFZOCokOCoq9Ww4KiN1Y_gqLXDrOCpp9OJ4KiC4KK6zoRu4Kixw63gqJ3TieCosNiY4KmrwpHgqJDgqYfDvsOMwpkA36XgqLnUkOCoscO_w4zCmuCqgsKY4KmA34TDjMKc4KqCwpvgqoTJr8KW3ofDjMKd4KqQ4KqMAQzgqI1lAtOb1JDTutO84Kir4KaH4KmPxI7gooTCpmfGnHXFl8KQwqbFk27goalnwoDCp8m7zIbgorzDiz_DmcKZ4Kq74Kq7wpo">
                  🛠 Build
                </a>
              </p>
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
