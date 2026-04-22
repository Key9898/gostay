import { useTranslation } from 'react-i18next'
import { Search, SlidersHorizontal, User, MapPin, Heart, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@utils'

const PEOPLE = [
  { id: 1, name: 'Ei Mon', city: 'Yangon', budget: '200–300k Ks', move: 'Feb 2025', tags: ['Non-smoker', 'Student', 'Female'], note: 'Looking to share a 2BR near downtown. Clean, quiet.', avatarBg: 'oklch(60% 0.145 42)' },
  { id: 2, name: 'Somchai T.', city: 'Bangkok', budget: '฿8,000–12,000', move: 'Mar 2025', tags: ['Pet-friendly', 'Working professional'], note: 'Offering a bright room in Ari. Rooftop and wifi included.', avatarBg: 'oklch(45% 0.085 50)' },
  { id: 3, name: 'Zar Ni', city: 'Mandalay', budget: '150–250k Ks', move: 'Jan 2025', tags: ['Vegetarian', 'Early-riser'], note: 'Vegetarian household; morning meditator. Seeking like-minded.', avatarBg: 'oklch(78% 0.14 78)' },
  { id: 4, name: 'Nok P.', city: 'Chiang Mai', budget: '฿6,000–9,000', move: 'Feb 2025', tags: ['Digital nomad', 'Non-smoker'], note: 'Sunny room near Nimman, walking to cafés.', avatarBg: 'oklch(55% 0.19 25)' },
  { id: 5, name: 'Aung Ko', city: 'Yangon', budget: '250–350k Ks', move: 'Apr 2025', tags: ['Quiet', 'Graduate'], note: 'Studying engineering; looking for a calm flatmate.', avatarBg: 'oklch(45% 0.085 50)' },
  { id: 6, name: 'Ploy S.', city: 'Bangkok', budget: '฿10,000–15,000', move: 'Feb 2025', tags: ['Yoga', 'Female only'], note: 'Thonglor condo with gym & pool.', avatarBg: 'oklch(60% 0.145 42)' },
]

export default function Roommate() {
  const { t } = useTranslation()
  const [tab, setTab] = useState<'looking' | 'offering'>('looking')

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 max-w-2xl">
        <span className="eyebrow">{t('roommate.eyebrow')}</span>
        <h1 className="display mt-2 text-5xl">{t('roommate.title')}</h1>
        <p className="mt-3 text-lg text-base-content/70">{t('roommate.sub')}</p>
      </div>

      {/* Compatibility callout */}
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
        <div className="flex min-w-[280px] flex-1 items-center gap-3 rounded-full bg-base-200 px-4 py-2 ring-1 ring-base-300">
          <Search className="h-4 w-4 text-primary" />
          <input placeholder={t('common.search')} className="flex-1 bg-transparent text-sm outline-none" />
        </div>
        <button className="btn btn-outline rounded-full gap-2">
          <SlidersHorizontal className="h-4 w-4" /> {t('common.filter')}
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex w-fit rounded-full bg-base-200 p-1 ring-1 ring-base-300">
        {(['looking', 'offering'] as const).map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={cn(
              'rounded-full px-5 py-2 text-sm font-semibold transition',
              tab === k ? 'bg-base-100 text-primary shadow' : 'text-base-content/60'
            )}
          >
            {k === 'looking' ? t('roommate.lookingFor') : t('roommate.offering')}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PEOPLE.map((p) => (
          <div key={p.id} className="warm-card p-6">
            <div className="flex items-start gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-serif text-xl font-semibold text-primary-content"
                style={{ background: p.avatarBg }}
              >
                {p.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-serif text-lg font-semibold truncate">{p.name}</p>
                <p className="text-xs text-base-content/60"><MapPin className="mr-1 inline h-3 w-3" />{p.city}</p>
              </div>
              <button className="text-base-content/50 hover:text-primary" aria-label="save"><Heart className="h-4 w-4" /></button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-base-content/75">"{p.note}"</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map((tg) => (
                <span key={tg} className="rounded-full bg-base-200 px-2.5 py-1 text-xs font-medium text-base-content/75 ring-1 ring-base-300">
                  {tg}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-end justify-between border-t border-base-300/70 pt-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-base-content/50 font-semibold">{t('roommate.budget')}</p>
                <p className="font-serif text-lg text-primary">{p.budget}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-base-content/50 font-semibold">{t('roommate.moveInDate')}</p>
                <p className="font-serif text-lg">{p.move}</p>
              </div>
            </div>

            <button className="btn btn-primary btn-sm w-full mt-5 rounded-full"><User className="h-4 w-4" /> {t('roommate.viewProfile')}</button>
          </div>
        ))}
      </div>

      <div className="mt-14 text-center">
        <button className="btn btn-outline rounded-full px-12 h-12">{t('common.loadMore')}</button>
      </div>
    </div>
  )
}
