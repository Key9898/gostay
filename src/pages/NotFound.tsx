import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="text-7xl font-bold text-primary sm:text-9xl">404</h1>
      <h2 className="mt-4 text-xl font-semibold sm:text-2xl">Page Not Found</h2>
      <p className="mt-2 text-center text-sm text-base-content/70 sm:text-base">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="mt-8 flex gap-4">
        <Link to="/" className="btn btn-primary">
          <Home className="h-5 w-5" />
          {t('nav.home')}
        </Link>
        <button onClick={() => window.history.back()} className="btn btn-outline">
          <ArrowLeft className="h-5 w-5" />
          {t('common.back')}
        </button>
      </div>
    </div>
  )
}
