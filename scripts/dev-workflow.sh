#!/bin/bash
# Development Workflow Script
# Comprehensive development workflow for AI agents and developers

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
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

log_step() {
    echo -e "${PURPLE}🔄 $1${NC}"
}

log_ai() {
    echo -e "${CYAN}🤖 $1${NC}"
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

# AI Agent Development Workflow
ai_workflow() {
    log_ai "Starting AI Agent Development Workflow"
    echo ""
    
    # Step 1: Understand requirements
    log_step "Step 1: Understanding Requirements"
    log_info "Before starting any development task:"
    log_info "1. Read and understand the user's requirements"
    log_info "2. Ask clarifying questions if needed"
    log_info "3. Check existing code patterns in the project"
    log_info "4. Plan the implementation approach"
    echo ""
    
    # Step 2: Setup and preparation
    log_step "Step 2: Setup and Preparation"
    log_info "Preparing development environment..."
    
    # Check if dependencies are installed
    if [[ ! -d "node_modules" ]]; then
        log_warning "Dependencies not installed. Installing..."
        pnpm install
    fi
    
    # Check environment files
    if [[ ! -f "apps/api/.env" ]]; then
        log_warning "API .env file missing. You may need to create it."
    fi
    
    if [[ ! -f "apps/web/.env" ]]; then
        log_warning "Web .env file missing. You may need to create it."
    fi
    
    log_success "Setup completed!"
    echo ""
    
    # Step 3: Development process
    log_step "Step 3: Development Process"
    log_info "During development:"
    log_info "1. Follow existing code patterns and conventions"
    log_info "2. Use TypeScript strict mode (no 'any' types)"
    log_info "3. Write comprehensive error handling"
    log_info "4. Add proper JSDoc comments for exported functions"
    log_info "5. Follow the established file structure"
    echo ""
    
    # Step 4: Quality assurance
    log_step "Step 4: Quality Assurance (MANDATORY)"
    log_info "Before task completion, you MUST:"
    log_info "1. Run linting checks on ALL modified files"
    log_info "2. Fix ALL linting errors immediately"
    log_info "3. Re-check linting until no errors remain"
    log_info "4. Verify TypeScript compilation works"
    log_info "5. Test the functionality if applicable"
    log_info "6. Update documentation if needed"
    echo ""
    
    # Step 5: Final verification
    log_step "Step 5: Final Verification"
    log_info "Running comprehensive quality checks..."
    
    # Run type checking
    log_info "Running TypeScript type checking..."
    pnpm typecheck
    
    # Run linting
    log_info "Running ESLint..."
    pnpm lint
    
    # Run tests
    log_info "Running tests..."
    pnpm test
    
    log_success "All quality checks passed!"
    echo ""
    
    log_ai "AI Agent Development Workflow completed successfully!"
    log_info "Remember: Quality is not negotiable. Every line of code must meet the project's standards."
}

# User Development Workflow
user_workflow() {
    log_info "Starting User Development Workflow"
    echo ""
    
    # Step 1: Project setup
    log_step "Step 1: Project Setup"
    log_info "Setting up the development environment..."
    
    # Check Node.js version
    local node_version=$(node --version 2>/dev/null || echo "not installed")
    log_info "Node.js version: $node_version"
    
    # Check pnpm version
    local pnpm_version=$(pnpm --version 2>/dev/null || echo "not installed")
    log_info "pnpm version: $pnpm_version"
    
    # Install dependencies
    if [[ ! -d "node_modules" ]]; then
        log_info "Installing dependencies..."
        pnpm install
    fi
    
    log_success "Project setup completed!"
    echo ""
    
    # Step 2: Development environment
    log_step "Step 2: Development Environment"
    log_info "Starting development servers..."
    
    # Start development servers
    log_info "Starting all development servers (API + Web)..."
    log_info "This will start:"
    log_info "- API server on http://localhost:4000"
    log_info "- Web server on http://localhost:5173"
    log_info ""
    log_info "Press Ctrl+C to stop the servers"
    echo ""
    
    # Start development servers
    pnpm dev
}

# Quality Assurance Workflow
qa_workflow() {
    log_info "Starting Quality Assurance Workflow"
    echo ""
    
    # Step 1: Linting checks
    log_step "Step 1: Linting Checks"
    log_info "Running comprehensive linting checks..."
    pnpm lint
    
    if [[ $? -eq 0 ]]; then
        log_success "Linting checks passed!"
    else
        log_error "Linting checks failed. Please fix the errors before continuing."
        exit 1
    fi
    echo ""
    
    # Step 2: Type checking
    log_step "Step 2: Type Checking"
    log_info "Running TypeScript type checking..."
    pnpm typecheck
    
    if [[ $? -eq 0 ]]; then
        log_success "Type checking passed!"
    else
        log_error "Type checking failed. Please fix the errors before continuing."
        exit 1
    fi
    echo ""
    
    # Step 3: Testing
    log_step "Step 3: Testing"
    log_info "Running all tests..."
    pnpm test
    
    if [[ $? -eq 0 ]]; then
        log_success "All tests passed!"
    else
        log_error "Tests failed. Please fix the issues before continuing."
        exit 1
    fi
    echo ""
    
    # Step 4: Integration testing
    log_step "Step 4: Integration Testing"
    log_info "Running integration tests..."
    pnpm test:integration
    
    if [[ $? -eq 0 ]]; then
        log_success "Integration tests passed!"
    else
        log_error "Integration tests failed. Please fix the issues before continuing."
        exit 1
    fi
    echo ""
    
    log_success "All quality assurance checks passed!"
    log_info "The project is ready for deployment or further development."
}

# Build and Deploy Workflow
deploy_workflow() {
    log_info "Starting Build and Deploy Workflow"
    echo ""
    
    # Step 1: Pre-deployment checks
    log_step "Step 1: Pre-deployment Checks"
    log_info "Running pre-deployment quality checks..."
    
    # Run QA workflow
    qa_workflow
    
    # Step 2: Build process
    log_step "Step 2: Build Process"
    log_info "Building all packages..."
    pnpm build
    
    if [[ $? -eq 0 ]]; then
        log_success "Build completed successfully!"
    else
        log_error "Build failed. Please fix the issues before continuing."
        exit 1
    fi
    echo ""
    
    # Step 3: Final verification
    log_step "Step 3: Final Verification"
    log_info "Running final verification checks..."
    
    # Check if dist directories exist
    if [[ -d "apps/api/dist" ]] && [[ -d "apps/web/dist" ]]; then
        log_success "All build artifacts created successfully!"
    else
        log_error "Build artifacts missing. Build may have failed."
        exit 1
    fi
    echo ""
    
    log_success "Project is ready for deployment!"
    log_info "Build artifacts are available in:"
    log_info "- API: apps/api/dist"
    log_info "- Web: apps/web/dist"
}

# Show help
show_help() {
    echo "Development Workflow Script"
    echo ""
    echo "Usage: $0 <workflow>"
    echo ""
    echo "Workflows:"
    echo "  ai-workflow     AI Agent development workflow"
    echo "  user-workflow   User development workflow"
    echo "  qa-workflow     Quality assurance workflow"
    echo "  deploy-workflow Build and deploy workflow"
    echo "  help           Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 ai-workflow     # For AI agents"
    echo "  $0 user-workflow   # For users"
    echo "  $0 qa-workflow     # For quality checks"
    echo "  $0 deploy-workflow # For deployment"
}

# Main script logic
main() {
    check_project_root
    check_pnpm
    
    case "${1:-help}" in
        "ai-workflow")
            ai_workflow
            ;;
        "user-workflow")
            user_workflow
            ;;
        "qa-workflow")
            qa_workflow
            ;;
        "deploy-workflow")
            deploy_workflow
            ;;
        "help"|"--help"|"-h")
            show_help
            ;;
        *)
            log_error "Unknown workflow: $1"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
