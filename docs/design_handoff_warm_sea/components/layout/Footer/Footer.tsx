import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Instagram, Facebook, Mail } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-base-300 bg-base-200/60">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand column */}
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo/logo.svg" alt="GoStay" className="h-10 w-auto" />
              <span className="display text-3xl font-semibold">GoStay</span>
            </Link>
            <p className="mt-4 max-w-sm text-base-content/70 leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="mt-6 flex items-center gap-2">
              <a
                href="#"
                className="btn btn-ghost btn-sm btn-circle"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="btn btn-ghost btn-sm btn-circle"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@gostay.com"
                className="btn btn-ghost btn-sm btn-circle"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="md:col-span-2">
            <h4 className="eyebrow text-xs">{t('footer.discover')}</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/listings" className="text-base-content/75 hover:text-primary">
                  {t('nav.listings')}
                </Link>
              </li>
              <li>
                <Link to="/roommate" className="text-base-content/75 hover:text-primary">
                  {t('nav.roommate')}
                </Link>
              </li>
              <li>
                <Link to="/kitchen" className="text-base-content/75 hover:text-primary">
                  {t('nav.kitchen')}
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-base-content/75 hover:text-primary">
                  {t('nav.community')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="eyebrow text-xs">{t('footer.forOwners')}</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/manage" className="text-base-content/75 hover:text-primary">
                  {t('nav.manage')}
                </Link>
              </li>
              <li>
                <Link to="/listings" className="text-base-content/75 hover:text-primary">
                  {t('listings.createListing')}
                </Link>
              </li>
              <li>
                <Link to="/kitchen/merchant" className="text-base-content/75 hover:text-primary">
                  {t('kitchen.becomeMerchant')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="eyebrow text-xs">{t('footer.newsletter')}</h4>
            <p className="mt-4 text-sm text-base-content/70">
              {t('footer.newsletterDescription')}
            </p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@email.com"
                className="input input-bordered input-sm flex-1 rounded-full bg-base-100"
              />
              <button type="submit" className="btn btn-primary btn-sm rounded-full px-5">
                {t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-base-300 pt-6 text-xs text-base-content/60 md:flex-row md:items-center">
          <p>© {year} GoStay. {t('footer.rights')}</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-primary">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-primary">{t('footer.terms')}</a>
            <span className="opacity-60">Made in 🇲🇲 · 🇹🇭</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
