import { useTranslation } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import {
  MapPin, Bed, Bath, Maximize, Phone, Mail, ArrowLeft, Heart, Share2,
  ShieldCheck, Star, Wifi, Car, Dumbbell, Waves, Shield, Wind
} from 'lucide-react'

export default function ListingDetail() {
  const { t } = useTranslation()
  useParams()

  const gallery = [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1400&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
  ]

  const amenities = [
    { icon: Wifi, label: 'Fast WiFi' },
    { icon: Wind, label: 'Air Conditioning' },
    { icon: Car, label: 'Parking' },
    { icon: Shield, label: '24/7 Security' },
    { icon: Dumbbell, label: 'Gym' },
    { icon: Waves, label: 'Pool' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/listings" className="mb-6 inline-flex items-center gap-2 text-sm text-base-content/70 hover:text-primary">
        <ArrowLeft className="h-4 w-4" />
        {t('common.back')}
      </Link>

      {/* Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <span className="eyebrow">Yangon, Myanmar</span>
          <h1 className="display mt-2 text-4xl md:text-5xl">Bamboo Loft on 38th Street</h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <strong>4.9</strong> <span className="text-base-content/60">· 128 reviews</span>
            </span>
            <span className="flex items-center gap-1 text-secondary">
              <ShieldCheck className="h-4 w-4" />
              <strong>Verified owner</strong>
            </span>
            <span className="flex items-center gap-1 text-base-content/60">
              <MapPin className="h-4 w-4" /> Downtown Yangon
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-ghost btn-sm rounded-full gap-2"><Share2 className="h-4 w-4" />Share</button>
          <button className="btn btn-ghost btn-sm rounded-full gap-2"><Heart className="h-4 w-4" />Save</button>
        </div>
      </div>

      {/* Gallery — editorial mosaic */}
      <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[460px] overflow-hidden rounded-3xl">
        <img src={gallery[0]} alt="" className="col-span-2 row-span-2 h-full w-full object-cover" />
        <img src={gallery[1]} alt="" className="h-full w-full object-cover" />
        <img src={gallery[2]} alt="" className="h-full w-full object-cover" />
        <img src={gallery[3]} alt="" className="h-full w-full object-cover" />
        <img src={gallery[4]} alt="" className="h-full w-full object-cover" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 rounded-2xl bg-base-200/70 p-6 sm:grid-cols-4">
            <Stat icon={Bed} label={t('listings.bedrooms')} value="2" />
            <Stat icon={Bath} label={t('listings.bathrooms')} value="1" />
            <Stat icon={Maximize} label={t('listings.area')} value="750 sqft" />
            <Stat icon={ShieldCheck} label="Type" value="Apartment" />
          </div>

          {/* About */}
          <div className="mt-10">
            <h2 className="display text-3xl">About this place</h2>
            <div className="rule my-5" />
            <p className="leading-relaxed text-base-content/80">
              A sun-drenched loft in the heart of downtown Yangon. Teakwood floors, exposed brick, and a private balcony
              overlooking 38th Street's colonial rooftops. The kitchen is fully equipped; the neighborhood brims with
              teashops, tailors, and the morning market. Ten minutes to Sule Pagoda by foot.
            </p>
          </div>

          {/* Amenities */}
          <div className="mt-10">
            <h2 className="display text-3xl">Amenities</h2>
            <div className="rule my-5" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {amenities.map((a) => (
                <div key={a.label} className="flex items-center gap-3 rounded-xl bg-base-100 p-4 ring-1 ring-base-300">
                  <a.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{a.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="mt-10">
            <h2 className="display text-3xl">Location</h2>
            <div className="rule my-5" />
            <div className="h-72 overflow-hidden rounded-2xl ring-1 ring-base-300">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80" alt="Map" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        {/* Sticky booking panel */}
        <aside className="lg:col-span-1">
          <div className="sticky top-28 rounded-3xl bg-base-100 p-6 shadow-xl ring-1 ring-base-300">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-base-content/50 font-semibold">{t('listings.priceMonthly')}</p>
                <p className="display text-4xl text-primary">480,000 Ks</p>
              </div>
              <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-secondary">
                Available now
              </span>
            </div>

            <div className="rule my-5" />

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-content">
                <span className="font-serif text-lg font-semibold">JD</span>
              </div>
              <div>
                <p className="font-semibold">John Doe</p>
                <p className="text-xs text-base-content/60">Landlord · 3 years on GoStay</p>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <button className="btn btn-primary w-full rounded-full h-12"><Phone className="h-4 w-4" />{t('listings.contact')}</button>
              <button className="btn btn-outline w-full rounded-full h-12"><Mail className="h-4 w-4" />{t('listings.sendMessage')}</button>
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
      <p className="font-serif text-xl font-semibold">{value}</p>
    </div>
  )
}
