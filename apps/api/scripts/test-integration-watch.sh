#!/bin/bash

# Integration Test Watch Script for API
# This script starts MongoDB test service and runs integration tests in watch mode

set -e

echo "🚀 Starting API Integration Tests in Watch Mode..."

# Check if docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ docker is not installed. Please install docker first."
    exit 1
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

# Run integration tests in watch mode
echo "🔧 Running integration tests in watch mode..."
echo "💡 Press Ctrl+C to stop watching and clean up MongoDB service"
vitest --config vitest.integration.config.ts

# Clean up MongoDB test service when watch mode is stopped
echo "🧹 Cleaning up MongoDB test service..."
docker-compose down mongo-test

echo "✅ Integration tests watch mode completed!"
