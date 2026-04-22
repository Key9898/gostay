import { useEffect, useState, useCallback } from 'react'
import { useApi } from './useApi'

export interface Tenant {
  id: string
  _id?: string
  ownerId: string
  listingId: string
  name: string
  email?: string
  phone?: string
  rent: number
  currency: string
  leaseStart: string
  leaseEnd: string
  status: 'active' | 'ended'
}

export interface Invoice {
  id: string
  _id?: string
  ownerId: string
  tenantId: string
  amount: number
  currency: string
  dueDate: string
  paidAt?: string
  status: 'pending' | 'paid' | 'overdue' | 'cancelled'
  note?: string
}

export interface MaintenanceRequest {
  id: string
  _id?: string
  ownerId: string
  listingId: string
  tenantId?: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  status: 'open' | 'in_progress' | 'resolved' | 'cancelled'
  images: string[]
}

export function useTenants() {
  const { request } = useApi()
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await request<{ tenants: Tenant[]; total: number }>('/api/manage/tenants')
      setTenants(res.tenants)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch tenants'))
    } finally {
      setLoading(false)
    }
  }, [request])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { tenants, loading, error, refetch }
}

export function useInvoices(filters: { status?: string; tenantId?: string } = {}) {
  const { request } = useApi()
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const { status, tenantId } = filters

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (status) params.set('status', status)
      if (tenantId) params.set('tenantId', tenantId)
      const qs = params.toString()
      const res = await request<{ invoices: Invoice[]; total: number }>(
        `/api/manage/invoices${qs ? `?${qs}` : ''}`
      )
      setInvoices(res.invoices)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch invoices'))
    } finally {
      setLoading(false)
    }
  }, [request, status, tenantId])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { invoices, loading, error, refetch }
}

export function useMaintenance(filters: { status?: string } = {}) {
  const { request } = useApi()
  const [requests, setRequests] = useState<MaintenanceRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const { status } = filters

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (status) params.set('status', status)
      const qs = params.toString()
      const res = await request<{ requests: MaintenanceRequest[]; total: number }>(
        `/api/manage/maintenance${qs ? `?${qs}` : ''}`
      )
      setRequests(res.requests)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch maintenance'))
    } finally {
      setLoading(false)
    }
  }, [request, status])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { requests, loading, error, refetch }
}
