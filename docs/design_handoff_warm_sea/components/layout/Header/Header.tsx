import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X, Globe, User, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@context'
import { useSettings } from '@context'

export default function Header() {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const { language, setLanguage } = useSettings()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const languages = [
    { code: 'my', label: 'မြန်မာ' },
    { code: 'en', label: 'English' },
    { code: 'th', label: 'ไทย' },
  ] as const

  const navItems = [
    { to: '/listings', label: t('nav.listings') },
    { to: '/roommate', label: t('nav.roommate') },
    { to: '/kitchen', label: t('nav.kitchen') },
    { to: '/community', label: t('nav.community') },
    { to: '/manage', label: t('nav.manage') },
  ]

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
      isActive
        ? 'text-primary after:absolute after:left-3 after:right-3 after:-bottom-px after:h-0.5 after:bg-primary'
        : 'text-base-content/75 hover:text-base-content'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-base-300/70 bg-base-100/90 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center gap-4">
          {/* Brand */}
          <Link to="/" className="group flex items-center gap-2">
            <img
              src="/logo/logo.svg"
              alt="GoStay"
              className="h-9 w-auto object-contain transition-transform group-hover:-rotate-3"
            />
            <span className="display text-2xl font-semibold tracking-tight text-base-content">
              GoStay
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="ml-6 hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            {/* Language */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-sm rounded-full gap-1">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline text-xs font-semibold">
                  {language.toUpperCase()}
                </span>
                <ChevronDown className="h-3 w-3 opacity-60" />
              </div>
              <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] mt-2 w-36 border border-base-300 p-1 shadow-xl">
                {languages.map((lang) => (
                  <li key={lang.code}>
                    <button
                      onClick={() => setLanguage(lang.code)}
                      className={language === lang.code ? 'active' : ''}
                    >
                      {lang.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar ring-1 ring-base-300"
                >
                  <div className="w-9 rounded-full">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName} />
                    ) : (
                      <div className="bg-primary text-primary-content flex h-full items-center justify-center">
                        <User className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                </div>
                <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] mt-2 w-52 border border-base-300 p-1 shadow-xl">
                  <li>
                    <Link to="/profile">{t('nav.profile')}</Link>
                  </li>
                  <li>
                    <Link to="/manage">{t('nav.manage')}</Link>
                  </li>
                  <li>
                    <button onClick={logout}>{t('nav.logout')}</button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-1">
                <Link to="/login" className="btn btn-ghost btn-sm">
                  {t('nav.login')}
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm rounded-full px-5">
                  {t('nav.register')}
                </Link>
              </div>
            )}

            <button
              className="btn btn-ghost btn-sm lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-base-300 pb-4">
            <ul className="menu menu-vertical">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} onClick={() => setIsMenuOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
              {!user && (
                <>
                  <li>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      {t('nav.login')}
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      {t('nav.register')}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}
