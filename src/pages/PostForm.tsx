import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useApi } from '@hooks'
import type { Post } from '@types'

const CATEGORIES = ['general', 'market', 'tips', 'qa'] as const
type Category = (typeof CATEGORIES)[number]

export default function PostForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { request } = useApi()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState<Category>('general')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const result = await request<Post & { _id?: string }>('/api/posts', {
        method: 'POST',
        json: { title, content, category, isAnonymous },
      })
      navigate(`/community/post/${result.id ?? result._id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <Link
        to="/community"
        className="mb-6 inline-flex items-center gap-2 text-sm text-base-content/70 hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.back')}
      </Link>

      <span className="eyebrow">{t('community.eyebrow')}</span>
      <h1 className="display mt-2 text-3xl sm:text-4xl">{t('community.createPost')}</h1>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-base-content/60">
            Category
          </span>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={
                  'rounded-full border px-4 py-1.5 text-sm font-semibold transition ' +
                  (category === c
                    ? 'border-transparent bg-[#C2573A] text-white'
                    : 'border-[#E8DDC9] bg-[#FBF6EE] text-[#5C5149]')
                }
              >
                {t(`community.categories.${c}`)}
              </button>
            ))}
          </div>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-base-content/60">
            Title
          </span>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-base-content/60">
            Content
          </span>
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="textarea textarea-bordered w-full"
          />
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="checkbox checkbox-primary"
          />
          <span className="text-sm">Post anonymously</span>
        </label>

        {error && (
          <div className="rounded-xl bg-error/10 p-4 text-sm text-error ring-1 ring-error/30">
            {error}
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={submitting} className="btn btn-primary rounded-full px-8">
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {t('community.createPost')}
          </button>
          <Link to="/community" className="btn btn-ghost rounded-full">
            {t('common.cancel')}
          </Link>
        </div>
      </form>
    </div>
  )
}
