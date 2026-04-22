import { useEffect, useState, useCallback } from 'react'
import { useApi } from './useApi'
import type { RoommatePost } from '@types'

interface RoommateFilters {
  status?: string
  page?: number
  limit?: number
}

interface RoommatesResponse {
  posts: RoommatePost[]
  total: number
  page: number
  limit: number
}

export function useRoommates(filters: RoommateFilters = {}) {
  const { request } = useApi()
  const [data, setData] = useState<RoommatesResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const { status, page, limit } = filters

  const fetchRoommates = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (status) params.set('status', status)
      if (page) params.set('page', String(page))
      if (limit) params.set('limit', String(limit))

      const qs = params.toString()
      const result = await request<RoommatesResponse>(`/api/roommates${qs ? `?${qs}` : ''}`)
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch roommates'))
    } finally {
      setLoading(false)
    }
  }, [request, status, page, limit])

  useEffect(() => {
    fetchRoommates()
  }, [fetchRoommates])

  return { data, loading, error, refetch: fetchRoommates }
}
