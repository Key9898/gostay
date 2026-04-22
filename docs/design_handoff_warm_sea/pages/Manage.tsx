import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import {
  Home, Users, FileText, Wrench, TrendingUp, Plus, Check, Clock, AlertCircle, MoreHorizontal,
  Building2, DollarSign, Calendar
} from 'lucide-react'
import { cn } from '@utils'

const tenants = [
  { id: 1, name: 'Ei Mon', unit: '38th St · Unit 2A', rent: '480,000 Ks', status: 'paid', since: 'Jan 2024' },
  { id: 2, name: 'Somchai T.', unit: 'Thonglor · Studio 5', rent: '฿18,500', status: 'due', since: 'Mar 2024' },
  { id: 3, name: 'Zar Ni', unit: 'Mandalay · Unit 1B', rent: '320,000 Ks', status: 'paid', since: 'Jun 2024' },
  { id: 4, name: 'Nok P.', unit: 'Chiang Mai · Room 3', rent: '฿12,000', status: 'overdue', since: 'Aug 2024' },
]

const maintenance = [
  { id: 1, title: 'Leaking kitchen faucet', unit: '38th St · 2A', priority: 'high', status: 'open', time: '2h ago' },
  { id: 2, title: 'AC not cooling', unit: 'Thonglor · 5', priority: 'medium', status: 'in-progress', time: '1d ago' },
  { id: 3, title: 'Wifi intermittent', unit: 'Mandalay · 1B', priority: 'low', status: 'resolved', time: '3d ago' },
]

export default function Manage() {
  const { t } = useTranslation()
  const [tab, setTab] = useState<'overview' | 'tenants' | 'invoices' | 'maintenance'>('overview')

  const tabs = [
    { k: 'overview' as const, label: t('manage.tabs.overview'), icon: Home },
    { k: 'tenants' as const, label: t('manage.tabs.tenants'), icon: Users },
    { k: 'invoices' as const, label: t('manage.tabs.invoices'), icon: FileText },
    { k: 'maintenance' as const, label: t('manage.tabs.maintenance'), icon: Wrench },
  ]

  return (
    <div>
      <div className="paper border-b border-base-300">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">{t('manage.eyebrow')}</span>
              <h1 className="display mt-2 text-5xl">{t('manage.title')}</h1>
              <p className="mt-3 max-w-xl text-base-content/70">{t('manage.sub')}</p>
            </div>
            <button className="btn btn-primary rounded-full gap-2"><Plus className="h-4 w-4" />{t('manage.addProperty')}</button>
          </div>

          {/* KPIs */}
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            <KPI icon={Building2} label={t('manage.kpi.properties')} value="8" delta="+1 this month" />
            <KPI icon={Users} label={t('manage.kpi.tenants')} value="12" delta="94% occupancy" />
            <KPI icon={DollarSign} label={t('manage.kpi.revenue')} value="4.2M Ks" delta="+12% vs last mo" />
            <KPI icon={Wrench} label={t('manage.kpi.openRequests')} value="3" delta="1 high priority" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-2 border-b border-base-300">
          {tabs.map((tb) => (
            <button key={tb.k} onClick={() => setTab(tb.k)} className={cn(
              'flex items-center gap-2 px-4 py-3 text-sm font-semibold transition',
              tab === tb.k ? 'border-b-2 border-primary text-primary' : 'text-base-content/60 hover:text-base-content'
            )}>
              <tb.icon className="h-4 w-4" />{tb.label}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Revenue chart placeholder */}
            <div className="lg:col-span-2 warm-card p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-semibold">{t('manage.chart.title')}</h2>
                <button className="text-sm text-base-content/60 hover:text-primary">Last 6 months</button>
              </div>
              <div className="mt-6 flex h-56 items-end gap-3">
                {[40, 55, 48, 70, 62, 85].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full rounded-t-xl bg-primary/80 transition hover:bg-primary" style={{ height: `${h}%` }} />
                    <span className="text-xs text-base-content/60">M{i + 1}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-secondary">
                <TrendingUp className="h-4 w-4" /> <span>Up 18% from Q3</span>
              </div>
            </div>

            {/* Upcoming */}
            <div className="warm-card p-6">
              <h2 className="font-serif text-xl font-semibold">{t('manage.upcoming.title')}</h2>
              <ul className="mt-4 space-y-3">
                {[
                  { t: 'Rent due: Thonglor 5', d: 'Feb 1', icon: Calendar },
                  { t: 'Inspection: 38th St 2A', d: 'Feb 3', icon: Building2 },
                  { t: 'Contract renewal: Unit 1B', d: 'Feb 10', icon: FileText },
                ].map((u) => (
                  <li key={u.t} className="flex items-start gap-3 rounded-xl bg-base-200 p-3">
                    <u.icon className="h-4 w-4 mt-0.5 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{u.t}</p>
                      <p className="text-xs text-base-content/60">{u.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {tab === 'tenants' && (
          <div className="warm-card overflow-hidden">
            <table className="w-full text-sm">
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
                {tenants.map((t) => (
                  <tr key={t.id} className="hover:bg-base-200/50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-content text-xs font-semibold">
                          {t.name.charAt(0)}
                        </div>
                        <span className="font-semibold">{t.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-base-content/70">{t.unit}</td>
                    <td className="px-5 py-4 font-semibold">{t.rent}</td>
                    <td className="px-5 py-4"><StatusPill status={t.status} /></td>
                    <td className="px-5 py-4 text-base-content/60">{t.since}</td>
                    <td className="px-5 py-4 text-right">
                      <button className="btn btn-ghost btn-sm btn-square"><MoreHorizontal className="h-4 w-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'invoices' && (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="warm-card p-6">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">Invoice #{1000 + i}</span>
                  <StatusPill status={i === 1 ? 'paid' : i === 2 ? 'due' : i === 3 ? 'overdue' : 'paid'} />
                </div>
                <h3 className="mt-2 font-serif text-xl font-semibold">Unit {i}A — Jan 2025</h3>
                <p className="mt-1 text-sm text-base-content/60">Rent + utilities</p>
                <div className="mt-4 flex items-end justify-between border-t border-base-300/70 pt-4">
                  <p className="display text-2xl text-primary">{i % 2 ? '480,000 Ks' : '฿18,500'}</p>
                  <button className="btn btn-outline btn-sm rounded-full">Send reminder</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'maintenance' && (
          <div className="space-y-3">
            {maintenance.map((m) => (
              <div key={m.id} className="warm-card p-5 flex items-start gap-4">
                <div className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                  m.priority === 'high' ? 'bg-error/15 text-error' : m.priority === 'medium' ? 'bg-accent/20 text-secondary' : 'bg-base-200 text-base-content/60'
                )}>
                  <Wrench className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{m.title}</p>
                    <StatusPill status={m.status} />
                  </div>
                  <p className="mt-1 text-sm text-base-content/60">{m.unit} · {m.time}</p>
                </div>
                <button className="btn btn-ghost btn-sm">Open</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function KPI({ icon: Icon, label, value, delta }: { icon: typeof Home; label: string; value: string; delta: string }) {
  return (
    <div className="rounded-2xl bg-base-100 p-5 ring-1 ring-base-300">
      <div className="flex items-center gap-2 text-base-content/60">
        <Icon className="h-4 w-4 text-primary" />
        <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <p className="display mt-3 text-3xl">{value}</p>
      <p className="mt-1 text-xs text-secondary">{delta}</p>
    </div>
  )
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string; Icon: typeof Check }> = {
    paid: { label: 'Paid', cls: 'bg-success/15 text-success', Icon: Check },
    due: { label: 'Due', cls: 'bg-accent/25 text-secondary', Icon: Clock },
    overdue: { label: 'Overdue', cls: 'bg-error/15 text-error', Icon: AlertCircle },
    open: { label: 'Open', cls: 'bg-error/15 text-error', Icon: AlertCircle },
    'in-progress': { label: 'In progress', cls: 'bg-accent/25 text-secondary', Icon: Clock },
    resolved: { label: 'Resolved', cls: 'bg-success/15 text-success', Icon: Check },
  }
  const s = map[status] ?? map.paid
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold', s.cls)}>
      <s.Icon className="h-3 w-3" />{s.label}
    </span>
  )
}
