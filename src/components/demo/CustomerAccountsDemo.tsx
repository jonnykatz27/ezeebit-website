import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Customer accounts in the Merchant Portal, for the homepage's product tour.
 *
 * Built from the portal's Figma ("Ezeebit – The Ezee Way", page "Merchant
 * Portal Designs"), using its mobile layout: the header, the white page card,
 * the numbered steps, select fields with the blue panel under them, the QR and
 * address block, the notes box, and the portal's blue buttons. The portal has
 * no customer accounts screen yet, so these screens compose those pieces.
 *
 * What it does follows the Customer Accounts API at docs.ezeebit.com:
 * - every account is a USDT wallet under the merchant's account, opened with
 *   the merchant's own customer ID
 * - it has deposit addresses on Tron, Ethereum, BSC and Solana, with Ethereum
 *   and BSC sharing one, and deposits are credited to the customer
 * - transfers between the merchant's USDT wallet and the customer are book
 *   entries: instant, nothing on chain, no fee
 * - withdrawals go to whitelisted addresses, held until they complete
 * - a frozen account still receives deposits but can't transfer or withdraw
 * - the ledger carries the balance after every entry
 * Names, balances, addresses and fees are illustrative.
 */

/** The portal's colour tokens, as named in its Figma variables. */
const T = {
  text: '#172b4d',
  subtle: '#44546f',
  subtlest: '#626f86',
  heading: '#181d27',
  step: '#28272c',
  panel: '#e9f2ff',
  divider: '#dcdfe4',
  input: '#e5e7eb',
  primary: '#0074e3',
  notes: '#fbfbfb',
  green: '#216e4e',
  greenBg: '#dcfff1',
}

const RATE = 18.42 // ZAR per USDT, the same placeholder as the checkout demos

type Net = 'tron' | 'evm' | 'sol'
const NETWORKS: { key: Net; label: string; shared?: string }[] = [
  { key: 'tron', label: 'Tron (TRC 20)' },
  { key: 'evm', label: 'Ethereum (ERC 20)', shared: 'BNB Smart Chain' },
  { key: 'evm', label: 'BNB Smart Chain (BEP 20)', shared: 'Ethereum' },
  { key: 'sol', label: 'Solana (SPL)' },
]

type Entry = {
  id: number
  title: string
  sub: string
  amount: number
  credit: boolean
  after?: number
  state?: 'confirming' | 'processing'
}

type Account = {
  id: string
  name: string
  frozen?: boolean
  balance: number
  held: number
  addresses: Record<Net, string>
  whitelist: { label: string; network: string; address: string; fee: number }[]
  ledger: Entry[]
}

const seed = (): Account[] => [
  {
    id: 'cust-1001',
    name: 'Thabo Mokoena',
    balance: 300,
    held: 0,
    addresses: {
      tron: 'TQ8nJ5bL2wVxK3pR7mYcH4dF9gS6tA1kPd',
      evm: '0x7a3f5e2b9c1d4a6e8f0b2c4d6e8a0b1c3d5ec91e',
      sol: '5hT3qLm8vXcR2nKp9dWf6yBzJa4sE7uGtN1oH8iCkVxQ',
    },
    whitelist: [
      { label: "Thabo's Trust Wallet", network: 'Tron', address: 'TXm4Fq9Wc2LrB7nV5kJ8dP3sH6yZ1aE4uR', fee: 1 },
      { label: "Thabo's Ledger", network: 'Ethereum', address: '0x51c9B2e4f7A3d8E6b0C1F2a9D4e7B3c6A8f0E2d5', fee: 3.5 },
    ],
    ledger: [
      { id: 2, title: 'Transfer from merchant wallet', sub: 'Merchant Portal · 30 Oct, 10:00', amount: 50, credit: true, after: 300 },
      { id: 1, title: 'Chain deposit', sub: 'Tron · 30 Oct, 07:00', amount: 250, credit: true, after: 250 },
    ],
  },
  {
    id: 'cust-1002',
    name: 'Aisha Bello',
    balance: 1250,
    held: 0,
    addresses: {
      tron: 'TJr2Uq7Lb9WmXc4Np6Hs8Kd3Fy5Ze1Ga7V',
      evm: '0x3c9d1e7f5a2b4c6d8e0f1a3b5c7d9e1f2a4b6c8d',
      sol: '9xKp4Tm2Qw7Rv5Ln8Hc3Jy6Bd1Fz4Gs7Nk2Pq5Wt8E',
    },
    whitelist: [{ label: "Aisha's Binance", network: 'Tron', address: 'TBn7Kx2Wq9Lr4Vc6Pm3Hd8Js5Gf1Yz2Ta6E', fee: 1 }],
    ledger: [{ id: 1, title: 'Chain deposit', sub: 'Solana · 29 Oct, 16:20', amount: 1250, credit: true, after: 1250 }],
  },
  {
    id: 'cust-1003',
    name: 'Wanjiru Kamau',
    frozen: true,
    balance: 75.5,
    held: 0,
    addresses: {
      tron: 'TNf6Wc3Yk8Lp2Rv9Qm5Hx7Jd4Ts1Gb6Ze3A',
      evm: '0x9e2a4c6b8d0f1e3a5c7b9d2f4a6c8e0b1d3f5a7c',
      sol: '3Lm8Qx5Vr2Tk9Pw6Hn4Jc7Bf1Dz3Gs8Ny5Ka2We6R',
    },
    whitelist: [],
    ledger: [{ id: 1, title: 'Chain deposit', sub: 'Ethereum · 28 Oct, 12:45', amount: 75.5, credit: true, after: 75.5 }],
  },
]

/** The account the Create account button opens, with the next ID in the merchant's own scheme. */
const NEW_ACCOUNT: Account = {
  id: 'cust-1004',
  name: 'New customer',
  balance: 0,
  held: 0,
  addresses: {
    tron: 'TWq5Hn8Kc2Rv7Lx4Pm9Jd3Yb6Gs1Fz5Tk8A',
    evm: '0x6b8d0f2a4c6e8a1b3d5f7a9c2e4b6d8f0a1c3e5b',
    sol: '7Rk2Wp9Lx4Tm6Hq3Vn8Jc5Bd1Fz7Gs4Ny2Ka9Pe3Q',
  },
  whitelist: [],
  ledger: [],
}

const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const rand = (n: number) => `R ${fmt(n * RATE)}`
const mask = (a: string) => `${a.slice(0, 6)}…${a.slice(-4)}`
const available = (a: Account) => a.balance - a.held

/* ---------- The portal's pieces ---------- */

/** The mobile header: menu, logo, notifications and search. */
const Header = ({ alert }: { alert: boolean }) => (
  <div className="flex items-center justify-between px-4 pt-6 pb-6">
    <div className="flex items-center gap-[10px]">
      <img src="/portal/list.svg" alt="" width={24} height={24} />
      <img src="/ezeebit_black.png" alt="Ezeebit" className="h-[25px] w-auto" />
    </div>
    <div className="flex items-center gap-2">
      <span className="relative rounded-[6px] bg-white p-[6px]">
        <img src="/portal/bell.svg" alt="" width={20} height={20} />
        {alert && <span className="absolute right-[5px] top-[5px] size-2 rounded-full bg-[#e5484d] ring-2 ring-white" />}
      </span>
      <span className="rounded-[6px] bg-white p-[6px]">
        <img src="/portal/magnifying-glass.svg" alt="" width={20} height={20} />
      </span>
    </div>
  </div>
)

/** The white page card's header: title and supporting line, with an optional back button. */
const CardHeader = ({ title, sub, onBack }: { title: string; sub: ReactNode; onBack?: () => void }) => (
  <div className="rounded-t-[12px] border-b border-[#f8f8fa] px-8 py-6">
    <div className="flex items-start gap-2">
      {onBack && (
        <button type="button" onClick={onBack} aria-label="Back" className="-ml-2 mt-0.5 shrink-0 rounded-md p-0.5 hover:bg-[#f1f2f4]">
          <img src="/portal/select-chevron.svg" alt="" width={24} height={24} className="rotate-90" />
        </button>
      )}
      <div className="flex min-w-0 flex-col gap-[6px]">
        <p className="font-display text-[24px] font-bold leading-tight" style={{ color: T.heading }}>{title}</p>
        <div className="text-[12px] font-medium leading-4" style={{ color: T.subtle }}>{sub}</div>
      </div>
    </div>
  </div>
)

/** One numbered step, with its connecting line unless it is the last. */
const Step = ({ n, title, last, children }: { n: number; title: string; last?: boolean; children: ReactNode }) => (
  <div className="flex gap-4">
    <div className="flex w-[30px] shrink-0 flex-col items-center gap-2">
      <span className="flex h-[30px] w-full items-center justify-center rounded-[8px] bg-[#f9f9f9] text-[14px] font-semibold" style={{ color: T.step }}>{n}</span>
      {!last && <span className="w-px flex-1" style={{ background: T.divider }} />}
    </div>
    <div className={`flex min-w-0 flex-1 flex-col gap-4 ${last ? '' : 'pb-4'}`}>
      <p className="text-[16px] font-semibold leading-6" style={{ color: T.text }}>{title}</p>
      {children}
    </div>
  </div>
)

const FIELD = 'h-10 w-full rounded-[4px] border-[0.85px] bg-white px-[18px] text-[14px] shadow-[0_0.85px_1.7px_rgba(0,0,0,0.05)] outline-none focus:border-[#0074e3]'

/** A select field, drawn as the portal draws one, with a native select on top for the interaction. */
const Select = ({ value, options, onChange, label }: { value: string; options: { value: string; label: string }[]; onChange: (v: string) => void; label: string }) => (
  <div className="relative">
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${FIELD} appearance-none pr-10`}
      style={{ borderColor: T.input, color: T.text }}
    >
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
    <img src="/portal/select-chevron.svg" alt="" width={24} height={24} className="pointer-events-none absolute right-3 top-2" />
  </div>
)

/** The blue panel under a field: a figure and what it is, on one or both sides. */
const Panel = ({ left, right, note }: { left?: [ReactNode, ReactNode]; right?: [ReactNode, ReactNode]; note?: ReactNode }) => (
  <div className="flex flex-col gap-2 rounded-b-[4px] px-4 py-2" style={{ background: T.panel }}>
    {(left || right) && (
      <div className="flex gap-4">
        {left && (
          <div className="flex flex-1 flex-col">
            <p className="text-[14px] font-semibold" style={{ color: T.text }}>{left[0]}</p>
            <p className="text-[10px]" style={{ color: T.subtle }}>{left[1]}</p>
          </div>
        )}
        {right && (
          <div className="flex flex-1 flex-col items-end text-right">
            <p className="text-[14px] font-semibold" style={{ color: T.text }}>{right[0]}</p>
            <p className="text-[10px]" style={{ color: T.subtle }}>{right[1]}</p>
          </div>
        )}
      </div>
    )}
    {note && (
      <p className="flex items-center gap-[6px] text-[10px]" style={{ color: T.subtle }}>
        <img src="/portal/info.svg" alt="" width={18} height={18} className="shrink-0" />
        {note}
      </p>
    )}
  </div>
)

const Button = ({ children, onClick, outline, disabled }: { children: ReactNode; onClick?: () => void; outline?: boolean; disabled?: boolean }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`h-9 flex-1 rounded-full px-4 text-[14px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
      outline ? 'border border-[#0074e3] bg-white text-[#0074e3] hover:bg-[#f5f9ff]' : 'bg-[#0074e3] text-white hover:bg-[#0062c2]'
    }`}
  >
    {children}
  </button>
)

const Chip = ({ frozen }: { frozen?: boolean }) => (
  <span
    className="rounded-[4px] px-1.5 py-0.5 text-[10px] font-semibold"
    style={frozen ? { background: '#f1f2f4', color: T.subtle } : { background: T.greenBg, color: T.green }}
  >
    {frozen ? 'Frozen' : 'Active'}
  </span>
)

const Notes = ({ items }: { items: string[] }) => (
  <div className="flex flex-col gap-4 rounded-[6px] p-4" style={{ background: T.notes }}>
    <p className="flex items-center gap-1 text-[14px] font-medium leading-5" style={{ color: T.subtle }}>
      <img src="/portal/notes-info.svg" alt="" width={20} height={20} />
      Notes
    </p>
    <ol className="flex flex-col gap-3 text-[12px] leading-[18px]" style={{ color: T.subtle }}>
      {items.map((t, i) => <li key={t}>{i + 1}. {t}</li>)}
    </ol>
  </div>
)

const ICON = { credit: { bg: '#dcfff1', src: '/portal/check.svg' }, transfer: { bg: '#f3f0ff', src: '/portal/file-text.svg' }, pending: { bg: '#ffecf8', src: '/portal/arrow-counter-clockwise.svg' } }

/** A ledger entry, as a row of the portal's activity list, with the balance after it. */
const LedgerRow = ({ e, fresh }: { e: Entry; fresh: boolean }) => {
  const icon = e.state ? ICON.pending : e.title.startsWith('Transfer') ? ICON.transfer : ICON.credit
  return (
    <div className={`flex items-center gap-3 rounded-lg px-2 py-3 -mx-2 transition-colors duration-700 ${fresh ? 'bg-[#f5f9ff]' : ''}`}>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full" style={{ background: icon.bg }}>
        <img src={icon.src} alt="" className="size-5" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1 leading-5">
        <p className="truncate text-[14px] font-medium" style={{ color: T.text }}>{e.title}</p>
        <p className="truncate text-[12px]" style={{ color: T.subtlest }}>{e.state === 'confirming' ? 'Confirming on chain…' : e.state === 'processing' ? 'Processing…' : e.sub}</p>
      </div>
      <div className="text-right leading-5">
        <p className="whitespace-nowrap text-[14px] font-bold tabular-nums" style={{ color: e.state ? T.subtlest : e.credit ? T.green : T.text }}>
          {e.credit ? '+' : '−'}{fmt(e.amount)}
        </p>
        {e.after !== undefined && !e.state && <p className="whitespace-nowrap text-[11px] tabular-nums" style={{ color: T.subtlest }}>Bal {fmt(e.after)}</p>}
      </div>
    </div>
  )
}

/* ---------- The demo ---------- */

type View = { name: 'list' } | { name: 'account'; id: string } | { name: 'transfer'; id: string } | { name: 'withdraw'; id: string }

export default function CustomerAccountsDemo() {
  const [accounts, setAccounts] = useState(seed)
  const [merchant, setMerchant] = useState(3350)
  const [view, setView] = useState<View>({ name: 'list' })
  const [query, setQuery] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const [fresh, setFresh] = useState<number | null>(null)
  const [alert, setAlert] = useState(false)
  const [deposited, setDeposited] = useState(false)
  const timers = useRef<number[]>([])
  const top = useRef<HTMLDivElement>(null)

  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms))
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const go = (v: View) => {
    setView(v)
    top.current?.closest('.overflow-y-auto')?.scrollTo({ top: 0 })
  }
  const say = (text: string) => {
    setToast(text)
    later(() => setToast(null), 2600)
  }
  const update = (id: string, fn: (a: Account) => Account) => setAccounts((all) => all.map((a) => (a.id === id ? fn(a) : a)))
  const flash = (entryId: number) => {
    setFresh(entryId)
    later(() => setFresh(null), 2400)
  }

  // A deposit arrives a few seconds after the first account is opened, confirms, and is credited to that customer
  useEffect(() => {
    if (view.name !== 'account' || deposited) return
    const account = accounts.find((a) => a.id === view.id)!
    setDeposited(true)
    const id = Date.now()
    later(() => update(account.id, (a) => ({ ...a, ledger: [{ id, title: 'Chain deposit', sub: '', amount: 120, credit: true, state: 'confirming' }, ...a.ledger] })), 2500)
    later(() => {
      update(account.id, (a) => ({
        ...a,
        balance: a.balance + 120,
        ledger: a.ledger.map((e) => (e.id === id ? { ...e, state: undefined, sub: 'Tron · just now', after: a.balance + 120 } : e)),
      }))
      flash(id)
      setAlert(true)
      say('Deposit credited · webhook sent')
    }, 5500)
  }, [view])

  const shown = accounts.filter((a) => `${a.id} ${a.name}`.toLowerCase().includes(query.trim().toLowerCase()))
  const held = accounts.reduce((s, a) => s + a.balance, 0)

  let screen: ReactNode
  if (view.name === 'list') {
    screen = (
      <>
        <CardHeader title="Customer accounts" sub="A USDT wallet for each of your customers, held under your merchant account" />
        <div className="flex flex-col gap-6 px-8 py-5">
          <div className="grid grid-cols-2 gap-3">
            {[[String(accounts.length), 'Accounts'], [fmt(held), 'USDT held']].map(([v, l]) => (
              <div key={l} className="rounded-[12px] border px-4 py-3" style={{ borderColor: T.input }}>
                <p className="text-[16px] font-semibold tabular-nums" style={{ color: T.heading }}>{v}</p>
                <p className="text-[12px]" style={{ color: T.subtle }}>{l}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-[16px] font-semibold" style={{ color: T.text }}>{accounts.length} accounts</p>
            <button
              type="button"
              disabled={accounts.some((a) => a.id === NEW_ACCOUNT.id)}
              onClick={() => {
                setAccounts((all) => [NEW_ACCOUNT, ...all])
                say('cust-1004 opened with four deposit networks')
              }}
              className="h-9 rounded-full bg-[#0074e3] px-4 text-[14px] font-semibold text-white hover:bg-[#0062c2] disabled:opacity-40"
            >
              Create account
            </button>
          </div>
          <label className="relative block">
            <img src="/portal/magnifying-glass.svg" alt="" width={16} height={16} className="pointer-events-none absolute left-3 top-2.5" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by ID or name"
              aria-label="Search customer accounts"
              className="h-9 w-full rounded-[4px] border bg-white pl-9 pr-3 text-[14px] outline-none placeholder:text-[#8590a2] focus:border-[#0074e3]"
              style={{ borderColor: T.input, color: T.text }}
            />
          </label>
          <ul className="-mt-2 flex flex-col">
            {shown.map((a) => (
              <li key={a.id} className="border-b last:border-b-0" style={{ borderColor: '#f1f2f4' }}>
                <button type="button" onClick={() => go({ name: 'account', id: a.id })} className="flex w-full items-center gap-3 py-3 text-left hover:bg-[#fafbfc]">
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate text-[14px] font-medium" style={{ color: T.text }}>{a.name}</span>
                    <span className="text-[12px]" style={{ color: T.subtlest }}>{a.id}</span>
                  </span>
                  <span className="flex flex-col items-end gap-1">
                    <span className="text-[14px] font-semibold tabular-nums" style={{ color: T.text }}>{fmt(a.balance)} USDT</span>
                    <Chip frozen={a.frozen} />
                  </span>
                  <img src="/portal/row-chevron.svg" alt="" width={16} height={16} />
                </button>
              </li>
            ))}
            {shown.length === 0 && <li className="py-6 text-center text-[12px]" style={{ color: T.subtlest }}>No accounts match</li>}
          </ul>
        </div>
      </>
    )
  } else {
    const account = accounts.find((a) => a.id === view.id)!
    if (view.name === 'account') screen = <AccountView account={account} fresh={fresh} onBack={() => go({ name: 'list' })} onTransfer={() => go({ name: 'transfer', id: account.id })} onWithdraw={() => go({ name: 'withdraw', id: account.id })} say={say} />
    else if (view.name === 'transfer')
      screen = (
        <TransferView
          account={account}
          merchant={merchant}
          onCancel={() => go({ name: 'account', id: account.id })}
          onDone={(toCustomer, amount) => {
            const id = Date.now()
            const after = account.balance + (toCustomer ? amount : -amount)
            update(account.id, (a) => ({
              ...a,
              balance: a.balance + (toCustomer ? amount : -amount),
              ledger: [{ id, title: toCustomer ? 'Transfer from merchant wallet' : 'Transfer to merchant wallet', sub: 'Merchant Portal · just now', amount, credit: toCustomer, after }, ...a.ledger],
            }))
            setMerchant((m) => m + (toCustomer ? -amount : amount))
            go({ name: 'account', id: account.id })
            flash(id)
            say('Transfer complete · no fee')
          }}
        />
      )
    else
      screen = (
        <WithdrawView
          account={account}
          onCancel={() => go({ name: 'account', id: account.id })}
          onDone={(amount, to) => {
            const id = Date.now()
            update(account.id, (a) => ({ ...a, held: a.held + amount, ledger: [{ id, title: 'Withdrawal', sub: '', amount, credit: false, state: 'processing' }, ...a.ledger] }))
            go({ name: 'account', id: account.id })
            say('Address screened · withdrawal sent')
            // The ledger writes a withdrawal when it completes; until then the amount is held
            later(() => {
              update(account.id, (a) => ({
                ...a,
                balance: a.balance - amount,
                held: a.held - amount,
                ledger: a.ledger.map((e) => (e.id === id ? { ...e, state: undefined, sub: `To ${to} · just now`, after: a.balance - amount } : e)),
              }))
              flash(id)
            }, 3500)
          }}
        />
      )
  }

  return (
    <div ref={top} className="font-ui relative min-h-full bg-[#f9f9f9] pb-6 [&_img]:!mx-0">
      <Header alert={alert} />
      <div className="mx-4 rounded-[12px] bg-white">{screen}</div>
      <div
        role="status"
        className={`pointer-events-none absolute left-1/2 top-16 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#172b4d] px-4 py-2 text-[12px] font-semibold text-white shadow-lg transition-all duration-300 ${toast ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}
      >
        {toast}
      </div>
    </div>
  )
}

/** One account: its balance, actions, deposit address and ledger. */
function AccountView({ account, fresh, onBack, onTransfer, onWithdraw, say }: {
  account: Account
  fresh: number | null
  onBack: () => void
  onTransfer: () => void
  onWithdraw: () => void
  say: (t: string) => void
}) {
  const [net, setNet] = useState(0)
  const network = NETWORKS[net]
  const address = account.addresses[network.key]
  return (
    <>
      <CardHeader title={account.name} sub={<span className="flex items-center gap-2">{account.id} <Chip frozen={account.frozen} /></span>} onBack={onBack} />
      <div className="flex flex-col gap-6 px-8 py-5">
        <div>
          <div className={`${FIELD} flex items-center gap-2`} style={{ borderColor: T.input, color: T.text }}>
            <img src="/usdt-round.svg" alt="" width={18} height={18} />
            USDT wallet
          </div>
          <Panel left={[`${fmt(available(account))} USDT ≈ ${rand(available(account))}`, account.held ? `Available · ${fmt(account.held)} USDT held for a withdrawal` : 'Available balance']} />
        </div>
        <div className="flex gap-3">
          <Button onClick={onTransfer} disabled={account.frozen}>Transfer</Button>
          <Button onClick={onWithdraw} disabled={account.frozen || account.whitelist.length === 0 || available(account) <= 0} outline>Withdraw</Button>
        </div>
        {account.frozen && <Panel note="Frozen: it still receives deposits, but can't transfer or withdraw" />}

        <div className="flex flex-col">
          <Step n={1} title="Select network">
            <div>
              <Select label="Deposit network" value={String(net)} options={NETWORKS.map((n, i) => ({ value: String(i), label: n.label }))} onChange={(v) => setNet(Number(v))} />
              <Panel note={network.shared ? `Same address as ${network.shared}` : 'Deposits are credited to this customer'} />
            </div>
          </Step>
          <Step n={2} title="Deposit address" last>
            <div className="flex items-center gap-4">
              <span className="flex size-24 shrink-0 items-center justify-center rounded-[7.6px] bg-[#ebebeb]">
                <span className="flex size-[88px] items-center justify-center rounded-[7.6px] bg-white">
                  <img src={`/portal/qr/${account.id}-${network.key}.svg`} alt={`QR code for the ${network.label} deposit address`} width={76} height={76} />
                </span>
              </span>
              <div className="flex min-w-0 flex-col gap-[10px]">
                <div className="flex flex-col gap-[6px] text-[12px]">
                  <span style={{ color: T.subtle }}>Address</span>
                  <span className="break-all font-semibold" style={{ color: T.heading }}>{address}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(address).catch(() => {})
                    say('Address copied')
                  }}
                  className="flex items-center gap-[6px] text-[14px] font-semibold"
                  style={{ color: T.primary }}
                >
                  <img src="/portal/copy.svg" alt="" width={16} height={16} />
                  Copy
                </button>
              </div>
            </div>
          </Step>
        </div>

        <div className="flex flex-col">
          <p className="mb-1 text-[16px] font-semibold" style={{ color: T.text }}>Ledger</p>
          {account.ledger.length ? (
            account.ledger.map((e) => <LedgerRow key={e.id} e={e} fresh={fresh === e.id} />)
          ) : (
            <p className="py-4 text-[12px]" style={{ color: T.subtlest }}>No movements yet. Share a deposit address, or transfer from your wallet.</p>
          )}
        </div>
      </div>
    </>
  )
}

/** A book transfer between the merchant's USDT wallet and the customer, either way. */
function TransferView({ account, merchant, onCancel, onDone }: { account: Account; merchant: number; onCancel: () => void; onDone: (toCustomer: boolean, amount: number) => void }) {
  const [toCustomer, setToCustomer] = useState(true)
  const [value, setValue] = useState('50')
  const amount = Number(value) || 0
  const from = toCustomer ? merchant : available(account)
  const ok = amount > 0 && amount <= from
  const first = account.name.split(' ')[0]
  return (
    <>
      <CardHeader title="Transfer" sub={`Move USDT between your wallet and ${first}'s`} onBack={onCancel} />
      <div className="flex flex-col gap-6 px-8 py-5">
        <div className="flex flex-col">
          <Step n={1} title="Direction">
            <div className="flex flex-col gap-2">
              {[true, false].map((to) => (
                <button
                  key={String(to)}
                  type="button"
                  onClick={() => setToCustomer(to)}
                  aria-pressed={toCustomer === to}
                  className="flex items-center gap-3 rounded-[4px] border bg-white px-4 py-2.5 text-left text-[14px]"
                  style={{ borderColor: toCustomer === to ? T.primary : T.input, color: T.text }}
                >
                  <span className={`size-4 shrink-0 rounded-full border ${toCustomer === to ? 'border-[5px] border-[#0074e3]' : 'border-[#8590a2]'}`} />
                  {to ? `To ${account.name}` : `From ${account.name}`}
                </button>
              ))}
            </div>
          </Step>
          <Step n={2} title="Amount">
            <div>
              <label className="relative block">
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value.replace(/[^\d.]/g, ''))}
                  inputMode="decimal"
                  aria-label="Amount in USDT"
                  className={`${FIELD} pr-16 tabular-nums`}
                  style={{ borderColor: T.input, color: T.text }}
                />
                <span className="pointer-events-none absolute right-4 top-2.5 text-[14px]" style={{ color: T.subtlest }}>USDT</span>
              </label>
              <Panel left={[`${fmt(from)} USDT`, toCustomer ? 'Your USDT wallet' : `${first}'s balance`]} />
            </div>
          </Step>
          <Step n={3} title="Review" last>
            <Panel left={['Instant', 'Book transfer']} right={['No fee', 'Nothing on chain']} />
          </Step>
        </div>
        <div className="flex gap-3">
          <Button onClick={onCancel} outline>Cancel</Button>
          <Button onClick={() => ok && onDone(toCustomer, amount)} disabled={!ok}>Transfer</Button>
        </div>
      </div>
    </>
  )
}

/** A withdrawal from the customer's wallet to one of the whitelisted addresses. */
function WithdrawView({ account, onCancel, onDone }: { account: Account; onCancel: () => void; onDone: (amount: number, to: string) => void }) {
  const [dest, setDest] = useState(0)
  const [value, setValue] = useState(String(Math.min(100, Math.floor(available(account)))))
  const target = account.whitelist[dest]
  const amount = Number(value) || 0
  const ok = amount > target.fee && amount <= available(account)
  return (
    <>
      <CardHeader title="Withdraw" sub={`Send USDT from ${account.name.split(' ')[0]}'s wallet to a whitelisted address`} onBack={onCancel} />
      <div className="flex flex-col gap-6 px-8 py-5">
        <div className="flex flex-col">
          <Step n={1} title="From wallet">
            <div className={`${FIELD} flex items-center`} style={{ borderColor: T.input, color: T.text }}>USDT · {fmt(available(account))}</div>
          </Step>
          <Step n={2} title="Send to">
            <div>
              <Select
                label="Whitelisted address"
                value={String(dest)}
                options={account.whitelist.map((w, i) => ({ value: String(i), label: `${w.label} · ${w.network}` }))}
                onChange={(v) => setDest(Number(v))}
              />
              <Panel left={[mask(target.address), `${target.network} · whitelisted`]} right={['Clear', 'Address screening']} />
            </div>
          </Step>
          <Step n={3} title="Amount" last>
            <div>
              <label className="relative block">
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value.replace(/[^\d.]/g, ''))}
                  inputMode="decimal"
                  aria-label="Amount in USDT"
                  className={`${FIELD} pr-16 tabular-nums`}
                  style={{ borderColor: T.input, color: T.text }}
                />
                <span className="pointer-events-none absolute right-4 top-2.5 text-[14px]" style={{ color: T.subtlest }}>USDT</span>
              </label>
              <Panel left={[`${fmt(target.fee)} USDT`, 'Network fee']} right={[`${fmt(Math.max(0, amount - target.fee))} USDT`, 'They receive']} />
            </div>
          </Step>
        </div>
        <div className="flex gap-3">
          <Button onClick={onCancel} outline>Cancel</Button>
          <Button onClick={() => ok && onDone(amount, target.label)} disabled={!ok}>Withdraw</Button>
        </div>
        <Notes
          items={[
            'Withdrawals go only to addresses on your whitelist.',
            'Every address is screened, with the Travel Rule applied, before funds move.',
            'The amount is held until the withdrawal completes on chain, and it cannot be reversed after that.',
          ]}
        />
      </div>
    </>
  )
}
