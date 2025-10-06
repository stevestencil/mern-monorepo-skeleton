@echo off
REM AI Development Helper Script for Windows
REM Provides common development tasks and quality checks for AI agents

setlocal enabledelayedexpansion

REM Check if we're in the project root
if not exist "package.json" (
    echo ❌ Not in project root. Please run from the project root directory.
    exit /b 1
)

if not exist "turbo.json" (
    echo ❌ Not in project root. Please run from the project root directory.
    exit /b 1
)

REM Check if pnpm is available
pnpm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ pnpm is not installed. Please install pnpm first.
    exit /b 1
)

REM Main script logic
if "%1"=="new-feature" goto new_feature
if "%1"=="check-setup" goto check_setup
if "%1"=="check-health" goto check_health
if "%1"=="deploy-ready" goto deploy_ready
if "%1"=="clean" goto clean_project
if "%1"=="lint" goto check_linting
if "%1"=="help" goto show_help
if "%1"=="--help" goto show_help
if "%1"=="-h" goto show_help
if "%1"=="" goto show_help
goto unknown_command

:new_feature
if "%2"=="" (
    echo ❌ Feature name is required. Usage: %0 new-feature ^<feature-name^>
    exit /b 1
)

set feature_name=%2
echo ℹ️  Creating feature branch: feature/%feature_name%

REM Check if git is available
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not available. Please install git first.
    exit /b 1
)

REM Create and checkout feature branch
git checkout -b "feature/%feature_name%"
if errorlevel 1 (
    echo ❌ Failed to create feature branch
    exit /b 1
)

echo ✅ Feature branch 'feature/%feature_name%' created and checked out
echo ℹ️  Remember to:
echo ℹ️  1. Write tests first (TDD approach)
echo ℹ️  2. Follow existing patterns in the codebase
echo ℹ️  3. Update documentation when necessary
echo ℹ️  4. Run linting checks before committing
goto end

:check_setup
echo ℹ️  Checking project setup...

REM Check Node.js version
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed
) else (
    for /f "tokens=*" %%i in ('node --version') do echo ℹ️  Node.js version: %%i
)

REM Check pnpm version
for /f "tokens=*" %%i in ('pnpm --version') do echo ℹ️  pnpm version: %%i

REM Check if .env files exist
if exist "apps\api\.env" (
    echo ✅ API .env file exists
) else (
    echo ⚠️  API .env file missing. You may need to create it.
)

if exist "apps\web\.env" (
    echo ✅ Web .env file exists
) else (
    echo ⚠️  Web .env file missing. You may need to create it.
)

REM Install dependencies if needed
if not exist "node_modules" (
    echo ℹ️  Installing dependencies...
    pnpm install
    if errorlevel 1 (
        echo ❌ Failed to install dependencies
        exit /b 1
    )
)

echo ✅ Setup check completed!
goto end

:check_health
echo ℹ️  Checking project health...

REM Check if dependencies are installed
if not exist "node_modules" (
    echo ⚠️  Dependencies not installed. Running pnpm install...
    pnpm install
    if errorlevel 1 (
        echo ❌ Failed to install dependencies
        exit /b 1
    )
)

REM Run type checking
echo ℹ️  Running TypeScript type checking...
pnpm typecheck
if errorlevel 1 (
    echo ❌ TypeScript type checking failed
    exit /b 1
)

REM Run linting
echo ℹ️  Running ESLint...
pnpm lint
if errorlevel 1 (
    echo ❌ ESLint failed
    exit /b 1
)

REM Run tests
echo ℹ️  Running tests...
pnpm test
if errorlevel 1 (
    echo ❌ Tests failed
    exit /b 1
)

echo ✅ Project health check completed!
goto end

:deploy_ready
echo ℹ️  Preparing for deployment...

REM Run full build
echo ℹ️  Building all packages...
pnpm build
if errorlevel 1 (
    echo ❌ Build failed
    exit /b 1
)

REM Run all tests
echo ℹ️  Running all tests...
pnpm test
if errorlevel 1 (
    echo ❌ Tests failed
    exit /b 1
)

REM Run integration tests
echo ℹ️  Running integration tests...
pnpm test:integration
if errorlevel 1 (
    echo ❌ Integration tests failed
    exit /b 1
)

REM Check linting
echo ℹ️  Running linting checks...
pnpm lint
if errorlevel 1 (
    echo ❌ Linting failed
    exit /b 1
)

REM Type check
echo ℹ️  Running type checks...
pnpm typecheck
if errorlevel 1 (
    echo ❌ Type checking failed
    exit /b 1
)

echo ✅ Project is ready for deployment!
goto end

:clean_project
echo ℹ️  Cleaning project...

REM Remove node_modules
if exist "node_modules" (
    echo ℹ️  Removing node_modules...
    rmdir /s /q node_modules
)

REM Remove dist directories
echo ℹ️  Removing dist directories...
for /d /r . %%d in (dist) do (
    if exist "%%d" rmdir /s /q "%%d"
)

REM Remove coverage directories
echo ℹ️  Removing coverage directories...
for /d /r . %%d in (coverage) do (
    if exist "%%d" rmdir /s /q "%%d"
)

REM Clean pnpm cache
echo ℹ️  Cleaning pnpm cache...
pnpm store prune

echo ✅ Project cleaned!
goto end

:check_linting
echo ℹ️  Running linting checks...
shift
pnpm lint
if errorlevel 1 (
    echo ❌ Linting failed
    exit /b 1
)
echo ✅ Linting checks completed!
goto end

:show_help
echo AI Development Helper Script
echo.
echo Usage: %0 ^<command^> [options]
echo.
echo Commands:
echo   new-feature ^<name^>    Create a new feature branch
echo   check-setup           Check project setup and dependencies
echo   check-health          Run comprehensive health checks
echo   deploy-ready          Prepare project for deployment
echo   clean                 Clean project (remove node_modules, dist, etc.)
echo   lint                  Run linting checks
echo   help                 Show this help message
echo.
echo Examples:
echo   %0 new-feature user-authentication
echo   %0 check-setup
echo   %0 check-health
echo   %0 deploy-ready
goto end

:unknown_command
echo ❌ Unknown command: %1
echo.
goto show_help

:end
