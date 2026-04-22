import type { Meta, StoryObj } from '@storybook/react'
import { HelmetProvider } from 'react-helmet-async'
import SEO from './SEO'

const meta: Meta<typeof SEO> = {
  title: 'Common/SEO',
  component: SEO,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <HelmetProvider>
        <div className="p-4 text-sm text-base-content/70">
          SEO sets document head tags. Render to see effects in the page <code>&lt;head&gt;</code>.
          <Story />
        </div>
      </HelmetProvider>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof SEO>

export const Basic: Story = {
  args: {
    title: 'Listings',
    description: 'Find rentals across Myanmar and Thailand.',
  },
}
