import type { Meta, StoryObj } from '@storybook/react'
import Skeleton from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Common/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Skeleton>

export const Line: Story = { args: { className: 'h-4 w-48' } }
export const Block: Story = { args: { className: 'h-32 w-64' } }
export const Avatar: Story = { args: { className: 'h-12 w-12 rounded-full' } }
