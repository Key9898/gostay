import { useTranslation } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Phone,
  Mail,
  ArrowLeft,
  Heart,
  Share2,
  ShieldCheck,
  Star,
  Wifi,
} from 'lucide-react'
import { useListing } from '@hooks'
import { cloudinaryUrl } from '@services'
import { formatPrice, type Currency } from '@utils'
import MapView from '@components/common/MapView'
import { SEO } from '@components/common'

function resolveImage(src: string): string {
  if (!src) return ''
  if (src.startsWith('http')) return src
  return cloudinaryUrl(src, 'w_1400,f_auto,q_auto')
}

export default function ListingDetail() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const { data: listing, loading, error } = useListing(id)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      </div>
    )
  }

  if (error || !listing) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="display text-3xl text-base-content/60">Listing not found</p>
        <p className="mt-2 text-sm text-base-content/50">
          {error?.message ?? 'This listing may have been removed.'}
        </p>
        <Link to="/listings" className="btn btn-primary mt-6 rounded-full">
          {t('common.back')}
        </Link>
      </div>
    )
  }

  const gallery = listing.images?.length ? listing.images.slice(0, 5).map(resolveImage) : []
  const hasCoords = listing.location?.lat && listing.location?.lng

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO
        title={listing.title}
        description={listing.description?.slice(0, 160)}
        image={gallery[0]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: listing.title,
          description: listing.description,
          image: gallery,
          offers: {
            '@type': 'Offer',
            price: listing.price,
            priceCurrency: listing.currency,
          },
        }}
      />
      <Link
        to="/listings"
        className="mb-6 inline-flex items-center gap-2 text-sm text-base-content/70 hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t('common.back')}
      </Link>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <span className="eyebrow">
            {listing.location?.city}
            {listing.location?.country ? `, ${listing.location.country}` : ''}
          </span>
          <h1 className="display mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            {listing.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <strong>4.9</strong> <span className="text-base-content/60">· new</span>
            </span>
            <span className="flex items-center gap-1 text-secondary">
              <ShieldCheck className="h-4 w-4" />
              <strong>Verified owner</strong>
            </span>
            {listing.location?.address && (
              <span className="flex items-center gap-1 text-base-content/60">
                <MapPin className="h-4 w-4" /> {listing.location.address}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-ghost btn-sm rounded-full gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </button>
          <button className="btn btn-ghost btn-sm rounded-full gap-2">
            <Heart className="h-4 w-4" />
            Save
          </button>
        </div>
      </div>

      {gallery.length > 0 && (
        <div className="grid h-[260px] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-3xl md:h-[360px] md:gap-3 lg:h-[460px]">
          <img
            src={gallery[0]}
            alt=""
            className="col-span-2 row-span-2 h-full w-full object-cover"
          />
          {gallery.slice(1, 5).map((src, i) => (
            <img key={i} src={src} alt="" className="h-full w-full object-cover" />
          ))}
        </div>
      )}

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4 rounded-2xl bg-base-200/70 p-6 sm:grid-cols-4">
            <Stat icon={Bed} label={t('listings.bedrooms')} value={String(listing.bedrooms)} />
            <Stat icon={Bath} label={t('listings.bathrooms')} value={String(listing.bathrooms)} />
            <Stat icon={Maximize} label={t('listings.area')} value={`${listing.area} sqft`} />
            <Stat icon={ShieldCheck} label="Status" value={listing.status} />
          </div>

          <div className="mt-10">
            <h2 className="display text-2xl md:text-3xl">About this place</h2>
            <div className="rule my-5" />
            <p className="leading-relaxed text-base-content/80 whitespace-pre-line">
              {listing.description}
            </p>
          </div>

          {listing.amenities?.length > 0 && (
            <div className="mt-10">
              <h2 className="display text-2xl md:text-3xl">Amenities</h2>
              <div className="rule my-5" />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {listing.amenities.map((a) => (
                  <div
                    key={a}
                    className="flex items-center gap-3 rounded-xl bg-base-100 p-4 ring-1 ring-base-300"
                  >
                    <Wifi className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10">
            <h2 className="display text-2xl md:text-3xl">Location</h2>
            <div className="rule my-5" />
            <div className="h-52 overflow-hidden rounded-2xl ring-1 ring-base-300 sm:h-64 md:h-72">
              {hasCoords ? (
                <MapView
                  center={[listing.location.lng as number, listing.location.lat as number]}
                  zoom={14}
                  markers={[
                    {
                      id: String(listing.id),
                      lat: listing.location.lat as number,
                      lng: listing.location.lng as number,
                    },
                  ]}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-base-content/50">
                  Location not available
                </div>
              )}
            </div>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-20 rounded-3xl bg-base-100 p-6 shadow-xl ring-1 ring-base-300 lg:top-28">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-base-content/50 font-semibold">
                  {listing.priceType === 'daily'
                    ? t('listings.priceDaily')
                    : t('listings.priceMonthly')}
                </p>
                <p className="display text-3xl text-primary sm:text-4xl">
                  {formatPrice(listing.price, listing.currency as Currency)}
                </p>
              </div>
              <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-secondary capitalize">
                {listing.status}
              </span>
            </div>

            <div className="rule my-5" />

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-content">
                <span className="font-serif text-lg font-semibold">H</span>
              </div>
              <div>
                <p className="font-semibold">Host</p>
                <p className="text-xs text-base-content/60">On GoStay</p>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <button className="btn btn-primary h-12 w-full rounded-full">
                <Phone className="h-4 w-4" />
                {t('listings.contact')}
              </button>
              <button className="btn btn-outline h-12 w-full rounded-full">
                <Mail className="h-4 w-4" />
                {t('listings.sendMessage')}
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-base-content/60">
              <ShieldCheck className="mr-1 inline h-3 w-3" />
              Verified through GoStay
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Stat({ icon: Icon, label, value }: { icon: typeof Bed; label: string; value: string }) {
  return (
    <div className="text-center">
      <Icon className="mx-auto h-6 w-6 text-primary" />
      <p className="mt-2 text-xs uppercase tracking-wider text-base-content/60">{label}</p>
      <p className="font-serif text-xl font-semibold capitalize">{value}</p>
    </div>
  )
}
