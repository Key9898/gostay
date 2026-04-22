import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import ImageUpload from './ImageUpload'

const Demo = ({ initial, max }: { initial: string[]; max: number }) => {
  const [value, setValue] = useState<string[]>(initial)
  return <ImageUpload value={value} onChange={setValue} max={max} />
}

const meta: Meta<typeof ImageUpload> = {
  title: 'Common/ImageUpload',
  component: ImageUpload,
}

export default meta
type Story = StoryObj<typeof ImageUpload>

export const Empty: Story = {
  render: () => <Demo initial={[]} max={5} />,
}

export const WithImages: Story = {
  render: () => (
    <Demo
      initial={[
        'samples/landscapes/nature-mountains',
        'samples/landscapes/beach-boat',
        'samples/food/spices',
      ]}
      max={10}
    />
  ),
}

export const MaxReached: Story = {
  render: () => (
    <Demo
      initial={['samples/landscapes/nature-mountains', 'samples/landscapes/beach-boat']}
      max={2}
    />
  ),
}
