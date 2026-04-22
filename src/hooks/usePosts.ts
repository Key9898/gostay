import { useEffect, useState, useCallback } from 'react'
import { useApi } from './useApi'
import type { Post, Comment } from '@types'

interface PostFilters {
  category?: string
  page?: number
  limit?: number
}

interface PostsResponse {
  posts: Post[]
  total: number
  page: number
  limit: number
}

export function usePosts(filters: PostFilters = {}) {
  const { request } = useApi()
  const [data, setData] = useState<PostsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const { category, page, limit } = filters

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (category) params.set('category', category)
      if (page) params.set('page', String(page))
      if (limit) params.set('limit', String(limit))

      const qs = params.toString()
      const result = await request<PostsResponse>(`/api/posts${qs ? `?${qs}` : ''}`)
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch posts'))
    } finally {
      setLoading(false)
    }
  }, [request, category, page, limit])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return { data, loading, error, refetch: fetchPosts }
}

export function useComments(postId: string | undefined) {
  const { request } = useApi()
  const [data, setData] = useState<Comment[]>([])
  const [loading, setLoading] = useState(!!postId)
  const [error, setError] = useState<Error | null>(null)

  const fetchComments = useCallback(async () => {
    if (!postId) return
    setLoading(true)
    try {
      const result = await request<{ comments: Comment[] }>(`/api/posts/${postId}/comments`)
      setData(result.comments)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch comments'))
    } finally {
      setLoading(false)
    }
  }, [postId, request])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  return { data, loading, error, refetch: fetchComments }
}
