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
cp .env.template .env   # Fill in HIGHNOTE_API_KEY
npm run codegen          # Generate types from Highnote schema
```

## Development

```bash
npm run codegen            # Regenerate types from Highnote schema (requires API key in .env)
npm run typecheck          # Type-check without emitting
npm run build              # Build CJS + ESM + .d.ts via tsup
npm run test:unit          # Run unit tests (no network, no credentials)
npm run test:integration   # Run integration tests (requires API key in .env)
npm run lint               # Lint with eslint
npm run format             # Format with prettier
npm run docs:gen           # Regenerate docs/SDK_REFERENCE.md, docs/resources/*, README table
npm run docs:check         # Fail if any committed doc would change (used by CI)
```

**Note:** `src/generated/graphql.ts` is gitignored. You must run `npm run
codegen` after cloning before typecheck or build will work.

## Documentation generation

`docs/SDK_REFERENCE.md`, `docs/resources/<name>.md`, and the resource table
inside `README.md` (between `<!-- resources:start -->` markers) are **all
auto-generated** from the public API surface. Never edit them by hand —
the next `npm run docs:gen` will overwrite your changes.

When you add or change a public method, run `npm run docs:gen` and commit
the regenerated docs alongside your code change. CI (`docs-drift`) runs
`docs:check` and fails the PR if you forget.

**If you ran `npm run codegen` (or pulled main after a schema update), run
`npm run docs:gen` afterwards and commit both.** Schema drift cascades into
doc drift — the descriptions and enum members in the generated docs come
from `src/generated/graphql.ts`, so a stale local copy of that file will
produce stale docs that fail `docs:check` on CI even though the doc
*generator* itself didn't change.

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

Both jobs run codegen before typecheck since `src/generated/graphql.ts` is gitignored.

## Releasing

Releases are published via the GitHub Actions manual release workflow.
