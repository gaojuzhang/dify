# Frontend Development Guide

## Technology Stack

Dify's frontend is built with modern web technologies:

- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + Custom Hooks
- **Package Manager**: pnpm
- **Testing**: Jest + React Testing Library
- **Build Tools**: Webpack (via Next.js)
- **Code Quality**: ESLint + Prettier

## Project Structure

```
web/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Root page
│   ├── (auth)/            # Authentication routes
│   ├── applications/      # Application management
│   ├── chat/             # Chat interface
│   ├── datasets/         # Dataset management
│   └── workflows/        # Workflow builder
├── components/            # Shared components
│   ├── base/             # Basic UI components
│   ├── common/           # Common components
│   ├── app/              # App-specific components
│   └── shared/           # Shared utilities
├── hooks/                # Custom React hooks
├── services/             # API integration
├── store/                # Global state
├── styles/               # Global styles
├── types/                # TypeScript definitions
└── utils/                # Utility functions
```

## Component Development

### Component Guidelines

1. **Functional Components**
   ```typescript
   import { FC } from 'react'
   
   interface Props {
     title: string
     onAction: () => void
   }
   
   const MyComponent: FC<Props> = ({ title, onAction }) => {
     return (
       <div className="p-4">
         <h1>{title}</h1>
         <button onClick={onAction}>
           Click Me
         </button>
       </div>
     )
   }
   
   export default MyComponent
   ```

2. **Custom Hooks**
   ```typescript
   import { useState, useEffect } from 'react'
   
   export const useDebounce = <T>(value: T, delay: number): T => {
     const [debouncedValue, setDebouncedValue] = useState<T>(value)
   
     useEffect(() => {
       const timer = setTimeout(() => {
         setDebouncedValue(value)
       }, delay)
   
       return () => {
         clearTimeout(timer)
       }
     }, [value, delay])
   
     return debouncedValue
   }
   ```

3. **Context Providers**
   ```typescript
   import { createContext, useContext, FC, ReactNode } from 'react'
   
   interface AuthContextType {
     user: User | null
     login: (credentials: Credentials) => Promise<void>
     logout: () => void
   }
   
   const AuthContext = createContext<AuthContextType | undefined>(undefined)
   
   export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
     // Implementation
     return (
       <AuthContext.Provider value={value}>
         {children}
       </AuthContext.Provider>
     )
   }
   ```

## Styling Guide

### Tailwind CSS Usage

1. **Component Styling**
   ```typescript
   const Button: FC<ButtonProps> = ({ variant, children }) => {
     const baseStyles = "px-4 py-2 rounded-md font-medium"
     const variantStyles = {
       primary: "bg-blue-500 text-white hover:bg-blue-600",
       secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300"
     }
   
     return (
       <button className={`${baseStyles} ${variantStyles[variant]}`}>
         {children}
       </button>
     )
   }
   ```

2. **Responsive Design**
   ```typescript
   <div className="
     grid
     grid-cols-1
     md:grid-cols-2
     lg:grid-cols-3
     gap-4
     p-4
   ">
     {/* Content */}
   </div>
   ```

3. **Dark Mode**
   ```typescript
   <div className="
     bg-white
     dark:bg-gray-800
     text-gray-900
     dark:text-gray-100
   ">
     {/* Content */}
   </div>
   ```

## State Management

### Custom Hooks Pattern

```typescript
// hooks/useApplication.ts
export const useApplication = (appId: string) => {
  const [app, setApp] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchApp = async () => {
      try {
        const data = await api.applications.get(appId)
        setApp(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchApp()
  }, [appId])

  return { app, loading, error }
}
```

### API Integration

```typescript
// services/api.ts
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
```

## Form Handling

### Form Components

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  message: z.string().min(10)
})

type FormData = z.infer<typeof schema>

const ContactForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    // Handle form submission
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  )
}
```

## Error Handling

### Error Boundaries

```typescript
import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong</div>
    }

    return this.props.children
  }
}

export default ErrorBoundary
```

## Testing

### Component Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalled()
  })
})
```

### Hook Testing

```typescript
import { renderHook, act } from '@testing-library/react-hooks'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter())

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })
})
```

## Performance Optimization

### Code Splitting

```typescript
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false
})
```

### Memoization

```typescript
import { memo, useMemo, useCallback } from 'react'

const ExpensiveComponent = memo(({ data, onAction }) => {
  const processedData = useMemo(() => {
    return expensiveOperation(data)
  }, [data])

  const handleAction = useCallback(() => {
    onAction(processedData)
  }, [onAction, processedData])

  return (
    <div onClick={handleAction}>
      {/* Render content */}
    </div>
  )
})
```

## Internationalization

### Using i18n

```typescript
// i18n/config.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: require('./locales/en.json')
      },
      zh: {
        translation: require('./locales/zh.json')
      }
    },
    lng: 'en',
    fallbackLng: 'en'
  })

export default i18n
```

## Build and Deployment

### Production Build

```bash
# Install dependencies
pnpm install

# Build for production
pnpm build

# Start production server
pnpm start
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
CMD ["pnpm", "start"]
```

## Best Practices

1. **Code Organization**
   - Follow feature-based directory structure
   - Keep components small and focused
   - Use TypeScript for type safety

2. **Performance**
   - Implement code splitting
   - Use proper memoization
   - Optimize images and assets
   - Monitor bundle size

3. **Accessibility**
   - Use semantic HTML
   - Implement ARIA attributes
   - Ensure keyboard navigation
   - Test with screen readers

4. **Security**
   - Sanitize user inputs
   - Implement proper authentication
   - Use HTTPS
   - Follow security best practices

## Contributing

1. **Setup Development Environment**
   ```bash
   git clone https://github.com/langgenius/dify.git
   cd dify/web
   pnpm install
   pnpm dev
   ```

2. **Code Style**
   ```bash
   # Run linter
   pnpm lint
   
   # Run type checking
   pnpm type-check
   
   # Format code
   pnpm format
   ```

3. **Testing**
   ```bash
   # Run all tests
   pnpm test
   
   # Run tests in watch mode
   pnpm test:watch
   ```

For more information about specific components or features, refer to:
- [Component Library](./component-library.md)
- [State Management Guide](./state-management.md)
- [Testing Guide](./testing-guide.md) 