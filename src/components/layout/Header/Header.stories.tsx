import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import { AuthContext } from '@context/AuthContext'
import type { User } from '@types'
import Header from './Header'

const makeAuthValue = (user: User | null) => ({
  user,
  loading: false,
  login: async () => {},
  loginWithGoogle: async () => {},
  register: async () => {},
  logout: async () => {},
  updateProfile: async () => {},
  getAccessToken: async () => 'mock-token',
})

const AuthWrap = ({ user, children }: { user: User | null; children: ReactNode }) => (
  <AuthContext.Provider value={makeAuthValue(user)}>{children}</AuthContext.Provider>
)

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof Header>

export const LoggedOut: Story = {
  render: () => (
    <AuthWrap user={null}>
      <Header />
    </AuthWrap>
  ),
}

export const LoggedIn: Story = {
  render: () => (
    <AuthWrap
      user={{
        id: 'auth0|storybook',
        email: 'demo@gostay.dev',
        displayName: 'Demo User',
        photoURL: 'https://i.pravatar.cc/100?img=12',
        language: 'en',
        currency: 'MMK',
        createdAt: new Date(),
        updatedAt: new Date(),
      }}
    >
      <Header />
    </AuthWrap>
  ),
}
