#!/bin/bash

# Integration Test Runner Script
# This script runs integration tests for the MERN monorepo

set -e

echo "🚀 Starting Integration Tests..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install pnpm first."
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    pnpm install
fi

# Run API integration tests
echo "🔧 Running API integration tests..."
cd apps/api
pnpm test:integration
cd ../..

# Run Web integration tests
echo "🌐 Running Web integration tests..."
cd apps/web
pnpm test:integration
cd ../..

# Run Shared package tests (if any)
echo "📦 Running Shared package tests..."
cd packages/shared
pnpm test
cd ../..

echo "✅ All integration tests completed successfully!"
