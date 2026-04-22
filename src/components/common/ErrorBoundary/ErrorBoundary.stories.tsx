import type { Meta, StoryObj } from '@storybook/react-vite'
import ErrorBoundary from './ErrorBoundary'

const Thrower = () => {
  throw new Error('Simulated render failure')
}

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Common/ErrorBoundary',
  component: ErrorBoundary,
}

export default meta
type Story = StoryObj<typeof ErrorBoundary>

export const Healthy: Story = {
  render: () => (
    <ErrorBoundary>
      <div className="warm-card p-8">
        <h2 className="display text-xl">All good</h2>
        <p className="mt-2 text-sm text-base-content/70">No error was thrown.</p>
      </div>
    </ErrorBoundary>
  ),
}

export const Fallback: Story = {
  render: () => (
    <ErrorBoundary>
      <Thrower />
    </ErrorBoundary>
  ),
}

export const CustomFallback: Story = {
  render: () => (
    <ErrorBoundary fallback={<div className="p-6 text-center text-error">Custom fallback UI</div>}>
      <Thrower />
    </ErrorBoundary>
  ),
}
