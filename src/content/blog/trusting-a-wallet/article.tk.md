---
title: "Gapjyga nähili ynanmaly? Attestasiýalar we enjam açarlary"
slug: trusting-a-wallet
description: "Tamga Network-da guramanyň resminama berjek gapjygyna nähili ynanýandygyny düşündirýäris: gapjyk attestasiýasy, açar attestasiýasy, enjam subutnamasy we ynam sanawy."
date: 2026-10-08
updated: 2026-10-23
lang: tk
category: privacy
draft: false
related: openid4vci-deep-dive, haip-and-token-status-list, how-trust-lists-work, what-the-network-never-sees
---

<!-- Sources: ADR-0025 1.0.0 (EU TS3 model; K1 unit registration, unit key never shown to institutions, unit record without personal data; K2 WIA Annex E, TS3 §2.3.1 fields, lifetime < 24 h (23 h), client_status ≥ 31 days (60), new PoP key and new status entry per transaction, no per-institution reuse; K3 KA Annex D, attested_keys, key_storage / user_authentication ISO 18045, certification, key_storage_status one shared entry per storage type (TS3 Option 1), in the jwt proof header, used once; K4 two status lists signed with a key registered in the trust list, WIA list ≥ 10,000 entries, "revoke this wallet", lost device needs an account later; K5 issuer checks at PAR/token and credential endpoint, KA level vs institution minimum, transition without KA until before the pilot (ADR-0025 K5; code checked 2026-10-23: a proof without KA counts as software key storage against the institution's min_key_storage); implementation notes: keys bound to phone lock, Play Integrity not mandatory, making it mandatory needs a separate ADR; WIA1–WIA4; change note ADR-0042). ADR-0034 (WIA sub shared by all instances, HAIP §4.4.1; x509_hash). ADR-0042 (K1–K6, NW1–NW4; implementation note: TAMGA-WP-1 same entry in production and sandbox, RESERVED until certificate; registration by hand with approval; self-registration separate decision). SPEC-WALLET-0001 §2.2 W1/W2/W3, WL3, WL11. SPEC-PROTO-0001 PR11, PR19. SPEC-TRUST-0001 §3 wallet_providers (ACTIVE only; RESERVED not used). guides/build-a-wallet §4 (Android key attestation checks; App Attest checks; until verified the unit counts as software; Play Integrity added at the store release). ARF architecture §3 roles, §7.1, §2.8 (hardware keys and device attestation implemented, device testing with the store release). Live 2026-10-08: production lotl wallet_providers one entry RESERVED with no signing keys; sandbox lotl adds the network's own test provider (ACTIVE). External: EU TS3, OpenID4VCI 1.0 Annexes D/E, HAIP 1.0, Android key attestation, Apple App Attest, Play Integrity. -->

Gurama gapjyga gapjygyň özi barada aýdýanlaryna görä däl-de, gol çekilen subutnamalardan ybarat zynjyra görä ynanýar. Munuň üçin ilki gapjygyň üpjün edijisi (wallet provider) Tamga Network-yň gol çekilen ynam sanawynda hasaba alnan bolmaly. Üpjün ediji her resminama haýyşynda gapjyga gysga ömürli we gol çekilen iki beýannama berýär. Olaryň biri gurnalyşyň gapjygyň hakyky we ýatyrylmadyk gurnalyşydygyny aýdýan gapjyk nusgasynyň attestasiýasydyr (WIA). Beýlekisi bolsa resminama açarlarynyň nirede saklanýandygyny habar berýän açar attestasiýasydyr (KA). Üpjün ediji açaryň enjamda saklanýandygyny diňe muny telefon platformasynyň öz subutnamasy, ýagny Android key attestation ýa-da Apple App Attest bilen barlan bolsa ýazyp biler. Gurama hem resminama bermezden öň bularyň hemmesini ynam sanawyna görä barlaýar. Toruň özi gapjyk işletmeýär, diňe gapjyk üpjün edijilerini sanawa girizýär.

## Näme üçin gurama haýsy gapjyga resminama berýändigi bilen gyzyklanýar?

Tamga resminamasy adamyň enjamyndaky açara bagly we şol açar kimde bolsa, resminamany şol görkezip bilýär. Açar adaty programma maglumatlarynyň arasynda saklansa, resminama bilen bilelikde başga telefona göçürilip bilnerdi we resminama indi kän zady subut etmezdi. Programma üýtgedilen nusga bolsa, razylyk ekranyny geçip ýa-da saklamaly däl görkezişlerini saklap bilerdi.

Şonuň üçin gurama diploma ýa-da şahsyýet resminamasyna gol çekmezden öň üç soragyň jogabyny bilmek isleýär. Gapjygyň toruň düzgünlerine eýerýändigini, bu gurnalyşyň entek güýjündedigini we resminamanyň baglanmagy soralýan açarlaryň hakykatdan howpsuz enjamdadygyny soraýar. ÝB çarçuwasy hem şol soraglary berýär we olara şol iki attestasiýa bilen jogap berýär. Bu attestasiýalar Komissiýanyň tehniki spesifikasiýasy [TS3](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts3-wallet-unit-attestation.md)-de beýan edilýär. Tamga hem bu modele eýerýär ([ADR-0025](https://docs.tamga.network/adr/0025-wallet-instance-and-key-attestations)).

## Kim nämä kepil geçýär?

Zynjyryň her halkasy diňe hakykatdan görüp bilýän zadyna kepil geçýär:

![Telefon platformasyndan berlen resminama çenli subutnamalar zynjyry](/blog/trusting-a-wallet/en/fig-zincir.png)

1. **Telefon platformasy** (Google-yň enjam attestasiýasy köki we Apple-yň App Attest köki) açaryň enjamyň howpsuz enjamynda döredilendigine we haýyşyň belli programmadan gelýändigine kepil geçýär.
2. **Gapjyk üpjün edijisi** bu subutnamany gurnalyş hasaba durýan wagty bir gezek barlaýar we şondan soň bu gurnalyş üçin attestasiýalara gol çekýär.
3. **Ynam sanawy** gapjyk üpjün edijisini we onuň gol sertifikatyny görkezýär. Üpjün edijiniň sanawda işjeň ýazgysy bolmasa, onuň attestasiýalary hiç zady aňlatmaýar.
4. **Guramanyň resminama beriş hyzmaty** attestasiýalary barlaýar, resminamany subut edilen açarlara baglaýar we oňa gol çekýär.

Tor bu zynjyrda diňe üçünji halkada ýerleşýär. Her üpjün edijiniň eýermeli düzgünlerini ýazýar we sanawy çap edýär. Telefonlary hasaba almaýar, attestasiýa gol çekmeýär we hiç hili enjam maglumatyny saklamaýar.

## Gapjyk nusgasynyň attestasiýasynda näme bar?

WIA [OpenID4VCI 1.0](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html) E goşundysyndaky formata laýyklykda gol çekilen JWT bolup, onuň meýdanlary TS3-den gelýär:

> **Bellik:** Aşakdaky mysal ýönekeýleşdirildi. Bahalar gysgaldyldy ýa-da oýlanyp tapyldy. Hakyky düzgünleri [ADR-0025](https://docs.tamga.network/adr/0025-wallet-instance-and-key-attestations)-de we [gapjyk gollanmasynda](https://docs.tamga.network/guides/build-a-wallet) tapyp bilersiňiz.

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

Gizlinligi esasan üç jikme-jiklik üpjün edýär:

- **`sub` her telefonda birmeňzeş.** Bu meýdan gurnalyşy däl-de, gapjyk önümini atlandyrýar. [HAIP 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html) profili muny talap edýär we Tamga hem bu düzgüni kabul etdi ([ADR-0034](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub)).
- **Ömri 24 sagatdan gysga.** Tamga-da bu möhlet 23 sagat.
- **Her resminama haýyşy üçin täze attestasiýa alynýar.** Täze attestasiýa `cnf` içinde täze eýeçilik açaryny we üpjün edijiniň ýagdaý sanawynda biri-birine baglanyşdyryp bolmaýan täze orny göterýär. WIA hiç haçan ikinji guramada ulanylmaýar. Şonuň netijesinde maglumatlaryny deňeşdirýän iki gurama şol bir telefonyň ikisi bilen hem aragatnaşyk saklandygyny bilip bilmeýär. Üpjün ediji hem gapjygyň näçe gurama bilen iş salyşýandygyny bilmeýär.

Gurnalyşyň uzak ömürli öz açary bolan birlik açary bolsa diňe gapjyk bilen onuň üpjün edijisiniň arasynda ulanylýar we hiç haçan gurama görkezilmeýär.

## Açar attestasiýasy näme goşýar?

WIA gurnalyşyň hakykydygyny aýdýar. OpenID4VCI D goşundysyndaky formatda aýry JWT bolan açar attestasiýasy bolsa resminamanyň baglanjak açarlary barada maglumat berýär:

- `attested_keys`: bukjadaky ähli açarlar; her resminama 10 nusga görnüşinde berilýändigi we her nusganyň öz açary bolýandygy üçin;
- `key_storage` we `user_authentication`: TS3-iň ulanýan ISO 18045 adalgalary bilen açaryň saklanyş we ulanyjy barlagy derejeleri;
- `key_storage_status`: üpjün edijiniň ýatyryp bilýän ýagdaý sanawy ýazgysy.

Bu ýazgy bilkastlaýyn umumy saklanýar. Her saklanyş görnüşi (programma ammary, Secure Enclave, StrongBox) üçin bir umumy ýazgy bar we bu TS3-iň rugsat berýän ilkinji saýlawydyr. Saklanyş görnüşleriniň biriniň howpsuz däldigi ýüze çyksa, üpjün ediji ony hemmeler üçin bir gezekde yzyna alyp biler. Açar attestasiýasy hem gurnalyşy tanadyp biljek hiç bir maglumaty açmaýar. Her açar takyk bir açar attestasiýasynda ýer alýar, her açar attestasiýasy diňe bir gezek ulanylýar we attestasiýa gapjygyň gurama iberýän eýeçilik subutnamasynyň başlygynda göterilýär.

Bu gurluşy dogruçyl saklaýan düzgün WIA3. Açar attestasiýasyndaky saklanyş derejesi hakykaty görkezmeli we barlanmadyk beýannama hiç haçan açar attestasiýasyna ýazylmaýar.

## Üpjün ediji açaryň enjamdadygyny nireden bilýär?

Üpjün ediji muny platformanyň gol çekilen subutnamasyndan bilýär we programmanyň özi barada aýdýanlaryna hiç haçan daýanmaýar ([gapjyk gollanmasy §4](https://docs.tamga.network/guides/build-a-wallet)):

![Gapjyk üpjün edijisiniň platformanyň subutnamasynda näme barlaýandygy](/blog/trusting-a-wallet/en/fig-kanit.png)

| Platforma | Subutnama | Näme barlanýar |
|---|---|---|
| Android | [key attestation](https://developer.android.com/privacy-and-security/security-key-attestation) zynjyry | Google-yň enjam köküne baglanmagy; bir gezeklik çagyryş bahasy; howpsuzlyk derejesi (TEE ýa-da StrongBox); barlanan ýüklenme; programmanyň paket ady |
| iOS | [Apple App Attest](https://developer.apple.com/documentation/devicecheck/establishing-your-app-s-integrity) | Apple-yň köküne baglanmagy; programmanyň şahsyýeti (Team ID we Bundle ID); müşderi maglumatlarynyň birlik açarynyň barmak yzyny göterýändigi |

Subutnama barlanýança gurnalyş programma derejesinde hasaplanýar we munuň näme aňladýandygyny toruň gapjyk düzgünleri kesgitleýär. Gapjyklar üç derejä bölünýär. W1 programma açaryny, W2 enjamyň howpsuz zolagyny (Secure Enclave ýa-da StrongBox), W3 bolsa döwlet tapgyry üçin sertifikatlaşdyrylan howpsuz elementi aňladýar. Kabul edilýän iň pes dereje W2. Programma açaryny ulanýan gapjyklar goldanmaýar. Munuň ýeke-täk kadadan çykmasy toruň sandbox sanawynda öz görkeziş ssenariýalary üçin saklaýan synag açarydyr (WL3 düzgüni).

Enjam açarlary telefonyň gulpuna hem bagly. Resminama açary diňe telefonyň gulpy açyk wagty ulanylyp bilner we her görkeziş enjamyň biometrik barlagy ýa-da paroly bilen tassyklanýar (WL11 düzgüni).

Android-de üpjün ediji goşmaça hökmünde programmanyň dükandan ýüklenendigini görkezýän [Play Integrity](https://developer.android.com/google/play/integrity) netijesini hem iberip biler. W2 derejesinde bu islege bagly. Bu netije açar attestasiýasyndan gelýän derejäni hiç haçan peseltmeýär we netijäniň bolmazlygy hasaba alynmaga päsgel bermeýär. Iň ýokary dereje bolan W3-de bolsa üpjün ediji birligi işjeňleşdirmezden öň we W3 derejesini yglan edýän her açar attestasiýasyndan öň platformanyň enjam attestasiýasyny barlamaly (RB-WP-17).

## Gurama resminama bermezden öň näme barlaýar?

![Resminama berijiniň tertip boýunça näme barlaýandygy](/blog/trusting-a-wallet/en/fig-denetim.png)

Ygtyýarlandyryş we token nokatlarynda resminama beriş hyzmaty WIA-ny barlaýar. Goly barlaýar we gol açarynyň ynam sanawynda ýazgysy `ACTIVE` bolan gapjyk üpjün edijisine degişlidigine seredýär. Soňra güýjünde bolýan möhletini, `cnf` açarynyň eýeçilik subutnamasyny we `client_status` bahasynyň ýatyrylmandygyny barlaýar.

Resminama nokadynda bolsa açar attestasiýasyny barlaýar. Attestasiýanyň goluny we üpjün edijiniň açaryny barlaýar. Gapjygyň iberen eýeçilik subutnamasynyň sanawdaky ilkinji açar bilen we guramanyň beren täze nonce-y arkaly gol çekilendigine seredýär. `key_storage_status` bahasynyň ýatyrylmandygyny we saklanyş derejesiniň guramanyň özüniň kesgitlän iň pes derejesine laýyk gelýändigini hem barlaýar. Diňe şondan soň resminama gol çekýär we her nusgany subut edilen açarlaryň birine baglaýar. Resminama beriş hyzmaty ýatyrylan WIA ýa-da açar attestasiýasy bilen hiç haçan resminama bermeýär (WIA4 düzgüni). Bu ädimleriň protokol tarapyny [OpenID4VCI-a çuňňur seredilişi](/blog/openid4vci-deep-dive) ýazgysynda düşündirdik.

Geçiş döwri üçin bir düzgüni hem aç-açan ýazýarys. Pilota çenli resminama beriş hyzmaty açar attestasiýasy bolmadyk eýeçilik subutnamasyny hem kabul edýär. Şeýle subutnama programma ammarynda saklanýan açar hökmünde bahalandyrylýar, şonuň üçin iň pes derejesi programmadan ýokary bolan gurama ony häzir hem ret edýär. Bu ýol pilotdan öň aýrylar.

## Gapjyk ýa-da tutuş gapjyk önümi nähili yzyna alynýar?

Darsyndan giňine çenli üç dereje bar:

| Näme yzyna alynýar | Kim edýär | Täsiri |
|---|---|---|
| Bir gurnalyş | gapjyk üpjün edijisi, adamyň haýyşy boýunça (mysal üçin telefony başga birine bermezden öň "bu gapjygy ýatyr") | şol gurnalyşa berlen ähli WIA ýazgylary ýatyrylýar |
| Açar saklanyşynyň bir görnüşi | gapjyk üpjün edijisi | şol saklanyş görnüşi üçin berlen her açar attestasiýasy ýagdaý barlagyndan geçmeýär |
| Tutuş gapjyk üpjün edijisi | hasaba alyş edarasy, ynam sanawy arkaly | üpjün edijiniň ýazgysy `SUSPENDED` ýa-da `REVOKED` bolýar we onuň attestasiýalary indi güýjünde hasaplanmaýar |

Telefonda eýýäm bar bolan resminamalar bu meseleden aýry. Olary resminamany beren guramalar öz [ýagdaý sanawlary](/blog/status-list-privacy) arkaly yzyna alýar. Gurnalyşyň ýatyrylmagy bolsa şol gurnalyşyň täze resminama almagyny togtadýar.

Ýiten ýa-da ogurlanan telefony uzakdan yzyna almak üçin adamyň şol telefon bolmazdan kimdigini subut edip biljek ýoly gerek. Karar bu meseläni soňky ädime goýýar.

## Näme üçin Tamga Network gapjyk işletmeýär?

Gapjyk işledýän tor öz önümine özi baha bermiş bolardy. ÝB modelinde hem her gapjygy ony hödürleýän gurama işledýär we ynam çarçuwasy diňe gapjyk üpjün edijilerini sanawa girizýär. Tamga Network hem şol bölünişige eýerýär ([ADR-0042](https://docs.tamga.network/adr/0042-network-and-wallets)):

- tor hiç bir gapjyk programmasyny, gapjyk üpjün edijisini ýa-da gapjyk saýtyny işletmeýär we toruň domen atlarynyň aşagynda hiç bir gapjyk hyzmaty işlemeýär;
- gapjygy diňe ynam sanawyndaky ýazgysy boýunça tanaýar we çap edilen düzgünlere eýerýän her üpjün ediji bu ýazgyny alyp biler;
- interfeýsleri we paketleri hiç bir gapjygyň adyny koda ýazmaýar;
- bir sandbox bar we ol tora degişli; gapjyk işläp düzüjisi öz üpjün edijisini işledýär we ony sandbox sanawynda hasaba aldyrýar.

[Tamga Wallet](https://tamgawallet.com/en) tordaky gapjyklaryň biridir. Ol aýry önüm hökmünde sanawa beýleki gapjyklar bilen şol bir ýoldan girýär. Onuň üpjün edijisiniň (`TAMGA-WP-1`) hakyky sanawda bir ýazgysy we sandbox sanawynda şol ýazgysy bar. Iki ýazgy hem 2026-njy ýylyň 14-nji oktýabryndan bäri `ACTIVE`. Şol gün gapjygyň operatory üpjün ediji hyzmatyny gapjygyň öz domeniniň aşagynda açdy we öz sertifikatyny berdi. Sandbox sanawynda mundan başga-da toruň öz görkeziş ssenariýalary üçin saklaýan synag üpjün edijisi bar. Hasaba alyş häzir elde we taslama ýolbaşçylygynyň tassyklamagy bilen geçirilýär. Gapjyk üpjün edijileriniň özlerini hasaba aldyryp bilmegi bolsa aýry karary talap edýär.

## Häzirki dogruçyl çäkler haýsylar?

- **Enjam synaglary garaşýar.** Enjam açarlary we enjam attestasiýasy durmuşa geçirildi. Hakyky telefonlar bilen synaglar programma dükany wersiýasyndan öň geçiriler ([ARF §2.8](https://arf.tamga.network/architecture)).
- **Häzirlikçe bir işjeň gapjyk üpjün edijisi bar.** Hakyky sanawda diňe ýokarda beýan edilen Tamga Wallet ýazgysy bar.
- **Play Integrity W3-den pes derejelerde islege bagly.** Açar attestasiýasy bolmadyk eýeçilik subutnamalaryny kabul edýän geçiş düzgüni hem pilota çenli güýjünde.
- **Ýiten telefony ýatyrmak** hasaby talap etmeýär, ýöne adamyň üpjün edijiniň işjeňleşdiriş wagtynda bir gezek görkezen ýatyryş koduny saklamagyna daýanýar (RB-WP-15).
- **Entek sertifikatlaşdyrylan howpsuz element ýok.** W3 derejesi döwlet tapgyryna degişli.
- **Attestasiýalar adamy däl-de, programma üpjünçiligini we açarlary subut edýär.** Adamyň kimdigi aýry sorag we oňa guramada geçirilýän şahsyýet barlagy jogap berýär.

## Köp berilýän soraglar

### Islendik gapjyk Tamga Network-a goşulyp bilermi?

Üpjün edijisi çap edilen düzgünlere eýerýän we laýyklyk synaglaryndan geçýän her gapjyk sanawa girip biler. Tor gapjyklary atlary boýunça däl-de, ynam sanawyndaky ýazgylary boýunça tanaýar.

### Gapjyk üpjün edijisi meniň haýsy guramalary ulanýandygymy bilýärmi?

Ýok. Her resminama haýyşynda täze açary we täze ýagdaý ornuny göterýän täze attestasiýa ulanylýar. Şonuň üçin üpjün ediji gapjygyň näçe gurama bilen aragatnaşyk saklaýandygyny görüp bilmeýär, guramalar hem şol bir telefony öz aralarynda gabat getirip bilmeýär.

### Telefonymda howpsuz enjam bolmasa näme bolýar?

Gurnalyş programma derejesinde galýar we toruň düzgünleri hakyky resminamalar üçin programma açaryny ulanýan gapjyklary goldamaýar. Gapjyk muny adama aç-açan aýtmaly we sessiz-üýnsüz dowam etmeli däl.

### Gapjyk önümini tordan aýryp bolýarmy?

Hawa. Hasaba alyş edarasy üpjün edijiniň ynam sanawyndaky ýazgysyny togtadyp ýa-da ýatyryp biler. Şol pursatdan soň üpjün edijiniň attestasiýalary hiç bir resminama beriş hyzmatyndan geçmeýär.

## Çeşmeler

- [ÝB tehniki spesifikasiýasy TS3: wallet unit attestation (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts3-wallet-unit-attestation.md) · [EU Architecture and Reference Framework (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [OpenID for Verifiable Credential Issuance 1.0 (D goşundy açar attestasiýasy, E goşundy gapjyk attestasiýasy)](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html) · [HAIP 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [Android key attestation](https://developer.android.com/privacy-and-security/security-key-attestation) · [Apple App Attest](https://developer.apple.com/documentation/devicecheck/establishing-your-app-s-integrity) · [Play Integrity API](https://developer.android.com/google/play/integrity)
- [ADR-0025: gapjyk we açar attestasiýalary](https://docs.tamga.network/adr/0025-wallet-instance-and-key-attestations) · [ADR-0034: HAIP 1.0 laýyklygy](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub) · [ADR-0042: tor gapjyk işletmeýär](https://docs.tamga.network/adr/0042-network-and-wallets)
- [Tamga bilen laýyk gapjyk gurmak](https://docs.tamga.network/guides/build-a-wallet) · [Gapjyk spesifikasiýasy](https://docs.tamga.network/specifications/wallet)
- [Gapjyk gurmak](/learn/build-a-wallet) · [Ilkinji gapjyk](/learn/first-wallet) · [Sanly gapjyklar](/learn/digital-wallets)
