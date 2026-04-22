import { mockFetch } from './mocks'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'

interface RequestOptions extends RequestInit {
  token?: string
  json?: unknown
}

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { token, json, headers, method = 'GET', ...rest } = options

  if (USE_MOCKS) {
    const result = mockFetch<T>(path, method, json)
    if (result !== null) {
      await new Promise((r) => setTimeout(r, 120))
      return result
    }
  }

  const finalHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...(headers as Record<string, string> | undefined),
  }
  if (token) finalHeaders.Authorization = `Bearer ${token}`
  if (json !== undefined) finalHeaders['Content-Type'] = 'application/json'

  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    method,
    headers: finalHeaders,
    body: json !== undefined ? JSON.stringify(json) : rest.body,
  })

  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(`API ${response.status}: ${text || response.statusText}`)
  }

  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}
