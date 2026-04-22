import { Component, type ReactNode } from 'react'
import * as Sentry from '@sentry/react'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.captureException(error, { extra: { componentStack: errorInfo.componentStack } })
  }

  reset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (!this.state.hasError) return this.props.children
    if (this.props.fallback) return this.props.fallback

    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="warm-card max-w-md p-8 text-center">
          <AlertTriangle className="mx-auto h-10 w-10 text-error" />
          <h2 className="display mt-4 text-2xl">Something went wrong</h2>
          <p className="mt-2 text-sm text-base-content/70">
            {this.state.error?.message ?? 'An unexpected error occurred.'}
          </p>
          <button onClick={this.reset} className="btn btn-primary btn-sm mt-6 rounded-full">
            Try again
          </button>
        </div>
      </div>
    )
  }
}
