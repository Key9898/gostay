import { useEffect, useState, useCallback } from 'react'
import { useApi } from './useApi'

export interface Merchant {
  id: string
  _id?: string
  userId: string
  name: string
  description: string
  cuisine: string
  city: string
  country: 'Myanmar' | 'Thailand'
  address: string
  phone?: string
  image?: string
  rating: number
  status: 'active' | 'closed' | 'draft'
  createdAt: string
  updatedAt: string
}

interface MerchantFilters {
  city?: string
  cuisine?: string
  limit?: number
}

interface MerchantsResponse {
  merchants: Merchant[]
  total: number
  page: number
  limit: number
}

export function useMerchants(filters: MerchantFilters = {}) {
  const { request } = useApi()
  const [data, setData] = useState<MerchantsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const { city, cuisine, limit } = filters

  const fetchMerchants = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (city) params.set('city', city)
      if (cuisine) params.set('cuisine', cuisine)
      if (limit) params.set('limit', String(limit))
      const qs = params.toString()
      const result = await request<MerchantsResponse>(`/api/merchants${qs ? `?${qs}` : ''}`)
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch merchants'))
    } finally {
      setLoading(false)
    }
  }, [request, city, cuisine, limit])

  useEffect(() => {
    fetchMerchants()
  }, [fetchMerchants])

  return { data, loading, error, refetch: fetchMerchants }
}
