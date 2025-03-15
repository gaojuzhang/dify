# Dify Documentation

## Overview

Dify is an open-source LLM (Large Language Model) application development platform that provides a comprehensive suite of tools for building, deploying, and managing AI applications. The platform combines visual workflow design, RAG (Retrieval-Augmented Generation) pipeline capabilities, agent functionalities, and robust model management features.

## Project Structure

The project is organized into several main components:

### Backend (api/)
- **Core Application**: Python-based FastAPI application
- **Services**: Business logic implementation
- **Models**: Database models and schemas
- **Controllers**: API endpoints and request handling
- **Tasks**: Background job processing
- **Extensions**: Plugin system and extensions
- **Tests**: Comprehensive test suite

### Frontend (web/)
- **Next.js Application**: Modern React-based web interface
- **Components**: Reusable UI components
- **Services**: API integration layer
- **Hooks**: Custom React hooks
- **Context**: Global state management
- **i18n**: Internationalization support

### Docker
- Production-ready containerization
- Development environment setup
- Multi-container orchestration

## Key Features

1. **Workflow Builder**
   - Visual canvas for AI workflow design
   - Component-based workflow construction
   - Real-time testing and validation

2. **Model Support**
   - Integration with multiple LLM providers
   - Support for proprietary and open-source models
   - Model performance comparison tools

3. **Prompt IDE**
   - Interactive prompt development environment
   - Model response visualization
   - Performance metrics and analytics

4. **RAG Pipeline**
   - Document ingestion and processing
   - Advanced retrieval mechanisms
   - Support for multiple document formats
   - Vector store integration

5. **Development Tools**
   - API documentation
   - SDK support
   - Debugging utilities
   - Performance monitoring

## Getting Started

For detailed setup instructions and usage guides, please refer to:
- [Installation Guide](./installation.md)
- [Developer Guide](./developer-guide.md)
- [API Reference](./api-reference.md)
- [Frontend Guide](./frontend-guide.md)
- [Version History](./version-history.md)

## Contributing

We welcome contributions! Please see our [Contributing Guide](./contributing.md) for details on how to get involved. 