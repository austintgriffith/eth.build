const defaultColor = "7e57c2"

var codec = require('json-url')('lzw');
const compressed = "wofCrGxhc3Rfbm9kZV9pZMONA8K3xIHEg8SFbGlua8SLxI0FwovCpcSHxIlzw5wASMKKwqLEjMSOacKkdHlwZcKvV2ViMy9CbG9ja2NoYcSVwqNwb3PCksORw78uw40CwrLCpHNpemXCgsKhMMOMw5LCoTF-wqVmxIJnc8KAwqVvcsSJcg_CpG3EiGUAwqbElXB1dHPCkcKDwqRuYW1lwqxbYsS0xLbEuMS6bl3EqMSqZcKmxIRyxJVnwqTElMSWw40EYMKnb8WoxafFqcKWxazFrsWwwqrFtMS1xLfEucSVxbvEq8W-dMaAbmfCpcaEa8S_xoZpxoZ5xo_Fr2XCqWJhxIJuY2UoKcaYZcKoZnXGrnRpb27Gn8SVxqHCkcaGwobGp8WwwqfEh8auxrDGssSpxKvGtca3Y8a5xrvGvcSWc8OAx4Nlwq3Gk8S2TnVtYmVyxrHGs8eMxrjGusa8xqDFqsaGcceVwq3Gm2Fuc2HHjsekx6DHisa0xrbHo8eQx6bHgARhx5XFvmVuZMezxbzHosexx7jGvsenBGTCqnByb8Srcsa5ZXPCgsKnYWRkcsiSc8KgwqjIjG92xIzHnsK7aHR0cHM6Ly9ycGMuZXRoLmJ1aWxkOjQ2MjM0xKPEpQNqxrPCrlXGuWxzL0bHjcePbsS8xL7FgMO-w4rEjsOoxYfFicWLxY3DjMOmxZFCxZTFlsWYxZrFnMeeN8WgxaLFpMWmxahzwpPHlcKgx6HHtsiFbsaDxr7Ghse8xa3GqMKkY8asbMazw7_JscaFBGLHlcKkxLlzaMazxprGnMaCxqDGhmPGicaLyajCkseVwqV2xqx1ZcazAMeRxqHClsaGwovGhsKNxobCj8aGx7rCl8aGwprJq8m7ypnHk8iLyI3Ij8iRyJPJtcWwwqvHrMeux7DJjMKpYXJnx5vHv8WpwpDIv8SNA2vJg8mFyLbJiMmKx7fJjcS9xL_DkcO9bMaGdMmVxYrFjMWOyZoxyZzFlWHFl8WZxZvFnTbJpMSJyaZuxozJqcqnx7TIhMmMyb1rxoZkyoHJuGzJuse0ybzKigRlx73FiGduZWTKhsW_xoHLqcaGZsqNyKbKj8qRypNsypXKl8qpx7pjy6XFvMO_yqnDgMqryI7HnsquwoLKsMqWc8e_ZMq3yrnKu27Kvcq_xI7LsMW8wqxJy6LFqMSyxah0xrvJjsuLw75mxoYay5FlwpLDjMOIMsmdy5lzwoHCqWNvy69hyKfLusODyaDFnRjLn8WjxaXMp8WpxavMl8msy7HLvwRnzILLo8qQzY7KqMe5xobKgM2Xx7TCp2JvzL9lx63MkMySyq1pyJLCg8qSypTGtGPElMS2IMWwwqXGuXRsxb1CzKrHkMy-xrd0xobDusyhA23Gs8ylzYvMqcilzKzLisWAw7xyxoZMzLPMtcy3zLnLms2Fx54zzYjLocujzY3GkGXNj8yOzZFozZTMhM2czI7MisaGy7XOosSrzZ7NoM21zaPHpsyRyJ7Nps2ozarMh82sza5rzbBlzbJpzbTNts24xrzNusyfIM2_ybDHtMKwxK7EsC9Ucsetx6_Jr8ytwpLEjirFhMKozLPLk8OMw7DFkcOMwrrOkcmfy5zHni7Ols2Ky6PCmceVxbLHmMaVxbjFuse0yofLvsuzac-kW8iMacqTdGVrZXnPqcW8z6vGnc2RasqBW8yrz7nGmcu9z7zLs2vHlcKnW8yGypXQgseWbsebx51yLNCEyonJsgRsx71bZGF0YdCNz7vQlcm-bceVwqpbZ8SDTGltzrrQjcKt0I_HnMee0JPGm8-s0JZu0KTQpsSDUMaAxq_QrdCv0JHQssqIzZFv0Ihbx4bQvMaz0K7QkNCx0JTLqceUzJfJlcu4ybvNkXDOoMWpyarMl8qyz4rKtMmvyoZvYmplx47OpATCo8u2acu4y7rLvNCzxp3Ro2bRptGoy7vLsdGjaM2lzJTNp3PCiM6yypXKmNGGZcOAwqTQm9CdwqIweMKj0Kdzw44AA8OQwpDCqNKH0Lppxq_Diz50wqvDrcOJBlAMyJ3IjcigxZ3Io8ilyKfIqciryK3Ir8ixyLPItci3yLnIu8i9yqvPstCcZUvPt8OZQtKEYTHSuDYxMzc5NmJiOWNj0roxY2TGqzA1OGHTi2U3MjRhNsi7NGbTljDHndOMMGNmMTDStzAzZjNk05Ay04w4MMKizKvCoMKJxKTLgG_Gs8KwQ29txL3LucyfyYhDxpbLicmPw5HDvnDFhBzOjsONAcKQZM-by5vJoXIAzpbRlcWqzI3Qg9Grxp7NmcaH0bXIkNG3zanNs821wqXTvMW4wq3Mmc21x47LulbNq9KgyKbIqMiqyKzIrsiwyLLItMi2yLjIusi8NNG6ZdSo0qLUq9Kl1K7SqNSx0qvUtM2_cMuDyYbLhsmLx6TPjsuMMMWEw6TPlMmYy5Uu1IrOk3LUhMWhy6DPoc6hzprOnMeLya7LqMuzx6nRj8uuzKPEq8uy0JZy1JDNls6a1LbMidSWdNSSZcyPzq3UmMyV0ZjPpsea0LByzJzKusWw07rKvtOwxI5xzoLMpsaMzoXMq9O-y4vDvCzEjgLOjsy2zLjLmM6Sz51yEM-gyafNjNWu1aTJvnPVp9aX0aNy1a7Oqc2hzqzIh86uyqzRts6x0IvOtNKRzrbNsdSczrzOhs6-xorMn8ONElrNv3LRiNO1zJ_IjWzPiNCqx57ViMO7HsSOFtWNxY7CjMWRGtWR1pEB1I_GisyDzYzChMyXxoluX8a5xLbNmMiHx7pzxp9hx51swqYzMNeibXPVstG3woLCqMSVz7RyzIbDjQvCuMKlZXbKvMSo1qrCqM2feMy-xLTWtyMy177Tr8mAc9GIRGlzcMSCeS9X0JzEuNWIw79MxI7VgsWIxYrOjzzXitSMxrLVlc2J1pXFqteR1ZnKl82RdNec157CoNemyJLCgc65zrvCpdiLdMS4zb_LkMe0wqrWgsyoVGV4dM-O1IZUxYR21IUBLNaOyZ7Ui8WdEtaUzYvUkc6nxaPLvwV_1JDOmcao1ZrFvdCUyqnPjwTLqgTCk9imc8KEwqvPps2nU8mWMsKr2IfHsGVozL_FncKvyrzHniDPtNi3IGjHns641q3TrG_UtsKgzb911oHOhNW20JHYuQFKxYTDrtaMwr7Zgcy62YPHnhPZhs6Y1a7UjsqKBcKB2Y7VrsKm0L7HntGjd9mawoPZo8SCxq_Zp8i3x57CoSPYqdSd1KbOs9S2xY3Nv9i9x7TCrMuEyYfPiG8gxK5p2LkCw5rFhMO414XDjMKq14jPm8y817rEgs2CZM2E1pEg2ovJqNmPzbHWlcqG2pXWt8uzd9qSzJfCpteOxozbi9GKctGjbNmawoHCqMSJY9CqxqxzEs2_d8az2LLOhNi12LfZv9i7A1LYvtmA2JfFnRTbhtaW2YnajsmyBcKD25DYn8-q2ZPUlm3Zmtmc2Z5l2aDFitmi2aTandmox57Zqsyf2azZrnTZsNmy2qPKlkTQnGHUttKDeNiAy4B52IPYhdmk2InYrNiNzojUgMK2xobDhNi-XdiW1o_PnNSMJ9uz2J3btc2RetijZWzYpc6v1qbMu9yS2KvYjGjNv3rGs8K007XTt8a7yrzJiEfEgyDSkMav2b_DgsaGwrDaucK-xZHVkNyr2ohyEdyv1ajGqNCJ2IZly7rQn9GMy7N7z69tdWzGudiHzady0J_bjM2RfNu62ZDbldW32ZTGhsKBxobCgtmawoDNv3vbpdizdM-I2LbYuM6IbsaGftuu2obWkNSM1ovYms6X24fajdGN3bDFsNmR0KDRo3vcgNmdxbVr2Z_Zodqb2aXantmp2aty2a3egdyQyJncksKk26jYotaowqRmxJLNv3zZu9aD2b3Wv86IxY_GhsOY2oTeiNysxZ0D3K_biM6b2KDGoMOA3pHfgM-q24zRo3zamd6d3Ijan3LaodySwqbes9uX1qjCpjEu16IwMc2_fd6xzKjfktm_XsSOw4rYvgAx27DHnhXevt6P2o_Chd-E3pPfh9SWbt-K3IfZptyJ347aotatwqXQqdCr3qrNq9KJ0ovCkNyaxI7ehse0wq1NxIjdpsiSL92-z45a2LzaucWQMSbfp3IE143Kjtu0zprZtdGNzqTZjNuazJfZteCgggN_0YjgoIdk4KCJyYjgoIzOiFDat-CgkMWR4KCT3ZXVkgXgoJfXj9mI1aneq9-C4KCdwoHgoJ_goLfNq-CgosKA4KCl4KCIzbXgoKnNi8-Oy4Bc4KCu4KCS4KCUBuCgtNqM0Y_SgWHgoJzNmdu44KC8ybbgoZDgoKLCgcmD4KCm4KCoL0_goJjatMO4w7bWjMK0KOCglCvfqtyxy7N-4KGVx4TIlsiYyJrNv8yWx7TCsdqtyYhU2rDTvNGhxqHHm9q0HNSO2JPJl8WOw4javOCgsdaRJOChqNWp24rHtNu2yb7ZjduT3o7bkeCij9iwz7rbvdeZ3oXdueCgosWs4KCF4KGb4KGD4KCL4KGFzojgoI4D36PgooDPleCgkeCgsNmC1ZIH4KGN4KKQzprSjtCo0KrOuuChkuCilgXCheChrMa00offu866zb_Xkdqr3b7WhM6HyY_EjkjEjsK21ozOkOCihdSMKuCiiN2xzZDLs8KA1pvZidWw4KKWBHDWn82f1qHHpciHwpDamdS2wqjNrdaqzrffkM231q_Cpc6_3I_Nv8KF353dv9-fzojPkt2P3rngoJQd4KOL3pLfgdCW2pHgopLgoLbgo4zPut-w1qPfs9qc37Xfjd-P1q3CpEd3ZWnUtsOLQFNAfigkC3jNv8KGxrPCr-ChtcmJyI1tIOCkheCkh9q0w4bEjj7aucK04KKEyZ7avsy_24DMmduC1ZIe4KOzzrjgoorgo7vbls2RyJTgo7jev9uS4KCY3bLQkdGjb9ua25zRodufyYcS4KCiwofTs1PMq8-KZ2UvRG93bsS0yJbViMO-SNSA4KSh4KKkyZjgoJFO4KCUId2ZyoHgoZDgo7XJvsKDx5XbnOCljOCljm_IltGS34LgpLxmyLbHv8aowqxty7nFoW7SkS502LfNv8KI4KSVQ3LEqsyrL03gpbHGu9KR1YjDvWLUgEjXhcOKQzpmZsmb4KCU14TejNWX0ZbQt-ClsGXgpbLSkd2g1JTRjdGExJXEiXjdrOCksd-C4KWi4KWIy7nPis-04KWo0JbChOCjkM6a2aPGgM-zZSDPttyc27zUlMyQ4KWi4KaW4KaYY9GqyojRo8KD25rCpeCmnti2AM2_wongo6rgor_Whs6JXtSA263gooDOj9663ZYI4KSt2ZHWmGvfg-CjuN2a4KO00bLUlsKE4KOWzqrNouCjmceS1qTMk9SZ1qfNq-Cjns614KOh1q3CpuCjo9aF4KOl1rF0GM2_wozVg8uFyYnVhuCjgMaiAhLUhuCklOCllsuU4KaP4KOIxZ0l3K_Rl9u7yIPVnMekzZHHgtWgybngpqnJvsKH0Ijgoa7ImXPYguCmtdGBy7PCiOCmrMao1argoovRo8KM1pzVsdy44Kelyq_Oms2exqzHrcav1bnMnsyg1b4Dwo3gp4fgp63gp7nPjwHDoNSGwrjgo4beuuCkps2A24Hbg9SMF-Cnk-Coj9mXwongqJvgp5rOo9SW4KiR2YnWoM6r4KehxqHgp6POsHPNqdao4Keo4KOg1qzOus214Keszr3gp6_Nu8ONBcKrzb_Cjta4xrvGm8y_1r3FsHLZv8O04Ki32rnXhzHXidyr4Ki74KSozYPVkgngoqvXkNeSxrvXldaq15jHkse6wonctNef16HXo9el4KijzJXXqdyM16zGrNeu17DXste015Zr17dv17nMv8WbwqTXvde-zb_CkeCntdquRuCkmdqx4KSd4KOtAsO44Kmr4Ke_w4zCoOCkpMy64KmxzYHgpKngqL7FnSzgpK3gp4HNi-CkuMeezZHCjN-E4KS214_gqrPbl8emwpPGhsKKxobClcaGwp3gpLzbneCkv9uh4KCiwpLgoZrgoYLgoIrgoZ7Xj9i5BsOMxYTFhuCnjsOM4KGk4KCUOeCpgeCii82Rwo3gorbTrNyZ4KiuwpPgpJXYhNiG2IjEst6ZzafYuQTDts-Szo5G3KrgoqjWkULgq5nFvOCijNmXwo7el9yC3IRl3Ibgo7_en8eewqDckuCsgNao0rTShDlk06Q3MdOmZDg1043grIfTgs2iZMm4xq_gq7s206M1YuCsh9-ZOOCsjDHgrJczMtOPOdK3NuCshjJi05Q5Yjg0Y2LfmTLNv8KU4KSVT9Gf0aHdv-CqhXnYuQXgoKwCw5DahB7avcy94KSn4Kqr4Kmz1pE64KStwqPRnsmC4Kuay7PCj9-uxrPgrIDHptmVwpDGhsKe4KeA1qjgoKHgqK7CleCrotye4KulxLPGlOCrqOCjrQXCjOCrrOCnjuCrruCglOCkoeCmktic3r_ZkeCrtcaG4KOb4KqF0bfcgeCrp9yD3pzftOCrvnLgrIDWreCsgs2rw4DNv8KW4Ky14Ky3x44v4Ky64Ky8w7DFhOCtgOCrlMK-4K2C4Kmw4K2E4Ki84Kqs1ZI74K2K4K2M4KWf2ZfCkeCtkce04K2TyIfZldmV3LfWpeCopNio3qtm4KSZ4KCiwpfgrZ7gq6Rh2IngraHEtuCto-CjgQZA4K2nyZbCkuCtqeCogseeQOCrs8Sr4K2wBMKS4Ku44K224Ku64Ku83p7ftuCtvOCpl86b1LbDmSrShDFGNzcwZjlBMjDgrK5GZTQ3NTbgrIk004AzQdOM05Mz04YzY0ZGQ2JBZeCgosKY4K6p3J_gq6bgraJl2LkDNMWEROCrreCrr9qH1ZIf4K662YrLs9mZ4K2zyJLgrbXgr7Pgr4Hfi-CkgMWd4K-Fzrvgrb7Os9m44KiuwpnTs92D07jdhi_di-CvtOCjreCvttSGwpDdkeCqqMWX4Kqq4Ki91ZIK4KStwqhbc3nHnMy_4Kaa4KiYxr7gp5fgoJjgo7ngqYbGmeCjvOCpvcaGwpTduc2_wprgoKXQnGjgpb_dpt2obOCsu-CwmXrgsJvOjnjgr7vgsJ_grpDgqbLgpKrWkTDgpZzMl8KhQeCqus2RwpTHlcKh4Kuy34bgpqLQlsKV34TCoT3gqrrdtATKmwTCotqZ4LGQ4KSKYDrDgtOrPMOf4LGWAMKiT1DCoSrNv8Kc4Kmi1rrgqaVU1r7gqajco8O-4K-3BMyy4Kql4Kmt4Kmv4KSl4LGJ4K2G4LGL1IwL4Km23LDgqKbgqbngqo_gqbzGv8aG1JXXndy116DfmNek2ZrXqNeqx57Xrdev17HXs8yf17XEtuCqkeCqk9e74KqW177grLLgqK7CneCug9Gg4K6F4K6H4KOtBMKc4K6K4K2B4K2D2r_gsofgqq3HnjzgrpXRn-Cul8aGwpfgrprFvOCunOCwtATgq7fgsIPcut6ryoNo4KCiwqHgq4rgoKfgop3gq43GjOCsvNeCBuChp-CrlOCrluCut3JH4K-_4K68wpzgorbgo57gqaPPiseO4KCiwqLgs43goZzgs5DFqNq04Ke8AQ7goaPgoaXgs5gx4LObzZHgq4Pgs4bgoZngqKbGq8atxq_Nv8KjyYPgsJPdhdO6L0VOU-CrqeCysgJO4KGJ3ZTgsoXgsrbgsKHWkT_gsY7OmsKk0qbKheCol9C0xJbRjuCopuCok8ia4Ka84LSV2ZfCnuCphWXIlciX4KiU4KiW4KKU4Ka2zq3KgeC0kuC0m9Gs1JbCn-CkvMie0p7HnsOZPcik1KnSo23FuMu5dC7Elca2z4rgtLtvL3bEsWU104LIuuCsruCsoTLTlzfgq7vSvuCsmGbXouCslzjHneC1ijjgoKLCpNyd4K6q3KDcveCrqcOi1IPWjMOx4LGH3rvHnuCvueCtrNmHwpHYnuCjuuCuu82Rwp_gqoDgrqDgp6TKrtio37ncody-4KiuwqXgs7zTtuCwlOCzv-C0geC0g-CjrQbageC0huC0iOCyteCtheC0jNSM4LGR4LWmzZXgtKjUruC0qtCh4KeW4KiS4LSi4LSa4LSU0IXQlsKg4LSf4LSh4KGv4KiV4LaM4Ka30Y_gtKngtpLUleCjk8Kh4LSu0p3IoXLgtLLgtLTUuS_gtLfEleC0ueC0u27gtL1h4LS_4LWB4LWD4LWFY-C1h2PgtYngtYvgtY3grJdmNeC1kDDgtZLgtZRm4LWW4KiuwqbgtZngr7HgtbTgq4_grZYC1ITgp47UhkXgtaLdlkXevuC1qeCwseCwgNCWwqHgta7gp4DgtbPcveCgosKn4LOl4LOP4KGf4LCZAtSG4LOs4LOW4LOu4Kuw1Iw14LOxy7PgsaTgs7TMl8KjVVNEzb_Pk-CgheCstuCyrd2_4Le34Ky44KupdOCqptSF4Kqiw4zNhOCuj-C0i-CuktaRMtyvxo7ZiduS4K6Ey5DLs9GlzJfgqJ3FvMK00JQs24ws4K2M4Ky44Kac4KGP3JXdgeC4lOC4luC4mMeO4LiazprShsSD4Lid1JTguJXbluC4l-C4jOC4osao4KKuc-Cwl-C4psqI4Lio1bfguKrgt7jguKzNsdG94LixxoHguLPQv-C4oOC4jeCwrdSQ4LiJ4KiHxpnguL7gtpvgoL3Os-CxkuCmo-C4m9Cd4LaM4Li34K-00ofguYngsK3gpqTQudC7ypbgsZjVt-C5jsScxrvGr-C5keC0ltyA35Dgt7rRote6xZvCpyPgrI7guadhxrXgqaPgq7oQ4K-IUHsKICAi1qgiOiAwLOC5seC5s-ChkOC5tuC5s9KEIuC5uuC5siLSh-C5vjI135jgubngubvguoTguZTSkWXgub434LqC4Lmz0b3gub4wCn3Nv8KpxrPCtuCzvdO5xanegMSEIEZhdcav3oLgo4EEQsOQ4LG24Kql4KCR4LSJ4K-81pEm4LSP3ZvgtJngtpngtp7NkcKk0IjImXHKlcSE4KmCxobCpd-E4Kue4Laa1JbCpuCwt-CorsKq4Kixzr3gq6lCw6zgqLngoJQM4K-_4KeV4LCu4KC14KeZ34XgqYfgo5PCpeCnnuCjmM2k4LOG4KmS4Ken4KOfza_gqZbOu-CpmeCjpOCjpgPgoKLCq-C3huCrpeC3iOCtpG7DkOCrieC3jQMx4LeQ1ZIt4LeT4KGp0JbCpuC3meCztNy74LW0zb_CrMazwrHWueCppNa81rlkzrrVh-CysOCrqwTJguCqpcWM35bgtoPgrpHLusOC1ZIi4LqzxbDgsZDRiOC4nuCxmcaFBcKI4LGV4LGXxbzUoeC4p92ty7PCqOC0n8SocsyIzZ3go5fgqYzguYbgqJzgqo3gsqHgp5vgo5PCgOCxpUEG4LGWBuCxsFDCoiE9zb_CrdGI4KWFxZvLmeCliUTcteCuq-CrqdiQBMOi4Kms4LCezLvgsobbgeC8ldaRGeCtisyZ4KKT4LWr2o_gqYTgpLTHldKGyLDVq-Cjk8Ko4KeAxInYiMOMw7rgoKLCruChgeCzjuCgiuCgquCjgQPDlMaG4LyOyZbgoqXgoK_goJQN4LKL3r_Fh8ya4KKyx5LPj-C8n-CpncKJ4KK24L27yIDgoKJm4K-w4KulQeC2kOColc-OeOC3vuC3jQFUUOCglCPgt6vQll3fiuCrueCtuOCrveCvhNySwqfgvorgtphzzb_guZbFvMKv4KW74KW94LWA0rJ53YrEuuCxvMmPeNSGw5bgpolDU8KZwprgqIHgt6jFncyy4LaI1ZjGqMKtz7Dgpq_SsOCmss-34LCr4LSc4KmdwovgpqTHv8ee0rDgqYLgu5TLo-Cohsao4Kau0q_PtOC_g-CmtOC0peCmvdSWz77Ml8iLdcW00pHgv5Xgu4TWo-C2j-C-oeC_oceS4KuBBF3Ghn_GhsKIxobCpOCpnVDgu4fJgMKf4LKs4Ky44K6G4K6hxKnatMOu4Kmdw4fgsrTguIPgtoTguIXUjOCxnuC-vOCgmcao4K2L4LK84K2O0JbCmuCzgMSr4LOC4LKRBU_grZnNq-C5mseH4KCiwo_gu6vgrqvYiuC1nOCjrQHDtOC-j-CutMOMw73gu7XWkS_gu7jguYPgt5bJvsKK4Lu84L-40bfgtbLgr4bcvNit4LW1yYDCm-C-iOGAmeCli82AcnPgr7UW4YCf2JTDjMK-N-CglDTgvpbJvsKW4YCMxb3gsLPgqY7grr_gsIbgvpvgr4PfjdyL16veo9mv2bHeptatwqfhgLfEguGAudS24KeE4Kiu4LCc4Le24LiM4KGd4LiM4Ky8wr7Ejt2A4LeNBDfgt47gvJLgsYrgsrhyONyvwp_ak-C4vs2R4L-I0Y_gs4nguLrGneC4vNCx4YGz4LmK1anguLnHtOC4k-C8peC4qeGBvOC5ksyXxqremUjEg-C0k-C4kuC8nOC4tOGChOC0lseV3pjGlN-S4YG4Z-GButCS4YKP4LaOzJfCsMqzz4zJjMym4Kaf4YKV4YKX4Li14LiZ4YG9ybbgrqXTtuGCouC4n-C4q-GCpsWw4KCb4YKA4YKN4Li94YKs4YKF4LmH4Lys4YKM4YKC4YKO4YKz4YKQ4Lev4LmQ4YKw4YK44YKy4Li24YKt4KK34LqN4Lmc4YK-4Liy4YKr4YOB4YK04Kic4KSvxKvhgoHhg4fhgoPhgrrhgprOmsKh2qrhgrfhg4_hgrnhg4nhgrvhg5PWt-GDhuC4u-GDiOGCpeGDiuC8meC0pOGDjeGCseGBu-GDkeC_jsmo4YGx4LiK4LmF4LSn4YG24YKK4LmN4YOC4YCU4YOF4KSw4LmY4YOC4YKHxpThgonKhOGDsOGDoWXhgpLHmeCkseC5l9CR4LmO4YKc0Zrhgp7HpOGCoNi24Lmd4YOS4YKn4KSZ4YO74YOaxqjhgq_PuuGCmeC0l-ConN6r4Lq34YOC4Lik4YOj4YGI4Lyd4YSLxbDguK7guLDhhJfhg7zgqrHblOGEoeGEj-C8meGDldST4LCs4YSmZcKh4YOc4L-X4LSc4YSU4YOi4YSO4KeW4Lmf4Ker4Lmh2KLguaPVpuC5ptON4YS84LmqzJ_guazUtsOaB1PgubDguoPgs4ngub4i4KyF4KyH0rzgrIo34KyM4Lmn4KyQxq_IluCslN2eMuC2u-CsmeCsmzHgrJ044KyfM-CsoeCso-CspeCsp-CsqeCspuCsrOCsruCssDEy4LqB4LqL4LqU4Lm34YWc4LqSIs-m4YO5aOGFiNKE4K-QY-GFmjbgrIvTqOC2tdOfyL3grKYy4YWoOTg2153gr6ThhoNkNeCso9ei4LWEN2EzOdK-4KyTODngt4LTlOCssOGFjuGFneC1imbhharguoPVtduW4Lm-4YaB4YWv4YKdyrXhhIfIgNi24LqV4YWv4YKobeGFtHjgr4zgr47gr5Dgr5Lgr5Tgr5bgr5jgr5rgr5wx4K-exLDgr6Fh4K-j4K-l4K-n4K-p4K-r4LqP4Yaib-C5vtCPy6_hha_gubXgubfhhYnhhpzgubPguoXgubfguofguonhha_Sj-C5leGFiDfhh4si1pXhhqw2MNOq4YeaNNOK4YWW4K-V04rhhZrgtr_hh6HfmeGHneGHn-GHnN-ZN-GFnDXhh6Dgr5Thh6rgtrwz0rrSveCvlDbhhoPgr5vThNOEZuCvlDfIuuGHuzDhh73hh7Y24Yet4YiANzZm05A204Q04Kyi4LqJ4YiO4YiP35jhh6zhh4_hh5rXojnhh5vhh6LhiJbhh5rhh68x4YiZ05_gr5Xgr5EyOeGInOC2v-GInsi74K-b4KyZ4LqIyL3TqjHgr5vhiJ41YzXhiIbhiJHgr5Dhhohi4LqI0rrfmeGIgOGIp-CsrNOo04rIutei4YWa4Kyf4YmA4Kyf4Yis4Yi44YieMOCvlOCvpNOU16LhiKHXojThiJnfmOGHreGImuGHpOGJjDDhiZAx4LWQ4YmC4K-U4YiW4K-V4YWc35k506jhh6DhiZjTn-GIuNOgM-GIsdOqNeGJguCmjeGInOCsnzgz06rfmTHhh6s14Ym14YmlZOGJheCsmTjhiL3hh6bhiYDgrJzhibXTi-GGgOGIrdei4Ym44Yix4Yii4Ym735nhibrTqNK40rjhioMwZNOK4Yer4LqH4YWa4LqH4LWF4Yma4YmA4Yii4YmQ4Yi54Yij4Yml4Yi24Yi74Yio4YmW04rhiKThioRl4YqZ4YqjMOCru-GKn-GKoeGIu-GJhuCvleGKpuGJuuGHm-GGgOGKjeGKreGKkeGIlOGHm-GJguGIldOK4Ym14YmU05_hiYThhovgrI3hiIPhiLbhiqvhi4HhiJbhiqzhir044Yer4Yqj0rnhirbhho_hirbTpGZl4Yea4Yep4Yee4Yet4Yiq4YqJ4Yml05_hiLHhirbTqmbhiLXhiLfhiY7hh7LhiaThiJ7grKjhi5rfmOGJp-GHmmXfmWPhh5zSvOGIgOGHnuGGu2LhhrfhiaXXoeGIseCsmeGLm-GItOGLtuGInuGJsOGKneGLp-GLtuGHoeGJqtOq4Yep4Yib4Ym74Yme4Ymw4LqH06jhibDhiYHhjIDhiKzhh67hipjhiKzhiJfhiarhiZDhiJvhiJbhjIHhibDhh7LhiZHgrKzhjInhir3hio7hibThi4nhiojhiKzhiYHgrK3hionhjI3hiZ7hiKPhiLfhiK7hhojhi4HguojhjKvhiqLhi4XhiqHhjKXhiZfTnuGHtuGLl-GIntON4Ymo4Yqx06LhianhirjhhZrhjJfhh6_hi6HhiLnXomHTouGJreGHtuGMjOGJk-GJn-GMj-GKoOGJoOGMrOGLn-GLlOGHo-GIotOi4YiW06Thi77XouGJqeGIv-CsnOGMu-GJhOGKg-GJh-GJieCsn-GIlOGJjeGJneGHpOGJmOGJveCvlNOq4Y2Q4Yee4YyN4Ym94Y2O4YyU4Yq94Yen4Yet4Y2m4Yih4Yij4YWc4YiS4Y2H4YqU4Y2W4YiU4YmB4Y244Y2a4Yq04YmI4Y2D4YmL4YmI4YmcNOGIq-GNm-GJj-GMt-GHmuGJo-GLijHhhozhirThjJU14Yee4Y2o4Ymv4Yet4Yii4Y214Y6T4Yq94Y6F4YuB4Yyf4Yqm4Yq24YmS4Y294Yq24Ymb04rgrKzhiKzhjoLhjIzhiprhir3hjJLhiYDhjJXSueGKvTLhiLDhipLhiZzhjJfhiaPhh7bgr5Thia3hiqDhjYzhiqLhh6zhiIfNouGFlsi6OeCvj9OUN-GJp-GJu-GGgNe-4YmW4YW-4Y2C4LWMM2UzYci6yL3hhZrTpGJj4Y2ROTXgrJPhi51h4La806DTkOGFj-GInNOL4Kyv4Kya4YiwNNOl4Yqb4YmO4Ye8NuCvmeGHsmbhiIrgrJfhj6LfmOGOh9ei4YWe4YeWduGGrDFi4YeWcuGGrOCsjNK-ZuGKnuGKpeCsrNOU0qw04Ym14LWM4Ymg4YWo051i4Y-80r004Ymzxq_gr5xl4LeC4YixZOGGlDXhj6Pgpo034KyaNOGIjOC1hNOi4YeWc-GGrOGJsOGLqeC2teGPp-GGhOGLr-GIrOGFnOCsq-GPleGJr-CshzFh4YaD04PTjuGPmNOP4LWF0rfgr47hho3TgdOTZOGIjNK94La906bTj-CssOGGm-C6l-CgotmRwq_gq6Pgr7HgvqDgtKPgs5LgqZ3groLgvpDgvpLgoJRG4YGE2ZfCm-C-meCvgOGBjd-M4LCK4L6e4ZGHyJrgoKLCs-C9q-ChnOC9rsS_CtSGXuChieCip-C6sNSM4LOs3ozfhNKu4Kaw4Kaz4L294YCPwovgorbhkavSsOCms82_eOClhOClhuC9hi_UpsaA153NtdiOQsuP4L6zScKeOcWRHOCglBvgpK3EpM-D4Ku0zZF52Y7MluC4o9eO4LGg4LGDBX3gspnCp8qTcs6axpLemcW3xJXCpmfEtOCzt8OD4KCiwrfgt5_gq4zgt6HTv8O_OOCpneCyuuC3puCglCjhkZDgqZ3hkpfgt67hkpzPpuGSn27Ci-CorsKe4ZKoyYjgopzgsJjgva_JkgXgu4ngvpAkR-CglEPgvJjOuOGBv-GSjdqPT-C_o-C0o-CyveCsvd-E4LOf1rrKteC9oeC9vsaGwpvGhuCzneC7nsKn4KWtxbTgqbPWrdO04LOgyrUg4ZGZ4KiV4Kev17vCpuC1jOGIsWMywqhz4L-dZ8-KcGjEgMSCxITEhsWixJgPxJHhk7vGoMSYxYQG4LmaxJ7Cncq_3r3HtMKr4L6ncOClvuGFsti5B8K_w40G2orgp4544K6O4L65x57goYzhgITgsLDgpK7gqrLgoIXhg6Xbjca-At-EyoLhg6_gtp7ZlAME4L-yZOCgs8-E4KWFyogvU-C_neGUscaB2LkIwq_DjQfgs5XgvbTJmN2Sy5bgoJTgp5LhlJ3gv5DFsNCg4K6XBMqRxITKuOC9meGEm-GDtca-27jbkc21xp3IseGEiuGDqOGAheGVhuCikuC_pcahwpIGCOCngOGVi8iQGsq_4KGM4KK92bzbluGUkcKh4ZS7U-CjsOCzmNSO4ZSd4K2u4K6X4ZWX4ZSe36_blsyK4ZOE4Lue4LCI4K264KSC4K-G35HhlbbgrZrhhZbcmuCiquCgheGRheC7rOGAm-CjgQnCveGUu-Clm-C-kMO54YCj1IzgqbXhlbDgt5Tgu5fgvZrGvuGUhcSC2KTgt5rhgK_gu7_TsOCptdix4KK-3qnYuQlP4ZS7w5_OjuCkilInwo44w4AAACrgoJTXjOGVsN-r4LmA4L2d4LiK4KKV4Km9B-GBi-CuruCtt9yF4ZW637bhgZDcjd6k4YGU2bPgr4beqN6B3JfShNya4LCj4ZaE4K2f4YCZ4Lut4KOBCxHhlLvgsJHgt40CEeGWj8Wd4LKK4ZaS4Lu5xJYJ4YCr4LWw4YCt4Lu-4Lec07DgoJbhl43gtZrhgJrhgLHhlLjCmOGUlM2H4Luy4Lu04KCU4KKq4Zec4YCn4Ku1A-GXoOCpkOGArtiq4ZacxIzgp5LHtMKu4ZS2xp0v3YNixJXhk4HGogoX4ZS74L2C4LKC4L644ZGmxZ3gsKPhlYTgsZXgsZHhgInElgfgvKHgrpcI4LGV4ZOK4ZiU4KeW4Kq34ZWa4ZSp4K2UCQzgopjTsOC9uOGXvuGTgMmI4LOn4LqnxqILwprDjQjXhOGSsOCzmOC7keGWs-GXnWvhmKPhkrbguK3MvuGTl8eOyr_XjM-E4KSXUkxQIEXGrsWi4ZSRHMaG4Lux4ZS-4KiAMcOMwpPgoJTgoJbhlJ3guYLgtarhgKjLqgIG4Za0xoUC4ZWJ4Zi24YSx4ZaU4ZmX4Zmg4K2v4LmO4Zmk34LhmJ7gpLfhmKDgrp0BAuGYpMSM1ovhl6fgt4fhlofGoghc4ZKB4ZeWWNSJ4LOY4KCz4Zez4ZmW4Ku1AeGXt9y54Ze51J3gtbTcmsWf4KKb4KuL4KGE4LOR4K2kw7rGhuC7juC6reC9tuCzmN6LyaXfhOGDssqW4KC5zZnhmZ3gorbhmpbcmuCzrOGaiOC9rOGaiuCzqOCtpMK0xoZg4ZGk4KCU3r3hkanhlrbgtJjgvovYguGamOCiluGZmeCituC2l-C0o8qpwpzClgEBAALhlq7ClgLhmrkDAOC8pOGDl9CRwpYD4ZuABOGavAThm4AF4Zq8BQYABQHalNuWwpYG4ZuMB-GavAcJAAjhmrwI4ZuMCOGaucKWCeGbnQrhmrwM4ZudDeGavMWEBA8A4Zq4AMqb4ZmZDuGbr-GWruGSociNdcinwpDCpuGYu-Clq2fgo4_Xs-GAucekw4s_w5nCmeGch-Gch8KayqnEoEzgsaLgv6kDZeC3owNm4ZurxofEjm8AxKbFpNCU4LGiYcSmBMSOagDLp8ek4LGiYsyi4ZyZyYEBw7_gsaJjxI5r4ZypagLQoOCxosuAaQXhnK_hnKPgqInGu-CxomXEjm3hnKlr4Zyr4LGizLADbgHhnK_hnLPhnJzgspLEjsKc4ZypbADhnKzGhmjEjm7hnJLhnYDhnZIExqQDaeGcqW7hnJvUlOCxomrEjsWj4Z2V4ZuS4Z2L2ZbEjnThnZ7hnYrhnaHGhsuOA3bhnZ4D0YnguLThnahtxI534Z2eBOGctMaG3oQDfeGdngXhnbXQv-GdqG_EjsKG4Z2eBuGehNGL4Z2u4KOUxI7ChOGdngjhnZlxxKYD2JHhnLrgp7hu4LGizosDceGcqXDhnYPGhnPEjtSN1b_hnZHgsaLNvANw4Zypc-GclXfEjnXhnKnhnbLhm5PVt-CxonnhnJrEjnjhnJXgsYMD4Z67xI554ZyVe8SOe-GcqXrhnaDKiOCxonzEjnzhn4bhm5LbjOCxon7EjsKC4ZypwoHhnJXgv6vhnJDhnJLhn5Thm7HGhsKAxI7CrOGdiAPhnpHhnZndtgPhn4fEjsKF4ZyVwoLhgaXhnKnhnonhnrXhm4TGhsKDxI7CiOGfocKH4ZyVwoTEjsKJ4ZypwogC4Z2ZwobEpuGfocKM4Z6Zy4jgsaLCh8SOwo3hnKnCjOGeogTgv63hn5nEjsKM4Z2t4Z-JxobCicSOwo7hnKnhoIjhnZngqr8DwpHhnKnCj-GclcqdyYHhnKnCkMWk4Li-4LGi4K2mA-GggsSO4aCc4Z-vx57gsaLKn-GgocSOwpLhnJXCjsSOwp3hnKnCk-Gclcqh4aCwA8KU4ZyV4K2W4aC84ZypwpXhnJXHgOGgu8KW4ZyVz48D4aGGxI7Cl-GcleCqvQPhnavEjsKY4ZyVwpTEjsKZ4ZypwprFpOGfkOCrgOGgquGhl-Gfj-GblMaGypsD4aGYxI7Cm-Gclcqk4aC74aC24Z-cBOGYruGgu8Kf4ZyV4ZOcA8Ke4ZypwqDhnJXgsrLhobHhnKnCoeGclcKd4aGcxI7CouGclcKexI7hoL3EjsKj4Z2n4Z6Owp_hooPhn6HCpOGclcKgxI7hoYrhl7bhooXhoJIE4ZWq4aKPxI7CpuGclcKixI7hoaMDwqfhnJXCo-GdleGcqcKo4aCk4LiM4LGi4L-v4aCOA8Kp4Z-IxoHgsaLCpcSOwqrhnKnCqeGgi8KmxI7hoqjEjsKr4ZyVwqjEjsKt4Zyp4Z-g4ZuC4YOe4aGf4YCQxI7hoa7EjuGhsuGfnOCsveGdpOGcksKe4Zui4ZK04Z664Zypwrfhm6vZjOCgg-GcqeGdq-GjheGfpX_hnKnhnrLho4Xhn7IDwoDhnKnhnbrho4XChcSOwoPhnKnhnoHho4XhoI3CruGiu-GbgeGUosqbBeGglAPho6fhornho4_hoKDCs-Gcqc2J0JThm7fGiuGbuuGbvMa74Zu-4ZyAx57FiMa74ZyE4ZyG4ZyI4L62"

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
