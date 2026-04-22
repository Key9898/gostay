import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock } from 'lucide-react'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
type LoginFormData = z.infer<typeof loginSchema>

export default function Login() {
  const { t } = useTranslation()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2">
      {/* Left — editorial imagery */}
      <div className="relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/70 to-primary/40" />
        <div className="relative z-10 flex h-full flex-col justify-end p-14 text-secondary-content">
          <span className="eyebrow text-accent">Welcome back</span>
          <h2 className="display mt-3 text-5xl leading-tight text-secondary-content">
            Your home, <em className="not-italic text-accent">our neighborhood.</em>
          </h2>
          <p className="mt-4 max-w-md text-secondary-content/85">
            Sign in to pick up where you left off — your saved listings, messages, and roommate matches.
          </p>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center p-6 lg:p-14 bg-base-100">
        <div className="w-full max-w-md">
          <span className="eyebrow">GoStay</span>
          <h1 className="display mt-2 text-4xl">{t('auth.loginTitle')}</h1>
          <p className="mt-2 text-base-content/70">{t('auth.loginSub')}</p>

          <form onSubmit={handleSubmit((d) => console.log(d))} className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-semibold">{t('auth.email')}</label>
              <div className="flex items-center gap-3 rounded-xl bg-base-200 px-4 py-3 ring-1 ring-base-300 focus-within:ring-primary">
                <Mail className="h-4 w-4 text-base-content/50" />
                <input
                  type="email"
                  {...register('email')}
                  placeholder="you@email.com"
                  className="flex-1 bg-transparent text-sm outline-none"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-sm font-semibold">{t('auth.password')}</label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">{t('auth.forgotPassword')}</Link>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-base-200 px-4 py-3 ring-1 ring-base-300 focus-within:ring-primary">
                <Lock className="h-4 w-4 text-base-content/50" />
                <input
                  type="password"
                  {...register('password')}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent text-sm outline-none"
                />
              </div>
              {errors.password && <p className="mt-1 text-xs text-error">{errors.password.message}</p>}
            </div>

            <button type="submit" className="btn btn-primary w-full rounded-full h-12">{t('nav.login')}</button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-base-content/50">
            <div className="flex-1 h-px bg-base-300" />
            {t('auth.or')}
            <div className="flex-1 h-px bg-base-300" />
          </div>

          <button className="btn btn-outline w-full rounded-full h-12 gap-2">
            <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            {t('auth.loginWithGoogle')}
          </button>

          <p className="mt-6 text-center text-sm text-base-content/70">
            {t('auth.noAccount')} <Link to="/register" className="font-semibold text-primary hover:underline">{t('nav.register')}</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
