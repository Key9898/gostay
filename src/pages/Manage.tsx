import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMemo, useState } from 'react'
import {
  Home,
  Users,
  FileText,
  Wrench,
  TrendingUp,
  Plus,
  Check,
  Clock,
  AlertCircle,
  MoreHorizontal,
  Building2,
  DollarSign,
  Calendar,
} from 'lucide-react'
import { cn, formatPrice, type Currency } from '@utils'
import { useTenants, useInvoices, useMaintenance } from '@hooks'
import type { Tenant, Invoice, MaintenanceRequest } from '@hooks/useManage'

const CHART_BARS = [40, 55, 48, 62, 70, 85]
const CHART_LEVELS = [0, 1, 2, 3, 4]

const UPCOMING: { label: string; date: string; icon: React.ElementType }[] = [
  { label: 'Rent due: Thonglor 5', date: 'Feb 1', icon: Calendar },
  { label: 'Inspection: 38th St 2A', date: 'Feb 3', icon: Building2 },
  { label: 'Contract renewal: Unit 1B', date: 'Feb 10', icon: FileText },
]

function formatCurrency(amount: number, currency: string): string {
  return formatPrice(amount, currency as Currency)
}

function formatMonth(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en', { month: 'short', year: 'numeric' })
  } catch {
    return iso
  }
}

function invoiceStatus(inv: Invoice): 'paid' | 'due' | 'overdue' {
  if (inv.status === 'paid') return 'paid'
  if (inv.status === 'overdue') return 'overdue'
  return 'due'
}

export default function Manage() {
  const { t } = useTranslation()
  const [tab, setTab] = useState<'overview' | 'tenants' | 'invoices' | 'maintenance'>('overview')

  const { tenants, loading: tenantsLoading, error: tenantsError } = useTenants()
  const { invoices, loading: invoicesLoading, error: invoicesError } = useInvoices()
  const { requests: maintenance, loading: maintLoading, error: maintError } = useMaintenance()

  const tabs = [
    { k: 'overview' as const, label: t('manage.tabs.overview'), icon: Home },
    { k: 'tenants' as const, label: t('manage.tabs.tenants'), icon: Users },
    { k: 'invoices' as const, label: t('manage.tabs.invoices'), icon: FileText },
    { k: 'maintenance' as const, label: t('manage.tabs.maintenance'), icon: Wrench },
  ]

  const kpis = useMemo(() => {
    const activeTenants = tenants.filter((t) => t.status === 'active').length
    const openRequests = maintenance.filter(
      (m) => m.status === 'open' || m.status === 'in_progress'
    ).length
    const highPriority = maintenance.filter(
      (m) => m.priority === 'high' && m.status !== 'resolved'
    ).length
    const revenueByCurrency = invoices
      .filter((i) => i.status === 'paid')
      .reduce<Record<string, number>>((acc, inv) => {
        acc[inv.currency] = (acc[inv.currency] ?? 0) + inv.amount
        return acc
      }, {})
    const revenueLabel =
      Object.entries(revenueByCurrency)
        .map(([cur, amt]) => formatCurrency(amt, cur))
        .join(' · ') || '—'
    const uniqueListings = new Set(tenants.map((t) => t.listingId)).size
    return { activeTenants, openRequests, highPriority, revenueLabel, uniqueListings }
  }, [tenants, invoices, maintenance])

  return (
    <div>
      <div className="paper border-b border-base-300">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">{t('manage.eyebrow')}</span>
              <h1 className="display mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                {t('manage.title')}
              </h1>
              <p className="mt-3 max-w-xl text-base-content/70">{t('manage.sub')}</p>
            </div>
            <button className="btn btn-primary rounded-full gap-2">
              <Plus className="h-4 w-4" aria-hidden="true" />
              {t('manage.addProperty')}
            </button>
          </div>

          {/* KPIs */}
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            <KPI
              icon={Building2}
              label={t('manage.kpi.properties')}
              value={String(kpis.uniqueListings)}
              delta={`${tenants.length} total leases`}
            />
            <KPI
              icon={Users}
              label={t('manage.kpi.tenants')}
              value={String(kpis.activeTenants)}
              delta={`${tenants.length - kpis.activeTenants} ended`}
            />
            <KPI
              icon={DollarSign}
              label={t('manage.kpi.revenue')}
              value={kpis.revenueLabel}
              delta="Paid invoices"
            />
            <KPI
              icon={Wrench}
              label={t('manage.kpi.openRequests')}
              value={String(kpis.openRequests)}
              delta={`${kpis.highPriority} high priority`}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-2 border-b border-base-300" role="tablist">
          {tabs.map((tb) => (
            <button
              key={tb.k}
              onClick={() => setTab(tb.k)}
              role="tab"
              aria-selected={tab === tb.k}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-semibold transition',
                tab === tb.k
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-base-content/60 hover:text-base-content'
              )}
            >
              <tb.icon className="h-4 w-4" aria-hidden="true" />
              {tb.label}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 warm-card p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-semibold">{t('manage.chart.title')}</h2>
                <button className="text-sm text-base-content/60 hover:text-primary">
                  Last 6 months
                </button>
              </div>
              <div className="mt-6">
                <svg viewBox="0 0 380 185" className="w-full" aria-hidden="true">
                  {CHART_LEVELS.map((level) => {
                    const y = 150 - (level / 4) * 140
                    const label = level === 0 ? '0' : `${level}M`
                    return (
                      <g key={level}>
                        <line x1="36" y1={y} x2="376" y2={y} stroke="#E8DDC9" strokeWidth="1" />
                        <text x="30" y={y + 4} textAnchor="end" fontSize="10" fill="#5C5149">
                          {label}
                        </text>
                      </g>
                    )
                  })}
                  {CHART_BARS.map((h, i) => {
                    const barW = 44
                    const gap = 14
                    const x = 36 + i * (barW + gap)
                    const barH = (h / 100) * 140
                    const y = 150 - barH
                    return (
                      <g key={i}>
                        <rect x={x} y={y} width={barW} height={barH} rx="6" ry="6" fill="#C2573A" />
                        <text
                          x={x + barW / 2}
                          y="170"
                          textAnchor="middle"
                          fontSize="11"
                          fill="#1F1A1780"
                        >
                          M{i + 1}
                        </text>
                      </g>
                    )
                  })}
                </svg>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-secondary">
                <TrendingUp className="h-4 w-4" aria-hidden="true" /> <span>Up 18% from Q3</span>
              </div>
            </div>

            <div className="warm-card p-6">
              <h2 className="font-serif text-xl font-semibold">{t('manage.upcoming.title')}</h2>
              <ul className="mt-4 space-y-3">
                {UPCOMING.map((u) => (
                  <li key={u.label} className="flex items-start gap-3 rounded-xl bg-base-200 p-3">
                    <u.icon className="h-4 w-4 mt-0.5 text-primary" aria-hidden="true" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{u.label}</p>
                      <p className="text-xs text-base-content/60">{u.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {tab === 'tenants' && (
          <TenantsTable tenants={tenants} loading={tenantsLoading} error={tenantsError} />
        )}

        {tab === 'invoices' && (
          <InvoicesGrid invoices={invoices} loading={invoicesLoading} error={invoicesError} />
        )}

        {tab === 'maintenance' && (
          <MaintenanceList items={maintenance} loading={maintLoading} error={maintError} />
        )}
      </div>
    </div>
  )
}

function ErrorBox({ message }: { message: string }) {
  return (
    <div className="rounded-xl bg-error/10 p-4 text-sm text-error ring-1 ring-error/30">
      {message}
    </div>
  )
}

function EmptyState({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Home
  title: string
  body: string
}) {
  return (
    <div className="warm-card flex flex-col items-center justify-center gap-2 p-8 text-center md:p-12">
      <Icon className="h-8 w-8 text-base-content/40" aria-hidden="true" />
      <p className="display text-xl text-base-content/60">{title}</p>
      <p className="text-sm text-base-content/50">{body}</p>
    </div>
  )
}

function TenantsTable({
  tenants,
  loading,
  error,
}: {
  tenants: Tenant[]
  loading: boolean
  error: Error | null
}) {
  const { t } = useTranslation()
  if (error) return <ErrorBox message={error.message} />
  if (loading) {
    return (
      <div className="warm-card space-y-3 p-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-12 animate-pulse rounded bg-base-200" />
        ))}
      </div>
    )
  }
  if (tenants.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No tenants yet"
        body="Add a tenant to start tracking leases."
      />
    )
  }
  return (
    <div className="warm-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-base-200 text-left text-xs uppercase tracking-wider text-base-content/60">
            <tr>
              <th className="px-5 py-3 font-semibold">{t('manage.table.tenant')}</th>
              <th className="px-5 py-3 font-semibold">{t('manage.table.unit')}</th>
              <th className="px-5 py-3 font-semibold">{t('manage.table.rent')}</th>
              <th className="px-5 py-3 font-semibold">{t('manage.table.status')}</th>
              <th className="px-5 py-3 font-semibold">{t('manage.table.since')}</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300">
            {tenants.map((tenant) => (
              <tr key={tenant.id || tenant._id} className="hover:bg-base-200/50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-content text-xs font-semibold">
                      {tenant.name.charAt(0)}
                    </div>
                    <span className="font-semibold">{tenant.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-base-content/70">{tenant.listingId}</td>
                <td className="px-5 py-4 font-semibold">
                  {formatCurrency(tenant.rent, tenant.currency)}
                </td>
                <td className="px-5 py-4">
                  <StatusPill
                    status={tenant.status === 'active' ? 'paid' : 'resolved'}
                    label={tenant.status === 'active' ? 'Active' : 'Ended'}
                  />
                </td>
                <td className="px-5 py-4 text-base-content/60">{formatMonth(tenant.leaseStart)}</td>
                <td className="px-5 py-4 text-right">
                  <button className="btn btn-ghost btn-sm btn-square" aria-label="More actions">
                    <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function InvoicesGrid({
  invoices,
  loading,
  error,
}: {
  invoices: Invoice[]
  loading: boolean
  error: Error | null
}) {
  if (error) return <ErrorBox message={error.message} />
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="warm-card h-40 animate-pulse bg-base-200" />
        ))}
      </div>
    )
  }
  if (invoices.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No invoices yet"
        body="Invoices will appear here when you bill tenants."
      />
    )
  }
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {invoices.map((inv, i) => (
        <div key={inv.id || inv._id} className="warm-card p-6">
          <div className="flex items-center justify-between">
            <span className="eyebrow">Invoice #{1000 + i + 1}</span>
            <StatusPill status={invoiceStatus(inv)} />
          </div>
          <h3 className="mt-2 font-serif text-xl font-semibold">
            {inv.note || `Due ${formatMonth(inv.dueDate)}`}
          </h3>
          <p className="mt-1 text-sm text-base-content/60">Due {formatMonth(inv.dueDate)}</p>
          <div className="mt-4 flex items-end justify-between border-t border-base-300/70 pt-4">
            <p className="display text-2xl text-primary">
              {formatCurrency(inv.amount, inv.currency)}
            </p>
            <button className="btn btn-outline btn-sm rounded-full">Send reminder</button>
          </div>
        </div>
      ))}
    </div>
  )
}

function MaintenanceList({
  items,
  loading,
  error,
}: {
  items: MaintenanceRequest[]
  loading: boolean
  error: Error | null
}) {
  if (error) return <ErrorBox message={error.message} />
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="warm-card h-20 animate-pulse bg-base-200" />
        ))}
      </div>
    )
  }
  if (items.length === 0) {
    return (
      <EmptyState
        icon={Wrench}
        title="No maintenance requests"
        body="All clear! Open requests will show up here."
      />
    )
  }
  return (
    <div className="space-y-3">
      {items.map((m) => (
        <div key={m.id || m._id} className="warm-card p-5 flex items-start gap-4">
          <div
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
              m.priority === 'high'
                ? 'bg-error/15 text-error'
                : m.priority === 'medium'
                  ? 'bg-accent/20 text-secondary'
                  : 'bg-base-200 text-base-content/60'
            )}
          >
            <Wrench className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold">{m.title}</p>
              <StatusPill status={m.status === 'in_progress' ? 'in-progress' : m.status} />
            </div>
            <p className="mt-1 text-sm text-base-content/60 line-clamp-2">{m.description}</p>
          </div>
          <button className="btn btn-ghost btn-sm">Open</button>
        </div>
      ))}
    </div>
  )
}

function KPI({
  icon: Icon,
  label,
  value,
  delta,
}: {
  icon: typeof Home
  label: string
  value: string
  delta: string
}) {
  return (
    <div className="rounded-2xl bg-base-100 p-5 ring-1 ring-base-300">
      <div className="flex items-center gap-2 text-base-content/60">
        <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
        <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <p className="display mt-3 text-3xl">{value}</p>
      <p className="mt-1 text-xs text-secondary">{delta}</p>
    </div>
  )
}

const STATUS_MAP: Record<string, { label: string; cls: string; Icon: typeof Check }> = {
  paid: { label: 'Paid', cls: 'bg-success/15 text-success', Icon: Check },
  due: { label: 'Due', cls: 'bg-accent/25 text-secondary', Icon: Clock },
  pending: { label: 'Pending', cls: 'bg-accent/25 text-secondary', Icon: Clock },
  overdue: { label: 'Overdue', cls: 'bg-error/15 text-error', Icon: AlertCircle },
  cancelled: { label: 'Cancelled', cls: 'bg-base-200 text-base-content/60', Icon: AlertCircle },
  open: { label: 'Open', cls: 'bg-error/15 text-error', Icon: AlertCircle },
  'in-progress': { label: 'In progress', cls: 'bg-accent/25 text-secondary', Icon: Clock },
  resolved: { label: 'Resolved', cls: 'bg-success/15 text-success', Icon: Check },
}

function StatusPill({ status, label }: { status: string; label?: string }) {
  const s = STATUS_MAP[status] ?? STATUS_MAP.paid
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        s.cls
      )}
    >
      <s.Icon className="h-3 w-3" aria-hidden="true" />
      {label ?? s.label}
    </span>
  )
}
