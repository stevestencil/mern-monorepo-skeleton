## Backend Rules

- API is mounted under `/api`; keep this consistent with web defaults and `README.md`.
- Validate env with Zod in `apps/api/src/config/env.ts`. Any new env var must be documented in `README.md` with defaults or examples.
- When adding routes, ensure OpenAPI docs remain accessible and update `README.md` endpoints if developer-facing.
