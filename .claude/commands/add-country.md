---
description: Add a new preset country's VAT/refund-rate data
argument-hint: [country name and current VAT/refund rate]
---

Add a preset country: $ARGUMENTS

Follow the existing pattern in `script.js`'s `countryNames` and rate lookup objects — add the entry in all three language dictionaries (zh/en/de), not just one. Cite the source of the VAT rate and typical cash-refund percentage (official government rate vs. estimated operator payout) in your summary to me before committing, since this data has no automated verification and the tool explicitly disclaims it as an estimate, not tax advice.
