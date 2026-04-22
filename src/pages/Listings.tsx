import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Search, MapPin, Grid, List, Map, SlidersHorizontal, Heart, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { cn, formatPrice } from '@utils'
import { useListings } from '@hooks'
import { cloudinaryUrl, type MapMarker } from '@services'
import MapView from '@components/common/MapView'
import { SEO } from '@components/common'
import type { Listing } from '@types'
import type { Currency } from '@utils'

function resolveImage(listing: Listing): string {
  const first = listing.images?.[0]
  if (!first) return 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80'
  if (first.startsWith('http')) return first
  return cloudinaryUrl(first, 'w_800,h_600,c_fill,f_auto,q_auto')
}

export default function Listings() {
  const { t } = useTranslation()
  const [view, setView] = useState<'grid' | 'list' | 'map'>('grid')
  const [city, setCity] = useState<string | undefined>()
  const [bedrooms, setBedrooms] = useState<number | undefined>()
  const [priceMin, setPriceMin] = useState<number | undefined>()
  const [priceMax, setPriceMax] = useState<number | undefined>()
  const [q, setQ] = useState('')
  const [qDeferred, setQDeferred] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const { data, loading, error } = useListings({
    city,
    bedrooms,
    priceMin,
    priceMax,
    q: qDeferred || undefined,
    limit: 24,
  })

  const listings = useMemo(() => data?.listings ?? [], [data?.listings])

  const markers = useMemo<MapMarker[]>(
    () =>
      listings
        .filter((l) => l.location?.lat && l.location?.lng)
        .map((l) => ({
          id: String(l.id),
          lat: l.location.lat as number,
          lng: l.location.lng as number,
          label: l.title,
        })),
    [listings]
  )

  const clearFilters = () => {
    setCity(undefined)
    setBedrooms(undefined)
    setPriceMin(undefined)
    setPriceMax(undefined)
    setQ('')
    setQDeferred('')
  }

  const activeFilterCount = [city, bedrooms, priceMin, priceMax, qDeferred].filter(Boolean).length

  return (
    <div>
      <SEO
        title="Listings"
        description="Browse verified rentals, rooms, and homes across Myanmar and Thailand."
      />
      <div className="sticky top-16 z-30 border-b border-base-300 bg-base-100/90 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setQDeferred(q.trim())
            }}
            className="flex flex-wrap items-center gap-3"
          >
            <label className="flex min-w-0 flex-1 items-center gap-3 rounded-full bg-base-200 px-4 py-2 ring-1 ring-base-300 sm:min-w-[280px]">
              <Search className="h-4 w-4 text-primary" aria-hidden="true" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t('listings.searchPlaceholder')}
                aria-label={t('common.search')}
                className="flex-1 bg-transparent text-sm outline-none"
              />
            </label>
            <select
              value={city ?? ''}
              onChange={(e) => setCity(e.target.value || undefined)}
              aria-label={t('listings.filters.city')}
              className="select select-ghost select-sm rounded-full bg-base-200 ring-1 ring-base-300"
            >
              <option value="">{t('listings.filters.city')}</option>
              <option value="Yangon">Yangon</option>
              <option value="Mandalay">Mandalay</option>
              <option value="Bangkok">Bangkok</option>
              <option value="Chiang Mai">Chiang Mai</option>
            </select>
            <button
              type="button"
              onClick={() => setShowFilters((s) => !s)}
              aria-expanded={showFilters}
              className={cn('btn rounded-full gap-2', showFilters ? 'btn-primary' : 'btn-outline')}
            >
              <SlidersHorizontal className="h-4 w-4" />
              {t('common.filter')}
              {activeFilterCount > 0 && (
                <span className="rounded-full bg-base-100 px-2 py-0.5 text-xs font-semibold text-primary">
                  {activeFilterCount}
                </span>
              )}
            </button>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="btn btn-ghost btn-sm rounded-full gap-1"
              >
                <X className="h-3 w-3" /> Clear
              </button>
            )}

            <div className="ml-auto flex items-center rounded-full bg-base-200 p-1 ring-1 ring-base-300">
              {[
                { k: 'grid', icon: Grid, label: 'Grid view' },
                { k: 'list', icon: List, label: 'List view' },
                { k: 'map', icon: Map, label: 'Map view' },
              ].map((v) => (
                <button
                  key={v.k}
                  type="button"
                  onClick={() => setView(v.k as typeof view)}
                  aria-label={v.label}
                  aria-pressed={view === v.k}
                  className={cn(
                    'flex h-8 w-9 items-center justify-center rounded-full transition',
                    view === v.k
                      ? 'bg-base-100 text-primary shadow'
                      : 'text-base-content/60 hover:text-base-content'
                  )}
                >
                  <v.icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </form>

          {showFilters && (
            <div className="mt-4 grid gap-3 rounded-2xl bg-base-200/70 p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-base-content/60">
                  Min bedrooms
                </span>
                <select
                  value={bedrooms ?? ''}
                  onChange={(e) => setBedrooms(e.target.value ? Number(e.target.value) : undefined)}
                  className="select select-bordered select-sm w-full"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-base-content/60">
                  Price min
                </span>
                <input
                  type="number"
                  min={0}
                  value={priceMin ?? ''}
                  onChange={(e) => setPriceMin(e.target.value ? Number(e.target.value) : undefined)}
                  className="input input-bordered input-sm w-full"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-base-content/60">
                  Price max
                </span>
                <input
                  type="number"
                  min={0}
                  value={priceMax ?? ''}
                  onChange={(e) => setPriceMax(e.target.value ? Number(e.target.value) : undefined)}
                  className="input input-bordered input-sm w-full"
                />
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="eyebrow">{t('listings.eyebrow')}</span>
            <h1 className="display mt-2 text-2xl sm:text-3xl md:text-5xl">{t('listings.title')}</h1>
            <p className="mt-2 text-base-content/70">
              {t('listings.sub', { count: data?.total ?? 0 })}
            </p>
          </div>
          <Link to="/listings/create" className="btn btn-primary rounded-full">
            {t('listings.postListing')}
          </Link>
        </div>

        {error && (
          <div className="rounded-xl bg-error/10 p-4 text-sm text-error ring-1 ring-error/30">
            {error.message}
          </div>
        )}

        {view === 'map' ? (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="h-[280px] overflow-hidden rounded-3xl bg-base-200 ring-1 ring-base-300 sm:h-[380px] md:h-[480px] lg:h-[600px]">
              <MapView markers={markers} className="h-full w-full" />
            </div>
            <div className="space-y-3 overflow-y-auto">
              {listings.map((l) => (
                <Link
                  key={l.id}
                  to={`/listings/${l.id}`}
                  className="flex gap-4 rounded-2xl bg-base-100 p-3 ring-1 ring-base-300 hover:ring-primary/40"
                >
                  <img
                    src={resolveImage(l)}
                    alt=""
                    className="h-20 w-24 shrink-0 rounded-xl object-cover sm:h-24 sm:w-32"
                  />
                  <div className="flex-1 py-1">
                    <p className="text-xs text-base-content/60">{l.location?.city}</p>
                    <p className="font-serif text-lg font-semibold">{l.title}</p>
                    <p className="text-sm font-semibold text-primary">
                      {formatPrice(l.price, l.currency as Currency)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div
            className={cn(
              'grid gap-8',
              view === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
            )}
          >
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="warm-card overflow-hidden">
                  <div className="h-56 w-full animate-pulse bg-base-200" />
                  <div className="space-y-3 p-5">
                    <div className="h-5 w-3/4 animate-pulse rounded bg-base-200" />
                    <div className="h-4 w-full animate-pulse rounded bg-base-200" />
                  </div>
                </div>
              ))
            ) : listings.length === 0 ? (
              <div className="col-span-full py-8 text-center md:py-16">
                <p className="display text-2xl text-base-content/60">No listings yet</p>
                <p className="mt-2 text-sm text-base-content/50">
                  Try clearing filters or be the first to post.
                </p>
                <Link to="/listings/create" className="btn btn-primary mt-6 rounded-full">
                  {t('listings.postListing')}
                </Link>
              </div>
            ) : (
              listings.map((l) => (
                <Link
                  key={l.id}
                  to={`/listings/${l.id}`}
                  className={cn('warm-card group overflow-hidden', view === 'list' && 'flex gap-5')}
                >
                  <div
                    className={cn(
                      'relative overflow-hidden bg-base-200',
                      view === 'list' ? 'h-36 w-40 shrink-0 sm:h-44 sm:w-56' : 'h-48 sm:h-56'
                    )}
                  >
                    <img
                      src={resolveImage(l)}
                      alt={l.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-base-100/95 px-3 py-1 text-xs font-semibold capitalize ring-1 ring-base-300">
                      {l.status}
                    </span>
                    <button
                      type="button"
                      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-base-100/95 text-base-content/70 hover:text-primary"
                      aria-label="save"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex-1 p-5">
                    <p className="text-xs text-base-content/60">
                      <MapPin className="mr-1 inline h-3 w-3 text-primary" />
                      {l.location?.city}
                    </p>
                    <h3 className="mt-1 font-serif text-xl font-semibold group-hover:text-primary">
                      {l.title}
                    </h3>
                    <div className="mt-3 flex gap-4 text-xs text-base-content/65">
                      <span>{l.bedrooms} bed</span>
                      <span>{l.bathrooms} bath</span>
                      <span>{l.area} sqft</span>
                    </div>
                    <div className="mt-4 flex items-end justify-between border-t border-base-300/70 pt-4">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-base-content/50">
                          {l.priceType === 'daily'
                            ? t('listings.priceDaily')
                            : t('listings.priceMonthly')}
                        </p>
                        <p className="display text-2xl text-primary">
                          {formatPrice(l.price, l.currency as Currency)}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-base-content/70 group-hover:text-primary">
                        Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
