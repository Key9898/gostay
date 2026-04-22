import { useEffect, useState, useCallback } from 'react'
import { useApi } from './useApi'
import { useAuth } from '@context'

export interface Notification {
  id: string
  _id?: string
  userId: string
  type: 'system' | 'listing' | 'community' | 'order' | 'invoice' | 'maintenance'
  title: string
  body: string
  link?: string
  read: boolean
  createdAt: string
  updatedAt: string
}

interface NotificationsResponse {
  notifications: Notification[]
  total: number
  unread: number
}

export function useNotifications() {
  const { user } = useAuth()
  const { request } = useApi()
  const [data, setData] = useState<NotificationsResponse>({
    notifications: [],
    total: 0,
    unread: 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const refetch = useCallback(async () => {
    if (!user) {
      setData({ notifications: [], total: 0, unread: 0 })
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await request<NotificationsResponse>('/api/notifications')
      setData(res)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch notifications'))
    } finally {
      setLoading(false)
    }
  }, [request, user])

  useEffect(() => {
    refetch()
  }, [refetch])

  const markRead = useCallback(
    async (id: string) => {
      await request(`/api/notifications/${id}/read`, { method: 'PATCH' })
      refetch()
    },
    [request, refetch]
  )

  const markAllRead = useCallback(async () => {
    await request('/api/notifications/read-all', { method: 'POST' })
    refetch()
  }, [request, refetch])

  return { ...data, loading, error, refetch, markRead, markAllRead }
}
