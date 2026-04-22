import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock, User } from 'lucide-react'

const registerSchema = z.object({
  displayName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Min 6 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, { message: "Passwords don't match", path: ['confirmPassword'] })

type RegisterFormData = z.infer<typeof registerSchema>

export default function Register() {
  const { t } = useTranslation()
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1527576539890-dfa815648363?w=1200&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-secondary/70" />
        <div className="relative z-10 flex h-full flex-col justify-end p-14 text-primary-content">
          <span className="eyebrow text-accent">Join GoStay</span>
          <h2 className="display mt-3 text-5xl leading-tight">Home finds, <em className="not-italic text-accent">kitchen tables,</em> good people.</h2>
          <p className="mt-4 max-w-md text-primary-content/85">Create an account to save listings, chat with hosts, and start managing your rentals — free.</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-14 bg-base-100">
        <div className="w-full max-w-md">
          <span className="eyebrow">GoStay</span>
          <h1 className="display mt-2 text-4xl">{t('auth.registerTitle')}</h1>
          <p className="mt-2 text-base-content/70">{t('auth.registerSub')}</p>

          <form onSubmit={handleSubmit((d) => console.log(d))} className="mt-8 space-y-4">
            <FormField label={t('auth.displayName')} icon={User} error={errors.displayName?.message}>
              <input type="text" {...register('displayName')} placeholder="John Doe" className="flex-1 bg-transparent text-sm outline-none" />
            </FormField>
            <FormField label={t('auth.email')} icon={Mail} error={errors.email?.message}>
              <input type="email" {...register('email')} placeholder="you@email.com" className="flex-1 bg-transparent text-sm outline-none" />
            </FormField>
            <FormField label={t('auth.password')} icon={Lock} error={errors.password?.message}>
              <input type="password" {...register('password')} placeholder="••••••••" className="flex-1 bg-transparent text-sm outline-none" />
            </FormField>
            <FormField label={t('auth.confirmPassword')} icon={Lock} error={errors.confirmPassword?.message}>
              <input type="password" {...register('confirmPassword')} placeholder="••••••••" className="flex-1 bg-transparent text-sm outline-none" />
            </FormField>

            <button type="submit" className="btn btn-primary w-full rounded-full h-12 mt-2">{t('nav.register')}</button>
          </form>

          <p className="mt-6 text-center text-sm text-base-content/70">
            {t('auth.hasAccount')} <Link to="/login" className="font-semibold text-primary hover:underline">{t('nav.login')}</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function FormField({ label, icon: Icon, error, children }: { label: string; icon: typeof Mail; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold">{label}</label>
      <div className="flex items-center gap-3 rounded-xl bg-base-200 px-4 py-3 ring-1 ring-base-300 focus-within:ring-primary">
        <Icon className="h-4 w-4 text-base-content/50" />
        {children}
      </div>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  )
}
