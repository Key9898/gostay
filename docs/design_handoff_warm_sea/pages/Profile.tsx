import { useTranslation } from 'react-i18next'
import { User, Home, Bookmark, Settings, Pencil, ShieldCheck, Mail, Calendar } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@utils'

export default function Profile() {
  const { t } = useTranslation()
  const [tab, setTab] = useState<'posts' | 'listings' | 'saved' | 'settings'>('posts')

  const tabs = [
    { key: 'posts' as const, label: t('profile.myPosts'), icon: User },
    { key: 'listings' as const, label: t('profile.myListings'), icon: Home },
    { key: 'saved' as const, label: t('profile.savedItems'), icon: Bookmark },
    { key: 'settings' as const, label: t('profile.settings'), icon: Settings },
  ]

  return (
    <div>
      {/* Header banner */}
      <div className="paper border-b border-base-300">
        <div className="container mx-auto px-4 py-14">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-content ring-4 ring-base-100">
              <User className="h-12 w-12" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="eyebrow">{t('profile.eyebrow')}</span>
              <h1 className="display mt-1 text-4xl">John Doe</h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-base-content/70">
                <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> john.doe@example.com</span>
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Member since Jan 2025</span>
                <span className="flex items-center gap-1 text-secondary"><ShieldCheck className="h-4 w-4" /> Verified</span>
              </div>
            </div>
            <button className="btn btn-primary rounded-full gap-2"><Pencil className="h-4 w-4" />{t('profile.editProfile')}</button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-base-300 pt-6 md:grid-cols-4">
            {[
              { k: '3', v: t('profile.stats.listings') },
              { k: '12', v: t('profile.stats.posts') },
              { k: '48', v: t('profile.stats.saved') },
              { k: '4.8', v: t('profile.stats.rating') },
            ].map((s) => (
              <div key={s.v}>
                <p className="display text-3xl text-base-content">{s.k}</p>
                <p className="text-xs text-base-content/60">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="mb-6 flex flex-wrap gap-2 border-b border-base-300">
          {tabs.map((tb) => (
            <button
              key={tb.key}
              onClick={() => setTab(tb.key)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-semibold transition',
                tab === tb.key
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-base-content/60 hover:text-base-content'
              )}
            >
              <tb.icon className="h-4 w-4" />
              {tb.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="warm-card p-6">
              <span className="eyebrow">Post · 3d ago</span>
              <h3 className="mt-2 font-serif text-xl font-semibold">My Post {i}</h3>
              <p className="mt-2 text-sm text-base-content/70">This is a sample post content that shows what the user has posted in the community.</p>
              <div className="mt-5 flex items-center justify-between border-t border-base-300/70 pt-4">
                <span className="text-xs text-base-content/60">24 votes · 6 replies</span>
                <div className="flex gap-2">
                  <button className="btn btn-ghost btn-sm">{t('common.edit')}</button>
                  <button className="btn btn-ghost btn-sm text-error">{t('common.delete')}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
