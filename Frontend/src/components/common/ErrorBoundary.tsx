import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Icon } from '../ui/Icon'
import { Button } from '../ui/Button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="min-h-screen bg-surface flex items-center justify-center p-margin-mobile">
          <div className="max-w-md w-full bg-surface-container-lowest stitch-border rounded-xl p-8 text-center">
            <div className="w-12 h-12 bg-error-container rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="error" className="text-error text-2xl" />
            </div>
            <h1 className="text-headline-lg font-semibold text-primary mb-2">Something went wrong</h1>
            <p className="text-body-md text-on-surface-variant mb-6">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <Button onClick={this.handleReset} variant="primary" fullWidth>
              Return to Home
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
