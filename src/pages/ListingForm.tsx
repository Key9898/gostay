import { useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApi, useListing } from '@hooks'
import ImageUpload from '@components/common/ImageUpload'
import type { Listing } from '@types'

export default function ListingForm() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { request } = useApi()
  const { data: existing } = useListing(id)

  const [title, setTitle] = useState(existing?.title ?? '')
  const [description, setDescription] = useState(existing?.description ?? '')
  const [type, setType] = useState<'apartment' | 'condo' | 'house' | 'room'>('apartment')
  const [priceMonthly, setPriceMonthly] = useState<number>(existing?.price ?? 0)
  const [currency, setCurrency] = useState<'MMK' | 'THB' | 'USD'>(existing?.currency ?? 'MMK')
  const [city, setCity] = useState(existing?.location?.city ?? 'Yangon')
  const [country, setCountry] = useState<'Myanmar' | 'Thailand'>(
    (existing?.location?.country as 'Myanmar' | 'Thailand') ?? 'Myanmar'
  )
  const [address, setAddress] = useState(existing?.location?.address ?? '')
  const [bedrooms, setBedrooms] = useState<number>(existing?.bedrooms ?? 1)
  const [bathrooms, setBathrooms] = useState<number>(existing?.bathrooms ?? 1)
  const [area, setArea] = useState<number>(existing?.area ?? 0)
  const [images, setImages] = useState<string[]>(existing?.images ?? [])
  const [amenities, setAmenities] = useState<string>((existing?.amenities ?? []).join(', '))
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
        type,
        priceMonthly,
        currency,
        location: { address, city, country },
        bedrooms,
        bathrooms,
        area,
        images,
        amenities: amenities
          .split(',')
          .map((a) => a.trim())
          .filter(Boolean),
        status: 'available',
      }
      const result = id
        ? await request<Listing>(`/api/listings/${id}`, { method: 'PATCH', json: body })
        : await request<Listing>('/api/listings', { method: 'POST', json: body })
      navigate(`/listings/${result.id ?? (result as unknown as { _id: string })._id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save listing')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <Link
        to="/listings"
        className="mb-6 inline-flex items-center gap-2 text-sm text-base-content/70 hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.back')}
      </Link>

      <span className="eyebrow">{id ? 'Edit' : 'New'}</span>
      <h1 className="display mt-2 text-3xl sm:text-4xl">
        {id ? 'Edit listing' : t('listings.postListing')}
      </h1>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <Field label="Title">
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
          />
        </Field>

        <Field label="Description">
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="textarea textarea-bordered w-full"
          />
        </Field>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Field label="Type">
            <select
              value={type}
              onChange={(e) => setType(e.target.value as typeof type)}
              className="select select-bordered w-full"
            >
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              <option value="house">House</option>
              <option value="room">Room</option>
            </select>
          </Field>
          <Field label="Monthly price">
            <input
              required
              type="number"
              min={0}
              value={priceMonthly}
              onChange={(e) => setPriceMonthly(Number(e.target.value))}
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Field label="Country">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value as typeof country)}
              className="select select-bordered w-full"
            >
              <option value="Myanmar">Myanmar</option>
              <option value="Thailand">Thailand</option>
            </select>
          </Field>
          <Field label="City">
            <input
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="input input-bordered w-full"
            />
          </Field>
          <Field label="Address">
            <input
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input input-bordered w-full"
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <Field label="Bedrooms">
            <input
              type="number"
              min={0}
              value={bedrooms}
              onChange={(e) => setBedrooms(Number(e.target.value))}
              className="input input-bordered w-full"
            />
          </Field>
          <Field label="Bathrooms">
            <input
              type="number"
              min={0}
              value={bathrooms}
              onChange={(e) => setBathrooms(Number(e.target.value))}
              className="input input-bordered w-full"
            />
          </Field>
          <Field label="Area (sqft)">
            <input
              type="number"
              min={0}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="input input-bordered w-full"
            />
          </Field>
        </div>

        <Field label="Amenities (comma separated)">
          <input
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Wifi, Air conditioning, Parking"
          />
        </Field>

        <Field label="Photos">
          <ImageUpload value={images} onChange={setImages} max={10} />
        </Field>

        {error && (
          <div className="rounded-xl bg-error/10 p-4 text-sm text-error ring-1 ring-error/30">
            {error}
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={submitting} className="btn btn-primary rounded-full px-8">
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {id ? t('common.save') : t('listings.postListing')}
          </button>
          <Link to="/listings" className="btn btn-ghost rounded-full">
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
