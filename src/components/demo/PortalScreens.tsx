import { useMemo, useState, type PointerEvent, type ReactNode } from 'react'
import { motion } from '../../lib/motion'
import { PortalBalanceCard } from '../portal/PortalUI'

/**
 * Three pages of the Merchant Portal for the homepage's product tour, under
 * its Portal menu: the Dashboard, Transactions, and the monthly income from
 * Reports & analytics. Each is laid out from the portal's Figma ("Ezeebit –
 * The Ezee Way", page "Merchant Portal Designs", sections Dashboard,
 * Transaction, and Reports), without the portal's navigation, and each has
 * one thing to try: a range on the dashboard's chart, a channel or a search
 * on the transactions, and a month, or a day on the chart, in the income.
 *
 * The three share one set of figures, so the dashboard's last 7 and 30 days
 * add up to the same days in the income. Every figure, store, and order is
 * illustrative. `compact` lays a page out for a phone.
 */

const T = {
  text: '#172b4d',
  subtle: '#44546f',
  subtlest: '#626f86',
  heading: '#181d27',
  line: '#eef0f3',
  input: '#e5e7eb',
  primary: '#0074e3',
  green: '#216e4e',
  greenBg: '#dcfff1',
  grid: '#f1f2f4',
}

const RATE = 18.42 // ZAR per USDT, the same placeholder as the other demos
const AVERAGE_SALE = 412.3 // ZAR, to turn income into a transaction count

type Channel = 'epos' | 'online' | 'qr'
const CHANNELS: { key: Channel; label: string; colour: string }[] = [
  { key: 'epos', label: 'ePOS', colour: '#0074e3' },
  { key: 'online', label: 'Online', colour: '#1f9d6b' },
  { key: 'qr', label: 'In-store QR', colour: '#e8772e' },
]

// ---------------------------------------------------------------- figures

/** A small seeded generator, so the figures are the same on every visit. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Busier towards the weekend, as a shop is. */
const weekly = (day: number) => [0.82, 0.86, 0.9, 0.97, 1.12, 1.28, 1.05][day % 7]

const LAST_MONTH_DAYS = 31
const THIS_MONTH_DAYS = 18 // the month so far

const daily = (days: number, base: number, seed: number) => {
  const r = seeded(seed)
  return Array.from({ length: days }, (_, i) => Math.round((base * weekly(i + 2) + 6500 * r()) * 100) / 100)
}

const LAST_MONTH = daily(LAST_MONTH_DAYS, 36_500, 7)
const THIS_MONTH = daily(THIS_MONTH_DAYS, 40_200, 11)

/** Each channel's share of the takings, with a little day-to-day give. */
const SHARE: Record<Channel, number> = { epos: 0.46, online: 0.37, qr: 0.17 }
const split = (amount: number, seed: number): Record<Channel, number> => {
  const r = seeded(seed)
  const epos = SHARE.epos + (r() - 0.5) * 0.08
  const online = SHARE.online + (r() - 0.5) * 0.08
  return { epos: amount * epos, online: amount * online, qr: amount * (1 - epos - online) }
}

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0)

/** Like for like: the month so far against the same days of the month before. */
const GROWTH = (sum(THIS_MONTH) / sum(LAST_MONTH.slice(0, THIS_MONTH_DAYS)) - 1) * 100

/** The stores that took the most, and their share of a month. */
const TOP_STORES: { name: string; share: number }[] = [
  { name: 'Bree Street', share: 0.31 },
  { name: 'Online store', share: 0.27 },
  { name: 'Sea Point', share: 0.19 },
]
const zar = (n: number, cents = true) => `R ${n.toLocaleString('en-US', { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 })}`
const short = (n: number) => (n >= 1_000_000 ? `R ${(n / 1_000_000).toFixed(2)}M` : n >= 1000 ? `R ${Math.round(n / 1000)}K` : `R ${Math.round(n)}`)
const usdt = (n: number) => `${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT`
const count = (n: number) => Math.round(n).toLocaleString('en-US')
const pct = (n: number) => `${n >= 0 ? '+' : ''}${n.toFixed(1)}%`

// ---------------------------------------------------------------- pieces

const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-[12px] bg-white ${className}`}>{children}</div>
)

const PageHead = ({ title, sub, children, compact }: { title: string; sub: string; children?: ReactNode; compact?: boolean }) =>
  compact ? (
    <div className="flex items-end justify-between gap-3 px-1">
      <div>
        <p className="font-display text-[20px] font-bold leading-tight" style={{ color: T.heading }}>{title}</p>
        <p className="text-[11px]" style={{ color: T.subtle }}>{sub}</p>
      </div>
      {children}
    </div>
  ) : (
    <Card className="flex items-center justify-between gap-4 px-6 py-3">
      <div>
        <p className="font-display text-[20px] font-bold leading-tight" style={{ color: T.heading }}>{title}</p>
        <p className="mt-0.5 text-[12px]" style={{ color: T.subtle }}>{sub}</p>
      </div>
      {children}
    </Card>
  )

/** A row of options with one chosen, as the portal's range and currency switches are. */
function Segmented<K extends string>({ options, value, onChange, label, small }: { options: { key: K; label: string }[]; value: K; onChange: (k: K) => void; label: string; small?: boolean }) {
  return (
    <div role="group" aria-label={label} className="flex rounded-full bg-white p-0.5 ring-1 ring-[#e5e7eb]">
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          aria-pressed={value === o.key}
          onClick={() => onChange(o.key)}
          className={`rounded-full ${small ? 'px-2.5 text-[11px]' : 'px-3 text-[12px]'} py-1 font-semibold transition-colors ${value === o.key ? 'bg-[#0074e3] text-white' : 'hover:bg-[#f5f9ff]'}`}
          style={value === o.key ? undefined : { color: T.subtle }}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

const ChangeChip = ({ value }: { value: number }) => (
  <span className="rounded-[4px] px-1.5 py-0.5 text-[10px] font-semibold" style={{ background: T.greenBg, color: T.green }}>{pct(value)}</span>
)

const Stat = ({ label, value, note }: { label: string; value: ReactNode; note?: ReactNode }) => (
  <div className="rounded-[12px] border border-[rgba(199,196,216,0.35)] bg-white px-4 py-3">
    <p className="text-[11px]" style={{ color: T.subtlest }}>{label}</p>
    <p className="mt-0.5 text-[17px] font-bold tabular-nums leading-tight" style={{ color: T.heading }}>{value}</p>
    {note && <div className="mt-1 text-[10px]" style={{ color: T.subtlest }}>{note}</div>}
  </div>
)

const Legend = () => (
  <span className="flex items-center gap-3">
    {CHANNELS.map((c) => (
      <span key={c.key} className="flex items-center gap-1 text-[10px] font-medium" style={{ color: c.colour }}>
        <span className="h-[2px] w-2.5 rounded" style={{ background: c.colour }} />
        {c.label}
      </span>
    ))}
  </span>
)

// ---------------------------------------------------------------- dashboard

type Range = 'today' | 'week' | 'month'
const RANGES: { key: Range; label: string }[] = [
  { key: 'today', label: 'Today' },
  { key: 'week', label: '7 Days' },
  { key: 'month', label: '30 Days' },
]

/** The last 30 days run from the end of last month through the month so far. */
const LAST_30 = [...LAST_MONTH.slice(-(30 - THIS_MONTH_DAYS)), ...THIS_MONTH]

/** Today, hour by hour: quiet overnight, busiest over lunch and after work. */
const HOURLY = (() => {
  const shape = [0, 0, 0, 0, 0, 0, 0.2, 0.5, 0.9, 1.1, 1.3, 1.6, 1.9, 1.7, 1.3, 1.2, 1.4, 1.8, 1.9, 1.5, 1, 0.6, 0.3, 0.1]
  const today = THIS_MONTH[THIS_MONTH.length - 1]
  const total = sum(shape)
  return shape.map((s) => (today * s) / total)
})()

/** Each channel's running total over the range, for the chart's lines. */
const running = (amounts: number[], seed: number) => {
  const totals: Record<Channel, number> = { epos: 0, online: 0, qr: 0 }
  return amounts.map((a, i) => {
    const parts = split(a, seed + i)
    for (const c of CHANNELS) totals[c.key] += parts[c.key]
    return { ...totals }
  })
}

const SERIES: Record<Range, { amounts: number[]; from: string; to: string }> = {
  today: { amounts: HOURLY, from: '12:00 AM', to: '11:59 PM' },
  week: { amounts: THIS_MONTH.slice(-7), from: '7 days ago', to: 'Today' },
  month: { amounts: LAST_30, from: '30 days ago', to: 'Today' },
}

function OverviewChart({ range, width, height }: { range: Range; width: number; height: number }) {
  const { amounts, from, to } = SERIES[range]
  const points = useMemo(() => running(amounts, range.length * 97), [amounts, range])
  const max = Math.max(...CHANNELS.map((c) => points[points.length - 1][c.key])) * 1.12
  const x = (i: number) => (i / (points.length - 1)) * width
  const y = (v: number) => height - (v / max) * height
  return (
    <div>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="block overflow-visible" aria-hidden="true">
        {points.map((_, i) => <line key={i} x1={x(i)} x2={x(i)} y1={0} y2={height} stroke={T.grid} />)}
        <line x1={0} x2={width} y1={height} y2={height} stroke="#dcdfe4" />
        {CHANNELS.map((c) => (
          <motion.path
            key={`${range}-${c.key}`}
            d={points.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p[c.key]).toFixed(1)}`).join(' ')}
            fill="none"
            stroke={c.colour}
            strokeWidth={1.75}
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </svg>
      <div className="mt-1.5 flex justify-between text-[10px]" style={{ color: T.subtlest }}>
        <span>{from}</span>
        <span>{to}</span>
      </div>
    </div>
  )
}

/** The Dashboard: the wallets, and the payments coming in by channel over a range you choose. */
export function PortalDashboard({ compact = false }: { compact?: boolean }) {
  const [range, setRange] = useState<Range>('today')
  const [currency, setCurrency] = useState<'zar' | 'usdt'>('zar')
  const volume = sum(SERIES[range].amounts)
  const total = 1_637_102.25

  const currencySwitch = (
    <Segmented
      label="Show balances in"
      options={[{ key: 'zar' as const, label: 'ZAR' }, { key: 'usdt' as const, label: 'USDT' }]}
      value={currency}
      onChange={setCurrency}
    />
  )

  const balance = (
    <Card className="overflow-hidden border border-[#eef0f3]">
      <PortalBalanceCard
        total={currency === 'zar' ? zar(total) : usdt(total / RATE)}
        fiatShare={43.65}
        fiat={{ mark: '/za-flag.svg', amount: 'R714,602.25', label: 'Fiat wallet' }}
        stable={{ amount: '50,000.00 USDT', label: 'USDT wallet' }}
      />
    </Card>
  )

  const overviewHead = (
    <div className="flex items-center justify-between gap-3">
      <p className={`${compact ? 'text-[13px]' : 'text-[15px]'} font-semibold whitespace-nowrap`} style={{ color: T.text }}>Payment overview</p>
      <Segmented label="Range" options={RANGES} value={range} onChange={setRange} small={compact} />
    </div>
  )

  const volumeLine = (
    <div className="flex items-end justify-between gap-3">
      <div>
        <p className="text-[11px]" style={{ color: T.subtlest }}>Payment volume (ZAR)</p>
        <p className="text-[18px] font-bold tabular-nums" style={{ color: T.heading }}>{zar(volume)}</p>
      </div>
      <Legend />
    </div>
  )

  if (compact)
    return (
      <div className="font-ui flex flex-col gap-3 bg-[#f8f9fb] p-4 [&_img]:!mx-0">
        <PageHead compact title="Dashboard" sub="Good morning, welcome back">{currencySwitch}</PageHead>
        {balance}
        <Card className="flex flex-col gap-3 p-4">
          {overviewHead}
          {volumeLine}
          <OverviewChart range={range} width={326} height={96} />
          <p className="text-[11px]" style={{ color: T.subtlest }}>
            <span className="font-semibold" style={{ color: T.text }}>≈ {usdt(volume / RATE)}</span> in crypto ·{' '}
            <span className="font-semibold" style={{ color: T.text }}>{count(volume / AVERAGE_SALE)}</span> transactions
          </p>
        </Card>
      </div>
    )

  return (
    <div className="font-ui flex flex-col gap-3 bg-[#f8f9fb] p-5 [&_img]:!mx-0">
      <PageHead title="Good morning" sub="Welcome to your Merchant Portal">{currencySwitch}</PageHead>
      {balance}
      <Card className="px-6 py-4">
        {overviewHead}
        <div className="mt-3 grid grid-cols-[minmax(0,1fr)_190px] gap-5">
          <div className="flex flex-col gap-3">
            {volumeLine}
            <OverviewChart range={range} width={526} height={100} />
          </div>
          <div className="flex flex-col gap-3">
            <Stat label="Crypto income" value={`≈ ${usdt(volume / RATE)}`} note="At today's rate" />
            <Stat label="Total transactions" value={count(volume / AVERAGE_SALE)} note={RANGES.find((r) => r.key === range)!.label} />
          </div>
        </div>
      </Card>
    </div>
  )
}

// ---------------------------------------------------------------- transactions

type Txn = { store: string; order: string; date: string; channel: Channel; zar: number; paid: string }

const PAID = [
  (z: number) => `${(z / RATE).toFixed(2)} USDT`,
  (z: number) => `${(z / RATE).toFixed(2)} USDC`,
  (z: number) => `${(z / 1_912_000).toFixed(6)} BTC`,
  (z: number) => `${(z / RATE).toFixed(2)} USDT`,
  (z: number) => `${(z / 61_800).toFixed(5)} ETH`,
]

const STORES: Record<Channel, string[]> = {
  epos: ['Bree Street', 'Sea Point', 'Rosebank'],
  online: ['Online store'],
  qr: ['Sea Point', 'Bree Street', 'Market stall'],
}

const TXNS: Txn[] = (() => {
  const r = seeded(23)
  const order: Channel[] = ['epos', 'online', 'epos', 'qr', 'online', 'epos', 'qr', 'online', 'epos', 'epos', 'online', 'qr', 'epos', 'online', 'qr', 'epos']
  let minutes = 14 * 60 + 52
  return order.map((channel, i) => {
    const amount = Math.round((60 + r() * (channel === 'online' ? 2400 : 900)) * 100) / 100
    minutes -= 7 + Math.floor(r() * 26)
    const day = minutes < 0 ? 'Yesterday' : 'Today'
    const m = (minutes + 1440) % 1440
    const stores = STORES[channel]
    return {
      store: stores[Math.floor(r() * stores.length)],
      order: String(11_121_096 - i * 37 - Math.floor(r() * 30)),
      date: `${day}, ${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`,
      channel,
      zar: amount,
      paid: PAID[i % PAID.length](amount),
    }
  })
})()

/** The month's totals behind the cards, by channel. */
const MONTH_BY_CHANNEL = (() => {
  const totals: Record<Channel, number> = { epos: 0, online: 0, qr: 0 }
  THIS_MONTH.forEach((a, i) => {
    const parts = split(a, 300 + i)
    for (const c of CHANNELS) totals[c.key] += parts[c.key]
  })
  return totals
})()
const SUCCESS: Record<Channel | 'all', number> = { all: 98.4, epos: 99.1, online: 97.6, qr: 98.2 }

const ChannelChip = ({ channel }: { channel: Channel }) => {
  const c = CHANNELS.find((x) => x.key === channel)!
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#f4f5f7] px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap" style={{ color: T.subtle }}>
      <span className="size-1.5 rounded-full" style={{ background: c.colour }} />
      {c.label}
    </span>
  )
}

/** Transactions: the history, filtered by channel or searched, with the month's totals for what is showing. */
export function PortalTransactions({ compact = false }: { compact?: boolean }) {
  const [channel, setChannel] = useState<Channel | 'all'>('all')
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const rows = TXNS.filter((t) => (channel === 'all' || t.channel === channel) && (!q || t.store.toLowerCase().includes(q) || t.order.includes(q)))
  const shown = rows.slice(0, 7)
  const volume = channel === 'all' ? sum(THIS_MONTH) : MONTH_BY_CHANNEL[channel]

  const tabs = [{ key: 'all' as const, label: compact ? 'All' : 'All transactions' }, ...CHANNELS.map((c) => ({ key: c.key, label: c.label }))]
  const tabBar = (
    <div role="group" aria-label="Channel" className={`flex ${compact ? 'gap-1.5' : 'gap-1 border-b'}`} style={compact ? undefined : { borderColor: T.line }}>
      {tabs.map((t) => {
        const on = channel === t.key
        return compact ? (
          <button
            key={t.key}
            type="button"
            aria-pressed={on}
            onClick={() => setChannel(t.key)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] font-semibold ${on ? 'bg-[#172b4d] text-white' : 'bg-white ring-1 ring-[#e5e7eb]'}`}
            style={on ? undefined : { color: T.subtle }}
          >
            {t.label}
          </button>
        ) : (
          <button
            key={t.key}
            type="button"
            aria-pressed={on}
            onClick={() => setChannel(t.key)}
            className={`relative -mb-px px-3 pb-2.5 pt-1 text-[13px] font-semibold transition-colors ${on ? '' : 'hover:text-[#172b4d]'}`}
            style={{ color: on ? T.text : T.subtlest }}
          >
            {t.label}
            {on && <motion.span layoutId="txn-tab" className="absolute inset-x-2 bottom-0 h-[2px] rounded-full bg-[#0074e3]" />}
          </button>
        )
      })}
    </div>
  )

  const search = (
    <label className={`flex items-center gap-2 rounded-[8px] bg-white px-3 ring-1 ring-[#e5e7eb] focus-within:ring-[#0074e3] ${compact ? 'h-9 w-full' : 'h-9 w-[230px]'}`}>
      <img src="/portal/magnifying-glass.svg" alt="" className="size-4 opacity-60" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search a store or order number"
        aria-label="Search transactions"
        className="min-w-0 flex-1 bg-transparent text-[12px] outline-none placeholder:text-[#8590a2]"
        style={{ color: T.text }}
      />
    </label>
  )

  const stats = (
    <div className={`grid gap-3 ${compact ? 'grid-cols-2' : 'grid-cols-3'}`}>
      <Stat label="Volume this month" value={short(volume)} note={<ChangeChip value={GROWTH} />} />
      <Stat label="Transactions" value={count(volume / AVERAGE_SALE)} note="This month" />
      {!compact && <Stat label="Success rate" value={`${SUCCESS[channel]}%`} note="Paid on the first attempt" />}
    </div>
  )

  const empty = (
    <p className="px-5 py-8 text-center text-[12px]" style={{ color: T.subtlest }}>
      No transactions match “{query}”.
    </p>
  )

  if (compact)
    return (
      <div className="font-ui flex flex-col gap-3 bg-[#f8f9fb] p-4 [&_img]:!mx-0">
        <PageHead compact title="Transactions" sub="Every payment, in one place" />
        {search}
        <div className="flex gap-1.5 overflow-hidden">{tabBar}</div>
        {stats}
        <Card className="py-1">
          {/* Held at seven rows, so filtering never changes the page's height */}
          <div style={{ height: 7 * 56 }}>
            {shown.length === 0 && empty}
            {shown.map((t) => (
              <div key={t.order} className="flex h-[56px] items-center gap-3 border-b px-4 last:border-b-0" style={{ borderColor: T.line }}>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium" style={{ color: T.text }}>{t.store}</p>
                  <p className="text-[11px]" style={{ color: T.subtlest }}>#{t.order} · {t.date}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="text-[13px] font-semibold tabular-nums" style={{ color: T.text }}>{zar(t.zar)}</p>
                  <ChannelChip channel={t.channel} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    )

  return (
    <div className="font-ui flex flex-col gap-4 bg-[#f8f9fb] p-5 [&_img]:!mx-0">
      <PageHead title="Transactions" sub="Track all your payments and transactions in one place">{search}</PageHead>
      <Card className="flex flex-col gap-4 px-6 pb-4 pt-4">
        {tabBar}
        {stats}
        <div className="rounded-[12px] border" style={{ borderColor: T.line }}>
          <div className="grid grid-cols-[1.1fr_0.9fr_1fr_0.9fr_1.1fr_0.9fr] gap-3 border-b px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.08em]" style={{ borderColor: T.line, color: T.subtlest }}>
            <span>Store</span>
            <span>Order number</span>
            <span>Date</span>
            <span className="text-right">Total sale</span>
            <span className="text-right">Paid in</span>
            <span className="text-right">Channel</span>
          </div>
          {/* Held at seven rows, so filtering never changes the page's height */}
          <div style={{ height: 7 * 36 }}>
            {shown.length === 0 && empty}
            {shown.map((t) => (
              <div key={t.order} className="grid h-[36px] grid-cols-[1.1fr_0.9fr_1fr_0.9fr_1.1fr_0.9fr] items-center gap-3 border-b px-4 text-[12px] last:border-b-0" style={{ borderColor: T.line, color: T.text }}>
                <span className="truncate font-medium">{t.store}</span>
                <span className="tabular-nums" style={{ color: T.subtle }}>{t.order}</span>
                <span style={{ color: T.subtle }}>{t.date}</span>
                <span className="text-right font-semibold tabular-nums">{zar(t.zar)}</span>
                <span className="text-right tabular-nums" style={{ color: T.subtle }}>{t.paid}</span>
                <span className="text-right"><ChannelChip channel={t.channel} /></span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[11px]" style={{ color: T.subtlest }}>
          Showing {shown.length} of {count(volume / AVERAGE_SALE)} this month
        </p>
      </Card>
    </div>
  )
}

// ---------------------------------------------------------------- monthly income

type Month = 'this' | 'last'

function IncomeChart({ days, width, height }: { days: number[]; width: number; height: number }) {
  const [hover, setHover] = useState<number | null>(null)
  const left = 40
  const plot = width - left
  const top = Math.ceil((Math.max(...days) * 1.15) / 20_000) * 20_000
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * top)
  const x = (i: number) => left + (LAST_MONTH_DAYS > 1 ? (i / (LAST_MONTH_DAYS - 1)) * plot : 0)
  const y = (v: number) => height - (v / top) * height
  const line = days.map((d, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(d).toFixed(1)}`).join(' ')
  const area = `${line} L${x(days.length - 1).toFixed(1)},${height} L${x(0)},${height} Z`
  const move = (e: PointerEvent<SVGSVGElement>) => {
    const box = e.currentTarget.getBoundingClientRect()
    // The page is scaled to fit its frame, so convert from screen pixels to the chart's own
    const px = ((e.clientX - box.left) / box.width) * width
    const i = Math.round(((px - left) / plot) * (LAST_MONTH_DAYS - 1))
    setHover(i >= 0 && i < days.length ? i : null)
  }
  const h = hover !== null ? { x: x(hover), y: y(days[hover]), v: days[hover] } : null

  return (
    <div className="relative">
      <svg
        width={width}
        height={height + 18}
        viewBox={`0 0 ${width} ${height + 18}`}
        className="block cursor-crosshair overflow-visible"
        onPointerMove={move}
        onPointerLeave={() => setHover(null)}
        role="img"
        aria-label={`Income per day, ${days.length} days, from ${zar(Math.min(...days), false)} to ${zar(Math.max(...days), false)}`}
      >
        <defs>
          <linearGradient id="income-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={T.primary} stopOpacity="0.18" />
            <stop offset="1" stopColor={T.primary} stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={left} x2={width} y1={y(t)} y2={y(t)} stroke={T.grid} strokeDasharray={t ? '3 3' : undefined} />
            <text x={left - 6} y={y(t) + 3} textAnchor="end" fontSize="9" fill={T.subtlest}>{short(t)}</text>
          </g>
        ))}
        {[1, 5, 10, 15, 20, 25, 30].map((d) => (
          <text key={d} x={x(d - 1)} y={height + 14} textAnchor="middle" fontSize="9" fill={T.subtlest}>{d}</text>
        ))}
        <motion.path key={`a-${days.length}`} d={area} fill="url(#income-fill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} />
        <motion.path
          key={`l-${days.length}`}
          d={line}
          fill="none"
          stroke={T.primary}
          strokeWidth={2}
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        {h && (
          <g>
            <line x1={h.x} x2={h.x} y1={0} y2={height} stroke={T.primary} strokeOpacity="0.35" />
            <circle cx={h.x} cy={h.y} r={4} fill="#fff" stroke={T.primary} strokeWidth={2} />
          </g>
        )}
      </svg>
      {h && hover !== null && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-[8px] bg-white px-2.5 py-1.5 text-[11px] shadow-[0_6px_18px_-6px_rgba(9,30,66,0.35)] ring-1 ring-[#eef0f3] whitespace-nowrap"
          style={{ left: Math.min(Math.max(h.x, left + 50), width - 50), top: h.y - 8 }}
        >
          <p style={{ color: T.subtlest }}>Day {hover + 1}</p>
          <p className="font-bold tabular-nums" style={{ color: T.heading }}>{zar(h.v)}</p>
          <p style={{ color: T.subtlest }}>{count(h.v / AVERAGE_SALE)} transactions</p>
        </div>
      )}
      {!h && <p className="absolute right-0 top-0 text-[10px]" style={{ color: T.subtlest }}>Point at a day</p>}
    </div>
  )
}

/** Reports: a month's income, by channel and by day, with how it compares to the month before. */
export function PortalIncome({ compact = false }: { compact?: boolean }) {
  const [month, setMonth] = useState<Month>('this')
  const days = month === 'this' ? THIS_MONTH : LAST_MONTH
  const total = sum(days)
  const byChannel = useMemo(() => {
    const totals: Record<Channel, number> = { epos: 0, online: 0, qr: 0 }
    days.forEach((a, i) => {
      const parts = split(a, (month === 'this' ? 300 : 600) + i)
      for (const c of CHANNELS) totals[c.key] += parts[c.key]
    })
    return totals
  }, [days, month])
  const best = days.indexOf(Math.max(...days))
  const transactions = total / AVERAGE_SALE

  const monthSwitch = (
    <Segmented
      label="Month"
      options={[{ key: 'this' as const, label: 'This month' }, { key: 'last' as const, label: 'Last month' }]}
      value={month}
      onChange={setMonth}
    />
  )

  const totalCard = (
    <Card className="flex flex-col gap-4 px-5 py-4">
      <div>
        <p className="text-[11px]" style={{ color: T.subtlest }}>{month === 'this' ? 'Income, month to date' : 'Income, last month'}</p>
        <div className="flex items-center gap-2">
          <p className="text-[22px] font-bold tabular-nums" style={{ color: T.heading }}>{zar(total)}</p>
          {month === 'this' && <ChangeChip value={GROWTH} />}
        </div>
        <p className="text-[10px]" style={{ color: T.subtlest }}>{month === 'this' ? `Day 1 to ${THIS_MONTH_DAYS}, against the same days last month` : `All ${LAST_MONTH_DAYS} days`}</p>
      </div>
      <div className="flex h-2 overflow-hidden rounded-full">
        {CHANNELS.map((c) => (
          <motion.span key={c.key} className="h-full" style={{ background: c.colour }} initial={false} animate={{ width: `${(byChannel[c.key] / total) * 100}%` }} transition={{ duration: 0.6 }} />
        ))}
      </div>
      <ul className="flex flex-col gap-2.5">
        {CHANNELS.map((c) => (
          <li key={c.key} className="flex items-center justify-between gap-3 text-[12px]">
            <span className="flex items-center gap-2" style={{ color: T.subtle }}>
              <span className="size-2 rounded-full" style={{ background: c.colour }} />
              {c.label}
            </span>
            <span className="tabular-nums">
              <span className="font-semibold" style={{ color: T.text }}>{zar(byChannel[c.key], false)}</span>
              <span className="ml-1.5 text-[10px]" style={{ color: T.subtlest }}>{Math.round((byChannel[c.key] / total) * 100)}%</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="border-t pt-3" style={{ borderColor: T.line }}>
          <p className="mb-2 text-[11px] font-semibold" style={{ color: T.subtlest }}>Top stores</p>
          <ol className="flex flex-col gap-2">
            {TOP_STORES.map((st, i) => (
              <li key={st.name} className="flex items-center justify-between gap-3 text-[12px]">
                <span className="flex items-center gap-2" style={{ color: T.subtle }}>
                  <span className="flex size-4 items-center justify-center rounded-full bg-[#f1f2f4] text-[9px] font-bold" style={{ color: T.subtle }}>{i + 1}</span>
                  {st.name}
                </span>
                <span className="font-semibold tabular-nums" style={{ color: T.text }}>{zar(total * st.share, false)}</span>
              </li>
            ))}
          </ol>
      </div>
    </Card>
  )

  const stats = (
    <div className={`grid gap-3 ${compact ? 'grid-cols-2' : 'grid-cols-3'}`}>
      <Stat label="Transactions" value={count(transactions)} />
      <Stat label="Average sale" value={zar(AVERAGE_SALE)} />
      {!compact && <Stat label="Best day" value={`Day ${best + 1}`} note={zar(days[best], false)} />}
    </div>
  )

  if (compact)
    return (
      <div className="font-ui flex flex-col gap-3 bg-[#f8f9fb] p-4 [&_img]:!mx-0">
        <PageHead compact title="Monthly income" sub="Reports & analytics" />
        <div className="self-start">{monthSwitch}</div>
        {totalCard}
        <Card className="px-4 pb-3 pt-6">
          <IncomeChart days={days} width={326} height={110} />
        </Card>
        {stats}
      </div>
    )

  return (
    <div className="font-ui flex flex-col gap-4 bg-[#f8f9fb] p-5 [&_img]:!mx-0">
      <PageHead title="Reports" sub="Your income across every store and channel">{monthSwitch}</PageHead>
      <div className="grid grid-cols-[250px_minmax(0,1fr)] gap-4">
        {totalCard}
        <Card className="px-5 pb-3 pt-4">
          <p className="mb-5 text-[13px] font-semibold" style={{ color: T.text }}>Income per day</p>
          <IncomeChart days={days} width={466} height={240} />
        </Card>
      </div>
      {stats}
    </div>
  )
}
