import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Search, SlidersHorizontal, User, MapPin, Heart, Sparkles, Plus } from 'lucide-react'
import { useState } from 'react'
import { cn, formatPrice, type Currency } from '@utils'
import { useRoommates } from '@hooks'
import { SEO } from '@components/common'

export default function Roommate() {
  const { t } = useTranslation()
  const [tab, setTab] = useState<'looking' | 'offering'>('looking')
  const { data, loading, error } = useRoommates({
    status: tab === 'looking' ? 'looking' : 'found',
    limit: 24,
  })

  const posts = data?.posts ?? []

  return (
    <div className="container mx-auto px-4 py-12">
      <SEO
        title="Roommates"
        description="Find a compatible roommate in Yangon, Bangkok, Mandalay, Chiang Mai, and beyond."
      />
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <span className="eyebrow">{t('roommate.eyebrow')}</span>
          <h1 className="display mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            {t('roommate.title')}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-base-content/70">{t('roommate.sub')}</p>
        </div>
        <Link to="/roommate/create" className="btn btn-primary rounded-full gap-2">
          <Plus className="h-4 w-4" />
          {t('roommate.post') ?? 'Post roommate'}
        </Link>
      </div>

      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-accent/15 p-5 ring-1 ring-accent/30">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-content">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="font-serif text-lg font-semibold">{t('roommate.matchCard.title')}</p>
            <p className="text-sm text-base-content/70">{t('roommate.matchCard.body')}</p>
          </div>
        </div>
        <button className="btn btn-primary rounded-full">{t('roommate.matchCard.cta')}</button>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-full bg-base-200 px-4 py-2 ring-1 ring-base-300 sm:min-w-[280px]">
          <Search className="h-4 w-4 text-primary" />
          <input
            placeholder={t('common.search')}
            className="flex-1 bg-transparent text-sm outline-none"
          />
        </div>
        <button className="btn btn-outline rounded-full gap-2">
          <SlidersHorizontal className="h-4 w-4" /> {t('common.filter')}
        </button>
      </div>

      <div className="mb-8 flex w-fit rounded-full bg-base-200 p-1 ring-1 ring-base-300">
        {(['looking', 'offering'] as const).map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={cn(
              'rounded-full px-5 py-2 text-sm font-semibold transition',
              tab === k
                ? 'bg-[#C2573A] text-white shadow'
                : 'bg-transparent text-[#5C5149] border border-[#E8DDC9]'
            )}
          >
            {k === 'looking' ? t('roommate.lookingFor') : t('roommate.offering')}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-4 rounded-xl bg-error/10 p-4 text-sm text-error ring-1 ring-error/30">
          {error.message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="warm-card p-6">
              <div className="h-14 w-14 animate-pulse rounded-full bg-base-200" />
              <div className="mt-4 h-4 w-full animate-pulse rounded bg-base-200" />
              <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-base-200" />
            </div>
          ))
        ) : posts.length === 0 ? (
          <div className="warm-card col-span-full py-8 text-center md:py-16">
            <p className="display text-2xl text-base-content/60">No roommate posts yet</p>
            <p className="mt-2 text-sm text-base-content/50">Be the first to post.</p>
            <Link to="/roommate/create" className="btn btn-primary mt-6 rounded-full">
              {t('roommate.post') ?? 'Post roommate'}
            </Link>
          </div>
        ) : (
          posts.map((p) => (
            <div key={p.id} className="warm-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-xl font-semibold text-primary-content">
                  {p.title.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 font-serif text-lg font-semibold">{p.title}</p>
                  <p className="text-xs text-base-content/60">
                    <MapPin className="mr-1 inline h-3 w-3" />
                    {p.location?.city}
                    {p.location?.country ? `, ${p.location.country}` : ''}
                  </p>
                </div>
                <button className="text-base-content/50 hover:text-primary" aria-label="save">
                  <Heart className="h-4 w-4" />
                </button>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-base-content/75 line-clamp-3">
                {p.description}
              </p>

              <div className="mt-5 flex items-end justify-between border-t border-base-300/70 pt-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-base-content/50">
                    {t('roommate.budget')}
                  </p>
                  <p className="font-serif text-lg text-primary">
                    {formatPrice(p.budget.min, p.budget.currency as Currency)} –{' '}
                    {formatPrice(p.budget.max, p.budget.currency as Currency)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-base-content/50">
                    {t('roommate.moveInDate')}
                  </p>
                  <p className="font-serif text-lg">
                    {new Date(p.moveInDate).toLocaleDateString(undefined, {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <button className="btn btn-primary btn-sm mt-5 w-full rounded-full">
                <User className="h-4 w-4" /> {t('roommate.viewProfile')}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
