import { useTranslation } from 'react-i18next'
import { Search, Plus, ArrowUp, ArrowDown, MessageCircle, Bookmark, Share2, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@utils'

const POSTS = [
  { id: 1, cat: 'Tips', title: 'Best areas to rent in Yangon for expats?', body: "I'm moving to Yangon next month and looking for recommendations on the best neighborhoods for expats. Any suggestions on safety, transit, and food scene?", author: 'mya_88', time: '2h', votes: 42, comments: 12 },
  { id: 2, cat: 'Market', title: 'Is 25k THB fair for a studio in Asoke?', body: 'Just saw a listing for a 35sqm studio at 25,000 THB. Seems high? What do people pay these days?', author: 'somchai_t', time: '5h', votes: 28, comments: 34 },
  { id: 3, cat: 'General', title: 'Lost my deposit — what are my rights?', body: 'My landlord kept my full 3-month deposit with no receipts. Are there tenant protections in Myanmar I can rely on?', author: 'zarni', time: '1d', votes: 89, comments: 41 },
  { id: 4, cat: 'Q&A', title: 'How to verify a landlord is legitimate?', body: 'What should I ask to know a landlord is real? Any red flags?', author: 'newintown', time: '2d', votes: 54, comments: 19 },
]

const categories = ['all', 'general', 'market', 'tips', 'qa']

export default function Community() {
  const { t } = useTranslation()
  const [active, setActive] = useState('all')

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl">
          <span className="eyebrow">{t('community.eyebrow')}</span>
          <h1 className="display mt-2 text-5xl">{t('community.title')}</h1>
          <p className="mt-3 text-lg text-base-content/70">{t('community.sub')}</p>
        </div>
        <button className="btn btn-primary rounded-full gap-2"><Plus className="h-4 w-4" />{t('community.createPost')}</button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr,280px]">
        <div>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="flex min-w-[280px] flex-1 items-center gap-3 rounded-full bg-base-200 px-4 py-2 ring-1 ring-base-300">
              <Search className="h-4 w-4 text-primary" />
              <input placeholder={t('common.search')} className="flex-1 bg-transparent text-sm outline-none" />
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-semibold ring-1 transition',
                  active === c
                    ? 'bg-primary text-primary-content ring-primary'
                    : 'bg-base-100 text-base-content/70 ring-base-300 hover:bg-base-200'
                )}
              >
                {t(`community.categories.${c}`)}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {POSTS.map((p) => (
              <article key={p.id} className="warm-card p-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-1 rounded-xl bg-base-200 px-2 py-3 text-base-content/70">
                    <button className="hover:text-primary" aria-label="upvote"><ArrowUp className="h-4 w-4" /></button>
                    <span className="font-serif text-lg font-semibold text-base-content">{p.votes}</span>
                    <button className="hover:text-primary" aria-label="downvote"><ArrowDown className="h-4 w-4" /></button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-base-content/60">
                      <span className="rounded-full bg-accent/20 px-2.5 py-0.5 font-semibold text-secondary">{p.cat}</span>
                      <span>by <strong className="text-base-content/80">{p.author}</strong></span>
                      <span>· {p.time}</span>
                    </div>
                    <h3 className="mt-2 font-serif text-xl font-semibold leading-snug">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-base-content/75">{p.body}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-base-content/60">
                      <button className="btn btn-ghost btn-sm rounded-full"><MessageCircle className="h-4 w-4" />{p.comments}</button>
                      <button className="btn btn-ghost btn-sm rounded-full"><Share2 className="h-4 w-4" /></button>
                      <button className="btn btn-ghost btn-sm rounded-full"><Bookmark className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button className="btn btn-outline rounded-full px-12 h-12">{t('common.loadMore')}</button>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block space-y-4">
          <div className="rounded-2xl bg-base-100 p-5 ring-1 ring-base-300">
            <h3 className="flex items-center gap-2 font-serif text-lg font-semibold">
              <TrendingUp className="h-4 w-4 text-primary" /> {t('community.trending')}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {['Best neighborhoods 2025', 'Deposit disputes — how-to', 'Roommate red flags', 'Bangkok vs Yangon cost'].map((t) => (
                <li key={t} className="flex items-start gap-2 text-base-content/75 hover:text-primary cursor-pointer">
                  <span className="text-primary">#</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-secondary p-5 text-secondary-content">
            <p className="font-serif text-lg font-semibold">{t('community.guidelines.title')}</p>
            <p className="mt-2 text-sm opacity-85">{t('community.guidelines.body')}</p>
            <button className="btn btn-sm mt-4 rounded-full bg-base-100 text-base-content hover:bg-base-200 border-0">{t('community.guidelines.read')}</button>
          </div>
        </aside>
      </div>
    </div>
  )
}
