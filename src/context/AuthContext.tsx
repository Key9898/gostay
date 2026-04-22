import { createContext, useMemo, type ReactNode } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import type { User } from '@types'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: () => Promise<void>
  loginWithGoogle: () => Promise<void>
  register: () => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
  getAccessToken: () => Promise<string>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    user: auth0User,
    isLoading,
    loginWithRedirect,
    logout: auth0Logout,
    getAccessTokenSilently,
  } = useAuth0()

  const user = useMemo<User | null>(() => {
    if (!auth0User) return null
    return {
      id: auth0User.sub ?? '',
      email: auth0User.email ?? '',
      displayName: auth0User.name ?? auth0User.nickname ?? '',
      photoURL: auth0User.picture,
      language: 'en',
      currency: 'MMK',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }, [auth0User])

  const login = async () => {
    await loginWithRedirect()
  }

  const loginWithGoogle = async () => {
    await loginWithRedirect({
      authorizationParams: { connection: 'google-oauth2' },
    })
  }

  const register = async () => {
    await loginWithRedirect({
      authorizationParams: { screen_hint: 'signup' },
    })
  }

  const logout = async () => {
    await auth0Logout({ logoutParams: { returnTo: window.location.origin } })
  }

  const updateProfile = async (data: Partial<User>) => {
    void data
  }

  const getAccessToken = async () => {
    return getAccessTokenSilently()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: isLoading,
        login,
        loginWithGoogle,
        register,
        logout,
        updateProfile,
        getAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }
