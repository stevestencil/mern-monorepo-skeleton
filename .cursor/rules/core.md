## Core Repo Rules

- Prefer pnpm workspaces and Turborepo tasks (`pnpm dev/build/test/lint/typecheck`).
- Keep scripts idempotent; do not assume existing state.
- Update shared config in `packages/config` only if it benefits all workspaces.

### Documentation coupling (MANDATORY)

- When making changes that affect developer setup or DX, you MUST update `README.md` in the same change set.
- This includes any modifications to:
  - scripts under `package.json` or `scripts/*`
  - environment variables, defaults, or required values
  - ports, URLs, or API base paths
  - project bootstrap instructions, CI commands, or tooling versions
- If you add a new script or flag, document usage and expected outcomes in `README.md`.

### TypeScript & Lint

- Strict TypeScript across the monorepo. `any` is forbidden.
- Fix ESLint and type errors before committing.
