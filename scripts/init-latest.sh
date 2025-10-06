#!/usr/bin/env bash
set -euo pipefail

# Usage: bash scripts/init-latest.sh [conservative|aggressive]
MODE="${1:-aggressive}"

echo "[init-latest] Installing workspace..."
pnpm -w install

if [ "$MODE" = "conservative" ]; then
  echo "[init-latest] Upgrading within semver ranges (conservative)..."
  pnpm -w up -Lri
else
  echo "[init-latest] Bumping all dependencies to latest (aggressive)..."
  pnpm dlx npm-check-updates -u --workspaces --root
fi

echo "[init-latest] Re-installing to regenerate lockfiles..."
pnpm -w install

echo "[init-latest] Running checks..."
pnpm -w lint
pnpm -w typecheck
pnpm -w test

echo "[init-latest] Done. Review changes and commit."


