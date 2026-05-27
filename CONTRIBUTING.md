# Contributing

This repository is a **read-only public mirror** of the Highnote Node.js
SDK. Development happens here, but the SDK itself is maintained by Highnote
and we do not accept pull requests from outside the maintainer team.

- **Found a bug or want a feature?** Contact your Highnote account team or
  support channel.
- **Found a security issue?** Please report it via GitHub's
  [private vulnerability reporting form](https://github.com/highnote-oss/nodejs-sdk/security/advisories/new) —
  see [`SECURITY.md`](SECURITY.md).
- **External pull requests are auto-closed** by a workflow. We will still
  see any feedback you leave on the closed PR.

The rest of this document is for Highnote maintainers working on the SDK.

## Setup

```bash
git clone https://github.com/highnote-oss/nodejs-sdk.git
cd nodejs-sdk
npm install
npm run codegen          # Generate types from schema.graphql (no API key needed)
```

You only need `HIGHNOTE_API_KEY` in `.env` if you plan to run integration
tests (`npm run test:integration`) or refresh the schema snapshot
(`npm run schema:fetch`). Day-to-day SDK development — codegen, typecheck,
build, unit tests, docs — does not require an API key.

## Development

```bash
npm run codegen            # Regenerate types from the checked-in schema.graphql
npm run schema:fetch       # Refresh schema.graphql from live API (needs API key)
npm run schema:check       # Fail if schema.graphql is stale vs. live API
npm run typecheck          # Type-check without emitting
npm run build              # Build CJS + ESM + .d.ts via tsup
npm run test:unit          # Run unit tests (no network, no credentials)
npm run test:integration   # Run integration tests (requires API key in .env)
npm run format             # Format with prettier
npm run docs:gen           # Regenerate docs/SDK_REFERENCE.md, docs/resources/*, README table
npm run docs:check         # Fail if any committed doc would change (used by CI)
```

**Note:** `src/generated/graphql.ts` is gitignored. You must run `npm run
codegen` after cloning before typecheck or build will work.

## Schema snapshot

`schema.graphql` is a checked-in SDL dump of the Highnote GraphQL schema
we target. Codegen reads from this file, so PR CI is fully deterministic
— it never goes stale because the upstream API shipped a change.

Schema refresh happens via the `schema-drift` workflow (`.github/workflows/schema-drift.yml`),
which runs weekly (and on manual dispatch). It introspects the live API,
diffs against the snapshot, and opens an auto-PR refreshing
`schema.graphql` + the regenerated docs in lockstep. Review and merge
that PR as you would any other code change — that's how schema moves
land in the SDK.

## Documentation generation

`docs/SDK_REFERENCE.md`, `docs/resources/<name>.md`, and the resource table
inside `README.md` (between `<!-- resources:start -->` markers) are **all
auto-generated** from the public API surface. Never edit them by hand —
the next `npm run docs:gen` will overwrite your changes.

When you add or change a public method, run `npm run docs:gen` and commit
the regenerated docs alongside your code change. CI (`docs-drift`) runs
`docs:check` and fails the PR if you forget.

**If you change `schema.graphql` (almost always via the auto-PR from the
schema-drift workflow), run `npm run codegen && npm run docs:gen` and
commit the regenerated docs in the same PR.** The docs are derived from
`src/generated/graphql.ts`, which is derived from `schema.graphql` —
the three need to move together or CI will fail.

The generator (`scripts/gen-docs.ts`) requires:

- **JSDoc summary on every public resource method, exported utility, and
  error class.** First sentence becomes the doc summary.
- **At least one inline ` ```ts ` code block in the JSDoc** of every
  resource method and exported utility — used as the `**Example**` block
  in the rendered doc.

The generator surfaces all violations together with `file:method`
references when these are missing.

## Adding a New Resource

1. **Write `.graphql` operations** in `src/graphql/<resource>/`
   - Verify field names against `src/generated/graphql.ts`
   - Include `__typename` on all union members
   - Query useful response fields (at minimum: `id`, `__typename`, plus status/dates)
   - Use the correct `UserError` fragment: `errors { code description }`
   - Use `locality` not `city` for addresses

2. **Run codegen**: `npm run codegen`

3. **Create the resource file** at `src/resources/<resource>.ts`
   - Import generated types and document nodes
   - Use `Extract<>` to derive return types from mutation payloads
   - Call `throwIfError()` on union responses
   - Write JSDoc with correct field names (verify against the actual input type)

4. **Wire it up** in `src/client.ts` and export from `src/index.ts`
   - Export any enums SDK consumers need for inputs (see README for the pattern)
   - Export resource-specific types (e.g., `PhysicalPaymentCardOrder`)

5. **Add tests**
   - Unit test in `tests/unit/<resource>.test.ts` — mock `rawRequest`
   - Integration test in `tests/integration/` — at least one happy-path call

6. **Type safety checklist**
   - No `as any` in integration tests — import enums from the SDK's public exports
   - Return types use generated types, not inline objects
   - All required input fields documented in JSDoc examples
   - Verify required vs. optional fields match the generated input type

## CI

GitHub Actions runs on every PR and push to main:

- **Unit tests** on the Node versions listed in `.github/workflows/ci.yml`
- **Integration tests** (requires `HIGHNOTE_API_KEY` repo secret — skipped on fork PRs)
- **Docs drift check** (`docs:check`)

All jobs run codegen against the checked-in `schema.graphql` first
(`src/generated/graphql.ts` is gitignored). Only `Integration tests`
needs `HIGHNOTE_API_KEY` (for hitting the live API at test runtime).

## Releasing

Releases are published via the GitHub Actions manual release workflow.
