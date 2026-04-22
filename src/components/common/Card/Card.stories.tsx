import type { Meta, StoryObj } from '@storybook/react'
import Card from './Card'

const meta: Meta<typeof Card> = {
  title: 'Common/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof Card>

const SAMPLE_IMG = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'

export const Default: Story = {
  args: {
    image: SAMPLE_IMG,
    title: 'Bamboo Loft on 38th Street',
    children: <p className="mt-2 text-sm text-base-content/65">A warm loft in downtown Yangon.</p>,
    footer: <span className="display text-primary">480,000 Ks</span>,
    badgeContent: 'Featured',
    badgeVariant: 'primary',
  },
}

export const Loading: Story = { args: { isLoading: true } }

export const Plain: Story = {
  args: {
    title: 'No image card',
    children: <p className="mt-2 text-sm text-base-content/65">Simple content-only card.</p>,
  },
}
