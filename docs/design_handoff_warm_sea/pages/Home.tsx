import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  Search,
  MapPin,
  ArrowRight,
  Home as HomeIcon,
  Users,
  MessageCircle,
  ChefHat,
  Building2,
  Star,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

export default function Home() {
  const { t } = useTranslation()

  const cities = ['Yangon', 'Mandalay', 'Bangkok', 'Chiang Mai', 'Naypyidaw', 'Phuket']

  const featured = [
    {
      id: 1,
      title: 'Bamboo Loft on 38th Street',
      location: 'Downtown Yangon',
      price: '480,000 Ks',
      img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80',
      tag: 'Featured',
    },
    {
      id: 2,
      title: 'Teakwood Studio',
      location: 'Thonglor, Bangkok',
      price: '฿18,500',
      img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80',
      tag: 'New',
    },
    {
      id: 3,
      title: 'Mandalay Hill View',
      location: 'Mandalay',
      price: '320,000 Ks',
      img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80',
      tag: 'Verified',
    },
  ]

  const pillars = [
    {
      icon: HomeIcon,
      title: t('home.pillars.stay.title'),
      body: t('home.pillars.stay.body'),
      to: '/listings',
    },
    {
      icon: Users,
      title: t('home.pillars.roommate.title'),
      body: t('home.pillars.roommate.body'),
      to: '/roommate',
    },
    {
      icon: ChefHat,
      title: t('home.pillars.kitchen.title'),
      body: t('home.pillars.kitchen.body'),
      to: '/kitchen',
    },
    {
      icon: Building2,
      title: t('home.pillars.manage.title'),
      body: t('home.pillars.manage.body'),
      to: '/manage',
    },
    {
      icon: MessageCircle,
      title: t('home.pillars.community.title'),
      body: t('home.pillars.community.body'),
      to: '/community',
    },
  ]

  return (
    <div className="overflow-x-hidden">
      {/* ===== HERO ===== */}
      <section className="paper relative overflow-hidden">
        <div className="container mx-auto px-4 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="eyebrow">
                <Sparkles className="mr-1 inline h-3.5 w-3.5 -translate-y-0.5" />
                {t('home.hero.eyebrow')}
              </span>
              <h1 className="display mt-4 text-5xl md:text-6xl lg:text-7xl text-base-content">
                {t('home.hero.titleA')}{' '}
                <em className="not-italic text-primary">{t('home.hero.titleB')}</em>{' '}
                {t('home.hero.titleC')}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-base-content/75">
                {t('home.hero.sub')}
              </p>

              {/* Search */}
              <div className="mt-8 rounded-2xl bg-base-100 p-2 shadow-xl ring-1 ring-base-300">
                <div className="flex flex-col md:flex-row md:items-center">
                  <label className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <input
                      type="text"
                      placeholder={t('home.hero.searchLocation')}
                      className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-base-content/50"
                    />
                  </label>
                  <div className="hidden h-10 w-px bg-base-300 md:block" />
                  <label className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3">
                    <Search className="h-5 w-5 text-primary" />
                    <input
                      type="text"
                      placeholder={t('home.hero.searchType')}
                      className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-base-content/50"
                    />
                  </label>
                  <button className="btn btn-primary rounded-xl px-6 md:ml-2">
                    {t('common.search')}
                  </button>
                </div>
              </div>

              {/* Quick cities */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-base-content/50">
                  {t('home.hero.popular')}
                </span>
                {cities.map((c) => (
                  <button
                    key={c}
                    className="rounded-full bg-base-200 px-3 py-1 text-xs font-medium text-base-content/80 ring-1 ring-base-300 transition hover:bg-primary hover:text-primary-content"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Hero card stack */}
            <div className="relative lg:col-span-5">
              <div className="relative h-[460px]">
                <img
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
                  alt="Featured listing"
                  className="absolute right-0 top-0 h-[320px] w-[85%] rounded-3xl object-cover shadow-2xl ring-1 ring-base-300"
                />
                <div className="absolute bottom-0 left-0 w-[70%] rounded-3xl bg-base-100 p-5 shadow-2xl ring-1 ring-base-300">
                  <div className="flex items-center gap-1 text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                    <span className="ml-1 text-xs font-semibold text-base-content/70">
                      4.9 · 128
                    </span>
                  </div>
                  <p className="mt-3 font-serif text-lg font-semibold">Teak & Linen Studio</p>
                  <p className="text-xs text-base-content/60">Yangon, Myanmar</p>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p className="text-xs text-base-content/50">from</p>
                      <p className="display text-2xl text-primary">480,000 Ks</p>
                    </div>
                    <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-secondary">
                      <ShieldCheck className="mr-1 inline h-3 w-3" />
                      {t('home.verified')}
                    </span>
                  </div>
                </div>
                <div className="absolute right-2 bottom-16 flex items-center gap-2 rounded-full bg-base-100 px-3 py-2 shadow-lg ring-1 ring-base-300">
                  <ChefHat className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold">3 kitchens nearby</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-base-300 pt-8 md:grid-cols-4">
            {[
              { k: '12,400+', v: t('home.stats.listings') },
              { k: '3,800+', v: t('home.stats.roommates') },
              { k: '540+', v: t('home.stats.kitchens') },
              { k: '96%', v: t('home.stats.verified') },
            ].map((s) => (
              <div key={s.v}>
                <p className="display text-4xl text-base-content">{s.k}</p>
                <p className="mt-1 text-sm text-base-content/60">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PILLARS ===== */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <span className="eyebrow">{t('home.pillarsSection.eyebrow')}</span>
              <h2 className="display mt-3 text-4xl md:text-5xl text-base-content">
                {t('home.pillarsSection.title')}
              </h2>
            </div>
            <p className="max-w-md text-base-content/70">
              {t('home.pillarsSection.sub')}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-base-300 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                className="group bg-base-100 p-8 transition hover:bg-base-200"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-content">
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-serif text-2xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-base-content/70">{p.body}</p>
                <div className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  {t('home.learnMore')}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED LISTINGS ===== */}
      <section className="bg-base-200/60 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">{t('home.featured.eyebrow')}</span>
              <h2 className="display mt-3 text-4xl md:text-5xl">
                {t('home.featured.title')}
              </h2>
            </div>
            <Link to="/listings" className="btn btn-ghost rounded-full">
              {t('home.featured.viewAll')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((f) => (
              <Link
                key={f.id}
                to={`/listings/${f.id}`}
                className="group overflow-hidden rounded-2xl bg-base-100 ring-1 ring-base-300 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={f.img}
                    alt={f.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-base-100/95 px-3 py-1 text-xs font-semibold text-base-content ring-1 ring-base-300">
                    {f.tag}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-xs text-base-content/60">
                    <MapPin className="mr-1 inline h-3 w-3 text-primary" />
                    {f.location}
                  </p>
                  <h3 className="mt-2 font-serif text-xl font-semibold">{f.title}</h3>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p className="text-xs text-base-content/50">{t('listings.priceMonthly')}</p>
                      <p className="display text-2xl text-primary">{f.price}</p>
                    </div>
                    <span className="text-sm font-semibold text-base-content/70 group-hover:text-primary">
                      {t('home.viewStay')} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== KITCHEN CALLOUT ===== */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-secondary text-secondary-content">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div className="p-10 lg:p-16">
                <span className="eyebrow text-accent">{t('home.kitchenCta.eyebrow')}</span>
                <h2 className="display mt-3 text-4xl md:text-5xl text-secondary-content">
                  {t('home.kitchenCta.title')}
                </h2>
                <p className="mt-5 max-w-md leading-relaxed text-secondary-content/80">
                  {t('home.kitchenCta.body')}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/kitchen" className="btn btn-primary rounded-full px-6">
                    {t('home.kitchenCta.browse')}
                  </Link>
                  <Link
                    to="/kitchen/merchant"
                    className="btn btn-outline rounded-full border-secondary-content/40 px-6 text-secondary-content hover:bg-secondary-content hover:text-secondary"
                  >
                    {t('home.kitchenCta.become')}
                  </Link>
                </div>
              </div>
              <div className="relative h-80 lg:h-full">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80"
                  alt="Home-cooked Myanmar food"
                  className="absolute inset-0 h-full w-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-secondary/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="pb-24">
        <div className="container mx-auto px-4 text-center">
          <span className="eyebrow">{t('home.cta.eyebrow')}</span>
          <h2 className="display mx-auto mt-4 max-w-2xl text-4xl md:text-5xl">
            {t('home.cta.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base-content/70">{t('home.cta.body')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/register" className="btn btn-primary rounded-full px-8 h-12">
              {t('home.cta.primary')}
            </Link>
            <Link to="/listings" className="btn btn-outline rounded-full px-8 h-12">
              {t('home.cta.secondary')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
