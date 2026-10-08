---
title: "Hakyky kriptografiýa, häzir işleýär: Tamga-nyň ilkinji wersiýasy"
slug: synthetic-data-real-cryptography
description: Häzir başdan-aýak işleýänler — diplom, ýatyrylyş, şahsyýet, geçiş kartasy, bilet, web giriş — we heniz ulanýan her gysga ýolumyz, açyk görkezilen görnüşde.
date: 2026-09-27
lang: tk
category: announcements
draft: false
related: why-no-blockchain-yet, learn:roles, page:/whitepaper
---

Uniwersitetiň hakykatdan ulanjak ulgamyny gurduk, soňra ony oýlanyp tapylan talyplar bilen işletdik. Kriptografiki zatlaryň ählisi hakyky; diňe adamlar we käbir iş bölekleri hakyky däl.

## Häzir işleýänler

- Uniwersitet gapjyga diplom ýa-da talyp resminamasyny berýär — her biri başga enjam açaryna baglanan on nusga.
- Iş beriji iki meýdan soraýar we takyk şol ikisini birnäçe sekuntda barlanan görnüşde alýar.
- Ýatyrylyş indiki kesgitli çap edilişde her barlaýja ýetýär; uniwersitetiň togtadylmagy täze resminama bermegi togtadýar, öňki diplomlar güýjünde galýar.
- Resminamanyň ekran suraty ret edilýär; başga telefonyň açary bilen hödürlenen nusga hem.
- Şahsyýet barlagy şahsyýet resminamasyny döredýär, ISO mdoc görnüşinde hem: ýaş barlagy diňe “18 ýaşdan uly”-ny alýar.
- Kampus turniketleri we çäre gapylary 60 sekuntlyk QR geçiş kartasyny kabul edýär; bilet bir gezek işleýär.
- Web saýt adamy gapjyk bilen hasaba alýar, soňra her gün passkey bilen içeri goýberýär.

## Heniz gysga ýol bolanlar

Her gysga ýol ýazga alnandyr we pilotdan öň ýapylýar: talyp ýazgylary nusgadyr, açarlar telefonyň howpsuz çipinde däl-de programmada durýar, uniwersitetiň gol açaryny Tamga saklaýar, gapjyk üpjün edijisi programmanyň öz platforma beýanyny kabul etmeýär (her gapjyk programma derejesinde hasaplanýar; App Store we Google Play wersiýasy bilen App Attest / Play Integrity hökmany bolar) we ýeke operator bar. Web giriş hasaba duran pursaty saýtlaryň arasynda şol bir hasap bahasyny ulanýar; her saýt üçin lakam ýol kartasynda. *(Täzelenme, 2026-10-06: her saýt üçin lakam indi işleýär. Tor gapjyk üpjün edijisini işletmeýär: her gapjyk özüňkini işledýär (ADR-0042). Hakyky torda guramalaryň gol açaryny Tamga saklamaýar (Tamga ARF §3).)*

> **Note:** Update, 8 October 2026: keys now live in the phone's secure hardware in the wallet builds, and wallets without hardware attestation get no wallet attestation on the live service. App Attest and Android key attestation are used; Play Integrity is an optional extra check. See [How do you trust a wallet?](/blog/trusting-a-wallet).

## Näme üçin bulary aýdýarys

Sebäbi çäklerini gizleýän ynam infrastrukturasy ynamdar däl. ÝB arhitekturasy bilen ýanaşyk deňeşdirme — şol bir, köpri, meýilleşdirilen — [rollar we adalgalar](/learn/roles) sahypasynda; meýilnama [whitepaper](/whitepaper)-da.
