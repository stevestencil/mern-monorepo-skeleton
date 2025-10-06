# syntax=docker/dockerfile:1.7-labs

FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only necessary files for install context at the monorepo root
FROM base AS deps
WORKDIR /workspace
COPY ../../package.json ../../pnpm-lock.yaml ../../pnpm-workspace.yaml ./
COPY ../../packages ./packages
COPY ../../apps/api/package.json ./apps/api/package.json
COPY ../../apps/web/package.json ./apps/web/package.json
RUN pnpm install --frozen-lockfile --filter ./apps/api... --prod=false

# Build API
FROM deps AS build
WORKDIR /workspace
COPY ../../tsconfig.base.json ./
COPY ../../apps/api ./apps/api
RUN pnpm --filter ./apps/api build

# Prune prod deps
FROM deps AS prod-deps
WORKDIR /workspace
# Create a production-only deployment for just the API workspace
RUN pnpm --filter ./apps/api deploy --prod --legacy /out

# Runtime image
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Install pnpm for runtime scripts (optional but small)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy built output and pruned production deps
COPY --from=build /workspace/apps/api/dist ./dist
COPY --from=prod-deps /out/package.json ./package.json
COPY --from=prod-deps /out/node_modules ./node_modules

# Expose API port
ENV PORT=4000
EXPOSE 4000

CMD ["node", "dist/index.js"]


