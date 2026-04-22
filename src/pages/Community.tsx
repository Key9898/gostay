import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  Search,
  Plus,
  ArrowUp,
  ArrowDown,
  MessageCircle,
  Bookmark,
  Share2,
  TrendingUp,
} from 'lucide-react'
import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@utils'
import { usePosts, useApi } from '@hooks'
import { SEO } from '@components/common'

const categories = ['all', 'general', 'market', 'tips', 'qa'] as const
type Category = (typeof categories)[number]

export default function Community() {
  const { t } = useTranslation()
  const [active, setActive] = useState<Category>('all')
  const { data, loading, error, refetch } = usePosts({
    category: active === 'all' ? undefined : active,
    limit: 20,
  })
  const { request } = useApi()

  const posts = data?.posts ?? []

  const vote = async (postId: string, direction: 'up' | 'down') => {
    try {
      await request(`/api/posts/${postId}/vote`, {
        method: 'POST',
        json: { direction },
      })
      refetch()
    } catch {
      /* silent */
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <SEO
        title="Community"
        description="Join discussions on housing, city life, and market tips from the GoStay community."
      />
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl">
          <span className="eyebrow">{t('community.eyebrow')}</span>
          <h1 className="display mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            {t('community.title')}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-base-content/70">{t('community.sub')}</p>
        </div>
        <Link to="/community/create" className="btn btn-primary rounded-full gap-2">
          <Plus className="h-4 w-4" />
          {t('community.createPost')}
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr,280px]">
        <div>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-full bg-base-200 px-4 py-2 ring-1 ring-base-300 sm:min-w-[280px]">
              <Search className="h-4 w-4 text-primary" />
              <input
                placeholder={t('common.search')}
                className="flex-1 bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-sm font-semibold transition',
                  active === c
                    ? 'border-transparent bg-[#C2573A] text-white'
                    : 'border-[#E8DDC9] bg-[#FBF6EE] text-[#5C5149] hover:bg-base-200'
                )}
              >
                {t(`community.categories.${c}`)}
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-4 rounded-xl bg-error/10 p-4 text-sm text-error ring-1 ring-error/30">
              {error.message}
            </div>
          )}

          <div className="space-y-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="warm-card p-6">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-base-200" />
                  <div className="mt-3 h-4 w-full animate-pulse rounded bg-base-200" />
                </div>
              ))
            ) : posts.length === 0 ? (
              <div className="warm-card py-8 text-center md:py-16">
                <p className="display text-2xl text-base-content/60">No posts yet</p>
                <p className="mt-2 text-sm text-base-content/50">Start the conversation.</p>
                <Link to="/community/create" className="btn btn-primary mt-6 rounded-full">
                  {t('community.createPost')}
                </Link>
              </div>
            ) : (
              posts.map((p) => (
                <article key={p.id} className="warm-card p-6">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-1 rounded-xl bg-[#F4E9D8] px-3 py-3">
                      <button
                        onClick={() => vote(String(p.id), 'up')}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#5C5149] hover:bg-[#E8DDD0] hover:text-[#C2573A]"
                        aria-label="upvote"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <span className="font-serif text-lg font-semibold text-[#1F1A17]">
                        {p.upvotes - p.downvotes}
                      </span>
                      <button
                        onClick={() => vote(String(p.id), 'down')}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#5C5149] hover:bg-[#E8DDD0] hover:text-[#C2573A]"
                        aria-label="downvote"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-base-content/60">
                        <span className="rounded-full bg-accent/20 px-2.5 py-0.5 font-semibold text-secondary capitalize">
                          {p.category}
                        </span>
                        <span>·</span>
                        <span>
                          {formatDistanceToNow(new Date(p.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <Link to={`/community/post/${p.id}`}>
                        <h3 className="mt-2 font-serif text-lg font-semibold leading-snug hover:text-primary sm:text-xl">
                          {p.title}
                        </h3>
                      </Link>
                      <p className="mt-2 text-sm leading-relaxed text-base-content/75 line-clamp-3">
                        {p.content}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-sm text-base-content/60">
                        <Link
                          to={`/community/post/${p.id}`}
                          className="btn btn-ghost btn-sm rounded-full"
                        >
                          <MessageCircle className="h-4 w-4" />
                          {p.commentCount}
                        </Link>
                        <button className="btn btn-ghost btn-sm rounded-full">
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button className="btn btn-ghost btn-sm rounded-full">
                          <Bookmark className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>

        <aside className="hidden space-y-4 lg:block">
          <div className="rounded-2xl bg-base-100 p-5 ring-1 ring-base-300">
            <h3 className="flex items-center gap-2 font-serif text-lg font-semibold">
              <TrendingUp className="h-4 w-4 text-primary" /> {t('community.trending')}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                'Best neighborhoods 2025',
                'Deposit disputes — how-to',
                'Roommate red flags',
                'Bangkok vs Yangon cost',
              ].map((topic) => (
                <li
                  key={topic}
                  className="flex cursor-pointer items-start gap-2 text-base-content/75 hover:text-primary"
                >
                  <span className="text-primary">#</span>
                  {topic}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-secondary p-5 text-secondary-content">
            <p className="font-serif text-lg font-semibold">{t('community.guidelines.title')}</p>
            <p className="mt-2 text-sm opacity-85">{t('community.guidelines.body')}</p>
            <button className="btn btn-sm mt-4 rounded-full border-0 bg-base-100 text-base-content hover:bg-base-200">
              {t('community.guidelines.read')}
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
