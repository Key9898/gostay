import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Search, Filter, MapPin, Grid, List, Map, SlidersHorizontal, Heart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@utils'

const SAMPLE = [
  { id: 1, title: 'Bamboo Loft on 38th St', city: 'Yangon', price: '480,000 Ks', beds: 2, baths: 1, area: '750 sqft', tag: 'Featured', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80' },
  { id: 2, title: 'Teakwood Studio', city: 'Bangkok', price: '฿18,500', beds: 1, baths: 1, area: '420 sqft', tag: 'New', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80' },
  { id: 3, title: 'Mandalay Hill View', city: 'Mandalay', price: '320,000 Ks', beds: 2, baths: 1, area: '680 sqft', tag: 'Verified', img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80' },
  { id: 4, title: 'Chiang Mai Courtyard', city: 'Chiang Mai', price: '฿12,000', beds: 1, baths: 1, area: '380 sqft', tag: 'Featured', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80' },
  { id: 5, title: 'Riverside Apartment', city: 'Yangon', price: '650,000 Ks', beds: 3, baths: 2, area: '1100 sqft', tag: 'New', img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80' },
  { id: 6, title: 'Sukhumvit Condo', city: 'Bangkok', price: '฿25,000', beds: 2, baths: 2, area: '820 sqft', tag: 'Verified', img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80' },
]

export default function Listings() {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)
  const [view, setView] = useState<'grid' | 'list' | 'map'>('grid')

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      {/* Sticky filter bar */}
      <div className="sticky top-16 z-30 border-b border-base-300 bg-base-100/90 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex min-w-[280px] flex-1 items-center gap-3 rounded-full bg-base-200 px-4 py-2 ring-1 ring-base-300">
              <Search className="h-4 w-4 text-primary" />
              <input
                type="text"
                placeholder={t('listings.searchPlaceholder')}
                className="flex-1 bg-transparent text-sm outline-none"
              />
            </div>
            <button className="btn btn-ghost rounded-full gap-2">
              <MapPin className="h-4 w-4" />
              {t('listings.filters.city')}
            </button>
            <button className="btn btn-ghost rounded-full gap-2">
              {t('listings.filters.price')}
            </button>
            <button className="btn btn-ghost rounded-full gap-2">
              {t('listings.filters.beds')}
            </button>
            <button className="btn btn-outline rounded-full gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              {t('common.filter')}
            </button>

            <div className="ml-auto flex items-center rounded-full bg-base-200 p-1 ring-1 ring-base-300">
              {[
                { k: 'grid', icon: Grid },
                { k: 'list', icon: List },
                { k: 'map', icon: Map },
              ].map((v) => (
                <button
                  key={v.k}
                  onClick={() => setView(v.k as typeof view)}
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
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="eyebrow">{t('listings.eyebrow')}</span>
            <h1 className="display mt-2 text-4xl md:text-5xl">{t('listings.title')}</h1>
            <p className="mt-2 text-base-content/70">
              {t('listings.sub', { count: SAMPLE.length })}
            </p>
          </div>
          <Link to="/manage" className="btn btn-primary rounded-full">
            {t('listings.postListing')}
          </Link>
        </div>

        {view === 'map' ? (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="h-[600px] overflow-hidden rounded-3xl bg-base-200 ring-1 ring-base-300">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&q=80"
                alt="Map"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-3 overflow-y-auto">
              {SAMPLE.map((l) => (
                <Link key={l.id} to={`/listings/${l.id}`} className="flex gap-4 rounded-2xl bg-base-100 p-3 ring-1 ring-base-300 hover:ring-primary/40">
                  <img src={l.img} alt="" className="h-24 w-32 shrink-0 rounded-xl object-cover" />
                  <div className="flex-1 py-1">
                    <p className="text-xs text-base-content/60">{l.city}</p>
                    <p className="font-serif text-lg font-semibold">{l.title}</p>
                    <p className="text-sm text-primary font-semibold">{l.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className={cn('grid gap-8', view === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1')}>
            {(isLoading ? Array.from({ length: 6 }) : SAMPLE).map((item, i) => {
              const l = item as typeof SAMPLE[0]
              return (
                <Link
                  key={i}
                  to={!isLoading ? `/listings/${l.id}` : '#'}
                  className={cn(
                    'warm-card group overflow-hidden',
                    view === 'list' && !isLoading && 'flex gap-5'
                  )}
                >
                  {isLoading ? (
                    <>
                      <div className="h-56 w-full animate-pulse bg-base-200" />
                      <div className="p-5 space-y-3">
                        <div className="h-5 w-3/4 animate-pulse rounded bg-base-200" />
                        <div className="h-4 w-full animate-pulse rounded bg-base-200" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={cn(
                        'relative overflow-hidden bg-base-200',
                        view === 'list' ? 'h-44 w-56 shrink-0' : 'h-56'
                      )}>
                        <img src={l.img} alt={l.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                        <span className="absolute left-4 top-4 rounded-full bg-base-100/95 px-3 py-1 text-xs font-semibold ring-1 ring-base-300">{l.tag}</span>
                        <button className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-base-100/95 text-base-content/70 hover:text-primary" aria-label="save">
                          <Heart className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex-1 p-5">
                        <p className="text-xs text-base-content/60">
                          <MapPin className="mr-1 inline h-3 w-3 text-primary" />{l.city}
                        </p>
                        <h3 className="mt-1 font-serif text-xl font-semibold group-hover:text-primary">{l.title}</h3>
                        <div className="mt-3 flex gap-4 text-xs text-base-content/65">
                          <span>{l.beds} bed</span>
                          <span>{l.baths} bath</span>
                          <span>{l.area}</span>
                        </div>
                        <div className="mt-4 flex items-end justify-between border-t border-base-300/70 pt-4">
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-base-content/50 font-semibold">{t('listings.priceMonthly')}</p>
                            <p className="display text-2xl text-primary">{l.price}</p>
                          </div>
                          <span className="text-sm font-semibold text-base-content/70 group-hover:text-primary">Details →</span>
                        </div>
                      </div>
                    </>
                  )}
                </Link>
              )
            })}
          </div>
        )}

        {!isLoading && view !== 'map' && (
          <div className="mt-14 text-center">
            <button className="btn btn-outline rounded-full px-12 h-12">{t('listings.loadMore')}</button>
          </div>
        )}
      </div>
    </div>
  )
}
