# Contributing to MERN Monorepo Skeleton

Thank you for your interest in contributing to this MERN monorepo skeleton! This document provides guidelines for contributing to the project.

## Development Setup

### Prerequisites

- **Node.js**: `>= 20.11.0`
- **pnpm**: `>= 10.18.1`

### Getting Started

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Set up environment files (see README.md for details)
4. Run the development server: `pnpm dev`

## Code Style & Standards

### TypeScript

- **Strict mode**: All TypeScript code must use strict mode
- **No `any` type**: The `any` type is forbidden throughout the codebase
- **Type safety**: All functions and variables must be properly typed
- **JSDoc comments**: All exported functions and types must have JSDoc documentation

### Code Organization

- **Functional approach**: Prefer functional, small modules over large classes
- **Single responsibility**: Each module should have a single, clear purpose
- **File naming**: Use kebab-case for files, PascalCase for components
- **Import organization**: Use consistent import ordering (external, internal, relative)

### React/Frontend

- **Component structure**: Keep components small and focused
- **Hooks**: Use React hooks appropriately, avoid unnecessary re-renders
- **State management**: Use TanStack Query for server state, local state for UI state
- **Accessibility**: Ensure components are accessible (proper ARIA labels, keyboard navigation)

### API/Backend

- **Validation**: All request bodies must be validated with Zod
- **Error handling**: Use proper HTTP status codes and error messages
- **Security**: Never expose sensitive information in error responses
- **Logging**: Use structured logging with pino

## Commit Guidelines

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```
feat(api): add user authentication endpoint
fix(web): resolve React hydration mismatch
docs: update README with new environment variables
```

### Commit Requirements

- Keep commits atomic and focused
- Write clear, descriptive commit messages
- Include tests for new features
- Update documentation when necessary

## Pull Request Process

### Before Submitting

1. **Run tests**: `pnpm test`
2. **Run linting**: `pnpm lint`
3. **Type check**: `pnpm typecheck`
4. **Build**: `pnpm build`
5. **Update documentation**: If your changes affect setup or usage

### PR Requirements

- **Small and focused**: Keep PRs small and focused on a single feature/fix
- **Tests**: Include tests for new functionality
- **Documentation**: Update relevant documentation
- **Breaking changes**: Clearly document any breaking changes
- **Description**: Provide a clear description of changes

### Review Process

- All PRs require review before merging
- Address all review comments
- Ensure CI passes
- Keep PRs up to date with main branch

## Testing Standards

### Unit Tests

- Write tests for all new functionality
- Use descriptive test names
- Test both success and error cases
- Mock external dependencies

### Integration Tests

- Test API endpoints with real database
- Test component interactions
- Test error scenarios

### Test Structure

```
src/
├── __tests__/
│   ├── unit/
│   └── integration/
```

## Documentation Standards

### Code Documentation

- **JSDoc**: All exported functions must have JSDoc comments
- **Type definitions**: Document complex types and interfaces
- **Examples**: Include usage examples for complex functions

### Project Documentation

- **README updates**: Update README.md for any setup or usage changes
- **API documentation**: Document new API endpoints
- **Environment variables**: Document new environment variables

## Security Guidelines

- **Never commit secrets**: Use environment variables for sensitive data
- **Input validation**: Validate all user inputs
- **Error handling**: Don't expose sensitive information in errors
- **Dependencies**: Keep dependencies updated and audit for vulnerabilities

## Development Workflow

1. **Create feature branch**: `git checkout -b feature/your-feature-name`
2. **Make changes**: Follow code style guidelines
3. **Test changes**: Run all tests and linting
4. **Commit changes**: Use proper commit message format
5. **Push branch**: `git push origin feature/your-feature-name`
6. **Create PR**: Submit pull request with clear description
7. **Address feedback**: Respond to review comments
8. **Merge**: After approval, merge the PR

## Questions?

If you have questions about contributing, please:

1. Check existing issues and discussions
2. Create a new issue with the "question" label
3. Reach out to maintainers

Thank you for contributing to this project!
