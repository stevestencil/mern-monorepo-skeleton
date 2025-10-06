# MERN Monorepo Skeleton (pnpm + Turborepo + Cursor Rules)

## Quick Start
```bash
# Node >= 20, pnpm >= 9
pnpm install
pnpm prepare # sets up husky
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
pnpm dev
```
- Web: http://localhost:5173
- API: http://localhost:4000/api

See `.cursor/rules/*` for project rules used by Cursor.