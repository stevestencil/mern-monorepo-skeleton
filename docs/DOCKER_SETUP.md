# Docker Setup for MERN Monorepo

This document explains the Docker setup for the MERN monorepo, including development, testing, and production environments.

## 🐳 Docker Services

### Production Services

- **`mongo`** - Production MongoDB (port 27017)
- **`api`** - Production API server (port 4000)
- **`web`** - Production web app (port 5173)

### Development Services

- **`mongo`** - Development MongoDB (port 27017)
- **`api-dev`** - Development API with hot reload (port 4000)
- **`web-dev`** - Development web app with hot reload (port 5173)

### Test Services

- **`mongo-test`** - Test MongoDB (port 27018)
- **`api-test`** - Test API server (port 4001)

## 🚀 Quick Start

### Development Environment

```bash
# Start development environment
./scripts/docker-dev.sh

# Or manually:
docker-compose -f docker-compose.dev.yml up -d
```

### Test Environment

```bash
# Start test environment
./scripts/docker-test.sh

# Or manually:
docker-compose -f docker-compose.test.yml up -d
```

### Production Environment

```bash
# Start production environment
docker-compose up -d
```

## 🧪 Integration Testing

### Using Scripts (Recommended)

```bash
# API integration tests
cd apps/api
pnpm test:integration

# Watch mode
pnpm test:integration:watch

# Full monorepo integration tests
./scripts/run-integration-tests.sh
```

### Using Docker Directly

```bash
# Start test environment
docker-compose -f docker-compose.test.yml up -d

# Run tests
cd apps/api
pnpm test:integration

# Cleanup
docker-compose -f docker-compose.test.yml down
```

## 📁 Docker Compose Files

| File                      | Purpose     | Services                |
| ------------------------- | ----------- | ----------------------- |
| `docker-compose.yml`      | Production  | mongo, api, web         |
| `docker-compose.dev.yml`  | Development | mongo, api-dev, web-dev |
| `docker-compose.test.yml` | Testing     | mongo-test, api-test    |

## 🔧 Environment Variables

### Development

- `NODE_ENV=development`
- `MONGODB_URI=mongodb://mongo:27017/mern_dev`
- `PORT=4000`

### Testing

- `NODE_ENV=test`
- `MONGODB_URI=mongodb://mongo-test:27017/mern_test`
- `PORT=4001`

### Production

- `NODE_ENV=production`
- `MONGODB_URI=mongodb://mongo:27017/mern`
- `PORT=4000`

## 🗂️ Volumes

- **`mongo_data`** - Production MongoDB data
- **`mongo_dev_data`** - Development MongoDB data
- **`mongo_test_data`** - Test MongoDB data

## 🛠️ Scripts

| Script                                       | Purpose                       |
| -------------------------------------------- | ----------------------------- |
| `./scripts/docker-dev.sh`                    | Start development environment |
| `./scripts/docker-test.sh`                   | Start test environment        |
| `./scripts/run-integration-tests.sh`         | Run all integration tests     |
| `apps/api/scripts/test-integration.sh`       | Run API integration tests     |
| `apps/api/scripts/test-integration-watch.sh` | Run API tests in watch mode   |

## 🧹 Cleanup

```bash
# Stop all services
docker-compose down

# Stop development services
docker-compose -f docker-compose.dev.yml down

# Stop test services
docker-compose -f docker-compose.test.yml down

# Remove volumes (⚠️ This will delete all data)
docker-compose down -v
```

## 🔍 Health Checks

The MongoDB test service includes health checks to ensure it's ready before running tests:

```yaml
healthcheck:
  test: ['CMD', 'mongosh', '--eval', "db.runCommand('ping').ok"]
  interval: 5s
  timeout: 3s
  retries: 5
  start_period: 10s
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

```bash
# Check if MongoDB is running
docker-compose ps mongo-test

# Check MongoDB logs
docker-compose logs mongo-test

# Test MongoDB connection
docker-compose exec mongo-test mongosh --eval "db.runCommand('ping').ok"
```

### Port Conflicts

- Development API: 4000
- Test API: 4001
- Development Web: 5173
- Production Web: 5173
- MongoDB: 27017
- Test MongoDB: 27018

### Volume Issues

```bash
# List volumes
docker volume ls

# Remove specific volume
docker volume rm mern-monorepo-skeleton_mongo_test_data
```
