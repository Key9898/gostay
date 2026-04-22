import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useApi } from '@hooks'
import type { RoommatePost } from '@types'

export default function RoommateForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { request } = useApi()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [budgetMin, setBudgetMin] = useState<number>(0)
  const [budgetMax, setBudgetMax] = useState<number>(0)
  const [currency, setCurrency] = useState<'MMK' | 'THB' | 'USD'>('MMK')
  const [moveInDate, setMoveInDate] = useState('')
  const [duration, setDuration] = useState('6 months')
  const [preferredLocations, setPreferredLocations] = useState('')
  const [gender, setGender] = useState<'male' | 'female' | 'any'>('any')
  const [smoking, setSmoking] = useState(false)
  const [pets, setPets] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const body = {
        title,
        description,
        budget: { min: budgetMin, max: budgetMax },
        currency,
        moveInDate: moveInDate ? new Date(moveInDate).toISOString() : undefined,
        duration,
        preferredLocations: preferredLocations
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        preferences: { gender, smoking, pets },
        status: 'looking',
      }
      const result = await request<RoommatePost & { _id?: string }>('/api/roommates', {
        method: 'POST',
        json: body,
      })
      navigate(`/roommate${result.id ? `#${result.id}` : result._id ? `#${result._id}` : ''}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create roommate post')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <Link
        to="/roommate"
        className="mb-6 inline-flex items-center gap-2 text-sm text-base-content/70 hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.back')}
      </Link>

      <span className="eyebrow">{t('roommate.eyebrow')}</span>
      <h1 className="display mt-2 text-3xl sm:text-4xl">{t('roommate.post') ?? 'Post roommate'}</h1>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <Field label="Title">
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
          />
        </Field>

        <Field label="About">
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="textarea textarea-bordered w-full"
          />
        </Field>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Field label="Budget min">
            <input
              required
              type="number"
              min={0}
              value={budgetMin}
              onChange={(e) => setBudgetMin(Number(e.target.value))}
              className="input input-bordered w-full"
            />
          </Field>
          <Field label="Budget max">
            <input
              required
              type="number"
              min={0}
              value={budgetMax}
              onChange={(e) => setBudgetMax(Number(e.target.value))}
              className="input input-bordered w-full"
            />
          </Field>
          <Field label="Currency">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as typeof currency)}
              className="select select-bordered w-full"
            >
              <option value="MMK">MMK (Ks)</option>
              <option value="THB">THB (฿)</option>
              <option value="USD">USD ($)</option>
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Move-in date">
            <input
              type="date"
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
              className="input input-bordered w-full"
            />
          </Field>
          <Field label="Duration">
            <input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="input input-bordered w-full"
              placeholder="e.g. 6 months"
            />
          </Field>
        </div>

        <Field label="Preferred cities (comma separated)">
          <input
            value={preferredLocations}
            onChange={(e) => setPreferredLocations(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Yangon, Mandalay"
          />
        </Field>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Field label="Gender preference">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as typeof gender)}
              className="select select-bordered w-full"
            >
              <option value="any">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </Field>
          <label className="flex items-center gap-3 rounded-xl bg-base-200 px-4 py-3">
            <input
              type="checkbox"
              checked={smoking}
              onChange={(e) => setSmoking(e.target.checked)}
              className="checkbox checkbox-primary"
            />
            <span className="text-sm">Smoking ok</span>
          </label>
          <label className="flex items-center gap-3 rounded-xl bg-base-200 px-4 py-3">
            <input
              type="checkbox"
              checked={pets}
              onChange={(e) => setPets(e.target.checked)}
              className="checkbox checkbox-primary"
            />
            <span className="text-sm">Pets ok</span>
          </label>
        </div>

        {error && (
          <div className="rounded-xl bg-error/10 p-4 text-sm text-error ring-1 ring-error/30">
            {error}
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={submitting} className="btn btn-primary rounded-full px-8">
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {t('roommate.post') ?? 'Post roommate'}
          </button>
          <Link to="/roommate" className="btn btn-ghost rounded-full">
            {t('common.cancel')}
          </Link>
        </div>
      </form>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-base-content/60">
        {label}
      </span>
      {children}
    </label>
  )
}
