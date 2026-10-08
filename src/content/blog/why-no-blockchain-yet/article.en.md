---
title: Why we start without a blockchain
slug: why-no-blockchain-yet
description: A ledger run by one operator is a slower database. Tamga starts with signed trust lists, the EU model, and adds a ledger once independent operators join.
date: 2026-09-27
lang: en
category: network
draft: false
related: how-trust-lists-work, network-as-a-foundation, learn:trust-lists, learn:why-not-blockchain-yet, page:/whitepaper
---

Our earlier writing described a permissioned blockchain as Tamga’s trust anchor. On 24 September 2026 we changed the order, not the destination. Here is why.

## A ledger needs more than one hand

A blockchain earns its keep when several **independent** parties keep the same record and none can rewrite it alone. Today there is one operator: Tamga, acting provisionally on behalf of the states. A chain with one validator adds cost and complexity, but no extra trust.

## What we do instead

We publish [signed trust lists](/learn/trust-lists), the model the EU uses for its own trusted lists. They are versioned and hash-chained, nothing is ever deleted, and every revocation-list publication and schema change goes into a public, hourly **anchor log**. A list that was rolled back or rewritten is detectable by anyone ([how a signed trust list works](/blog/how-trust-lists-work)).

## What does not change

- Institution and document-type identifiers are computed exactly as the contracts compute them.
- Every list field maps to a contract record; the list history can be replayed into the ledger and both are tested to give the same answers.
- Wallets, verifiers and credentials read trust through one interface; the switch changes nothing for them.

## When the ledger comes

A permissioned Besu/QBFT ledger is started once at least two independent validator operators agree in writing. Until then we say it plainly ([why the network is bound for a foundation](/blog/network-as-a-foundation)): the anchor rests on one operator’s signature; the public log, transparency report and audits deter misuse but do not make it impossible. Details in the [whitepaper v1.0](/whitepaper).
