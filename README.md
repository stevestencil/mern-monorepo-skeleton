# MERN Monorepo Skeleton (pnpm + Turborepo)

### Requirements

- **Node**: `>= 20.11.0`
- **pnpm**: `>= 10.18.1`

### Monorepo layout

- `apps/api`: Express + MongoDB API (TypeScript)
- `apps/web`: React + Vite web app
- `packages/shared`: Shared TypeScript types and Zod schemas
- `packages/config`: Shared config (ESLint, Prettier, TS base)

### One‑time setup

```bash
pnpm install
pnpm prepare # sets up husky
```

### Environment

You can either run `pnpm init-latest` (or `pnpm init-latest:conservative`) to auto-create the env files with defaults, or create them manually as below. The script will create `apps/api/.env` and `apps/web/.env` if they don't exist.

`apps/api/.env`

```bash
# Required
MONGODB_URI="mongodb://127.0.0.1:27017/mern_monorepo"

# Optional
PORT=4000
NODE_ENV=development
```

`apps/web/.env`

```bash
# Optional; defaults to http://localhost:4000/api
VITE_API_BASE="http://localhost:4000/api"
```

If you use MongoDB Atlas, set `MONGODB_URI` to that connection string.

### Run all apps (dev)

```bash
pnpm dev
```

- **Web**: `http://localhost:5173`
- **API** base: `http://localhost:4000/api`
  - Health: `GET /api/healthz`
  - Ready: `GET /api/readyz`
  - OpenAPI UI: `GET /api/docs`
  - OpenAPI JSON: `GET /api/docs.json`

Example:

```bash
curl -s http://localhost:4000/api/healthz
```

### Useful scripts

- `pnpm dev`: Run all workspaces in dev via Turborepo
- `pnpm build`: Build all workspaces
- `pnpm test`: Run tests
- `pnpm lint`: Lint all workspaces
- `pnpm typecheck`: Type-check all workspaces

Workspace-specific scripts also exist under each package (e.g., `apps/api`, `apps/web`).

### Updating all dependencies to latest

This repo ships a helper that installs, upgrades, and verifies:

```bash
# Aggressive: bump everything to latest (may include breaking versions)
pnpm init-latest

# Conservative: upgrade within semver ranges
pnpm init-latest:conservative
```

The script will:

1. install the workspace, 2) upgrade deps, 3) reinstall, 4) run lint/typecheck/tests.

### Notes

- The API mounts under `/api`. The web app uses `VITE_API_BASE` to find it.
- Shared DTOs/types live in `packages/shared` and are consumed by both API and Web via the `@shared/core` workspace package.
- Strict TypeScript is enforced; `any` is disallowed by ESLint and tsconfig.

### Troubleshooting

- **Mongo connection fails**: Ensure `mongod` is running locally, or provide a valid `MONGODB_URI`.
- **Port in use**: Change `PORT` in `apps/api/.env` or `VITE_API_BASE` in `apps/web/.env`.
- **pnpm/version mismatch**: Check the required versions above and upgrade your local toolchain.

See `.cursor/rules/*` for project rules used by Cursor.
