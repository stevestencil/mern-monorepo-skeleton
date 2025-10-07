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

# Check if docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ docker is not installed. Please install docker first."
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    pnpm install
fi

# Start MongoDB test service
echo "🐳 Starting MongoDB test service..."
docker-compose up -d mongo-test

# Wait for MongoDB to be ready
echo "⏳ Waiting for MongoDB to be ready..."
until docker-compose exec -T mongo-test mongosh --eval "db.runCommand('ping').ok" > /dev/null 2>&1; do
    echo "Waiting for MongoDB..."
    sleep 2
done
echo "✅ MongoDB is ready!"

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

# Clean up MongoDB test service
echo "🧹 Cleaning up MongoDB test service..."
docker-compose down mongo-test

echo "✅ All integration tests completed successfully!"
