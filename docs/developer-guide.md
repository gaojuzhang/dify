# Developer Guide

## Architecture Overview

Dify follows a modern microservices architecture with the following key components:

### Backend Architecture

1. **API Layer (FastAPI)**
   - RESTful API endpoints
   - WebSocket support for real-time features
   - Authentication and authorization
   - Request validation and error handling

2. **Service Layer**
   - Business logic implementation
   - Model integration
   - Data processing
   - Background task management

3. **Data Layer**
   - PostgreSQL for relational data
   - Vector databases for embeddings
   - Redis for caching and queues
   - File storage (local/S3)

### Frontend Architecture

1. **Next.js Application**
   - Server-side rendering
   - Static site generation
   - API route handlers
   - Middleware integration

2. **Component Structure**
   - Atomic design principles
   - Reusable UI components
   - Custom hooks
   - Context providers

3. **State Management**
   - React Context API
   - Custom hooks for state
   - API integration layer

## Development Setup

### Backend Development

1. **Environment Setup**
   ```bash
   cd api
   poetry install
   cp .env.example .env
   # Configure .env for development
   ```

2. **Database Setup**
   ```bash
   poetry run flask db upgrade
   poetry run python3 -m app.commands init
   ```

3. **Running Tests**
   ```bash
   poetry run pytest
   ```

4. **Code Style**
   ```bash
   # Run Ruff linter
   poetry run ruff check .
   
   # Run type checking
   poetry run mypy .
   ```

### Frontend Development

1. **Environment Setup**
   ```bash
   cd web
   pnpm install
   cp .env.example .env
   # Configure .env for development
   ```

2. **Development Server**
   ```bash
   pnpm dev
   ```

3. **Running Tests**
   ```bash
   pnpm test
   ```

4. **Code Style**
   ```bash
   # Run ESLint
   pnpm lint
   
   # Run Prettier
   pnpm format
   ```

## Code Organization

### Backend Structure

```
api/
├── app.py                 # Application entry point
├── commands.py           # CLI commands
├── controllers/         # API endpoints
├── models/             # Database models
├── services/           # Business logic
├── tasks/              # Background tasks
├── libs/              # Shared utilities
├── extensions/        # Plugin system
└── tests/             # Test suite
```

### Frontend Structure

```
web/
├── app/               # Next.js pages and routes
├── components/        # React components
├── hooks/            # Custom React hooks
├── services/         # API integration
├── utils/            # Utility functions
├── types/            # TypeScript definitions
└── tests/            # Test suite
```

## Development Workflow

1. **Feature Development**
   - Create feature branch from main
   - Implement changes
   - Write tests
   - Update documentation
   - Create pull request

2. **Code Review Process**
   - Code style compliance
   - Test coverage
   - Performance considerations
   - Security review

3. **Testing Requirements**
   - Unit tests for all new features
   - Integration tests for API endpoints
   - End-to-end tests for critical flows
   - Performance testing for heavy operations

## API Development

1. **RESTful Endpoints**
   - Follow REST principles
   - Use proper HTTP methods
   - Implement proper error handling
   - Document using OpenAPI/Swagger

2. **WebSocket Endpoints**
   - Real-time communication
   - Connection management
   - Error handling
   - Client reconnection strategy

3. **Authentication**
   - JWT token-based auth
   - Role-based access control
   - API key management
   - Session handling

## Frontend Development

1. **Component Guidelines**
   - Functional components
   - TypeScript usage
   - Proper prop typing
   - Error boundary implementation

2. **State Management**
   - Context API usage
   - Custom hooks
   - Local state management
   - API state handling

3. **Styling**
   - Tailwind CSS usage
   - Component-specific styles
   - Theme customization
   - Responsive design

## Performance Optimization

1. **Backend Optimization**
   - Query optimization
   - Caching strategy
   - Background task processing
   - Resource pooling

2. **Frontend Optimization**
   - Code splitting
   - Lazy loading
   - Image optimization
   - Bundle size management

## Security Guidelines

1. **API Security**
   - Input validation
   - Rate limiting
   - CORS configuration
   - Authentication checks

2. **Data Security**
   - Encryption at rest
   - Secure communication
   - Access control
   - Audit logging

## Deployment

1. **Production Preparation**
   - Environment configuration
   - Database migrations
   - Static asset optimization
   - Security hardening

2. **Deployment Process**
   - CI/CD pipeline
   - Docker image building
   - Environment promotion
   - Rollback procedures

## Monitoring and Debugging

1. **Logging**
   - Structured logging
   - Log levels
   - Log aggregation
   - Error tracking

2. **Metrics**
   - Performance metrics
   - Business metrics
   - Resource utilization
   - Alert configuration

## Contributing Guidelines

1. **Code Contributions**
   - Fork the repository
   - Create feature branch
   - Follow code style
   - Write tests
   - Update documentation

2. **Documentation**
   - Keep docs up to date
   - Include code examples
   - Document breaking changes
   - Update changelog

For more detailed information about specific components, refer to:
- [API Reference](./api-reference.md)
- [Frontend Guide](./frontend-guide.md)
- [Testing Guide](./testing-guide.md) 