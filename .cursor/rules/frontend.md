## Frontend Rules

- Use React 19 with Vite; prefer `@tanstack/react-query` for data fetching.
- Read API base from `VITE_API_BASE`; keep default in `README.md` synced with code.

### When changing API integration

- If routes, paths, or error envelope change, update `apps/web/src/api.ts` and the `README.md` examples.
- Document any new env vars or flags.
