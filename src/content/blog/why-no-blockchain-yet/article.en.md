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

Our earlier writing described a permissioned blockchain as Tamga's trust anchor. On 24 September 2026 we changed the order in which we get there, while the destination stayed the same. This post explains why.

## A ledger needs more than one hand

A blockchain is worth its cost when several **independent** parties keep the same record and none of them can rewrite it alone. Today there is a single operator, Tamga, acting provisionally on behalf of the states. A chain with one validator adds cost and complexity without adding any trust.

## What we do instead

We publish [signed trust lists](/learn/trust-lists), which is the model the EU uses for its own trusted lists. The lists are versioned and hash-chained, and nothing is ever deleted from them. Every revocation list publication and every schema change goes into a public **anchor log** that gets at least one line an hour, so anyone can detect a list that was rolled back or rewritten ([how a signed trust list works](/blog/how-trust-lists-work)).

## What does not change

- Institution and document type identifiers are computed exactly the way the contracts compute them.
- Every list field maps to a contract record. The list history can be replayed into the ledger, and tests confirm that both give the same answers.
- Wallets, verifiers and credentials read trust through a single interface, so the switch changes nothing for them.

## When the ledger comes

A permissioned Besu/QBFT ledger will be started once at least two independent validator operators agree in writing. Until then we say it plainly ([why the network is bound for a foundation](/blog/network-as-a-foundation)). The anchor rests on one operator's signature, and the public log, the transparency report and audits deter misuse without making it impossible. The details are in the [whitepaper v1.0](/whitepaper).
