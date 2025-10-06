# syntax=docker/dockerfile:1.7-labs

FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS deps
WORKDIR /workspace
COPY ../../package.json ../../pnpm-lock.yaml ../../pnpm-workspace.yaml ./
COPY ../../packages ./packages
COPY ../../apps/web/package.json ./apps/web/package.json
COPY ../../apps/api/package.json ./apps/api/package.json
RUN pnpm install --frozen-lockfile --filter ./apps/web... --prod=false

FROM deps AS build
WORKDIR /workspace
COPY ../../tsconfig.base.json ./
COPY ../../apps/web ./apps/web
RUN pnpm --filter ./apps/web build

FROM deps AS prod-deps
WORKDIR /workspace
# Create a production-only deployment for just the Web workspace
RUN pnpm --filter ./apps/web deploy --prod --legacy /out

# Static file server
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install a tiny static server using npm to avoid PNPM global bin issues
RUN npm install -g serve@14.2.3

COPY --from=build /workspace/apps/web/dist ./dist

EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]


