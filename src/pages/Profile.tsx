import { useTranslation } from 'react-i18next'
import {
  User,
  Home,
  Bookmark,
  Settings,
  Pencil,
  ShieldCheck,
  Mail,
  Calendar,
  LogOut,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@utils'
import { useAuth } from '@context'

export default function Profile() {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const [tab, setTab] = useState<'posts' | 'listings' | 'saved' | 'settings'>('posts')

  const tabs = [
    { key: 'posts' as const, label: t('profile.myPosts'), icon: User },
    { key: 'listings' as const, label: t('profile.myListings'), icon: Home },
    { key: 'saved' as const, label: t('profile.savedItems'), icon: Bookmark },
    { key: 'settings' as const, label: t('profile.settings'), icon: Settings },
  ]

  const initial = (user?.displayName || user?.email || '?').charAt(0).toUpperCase()

  return (
    <div>
      <div className="paper border-b border-base-300">
        <div className="container mx-auto px-4 py-8 md:py-14">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-primary text-primary-content ring-4 ring-base-100">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="font-serif text-3xl font-semibold">{initial}</span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <span className="eyebrow">{t('profile.eyebrow')}</span>
              <h1 className="display mt-1 text-2xl sm:text-3xl md:text-4xl">
                {user?.displayName || 'Guest'}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-base-content/70">
                {user?.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="h-4 w-4" /> {user.email}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> Member since {new Date().getFullYear()}
                </span>
                <span className="flex items-center gap-1 text-secondary">
                  <ShieldCheck className="h-4 w-4" /> Verified
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-primary rounded-full gap-2">
                <Pencil className="h-4 w-4" />
                {t('profile.editProfile')}
              </button>
              <button onClick={() => logout()} className="btn btn-ghost rounded-full gap-2">
                <LogOut className="h-4 w-4" />
                {t('auth.logout') ?? 'Logout'}
              </button>
            </div>
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

        <div className="warm-card py-8 text-center md:py-16">
          <p className="display text-2xl text-base-content/60">Nothing here yet</p>
          <p className="mt-2 text-sm text-base-content/50">Your {tab} will appear here.</p>
        </div>
      </div>
    </div>
  )
}
