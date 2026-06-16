# Changelog

All notable changes to `@highnote-oss/nodejs-sdk` will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.2.1] — 2026-06-16

### Fixed
- `CollaborativeAuthRequest.merchantDetails`: the merchant category code field is now `categoryCode` (matching the collaborative-auth wire payload and the GraphQL `MerchantDetails` type). It was previously typed as `merchantCategoryCode` — a name that exists only on unrelated schema types and is absent from the CA payload — so it read back `undefined` at runtime and broke MCC-based authorization decisions. The field is now also optional, matching the schema's nullability.

## [0.2.0] — 2026-06-04

### Added
- `accountHolders.createMinimalUSBusiness` and `createUSBusiness` for B2B onboarding.
- `accountHolders.listFinancialAccounts(accountHolderId, options)` — auto-paginated, dispatches across `USPersonAccountHolder` / `USBusinessAccountHolder` / `Organization`.
- `cards.issueForApplicationWithOnDemandFunding(input)` — issues a payment card and opens its on-demand-funded financial account in a single mutation. Primary load-bearing API for the AP automation reference application.
- `collaborativeAuth.renameEndpoint`, `removeEndpoint`, `list()` (auto-paginated).
- `verifyCollaborativeAuthSignature(...)` exported utility for runtime CA request verification (HMAC-SHA256 + replay protection via `extensions.signatureTimestamp` freshness check, comma-separated rotated-key support).
- Exported types `CollaborativeAuthRequest`, `CollaborativeAuthResponse`, `VerifyCollaborativeAuthSignatureInput`, `VerifyCollaborativeAuthSignatureResult`.
- Re-exported `CollaborativeAuthorizationResponseCode` enum.

### Changed
- The exported `PaymentCard` type now includes the `IssuedPaymentCardWithOnDemandFundingAccount` variant returned by `cards.issueForApplicationWithOnDemandFunding`. Consumers that narrow on `__typename` are unaffected; consumers depending on the prior shape should ensure exhaustive handling of the new variant.
- The exported `CollaborativeAuthorizationEndpoint` type now includes the variants returned by `renameEndpoint` and `removeEndpoint`. Same narrowing guidance.

## [0.1.0]

Initial release.
