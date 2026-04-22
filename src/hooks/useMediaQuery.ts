import { useSyncExternalStore } from 'react'

type MediaQuery = `(min-width: ${number}px)` | `(max-width: ${number}px)`

function getMediaQuerySnapshot(query: string): boolean {
  return window.matchMedia(query).matches
}

function getMediaQueryServerSnapshot(): boolean {
  return false
}

function subscribeToMediaQuery(query: string, callback: () => void): () => void {
  const media = window.matchMedia(query)
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}

export function useMediaQuery(query: MediaQuery | string): boolean {
  return useSyncExternalStore(
    (callback) => subscribeToMediaQuery(query, callback),
    () => getMediaQuerySnapshot(query),
    getMediaQueryServerSnapshot
  )
}

export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)')
}

export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1025px)')
}
