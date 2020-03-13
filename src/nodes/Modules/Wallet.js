const defaultColor = "7e57c2"

var codec = require('json-url')('lzw');
const compressed = "wofCrGxhc3Rfbm9kZV9pZMONAUzEgcSDxIVsaW5rxIvEjQPCgsKlxIfEiXPDnABAworCosSMxI4LwqR0eXBlwq9DcsSqdG8vS2V5IFBhaXLCo3Bvc8KSw40CEsSOQMKkc2l6ZcKCwqEww4pDU8KZwprCoTFCwqVmxIJnc8KAwqVvcsSJchDCpG3EiGUAwqbElXB1dMS_woPCpG5hbWXCrVtwcml2YXRlIGvEtV3EqMSqZcKmxITFtm5nwqTElMSWw40DdsWtxa_FscKoZ2VuZXLFuWXGgMSrw7_GiMSVa8OAwqdvxarFqcWrwpPGjsWwZcKrxbXFt8aXxbzEtcaZxoLGhMSVZ8Klxolrc8KRxYE3xqbFscKqxalixJRjxq15xq_Gg3TGhcazxrVzw4DGu2XCp2FkZHJlc3PHhMaxxobGtMadc8KUxYEmxYEpxYEuxYFYxr1yb8SrcnRpx5PCgMKJxKTEjQEMxq_CrU3EiHVsx5MvSW7Go8S8xL7CksOMw6bFhMWGxYjFisWMw4zDksWTJsWWxZjFmsWcxZ7GlQDFosWkAMagxqLFqsa3x4zHpcarxbrFvceDxrXDgMeZxJbGt8aLdselx6fGlceqx5PCgcWuxqfIm8W4yJ3EtceuxKUBDcavwq7HtWTHt8e5T8iXdMe-xL_Giz7FgWzIhMWJyIDCtCjIjGHFmcWbxZ3Fnx7Ik8SJxabFqMiYwpHHjMKgxq_Iksa1xYEkyKfHqMiqc8isxo9lwqrGv29ja2NoxLluxKPItA7Gr8KvV2ViMy9CbMmoyarJrMSVyYDFgAIcxYHCismGyIYwyIjFk8OMwpLJi8mNyI_FnxHJksWlxafHvMmWx4zCrFvJp8mpyavJrcW_xKnEq8eFx4fGnMaKAiXIlnTGo3PCl8iaypnJvMmtx5bHhsayyKLGtsqAJMWBNseMwqliYcSCbmNlKCnGr8KoZnXKvceqb27KssikAifHjMKnxIfKvcq_y4HKnmXLg8uFY8uHy4nHiceLyK3FscKtyqxOdW1ixpXLgMuCy4TLhmnLiMuKxrgCYseMwq3HhmFuc2HLmMuqbsumy5TLlsupy6vHicutSMeMxoPGk2TLusaBy7zLt8u-x5rLrUXKuMeSyr5pcHTMhsSrzIjLmcusxYFLyZ_Iqcerc8KCx47HkMeSx5TCoMKoxbVvdsSMxpXCu2h0yqdzOi8vcnBjLmV0aC5idWlsZDo0NjIzNMizx7APxq_CsENvbcS9xpRuxasvQ8m9bsm_RsWBwoDKhcWAAcKQZMqMyI7Jj8aVAcqRyJXGocqnypXLnWXJmcuUyqDKscu_xYElzJvHqcydwoPCpceqdMe4wqXNk8mtwq1zZce4y5hlZFbKu3VlzKvMrXDMr8yxzLPMtcy3zLnMu8y9zL_Ngc2DNMKlxbhszobOiMyuzLDMssy0zLbMuMy6zLzMvs2AzYLNhM2GxI7FocuUyLjHtse4cy_Ivc2nyL_EvcmBA8KExI4szZrDjMmJzZ_JjsiQchzNpMqTyqjJl82pzavGgcmbxp3Hnc2yyaHJo8anzKDHkceTc8mvx7DKkM6rVceqbM6vRsuXy5nJv8ONBMOYxI5eyoXFi8qHw6bFk8WVxZfJjM2gzr8fz4LJlcakyZjLp8-dy7jKomvFgcuNzanCpGPKu8mFy5TGm8mcAijLjsePz5HHlMqvyqHQginKpsqowpLHjM6XzoXGmMuUAMyYAivPs9CAy4rDgM-MzJ3Cgs2pwqfKusq8yr7CqWFyZ8uixpPFq8KQz5TEjhLGr8Ksx7vGo8m4xarEsc2VzrTFgM-hxI7Cms66w4gyzZ_CgcKpY29sxILOis6Cw4PKjsaV0K_Fo8mTz4PNqMmkz4fGms-3xYEq0I3ImNCPz4bGr8O_0JbQhNGay5TQoW_RhGXLs9Cb0J3Hk821zpjOhsKoY8eAayDFsc22ac24xoJC0LXLq9GDy4V0xI7CttCtARPHs82LzZDHpmwvVGnFscS70LjDjQUexI7Crs-lyIfCjMWTGtGA0YLRhNGGzb5k0YnNoXICzaTRl8WrwpHChNCgy4hfx6rJqdGb0JYqxrRhy6RswqYzMNKzbXPRp8yewqjElcW6cs6Yw40LwrjCpWV20KrEqGnJqcKoYm940YPJunLCpCNB05HRvhTIt8-YzL3Pm8embSDJtGnPnwXDsMSOwpDSkcqHwqDSlM690YpyJs-wypTSotCQz7HHhG7Losuk047QgivSociZzanCps2mxqPTsNOyxpXLisKTxYEsxYEtxYEy0rfCgcKoxIlj0ojKu3MSzqgBFcezRGlzcMSCeS9XxbnJq8-fBsK4yIPFh8mHw4zDjTzTp9Kdy4HRjcqSz7HGt9Kk0ZHJmtGUAizSrdKvwqDUiNGy0bTCpdScdMmr1JEWyLfIuci7zq_Osce90osGw7TEjsOCzrrOvM-ryo3SnSrTq8-E0JnPiNSyLdSI0KDQosuzyr7RvhfGr8K2zYvNjcuI0KrOr1THk3QgRmF1yr7Os8e_z6B-MtOjyogxLtSozr8d1ZLRmNCFzKHPktCJxrLUsi7LjseScc6GxITRm9SyL9O3z4XJpMKidHjVv8eYza8CMNK3woDRvhjQsNCyxarQtMyty4jPnwR0w4zCltC90L_Vjs-txZ8D1brTrdGfxoHQgcadxp_Tu9W71q3GmtCWL9WUxKvRodGj0aXLm9K30anQktGs0a7RsGXUuce4wqbRttaey4nRuc2QAdSRGdSU1JbUmGHUmtS81J7SiwXCqtWy1KNlxYADMdSn1qfOvsWfJdar1K7WtMWl1LIw1LXNv9S3zKbJoMydwoHXhdeE15Vo0b4azYnVoc2O1aQvUMW2yr7Un0DFgWLVs8K-06bXodOoBNel1ozGp8KoW3N5y6PRhMqdxoHNrcaGz7fWsci-07jUsM2s07HLo9O_x4nKgDHFgTPWltSRG9eQ1JfUmdSb1J1oz58HwoDFgcK80L3XoMiN16LGldKA1KvJlNOs16bYm9WV0IIx16ts163HptevyKvXstS72KzRvs-By5THtMW5aC9Nx7fHqtSYediuYsedzZp42LTPrNi2civXpdGZyaTCoUHTvdie07TPigIyx4zCoULZpdOz1LIz1ovZqz3Zrtifx5rKgDTFgTXWvtmjw4s_WMOPA0YVF8KR2azDi0BeegtZw71uw47Cok9QwqEq0b7VucuUwq_Uldip15MvRNKY0KZzz58IcMSOw4zOusK-N9W3xZ8t2IrWuNeo0II02bLXp8Km2J3Ts9Gm167MnMeTwoTCq8qsx6tTyIUyxqnEgsq-aNGExZ_Cr9CqxpUgxbp41ahoxpXXhM23x7jCp9qe0YXaoNCRzpll2b7Dh8KgwrEbHFJN1JHJkc6r1YLOrs6wyL7aos63AljVjMmK2IfSnS7ardenz4nKo9m72rjNs8irzanCo1VTRNG-JNaa06wvy6HZptagTNKMyJLXm8iAwr7Wpti106jXt9i50Y_WrNi9xKvbtc-4A37astyVxoLatdm2yKPLrTvWvtuCy7Zl24XMvsaVwqEj17LCptyF2rbRqteEMjbSszDRvtOqy5TCtNe51aPNkM6vR8SDxLfXvmXWoGrSjMK02ITFk9W227DOv9OU3JLUrdmhz4_YjsSrzoLYk8qfx5fGh9CCQMqWW23ZksyRxJTGld2U3J3TvtmnyqNB3JvGp9GS3aLZpsuKyoBCxYFD1pbRvifGr8Kq1pt00oZl243PnwLDmtKM0J_ci8643I7ZnNOoBduz3Jzcl9iYzrLYmt2o1pHHiMyLxYFA0rfau9q9Zdq_xYnbgdeS24TbhsaV24jNkNuK24zbjtuQ17LCpNWm243bmM6GwqRmxJLRvijcgtCz3K7Glc-fA8mDBsmx3IvDjNyN2qrGlQbeht6M0JTYl92nxbHdqdq03aPQlkHco96Z3Kbem3Lcqtys3rBy3qfGgtW13LQx1JHLk8aBwq3amteS15TYrNOewoLDjQbOud63w4jZm9WPzr8g2IrUr96-2L7ZqMWVxILUttS425LXs9mJx6_EjtWR2YzTls-a0oZvIEd3ZdOd15fNlwU81bPTpTHSld2KxZ8h3r3RsdOv2Jzdo9SyQ9-BxoLWsnTZtd-Q1pM81IjUimXUjG3UjhLRvtmfy5TQsdyD14jQttiuxYMFbtal3rpyzrndjdi72IvfgtaI0IJE07fdj-CgtdCa1pM92q7Wuse41rzHmtCc27jJoda_25nXgdOG0a_Rsd-y14fRt9eKxqHNkBDRvs65z5fPmc-bz7XWn9KLCBbGi8Oo1bPPqMWU4KCvMNelxqXXp8yWz7bQgsyNz7vPvdGF4KC22ahGzILFh2fGlGTejdSyR-CgudCQ3LDJmt2sxYFKxYFN2q7RnNa94KGF0J7Pu82-bmTQpdCn0KncvNCs37UB2qzgoZbTly_PnMu90LfVrwnDosaLcOChoM-p4KCvMeChpdqu4KGoy4jUssyB4KGsz77goa_Ko0nHjMKkyaxzaOCht9CCSuChus2p35Hgob3HidSBAk_FgVTFgVbgooPat9mE2rnMns2pwqvLssu0y7bLmeCijNCoxbHgoo_Rvtuy4KKU37rgopfMieCimcmBCgDVsOCin-ChouCgisaV1bLgoLLKqOChptyc4KKl4KCt0IJL4KKu4KGtz7_WrtSyTOCiruCisOCiss2s3ZbUsk3gorbJpOCiuNCU4KG-AlDFgVXgo4LgooXgo4TbueCjhsmkwqfMj-CggMyS4KON4KKO0KvRvi_ertac4KCo4KGa1a8KCs-gxaHfo96C36bFn9ST4KOh0ZDfq9GT0IJO4KO24KSeZeCihNm3xYFJxYHgo67Xp-ChgNGky5rgoYPWvt-R4KGJyanXg9ys4KSQ4KGQ0brEjiXRvuChpNmM0oLHhtGE0obSiN6x0osJ3IgE17fXm8-mw4zSk-CgiOCgrwfSoOCglti8z4_SptKoa9Kq1pNO2YHSsdy00rXSt8KC0rnentK8yrvSvtOA04LThOClldOI04rTjMWd048y4KWu1JHgoqLZjN-a2KrXtM-fCxjGi1zNmsejzZ7go55yM9-p27TUsk_ZgdmDyKjgpILXsd-y2YjUvWjUkdWy4KWy15HgpbTfndKLCzbPoOCgl96A26zgpb3cj9KdNuCmgd6H1LJQ4KaF37HRs82517TRvjXGr8Kx4KS-0oTNksuIZNGzy7jPnwoo0ozDsNWzxYvVteCgr96t4KScxavgoLpl2aPHs92WLNye3aTcmMKB2avZrdmM4KeD4KeF0ZQDSOCkosWxxKhy3qjRoNOJ1rvgpK7Io8uc4KO34KWmzZDgpZfejwJE2bxBw4DZrAHakVDCoiE91JHgpp7bpc6tyLzbqeCmlOCivwPgoZ_et9WN4Kaczr804KCNzarUsdCCVNWY1o3Wj9SRN9WB4Kew1YTgp7LVrwt8z6DDttuu4KCv4KiF4Ka93ovgoLvfrMqjVeCogc-P4KSGzJF00b44ybJPYmrgoJ7dt-ChhdmV4KaUctKMwqrapx7goK_gpqngqJLgoLTdgm_gqKHgp77ZqFbgoJTdqcKg4KO6V8WBWdS43LDEnMuIyr7UkTnYqN-b2KvgpozPnwzCstKMwozYs-Cgr-ConuCor9-q4KiU3JbUslfgpqPgoobZhuCmiuCmp-CikTrNid-5zq9STFAgRcq9xaTgqYnYsN613YcxfuCgr-CphOCoksKW2q7cl8ej4Kmy1LJZ4Km1yKDgqbjWsOCpusSW4Keb4KSj3ojgoJTTusi-3o3QllrdseCikTvGr8KrxK7EsMSySMSD2K3Siw3OtwbYidyLeOCorOClvuCpneCor9Ou06zgp4LKsMaG4KeE4KCR0IJa4KCU4KKv4KqQ4KqE2KDFgVvFgVzYpeCikeCgheCmkNqb35zgqYjSiw5g0ozJmd6A157fpdaoxpXgqongqZHgpoLQglvgqZfgpIHPjdmH4KmbyLTZtMuUwrBT4KqgZy9TdWLgq47Hh8-fDs-iBtOi4KWJyIfYheCjneCnucWf4KCF4KiS4KOjxqfYlcaH3r_QglzQkMSE0KbgoJfgoJDZptSyXcyCx7jGhsy44KCY34DgpZHgqLDgqoLOsuCqqeCnoF_UuOCrrMepGtG-PuCkjt2334_Pnw3Dit-gwrjap-CkmOCqvnII4Ke83angqoDgq7nart-E3avWk13fiNuD34rcqN-M3KvgoY3fj9-RwqLcstG-P8i34KuVxrLgpq7Lo8SV3YLSixDUgwbPpOCrnMqH4KWMz6rgq6DGldm04Kuj2avZpOCrqNmoXuCnieCotMqjX9mrQ-Ctg8ae4KqB4KCW4Ku9yKPKgOCquAJh4KqHyLTFhcuU3bXcg96l1a7JgQ9a36DWmdyLazjgoK8J4KyT4K2I3onVk9qz3ZbQll7ektq8ybrJqdq-24DcpN6a4Kyf3p3Su9uL3bneoceS3qPgrZjgrKQweNSR4Ky-xoHameCmkdqcQdW9x5TPnxEI36BU4KW7AVTgpqLgpb7grIXgqpzgq4LZqGDco96U3pZl3pjgrJ3cp8Wf4Ki537LCp-CuhtCHc9SR4KeKxoHOrMi626fVhcWq4K6JyoIGw6rgqI_gpb7grKjgrpTgpqDQguCtkeCpmMmizanRrMuIy7LLmNG-4K2H4KOT4KGY4KKY1qA4xYHCsuCjnN2J4Ky5ciLZoOCipMuo4KOW1LLLr-CiqeChrtCA1LJj4KeR14Tgobzgo7nWk2Xgo7_gpK_grrnQn8mk4K2tybvfj-CkieCjj-Cki-CikUTgrIbWneCgqdKLBMeiAsOk4KCu4KW-1YDgrrXgpKPWr8qjZOCvmd2p4KSl3KDFgWPgoL_gp5fgoYHgp5nGtuChhOCrhs204KSx0a3goYrgpLTgoY3gpLbCpdeLdHrRvkbSgeCuveCmrdKH0onWoAbFgcOu1bPgpYzgoIngr4sK4KWQ2JnSo9KlbtKn4KGK4Kef4K-_As2e36_Nv-Clm9K00rbgr6HgpaDSu9K90r_TgdOD4Kee4KWo04nTi9GE4KWsI-ClrjLRvs-v4KuMybTJttKGxpbgo4rgo5bUn8Kuz6DevOCstcOMw7DKicK64KCv4KSN4KiSwpndmsqsypvEld2h4Kum1LLKt82pypfGqsiwZcie4LGe4KOz0ILGus-7W8Sx4LGo4KuP1LLCpcuOW9yw3aHCreCnhSzgsanZqDnMgltkxblh4LGv0IrZqMKpyJpbZ8SDTNKI0bPgsbbgsbjgsbrKozvgsobgsohz173ThmXgso3do-CxueCxsNCCPOCxs8uQyr7gspjZpuCymuCyg-CpveCiruChs-CgreCvltCCPdO34KukxbHgo4jgsYrLteCvkc2s4Kiy4Kiiy5jQm-ChsmngobTOguCtjMa2y61H4LK44LK64KG24KC84KegRtK3wojfkdCV4LKfZcOAwqTgsb90YcKi4K2-wqPgspPDjWXCkMaRxIPgspXKvsOPAOCznQLDi1PDh8KAzKXHpsyoxZ_Om86Kzp3Ojc6gzpDOo86TzqY0yK_Gl8S0ecOZQuCtvjZlMWU5M2RmNzTgoJ44MGE0MWE4MjEzYzk14LSNOWU0z70xMjBmNNKzNjE4N-CgnjM4Zc6C4LSiZDlm4LSFZjM54LSF4LSc1o5vw4DRvkfdtN223bjduuCvr-CinAPCtuCujizgrI_ZndWe4K-34KmT2q_PigN44Ki34LK8y4vCpeCtrOCumeCtsd-J4K6e3pzbiXLgrbfbjSDbj-Ctut-y3qTgrbjfkeC0seCikeCvjeCgpeCpn9-705vgoIDfns-g3IHgsZHCqtiG4K-LI-CnvMKl4KCP2JTgp43QgsKn4K2K4KqD4Kuv2rbWkzngoJzUi9SNz5rgoKLgopFI4K-s4KyI4K-v4K-G4KWH4KyO4KCv1pngtYHgp73grL_GigN64LWH4LW13J_gsr3FgcKn4Kyc3KXgtY_grKDfjt-F3LDFjNG-SeC0tOCtl-CtuNagwrDPoMKI4LS84LS-06jXj-C2iOCslOCnjnzgto7YlOCtqdaTwqngtYvgra5r4K2w3pfgrbLgrJ7bh-C1keC1k-CtuduR4KalxpjgrbzcsOCzkeCtv-Cikd-o2Yzbpse53bbess63A8KO1bPIiTHIi-ClvsSn2LngoJTgtK_Yl8yY4LWF4KiYxbHgtK_UkeCgjOC3huCoh8e606zdu8O4z6DgpYjIheCliuC3j-C3keCvi8ey4LeU4KyW4KK34KG8yKDgt5h64Lea4K-a0JLUkeC1q-C3n-CuquC3iOC3otKL4LaM4Laj4LeOyIrgoK_ItuC3reCwpeCiruCzjmHgt5fNrwN84Le04LON4LKA1JFKx7Pgt4fOr-C3ieC3vQLSjOCwo-CxkeC3qeCgr8mx4LiE3orgqLDgs5hz4LKKbdGz4LiJ3o_cmeC3tOC4oeC4o9Gz0b7gp7vOq-CrjsWdyYxl2ZBlxaPEr9qiw5TgrozgsJ_gtaneg9Kd2KfgtojCo82-4Kuu4KiV3JjMn-C3rsmk4LOTzLfgornguKdH4Kak0bTCpk3guLXFnXnRvkzHs-C4sMaWxpLanc2_15PPnwl-4Li64LGR4LCg4KCv3IHguYDguYLgrYjGi-ChueC5h8an4LmJ4LmD3Jbgt5hI1LjEidSZw4zDutSRReCpheCmkuCqtdWvBeCtnALCnuCpjuClvt2z4KuB4K622ajXhOCwr9mC4LmO4Kam2KzUkUvguJLgt6DguJXVrwfDkNKMw6bguIDgt5DgoK_NiOC4nuCtp8mkxYbMhOC4puCtjcaLwoHGi8KC4LiN4KKJ4LCux5rEoEfClsmdxI4O4KOayLXgs53guqzKpMSOD-C6sOC6r-CrpuC6s8eeAQvguJcBEOC6ss-54LquAcSOEQDgo6XgurPgprUBEuC6sBEBw7_gurPHoOC6vOC6vhEC4Lq50ZXEjhPgurDgu4zgu5DFgSvgu4XgurAUxabgp4XgurPUgwHgu6LEjhXgu4EC1IXgu6fgurAW4Lurx6Lgu5PEjhfFpt2W4LqzL8SOGOC6sBfgu4_gurMw4Lu04LqwGeC7q9iiARrgurAb4LurMsSO4LuoARzgu6Pdo-C6szPEjuC8h8SOHAHgrJjTs-C6s9m54LyO4LqwHeC7qzXgvJbgurAe4Lur4KaWAeC6r8SOH-C7tuCrj-C6szfEpuC6sB_gvJjgu7fFgTnEjiLgvLAD4LG34LKZ4LyzAjvEjiTgvLAF4Ly64LKi4Ly8PN-24LywBuC9g9Oz4LKjxrLgurM9xI4r4LywCOC7nQLYgQEn4LqwJuC8q8eH4LqzQcSOKOC9meC8mOC7pMWB3a4B4L2axI4p4LurQ8SO4L2nASrgvJDZpuC6s0TEjjXgu4QB4L2R4L2UReC6rgXOuOC7h-CvkMuZ4LqzzZcBH-C6vizgu77FgUfgvKngvbYs4LuW4Ly8SOC6rgTEji3gvb7goZlu4Lqz4KSoAS_gurAt4L6HAuCigAEs4L6b4L6N4LyszJnguq7gsJwBLuC-lOCimOC6s9yI4L6Z4LqwLuC-nU3gvb3Eji7gvqPgvZzFgU7EjjDgurDgvprgvZTgor3gopLgurAx4Lur4KO84L6o4LqwMuC7q-Civ-C_gMSONuC7q1XgvrTgurA34LurVuC-kuC6sDjgu6vgqLsB4L-WxI454LurWMSm4Lq-OuC7q1nEjuC_mgE6AQDgurPgrZzgv6bgurA7AM294KuP4Kqi4L2x4KqrxI7gv67Ejjzgu6tc4L-14LqwPeC7q13Ejj7gv7zgvaLgvJHFgV7FhOC6sD_gu6tfxI7gv73Ejj_gv6jgurPgqrgB4YCJxI5B4LurYeGAjuC6sELgu6vZl-C8pwPEjkPgvqrgo5bgurNjxI5E4LqwQ-C-ncewRuC6sOGAp-C9lGXhgKDgurBF4LurwqXEjkfgvLDgvrbgvY3gtpLEjkjgurDgvLfgvJnGleC6s8KpxI5J4LywBOC7lwPgvokBNOC6sEzgu4Hgp4_EjuGBjuC9tAHgv7DHh-C_suC8msilxI4M4LqwC-C9m-GAuuC1hcSOIOC6sOGAt-C_qcaLesSOIeC6sOGAveGBpeC4i8SOI-C6sOGBheGBrOC5oAFK4Lqw4L2A4YGs4LqjAUvgurA14L-v4KeM4YCExJrEjuGBu8SO4YGMxaZnx6Z1zorCkMKm0YNuZuCyucKAwqfTg3LFh8uI2b7DmcKZ4YKZ4YKZwpo"

function Module() {
  var that = this;
  this.size = [200, 80];
  this.properties = { enabled: true, title: "Wallet", color: "e91e63" };
  this.enabled = true;

  //create inner graph
  this.subgraph = new global.LiteGraphJS.LGraph();
  this.subgraph._subgraph_node = this;
  this.subgraph._is_subgraph = true;



  this.subgraph.onTrigger = this.onSubgraphTrigger.bind(this);

  this.subgraph.onInputAdded = this.onSubgraphNewInput.bind(this);
  this.subgraph.onInputRenamed = this.onSubgraphRenamedInput.bind(this);
  this.subgraph.onInputTypeChanged = this.onSubgraphTypeChangeInput.bind(this);
  this.subgraph.onInputRemoved = this.onSubgraphRemovedInput.bind(this);

  this.subgraph.onOutputAdded = this.onSubgraphNewOutput.bind(this);
  this.subgraph.onOutputRenamed = this.onSubgraphRenamedOutput.bind(this);
  this.subgraph.onOutputTypeChanged = this.onSubgraphTypeChangeOutput.bind(this);
  this.subgraph.onOutputRemoved = this.onSubgraphRemovedOutput.bind(this);

  //this.subgraph.configure( obj )
  codec.decompress(compressed).then(json => {
    this.subgraph.configure( json )
  })
}

Module.title = "Wallet";

Module.title_color = "#"+(defaultColor);

Module.prototype.onGetInputs = function() {
  return [["enabled", "boolean"]];
};

Module.prototype.getTitle = function() {
  return this.properties.title
}


Module.prototype.onDrawTitle = function(ctx) {

  if (this.flags.collapsed) {
    return;
  }

  this.title_color = "#"+(this.properties.color)
/*
  ctx.fillStyle = "#555";
  var w = global.LiteGraphJS.LiteGraph.NODE_TITLE_HEIGHT;
  var x = this.size[0] - w;
  ctx.fillRect(x, -w, w+1, w);
  ctx.fillStyle = "#333";
  ctx.beginPath();
  ctx.moveTo(x + w * 0.2, -w * 0.6);
  ctx.lineTo(x + w * 0.8, -w * 0.6);
  ctx.lineTo(x + w * 0.5, -w * 0.3);
  ctx.fill();*/
};

Module.prototype.onDblClick = function(e, pos, graphcanvas) {
  console.log("MODULE DBLCLICK")
  var that = this;
  setTimeout(function() {
    graphcanvas.openSubgraph(that.subgraph);
  }, 10);
};

Module.prototype.onMouseDown = function(e, pos, graphcanvas) {
  if (
    !this.flags.collapsed &&
    pos[0] > this.size[0] - global.LiteGraphJS.LiteGraph.NODE_TITLE_HEIGHT &&
    pos[1] < 0
  ) {
    var that = this;
    setTimeout(function() {
      graphcanvas.openSubgraph(that.subgraph);
    }, 10);
  }
};

Module.prototype.onAction = function(action, param) {
  this.subgraph.onAction(action, param);
};

Module.prototype.onExecute = function() {
  this.enabled = this.getInputOrProperty("enabled");
  if (!this.enabled) {
    return;
  }

  //send inputs to subgraph global inputs
  if (this.inputs) {
    for (var i = 0; i < this.inputs.length; i++) {
      var input = this.inputs[i];
      var value = this.getInputData(i);
      this.subgraph.setInputData(input.name, value);
    }
  }

  //execute
  this.subgraph.runStep();

  //send subgraph global outputs to outputs
  if (this.outputs) {
    for (var i = 0; i < this.outputs.length; i++) {
      var output = this.outputs[i];
      var value = this.subgraph.getOutputData(output.name);
      this.setOutputData(i, value);
    }
  }
};

Module.prototype.sendEventToAllNodes = function(eventname, param, mode) {
  if (this.enabled) {
    this.subgraph.sendEventToAllNodes(eventname, param, mode);
  }
};

//**** INPUTS ***********************************
Module.prototype.onSubgraphTrigger = function(event, param) {
  var slot = this.findOutputSlot(event);
  if (slot != -1) {
    this.triggerSlot(slot);
  }
};

Module.prototype.onSubgraphNewInput = function(name, type) {
  var slot = this.findInputSlot(name);
  if (slot == -1) {
    //add input to the node
    console.log("onSubgraphNewInput",name,type)
    this.addInput(name, 0);
  }
};
/*
Module.prototype.updateInputs = function(index,name,type){
  console.log("UPDATE ",index,name,type)
  if(this.outputs[index]){
    console.log("updating an existing output...",this.outputs[index])
    let newOutputs = []
    let oldLinks = []
    for(let o = 0; o < this.outputs.length; o++){
      //newOutputs[o] = this.outputs[o]
      if(o==index){
        //newOutputs[o].name=name
        //newOutputs[o].type=type
        newOutputs.push([name,type,null])
      }else{
        newOutputs.push([this.outputs[o].name,this.outputs[o].type,null])
      }
      let currentLinks = this.outputs[o].links
      let linksArray = []
      for(let l in currentLinks){
        let link_info = this.graph.links[currentLinks[l]];
        linksArray.push(link_info)
      }
      oldLinks[o] = linksArray
    }

    console.log("NEW OUTPUTS",newOutputs)
    console.log("OLD LINKS", oldLinks)

    for(let o = 0; o < this.outputs.length; o++){
      this.removeOutput(0)
    }


    this.addOutputs(newOutputs)

    for(let o = 0; o < newOutputs.length; o++){
      console.log("REWIRE ",oldLinks[o])

      if(oldLinks[o]){
        for(let l in oldLinks[o]){
          let link_info = oldLinks[o][l]
          let target_node = this.graph.getNodeById(link_info.target_id)
          //console.log("CONNECT",link_info)
          this.connect(o,target_node,link_info.target_slot)
        }
      }

    }

    console.log("FINAL",this.outputs)
    //this.onDrawBackground()
  }
}*/

Module.prototype.onSubgraphRenamedInput = function(oldname, name) {
  var slot = this.findInputSlot(oldname);
  if (slot == -1) {
    return;
  }
  var info = this.getInputInfo(slot);
  info.name = name;
};

Module.prototype.onSubgraphTypeChangeInput = function(name, type) {
  console.log("onSubgraphTypeChangeInput",name, type)
  var slot = this.findInputSlot(name);
  if (slot == -1) {
    return;
  }
  var info = this.getInputInfo(slot);
  info.type = type;
};

Module.prototype.onSubgraphRemovedInput = function(name) {
  var slot = this.findInputSlot(name);
  if (slot == -1) {
    return;
  }
  this.removeInput(slot);
};

//**** OUTPUTS ***********************************
Module.prototype.onSubgraphNewOutput = function(name, type) {
  var slot = this.findOutputSlot(name);
  if (slot == -1) {
    this.addOutput(name, type);
  }
};

Module.prototype.onSubgraphRenamedOutput = function(oldname, name) {
  var slot = this.findOutputSlot(oldname);
  if (slot == -1) {
    return;
  }
  var info = this.getOutputInfo(slot);
  info.name = name;
};

Module.prototype.onSubgraphTypeChangeOutput = function(name, type) {
  var slot = this.findOutputSlot(name);
  if (slot == -1) {
    return;
  }
  var info = this.getOutputInfo(slot);
  info.type = type;
};

Module.prototype.onSubgraphRemovedOutput = function(name) {
  var slot = this.findInputSlot(name);
  if (slot == -1) {
    return;
  }
  this.removeOutput(slot);
};
// *****************************************************

Module.prototype.getExtraMenuOptions = function(graphcanvas) {
  var that = this;
  return [
    {
      content: "Open",
      callback: function() {
        graphcanvas.openSubgraph(that.subgraph);
      }
    }
  ];
};

Module.prototype.onResize = function(size) {
  size[1] += 20;
};

Module.prototype.serialize = function() {
  var data = global.LiteGraphJS.LGraphNode.prototype.serialize.call(this);
  //console.log("SERIALIZED",data)
  data.subgraph = this.subgraph.serialize();
  return data;
};
//no need to define node.configure, the default method detects node.subgraph and passes the object to node.subgraph.configure()

Module.prototype.clone = function() {
  var node = global.LiteGraphJS.LiteGraph.createNode(this.type);
  var data = this.serialize();
  delete data["id"];
  delete data["inputs"];
  delete data["outputs"];
  node.configure(data);
  return node;
};

export default Module
