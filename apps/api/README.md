## API app (Express + MongoDB + TypeScript)

This is the `apps/api` workspace of the monorepo. It exposes an Express server with routes under `/api` and connects to MongoDB.

### Run (recommended from repo root)

From the monorepo root, start everything in dev mode:

```bash
pnpm dev
```

- API base: `http://localhost:4000/api`
  - Health: `GET /api/healthz`
  - Ready: `GET /api/readyz`

Run only the API app:

```bash
pnpm --filter api dev
```

### Environment

Create `apps/api/.env` with at least:

```bash
MONGODB_URI="mongodb://127.0.0.1:27017/mern_monorepo"
# Optional
PORT=4000
NODE_ENV=development
```

If using MongoDB Atlas, set `MONGODB_URI` to your connection string.

### Scripts (workspace)

- `pnpm --filter api dev` – start the dev server
- `pnpm --filter api build` – type-check and build
- `pnpm --filter api lint` – lint the project
- `pnpm --filter api typecheck` – run TypeScript checks
- `pnpm --filter api test` – run tests

The same scripts exist in this workspace and can be run with `pnpm <script>` after `cd apps/api`.

### Structure

- `src/server.ts` – create and start the server
- `src/index.ts` – app bootstrap and route mounting
- `src/routes/*` – route handlers (`/api` prefix)
- `src/models/*` – MongoDB models
- `src/lib/db.ts` – database connection

### Shared packages

The API consumes shared types and schemas from `packages/shared`:

```ts
import { someSharedType } from '@shared/core';
```

### Troubleshooting

- Mongo connection errors: ensure `mongod` is running, or use a valid `MONGODB_URI`.
- Port in use: change `PORT` in `.env`.
- Type issues: run `pnpm typecheck` at the root to see cross-workspace errors.

### More info

- See the root `README.md` for requirements, environment setup, and scripts.
