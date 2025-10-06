# Architecture Overview

This document describes the architecture and design patterns used in this MERN monorepo skeleton.

## Monorepo Structure

```
├── apps/
│   ├── api/          # Express.js API server
│   └── web/          # React frontend application
├── packages/
│   ├── shared/       # Shared types and utilities
│   └── config/       # Shared configuration files
├── docs/             # Documentation
└── scripts/          # Build and utility scripts
```

## Technology Stack

### Backend (API)

- **Runtime**: Node.js (>= 20.11.0)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Language**: TypeScript (strict mode)
- **Validation**: Zod schemas
- **Logging**: Pino
- **Security**: Helmet, CORS

### Frontend (Web)

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript (strict mode)
- **Styling**: CSS (extensible to CSS-in-JS)
- **State Management**: React hooks + TanStack Query (recommended)

### Shared

- **Types**: TypeScript interfaces and types
- **Validation**: Zod schemas
- **Utilities**: Common functions and helpers

## Design Patterns

### 1. Monorepo Pattern

- **Single repository** for related applications
- **Shared dependencies** and configuration
- **Consistent tooling** across all packages
- **Independent deployment** of applications

### 2. Workspace Pattern

- **pnpm workspaces** for dependency management
- **Turborepo** for build orchestration
- **Shared configuration** in `packages/config/`
- **Path aliases** for internal imports

### 3. API Design Pattern

- **RESTful endpoints** under `/api` prefix
- **Zod validation** for all request bodies
- **Structured error responses**
- **Health check endpoints** (`/healthz`, `/readyz`)

### 4. Frontend Pattern

- **Component-based architecture**
- **Custom hooks** for business logic
- **API client** with error handling
- **Environment-based configuration**

## File Organization

### API Structure

```
apps/api/src/
├── config/          # Environment configuration
├── lib/             # Utility functions
├── models/          # Mongoose models
├── routes/          # Express route handlers
├── __tests__/       # Test files
└── index.ts         # Application entry point
```

### Web Structure

```
apps/web/src/
├── components/      # Reusable UI components
├── pages/           # Page components
├── hooks/           # Custom React hooks
├── api/             # API client functions
├── utils/           # Utility functions
└── App.tsx          # Root component
```

### Shared Structure

```
packages/shared/src/
├── types/           # TypeScript type definitions
├── zod/             # Zod validation schemas
├── utils/           # Shared utility functions
└── index.ts         # Public API
```

## Configuration Management

### Environment Variables

- **API**: `apps/api/.env` for server configuration
- **Web**: `apps/web/.env` for client configuration
- **Validation**: Zod schemas for type-safe environment handling

### TypeScript Configuration

- **Base config**: `tsconfig.base.json` with strict settings
- **Workspace configs**: Extend base with workspace-specific settings
- **Path mapping**: `@shared/*` aliases for internal imports

### ESLint Configuration

- **Flat config** (ESLint v9+)
- **TypeScript-aware** rules
- **Import organization** and sorting
- **Strict type checking** rules

## Development Workflow

### 1. Local Development

```bash
# Install dependencies
pnpm install

# Start all services
pnpm dev

# Individual services
pnpm --filter api dev
pnpm --filter web dev
```

### 2. Building

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter api build
```

### 3. Testing

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm --filter api test
```

## Best Practices

### Code Organization

- **Single responsibility**: Each module has one clear purpose
- **Functional approach**: Prefer functions over classes
- **Type safety**: No `any` types allowed
- **Documentation**: JSDoc for all exported functions

### API Development

- **Validation first**: All inputs validated with Zod
- **Error handling**: Structured error responses
- **Logging**: Use Pino for structured logging
- **Security**: Helmet and CORS properly configured

### Frontend Development

- **Component composition**: Build complex UIs from simple components
- **Custom hooks**: Extract business logic into reusable hooks
- **Type safety**: Proper TypeScript usage throughout
- **Performance**: Use React.memo and useMemo appropriately

### Shared Code

- **Pure functions**: No side effects in shared utilities
- **Type definitions**: Comprehensive TypeScript interfaces
- **Validation schemas**: Zod schemas for runtime validation
- **Documentation**: Clear examples and usage patterns

## Deployment Considerations

### Docker Support

- **Multi-stage builds** for optimized images
- **Docker Compose** for local development
- **Environment-specific** configurations

### Production Readiness

- **Health checks** for monitoring
- **Structured logging** for debugging
- **Error boundaries** for graceful failures
- **Security headers** and CORS configuration

## Extension Points

### Adding New Features

1. **API**: Add routes in `apps/api/src/routes/`
2. **Web**: Add components in `apps/web/src/components/`
3. **Shared**: Add types in `packages/shared/src/types/`

### Adding New Packages

1. Create directory in `packages/`
2. Add to `pnpm-workspace.yaml`
3. Configure TypeScript and build scripts
4. Update path mappings if needed

### Adding New Apps

1. Create directory in `apps/`
2. Add to `pnpm-workspace.yaml`
3. Configure build and dev scripts
4. Update Docker configuration if needed

## Security Considerations

### API Security

- **Input validation** with Zod schemas
- **CORS configuration** for cross-origin requests
- **Helmet middleware** for security headers
- **Environment variable** validation

### Frontend Security

- **Content Security Policy** headers
- **XSS prevention** through React's built-in protection
- **Environment variable** security
- **HTTPS enforcement** in production

## Performance Considerations

### API Performance

- **Database indexing** for query optimization
- **Connection pooling** for MongoDB
- **Response compression** with Express
- **Caching strategies** for frequently accessed data

### Frontend Performance

- **Code splitting** with dynamic imports
- **Lazy loading** for routes and components
- **Memoization** for expensive calculations
- **Bundle optimization** with Vite

## Monitoring and Observability

### Logging

- **Structured logging** with Pino
- **Request/response** logging
- **Error tracking** and reporting
- **Performance metrics**

### Health Checks

- **API health**: `/api/healthz`
- **Readiness check**: `/api/readyz`
- **Database connectivity** verification
- **Dependency health** monitoring

This architecture provides a solid foundation for building scalable MERN applications with modern development practices and AI-assisted development support.
