import { useCallback } from 'react'
import { useAuth } from '@context'
import { apiFetch } from '@services'

export function useApi() {
  const { user, getAccessToken } = useAuth()

  const request = useCallback(
    async <T>(path: string, options: RequestInit & { json?: unknown } = {}): Promise<T> => {
      const token = user ? await getAccessToken() : undefined
      return apiFetch<T>(path, { ...options, token })
    },
    [user, getAccessToken]
  )

  return { request }
}
