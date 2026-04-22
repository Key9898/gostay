import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  Search,
  MapPin,
  Clock,
  Star,
  ChefHat,
  QrCode,
  Truck,
  ShoppingBag,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@utils'
import { useMerchants } from '@hooks'
import { cloudinaryUrl } from '@services'
import type { Merchant } from '@hooks/useMerchants'
import { SEO } from '@components/common'

const CATEGORIES = ['all', 'breakfast', 'curry', 'noodles', 'snacks', 'thai', 'vegetarian']

const CTA_FEATURES = [
  { Icon: QrCode, label: 'QR ordering' },
  { Icon: ChefHat, label: 'Your menu' },
  { Icon: Truck, label: 'Pickup/Delivery' },
] as const

function resolveImage(m: Merchant): string {
  if (!m.image) return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80'
  if (m.image.startsWith('http')) return m.image
  return cloudinaryUrl(m.image, 'w_800,h_600,c_fill,f_auto,q_auto')
}

export default function Kitchen() {
  const { t } = useTranslation()
  const [cat, setCat] = useState('all')
  const { data, loading, error } = useMerchants({
    cuisine: cat === 'all' ? undefined : cat,
    limit: 24,
  })
  const merchants = data?.merchants ?? []

  return (
    <div>
      <SEO
        title="Kitchen"
        description="Order home-cooked meals from verified local kitchens in Myanmar and Thailand."
      />
      <section className="paper border-b border-base-300">
        <div className="container mx-auto px-4 py-14">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="eyebrow">
                <ChefHat className="mr-1 inline h-3.5 w-3.5 -translate-y-0.5" aria-hidden="true" />
                {t('kitchen.eyebrow')}
              </span>
              <h1 className="display mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                {t('kitchen.heroA')}{' '}
                <em className="not-italic text-primary">{t('kitchen.heroB')}</em>{' '}
                {t('kitchen.heroC')}
              </h1>
              <p className="mt-5 max-w-xl text-base sm:text-lg text-base-content/75">
                {t('kitchen.sub')}
              </p>

              <form className="mt-7 flex flex-col gap-2 rounded-2xl bg-base-100 p-2 shadow-xl ring-1 ring-base-300 sm:flex-row">
                <label className="flex flex-1 items-center gap-3 px-4 py-3">
                  <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                  <input
                    aria-label={t('kitchen.deliverTo')}
                    placeholder={t('kitchen.deliverTo')}
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </label>
                <div className="hidden h-10 w-px self-center bg-base-300 sm:block" />
                <label className="flex flex-1 items-center gap-3 px-4 py-3">
                  <Search className="h-5 w-5 text-primary" aria-hidden="true" />
                  <input
                    aria-label={t('kitchen.searchDish')}
                    placeholder={t('kitchen.searchDish')}
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </label>
                <button type="submit" className="btn btn-primary rounded-xl px-6">
                  {t('common.search')}
                </button>
              </form>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-base-content/65">
                <span className="flex items-center gap-1">
                  <QrCode className="h-4 w-4 text-primary" aria-hidden="true" />
                  {t('kitchen.chip.qr')}
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="h-4 w-4 text-primary" aria-hidden="true" />
                  {t('kitchen.chip.delivery')}
                </span>
                <span className="flex items-center gap-1">
                  <ShoppingBag className="h-4 w-4 text-primary" aria-hidden="true" />
                  {t('kitchen.chip.pickup')}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-[320px] sm:h-[380px] lg:h-[420px]">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
                  alt=""
                  className="absolute right-0 top-0 h-[220px] w-full rounded-3xl object-cover shadow-2xl sm:h-[260px] sm:w-[85%] lg:h-[280px]"
                />
                <div className="absolute bottom-0 left-0 w-[75%] rounded-3xl bg-base-100 p-5 shadow-2xl ring-1 ring-base-300">
                  <div className="flex items-center gap-1 text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="mt-3 font-serif text-lg font-semibold">Home-cooked & fresh</p>
                  <p className="text-xs text-base-content/60">Verified local merchants</p>
                  <p className="mt-3 text-lg font-semibold text-primary">Pickup or delivery</p>
                </div>
                <div className="absolute right-4 top-[260px] flex items-center gap-2 rounded-full bg-secondary px-3 py-2 text-secondary-content shadow-lg">
                  <Sparkles className="h-4 w-4 text-accent" aria-hidden="true" />
                  <span className="text-xs font-semibold">Fresh, home-cooked</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14">
        <div className="mb-6 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-semibold ring-1 transition',
                cat === c
                  ? 'bg-primary text-primary-content ring-primary'
                  : 'bg-base-100 text-base-content/70 ring-base-300 hover:bg-base-200'
              )}
            >
              {t(`kitchen.cats.${c}`)}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-error/10 p-4 text-sm text-error ring-1 ring-error/30">
            {error.message}
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="warm-card overflow-hidden">
                <div className="h-52 w-full animate-pulse bg-base-200" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-base-200" />
                  <div className="h-4 w-full animate-pulse rounded bg-base-200" />
                </div>
              </div>
            ))
          ) : merchants.length === 0 ? (
            <div className="col-span-full py-8 text-center md:py-16">
              <p className="display text-2xl text-base-content/60">No merchants yet</p>
              <p className="mt-2 text-sm text-base-content/50">
                Be the first to open your kitchen.
              </p>
              <Link to="/kitchen/merchant" className="btn btn-primary mt-6 rounded-full">
                {t('kitchen.becomeMerchant')}
              </Link>
            </div>
          ) : (
            merchants.map((m) => (
              <article key={m.id || m._id} className="warm-card group overflow-hidden">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={resolveImage(m)}
                    alt={m.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-base-100/95 px-3 py-1 text-xs font-semibold ring-1 ring-base-300">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    15–25 min
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" aria-hidden="true" />
                    <strong>{m.rating.toFixed(1)}</strong>
                    <span className="text-base-content/60">· {m.city}</span>
                  </div>
                  <h3 className="mt-2 font-serif text-xl font-semibold group-hover:text-primary">
                    {m.name}
                  </h3>
                  <p className="text-sm text-base-content/65">{m.cuisine}</p>
                  <div className="mt-4 flex items-end justify-between border-t border-base-300/70 pt-4">
                    <p className="text-xs text-base-content/60 line-clamp-2">{m.description}</p>
                    <button className="btn btn-primary btn-sm ml-3 shrink-0 rounded-full">
                      Order
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-secondary p-7 text-secondary-content sm:p-10 lg:p-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow text-accent">{t('kitchen.merchantCta.eyebrow')}</span>
              <h2 className="display mt-3 text-3xl text-secondary-content md:text-4xl lg:text-5xl">
                {t('kitchen.merchantCta.title')}
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-secondary-content/85">
                {t('kitchen.merchantCta.body')}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/kitchen/merchant" className="btn btn-primary rounded-full px-6">
                  {t('kitchen.becomeMerchant')}
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {CTA_FEATURES.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-3 rounded-2xl p-4 sm:p-6"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                    <Icon size={32} className="text-white" aria-hidden="true" />
                  </div>
                  <span className="text-center text-xs font-semibold text-white">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
