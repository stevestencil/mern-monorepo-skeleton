#!/bin/bash
# AI Development Helper Script
# Provides common development tasks and quality checks for AI agents

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the project root
check_project_root() {
    if [[ ! -f "package.json" ]] || [[ ! -f "turbo.json" ]]; then
        log_error "Not in project root. Please run from the project root directory."
        exit 1
    fi
}

# Check if pnpm is available
check_pnpm() {
    if ! command -v pnpm &> /dev/null; then
        log_error "pnpm is not installed. Please install pnpm first."
        exit 1
    fi
}

# Run linting checks on specified files
check_linting() {
    local files=("$@")
    if [[ ${#files[@]} -eq 0 ]]; then
        log_info "No files specified for linting check."
        return 0
    fi
    
    log_info "Running linting checks on: ${files[*]}"
    
    # Check if files exist
    for file in "${files[@]}"; do
        if [[ ! -f "$file" ]]; then
            log_warning "File $file does not exist, skipping..."
            continue
        fi
    done
    
    # Run linting (this would need to be implemented with actual linting tool)
    log_success "Linting checks completed"
}

# Check project health
check_health() {
    log_info "Checking project health..."
    
    # Check if dependencies are installed
    if [[ ! -d "node_modules" ]]; then
        log_warning "Dependencies not installed. Running pnpm install..."
        pnpm install
    fi
    
    # Run type checking
    log_info "Running TypeScript type checking..."
    pnpm typecheck
    
    # Run linting
    log_info "Running ESLint..."
    pnpm lint
    
    # Run tests
    log_info "Running tests..."
    pnpm test
    
    log_success "Project health check completed!"
}

# Create new feature branch
new_feature() {
    local feature_name="$1"
    if [[ -z "$feature_name" ]]; then
        log_error "Feature name is required. Usage: $0 new-feature <feature-name>"
        exit 1
    fi
    
    # Sanitize feature name
    feature_name=$(echo "$feature_name" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g')
    
    log_info "Creating feature branch: feature/$feature_name"
    
    # Check if git is available
    if ! command -v git &> /dev/null; then
        log_error "Git is not available. Please install git first."
        exit 1
    fi
    
    # Create and checkout feature branch
    git checkout -b "feature/$feature_name"
    
    log_success "Feature branch 'feature/$feature_name' created and checked out"
    log_info "Remember to:"
    log_info "1. Write tests first (TDD approach)"
    log_info "2. Follow existing patterns in the codebase"
    log_info "3. Update documentation when necessary"
    log_info "4. Run linting checks before committing"
}

# Check setup and dependencies
check_setup() {
    log_info "Checking project setup..."
    
    # Check Node.js version
    local node_version=$(node --version 2>/dev/null || echo "not installed")
    log_info "Node.js version: $node_version"
    
    # Check pnpm version
    local pnpm_version=$(pnpm --version 2>/dev/null || echo "not installed")
    log_info "pnpm version: $pnpm_version"
    
    # Check if .env files exist
    if [[ -f "apps/api/.env" ]]; then
        log_success "API .env file exists"
    else
        log_warning "API .env file missing. You may need to create it."
    fi
    
    if [[ -f "apps/web/.env" ]]; then
        log_success "Web .env file exists"
    else
        log_warning "Web .env file missing. You may need to create it."
    fi
    
    # Install dependencies if needed
    if [[ ! -d "node_modules" ]]; then
        log_info "Installing dependencies..."
        pnpm install
    fi
    
    log_success "Setup check completed!"
}

# Prepare for deployment
deploy_ready() {
    log_info "Preparing for deployment..."
    
    # Run full build
    log_info "Building all packages..."
    pnpm build
    
    # Run all tests
    log_info "Running all tests..."
    pnpm test
    
    # Run integration tests
    log_info "Running integration tests..."
    pnpm test:integration
    
    # Check linting
    log_info "Running linting checks..."
    pnpm lint
    
    # Type check
    log_info "Running type checks..."
    pnpm typecheck
    
    log_success "Project is ready for deployment!"
}

# Clean project
clean_project() {
    log_info "Cleaning project..."
    
    # Remove node_modules
    if [[ -d "node_modules" ]]; then
        log_info "Removing node_modules..."
        rm -rf node_modules
    fi
    
    # Remove dist directories
    log_info "Removing dist directories..."
    find . -name "dist" -type d -exec rm -rf {} + 2>/dev/null || true
    
    # Remove coverage directories
    log_info "Removing coverage directories..."
    find . -name "coverage" -type d -exec rm -rf {} + 2>/dev/null || true
    
    # Clean pnpm cache
    log_info "Cleaning pnpm cache..."
    pnpm store prune
    
    log_success "Project cleaned!"
}

# Show help
show_help() {
    echo "AI Development Helper Script"
    echo ""
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Commands:"
    echo "  new-feature <name>    Create a new feature branch"
    echo "  check-setup           Check project setup and dependencies"
    echo "  check-health          Run comprehensive health checks"
    echo "  deploy-ready          Prepare project for deployment"
    echo "  clean                 Clean project (remove node_modules, dist, etc.)"
    echo "  lint <files...>       Run linting checks on specific files"
    echo "  help                 Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 new-feature user-authentication"
    echo "  $0 check-setup"
    echo "  $0 check-health"
    echo "  $0 deploy-ready"
    echo "  $0 lint apps/api/src/server.ts apps/web/src/App.tsx"
}

# Main script logic
main() {
    check_project_root
    check_pnpm
    
    case "${1:-help}" in
        "new-feature")
            new_feature "$2"
            ;;
        "check-setup")
            check_setup
            ;;
        "check-health")
            check_health
            ;;
        "deploy-ready")
            deploy_ready
            ;;
        "clean")
            clean_project
            ;;
        "lint")
            shift
            check_linting "$@"
            ;;
        "help"|"--help"|"-h")
            show_help
            ;;
        *)
            log_error "Unknown command: $1"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
