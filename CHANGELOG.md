# Changelog

All notable changes to `@highnote-oss/nodejs-sdk` will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.2.0] — 2026-06-04

### Added
- `accountHolders.createMinimalUSBusiness` and `createUSBusiness` for B2B onboarding.
- `accountHolders.listFinancialAccounts(accountHolderId, options)` — auto-paginated, dispatches across `USPersonAccountHolder` / `USBusinessAccountHolder` / `Organization`.
- `cards.issueForApplicationWithOnDemandFunding(input)` — issues a payment card and opens its on-demand-funded financial account in a single mutation. Primary load-bearing API for the AP automation reference application.
- `collaborativeAuth.renameEndpoint`, `removeEndpoint`, `list()` (auto-paginated).
- `verifyCollaborativeAuthSignature(...)` exported utility for runtime CA request verification (HMAC-SHA256 + replay protection via `extensions.signatureTimestamp` freshness check, comma-separated rotated-key support).
- Exported types `CollaborativeAuthRequest`, `CollaborativeAuthResponse`, `VerifyCollaborativeAuthSignatureInput`, `VerifyCollaborativeAuthSignatureResult`.
- Re-exported `CollaborativeAuthorizationResponseCode` enum.

## [0.1.0]

Initial release.
