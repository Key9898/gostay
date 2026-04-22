import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Button' },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'accent',
        'ghost',
        'outline',
        'link',
        'error',
        'success',
        'warning',
        'info',
      ],
    },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    isLoading: { control: 'boolean' },
    isFullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = { args: { variant: 'primary', children: 'Browse listings' } }
export const Secondary: Story = { args: { variant: 'secondary', children: 'Save for later' } }
export const Outline: Story = { args: { variant: 'outline', children: 'Cancel' } }
export const Ghost: Story = { args: { variant: 'ghost', children: 'More' } }
export const Loading: Story = { args: { isLoading: true, children: 'Submitting' } }
export const FullWidth: Story = { args: { isFullWidth: true, children: 'Continue' } }
