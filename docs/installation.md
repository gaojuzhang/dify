# Installation Guide

## System Requirements

Before installing Dify, ensure your system meets the following minimum requirements:

- CPU: 2+ cores
- RAM: 4+ GB
- Operating System: Linux, macOS, or Windows with Docker support
- Docker and Docker Compose installed
- Git (for source installation)

## Installation Methods

### 1. Docker Compose (Recommended)

The easiest way to deploy Dify is using Docker Compose:

1. Clone the repository:
   ```bash
   git clone https://github.com/langgenius/dify.git
   cd dify
   ```

2. Navigate to the Docker directory:
   ```bash
   cd docker
   ```

3. Create environment configuration:
   ```bash
   cp .env.example .env
   ```

4. Start the services:
   ```bash
   docker compose up -d
   ```

5. Access the Dify dashboard at `http://localhost/install` to complete initialization.

### 2. Source Installation

For development or customization purposes:

1. Clone the repository:
   ```bash
   git clone https://github.com/langgenius/dify.git
   cd dify
   ```

2. Backend Setup:
   ```bash
   cd api
   cp .env.example .env
   # Configure your .env file
   
   # Using Poetry
   poetry install
   poetry run flask db upgrade
   poetry run python3 -m app.commands init
   poetry run python3 -m app.commands create_super_user
   poetry run python3 -m app
   ```

3. Frontend Setup:
   ```bash
   cd web
   cp .env.example .env
   # Configure your .env file
   
   pnpm install
   pnpm dev
   ```

## Configuration

### Environment Variables

Key configuration options in `.env`:

#### Backend (api/.env)
- `FLASK_APP`: Application entry point
- `FLASK_DEBUG`: Debug mode toggle
- `FLASK_ENV`: Environment setting
- `SECRET_KEY`: Application secret key
- `DATABASE_URL`: Database connection string
- `REDIS_URL`: Redis connection string
- `STORAGE_TYPE`: File storage configuration
- `VECTOR_STORE`: Vector database settings

#### Frontend (web/.env)
- `NEXT_PUBLIC_API_URL`: Backend API endpoint
- `NEXT_PUBLIC_APP_URL`: Frontend application URL
- `NEXT_PUBLIC_DEPLOY_ENV`: Deployment environment

### Database Setup

Dify supports multiple database backends:

1. PostgreSQL (Recommended)
   - Create database and user
   - Update DATABASE_URL in .env

2. Vector Store Options
   - Weaviate
   - Milvus
   - Qdrant
   - Update VECTOR_STORE settings accordingly

### Storage Configuration

Configure file storage:

1. Local Storage
   - Set STORAGE_TYPE=local
   - Configure storage path

2. S3-Compatible Storage
   - Set STORAGE_TYPE=s3
   - Configure S3 credentials and bucket

## Security Considerations

1. Production Deployment
   - Use strong SECRET_KEY
   - Enable HTTPS
   - Configure proper firewall rules
   - Set secure cookie settings

2. API Security
   - Configure CORS settings
   - Implement rate limiting
   - Use API authentication

## Troubleshooting

Common issues and solutions:

1. Database Connection
   - Verify credentials
   - Check network connectivity
   - Ensure database exists

2. Storage Issues
   - Verify permissions
   - Check storage configuration
   - Validate credentials

3. Docker Issues
   - Check container logs
   - Verify port availability
   - Ensure sufficient resources

## Upgrading

To upgrade your Dify installation:

1. Docker Compose:
   ```bash
   cd docker
   docker compose down
   git pull
   docker compose pull
   docker compose up -d
   ```

2. Source Installation:
   ```bash
   git pull
   cd api
   poetry install
   poetry run flask db upgrade
   cd ../web
   pnpm install
   ```

## Next Steps

After installation:
1. Complete the initialization wizard
2. Configure LLM providers
3. Set up your first application
4. Explore the workflow builder

For more details, refer to the [Developer Guide](./developer-guide.md). 