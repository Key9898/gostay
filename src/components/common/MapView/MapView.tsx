import { useEffect, useRef } from 'react'
import maplibregl, { type Map as MapLibreMap, Marker } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { cn } from '@utils'

export interface MapMarker {
  id: string
  lat: number
  lng: number
  label?: string
}

interface MapViewProps {
  center?: [number, number]
  zoom?: number
  markers?: MapMarker[]
  onMarkerClick?: (id: string) => void
  className?: string
}

const DEFAULT_STYLE =
  import.meta.env.VITE_MAP_TILES_URL || 'https://demotiles.maplibre.org/style.json'

const DEFAULT_CENTER: [number, number] = [96.1735, 16.8409]

export default function MapView({
  center = DEFAULT_CENTER,
  zoom = 11,
  markers = [],
  onMarkerClick,
  className,
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapLibreMap | null>(null)
  const markerRefs = useRef<Marker[]>([])

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return
    mapRef.current = new maplibregl.Map({
      container: containerRef.current,
      style: DEFAULT_STYLE,
      center,
      zoom,
    })
    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    markerRefs.current.forEach((m) => m.remove())
    markerRefs.current = markers.map((m) => {
      const marker = new maplibregl.Marker({ color: '#C2573A' })
        .setLngLat([m.lng, m.lat])
        .addTo(map)
      if (onMarkerClick) {
        marker.getElement().style.cursor = 'pointer'
        marker.getElement().addEventListener('click', () => onMarkerClick(m.id))
      }
      return marker
    })
  }, [markers, onMarkerClick])

  useEffect(() => {
    mapRef.current?.setCenter(center)
    mapRef.current?.setZoom(zoom)
  }, [center, zoom])

  return <div ref={containerRef} className={cn('h-full w-full rounded-xl', className)} />
}
