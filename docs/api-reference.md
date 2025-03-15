# API Reference

## Overview

Dify's API is built using FastAPI and follows RESTful principles. This reference documents all available endpoints, their parameters, and response formats.

## Authentication

### API Key Authentication

```http
Authorization: Bearer YOUR_API_KEY
```

API keys can be generated from the Dify dashboard. Different types of API keys are available:
- **App API Key**: For application-specific operations
- **Personal API Key**: For user-specific operations
- **Service API Key**: For service-to-service communication

## Base URLs

- **Cloud Service**: `https://api.dify.ai/v1`
- **Self-hosted**: `http://your-domain/api/v1`

## Endpoints

### Applications

#### List Applications

```http
GET /applications
```

Query Parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

Response:
```json
{
  "data": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "mode": "completion|chat",
      "created_at": "datetime"
    }
  ],
  "total": 0,
  "page": 1,
  "limit": 20
}
```

#### Create Application

```http
POST /applications
```

Request Body:
```json
{
  "name": "string",
  "description": "string",
  "mode": "completion|chat",
  "config": {
    "model": "string",
    "temperature": 0.7,
    "max_tokens": 2000
  }
}
```

### Conversations

#### Create Conversation

```http
POST /conversations
```

Request Body:
```json
{
  "app_id": "string",
  "user": "string",
  "inputs": {
    "query": "string",
    "files": ["string"]
  }
}
```

#### List Conversations

```http
GET /conversations
```

Query Parameters:
- `app_id`: Application ID
- `page`: Page number
- `limit`: Items per page

### Messages

#### Send Message

```http
POST /messages
```

Request Body:
```json
{
  "conversation_id": "string",
  "content": "string",
  "files": ["string"]
}
```

#### List Messages

```http
GET /conversations/{conversation_id}/messages
```

### Documents

#### Upload Document

```http
POST /documents
```

Multipart Form Data:
- `file`: File to upload
- `metadata`: JSON string with additional information

#### List Documents

```http
GET /documents
```

Query Parameters:
- `app_id`: Application ID
- `page`: Page number
- `limit`: Items per page

### Models

#### List Available Models

```http
GET /models
```

Response:
```json
{
  "data": [
    {
      "id": "string",
      "name": "string",
      "provider": "string",
      "capabilities": ["string"]
    }
  ]
}
```

### Workflows

#### Create Workflow

```http
POST /workflows
```

Request Body:
```json
{
  "name": "string",
  "description": "string",
  "nodes": [
    {
      "id": "string",
      "type": "string",
      "config": {}
    }
  ],
  "edges": [
    {
      "source": "string",
      "target": "string"
    }
  ]
}
```

#### Execute Workflow

```http
POST /workflows/{workflow_id}/execute
```

Request Body:
```json
{
  "inputs": {
    "key": "value"
  }
}
```

## Error Handling

All API errors follow a standard format:

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": {}
  }
}
```

Common Error Codes:
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `429`: Too Many Requests
- `500`: Internal Server Error

## Rate Limiting

API requests are rate-limited based on the API key type:
- Free tier: 60 requests per minute
- Pro tier: 300 requests per minute
- Enterprise tier: Custom limits

Rate limit headers are included in all responses:
```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1620000000
```

## Webhooks

### Webhook Events

Dify can send webhook notifications for various events:

1. Conversation Events
   - `conversation.created`
   - `conversation.completed`
   - `message.created`

2. Document Events
   - `document.uploaded`
   - `document.processed`
   - `document.failed`

3. Application Events
   - `application.created`
   - `application.updated`
   - `application.deleted`

### Webhook Format

```json
{
  "event": "string",
  "created_at": "datetime",
  "data": {}
}
```

### Webhook Security

Webhooks are signed using HMAC SHA-256:
```http
X-Dify-Signature: t=timestamp,v1=signature
```

## SDKs and Client Libraries

Official SDKs are available for:
- Python
- JavaScript/TypeScript
- Go
- Java

Example using Python SDK:
```python
from dify import Dify

client = Dify(api_key="your-api-key")

# Create conversation
conversation = client.conversations.create(
    app_id="app-id",
    user="user-id",
    inputs={"query": "Hello"}
)

# Send message
message = client.messages.create(
    conversation_id=conversation.id,
    content="How can I help?"
)
```

## Best Practices

1. **Error Handling**
   - Always handle API errors gracefully
   - Implement exponential backoff for retries
   - Log error responses for debugging

2. **Rate Limiting**
   - Monitor rate limit headers
   - Implement rate limit handling
   - Use bulk operations when possible

3. **Authentication**
   - Securely store API keys
   - Rotate keys periodically
   - Use appropriate key types

4. **Performance**
   - Cache responses when appropriate
   - Use compression for large payloads
   - Implement request timeouts

## Testing

The API provides a sandbox environment for testing:
```http
Base URL: https://sandbox.dify.ai/v1
```

Test API keys are available in the dashboard for development and testing purposes.

## Support

For API support and questions:
- Documentation: https://docs.dify.ai
- Discord Community: https://discord.gg/dify
- GitHub Issues: https://github.com/langgenius/dify/issues 