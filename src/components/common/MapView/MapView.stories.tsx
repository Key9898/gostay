import type { Meta, StoryObj } from '@storybook/react-vite'
import MapView from './MapView'

const meta: Meta<typeof MapView> = {
  title: 'Common/MapView',
  component: MapView,
  decorators: [
    (Story) => (
      <div style={{ height: 480, width: '100%' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof MapView>

export const Yangon: Story = {
  args: {
    center: [96.1735, 16.8409],
    zoom: 11,
    markers: [
      { id: '1', lat: 16.8409, lng: 96.1735, label: 'Downtown' },
      { id: '2', lat: 16.8661, lng: 96.1951, label: 'Shwedagon' },
    ],
  },
}

export const Bangkok: Story = {
  args: {
    center: [100.5018, 13.7563],
    zoom: 11,
    markers: [
      { id: '1', lat: 13.7563, lng: 100.5018, label: 'City center' },
      { id: '2', lat: 13.7466, lng: 100.5393, label: 'Sukhumvit' },
    ],
  },
}

export const Empty: Story = {
  args: { markers: [] },
}
