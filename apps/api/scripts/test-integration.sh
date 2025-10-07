#!/bin/bash

# Integration Test Script for API
# This script starts MongoDB test service and runs integration tests

set -e

echo "🚀 Starting API Integration Tests..."

# Check if docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ docker is not installed. Please install docker first."
    exit 1
fi

# Start MongoDB test service
echo "🐳 Starting MongoDB test service..."
docker compose up -d mongo-test

# Wait for MongoDB to be ready
echo "⏳ Waiting for MongoDB to be ready..."
until docker compose exec -T mongo-test mongosh --eval "db.runCommand('ping').ok" > /dev/null 2>&1; do
    echo "Waiting for MongoDB..."
    sleep 2
done
echo "✅ MongoDB is ready!"

# Optional: Use Docker health check if available
if docker compose ps mongo-test | grep -q "healthy"; then
    echo "✅ MongoDB health check passed!"
fi

# Run integration tests
echo "🔧 Running integration tests..."
vitest run --config vitest.integration.config.ts

# Clean up MongoDB test service
echo "🧹 Cleaning up MongoDB test service..."
docker compose down mongo-test

echo "✅ Integration tests completed!"
