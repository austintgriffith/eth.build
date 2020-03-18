const defaultColor = "7e57c2"

var codec = require('json-url')('lzw');
const compressed = "wofCrGxhc3Rfbm9kZV9pZMONAcKQxIHEg8SFbGlua8SLxI0DacKlxIfEiXPDnABBworCosSMxI5IwqR0eXBlwq9DcsSqdG8vS2V5IFBhaXLCo3Bvc8KSw40CHMSOSsKkc2l6ZcKCwqEww4pDU8KZwprCoTFCwqVmxIJnc8KAwqVvcsSJchbCpG3EiGUAwqbElXB1dMS_woPCpG5hbWXCrVtwcml2YXRlIGvEtV3EqMSqZcKmxITFtm5nwqTElMSWw40DXcWtxa_FscKoZ2VuZXLFuWXGgMSrw7_GiMSVa8OAwqdvxarFqcWrwpPGjsWwZcKrxbXFt8aXxbzEtcaZxoLGhMSVZ8Klxolrc8KRxYHCuMamxbHCqsWpYsSUY8atecavxoN0xoXGs8a1c8OAxrtlwqdhZGRyZXNzx4TGscaGxrTGnXPClMWBwqfFgcKqxYHCr8WBw5nGvXJvxKtydGnHk8KAwonEpMSNAcWFxKnEq8KuTcSIdWzHky9PxqLFqsS8xL7FgANIxYF2xYbFiGXCksOMwrQoxZbFmMWaxZzFnsaVI8WixaTFpsWoxarGt8eMwqDGrwDGnMaKAsKlx6XHp8aVx6rHk8KBxa7Gp8Kqxr9vY2tjaMS5bseuxKUBTcavx7XHt8e5c8e7x710x7_Ev8aLwo7EjjbIhsWJyInIi8iNYcWZxZvFncWfH8iUxInIlm7Go8iZyKjFscibx7PFpciea8edyKLHqMilc8inxo_HjcePx5HHk3PEo8i0Tsi3VceqbMi7RnVuY8eqb27Iv8WABMOixI5oyYXFisWMw4zDpsWTxZXFl8mKyI_JjcaVJMmQxaXFp8mTyJjGpcmWZcmYxoHCqGbJssm0acm2yZvFgcKox4zCpGNhbGzGr8abxrXFgcKpx4zHjseQx5LHlMeWx4bGssqbAsKqxqDIvcWsypHCpcW4bHXGmMmZAMeZxJbGt8WBwqzImsqkyr_GtsOAyZ7IpMerc8KCypHCp2LKoWHJs2XCqWFyZ3XFsW7Fq8KQyanHsE_Gr8KsScqOdC9CxarEscm3xL3JgMm6xI7CpMm-yInDiDLJicWZwoHCqWNvyqJhcHNlZMODyJDFnxDKi8mSyZTCkcuEyZnKpcadxYHCq8q0dMmUwpLMiMaBw7_LhsuBAsqoypHKk8Sry49vy7lly5LMlcuIxbXIo8epy4vCg8q4yqHKu8KoY8eAayDFscKlx6p0x7nCpsundMupwqXLuMmydMWBFcuexI5Qxq_CrUPJtseGy7kvVGnFscS7y6vFgAUoxI7CuMm-xYsww4zCjMWTGsu0yaHLt8u5xILLvMu-zIDKiHLIncWjyZHMjsyGwoTLjsm2X8eqyK3LhceJxrgCwqvGtGFiZWzCpjMwzbttc8uJzKXHk8KCwqjElcW6csq5w40LwrjCpWV2xpN0xKhpyK3CqGJveMu4bMWdwqQjMs6czL8BUcmsya7JsMembSBXZWnJuMONBcO6xI7Cms2TyoDCoM2YzZrJjMiRcijMhMqNzIbHjMKlyJfOj8mZwqZuy5nNtnLKscKszafImMyHypHCpsahzI_FqseEz4Jtz4TMlcKTxYHCrcWBwq7FgcKzzb_JoMKBwqjEiWPNisqhcxLIs8ewUs2CRGlzcMSCeS9XxbnIr86qBsOCxYTLsMOMw408zrTMgcaVK865zr7Gt82pyaPMmsmayqYCwq3NtM22bMKgz5zLi8KBzLFpzLNlwqXPsXTIr8-mxI5TyLfHtmTHuMe6x7zPjsi-zY3DjQbDvsSOw4zPuMmIyoXJi8-9cizQgMukyZXQhMicyrHCrtCOyKbLjsuQxILLk86eVMavwrbNhG3EvcaUy5vIu1THk3QgRmF1Y2XQo8iAw40Ewog8zrDNlcOSxZMuz7zNoiDQscyQyqnJpcqsx5XPgMeXxofQh8KvyqnHknHKu8SEyqTKscKwz4jFq8-KyaPConR4yq7Hh8yVzbHCsdC4xZrOnlXLocujxqPLpsuoybbOqgR-w4zIm8WHyYbDjMuy0ZzOtgHRn8-JzJLGmsmbxp_PjdGgzJnNr8eazbHCsNKWx43OlMyezKDHicyix6bJn8ymzKjKumXMq8ytzK_QlMyyzLTMtsy4zLrLmwHQmQFWz6nPq8-tYc-v0JbPs9CkBcK00ZbSjciIxosxz7vQrMqHzrYm0pTRs9CDxqfQhcid0IfCsdCKzbfQjcyj0qnIptCR0JPQlc-yaM6eV8avwrDRgtGEzo7Iu1DFttGPz7RKxYHKo9OHzZTDjMK-zrPTjM61xZ8C05DQs8anwqhbc3nPksu5xb_RpcqvxobSmNGy07zJl8-Qz4PGlcyVxYACwrLFgcK00b7HrcevxI5Y0rzPrM-uz7DToc6qB8KKxYHDhs-4w4jTi8iO07jGlRHTu8KR05LUi8q9yrHCstOY0IzRvtCQ0rLQlNOB06LUlwFZzYJNxbloL03HuMeqz6151J9sxYEwy7B41KbKhtSoci3Tu8yRypHCoUHUjM-SxpXKscKzx4zCoULVl8-EyrHCtNSJ0bTGp8KhPdWf1I7HidSQwrXFgcK20b7Cg9WVw4s_WMOPA0YVF8KR1Z3Di0BgDcKpBsKhJk3Cok9QwqEqzp5axq_Cr8-q1JvSvy9EzZ3LlnPOqgh6xI7Dls-4wr430pHFny_Uq9Kh05XMiwLCtdWj0qHPgdSNcsyh0b7ChMKryKvIrcerU8iHMsapxILRj2jLucWfwq_OjsaVIMW6eNGKaMaV0rHQkse5wqfWksu6cnPSq8q71bLDiMOkMcKNwpgcwqHSuVvQnMi50KDIvdaWyYICYtCqyIzTt9Cu1YrNpcqM0IHVpNSuxoHWo8if1a7Tm8uK0LnJo8KjVVNEzp5c06XOp2IzzYjGlm5zYcqY0ofQpAbCuNGTzIPTssqAw7DFk8OMwrrWnsaVLtO7wpnHjMKsW9awyK7IsMSV1ITGgceFx4fKscK32JTFtMW2xbjFusW9edibxKvYncqw0IfGusqRwqRbxLHYqMaw1IbRp9akwrnKqVvKucq72LLCrc-Rz4Qs0abKscK6x4zCpltkxblh2LLYqtSH0IfCu8eMwqpbZ8SDTM2K0JLYvNi-xpXZgNi0yrHCvNmP2ZHEg9OrzpFl2ZfWqtma2J7Qh8K92LjEh8uT2aTVmNCv2YHGtceL2K7Fh2du0a_Qh8K-1InKkMmjwqvHhsuS2IDYgtm2z4BvYmplybTModmE2bTGlGTRucay0bvFgcOI2opp2bXLvtKdy4DNscOH0b7CiNeNxaXEnMm20Y_DgMKk2Yd0YcKiMHjCo9mSc8ONZcKQxpHZoNOsZcOPANq1AcOcw6LChQDCqMyjdsSMxpXDmT1ozLfLvDovL23IscaUdC7ElcqWxpbbjcSydte8ZTU5YzQ2NGMzzpxmNDdlMjk2M2Y1Zs2726U4zbYyZjjHpcarxbrEtHnDmULaqDZlMWU5M2RmNzTahzgwYTQxYTgyMTNjOTXcjTll25thMTIw25_bqjE426HbnDhly77cn2Q526lhZjM53IU2MdG2b8OAzp5fy6HJrWnJr82Ib86mzqjOqgXCjNGT2JHYic2VwqrTttSn0K4h1qHKt86-1ajPhdCHwr_Wp8-L0prPj8-A2ZjWq82wxYHCutS0z5_ah8-iya8Szp7XoMmZwrTTp8m206kvR8SDxLfastKIzLwFwr7Rl9O00ZrYj3IS1ZLYuM-s3KBk2YrZsNakw4HYoW3Vg2nPrcerctmK3ZLKscOC3Y3QtN2R1qrUj8WBw4PFgcOE1JXOnmPGr8Kq0oPFqs2IZdeBzqoCw6TOq8KMy7DEjizLs9ejzaID3YbeiNer1Ijdj9Gz1qjRptqQAsOB1q3Wr86Y1rFl1rPFida10r7WuNa6xpXWvMub1r7XgNeC14TTnse5wqTRiNeB2p3CpGbEks6e2o3Jmcuiy6QvTtaqzqrIgtClGNab3qLdg82iBN6m05PQtdmx3offnt6J2a7ersOC1a_WttiBZda5bMWfwqEj34PGgt-S36TYusaCMS7NuzAx0rnKvMaBwq3WjtK-04DUntOD3LwGyYTTh8ux1Y3Qrc2iHNSr1K3Kkt-f1qTMgMSC0IvTmtKo17DJod-w06DQl9S5yLRmzYLcs9y1VNy3R3fcudODUM6rRt2tzrIxzZneo862Hd-dzLDdiN-j1aDQh8OE36HFsc-MyL3did6uwr3dl8-g3ZrPpM6eyb3JmcKu4KCgybDKl8m1y6rRkgggxovDst2tyoLFlN2wMdO72bvfosqUypbJs-Chi8qxw4bKnsqgyqLZt9akw4fak9qV343YnN25yJ_DiNSJ1ZPJo9-Iyr3eiwLDi8WBw47SocyU0qbRvsuNyaPFhsaTZMuVy5fLmdOpy53UumnOody04KGJ4KGcypngoYzJgAnDrMaLeuChksqD3bAy4KGX0qHKleChiuCii8qxw4ngoaDKocqjzInKscOKyp7IsHPgoYXgoanZm9CHw4vgoa3OvN-0yJzPlMWBw5DFgcOVxYHDl-Cht9as16_OgMuMypHZvde-2oDgoYvgooDLmMuay5zOnmrgoofctcmx4KKK2IPRkgoK0ZPCiOCikuChlOCgr8WfM-CiltKcyZngopjgo4nZttCHw4zgop3goaLgoqDQh8ON4KKjxIPgoqbYqeChqsmcAsOO4KKryrfgoq3gobHVqsWBw5HFgcOW4KK24KG54KK4yaDgobvGp8Knx5LRj92_dOCjgOCigtGG4KKEyLRr0oLfkNK04KOKyYAKFNGTGtSk35nVjtCuE-CgsuCgj-Cjn9akw4_go6rep8aa4KGyw4rFgeCjoeCjlsaBzJzSpG7gorfgoJbgornMp9-00q7OkcyuzLDUtsy10obgpKLStsy8AcKEzp7gop_fvc2Ey5vHpmzNiM2KxpXOqglW0ZPKity_zZbdguCkj82iBcyE1aPgoI7GoG7NrOCkqdqXxrbNscOP1LLNud-4zb3gobrOg96-zobKoc6IzorOjM6OzpDOks6UzpbLuc6ZzpvOnNK5bdSa4KCA1J3goJvOqgsixovgoJ7goIfFgVhk3bA04KCN4KSexKvXrOCjp8OQ1LLgoJXMpM-d4KCZ1LjSudqC373fv9Sc1Ljgpa9A0ZN-3p8C4KW23bA34KW64KSY0IbWpMOR4KaA1LTgpoTToc6eb8i3U8SxxpbGktWBZcWjxK_WlsOe0KVe3a3Nl-Cgrd2w4KSM16bMhdKVypHCo8u9zr_eqMqmA2fgoLll2qrRkOCirt2UAsOq4Kab4KSsTeCmpsWdec6ecMavwrHgpLfNhuCkuuCkt2TQkuCii86qCjLOq8O63a3Fi9-23bAn3bPVlNWWyZnCrdGmLN6E4Ka6ZtWc1Z7gp6Pgp6Xgp6fWpMOU4KSXxqfEqHLKu8av4KSgx7nSpcea2bLgoa_gpZ_Lm-ClkMyWw4XVr9WVw4DVnQHWhVDCoiE90rlx15nQnsi6yLzQouClr17goZDXod2wNeCkktOUyrHDldS0ypHRtnjSuc-F4KGG0J3Qn8i70KHGo-Clr8KGzqvIneCgh8iK16Lfms62OOComeCgkMifw5bgqJ3Jo-CjudqHzqhwdM6e0aTGgcKvT9qF2ofLpeCjtdWG0KQLfM6rwrTWmx7dsMmE4KayzrrgprTXstqE4KOF1K_Qh8OX4Ka90IXCoOChssOYxYHDmuCmm9-02p_Lk9K54Ka4xKvfvtK94KaK4KCC0ZIMwrzOq8KW1KTgoInTjcWfOeCmleChmeClvMqxw5jgpprgo7XQj-CmnOCgm86eddOl4KGIL1JMUCBFybPFpM6qDNShBt-X4KWD07Uxft2wOtO7wpbWosqxw5ngqpnQh8Oa4Kqcxp3gp7vgqbfgppfEluCqodeq4Km42bHgqp_gqqTgpr3goLvQotqOx5jgp4LDm96Q1LrIhcmZwqvErsSwxLJI4KOjzqoNyYIGDtWL4KmO4KOSxpU74KSSzr3LpM2C4Ket1qrKscOb4Ka9wqTgoqTgo6TYs9G64KOuAsOcxYHDndSV0rl34KWr4Kmq4KWu0KQOas6rwqrenwPTit2w0ZbgqZHXqOCgjuComtCHw5zgqbvgpKTgpoPUtuCgmsivzp7RuMmZwrDgpqHHhy9TdWLgq7nGss6qDsm7Bs6v4KqR4KKT4KuDctWn4Kup0LLgoZjgoLrZgeCpl9akw53OvMSEy5bgqabGguCnrsifw57ZhMe5xoZ04KuR1qnZrt6pyrXXqcaC3qrgqq7HiNKexYHDoOCmm-CslMepGs6ex4Pfjt6Vy6Xfss-E4Kq8w5TQpcOC35jdsAbgqLPgrJDgqqreqtSK4KST2Jzdkt6uw57fp96536reu3Lfrt-wwqbgrLXUjt-0wqIyNs6e4KKR4KGG4Ku_xoYv0YJixJXgpr7QpBA20KXJveClg-CmrsqE4KiwxZ8-4KOVyaPVleCotOCjp8Of4Keq4K2u4Kyq1ZxD4K2u0pngrKPZhOCsptSF4KuTx5rUkMOhxYHDouCqssi0e96T4Kyz3pfemdCkD8SNBiLLsGs43bAH4Ky-4Ka54Kqg4Kma4Kyn3q7Dn96x2JfWsta036jeut-s3rzWvXLWv96Y34HHkt-w34XgrqXandqn4Kig1Lp81ozgponWkEHKq8mnzqoREuCmq96fAVRQ3bA_4K6T4Kqn1qTDod-n4K6b3rXgrp3grYnfq8Wf4Kmc1LbCp-Cus8mmx5TSuX3gqI7gqKXgqJHgqKjQpBEm0KXDtOColuCsiEDgr4DgqqPgo6fgroHgqbzXsdO9y7jgpLjYgeCovdS64KaP4KGG4KqD4KOI2oHSiELFgcK84KOQ0ZvgrIgl4Keg4KaW4KOY2oHKscOj4KOd4KS10pfQh8Ok4KexzLDgo6zXq96uw6bgo7Pgp7rgobrgorvYl-CtkHLgo77go4Jz4KSBx7B_4KSE0oTgpIbgoozJuTjFgcOu4KSN3bAU4K-fzIrIn8Ol4LCD4K2D4KSZ4KeCw6TSoeCnt8yf4KSi4KO04Kuw0qrgpKfMrOCkqdKw4K2O4LCYzLnGocubw4zDmdK5woDgq5zWkOCmi9ODxI0CwqjgqbHdsCngqbbgqqbgr6DFgcOm4Kuv4KaC4Km94Kuy1LjOnsin4Kej4KeP4KS54KS7zYvSiBDFgcO44Kat4KWF4KCKzrYI4KWJ4K2B1KzNquCljc2t4KSDzInersOl4KWUzbrNvM2-4K-jy4zgpZnOhc6HzonOi86N4Ke-4LGnzpPOlc6X4KWmzpwyzp7LjcmZ3pTfkN-G0ZHLrOCijwPaouCltAHeod2wF-Cvn-ClvcaLX-CuluCtu9qP4KeCwrngrpres2vgrpzet-CunuCtiuCuoHLevc6F4K6k14Eg14PgrqfUtuCuqd-H37Tcr9S6xa3grLLfkOCwjuCvsOClgeCsu-CsiN-X4KyLzrvgpbvgsYoDYeCylOCthN6K4KeCwr_grYjWt-Cyn9-t36_gpKzgsI7ancWMzp7NqeCyguCuhuCyhdKIwrrRk8KS4K664LKN4KyIGeCykMqbA2Pgsr7go6XYtN6uwrvgspnIrOCym-CvhuCyneCviOCti-Cyot6_4K6l4LKm34LgsqngsoXgrqvaqM6ewofNguCmocWdyYpl1pHNt9K_4KS-wojgrrngraXgsZ7gqbPGleCujeCyuOCpk8an4Ka24KeA4Ky_4KOnw6rgpr3gpr_grJbKvuCngsOU4KabxInPrsOMw7rOnkvWjNe617xC4LKayK_Isd6a4K-ZAsKU3a3RmTHDjMKS3bAe4KSS2JXYl-C0ntia4KynyrHDutSJwpfZj-C0rdiZ4KaH4LOe4K28y4DUkMKlxYHYoMqRwqnQu8uS0Y8o4LGH4KOX4KGb2oHersqdy47Zq-C1hOC1huChmuCimcm22onKkcKt4LCN1qrgtYXGr-CvuuChi96u4K-94LWU2b7Xv-CvqOCii-C1mOC1h-C1keCwreCsqQLgopzPi8u9bmTgtaPgtZDgo5neruChn-C1gOCjuuCou3Tgta7Eq-C1muCii96uw4zgobrKquCvj3PCoNq8x6bavsWf24Hbg8yPc9uG24jbitGQ241u249h25Ev25Mv25Xbl9uZ25vbnduu26Dbotuk26bbqNuqM9us26Lbr86eworgroXgsoTgrqXJuNO0xYHdsuCyi-CzluCtqMaVFeCzmeCmulvgs53gq5LgspbgtafDuuCzot603rbbouCynuCvieCuoeClmuCypOCupteF0JPgsqp02p3gtobbhOC2iduH24nElduL4LaO4LaQ4LaS4LaU4LaW25jbmtuc257gtpzbo9ul26fbqTDbq9ut26_SueCjj-Cno-CopOCokOCss8m4w5DCsOC2reC0pMWTJt2wCeCxouCtuMqRyKrgtJ3gtLfSmNqQA1vgqLfIqeC0tsix0rnCi9S915rIu-C3qc2Nw4zDksSO4K6v4KWD4LSl4Lew4KyICuC3s9Ci4K2C27HYpGXYpuC3ud2Uxozgt73GvMaq4LiV2KbSud6e4Lem4LiEL-C4htGSA8KixovCtuC3rjHguI7gtrFyC-C4keCyudG1xLHguJjgrKkDX-C4m2XcrdK5wo3guIPgqI_HuuC4pcmAAsOu0ZPgo4XguIzgt6_dsAzguLHgtIXgsITMqcaY2bHgt7ph4Li52p3SucKO4Li-4K-U4LmByIEq0ZPDmOC4q-C4reClhs62DeC5i96r2K7apGHguLXamMaLY-C4udqj2YjOnuC5p-CysNKE4LKy0KQEYM6r4LiQ4Kitwr7gpI7gsZ_FnxvgtrTMi8Sa4La34Kygz5Pgp4LCvOCzg9-p4LeB4K2M4LOH14bfsd6K4Kmi4K2U37jSucKQ4LmX4Leoy6TUn9SSBt-c4LmH4Lis3bDgq4DgprLgq47ai-C5qMa2yIFmxotn4Lms2ovSucKP4LqU4LmA4LqW0KQDNM6r4KKV4Lqb4Lmf4Lm8xpUP4Lmj4K2C2rBz2ZRt0JLguqLLgcSa4Li54Lq74Lq90JLOnsaH4Lmx3pbgsJjUnwjgoKngsJ7grIgq4LChyrHDheCwpdCF4KG44LWnwr7gsKrSo-CnuOC1psuA0qfgsY7Hk-CkpuC5juCkqMit4LC04KSs4LC24KSwEMyVxKBIwpbFgeC0vQFLAMWE2rXgu64Cx54BSALEjk3gu7XKnMSOSwHEjk7au-C1iOChi-C7tsKpxI5P4LuzAU4Bw7_gu7bHoOC7ueC7u-C8jQLZi2fgu7bCq82A4LyM4LyL4LyQy4LgvIPgvIxRxabdkuC7ts-Xzp_gvIxS4Lu-As-Z4Lyn0JrgvKrHouC8k8SOVMWm0abgu7bgt6wBVeC8jFTgvI_gu7bCseC8suC8jFbgvKrUkgFX4LyMWOC8qsKzxI7gvKLEjlngvKPWquC7tsK0xI7gvYXgvYwB4LqDxpXgu7bVrNS74LyMWuC8qsK24L2M4LyMW-C8qsK34LyA4LyMXOC8tNi04Lu22Ibgu7ngvaXgvZXgvLXFgcK5xI7CguC9peC8luC9rgLgs5IBX-C9pQPYvdml4L21wrvEjsKE4L2lBOC8l-C7tuCprgFh4L2lBeC9vNmu2abGsuC7tsK9xI5m4L2lBuC-i9i_4L21wr7EjmfgvaUI4LyeAsK_xI7Cg-C8jOC9ueC9lnLgu7bDgcSOY-C8jGLgvafHh-C7ts-2AWTgvqrgvZXgvKTejMSO4L6rxI7FpQDgu7bDhOC-tuC8jOC-kuC-pOC7tsOFxI5w4LyCAeC-muC-ncOG4LyABcm84LyF4LWl4Lu2w4fEjlzgvJRo4Ly82pHgv5Hgv4Vo4L204L2oxYHDieC8gATEjmngv43go5ngu7bgpJsBa-C8jGngv5XgobPgv4zgv6Dgv5rgvq3Fgc-54LuxBsSOauC_otqB4Lu2w43EjuC_p-C_tOC_qsOO4L-sAWrgv67gvo7FgcOPxI5s4LyM4L-n4L6d4KKxAeC_ocSObeC8quCjsOGAgOC8jG7gvKrgrLgBwofgvIzgv4Tgp6TYtOCnpuC9j-CisuC_oOC8jHHgvKrDluC_tOC8jM2j4L664KK04YCgxI5z4Lyq4KmeAeGArMSOdOC8qsOZxKbgvJR14Lyqw5rhgKvgvIx1AeGAqALDm8SO4YC3xI52AOGAm8eH4YCd2a7gu7bgq5YB4YGExI534Lyqw53hgYPgvIx44Lyq4KaqAXnhgZPgvrPhgJ4Cw5_EjnvgvIx64Lyqw6DEjuGBlMSOeuGAveC7tuCtvwHhgaHguIrgvKrJu-GBq-C8jH3gvKrDo-C8gAPEjn7gv7bgvIfFgd6cAX_gvIx-4L-qw6XEjsKB4LyM4YG-4L6dw6bhgbfgvIzCgOC8qsOqxI5v4LyM4YCY4YC-zq0BworgvIzgu7LgvoTGi1vEjsKI4LyM4YKV4YCoxozEjsKL4LyMSOC-rOGAg-C4t8SOwozgvIzgvbLhgp9hxI7CjeC8jOC-oeGCn2PEjsKO4LyM4L6B4YKf4LqlxI_hgJnhgYXgq4rhgYnguqbEjsKQ4LyM4YKP4YKfacSOwo_gvIzgvojFpmfHpnXLvMKQwqbgr6Zm2pTCgMKnzo3Xi-Cii9Wyw5nCmeGDm-GDm8Ka"

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
