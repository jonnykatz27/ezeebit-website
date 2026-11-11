import { useEffect, useRef, useState } from 'react'
import { Plus } from 'lucide-react'

/**
 * Customer accounts in the Merchant Portal, for the homepage's product tour.
 *
 * One page, no steps: the accounts on the left, the selected account's wallet
 * on the right. Clicking a row opens it in place; sending, withdrawing and
 * opening an account are each one click, and a deposit arrives on its own.
 * It shows the portal's Customer accounts section on its own, without the
 * portal's navigation; compact, for a phone, the accounts become a row of
 * tabs over the wallet.
 * Pieces and colour tokens follow the portal's Figma ("Ezeebit – The Ezee
 * Way", page "Merchant Portal Designs"); the portal has no customer accounts
 * screen yet, so the page composes them.
 *
 * What it does follows the Customer Accounts API at docs.ezeebit.com: a USDT
 * wallet per customer under the merchant's account, opened with the
 * merchant's own customer ID; deposit addresses on Tron, Ethereum, BSC and
 * Solana, with Ethereum and BSC sharing one; deposits credited to the
 * customer; instant, no-fee book transfers from the merchant's USDT wallet;
 * withdrawals to whitelisted addresses, held until they complete; frozen
 * accounts that receive deposits but can't move funds; and a ledger with the
 * balance after every entry. Names, balances and addresses are illustrative.
 */

const T = {
  text: '#172b4d',
  subtle: '#44546f',
  subtlest: '#626f86',
  heading: '#181d27',
  line: '#eef0f3',
  input: '#e5e7eb',
  panel: '#e9f2ff',
  primary: '#0074e3',
  green: '#216e4e',
  greenBg: '#dcfff1',
}

const RATE = 18.42 // ZAR per USDT, the same placeholder as the checkout demos
const SEND = 50
const WITHDRAW = 100

type Net = 'tron' | 'evm' | 'sol'
/** Ethereum and BSC share one address, so they share a tab. */
const NETWORKS: { key: Net; label: string }[] = [
  { key: 'tron', label: 'Tron' },
  { key: 'evm', label: 'Ethereum · BSC' },
  { key: 'sol', label: 'Solana' },
]

type Entry = { id: number; title: string; sub: string; amount: number; credit: boolean; after?: number; state?: 'confirming' | 'processing' }
type Account = {
  id: string
  name: string
  frozen?: boolean
  balance: number
  held: number
  addresses: Record<Net, string>
  whitelist?: { label: string; network: string }
  ledger: Entry[]
}

const seed = (): Account[] => [
  {
    id: 'cust-1001',
    name: 'Thabo Mokoena',
    balance: 300,
    held: 0,
    addresses: { tron: 'TQ8nJ5bL2wVxK3pR7mYcH4dF9gS6tA1kPd', evm: '0x7a3f5e2b9c1d4a6e8f0b2c4d6e8a0b1c3d5ec91e', sol: '5hT3qLm8vXcR2nKp9dWf6yBzJa4sE7uGtN1oH8iCkVxQ' },
    whitelist: { label: "Thabo's Trust Wallet", network: 'Tron' },
    ledger: [
      { id: 2, title: 'Transfer from merchant wallet', sub: 'Merchant Portal · 30 Oct', amount: 50, credit: true, after: 300 },
      { id: 1, title: 'Chain deposit', sub: 'Tron · 30 Oct', amount: 250, credit: true, after: 250 },
    ],
  },
  {
    id: 'cust-1002',
    name: 'Aisha Bello',
    balance: 1250,
    held: 0,
    addresses: { tron: 'TJr2Uq7Lb9WmXc4Np6Hs8Kd3Fy5Ze1Ga7V', evm: '0x3c9d1e7f5a2b4c6d8e0f1a3b5c7d9e1f2a4b6c8d', sol: '9xKp4Tm2Qw7Rv5Ln8Hc3Jy6Bd1Fz4Gs7Nk2Pq5Wt8E' },
    whitelist: { label: "Aisha's Binance", network: 'Tron' },
    ledger: [{ id: 1, title: 'Chain deposit', sub: 'Solana · 29 Oct', amount: 1250, credit: true, after: 1250 }],
  },
  {
    id: 'cust-1003',
    name: 'Wanjiru Kamau',
    frozen: true,
    balance: 75.5,
    held: 0,
    addresses: { tron: 'TNf6Wc3Yk8Lp2Rv9Qm5Hx7Jd4Ts1Gb6Ze3A', evm: '0x9e2a4c6b8d0f1e3a5c7b9d2f4a6c8e0b1d3f5a7c', sol: '3Lm8Qx5Vr2Tk9Pw6Hn4Jc7Bf1Dz3Gs8Ny5Ka2We6R' },
    ledger: [{ id: 1, title: 'Chain deposit', sub: 'Ethereum · 28 Oct', amount: 75.5, credit: true, after: 75.5 }],
  },
]

const NEW_ACCOUNT: Account = {
  id: 'cust-1004',
  name: 'New customer',
  balance: 0,
  held: 0,
  addresses: { tron: 'TWq5Hn8Kc2Rv7Lx4Pm9Jd3Yb6Gs1Fz5Tk8A', evm: '0x6b8d0f2a4c6e8a1b3d5f7a9c2e4b6d8f0a1c3e5b', sol: '7Rk2Wp9Lx4Tm6Hq3Vn8Jc5Bd1Fz7Gs4Ny2Ka9Pe3Q' },
  ledger: [],
}

/** A ledger row's height: two lines of text and its padding. */
const LEDGER_ROW = 52

const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const available = (a: Account) => a.balance - a.held

const Chip = ({ frozen }: { frozen?: boolean }) => (
  <span className="rounded-[4px] px-1.5 py-0.5 text-[10px] font-semibold" style={frozen ? { background: '#f1f2f4', color: T.subtle } : { background: T.greenBg, color: T.green }}>
    {frozen ? 'Frozen' : 'Active'}
  </span>
)

const ICON = {
  credit: { bg: '#dcfff1', src: '/portal/check.svg' },
  transfer: { bg: '#f3f0ff', src: '/portal/file-text.svg' },
  pending: { bg: '#ffecf8', src: '/portal/arrow-counter-clockwise.svg' },
}

const LedgerRow = ({ e, fresh }: { e: Entry; fresh: boolean }) => {
  const icon = e.state ? ICON.pending : e.title.startsWith('Transfer') ? ICON.transfer : ICON.credit
  return (
    <div className={`-mx-2 flex items-center gap-3 rounded-lg px-2 transition-colors duration-700 ${fresh ? 'bg-[#f5f9ff]' : ''}`} style={{ height: LEDGER_ROW }}>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full" style={{ background: icon.bg }}>
        <img src={icon.src} alt="" className="size-4" />
      </span>
      <div className="min-w-0 flex-1 leading-[18px]">
        <p className="truncate text-[13px] font-medium" style={{ color: T.text }}>{e.title}</p>
        <p className="truncate text-[11px]" style={{ color: T.subtlest }}>{e.state === 'confirming' ? 'Confirming on chain…' : e.state === 'processing' ? 'Processing…' : e.sub}</p>
      </div>
      <div className="text-right leading-[18px]">
        <p className="whitespace-nowrap text-[13px] font-bold tabular-nums" style={{ color: e.state ? T.subtlest : e.credit ? T.green : T.text }}>
          {e.credit ? '+' : '−'}{fmt(e.amount)}
        </p>
        {e.after !== undefined && !e.state && <p className="whitespace-nowrap text-[10px] tabular-nums" style={{ color: T.subtlest }}>Bal {fmt(e.after)}</p>}
      </div>
    </div>
  )
}

export default function CustomerAccountsDemo({ compact = false }: { compact?: boolean }) {
  const [accounts, setAccounts] = useState(seed)
  const [selected, setSelected] = useState('cust-1001')
  const [merchant, setMerchant] = useState(3350)
  const [net, setNet] = useState<Net>('tron')
  const [toast, setToast] = useState<string | null>(null)
  const [fresh, setFresh] = useState<number | null>(null)
  const timers = useRef<number[]>([])
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms))
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const update = (id: string, fn: (a: Account) => Account) => setAccounts((all) => all.map((a) => (a.id === id ? fn(a) : a)))
  const say = (text: string) => {
    setToast(text)
    later(() => setToast(null), 2600)
  }
  const flash = (id: number) => {
    setFresh(id)
    later(() => setFresh(null), 2400)
  }

  // A deposit arrives for the first customer a moment after the page opens, confirms, and is credited to them
  useEffect(() => {
    const id = 9001
    later(() => update('cust-1001', (a) => ({ ...a, ledger: [{ id, title: 'Chain deposit', sub: '', amount: 120, credit: true, state: 'confirming' }, ...a.ledger] })), 2200)
    later(() => {
      update('cust-1001', (a) => ({
        ...a,
        balance: a.balance + 120,
        ledger: a.ledger.map((e) => (e.id === id ? { ...e, state: undefined, sub: 'Tron · just now', after: a.balance + 120 } : e)),
      }))
      flash(id)
      say('Deposit credited to Thabo · webhook sent')
    }, 5000)
  }, [])

  const account = accounts.find((a) => a.id === selected)!
  const canSend = !account.frozen && merchant >= SEND
  const canWithdraw = !account.frozen && !!account.whitelist && available(account) >= WITHDRAW

  const send = () => {
    if (!canSend) return
    const id = Date.now()
    update(account.id, (a) => ({
      ...a,
      balance: a.balance + SEND,
      ledger: [{ id, title: 'Transfer from merchant wallet', sub: 'Merchant Portal · just now', amount: SEND, credit: true, after: a.balance + SEND }, ...a.ledger],
    }))
    setMerchant((m) => m - SEND)
    flash(id)
    say('Sent instantly, with no fee')
  }
  const withdraw = () => {
    if (!canWithdraw || !account.whitelist) return
    const id = Date.now()
    const target = account.whitelist
    update(account.id, (a) => ({ ...a, held: a.held + WITHDRAW, ledger: [{ id, title: 'Withdrawal', sub: '', amount: WITHDRAW, credit: false, state: 'processing' }, ...a.ledger] }))
    say('Address screened · withdrawal sent')
    // The ledger writes a withdrawal when it completes; until then the amount is held
    later(() => {
      update(account.id, (a) => ({
        ...a,
        balance: a.balance - WITHDRAW,
        held: a.held - WITHDRAW,
        ledger: a.ledger.map((e) => (e.id === id ? { ...e, state: undefined, sub: `To ${target.label} · ${target.network}`, after: a.balance - WITHDRAW } : e)),
      }))
      flash(id)
    }, 3000)
  }
  const create = () => {
    if (accounts.some((a) => a.id === NEW_ACCOUNT.id)) return
    setAccounts((all) => [NEW_ACCOUNT, ...all])
    setSelected(NEW_ACCOUNT.id)
    say('cust-1004 opened, with deposit addresses on four networks')
  }
  const created = accounts.some((a) => a.id === NEW_ACCOUNT.id)
  const address = account.addresses[net]

  const newButton = (
    <button
      type="button"
      onClick={create}
      disabled={created}
      className="flex h-9 items-center gap-1.5 rounded-full bg-[#0074e3] px-4 text-[13px] font-semibold text-white hover:bg-[#0062c2] disabled:opacity-40"
    >
      <Plus className="h-4 w-4" strokeWidth={2.25} />
      New account
    </button>
  )

  /** The selected account's wallet: balance, one-click actions, deposit address and ledger. */
  const wallet = (
    <div className="rounded-[12px] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold" style={{ color: T.heading }}>{account.name}</p>
          <p className="mt-0.5 flex items-center gap-2 text-[11px]" style={{ color: T.subtlest }}>{account.id} <Chip frozen={account.frozen} /></p>
        </div>
        <div className="text-right">
          <p className="whitespace-nowrap text-[20px] font-bold tabular-nums" style={{ color: T.heading }}>{fmt(available(account))} <span className="text-[13px] font-semibold" style={{ color: T.subtle }}>USDT</span></p>
          <p className="text-[11px]" style={{ color: T.subtlest }}>{account.held ? `${fmt(account.held)} USDT held for a withdrawal` : `≈ R ${fmt(available(account) * RATE)}`}</p>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button type="button" onClick={send} disabled={!canSend} className="h-9 flex-1 rounded-full bg-[#0074e3] px-3 text-[13px] font-semibold text-white hover:bg-[#0062c2] disabled:cursor-not-allowed disabled:opacity-40">
          Send {SEND} USDT
        </button>
        <button type="button" onClick={withdraw} disabled={!canWithdraw} className="h-9 flex-1 rounded-full border border-[#0074e3] bg-white px-3 text-[13px] font-semibold text-[#0074e3] hover:bg-[#f5f9ff] disabled:cursor-not-allowed disabled:opacity-40">
          Withdraw {WITHDRAW} USDT
        </button>
      </div>
      <p className="mt-1.5 h-[30px] text-[10px] leading-[15px]" style={{ color: T.subtlest }}>
        {account.frozen
          ? "Frozen: it still receives deposits, but can't send or withdraw"
          : account.whitelist
            ? `Sends come from your USDT wallet, instantly and free. Withdrawals go to ${account.whitelist.label}, a whitelisted address.`
            : 'Sends come from your USDT wallet, instantly and free. No whitelisted address to withdraw to yet.'}
      </p>

      <div className="mt-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[13px] font-semibold" style={{ color: T.text }}>Deposit address</p>
          <div className="flex rounded-full bg-[#f1f2f4] p-0.5">
            {NETWORKS.map((n) => (
              <button
                key={n.key}
                type="button"
                onClick={() => setNet(n.key)}
                aria-pressed={net === n.key}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${net === n.key ? 'bg-white shadow-sm' : ''}`}
                style={{ color: net === n.key ? T.text : T.subtle }}
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-2.5 flex h-[88px] items-center gap-3 rounded-[8px] p-2.5" style={{ background: T.panel }}>
          <span className="flex size-[68px] shrink-0 items-center justify-center rounded-[6px] bg-white">
            <img src={`/portal/qr/${account.id}-${net}.svg`} alt={`QR code for the ${NETWORKS.find((n) => n.key === net)!.label} deposit address`} width={58} height={58} />
          </span>
          <div className="min-w-0">
            <p className="break-all text-[11px] font-semibold leading-[15px]" style={{ color: T.heading }}>{address}</p>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(address).catch(() => {})
                say('Address copied')
              }}
              className="mt-1.5 flex items-center gap-1 text-[12px] font-semibold"
              style={{ color: T.primary }}
            >
              <img src="/portal/copy.svg" alt="" width={14} height={14} />
              Copy
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-1 text-[13px] font-semibold" style={{ color: T.text }}>Ledger</p>
        {/* Room for the most rows it shows, so a short ledger leaves the card the same size */}
        <div style={{ height: (compact ? 2 : 3) * LEDGER_ROW }}>
        {account.ledger.length ? (
          account.ledger.slice(0, compact ? 2 : 3).map((e) => <LedgerRow key={e.id} e={e} fresh={fresh === e.id} />)
        ) : (
          <p className="py-3 text-[12px]" style={{ color: T.subtlest }}>No movements yet. Share a deposit address, or send from your wallet.</p>
        )}
        </div>
      </div>
    </div>
  )

  const toastEl = (
    <div
      role="status"
      className={`pointer-events-none absolute left-1/2 top-3 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#172b4d] px-4 py-2 text-[12px] font-semibold text-white shadow-lg transition-all duration-300 ${toast ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}
    >
      {toast}
    </div>
  )

  if (compact)
    return (
      <div className="font-ui relative bg-[#f8f9fb] py-4 [&_img]:!mx-0">
        <div className="mx-4 flex items-center justify-between gap-3">
          <div>
            <p className="font-display text-[20px] font-bold leading-tight" style={{ color: T.heading }}>Customer accounts</p>
            <p className="text-[11px]" style={{ color: T.subtle }}>Your USDT wallet: {fmt(merchant)}</p>
          </div>
          {newButton}
        </div>
        <div className="mx-4 mt-3 flex gap-1.5 overflow-hidden">
          {accounts.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setSelected(a.id)}
              aria-pressed={selected === a.id}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] font-semibold ${selected === a.id ? 'bg-[#172b4d] text-white' : 'bg-white ring-1 ring-[#e5e7eb]'}`}
              style={selected === a.id ? undefined : { color: T.subtle }}
            >
              {a.name.split(' ')[0]}
            </button>
          ))}
        </div>
        <div className="mx-4 mt-3">{wallet}</div>
        {toastEl}
      </div>
    )

  return (
    <div className="font-ui relative bg-[#f8f9fb] [&_img]:!mx-0">
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-center justify-between gap-4 rounded-[12px] bg-white px-6 py-4">
          <div>
            <p className="font-display text-[22px] font-bold leading-tight" style={{ color: T.heading }}>Customer accounts</p>
            <p className="mt-1 text-[12px]" style={{ color: T.subtle }}>A USDT wallet for each of your customers, held under your merchant account</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[11px]" style={{ color: T.subtlest }}>Your USDT wallet</p>
              <p className="text-[14px] font-semibold tabular-nums" style={{ color: T.heading }}>{fmt(merchant)} USDT</p>
            </div>
            {newButton}
          </div>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-start gap-4">
          <div className="rounded-[12px] bg-white py-2">
            <div className="flex items-baseline justify-between px-5 pb-2 pt-2">
              <p className="text-[13px] font-semibold" style={{ color: T.text }}>{accounts.length} accounts</p>
              <p className="text-[11px]" style={{ color: T.subtlest }}>Select one to open it</p>
            </div>
            <div className="grid grid-cols-[1fr_auto] border-y px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.08em]" style={{ borderColor: T.line, color: T.subtlest }}>
              <span>Customer</span>
              <span>Balance</span>
            </div>
            <ul>
              {accounts.map((a) => {
                const on = selected === a.id
                return (
                  <li key={a.id} className="border-b last:border-b-0" style={{ borderColor: T.line }}>
                    <button
                      type="button"
                      onClick={() => setSelected(a.id)}
                      aria-pressed={on}
                      className={`relative flex w-full items-center gap-3 px-5 py-3 text-left transition-colors ${on ? 'bg-[#f5f9ff]' : 'hover:bg-[#fafbfc]'}`}
                    >
                      {on && <span className="absolute inset-y-2 left-0 w-[3px] rounded-r bg-[#0074e3]" />}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-medium" style={{ color: T.text }}>{a.name}</span>
                        <span className="block text-[11px]" style={{ color: T.subtlest }}>{a.id}</span>
                      </span>
                      <span className="flex flex-col items-end gap-1">
                        <span className="text-[13px] font-semibold tabular-nums" style={{ color: T.text }}>{fmt(a.balance)}</span>
                        <Chip frozen={a.frozen} />
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
          {wallet}
        </div>
      </div>
      {toastEl}
    </div>
  )
}
