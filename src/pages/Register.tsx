import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import { useAuth } from '@context'

export default function Register() {
  const { t } = useTranslation()
  const { user, loading, register, loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user) navigate('/', { replace: true })
  }, [loading, user, navigate])

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1527576539890-dfa815648363?w=1200&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1A17]/70 via-[#1F1A17]/20 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-end p-14 text-primary-content">
          <span className="eyebrow text-accent">Join GoStay</span>
          <h2 className="display mt-3 text-4xl md:text-5xl leading-tight">
            Home finds, <em className="not-italic text-accent">kitchen tables,</em> good people.
          </h2>
          <p className="mt-4 max-w-md text-primary-content/85">
            Create an account to save listings, chat with hosts, and start managing your rentals —
            free.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-14 bg-base-100">
        <div className="w-full max-w-md">
          <span className="eyebrow">GoStay</span>
          <h1 className="display mt-2 text-3xl sm:text-4xl">{t('auth.registerTitle')}</h1>
          <p className="mt-2 text-sm sm:text-base text-base-content/70">{t('auth.registerSub')}</p>

          <div className="mt-8 space-y-3">
            <button
              onClick={() => register()}
              className="btn btn-primary w-full rounded-full h-12 gap-2"
              disabled={loading}
            >
              <UserPlus className="h-4 w-4" />
              {t('nav.register')}
            </button>

            <div className="my-2 flex items-center gap-3 text-xs text-base-content/50">
              <div className="flex-1 h-px bg-base-300" />
              {t('auth.or')}
              <div className="flex-1 h-px bg-base-300" />
            </div>

            <button
              onClick={() => loginWithGoogle()}
              className="btn btn-outline w-full rounded-full h-12 gap-2"
              disabled={loading}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {t('auth.loginWithGoogle')}
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-base-content/70">
            {t('auth.hasAccount')}{' '}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              {t('nav.login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
