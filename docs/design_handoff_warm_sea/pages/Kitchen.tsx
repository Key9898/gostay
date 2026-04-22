import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Search, MapPin, Clock, Star, ChefHat, QrCode, Truck, ShoppingBag, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@utils'

const CATEGORIES = ['all', 'breakfast', 'curry', 'noodles', 'snacks', 'thai', 'vegetarian']

const MERCHANTS = [
  { id: 1, name: "Daw Khin's Mohinga", cuisine: 'Myanmar · Breakfast', distance: '0.3 km', eta: '15 min', rating: 4.9, price: 'from 2,500 Ks', img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80' },
  { id: 2, name: 'Auntie Pim Kitchen', cuisine: 'Thai · Home-style', distance: '0.6 km', eta: '20 min', rating: 4.8, price: 'from ฿80', img: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=800&q=80' },
  { id: 3, name: 'Shan Noodle House', cuisine: 'Shan · Noodles', distance: '1.1 km', eta: '25 min', rating: 4.7, price: 'from 3,000 Ks', img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80' },
  { id: 4, name: 'Vegan by Nok', cuisine: 'Vegetarian · Bowls', distance: '0.8 km', eta: '18 min', rating: 4.9, price: 'from ฿120', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80' },
  { id: 5, name: 'U Ko Tea & Snacks', cuisine: 'Snacks · Tea shop', distance: '0.2 km', eta: '10 min', rating: 4.6, price: 'from 1,500 Ks', img: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=800&q=80' },
  { id: 6, name: 'Khao Soi Mama', cuisine: 'Thai · Chiang Mai', distance: '1.4 km', eta: '28 min', rating: 4.8, price: 'from ฿95', img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80' },
]

export default function Kitchen() {
  const { t } = useTranslation()
  const [cat, setCat] = useState('all')

  return (
    <div>
      {/* Hero */}
      <section className="paper border-b border-base-300">
        <div className="container mx-auto px-4 py-14">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="eyebrow"><ChefHat className="mr-1 inline h-3.5 w-3.5 -translate-y-0.5" />{t('kitchen.eyebrow')}</span>
              <h1 className="display mt-3 text-5xl md:text-6xl">
                {t('kitchen.heroA')} <em className="not-italic text-primary">{t('kitchen.heroB')}</em> {t('kitchen.heroC')}
              </h1>
              <p className="mt-5 max-w-xl text-lg text-base-content/75">{t('kitchen.sub')}</p>

              <div className="mt-7 flex flex-col gap-2 rounded-2xl bg-base-100 p-2 shadow-xl ring-1 ring-base-300 sm:flex-row">
                <label className="flex flex-1 items-center gap-3 px-4 py-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <input placeholder={t('kitchen.deliverTo')} className="w-full bg-transparent text-sm outline-none" />
                </label>
                <div className="hidden sm:block h-10 w-px bg-base-300 self-center" />
                <label className="flex flex-1 items-center gap-3 px-4 py-3">
                  <Search className="h-5 w-5 text-primary" />
                  <input placeholder={t('kitchen.searchDish')} className="w-full bg-transparent text-sm outline-none" />
                </label>
                <button className="btn btn-primary rounded-xl px-6">{t('common.search')}</button>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-base-content/65">
                <span className="flex items-center gap-1"><QrCode className="h-4 w-4 text-primary" />{t('kitchen.chip.qr')}</span>
                <span className="flex items-center gap-1"><Truck className="h-4 w-4 text-primary" />{t('kitchen.chip.delivery')}</span>
                <span className="flex items-center gap-1"><ShoppingBag className="h-4 w-4 text-primary" />{t('kitchen.chip.pickup')}</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-[420px]">
                <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80" alt="" className="absolute right-0 top-0 h-[280px] w-[85%] rounded-3xl object-cover shadow-2xl" />
                <div className="absolute bottom-0 left-0 w-[75%] rounded-3xl bg-base-100 p-5 shadow-2xl ring-1 ring-base-300">
                  <div className="flex items-center gap-1 text-accent">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                  </div>
                  <p className="mt-3 font-serif text-lg font-semibold">Daw Khin's Mohinga</p>
                  <p className="text-xs text-base-content/60">0.3 km · ready in 15 min</p>
                  <p className="mt-3 display text-2xl text-primary">from 2,500 Ks</p>
                </div>
                <div className="absolute right-4 top-[260px] flex items-center gap-2 rounded-full bg-secondary px-3 py-2 text-secondary-content shadow-lg">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span className="text-xs font-semibold">Fresh, home-cooked</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories + listings */}
      <section className="container mx-auto px-4 py-14">
        <div className="mb-6 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={cn(
              'rounded-full px-4 py-1.5 text-sm font-semibold ring-1 transition',
              cat === c ? 'bg-primary text-primary-content ring-primary' : 'bg-base-100 text-base-content/70 ring-base-300 hover:bg-base-200'
            )}>
              {t(`kitchen.cats.${c}`)}
            </button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {MERCHANTS.map((m) => (
            <article key={m.id} className="warm-card group overflow-hidden">
              <div className="relative h-52 overflow-hidden">
                <img src={m.img} alt={m.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-base-100/95 px-3 py-1 text-xs font-semibold ring-1 ring-base-300">
                  <Clock className="h-3 w-3" />{m.eta}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1 text-xs">
                  <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                  <strong>{m.rating}</strong>
                  <span className="text-base-content/60">· {m.distance}</span>
                </div>
                <h3 className="mt-2 font-serif text-xl font-semibold group-hover:text-primary">{m.name}</h3>
                <p className="text-sm text-base-content/65">{m.cuisine}</p>
                <div className="mt-4 flex items-end justify-between border-t border-base-300/70 pt-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-base-content/50 font-semibold">Price</p>
                    <p className="font-serif text-lg text-primary">{m.price}</p>
                  </div>
                  <button className="btn btn-primary btn-sm rounded-full">Order</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Merchant CTA */}
      <section className="container mx-auto px-4 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-secondary p-10 text-secondary-content lg:p-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow text-accent">{t('kitchen.merchantCta.eyebrow')}</span>
              <h2 className="display mt-3 text-4xl md:text-5xl text-secondary-content">{t('kitchen.merchantCta.title')}</h2>
              <p className="mt-5 max-w-md leading-relaxed text-secondary-content/85">{t('kitchen.merchantCta.body')}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/kitchen/merchant" className="btn btn-primary rounded-full px-6">{t('kitchen.becomeMerchant')}</Link>
                <Link to="#" className="btn btn-outline rounded-full border-secondary-content/40 px-6 text-secondary-content hover:bg-secondary-content hover:text-secondary">Learn how</Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[QrCode, ChefHat, Truck].map((Icon, i) => (
                <div key={i} className="flex flex-col items-center gap-2 rounded-2xl bg-secondary-content/10 p-6">
                  <Icon className="h-8 w-8 text-accent" />
                  <span className="text-xs font-semibold text-center">{['QR ordering', 'Your menu', 'Pickup/Delivery'][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
