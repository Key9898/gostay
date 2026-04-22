import React from 'react'
import type { Preview } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { SettingsProvider } from '../src/context/SettingsContext'
import '../src/global.css'
import '../src/i18n'

if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', 'gostay')
}

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: {
      default: 'paper',
      values: [
        { name: 'paper', value: '#F7F1E3' },
        { name: 'base', value: '#FFFFFF' },
        { name: 'dark', value: '#1F1A17' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <HelmetProvider>
        <MemoryRouter initialEntries={['/']}>
          <SettingsProvider>
            <Story />
          </SettingsProvider>
        </MemoryRouter>
      </HelmetProvider>
    ),
  ],
}

export default preview
