import React, { useState, useEffect } from 'react';
import AngleShape from '../components/AngleShape';
import HomeHero from '../components/HomeHero';
import Layout from '../components/layout';
import SEO from '../components/seo';
import VideoSection from '../components/VideoSection';

const Index = () => {


  const [src, setSrc] = useState("")
/*  useEffect(()=>{
    setTimeout(()=>{
      setSrc("https://sandbox.eth.build/wofCrGxhc3Rfbm9kZV9pZMONAcK8xIHEg8SFbGlua8SLxI0CPcKlxIfEiXPCl8KKwqLEjMSOwrjCpHR5cGXCq0NyxKh0by9IxINowqNwb3PCksONAgjDjMKMwqRzaXplwpJ4HsKlZsSCZ3PCgMKlb3LEiXICwqRtxIhlAMKmxJVwdXRzwpHCg8KkbmFtZcKlxZnFm8SmxKhlwq3EhHLElWcsbnVtYmVywqTElMSWxLo9wqdvxZvFmsWcxZ7FoMWiZcKkaMSzxajEqcKmxazFrsKlxbhrxLjEujnEujrCqnByb8SpcnRpZcWLwonEosSNAcK6xohlwq9EaXNwxIJ5L0Jsb2NrxpzEtcS3xLkCw5BkxL_FgcWDRjzFh8WJxYvFjcWPxbUDxZPFlcWXxabGgMWfxaHFo8KgxqQAxbfElWvGkcaVxpfGmcabxp3ChMKrYsavxrHGnFPGuzLCq8aqYWNlaG9sxZDCoMKlxpt0bGXHrHZhbHVlw5lCMHhjNmE4ZmI3ZTBlYmIzOciAOWTHvTVmNDgwMTZiMWXHvWE2NciOOTXIizY2ZciFOWM0M2TIhzdmYzlhMGNhyKgzxKHEowHCsMakwq_ErMSuxLBLZXkgUGFpcsa0xpDGt8OMw5zGusWCwoLCoTDDikNTwpnCmsKhMULGv2HFisWMxY7FkATHhsSJx4huxb_EuMeLxoPCrVvGlmnHs3RlIGvIvl3GpMaKdMWtbmfHkcW5AjrJpMWjwqhnZW7FtWHJq8akw7_Jt2vDgMW8xb7Fm3PCk8m7xKrJqMmqyazJrnnJscaLybXGjceSxZ3EujvKjsaVdcecaWPJrci-ypXJs8aMxo5zw4DKjsKnyLFkcsadc8qlybRnypjElsqaAjHHlcaYxbXHmMWLyLTGocKuxqTCq03KgmgvUmFuZG9tyYXEuQEYyYjJisWDw4zDiMWGxYjJmMeByZvFtQHJnsWWxZjJocqLxoHHjMexyoTKhsS6PMqJdMmiwpHChMaCxaPCpcezx7XGhMSnxonFscWzxbXKtcaPwpHFusaNYcW0bMOLQ8Kpw60nEWHDscOByrrHl8acc8KDwqlhxZvLjMqCyqHDgsKjbcSVAMyXYXjMgsKrw4FtZ07DiADKv8SOwrzGpMKsScuhdMatxZvEr27LjjLDjMKCy5PCksuVMsmXyZnHgsWQx5DFlMmfy6DLrMqOx47LtWXKhcaOyojFvcuryovCks2DyoTLusq3PM2OzYXCrsu3xbRyLGJvx6lly4nNkMOAzIvKvMyNwoPLsce0x7bCqGPElMaxIMuwx67HsMKmQsyvb27CpWPFvW50BMymAcK7xqTCrcanxqnGqy9XyoJjxLTEtsaQBDhuzLbDjQMxxr7LmMy7y5tyBcueyaDLrMuuy6TNhMWpx5DGjsqby77MgMKgy6rOmcuvy6XNhQDNn86hZWzCoM2hxprMjcKBx61px6_FpM6EdM6Gxp_ItcKyyLjOgMekxqxBZMquyrDLjs6Ow7zDjMOmzo0BVFDMusuax4NyBs6XzYHLos2Tzp3Lp8q4zq_KvcKDx5vHncayZcegxYLHosekx6bHqMeqxbXHrM2uZcKnz4HPg3NzzZDClsKWxLoxxI7CsALEjsKyAADPswLGkgHCuADEjsK6z7vPvTrEpNCCyLbFl8qWZ8-9O8-20InCu9CFy6jMp9CJwq4Aw7_PvT3EjtCX0IjFq8qmybXFsMWyzZfCpmfGl3Vwc8KQwqbNtm5maWfCgMKndsW1xYDNs8OLP8OZwpnQu9C7wpo")
    },500)
  },[])*/



  return (
    <Layout>
      <SEO title="ETH.Build - Educational Sandbox For Web3" />
      <HomeHero />
      <VideoSection
        className="bg-gray-200"
        videoFirst
        videoId="QJ010l-pBpE"
        content={
          <>
            <h2 className="mb-4 text-4xl font-semibold">Hash Function</h2>
            <ul className="list-spaced mt-4 text-md md:text-lg">
              <li>Think of it like a fingerprint of any given input data.</li>
              <li>Input can be any size, output is always the same size (64 hex chars).</li>
              <li>Deterministic, you will always get the same hash for a specific input.</li>
              <li>One directional, given a hash it is impossible to guess the seed.</li>
            </ul>
            <p className="mt-6">
              <a
                className="btn btn-secondary"
                href="https://sandbox.eth.build/wofCrGxhc3Rfbm9kZV9pZCLEgcSDxIVsaW5rxItkFsKlxIfEiXPClMKKwqLEjCDCpHR5cGXCqklucHV0L1RleHTCo3Bvc8KSZcOMw7_CpHNpemXCksONASwywqVmxIJnc8KAwqVvcsSJcgDCpG3EiGUAwqbEk8SqdHPCkcKDwqRuYW1lwqDEosSkxZPCpMSSxJTDgMKnb8SrxZfFmcWbxZ3Fn8WhxKPEpcKmxIRyxJNnwqXFpmvFmRXCqnByb8SlcnRpZXPChMKrYmxvY2vGhVPEvGUywqtwxIJjZWhvbMWNwq9lbnRlciDGoMSwIGjGoWXCpcaEdGxlwqTErsSwwqV2YWx1xq7GoMSExJ7EjB_FosSlwqtDcsSkdG8vSMSDaMSyxLTEvwHDl8S4xLrGkcKSeB7FhMWGxYjFisWMxqECxZDFksWUxZbEq8WtxZzFnsapx550xr1lwq3FtcW3LG51bWLGocWlxJNrFcWpxavHn8Wax6HFn8KkaMeHx6bFtHTFtm7FuMW6xZkWxb7GgMaCxoTGhsKAxrpkIcemwq1EaXPGlWF5L1dhdGPHiMSzxLXDjQLCs8OMw7XHj8S9xL8DMTzHlGHFh8WJxYvFjQPHm8SJx53Eqce3woTHucWgx6bFj8W6xJjEgsevbMKgx7V0xazCkci3xa_IucWyxZPFuceyc8OAxblhyL_CoMiHxoHGociKc8KBxqppxqzGqciZyJtowojEn8SNyJDIksiUxILIl1TJmsatx4nEtTx4yKXEvsigJgTIq8itx5fFjQHIssWTyZPIicaFc8KHwqhmb8afxpDEvSzGicaLxo3Gj8aRxpPIlcaXxpnGm8ahwqDJmcmbwqXJqMqUxrPGtcenx4ZzaCBGdW5jxoTKgsKqyoHGn0bFnmlsecK8J1J1YmlrIE3Kgm8gT25lJywgc2Fucy1zxqFpZsKlY8aaxYvCpyNky47Lj8mLxJTEtcKWFSAAHwDHqMiAx6rHrMeuxqHClhbLmCEAxZRnxoB1cHPCkMKmy4luZmlnwoDCp3bGocS7yoLDiz_DmcKZy7vLu8Ka"
              >
                <span role="img" aria-label="build" className="-ml-2 mr-2 text-base">
                  🔧
                </span>
                Build with a Hash Function
              </a>
            </p>
          </>
        }
      />
      <AngleShape className="hidden md:block text-gray-200" />
      <VideoSection
        className="bg-white"
        videoId="9LtBDy67Tho"
        content={
          <>
            <h2 className="mb-4 text-4xl font-semibold">Key Pair</h2>
            <ul className="list-spaced mt-4 text-md md:text-lg">
              <li>Consists of a public key derived from a private key.</li>
              <li>Your address where you send value is derived from your public key.</li>
              <li>Can be used to sign a message and anyone can recover the signer's address.</li>
              <li>
                Anyone can generate an Ethereum account by just generating a random private key.
              </li>
            </ul>
            <p className="mt-6">
              <a
                className="btn btn-secondary"
                href="https://sandbox.eth.build/wofCrGxhc3Rfbm9kZV9pZMONAQ_EgcSDxIVsaW5rxItkw4zDrsKlxIfEiXPCnsKKwqLEjMOMw73CpHR5cGXCrElucHV0L0LEr3RvbsKjcG9zwpJ1xI4NwqRzaXplwpLDjMOIMsKlZsSCZ3PCgMKlb3LEiXIAwqRtxIhlAMKmxJXErnRzwpHCg8KkbmFtZcKgxKbEqGXDv8KkxJTElsOAwqdvxK_Fm8S6xZ_FocWjxaXEp8Spw7_CpcWra8Wdw4zDmsWzxaLFpMWmxKnCrm51bWJlcixib29sZWFuxbrElcW8w4DCqnByb8SpcnRpZXPCg8KldmFsdWXCqGPElGNrIMWjwqXGnnTGkMKmxLJ0xLTGk2PFr250AMShxIzEjgHGg2XCrURpc3DEgnkvV2F0Y2jEt8S5wpLDjQLCnsOMwrTEv8WBxYPHlBE8xYjFisWMxY7FkMaKBsWUxZbFmMWaxK_FncKExaDGgcW2xafFk8W7w4zDnsW6YcaJbMKgxa7FsMeqwpHHrMW0xoLFt8WXxpTElnPDgMe1x7fCoMaYxprGnMaexqDCgcawacayZcKlx4zHjmjCicSixI0BAseCwq_HhceHx4kvQWRkcsagc8eRxLrDjQUKw4zCqseZxYLHkwFWT8efYcWLxY3Fj8WRB8emxInHqMStx7zGgMW1x4LHscaVw4zDn8iKxpvGisiNc8KEwqtibG_GrMafU8eaMsKrx4hhY2Voxo_FkcKgyJDIksKnyKPIpcinxqPGpcanw5kqMHgzMmE5ZTkxOWNmODJkybY4ZDUwMjRlMcqCMGE1M2IwMzU1ybJlNGZixr7ImselyIHHhMeGyZnHisiVx4_IqceTAsKUxI7DoMiwx5sGSceexYnIt8ehyLrGigjIvcWXxZnJgMWcx73HrcmDyIHJhcSWw4zDo8iHZce4x7p0xbHKs8e_x6_EqQDIg8aWyrvHuMmJyIzGn3PIj8axxpDIlMeNx4_Kk8SOyLzIgcKuQ3LEqMS0L1Jlxrl2xorKnceUCMeUw7jKo8KCwqEww4pDITMzwqExLsi2yLjHosWRCcquyL_FscKSyYJlwqlbxaNzc8i3ZV3HgsKmxIRyxJVnxarJhsOpy73Cq1vFgGfFoXR1yKbMhsiBzIh0zIpuzIzHssOoyr7LgMu9wqdhyKTIpsyCzIfMicyLy4bEusOMw6bDjMOny4rJi8uMwoLCp8yBzINnZcK9dGhlIMaJYXIgx4YgxIRpxqx5IHfIkWggyZ1uZXnCqcyTzJXMl2XDmcKEyaw4NzVkMjBlYsqAZsuvNTlmyKTNnDLNp8uvMjM4NDk5NGEyzbM3NzEyODbNt2Mwzac2YjkwMTPEic27ZDFiZsqKMc2xzok0zoY3YTfNt2TKiMqQNsm4M82oxok4Nc6Nzb1jNzY5OMm_Y86AMmY3ZGE2zafJvc2izbTOpcm5MWE4zozLlAEDx4LCq8uZy5tvL8mVzJTLowHCrsqhy6jLqsusOmZmy7FWy7TKqsejcgTLucqwxbHClMu9wqxbxplpxqR0ZWvNksyZxafMm8ydzJ_JhsOgy73Cqs-fxpp2xIzGis-nxKnPqcyLzI3FrMu9y7_MuMyEz7Vlz7fMns-5a8OMw6HLvceZzJTHgsWpxbvFrcWvyr_Hqs-cyrRlzKXMp8inzKrMnMysxbvIhcykz73MutCXz6rMrcOAz7vNlceNzZfQn9CZxpXMrsOjw4zDqMu9zIhpzJRlZNCK0KHMs8ady4zChcy3yKfMhMy8zL7NgMaRzYPNhc2HzYnNi82NzY_Etc2SyIrPoceNZUvNksOZQsmszbo3zq5jOM2iybjNvmZhzobNocqJzqg5ya9izqdjzbbNsGXOp829N2LOi86uzbtmMTY2zKbOpjLNucm4NTTNusKoxplvz7LFkcK6aMa2cHM6Ly9hdc2HzJ7Mis-QzY0uxrltzZTQsM2WyKbDgMKo0onEtM-GbsODzr0Kx4LKl8igYcqay5LHkMS4yKoDIMeUwp7Ko8qex53PlMi5z5YLz5nHqcqyx77HrsmE0IPMr8uIx7nQjsuA0rfKtcew0KHSvNC2yYzLjsiRy5DKm8iXyJnEjtKzyIHInsqYyKHJpMyoyKjSp8eTAyrDjQM00q3EjkBQ0rDLtsaKDNK0yrHFncu9y4PFl9K6zLLRvcuLxqDJjsmQyZJryZTJlsmYxILJm8mdbMmfyaHGkMmj0JXMgsmnxqbNmMmrya3Jr8mxybPJtcm3ybnJu8m9yb_KgcqDMcqFyofKicqLyo3JscqQYsKI04wB06TKlsifypkvVNOIZcqdUFrTnQHDtMuFyqjLtcqrcseBxZXIvtOFy4zCh8KoZsS1dMmVxYIsyY_JkcmTZdS6ZcmXyZnTuMmexorJoMuPyJPUosiS1IHGp8Ko0Y7NilBhaXLCqtS3xrtGxaJpbHnCvCdSdWJpxq1NxLVvIE_NkScszYbGknMtc8aKaWbCpca5yZFywqcjyKTVu2TOvc-YyIHCqsSsxZvUoWV4dNSlxI7DqtSoLMWH1KzPlcWRyJzUscqv0rXTp9CS06nKt2vQjce7yrLTqNCnzJ7MrcKT0IXDjMOpw4zDq9Sz06_UvdOy07TFgtWD07fJnNWGcsKvZca7xoogz6PWhs2PxorIk9WJwqRU1oV01Y3Mu8y9zL_NgdGBc82Gxp7RhM2MzL3Rh82RecqTw4zDvMidz4Jwy5zVkCDVktWUz4jCg8OMw5vPjMurQ1PCmcKay7FC06HUrs6_1pLLuseqy7zQksKtz7DRi8-jIM-lec-_0IHPq8-60JLCqMy6zZFy0YzQitK6w5rMoseqwpPMkM-gz6LMv9e01p5nzK3FhMOgxJrPrsSuyZDNiNezzZLYi8ytwpHDjMOqzKTMpsmlzKnMmsyr1p_QmsWEw57Jh9any43RitiI1ZDRkM2bN82xZc6pZsmvzqHNqWLKiDA0zqvRrM23Nc27zaEwzrfVgmPNtM2dybjGidSU2LDNndi5Mc6zN2XNp9GWzr0Ox4LLmMua15XPhETLn9mW1ofTlseUworDjQTHpcWAyLHHly3Xp8-W0p_Xqs-a16zYhsyK2IjYlXnYi9K6w67Pu9azY9mb0LLZsseyw6zYg9ac0JLCqcSJ2bfLm9m5zJpvYmrLn9eA0JrYmcOt2KfCgM69xL7Ll9eUy5xFbtqC15XPiHLZoNmix5rFhMK02abWjtKxxZEF06XLu9iR1aHGq9mw2brJhtib0JLQusyCzITaq8q4w6vZvcWy0JLCptqG2ohjdMyH2rnaidCh2bXaltm40LPYoNCY2KLQqdiZw6zajs69D9Kg1J_IodOKy6MDwo7am9Sodcqnx6DaosaKxL7ZqtaUy4HSuMq20rrDrdK82rXbn9OBy4TTg8SCyIjYp9OH1YzTisytwp_ClsW-xKQA15EBw7_bstilw7wCx4AAANuyw5_Xkdu8yJvbvtuy2I_DvADEjgPFmNihZ9uyw6HEjgTcic6-Ate327LDo9yK3IMG3IXMr8uV3JMK3JzDp9ye043cnMOo3JnLlQHcltaj3JHckwfcjNuG3I7Ymtu2xL3cr8-q27LDq9ysxL3cqdyN27LDrNy6xI4O3LvcsNuyw63dgNyTD9ycw67XkdyTDty1zIvCpmfGmnXShMKQwqbGuW5m0LDCgMKny6FyxYDEtcOLP8OZwpndpN2kwpo"
              >
                <span role="img" aria-label="build" className="-ml-1 mr-2 text-base">
                  🔧
                </span>
                Build with a Key Pair
              </a>
            </p>
          </>
        }
      />

      <VideoSection
        graySection
        className="bg-gray-200"
        videoFirst
        videoId="mhwSGYRmkEU"
        content={
          <>
            <h2 className="mb-4 text-4xl font-semibold"><span style={{opacity:0.33}}>Look Ahead:</span> Transactions</h2>
            <ul className="list-spaced mt-4 text-md md:text-lg">
              <li>Users can sign messages that go on-chain to send and receive value.</li>
              <li>No decimals! Amounts are integers, in Wei. 1 ETH is 10^18 Wei.</li>
              <li>You can generate accounts by just randomly generating private keys.</li>
            </ul>
            <p className="mt-6">
              <a
                className="btn btn-secondary"
                href="https://sandbox.eth.build/wofCrGxhc3Rfbm9kZV9pZMONASrEgcSDxIVsaW5rxIvEjQEJwqXEh8SJc8OcABXCisKixIzEjhLCpHR5cGXCq0NyxKp0by9IxINowqNwb3PCksSOw6rDjMK-wqRzaXplwpJ4HsKlZsSCZ3PCgMKlb3LEiXIIwqRtxIhlAMKmxJVwdXRzwpHCg8KkbmFtZcKlxZrFnMSoxKplwq3EhHLElWcsbnVtYmVywqTElMSWw4zDscKnb8WcxZvFncWfxaHFo2XCpGjEtcWpxKvCpsWtxa_CpcW5a8S6w4zDsMOMw7LCqnByb8SrcnRpZcWMxKPEpQEWxonFq0Rpc3DEgnkvV2F0Y8S2xLjEusONAsKAUMWAxYLFhMONAzE8xYjFisWMxY7FkMW2CsWUxZbFmMWnxoHChMaDxaTCoMakAMW4xJVrxpTGjmHFtWzCoMW9xb_FnMWex4vFoseNx4_GjseSc8OAx5XHl8KgxpbGmMaaxpzGnsKBwqXGnHRsxaXGrcavaMKJxKTEmRnGpMKvxqbGqMaqL0FkZHLGnnPEt8S5xLsEEMOMw4jGuMWDxLsBQFDGv2HFi8WNxY_FkQzHhsSJx4huxoDFnsWgx59lx47EqcSrx5DGj8OMw7XHqcaZxbbHrHPChMKrYmxvY2vGnVPGuTLCq8apYWNlaG9sxZHCoMevacexZcKnyIHIg8iFwqV2YWx1ZcOZKjB4MzhiNDhhNmE4ZTdiNmMxZjkwNjQ1NTNjNGVhMmNjyawyZDNkMjlmY8agxJkdxqTCrEnInsWcL0LFnMSxbsiHxrMDcMa0TsiOxYTIjDLIlMiWx4LFkceQxZXInMWZyoTGgcihxoTIpMWqw7_HkcSWw4DHmnTIn8KSyp_HoMilZcO_x6LElsWew4zDusqryKPGpMKuxbLFtMW2LGJvyYHJsG7KsMaQw4DIq8erxp1zwoPJjcmPyZHCqGPElMi1IMWkyYXJh8Kmyod0yonCpWPFvm50AMe3xqEexqTCqse9yLzGq1FSyovEuwbCmlrKkciQwpDEjsKQypXHgciYxbYOyJvFl8qcyJ_CkceeyqDHj8qkx5PDu8emZWzJk8mVyZfJmcmbyZ3Jn8mhyaPJpcmnyanJq8mtya_JscmzybXJt8m5ybtjy4XIrcuHwoLCpnFyyLjFg8SOGMeiZ2h0w4LJvsSOGsqBV2ViM8qGyY9hbsi-y6nDjQRgxI7CpMqRwoLCoTDDjMOSwqExQsuzyJfHg3INy7jIncifwpPKtcKnYciCyIRzc8akxot0xa5uZ8yAw4zDtsq1wqxbyLLItGvGsGHElV3NmMaMzZzNnsO5yrXLmWhlyLXGpMqjyKjDusqny7vLvcWkwqdizLXMt8aFyq3Cpsq5xbVyy4LKssO8zINswq81McmpN8mpMM6SzpPOksycxpvMns2SzZTIhcyGyZbJmMmayZzJnsmgyaLJpMmmyajJqsmsya7JsMmyybQzybbJuMm6ybzCqMaXb3bEjMW2wrfMqcqoczovL2TNqC7EuGEubmV0d8WPa8ysAR_Kt1XGnGxzL0bGmG0gzLBpzLkFWsqPzL_NgcOMwqDNhRrNiMqXxbbEp8qay7nHicigx4zFpceJzZjOhMW2zZ7DvM25x5zGgsiiwqbFvsqoxajOgs-wzobGj8qyw73OlsiuwoHCqMSJY2ltyY9zEs-LIMe7y6THv0TJgcSCcsiGxrLLqkDGtDDLrsS-N8-ky7VyFM2Ny7rPtcq1yqHIps2ew73PtMqez6zQp2XOg8WzzoXOh8uEzrPLhsaeyLDNpMi1yLfIuci7xILIvsmAyYLFtsKvZcucxbYgdGV4dCDNssiEy5PHssKn0JJs0JRzy4rJkGXDiz9Aw6zChMKfwqLDjT7PixPHu8SuxLDEsktleSBQzahyzLkCw67Ng8-eMMOKQ1PCmcKazYXNh8WJyJXLtM2KCdCjz6rKqs-swq1bxpdpyY7RiCBr0anNqs6CzazNnciow7DKtcKoZ9GExbbGrs6ByqLMgMqmz7nNj8q1yLvFrtKJZdKL0anNq82axo3Pv8KRw4zDvsq1xpZ1yLJpY9KledKnzZtn0LPNkc2TyYvNltK20qnHo8KTyKnNn8OMw7vQgsuHwoHHqdKI0pnRqHnDmULJlThmODczN8i-MDhjNjdhyasxNzdmyaBlNmIyZtOWNDDJu8mYMDXJuTTOrTk205JmMTIw06fJmmNk07TOrTjTk2bPiyPKgcqDxoAvTtCxxbbMuQPCtsa7wpjQnMK-ypTRvMqW0KAB0oHKnc-ryKLQrsinx5LSnceb0KzUm8-v1IrPvsejwpHEjgHThtC30L3Ivci_yYHFkcKhI9GP0K_Uicq6zobJjtGXwqMwLjHIsciz0LplzKNlMs-LJMqBz49pz5EvVG_Pl2XPmdCXzLrCsNSP0bPDjMKqz6LQn82KB9SYy7vNsM-uz7zUpMyA1KjQq9SaxoTPuNSg1KPUts6H1KcBAtSqc9CE0IbQiNCK0IzHuMSOIsui1IbKhVTRiXTUjMKOxrvGo8WByI_EjsOUNdWZxZEC1ZzQpdCty7_Gj9Sfz7rUocu-0o_SqM2c1avDjMO_1a_QuNS_yLbVgdC8yLzQv9Sv0YLRhNGIctGH1b3RjMW2xaXHsMeywqTVvNGK0ZbJkc6cMzRhQTNGMzU5QTlENjE0MjPJpzHOjTI2Nta6Q0XToM6tyaTTkUTWuc-LJdSFyp3KhsqIb8qK1ZEEw5jMuhDQnMOI1JPHgM2JxZED1ovWksqs0pvWj9Wk0oPUosqtyq_SqsSOA9CmyrfPvcq8yr7Hssy20LPVr8uJ1LjLjMuO0rJry5HWq8mGx7LLldeZy4HLmnXLnADPiyfGpMKt0JBhxqvHtMawzLkHRMSOw6DLrsa7JMOMw5XWiMW2D9eox53Wjcqt1J3ElsSOBc6Kx5nSns-1zbvKttio0LPYrdWvx67WrMezxq7GsM-LJtiR2JPYldi6xrHIiMONB2zGtMO42J0Kaca-1JTRvsWR16DPqM2O2LDYp8Wq2KlrxI4E2K3VpMu82ZTIpti0xILHp9i21LPCpdiWaM-L0KLKrcKq1bp01YvVvcupZMOMwrTYnQEs16PRvdelxbYE2KXPttaT2ZXSnNmb17XWlNK31pfDsdaa1L7NpdC7xYPIutag1K7RgXLRg9GF1qbRiNGK1qnRjti41q7VvdaxZcKsyr13x6xmxa7Ov3nPixzVudeX1q_VvtWRAsK8xI7Dgtmz2bXYonIF2bvagdm-16zYr9ep2LLFqs2Z2oPPv8KSw4zDucSOBtqG0LnWndWC2ovQvtqNxZHakNal1qfalNGN2IXJh9qY1rDXv2XOuMuXcM67zr3Ov2nPgW_Pg8-Fz4fPic-LIcakwrDMsMyy1YtyzLZzyL3GnNeazLkGBMa0w5rVlcOwzYXDjMK62rEL2KXCmc2hzaPWnM2nzanSvs2t1o_bv9KH0qPSjHnSjtq70pDNntKtz6zCpFvEsdyMxorcjsiow7_NkVvbldyVxavXt9yXx5LEjgLKtcKmW86_dGHcndq8xa_SnM2wW2fEg9ydwq3cn9aV0pHUntKu3K_Eg1DFrsi-3LLctNK33K3PrMKnW8SHzoDcvtSkLNygyqXKtca4Z27NtdWiAQPVpMKU0qDNmtus265p15rNmG9ias2zdNWr2KvcpMWB3Y5lZNyE0rjavtmYxI4H3aRp3abdqNew0rnckcaHc2jdqde80LXMncaewojamsOLQ3Y0V8KFw5jCoADEnNeayL7DgMKk3KdhwqLJlcKj3LBzw41Zw5jSldy63Lxlw47DtGEJAM6yxpjOtcWRw5k9zrnbmc68L9CJxJXboS7ElWZ126versSydsyzZda7ya7JqWPOrdO6N9WD07MzZjVmzpLXismY1YPTktOJ0qPTjNOO05DTktOU05Zl05jTmtOc057ToNOi3r7TpdOn06nTq9OSYtOu07DTstO005HTt9O5ZtO7071m07_UgcKixLHWs9a11rfWuda71r3Wv9eB14PXhdeH14nXi9eN05TJsjHXkdeT1bYBKMyvzLHMs1PRhGQgVHjbscK4xrvDstGz0bUp0bjRutqxEdilzZDPrMaL3bDPhd2y3I3ctd2R3a7PrM2i24Xcgm7cqt2K2ZcBBt2Mc-Cgid2Qxo_EjgnXrd2M3bbduNqC0r_KsdWsCM2RyITIvmlwdN2c3Z7doN26x6rdvHPCgs6Z0rxzwqDeoc60zrZy25fOut6p25zbntugz4bPiHLPiuCggirXltSHy5bKic-aw6bMusKI16HZttSVzYoG2rTZncqu2b_auMS62rXEq9ex1KbgoLPgobNlyrjdiMq9yr_Xu8-_0LTgoYjOl8ae177Li2XLjcuP2IPLkti42IjLl9eay5nLm8udz4sp2L7Gp8ulxqzZgdiYdsa7wo7Ynca82YzXpM-lctGj2ZHQpMeK4KGu2ZbEjgjZmuChsdmc16_Zldmfx5bMhMeo3bvgooLVsNmj2aXOh8SgFcKWxpLEpgDEjhPFmNKQ4KK8w7HEjhTgor8BEgDFrNy1xbHUpOCivMOy4KK-xI4WAADgorzDteCjgALEjhngo5XgorzDtuCjmcyt4KOC3LXgorzbgQEc4KOIGgHcq82c4KK8w7rEjh3go6gCw7_gorzDu-CjoAEe4KOdw4zDvOCjocSOH8WYz73gorzDveCjveCjiCDgo7nDvuCjgOCjiCHgo6rgo4PWmNW34KSJAuCjq2fCltSoxI4j4KOIJOCjv-Cjj9yixI7gpJjEjiED3LPdiOCjg9ezxI4l4KSJCOCjs92sAeCkisSOJuCjndir4KSe4KOIJ-Ckr-CgrMSO4KOnxI4o4KSL4KOj3a3gpJ4B4KS44KOi0rfgpJMBCOCkv8SOKeCktAnEjirgo4go4KOywqZnxph125nCkMKmy5puZt2wwoDCp3bFtsWB15rRmcOZwpngpaLgpaLCmg"
              >
                <span role="img" aria-label="build" className="-ml-1 mr-2 text-base">
                  🔧
                </span>
                Build
              </a>
            </p>
          </>
        }
      />

      <VideoSection
        className="bg-white"
        videoFirst
        videoId="LGEBqz1uG1U"
        content={
          <>
            <h2 className="mb-4 text-4xl font-semibold"><span style={{opacity:0.33}}>Side Quest:</span> Encryption</h2>

            <ul className="list-spaced mt-4 text-md md:text-lg">
              <li>Asymmetric encryption with Ethereum key pairs.</li>
              <li>A small amount of data can be encrypted with a public key.</li>
              <li>The private key is used to decrypt the data.</li>
              <li>Not the best way to encrypt data!</li>
            </ul>

            <p className="mt-6">
              <a
                className="btn btn-secondary"
                href="https://sandbox.eth.build/wofCrGxhc3Rfbm9kZV9pZFfEgcSDxIVsaW5rxItkSMKlxIfEiXPDnAAQworCosSMP8KkdHlwZcKqSW5wdXQvVGV4dMKjcG9zwpI8eMKkc2l6ZcKSw40BLDLCpWbEgmdzwoDCpW9yxIlyAMKkbcSIZQDCpsSTxKx0c8KRwoPCpG5hbWXCoMSkxKbFlMKkxJLElMOAwqdvxK3FmMWaxZzFnsWgxaLEpcSnwqbEhHLEk2fCpcWna8WaMcKqcHJvxKdydGllc8KEwqtibG9ja8aGU8S9ZTLCq3DEgmNlaG9sxY7Cr2VudGVyIMahxLIgaMaiZcKlxoV0bGXCpMSwxLLCpXZhbHXGqsa1acaYxKDEjD7Fo8SnwqtDcsSmdG8vSMSDaMS0xLbFgAHCmsOMwoLEu8aSwpJ4HsWFxYfFicWLxY3GogfFkcWTxZXFl8Stxa7FncWfxqrHoXTGv2XCrcW2xbgsbnVtYsaixabEk2sxxarFrMeixZvHpMWgwqRox4nHqcW1dMW3bsW5xbvFmjPFv8aBxoPGhcaHwoDCicShZETHqcKvRGlzxpZheS9BZGRyxodzx4vEt8ONA1xQx5LEvseNVFDHl2HFiMWKxYzFjg7HnsSJx6DEq8e6xa_HpcWyxaTFkMW7NciKxoLGosiNxojGisaMxo7GkMaSxpTImcaYxprGnMaiwqDGq2nGrWXCp8idyJ_IocazxrXGt8OZKjB4MzI4ODA5YmM4OTRmOcmiMDc0MTdkMmRhZDZiN2M5OThjMWFmybZjNsa8ZE3HqcKtyJbImMSCyJtXYXRjx4rEtcikBFbDjMOcyKnEv8WBXTzIrsiwx5rFjg_ItcWUxZbIuMWZwpHChMe8xaHHqci-x7U-xbphx7JswqDHuHTFrcqqyqzIvMSnAMW6x7Vzw4DKssq0wqDJgciMxoZzwoHJksmUwqXKkMqSaMqHRsepwq7HgseEx4ZEZWPHg3DEs8qVxYDIpsOMw6bKm8KSw4zCtC3KoMeZyLLGog3Kpci3xa3Cksi6xaDGlcW3xrTGoSBrZXnIgcesyIXHtMSUP8uxZcKpxp_LmseEZWTLu8iDxbjLvmtIyrfKucyBwqnEicyFy5zMh8iBb2Jqy5l0yr_ElMWaPsuGyYPLiMKAyodPx6nEqcqoxK_Escudx4wow40CHMujxYHFg8uoyLHHm3IBy63Kp8yQyrvKrsyMxanFq8q4yLnMvcWzZciCyITIhsuAwpFAzKHGhMuIxonGi8aNxo9lxpHEvsmLxpfGmcabxp3Gn8ahxqPGpXTGp8apy4vGrsawzKvJmsa2ZcKudGjIlyDNrcSsxovGusqHyKjNhcKsxKrFmC9CxK3HhW7Io8eUzK_CgMujw4zDiMWExYbIr8upzLcCzLrHp8ejxbDKrc2Fw7_Mv8yPx6LLsM2ExaTDv8ydxbzCkUHMgcq8zanHr8exxqIsYm_Gm2Vhbs6Zy4HNjcmEwoPNp8a3wqhjxJLGjiDFoM2jzYbNunTNvMKlY8WrxqAAyodRx6nCsU5ldHfFjGsvU3Vic8uaaceyzb5Qw4zDusqbwoLCoTDFgRjCoTEuzLXKosaiA86LyqjOjcelwqlbypPOqG5lbF3Mic2IzpLNgcuvzIHCp8Wgc3PIr8avzYXNh8W4zqrCkUPMgcKoyKDGmGl2zJbOkM6qw4DOrMuIwoLCp8-qbs-sbMKuaXBmcy7PhmguYnVpxpzCp8-sz4fPicOZxqfOunBzOi8v0KLPiHJr0JnNq9Cc0J7GnDo0NDM4Ni_IkMSMTsiUz4XQo9CvL1DPjcSSc8qUx4zFgcKQzK_Ik8S8xL7PmDDDjMOwz51Cz6DLqnIIz6TFrcKTzJHPqce_0JHPrc-vz7zLvGfMv8-1z7fPuWfPu8Wkz73LvcW7QM-1zbDRh2jHqc6RxbtB0IzGh9CO0JDQktCU0JbQmNCa0LPQn2TQoc-G0K5r0KVo0KfQqdCr0K3PidCx0JvQndKE0LbQuNC6L8qHVsepzbbMqc65zbzNvsyvw5DMr1jOgs6E0ZfMtwTRm82Dzo7OntG3x7XNgMe5xZnOldKs0bbPv0XOncuTzqDHsnLOo86lxq7OqNCK0bpzzq7GtM2ozrHOs2vOtcaqxqzGrsKm0p5vzqnOvXXOv9C9ZFTRgNKHz4nRhNGGyJfRicikA8OyzK_Qv9GPZdGR0ZPRldKnxY4M0qrFmdGdyqzPqNG90aLPsMyLxbvDgNGoyKHPutOz0a_HtUbRstOc0YjRtsyMRdOC0bzRoNG-0JXQl9KR0oPQoNKP0K_SitKM0KrQrNOZ0K_UitKT0LXQt9C50LvKh0vMp823xK3MqsSy0qDFgsilFsyyxYLOhceYzLbFjgXTrM-mxbHMvtO1zpPKqdK40aTMisiFz78704LNkMmHzZPNlcaTxpXNmMmOzZvGoMaixqTMq82hyKDOt82lxrLThca3wr3Nq82tza_GgWLKs2x5IHPLmcigdD8gw7DCn8KUwqXKh1PUncypxrHMrMikAcK4xYHSqdOkx41jQ9OpxqIJ1K3Hu9K0zYXKr8SUQ9Sy1K7Oj9Gt0aXPv0jUusmGzZLJic2W1YBhyY3Nmsaixp7VhM2e1YfGqNWJ04zGr9Wnzq9lw5nDpMmfODTJpzczYWE2NTBiyaZkY2LJpGY4MTVlNTgyZmJkMDEwMzlmN8yHyaYxZNalybI0xpPWscm3YjM3ZjRjNTExyb43MjnXj8qAM2MzMDBlZTlhM2YwOGQzMWPWoDA1NmE1NDAyYsms16bWsWPWvNeXOMms1ZTJtDY0YcmyZde7yabJo9eYZsaY1500yJ45xphlNzHQusqD15jWuTZj165hyaLJpNeO2JXMh2U4YTnXqtaJMcmiybbWpDll1rQ2MzTWsDI2MjXWtdeTybA0N8qCYdaeZtim15xk17fXv9awyrPYqsqHQsiUy5XLnMeGS8u5IFBhaXLSoAJEbs-Xz5nDikNTwpnCmtOozobKodGYC9St0rPHpcKtW8aA0IbKkWXLt8u50aPVv9S20abFuzPQgtGrz6xy2aXUgdSxz7PHotOuzo7Ls9mky7bLuMu61LXNiM-_zIDKrMW_05xj2afZvtmq2oDIh8KQz7XJt8mYz7jTus2JzJ7CkcmAxoDJgs2OxofCgciK2btl2Yd5w5lCyZ_YideuNdiMMdeD1qXWuded15I4Ndar2IvYr8m3NzbXmdeM2LvWumXQuTLJq2bYndilyoDXl9imONewM2LXqNa2yodFy5PZhMeFL0VuzJTVqMWAAsKozK_Dms6Cy6bVsnIK2Z7MgdqEzbHahtm92pHRp8qsz7bTuNGr26PFuzvVvNmfxaDCpsyYzJpjx6jPvNuwzJvQisyRzITLm8ahzIjZv8--yIfCkUbTgsKAwojIkVfKisqMyJnIm1TJk8auzb5uw5DCptSmw7TKvtmazojFjgbLrdOCwofCqGbTkHTUvizWhMmIzZTJitaI1orJj3LJkdaTwqXci8uM1Y3Nqca5xpjbj9uRzIfCqtydxqBGxZ_Qn3nCvCdSz41p04lN05BvIE_PrCcs1ZjOqHMt1ZnFt2bOvMabxYzCpyPInt2XZM6qwpzCljE_AD4Ax6vZq8eux7DSu8KWM92gQsWV0aXCljVC2Y8AAMKWO0sARQHRrmfClj5GAE3dscKWP92q3b3ducKWQE8ATt243axBUN6JAsO_wpZDUQBT3oBFVgBU3pDClkbdt1Tei9mrwpZI3pZG3qHNiMKmZ8aBddCowpDCps69bmZpZ8KAwqfQh3LEvNOQw4s_w5nCmd6-3r7Cmg"
              >
                <span role="img" aria-label="build" className="-ml-1 mr-2 text-base">
                  🔧
                </span>
                Build
              </a>
            </p>
          </>
        }
      />

      <VideoSection
        graySection
        videoId="z11wj9OcA4U"
        content={
          <>
            <h2 className="mb-4 text-4xl font-semibold">Distributed Ledger</h2>

            <ul className="list-spaced mt-4 text-md md:text-lg">
              <li>
                Once we have key pairs and we can sign messages, our messages can be objects with
                to, from, value, etc.
              </li>
              <li>
                A ledger keeps track of everyone's balance and new transactions are added to it.
              </li>
              <li>Everyone keeps a copy of the same ledger.</li>
              <li>Need a 'nonce' to prevent replay attacks.</li>
              <li>Problems with network topology and consensus...</li>
            </ul>

            <p className="mt-6">
              <a
                className="btn btn-secondary"
                href="https://sandbox.eth.build/wofCrGxhc3Rfbm9kZV9pZMOMwp_EgcSDxIVsaW5rxItkw40BDcKlxIfEiXPDnAAeworCosSMdsKkdHlwZcKrT2JqZWN0L0pTT07Co3Bvc8KSw40Fw4nDjQPDpMKkc2l6ZcKSw4zCjB7CpWbEgmdzwoHCqWNvbMSCcHNlZMODwqVvcsSJchjCpG3EiGUAwqbElHB1dHPCkcKDwqRuYW1lwqNvxK7Ep8SpxaXCpMSTxJXDjMKGwqdvxarFqcWrxa3Fr8WxZcKkanNvbsW3xKrCpsSEcsSUZ8KlxbtrxazDjMKHwqpwcm_EqnJ0aWXFkMKldmFsdWXColtdxKPEjG3GjcSrxK3Er8SxxLPEtcS3xLnEu8S9xK3Fg8WFxYfFicWLxY1hxY_FkcWTxZVhxZfFmcWbxZ3FnxXFosWkxabFqMWqxazFrsWwxbLFtMW2xKjEqgDFusSUa3TFv8aBx5LGhMeVxofGicaLxrDGj3TGkW7Gk8aVxax1xprGnMaexqDGosKBxqTGpsaow5koeyJ0byI6IsamaWNlIiwiZsacbciAyILEk8iFyIcixqXGp8iGOjEwfcatZHTGsMKxTmV0d8Wday9TdWJzY8aRYsWzxrjEvAVdw40CwrvGvMWGwoLCoTDDjMOwwqExLsWMxY5zwoDFnMWeZXLHm8WjxInHkG7GgseTxoXFssKpW2NoYW5uZWxdx6jGkMaSx5zElcOAx6B0yYzCkseUxobCp8Wyc3PHgsaHx5llx6nHq8etx53Gl8KJyaTFssKocsSwZWl2xZnGsMO_xpTJscKRw4zCisexxp3Jhce0c8KCwqfJksmUyZZswrBsxZlnyYUuyKBoLmJ1aWxkwqfJlsihyKPDmSBodMmhczovL8qeyKJya8qUdMqWypjKmmQ6NDQzODYvyJp8xrDCrcayxLDEssqQx6zKr8S4xLrIr3HIsmvItca-wr7HgMmAyYLHi8mFFMeOyYnFp8mLx6LJtMmtxbXGs8icyazHm8aVw4zCksmgyYzCkcKEyY7JrcuCZ8qvxrDCoMm_xJVzw4DGlGHIrGwAyoTHs8ahxqPIk8aowqDImnHGsMKsyr_GtFBhcsWYy4XGuQbIsQHCnsuLyLfIucKMyLzLjseCxZDFksWUxZbFmMWayYPFnxHLlMWly5bLpMuZxojGisaMyazJrsmcy6DCjcujx5LJo8unx5dqy6zLrsaWwpF5y5nCoMm9zLLLsMu3yobLuce2y7tlwoTCose-wqXJknVjy4rIim9twqXIg8iFx7fIlGTEnMaLyIUByJpnxrDCrlXGoGxzL0Z1bsSxacaLzIjEvAHDqsOQwrDMjsi4w4zDiMi8Qsi_zJTHhMyXx4fMmceKyYRyGsyeyYrJjMKTzLbGsMKoZs2gzaLHp8aVacyiY8ambMm9yZ1rdsuZwqdhZGTJt8moyZrHqsyox51tzKvFq8ytx6TNj8aoxrAAzLnCkWvNv8msyb7HrsOAzLvGn8u5woLLp8KnYsamyZTIhcKpzIVndcWybsWrwpDImnnKvUPGi8eqxZQvRMmXYXnNpcONBmDIssOpzavMkMi8Gs2xx4PMlseGx4hkw4LMm8mFDM27zKDLmMunwqVlybvOu86My6DCis6cyY3HpMW_bl_GoMWyzLjHrsqBw4zOrMqHwoHCqs-vxIrElF9tc82tyJpyz4DPgsacbM-Fz4fPiciuz4vDpMSZwqrPkMWJz5LPlMyVx4XMmMeJz5tyE8-ex5HGg8uZz6LPpMudxbjDv86Nw4zCjs-px6PJpcaLz65pz7DOqM6ke8-1zL3PuNCqz7rPrc-9z7_EpGR4zIDMgsSyzITMhsity4bPi2jIssKo0I7MkTHMk8-V0JPNtcWZz5rLkXIL0JnLl9Cby6fMo8enzKbJm8es0KLCic-pzp7GhsyvzLHHrsWIxYjDjc6n0KDMuc6rxpvKhc6tx7XOoMWHzYHHvsKjYsW1wqTNic2LzY1l0a3NkcSHzaHFpdGvb82EaM2GzYjIi82MyI_RuMy_0brNk2XNldC3e8q90Lsvy6nLhNCJBcKMxYDCmMuLxYjLjdCRy5DNuBnRkcyhy6fCpsuby4DOotCiwpHQpcumx6TCptKSaNGgybHLscSCy7TLttGpy7jRrMy_y73Qt8mrxbjKvsSuy4Av0LvNpVfEmVfSmcSZRcOMwpHSnNCWDtKgx5LClNGlxo7SpMSxzo3DgMuZzYJvxrDCtNGYZyxuzrnIrHIs05PInMaV05bRlNG105rTnNOe06DJhdOj0r7TlMaVxJkM0JzMv9OqzpjHrNOsbdOh06_LnNOVz6nTkMunzLfMptOkzqR005fHvs6Xya_Tlcyi06nRl9O4zZfTptO1x7jSu8aO05_Tu8mF05XQr8aiwoTCpcagdMqQwqbQu82ExZTFncKnIzVh1KnUqc6Bz4JTxr0Q0a3DmTV7CiAgx73HvzrUuNG3yIfUttS40bXIgNS80obUvtS3yJLUlNWCyJcKfcKJ0LfDjMKQxrDCr0Rpc3DEgnkvQmxvzYfGoc2lJcOMw5XSmUs904vRjg3TjtGTx6TUg8W4y5_HncOMw6jUm3PChMKrYtWb1Z1l1K_FhjLCq9WWYciFaMWUxZ_LrdSfypDLrcy_0oXIhGXImtKuyazCrdWT1ZXVly9XYXTJks-KAcOn1aHSmc2tPNWmzbgd1anFrNKqxobVrMeazo1ry7LLtMKg0qnUgs6i0afWqsmXwqDVsse21oXRuNaU1pZoyJp3zIBJ0ZLVmcWqx75uzaXDjMOFxYBB1pzDiDLWn8WfAdai0KbFstamZdCh06bRnNOR15POpMOMwojXl86xb8WUZcmU0afVssKD0a3Cp8Wp1bbVlGjUnmnUoMmtQteBxovUpM2gdBLImsywyazCqta-xoIvVGV4dNeEwonWm8WExYbNpgg-14zJhQLXj9eX1a7JntCl15fMp8eszLnClG3VsMOMw67Ts9Wy1bTVttWca8ah1bpl1bzVvtaA1oLJhcKvZc67yYUgdNe-dMqiyYXRuNa2wqTXvde_0a3WiciFyJrMpdK8z4HOu9CE17zQsnLWmHLDkMOE0YXQkMeB0YnNtM-YzbfFnwPNu9atz6vQqMagzYfPscmxwpJ2w4zDrdaxbMKlMzAwz73VssKCwqjElNitcsiTxJks0J3YqcudyIRrwqjRsnjHhcWdwqQjMtm4yJrTic2YzZrKms2dzZ_NocagzaTQic2nw5DDmNCOza4xzbDZidCS2YvNttCWG9aizb7WrsmszoHOg9qCxozLoMOszojOis-m1a_Drc6QzpLOlMaic9SKzpnFvMOu15bPodO2y57MucKQ15fOqdKw2aPPodG7zrXOt8652a1zzr3Qt9OZyazCrNe6xarXgMqk2oPLhsOMw4_Ish_XideL2ozSncWfBNiM2pTQoNO_xoDJocys2rDOpHfXnNGy15_Xoc6q16PRrcWD2KnNkda2wqbXr9uDbteyzrs21Y3EjHXVkcifyp_KrC9QyKfEk3Noz4oFbsONBBDQjsi72orYiXIc2pLLmcmQyovJlcmXyZnUj9SL1JLOsMmnyanKktqm0ZnLoMKHzpDXp9u21o3bksugwojZo8qKyZPcicqOypBkypJyyq7KsMqZypvKncigyqtryqHKo8qlyqfKqdysyKPcp8qX3KnKs8q1yrfKudm6wprWvda_26bXgs2lVtu8w4zbityCBduQ1avantiP25TJotuXz7LDjMO_25rXnsqQ253astK1zLzGotekzL_CqGPIj2sgxbLXq9et26XXsNuoxZPXswDZusKd3L_Xu92B24TGuQLCudu8w5Ldh9uM0JYG3YrWpd2Ma8mf3Y7bltuRxKrascuvwpHEmQHdlNuc26jbnt2Z0atz3ZzUlN2e3aDdotiy16zUod2w3ajGgM67ANusxI3Cm9uv3LTbstu016jbt8-KA8K727zCo9u_za_cgtu-yYjMn9Cac9qTx6Tch9ygyo3ci8W42JLUkced06fPq9yQyarck967xJXEmQDcl9u116ndvd6H3J7ciMqNyo_KkcqTypXct8qy3KvbsdyuyqLKpMWX3LLKqty135HKscqbyrTKtsq4L96dw4zSmMmswq_bsNyt27Pfh96l2oRa27zcvtiEZcyPyLrerN240Y4P3IXLp961yozcit-B1Izcj9qk34DcjNqna8OMw77fht6k3Jreg9Ciw7_fi962yZfCsdyj3KVh3Lbfnsqc35vKrNyv35jKpsqo4KCZyq3fndy436Dcu9-j1Y7CmcidU8e-csmqzZ7KmmUgRMeyzaXfrwRW1pzDgiTcggfZkN6A1arGhtKjx6HQn8aO05zXmcO-1rTRtOCgrsKie9WM1Y7CnOCgqOCgquCgrEbgoK7goLDgoLLQiQLCstu84KC237LFiOCguNyCCOCgvOChgc-q4KC_4KC934HOpN-E4KGHZuChieChi8iaZM2YU8SqY2nGpi9M34_ZgtqEw6DEmVTSmcOLQMKCwr4xw4ccAADIssOh3IIW1qLUgcekzYLQudSE07DTpcedzLXMrtqi3b17zpDKksmWxYTapeCij9O-y6DRpM-hzpXIoN29w4zDjNSA15fCrMyF4KCredO9y4DMucWIwobTidyGzrLEgtG8KCnOgM6C2oHNo96LyoDOh86w2rVl4KK34KK52pfgorzXmdqby6fCqmRpZuChqWN1bMSox6jUl9Oh16LejcqHwojdpNSh4KG13KTJhcKsybdxypnJt07SisOD4KOK4KOM4KOO4KOQxKgAwqngo6Dgo6JlVG_DgsKpzL9UxbjIv2_WlcKoxIngobFtxqZzAMKn27dvd0fEg8-axJNt16wUwojVjsyN1o7WkNW-1ZhU3pbQv8S7KFrThgMKBNyCCc271bLCh9StzrvYoSzVtdW32J_Vuca92KPEgtilypvJhdaE4KSVwqXgpJTXrdGtwrLWkM6YypjYrWQg4KOc3KXCqmbPgkbFscqaecK8J1LIp2ndoU3Gi28gT8mWJywgyalucy3FmMaRZtSk1Zty1KfOk-CloWTImnrInd-pyKPIpcinyKnIq-CklsivxJgBwobeq8i93IIK3bvJj8mR4KCQyZjfv9eV4KC9xLvOkN6_3JLgoITYk9Ghw4zCjcSZDcuZybbJuMm6ybzQrN2Rwo7goI_fvWzCseCgn-Cglty435TcreCgm9yx4KCe3qHgoKDKr9-S35_cut-i2brCn8q94KSR1pLWuNaX0IkGwpDNrdOGAcO51p7ft824EteP1qTXkdKm07LEmtmc1qzgpb3Lpd6CxaXWsNKy1rLWtOCjmta31pXJkt6dzovfp-Clp96i36zbuOCmqywo4KWy2ovLj9CWF9-63rTgpbjgppLeuOChg9SQ4KCA3r7goILgpoHeudOczo114KCJ3JndvXfgppHcoeCmlOCmneCmlt-T4KCf4Kaa35ngppzfleCnsOCmod-hyrnMucSgHsKWxIwBZwDaluCiu8aLwpZr4KiBaOCihMKWbWoAZwLeusKW2K0AbeCois65AGwB4KiRdm7gqI4Bw7_Clsii4KiYAuCooHlxAGTFptOkwpZ7yYZk4KifwpbFveCoqXbgqIrGmOCotHXgqJrTnOCoscKIdwB14Kik4Kixwol0AHjFpuCousqCdAF5AOCooOCmhXoA4Kin4KiR0KN6AcmG4KmNwpHgqKl74Ki1wpLgqYV84Ki1w4zgqYtkA-CpjcON4KmFZOCokOCoq9Ww4KiN1Y_gqLXDrOCpp9OJ4KiC4KK6zoRu4Kixw63gqJ3TieCosNiY4KmrwpHgqJDgqYfDvsOMwpkA36XgqLnUkOCoscO_w4zCmuCqgsKY4KmA34TDjMKc4KqCwpvgqoTJr8KW3ofDjMKd4KqQ4KqMAQzgqI1lAtOb1JDTutO84Kir4KaH4KmPxI7gooTCpmfGnHXFl8KQwqbFk27goalnwoDCp8m7zIbgorzDiz_DmcKZ4Kq74Kq7wpo"
              >
                <span role="img" aria-label="build" className="-ml-1 mr-2 text-base">
                  🔧
                </span>
                Build
              </a>
            </p>
          </>
        }
      />

      <VideoSection
        className="bg-white"
        videoFirst
        videoId="c7yvOlwBPoQ"
        content={
          <>
            <h2 className="mb-4 text-4xl font-semibold">Byzantine Generals</h2>

            <ul className="list-spaced mt-4 text-md md:text-lg">
              <li>Coordination problem arises without a centralized authority.</li>
              <li>Network (communication) is public and untrusted.</li>
              <li>Generals prove their ability to wage war to other generals in messages.</li>
              <li>Proof of work!</li>
            </ul>

            <p className="mt-6">
              <a
                className="btn btn-secondary"
                href="https://eth.build/build#3f3d25b54ec9fde9b34ba3a8cd505d8306f97eec4537cd707f7e92b5d9226bf4"
              >
                <span role="img" aria-label="build" className="-ml-1 mr-2 text-base">
                  🔧
                </span>
                Build
              </a>
            </p>
          </>
        }
      />

      <VideoSection
        graySection
        videoId="zcX7OJ-L8XQ"
        content={
          <>
            <h2 className="mb-4 text-4xl font-semibold">Blockchain</h2>

            <ul className="list-spaced mt-4 text-md md:text-lg">
              <li>Proof of work is brute forcing a one-way hash function.</li>
              <li>Miners with special hardware work to secure blocks of transactions.</li>
              <li>Each block references the previous block to make a chain.</li>
              <li>Longest chain wins and your weird uncle shows up to help with security.</li>
            </ul>

            <p className="mt-6">
              <a
                className="btn btn-secondary"
                href="https://sandbox.eth.build/wofCrGxhc3Rfbm9kZV9pZMONAVTEgcSDxIVsaW5rxIvEjQJSwqXEh8SJc8KdworCosSMw4zDrcKkdHlwZcKtQ29udHJvbC9UaW1lcsKjcG9zwpLEjsKmw40Cw4LCpHNpemXCgsKhMMOMwqjCoTEYwqVmxIJnc8KBwqljxLHEgnBzZWTDg8Klb3LEiXIAwqRtxIhlAMKnb3V0cMWsc8KRwoTCpG5hxLbFqm5fdGlja8SmxKhlw7_CpcSUxJbFsMSOwpLGgmFiZWzCpzMwxo8wbXPCqnDEsMSpcsW6ZXPCgsKoxJV0xLd2YWzDjXUwwqVldmXErsSmxbtrwqhib3jFl2zFoMKkIzLGuMShxKPDv8W-xKnEq8StxK_EscSzxLXEt8S5xLvEvQHCiifFg8WFxYfFicOMwozFjRrFkMWSxZTFlsWYYcWaxZzFnsWgxaIBxaXFp8WpxavFrcWvxbHFs8W1ZcW3xbnGrca9xoDGgsSVa8aFAcKuxojGimzCpsaOxo_GksaUxpbEt8aZxpvGncSuxqDGosONC8K4xqfGqcarxbrFvMavxrHGs8a1xrfGucSiZMOMw4_HrcKsSW7FrnQvQsWsdMStx4bEvMWAKsWAwp3HjMWGwpLDjMKJLceUYcWTwoDFn8WhxLcFx6DEiQDCpsSVyJvFsMKDx6fEtsKgx63GvMaDa8aGxarFrMi7wpLIvcW0yL_JgcevxoTCk8SOdcSOwpTEjsOjyYrHqMmAxKfEqcKnxrDEsWVhbsmOx7HDgMe8b8aXx7_Cg8KlxqFsdWXFnsW6dGxlwqVDybJhcsKlxZd1xK7EjmnGusiUw67HrcKrxKzErsSwxLJBbnnIoseIwrJFyKjHjsWKx5ExQsiuxZPFlcazxZnFm8WdyLLFogfItsWoyLnImsWvwpPJl8S2wqFByYHCpMmDxI7CrsqlZcKhQsqpyqsBwpTKrsKhQ8qyx7DEjsOkyYbHpHTIvMi-ZcKmx6PIm8mNyYPHssKVyaXJp2nGmsKAyb_EjhPHrca_yoXHgkTGi2HKisS6yKMBw5DFgMOZyo_FiMqRx5LKlceWypjHmcqax5zIs3IGyp_IuMi6x6XKrsmZxb_Jgsq6AcOjyr3Iu8KRy7HLhsewx7LDpMuKx77LjMWUwqrFusS2xIvFuMaSw40Dw6jJv8OMw6nIl8iZyJvIncifyKHLmsS9Ahwoyo_IqsKQLMukyLHHncS3CMutyqHLucu7yZrGgMqqy7XClcu4xa_JicuBy7LEqcaBy4fCkcSOwo7Mp8W_yZxvyZ7JoMmic8mkxpXJpsyBxprJqcmrya3CoMKlybDJssKjQWRkybnFq8m8Cj7MjcOMx63Crk3EiHXJsnMvzZlkzZtlyovDjMK-Msybw4zCmR7Mn8qcxLcCy63Mrcq_y7rLgcKidHjHrQDMvsy1AcaTzYHLi82EwqfGqsaJybLKm82Kx6lOZXR3xaBrzZDGtHLCpjdlNTdjMsKoc3ViZ3LHmWjEgMSCxITEhsWnxJgdxJHOocmDxJjEjg_EnMWnc8Keyb8EyoJNYXRoL1LJoGRvbcqLF37Np8OIzarFkcivy6XHmMeaypvMocWjzKTLr82xzLjMssyqxJbDgM2wxbDFssmLybPNhmXHrcKmbnVtxorJuMy0Bce1xovDi0PCpcOlWg1xwqXCncyAxpjMgsKDwqlhxazOu860xbvDg8KjbcSVAM-5YXjPpcKrw4FtZ07DiADJv8i1zKjCq86zzrXNns2axrTNo8OVw4zCpsybeDzLpMqXz4bLqM2scsyjxabIt8ylzK7KtsqozKjPm8-dz5_PkGsFyrbKsdClz5zPnsS30KkGz5PNss-WwqE9z5rQr8-fzbkJz67JqMqnz6V7wrQfMhhewrbKsAnCok9QwqElyb_LrMyowq1PYmplY8icybJuZ861zaPDn8OMwojNp8K-z4LHldCZbMqZx5vQnMus0J_KoM-My4DPlsuD0ZXRl3TNt9CpB9C0z5XHqMKm0ZrRnGjHrc2IzLQGz6Ns0L3Nvc2DxZTJqsaizYfJv8yj0IrQjM62zrhuzrrOvMyWIcOMw6zPgNGkz4TRptGoz4jLqsef0azLrsqiz43MsMq5z5HRuMuB0onJrM-Z0K7Qp8S3zbkK0oPPpcKbw4XDsDd1wqPDrtC-z7DPss-0bc-2Y8-4z7puz7zSv8-_Q9CB0IPQhdCHyJMJzrLOtM62zZ_Nm2_QkcSOFNCV0JfPg8qWx5fRp8un0anPidOO0qHQocq_zK_QttCkxb_QptCwctCpCtCs0LnSrtOryYML0LTKttC40q3Tqs25DtK7zYTRgENIwprDkcO2K8OVw57RidGL0Y3Rj8iTCsuS0ZTRltGYL9G80Z3MlsOM0Z_DttGi0prTm8umz4fLqcqdz4vSo9Gv0bpv0bLRmNG1yYMM0qjRsNSR0b7MqNKAy73CkQvSg9KFx73Pr8aawoHSqtKLyJMLyJfUjdGzL8SVxIl4yovEjmvDjNSWxYTIqc2k05nRpdOc0p3DgtCc1LrTotGu06XHqMKj1KJq1KXHsA3KrsKl1L9lzbbTt9CoyYMOz5PVk8S21LfSrMW_wrPEhHLElWcs1ZbRsyzJt86cec25xI4O1ZvVndWfxb_UrcaEzYDUs8e_y47Ikw3Tj9CN05LQkMyWxI7CpcWAwrTTmM2rz4nItdWR1J_Vpcqv06fEqdOp1aHHsA_TrtWg0LHJgxDTtMuB0LfTr9O4zLTOqtO7c8KD073CqCnDrsOeUTHDisqwZNSH0Y7Jvw7MkNKjL07TsM2jwqHFgMO60aIy1o_Lqs2u1pLMptKlzKjFpMmDz5LLhMuw14nTqNC60q_MtBDWqMKDwqtwxIJjZWjEscWiwqEjzYlpybHLgta807jPmMKjMcaPyb8M1oXSkM65zrvKi3jFgMKU0pnXhMWiA9Se14jPlsyxzKnXjNSox6jVp9ak0LvMtM6rxILHts-lwpRyw7bCr8OTw5p915bSvcig0r_Ii9OCz7vPvdOH04nQhNCGwonIkw_Nl9aHxpovT8mHxazVggJO17TNp8K0KNe3xLfWhNeH14_XvNWYxJYU1qjCgc2zzbXJv8qezKjCrNS81I_VutWCAWF60aLVitKb1YzTntKexaLUi9ix06TKrtWV0ZXYtGsI1bnSktWe2IPWnsewCdWk1ZvPmMet1arEr9Wt1a_Uo3TVsnLVtNW2AdWa0qnVutG_zL7Vv82C1LRz1oLEjNe50ZLYv8ic2bnNo8OSRsybxI58w4zChdCY2YnUm9CczrHZjnPCms-Oy4LVsNSk14zKtjDHrcK01avZo9eSctmk1I7RtNqQ1qIx2pPaldGbLNqX2pnRs9Cpw4DKts2mzKjalNmi2qHao9qO2pvHsNqn1qIz2p_arNWu2q7ZpdqmyrY02rXVrNqt07DapNqP2rHKtjXavdqW24Dar9q61qI224bav9Oq24HasM-RyrY3243at9uI2rnanNC2ONuV2qLbl9qa2qbPk9qL15DWl9qvzL7ClAcIDNms0LbaktCl2qBn24rQttqe267attuxx6jCodqp06jbr9u2yqbatNu02r7bsNuZ27favNu_1a3bvMqv24XchdGb3IfCoduM3IrcgduD1qLblNyP3Izbm9yU14zWqMKE16LXpMKm2bnOjcWgwqcjNWHco9yjwqhmx4BTx40Q1afDmWBbCiAgIsaixbtlIizcsdyzxrBi3LjcuiJjybfGtHPcvtyyImRhxqndhdyzxqjct9y53YZmzpzElt2LIs6bYdeb3ZRoZcSMad2UacahbiIKXcm_za7ZuNml2KPZpcqLUMSOwobZvwItw4zCqtqE1JrQm8-J163aicq126PajduY3JHPls20b9uc2rjbn8qz26vHqMKk3ZHOu96C257apcqz1bjSqdmf2qrbr9ud24_bicqzD8-T3brYs9Cl26XMtBTKrt6Az5rbu9yCxLbeiMSwbd6i27XepM-X0orVqNaX2pfaptyZ3JvJstyd2aXcn3Lcodyl3KRh3Kfcqdyr3K00e9y_yKAiOtyz3LXdmN2P3LPeiW3fhdyz3Z_JoN2Uz5jfjjE2Cn3MvsOcABDClgUEAAXIuNqXwpYGBt-gAdaYxLfClgcDAN-mAMKWCN-tBwDfsAnfoQffqN-jCggACd-i07DClgsK377fuuCggQzfreCghN-wDd-tC9-1wpYO378L4KCG06rClg8MAA3goIDgoJUQDuCgmeCglM-fwpYUAgAP4KCPxI4N37QCAdqr3IDelM-f25DCltW34KCOAgLgoK3bh96V2aXgoLIBD-CgmgID4KC3247goLDar8KmzpvFq8WawpDCpsWXbmZpZ8KAwqfGqXLFhMStw4s_w5nCmeChmeChmcKay48BOsetwqrMkcWsxLPVnnTVggM-Wtm_ASzXg9Oa2bTQnNe52onQtcmY2ZPXjdil0qTem9u62rbVtt2w3JnCq2LGtMW8y4zcqsWGMteY15rXnNeexLfCr8aqxp9yIMafeHQg3ZpyybPOhcKkVOChpdWnwqfSv9GnxaB5zI3Djc2XU8SpY2nGoi9MxZxnx4XMllDDjMKC3a_CisSOw7bYrnLToceh06Nz3prHqM201bvbpN29xJbEjtapy4HCo2HNjtKmyYQBzLfLgcKn4KKubsaaaXPPmt6W3b7YgeCil8Wb0bTMqMu04KOEAXXemdqMwqzVs8uY25Dgob0uyq7CqWLGosmg15soKcet3KfJu9GYacStzL7CkMquwqfEh27go6_go7HMqOCjs-CjvcW64KO3y4fass-WwqpkaWbgoY1jzZvEp9mZz6DLvdmxzb5zwojes8-ZUMy7bMKs4KKXcXVp4KKXTsSt15vDguCkiOCkiuCkjOCkjnkAwqngpJ3gpJ_gopdUb8ODwqnPmFTFv8eUb860wqjEieCiqOCin3MSwqdz1513R8SDxZ7ElM-6dBTgoZ1Hy5LgoqbRl-CiqcSyTcSV4KKvx4fMisKYxI7OsdWHypDDjMK0xY3KlOChr8ygy6rZjeCiu9GuyqTgo4_go4lk4KOa4KOV3JfKut2w1ZvgooFvxbzIl-CjpXnbkNCpxYBRyq7CpMS6xLHgpbPZqOCjpuCjl-CjhAIuz5PgpabPlsKsxK_JoHPdl-Ckg27gpavFv-CjpOClv-Cltd6d1K7FgE_RudWm4KO815vgpJDgob1Q0oPDjsefw4DDr9me3LVky7zVvtaowoLgpKbgpIvFu-CkqQLCsOClqOClkuCjknLgpLBC4KKCx7HDguChnU3HrcKy4KWO4KKo4KKq4Ka24KWxa2NoYcSV1YIHyZQBIsugx4_DkuClnuCiuN244KWk1J_gobTEtsKmcMm34KKO4KOW4KODyYTEmuCmhcquwqbdmuChjmjgo5zXkdOw4KO44KOq4KOsxILgo71l4KOw4KOyZuCjtOCmjeCnqOCjj-CmmuCnreCjv8W_4KSB4KO14KSE4KSS1qjag86Fwqrgp4HFvOCnhOCnhm7gpJxl4KSe4KSgZeCkouCnrOCkpeCkieCmrOCkjWzEp-Ckq-CkreCoieCksOCksuCktMW_wqPGnuChnUrgpY3goqfgpZDIneCmt9WCBMKmw4zDiN2vwoDEjmjgorjVkOCnk8i74KaG0brgp5jgopfIisW_14vgpa0yyq7gpojdkuCmi-CnuuCmjuCnm96E4KWtT9Wb4Ke14KSQ4KW3AlDgp5_du-CmkdW04KOny4fMl1HFgFLgpbrgp4XgpYHeqdyA2bDgpqTElOCmpuCjndmw1qjCiuCkl8KixrffqXIC4Kar4KSo4KiReQPCsOCmt09uVuCmpeCogWvDg-CohuCoiOCil-CmssS3w4LgooDgprdSZXfJt2QK4KSz4KalVHjgpo7DmgEXW3si34Q6It-Q3aEsIt-M34XgqpPdkmvcuCLfkzo5Nn0s4KqL4KqN4KqP3aDgqpngqpTgqo7dkcmg4KqY4KqS4Kqb4Kqd4Kqf4Kqhb-CqleCnouCkieCqpd6n4KqV3YjdiuCqq96t34Xgqq3gqqDgqozgqrDgqo7fiN2O4KqWzrvgqrbdieCrguCqmzMy4Kqu4Kq-4KqV3Y3gqrTgq4Tgqo7cvOCqmeCqmzY04KuL4Kqi3ZbfieCrg9-N4KqO4KqQ4KuT4Kq6OuCrleCrl-Cqv92H4KuG4KuP4Kuc3YDdgsS74Kuf0qvgqrvgqp5dwqrJq8SM4KiL15vDjgIhWsOU4KqC4KmaSMSDaMOAwqvgq7JkUOCnmcSuw5lCMHjGkGZjOdebZDMzYTZiNTlkMWFmMNyjMWNiOTQ2M-CsoeCrlTgyYeCqneCsnzhj4KyYNOCsjjngrJXgrJLNjjIzY2Mw4Kyt3KTgoZ1J4Kie4KWP4KeA4Kii1okDUsWAwrLgqKjgqKrgorjaiOCorsqj4Keg4Kiy4Kea14rch-CouuCmiuCmjOCjtuCovt6c4Kec4KSG2IHgqYTWndOx2rHgqYngobrEqeCpi-CmgN621qYC4Ki4y4HCpOCplNSr4KG74KmX4KSF4KmZxIzgpqfJo9aowongqaAjMeCpowHgqabgpq3gqajgpq_gqazgqa7gqbDgprfgqbPgqJTgqbbgpZNy4Km54KWwxbzgqbzgqb7FoeCqgeCsguCqhOCmjsOZw7Lgqorgq4zgqo7gqrLdneCqkuCqpiLgrpbgq6zJrd-FNDjgq6PgqrHdm-Cqs-CumOCqteCuleCuo-Cul-CqmuCroOCun-CuoeCrgMSU4Kua4K6Z4K6b4Kq54Kut4Kuh4KuW4Kq94Kqi3YFy3YPgq6fgqpXgq5LgrrPgrp06MjDgrq3dlc6c4K6w4K6m4KqW4Kqp4K6c3Lfgqpzgqp7grrfgq6Tgrr7gq5vgq43gqrjgrqrgrrQ44K-D4Kuw4KyC4Ku0ZeCmoE_DmgPgq7vEjOCrveClgeCsh-CsieCsi-CsjeCsj-CskeCsk-CsleCsl-CsmeCsm-CsneCsn-CspeCspOCsouCun-CsqOCsqmLgrKzgrK7grLDgrLLgpajgrLXgrLfgrLndiDXfmd-b4KC7c8OMw4wAw4zDjci42q_goLt1yJXgsInMisO_4KC7wo7MjuCwkQHgsJPGhsSk4LCJw48A4LCZyrTgsJDDjMOu4LCY4KC7wpXgsKLgsInDqeCwnuCgu8Kuw4zDv-CwicOu4LCqyZXgsJDLkOCwsQHDpOCwtOCwogLgsJndsMSOOgDEjkfIuNuv4KCy4KaD4LCK4LC_AUcC4K2i4KaT4KC6xYAyxI5J4LGHSuCgpwJP4LGA4LGS36jgsI3FgN2s4LGIAcSOSgLgqaPgsYTgqZAB4LGT4LGAAeCxi-CgseCpkeCxn-Cxh03gsIzZpeChhcSwdeChiOChisSt4KGN4KGP4KGRxLfgoZRu4KGW4KGY4KGawpnCmg"
              >
                <span role="img" aria-label="build" className="-ml-1 mr-2 text-base">
                  🔧
                </span>
                Build
              </a>
            </p>
          </>
        }
      />

      <VideoSection
        className="bg-white"
        videoFirst
        videoId="er-0ihqFQB0"
        content={
          <>
            <h2 className="mb-4 text-4xl font-semibold">Transactions</h2>

            <ul className="list-spaced mt-4 text-md md:text-lg">
              <li>Send value by signing an object with the details like 'to', 'value', 'data'.</li>
              <li>'From' address is cryptographically recovered from the signature.</li>
              <li>No decimals! Amounts are integers, in Wei. 1 ETH is 10^18 Wei.</li>
              <li>Miners are incentivized with a fee to package transactions into blocks.</li>
              <li>This fee is called the gas price and you 'bid' to get mined.</li>
            </ul>

            <p className="mt-6">
              <a
                className="btn btn-secondary"
                href="https://eth.build/build#f37e018c96aad321d5f7d5dc10afe2e28604415930b21acea327ff1079b9772a"
              >
                <span role="img" aria-label="build" className="-ml-1 mr-2 text-base">
                  🔧
                </span>
                Build
              </a>
            </p>
          </>
        }
      />

      <VideoSection
        graySection
        videoId="-6aYBdnJ-nM"
        content={
          <>
            <h2 className="mb-4 text-4xl font-semibold">Smart Contracts</h2>

            <ul className="list-spaced mt-4 text-md md:text-lg">
              <li>Send 'machine code' as data in a transaction without a 'to' address.</li>
              <li>
                Deployed code has an address just like an "externally owned account" with a private key.
              </li>
              <li>Reading data is cheap and can come from any node on the network.</li>
              <li>
                Storage and execution are relatively expensive. All nodes have to run and store
                everything.
              </li>
              <li>
                Call a function on a contract by sending it a transaction with the function args in
                the data.
              </li>
            </ul>

            <p className="mt-6">
              <a
                className="btn btn-secondary"
                href="https://eth.build/build#dbabde73647c322de3133e4d92ae97b64aee70de22330cda159b64723c66ef4c"
              >
                <span role="img" aria-label="build" className="-ml-1 mr-2 text-base">
                  🔧
                </span>
                Build
              </a>
            </p>
          </>
        }
      />


      <div className="py-24">
        <p className="text-center">
          <iframe importance="low" width="100%" height="1" src={src}>
          </iframe>
        </p>
      </div>

      <div className="py-24">
        <p className="text-center">
          <a
            className="btn btn-primary block md:inline-block mx-2"
            href="https://www.youtube.com/playlist?list=PLJz1HruEnenCXH7KW7wBCEBnBLOVkiqIi"
          >
            <span role="img" aria-label="learn" className="-ml-1 mr-2 text-base">
              📚
            </span>{' '}
            Learn More
          </a>
          <a
            className="btn btn-secondary block md:inline-block  mt-4 md:mt-0 mx-2"
            href="https://sandbox.eth.build">
            <span role="img" aria-label="build" className="-ml-1 mr-2 text-base">
              🛠
            </span>{' '}
            Start Building!
          </a>
        </p>
      </div>
    </Layout>
  );
};

export default Index;
