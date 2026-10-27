---
title: "Gapjyga nädip ynanmaly? Attestasiýalar we enjam açarlary"
slug: trusting-a-wallet
description: "Tamga Network-daky gurama gapjyga resminama bermegiň howpsuzdygyny nädip kesgitleýär: gapjyk attestasiýalary, açar attestasiýalary, enjam subutnamalary we ynam sanawy."
date: 2026-10-08
updated: 2026-10-23
lang: tk
category: privacy
draft: false
related: openid4vci-deep-dive, haip-and-token-status-list, how-trust-lists-work, what-the-network-never-sees
---

<!-- Sources: ADR-0025 1.0.0 (EU TS3 model; K1 unit registration, unit key never shown to institutions, unit record without personal data; K2 WIA Annex E, TS3 §2.3.1 fields, lifetime < 24 h (23 h), client_status ≥ 31 days (60), new PoP key and new status entry per transaction, no per-institution reuse; K3 KA Annex D, attested_keys, key_storage / user_authentication ISO 18045, certification, key_storage_status one shared entry per storage type (TS3 Option 1), in the jwt proof header, used once; K4 two status lists signed with a key registered in the trust list, WIA list ≥ 10,000 entries, "revoke this wallet", lost device needs an account later; K5 issuer checks at PAR/token and credential endpoint, KA level vs institution minimum, transition without KA until before the pilot (ADR-0025 K5; code checked 2026-10-23: a proof without KA counts as software key storage against the institution's min_key_storage); implementation notes: keys bound to phone lock, Play Integrity not mandatory, making it mandatory needs a separate ADR; WIA1–WIA4; change note ADR-0042). ADR-0034 (WIA sub shared by all instances, HAIP §4.4.1; x509_hash). ADR-0042 (K1–K6, NW1–NW4; implementation note: TAMGA-WP-1 same entry in production and sandbox, RESERVED until certificate; registration by hand with approval; self-registration separate decision). SPEC-WALLET-0001 §2.2 W1/W2/W3, WL3, WL11. SPEC-PROTO-0001 PR11, PR19. SPEC-TRUST-0001 §3 wallet_providers (ACTIVE only; RESERVED not used). guides/build-a-wallet §4 (Android key attestation checks; App Attest checks; until verified the unit counts as software; Play Integrity added at the store release). ARF architecture §3 roles, §7.1, §2.8 (hardware keys and device attestation implemented, device testing with the store release). Live 2026-10-08: production lotl wallet_providers one entry RESERVED with no signing keys; sandbox lotl adds the network's own test provider (ACTIVE). External: EU TS3, OpenID4VCI 1.0 Annexes D/E, HAIP 1.0, Android key attestation, Apple App Attest, Play Integrity. -->

Gurama gapjyga onuň öz sözüne däl-de, gol çekilen subutnamalaryň zynjyryna esaslanyp ynanýar. Gapjygyň üpjün edijisi Tamga Network-yň gol çekilen ynam sanawynda bolmaly. Her resminama haýyşy üçin üpjün ediji gapjyga iki sany gysga ömürli, gol çekilen beýannama berýär: "bu biziň gapjygymyzyň hakyky, ýatyrylmadyk gurnalyşy" diýýän gapjyk nusgasynyň attestasiýasy (wallet instance attestation, WIA) we resminama açarlarynyň nirede durýandygyny aýdýan açar attestasiýasy (key attestation, KA). Üpjün ediji diňe telefon platformasynyň öz subutnamasyndan, Android key attestation ýa-da Apple App Attest arkaly barlan enjam ammaryny talap edip biler. Gurama hiç zat bermezden öň bularyň ählisini ynam sanawy bilen barlaýar. Toruň özi gapjyk işletmeýär; ol gapjyk üpjün edijileri sanawa goşýar.

## Näme üçin gurama haýsy gapjyga resminama berýändigi bilen gyzyklanýar?

Tamga resminamasy adamyň enjamyndaky açara baglanýar. Şol açar kimde bolsa, resminamany şol görkezip biler. Eger açar adaty programma ammarynda bolsa, ony resminama bilen bilelikde başga telefona göçürip bolardy we resminama indi köp zady subut etmezdi. Eger programma üýtgedilen nusga bolsa, ol razylyk ekranyny geçip ýa-da saklamaly däl görkezişlerini saklap bilerdi.

Şonuň üçin gurama diploma ýa-da şahsyýet resminamasyna gol çekmezden öň üç soraga jogap isleýär. Bu toruň düzgünlerine eýerýän gapjykmy? Bu belli gurnalyş henizem gowy ýagdaýdamy? Onuň meni baglamagymy isleýän açarlary hakykatdan howpsuz enjamdamy? ÝB çarçuwasy şol bir soraglary berýär we olara Komissiýanyň [TS3](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts3-wallet-unit-attestation.md) tehniki spesifikasiýasynda beýan edilen şol bir iki attestasiýa bilen jogap berýär. Tamga şol modele eýerýär ([ADR-0025](https://docs.tamga.network/adr/0025-wallet-instance-and-key-attestations)).

## Kim nämä kepil geçýär?

Her halka diňe hakykatdan görüp bilýän zadyna kepil geçýär:

![Telefon platformasyndan berlen resminama çenli subutnamalar zynjyry](/blog/trusting-a-wallet/en/fig-zincir.png)

1. **Telefon platformasy** (Google-yň enjam attestasiýa köki, Apple-yň App Attest köki) açaryň enjamyň howpsuz enjamynda döredilendigine we haýyşyň belli programmadan gelýändigine kepil geçýär.
2. **Gapjyk üpjün edijisi** şol subutnamany gurnalyş hasaba durýan wagty bir gezek barlaýar we şondan soň şol gurnalyş üçin attestasiýalara gol çekýär.
3. **Ynam sanawy** gapjyk üpjün edijisini we onuň gol sertifikatyny görkezýär. Işjeň ýazgy bolmasa, üpjün edijiniň attestasiýalary hiç zat aňlatmaýar.
4. **Guramanyň resminama beriş hyzmaty** attestasiýalary barlaýar, resminamany attestasiýa edilen açarlara baglaýar we oňa gol çekýär.

Tor diňe üçünji halkada durýar. Ol her üpjün edijiniň eýermeli düzgünlerini ýazýar we sanawy çap edýär; ol telefonlary hasaba almaýar, attestasiýalara gol çekmeýär we hiç hili enjam maglumatyny saklamaýar.

## Gapjyk nusgasynyň attestasiýasynda näme bar?

WIA [OpenID4VCI 1.0](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html) E goşundysynyň formatyndaky gol çekilen JWT-dir. Meýdanlar TS3-den gelýär:

> **Bellik:** Ýönekeýleşdirilen mysal. Bahalar gysgaldylan ýa-da oýlanyp tapylan. Hakyky düzgünler [ADR-0025](https://docs.tamga.network/adr/0025-wallet-instance-and-key-attestations)-de we [gapjyk gollanmasynda](https://docs.tamga.network/guides/build-a-wallet).

```json title="Ýönekeýleşdirilen mysal: gapjyk nusgasynyň attestasiýasynyň mazmuny"
{
  "iss": "https://provider.wallet.example",
  "sub": "example-wallet",
  "wallet_name": "example-wallet",
  "wallet_version": "1.0.0",
  "wallet_link": "https://wallet.example/",
  "client_status": {
    "status": { "status_list": { "idx": 7341, "uri": "https://provider.wallet.example/status/wia" } },
    "exp": 1797000000
  },
  "cnf": { "jwk": { "kty": "EC", "crv": "P-256", "x": "…", "y": "…" } },
  "iat": 1791800000,
  "exp": 1791882800
}
```

Gizlinligiň köpüsini üç jikme-jiklik göterýär:

- **`sub` her telefonda birmeňzeş.** Ol gurnalyşy däl, gapjyk çözgüdini atlandyrýar. [HAIP 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html) profili muny talap edýär we Tamga ony kabul etdi ([ADR-0034](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub)).
- **Ol 24 sagatdan az ýaşaýar** (Tamga-da 23 sagat).
- **Her resminama haýyşy täzesini alýar**, `cnf` içinde täze eýeçilik subutnamasy (proof-of-possession) açary we üpjün edijiniň ýagdaý sanawynda täze, baglanyşdyryp bolmaýan orun bilen. WIA hiç haçan ikinji gurama üçin gaýtadan ulanylmaýar. Maglumat alyşýan iki gurama şol bir telefonyň ikisi bilen hem gürleşendigini bilip bilmeýär we üpjün ediji gapjygyň näçe gurama bilen iş salyşýandygyny bilmeýär.

Gurnalyşyň öz uzak möhletli açary, birlik açary (unit key), diňe gapjyk bilen onuň üpjün edijisiniň arasynda ulanylýar. Ol hiç haçan gurama görkezilmeýär.

## Açar attestasiýasy näme goşýar?

WIA gurnalyşyň hakykydygyny aýdýar. OpenID4VCI D goşundysynyň formatyndaky aýry JWT bolan açar attestasiýasy resminamanyň baglanjak açarlary hakda bir zat aýdýar:

- `attested_keys`: toplumdaky her açar, sebäbi her resminama 10 nusga hökmünde berilýär we her nusganyň öz açary bar;
- `key_storage` we `user_authentication`: TS3-iň ulanýan ISO 18045 adalgalarynda ammar we ulanyjyny barlamak derejeleri;
- `key_storage_status`: üpjün edijiniň ýatyryp bilýän ýagdaý sanawy ýazgysy.

Ýagdaý ýazgysy bilkastlaýyn umumy. Her ammar görnüşi (programma ammary, Secure Enclave, StrongBox) üçin bir umumy ýazgy bar; bu TS3-iň rugsat berýän birinji görnüşidir. Ammaryň bir görnüşiniň bozukdygy ýüze çyksa, üpjün ediji ony birbada hemme kes üçin yzyna alyp biler, açar attestasiýasy bolsa gurnalyşy tanadýan hiç zady açmaýar. Her açar takyk bir açar attestasiýasynda peýda bolýar, her açar attestasiýasy bir gezek ulanylýar we attestasiýa gapjygyň guruma iberýän subutnamasynyň başlygynda gidýär.

Muny dogruçyl saklaýan düzgün WIA3: açar attestasiýasyndaky ammar derejesi hakykaty aýdýar we barlanmadyk talap hiç haçan oňa ýazylmaýar.

## Üpjün ediji açaryň enjamdadygyny nädip bilýär?

Programmanyň özi hakda aýdýanlaryndan däl, platformanyň gol çekilen subutnamasyndan ([gapjyk gollanmasy §4](https://docs.tamga.network/guides/build-a-wallet)):

![Gapjyk üpjün edijisiniň platformanyň subutnamasynda näme barlaýandygy](/blog/trusting-a-wallet/en/fig-kanit.png)

| Platforma | Subutnama | Näme barlanýar |
|---|---|---|
| Android | [key attestation](https://developer.android.com/privacy-and-security/security-key-attestation) zynjyry | Google-yň enjam kökine barýar; bir gezeklik çagyryş (challenge); howpsuzlyk derejesi (TEE ýa-da StrongBox); barlanan ýüklenme (verified boot); programmanyň paket ady |
| iOS | [Apple App Attest](https://developer.apple.com/documentation/devicecheck/establishing-your-app-s-integrity) | Apple-yň kökine barýar; programmanyň şahsyýeti (Team ID we Bundle ID); müşderi maglumatlarynda birlik açarynyň barmak yzy bar |

Subutnama barlanýança gurnalyş programma derejesi hasaplanýar. Munuň näme aňladýandygyny soňra toruň gapjyk düzgünleri kesgitleýär. Gapjyklar W1 (programma açarlary), W2 (enjamyň howpsuz ýeri: Secure Enclave ýa-da StrongBox) we W3 (döwlet tapgyry üçin sertifikatlaşdyrylan howpsuz element) derejelerine bölünýär. W2 iň pes derejedir. Programma açarly gapjyk goldanmaýar; ýeke-täk kadadan çykma toruň öz görkeziş sahnalary üçin sandbox sanawyndaky synag açarydyr (WL3 düzgüni).

Enjam açarlary telefonyň gulpuna hem baglanýar. Resminama açaryny diňe telefon açyk wagty ulanyp bolýar we her görkeziş enjamyň biometrikasy ýa-da açar kody bilen tassyklanýar (WL11 düzgüni).

Android-da üpjün ediji goşmaça hökmünde programmanyň dükandan gelendigini görkezýän [Play Integrity](https://developer.android.com/google/play/integrity) netijesini iberip biler. W2 derejesinde bu hökmany däl: ol hiç haçan açar attestasiýasyndan alnan derejäni peseltmeýär we onuň ýoklugy hasaba durmaga päsgel bermeýär. Iň ýokary dereje bolan W3-de üpjün ediji birligi işjeňleşdirmezden öň we W3 talap edýän her açar attestasiýasyndan öň platformanyň enjam attestasiýasyny barlamaly (RB-WP-17).

## Gurama resminama bermezden öň näme barlaýar?

![Resminama berijiniň tertip boýunça näme barlaýandygy](/blog/trusting-a-wallet/en/fig-denetim.png)

Ygtyýarlandyryş we token nokatlarynda beriji WIA-ny barlaýar: onuň goluny, gol açarynyň ynam sanawyndaky ýazgysy `ACTIVE` bolan gapjyk üpjün edijisine degişlidigini, onuň güýjünde bolýan döwrüni, `cnf` açaryna eýeçiligiň subutnamasyny we `client_status`-yň ýatyrylmandygyny.

Resminama nokadynda ol açar attestasiýasyny barlaýar: onuň goluny we üpjün ediji açaryny, gapjygyň subutnamasynyň berijiniň täze nonce bahasynyň üstünden ilkinji attestasiýa edilen açar bilen gol çekilendigini, `key_storage_status`-yň ýatyrylmandygyny we ammar derejesiniň guramanyň öz iň pes talabyna laýyk gelýändigini. Diňe şondan soň ol her nusgany attestasiýa edilen açarlaryň birine baglap, gol çekýär. Beriji hiç haçan ýatyrylan WIA ýa-da açar attestasiýasy esasynda resminama bermeýär (WIA4 düzgüni). Bu ädimleriň protokol taýdan görnüşi [OpenID4VCI-a çuňňur seredilişi](/blog/openid4vci-deep-dive) ýazgysynda.

Bir geçiş aç-açan ýazylan: pilota çenli beriji açar attestasiýasy bolmadyk gapjyk subutnamasyny hem kabul edýär. Şeýle subutnama programma açar ammary hasaplanýar, şonuň üçin iň pes talaby programmadan ýokary bolan gurama ony eýýäm ret edýär. Bu ýol pilotdan öň aýrylýar.

## Gapjyk ýa-da tutuş gapjyk önümi nähili yzyna alynýar?

Dardan giňe çenli üç dereje bar:

| Näme yzyna alynýar | Kim edýär | Täsiri |
|---|---|---|
| Bir gurnalyş | gapjyk üpjün edijisi, adamyň haýyşy boýunça ("bu gapjygy ýatyr", mysal üçin telefony başga birine bermezden öň) | şol gurnalyşa berlen ähli WIA ýazgylary ýatyrylýar |
| Açar ammarynyň bir görnüşi | gapjyk üpjün edijisi | şol ammar görnüşi üçin her açar attestasiýasy ýagdaý barlagyndan geçmeýär |
| Tutuş gapjyk üpjün edijisi | hasaba alyjy, ynam sanawy arkaly | üpjün edijiniň ýazgysy `SUSPENDED` ýa-da `REVOKED` bolýar; onuň attestasiýalary hasaba alynmaýar |

Telefonda eýýäm bar bolan resminamalar mundan aýry: olary beren guramalar öz [ýagdaý sanawlary](/blog/status-list-privacy) arkaly yzyna alýar. Gurnalyşy ýatyrmak onuň täze resminama almagyny togtadýar.

Ýitirilen ýa-da ogurlanan telefony uzakdan yzyna almak üçin adamyň şol telefonsyz özüniň kimdigini subut etmegiň haýsydyr bir ýoly gerek. Karar muny soňky ädime goýýar.

## Näme üçin Tamga Network gapjyk işletmeýär?

Sebäbi gapjyk işledýän tor öz önümine baha berýän bolardy. ÝB modelinde her gapjygy ony hödürleýän gurama işledýär, ynam çarçuwasy bolsa diňe gapjyk üpjün edijileri sanawa goşýar. Tamga Network şol bir bölünişige eýerýär ([ADR-0042](https://docs.tamga.network/adr/0042-network-and-wallets)):

- tor hiç bir gapjyk programmasyny, gapjyk üpjün edijisini ýa-da gapjyk web saýtyny işletmeýär we toruň domen atlarynyň astynda hiç bir gapjyk hyzmaty işlemeýär;
- ol gapjygy diňe ynam sanawyndaky ýazgysy boýunça ykrar edýär, ony bolsa çap edilen düzgünlere eýerýän islendik üpjün ediji alyp biler;
- onuň interfeýsleri we paketleri hiç bir gapjygyň adyny berk ýazmaýar;
- bir sandbox bar we ol tora degişli: gapjyk işläp düzüji öz üpjün edijisini işledýär we ony sandbox sanawynda hasaba aldyrýar.

[Tamga Wallet](https://tamgawallet.com/en) toruň gapjyklarynyň biridir. Ol aýry önüm we sanawa beýlekiler ýaly girýär. Onuň üpjün edijisiniň (`TAMGA-WP-1`) hakyky sanawda bir ýazgysy we sandbox sanawynda şol bir ýazgysy bar, ikisi hem 2026-njy ýylyň 14-nji oktýabryndan bäri `ACTIVE`; şol gün gapjygyň operatory öz üpjün ediji hyzmatyny gapjygyň öz domeniniň astynda açdy we öz sertifikatyny berdi. Sandbox sanawynda toruň öz sahnalary üçin synag üpjün edijisi hem bar. Häzir hasaba alyş proýekt dolandyryşynyň tassyklamasy bilen elde edilýär; gapjyk üpjün edijileriň özbaşdak hasaba durmagy üçin aýry karar gerek.

## Häzirki dogruçyl çäkler haýsylar?

- **Enjam synagy garaşylýar.** Enjam açarlary we enjam attestasiýasy durmuşa geçirildi; hakyky telefonlarda synag programma dükanyna çykarylmazdan öň geçirilýär ([ARF §2.8](https://arf.tamga.network/architecture)).
- **Häzirlikçe bir işjeň gapjyk üpjün edijisi.** Hakyky sanawda ýokarda beýan edilen ýeke gapjyk üpjün ediji ýazgysy, Tamga Wallet-iňki bar.
- **Play Integrity W3-den aşakda hökmany däl**, açar attestasiýasyz subutnamalary kabul edýän geçiş bolsa pilota çenli dowam edýär.
- **Ýitirilen telefony ýatyrmak** hasap talap etmeýär, ýöne ol adamyň üpjün edijiniň işjeňleşdirilende bir gezek görkezýän ýatyryş koduny saklamagyna daýanýar (RB-WP-15).
- **Entek sertifikatlaşdyrylan howpsuz element ýok.** W3 döwlet tapgyryna degişli.
- **Attestasiýalar adamy däl, programmany we açarlary subut edýär.** Adamyň kimdigi guramadaky şahsyýet barlagynyň jogap berýän aýry soragydyr.

## Köp berilýän soraglar

### Islendik gapjyk Tamga Network-a goşulyp bilermi?

Üpjün edijisi çap edilen düzgünlere eýerýän we laýyklyk synaglaryndan geçýän islendik gapjyk sanawa goşulyp biler. Tor gapjyklary ady boýunça däl, ynam sanawyndaky ýazgysy boýunça ykrar edýär.

### Gapjyk üpjün edijisi meniň haýsy guramalary ulanýandygymy bilýärmi?

Ýok. Her resminama haýyşy täze açarly we täze ýagdaý ornuly täze attestasiýany ulanýar, şonuň üçin üpjün ediji gapjygyň näçe gurama bilen gürleşýändigini görmeýär, guramalar bolsa şol bir telefony biri-biriniň arasynda baglanyşdyryp bilmeýär.

### Telefonymda howpsuz enjam bolmasa näme bolýar?

Gurnalyş programma derejesinde galýar we toruň düzgünleri hakyky resminamalar üçin programma açarly gapjyklary goldamaýar. Gapjyk ümsüm dowam etmegiň ýerine muny adama aýdyň aýtmaly.

### Gapjyk önümini tordan aýryp bolýarmy?

Hawa. Hasaba alyjy üpjün edijiniň ynam sanawyndaky ýazgysyny togtadyp ýa-da ýatyryp biler we şol pursatdan başlap onuň attestasiýalary hiç bir berijide geçmeýär.

## Çeşmeler

- [ÝB tehniki spesifikasiýasy TS3: wallet unit attestation (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts3-wallet-unit-attestation.md) · [EU Architecture and Reference Framework (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [OpenID for Verifiable Credential Issuance 1.0 (D goşundy açar attestasiýasy, E goşundy gapjyk attestasiýasy)](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html) · [HAIP 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [Android key attestation](https://developer.android.com/privacy-and-security/security-key-attestation) · [Apple App Attest](https://developer.apple.com/documentation/devicecheck/establishing-your-app-s-integrity) · [Play Integrity API](https://developer.android.com/google/play/integrity)
- [ADR-0025: gapjyk we açar attestasiýalary](https://docs.tamga.network/adr/0025-wallet-instance-and-key-attestations) · [ADR-0034: HAIP 1.0 laýyklygy](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub) · [ADR-0042: tor gapjyk işletmeýär](https://docs.tamga.network/adr/0042-network-and-wallets)
- [Tamga bilen laýyk gapjyk gurmak](https://docs.tamga.network/guides/build-a-wallet) · [Gapjyk spesifikasiýasy](https://docs.tamga.network/specifications/wallet)
- [Gapjyk gurmak](/learn/build-a-wallet) · [Ilkinji gapjyk](/learn/first-wallet) · [Sanly gapjyklar](/learn/digital-wallets)
