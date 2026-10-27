---
title: "Hakyky kriptografiýa, häzir işleýär: Tamga-nyň ilkinji wersiýasy"
slug: synthetic-data-real-cryptography
description: Häzir başdan-aýak işleýän zatlary (diplom, ýatyrylyş, şahsyýet, geçiş kartasy, bilet, web giriş) we heniz ulanýan her gysga ýolumyzy aç-açan ýazýarys.
date: 2026-09-27
lang: tk
category: announcements
draft: false
related: why-no-blockchain-yet, learn:roles, page:/whitepaper
---

Uniwersitetiň hakykatdan ulanjak ulgamyny gurduk we ony oýlanyp tapylan talyplar bilen işletdik. Kriptografiýa bilen bagly ähli zat hakyky. Hakyky däl zatlar diňe adamlar we iş bilen bagly käbir böleklerdir.

## Häzir näme işleýär?

- Uniwersitet gapjyga diplom ýa-da talyp resminamasyny berýär. Resminama her biri başga enjam açaryna bagly on nusga görnüşinde gelýär.
- Iş beriji iki meýdan soraýar we edil şol iki meýdany birnäçe sekuntda barlanan görnüşde alýar.
- Ýatyrylyş indiki kesgitli çap edilişde ähli barlaýjylara ýetýär. Uniwersitet togtadylanda täze resminama berip bilmeýär, ýöne öň beren diplomlary güýjünde galýar.
- Resminamanyň ekran suraty ret edilýär. Başga telefonyň açary bilen hödürlenen nusga hem ret edilýär.
- Şahsyýet barlagynyň ahyrynda şahsyýet resminamasy döredilýär we bu resminama ISO mdoc görnüşinde hem berilýär. Ýaşy barlaýan tarap bolsa diňe "18 ýaşdan uly" diýen maglumaty alýar.
- Kampus turniketleri we çärä giriş gapylary 60 sekunt güýjünde bolan QR geçiş kartasyny kabul edýär. Bilet bolsa diňe bir gezek ulanylyp bilner.
- Web saýt adamy gapjyk arkaly hasaba alýar we soňra her gün passkey bilen içeri goýberýär.

## Heniz haýsy gysga ýollary ulanýarys?

Her gysga ýol ýazga alnan we pilotdan öň ýapylar. Talyp ýazgylary nusga maglumatlardan ybarat we açarlar telefonyň howpsuz çipinde däl-de, programma üpjünçiliginde durýar. Uniwersitetiň gol açaryny Tamga saklaýar. Gapjyk üpjün edijisi programmanyň öz platformasy barada beren beýanyny kabul etmeýär. Şonuň üçin her gapjyk programma derejesinde hasaplanýar we App Store bilen Google Play wersiýasy bilen bilelikde App Attest / Play Integrity hökmany bolar. Mundan başga-da, häzir ýeke operator bar. Web giriş hasaba duran wagty ähli saýtlarda şol bir hasap bahasyny ulanýar we her saýt üçin aýratyn lakam ýol kartasynda bar. *(Täzelenme, 2026-10-06: Her saýt üçin aýratyn lakam indi işleýär. Tor hiç bir gapjyk üpjün edijisini işletmeýär we her gapjyk öz üpjün edijisini işledýär (ADR-0042). Hakyky torda guramalaryň gol açarlaryny Tamga saklamaýar (Tamga ARF §3).)*

> **Bellik:** Täzelenme, 2026-njy ýylyň 8-nji oktýabry: Gapjyk gurluşlarynda açarlar indi telefonyň howpsuz enjamynda durýar. Işleýän hyzmatda enjam attestasiýasy bolmadyk gapjyklara gapjyk attestasiýasy berilmeýär. App Attest we Android key attestation ulanylýar, Play Integrity bolsa islege bagly goşmaça barlagdyr. Jikme-jiklikler üçin [Gapjyga nähili ynanmaly?](/blog/trusting-a-wallet) ýazgysyna seredip bilersiňiz.

## Näme üçin bulary düşündirýäris?

Öz çäklerini gizleýän ynam infrastrukturasy ynama mynasyp däl. Toruň näme edýändigini we näme etmeýändigini [Ynam tory näme](/blog/what-is-a-trust-network) ýazgysynda, onuň näme üçin kitapsyz başlaýandygyny bolsa [Näme üçin blokçeýnsiz başlaýarys](/blog/why-no-blockchain-yet) ýazgysynda düşündirdik. ÝB arhitekturasy bilen ýanaşyk deňeşdirmäni (şol bir, köpri bilen baglanan, meýilleşdirilen) [rollar we adalgalar](/learn/roles) sahypasynda, meýilnamany bolsa [whitepaper](/whitepaper)-da tapyp bilersiňiz.
