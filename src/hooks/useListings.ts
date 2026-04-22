import { useEffect, useState, useCallback } from 'react'
import { useApi } from './useApi'
import type { Listing } from '@types'

interface ListingFilters {
  city?: string
  type?: string
  status?: string
  bedrooms?: number
  priceMin?: number
  priceMax?: number
  q?: string
  page?: number
  limit?: number
}

interface ListingsResponse {
  listings: Listing[]
  total: number
  page: number
  limit: number
}

export function useListings(filters: ListingFilters = {}) {
  const { request } = useApi()
  const [data, setData] = useState<ListingsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const { city, type, status, bedrooms, priceMin, priceMax, q, page, limit } = filters

  const fetchListings = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (city) params.set('city', city)
      if (type) params.set('type', type)
      if (status) params.set('status', status)
      if (bedrooms) params.set('bedrooms', String(bedrooms))
      if (priceMin) params.set('priceMin', String(priceMin))
      if (priceMax) params.set('priceMax', String(priceMax))
      if (q) params.set('q', q)
      if (page) params.set('page', String(page))
      if (limit) params.set('limit', String(limit))

      const qs = params.toString()
      const result = await request<ListingsResponse>(`/api/listings${qs ? `?${qs}` : ''}`)
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch listings'))
    } finally {
      setLoading(false)
    }
  }, [request, city, type, status, bedrooms, priceMin, priceMax, q, page, limit])

  useEffect(() => {
    fetchListings()
  }, [fetchListings])

  return { data, loading, error, refetch: fetchListings }
}

export function useListing(id: string | undefined) {
  const { request } = useApi()
  const [data, setData] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(!!id)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    request<Listing>(`/api/listings/${id}`)
      .then((result) => {
        if (!cancelled) setData(result)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err : new Error('Failed to fetch listing'))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id, request])

  return { data, loading, error }
}
