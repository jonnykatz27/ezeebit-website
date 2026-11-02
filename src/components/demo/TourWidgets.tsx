import { useEffect, useState, type ReactNode } from 'react'
import { Check, ChevronLeft, ChevronRight, Loader2, Lock } from 'lucide-react'

/**
 * Small clickable versions of the online checkout and a platform's cashier,
 * for the homepage's product tour. The amounts and rates are illustrative.
 */

/** Rand per coin, for the illustrative conversions. */
const RATE = { USDT: 18.45, USDC: 18.45, BTC: 1_950_000 } as const
type Coin = keyof typeof RATE
const NETWORK: Record<Coin, string> = { USDT: 'Tron', USDC: 'Solana', BTC: 'Bitcoin' }
const COIN_LOGO: Record<Coin, string> = { USDT: '/usdt-round.svg', USDC: '/usdc-logo.svg', BTC: '/btc-logo.svg' }

const rand = (v: number) => `R${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
const units = (zar: number, coin: Coin) =>
  `${(zar / RATE[coin]).toLocaleString('en-US', { maximumFractionDigits: coin === 'BTC' ? 8 : 2, minimumFractionDigits: 2 })} ${coin}`

const BTN = 'w-full min-h-[44px] rounded-xl bg-primary-500 px-4 text-sm font-semibold text-white hover:bg-primary-600'
const LBL = 'text-[11px] font-semibold uppercase tracking-[0.1em] text-neutral-500'

/** Runs a list of steps one after another once started, and reports how far it got. */
function useSteps(count: number, ms = 900) {
  const [done, setDone] = useState(-1)
  useEffect(() => {
    if (done < 0 || done >= count) return
    const t = window.setTimeout(() => setDone((d) => d + 1), ms)
    return () => window.clearTimeout(t)
  }, [done, count, ms])
  return { done, start: () => setDone(0), reset: () => setDone(-1), running: done >= 0, finished: done >= count }
}

const Steps = ({ items, done }: { items: string[]; done: number }) => (
  <ol className="space-y-2.5" aria-live="polite">
    {items.map((item, i) => {
      const state = i < done ? 'done' : i === done ? 'now' : 'next'
      return (
        <li key={item} className={`flex items-center gap-3 text-sm ${state === 'next' ? 'text-neutral-400' : 'text-neutral-900'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${state === 'done' ? 'bg-success-500 text-white' : 'bg-neutral-100 text-neutral-500'}`}>
            {state === 'done' ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : state === 'now' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
          </span>
          {item}
        </li>
      )
    })}
  </ol>
)

/** The white widget inside the panel's bezel, with the merchant's name on top. */
const Widget = ({ title, sub, children, foot }: { title: string; sub: string; children: ReactNode; foot: string }) => (
  <div className="flex-1 flex flex-col rounded-[20px] bg-white font-ui overflow-hidden [&_img]:!mx-0">
    <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-neutral-100">
      <div>
        <p className="text-[15px] font-semibold text-neutral-900">{title}</p>
        <p className="text-xs text-neutral-500">{sub}</p>
      </div>
      <p className="text-[10px] text-neutral-400 text-right leading-tight">Powered by<br /><span className="font-semibold text-neutral-700">Ezeebit</span></p>
    </div>
    <div className="flex-1 flex flex-col gap-4 p-5">{children}</div>
    <p className="px-5 py-3 border-t border-neutral-100 text-[11px] text-neutral-500 text-center">{foot}</p>
  </div>
)

const METHODS = [
  { name: 'VALR Pay', logo: '/valr_logo%20(clean).png', note: 'Exchange' },
  { name: 'Luno Pay', logo: '/luno_logo%20(clean).png', note: 'Exchange' },
  { name: 'Binance Pay', logo: '/Binance-Logo%20(clean).png', note: 'Exchange' },
  { name: 'WalletConnect Pay', logo: '/walletconnect-pay.svg', note: '700+ wallets' },
  { name: 'Ezeebit Pay', logo: '/ezeebit-icon-blue.webp', note: 'Any on-chain wallet' },
]

/** An online store's checkout: pick a way to pay, pay, and the order is marked paid. */
export const CheckoutWidget = ({ onStatus }: { onStatus?: (status: string) => void }) => {
  const total = 1_250
  const [method, setMethod] = useState<(typeof METHODS)[number] | null>(null)
  const steps = useSteps(3)

  useEffect(() => {
    onStatus?.(steps.finished ? 'Paid' : steps.running ? 'Confirming payment' : method ? `Paying with ${method.name}` : 'Awaiting payment')
  }, [method, steps.running, steps.finished, onStatus])

  return (
    <Widget title="Checkout" sub="Your store · Order #1042" foot="The price is fixed in your currency when they pay">
      <div>
        <p className={LBL}>Order total</p>
        <p className="text-3xl font-semibold tracking-tight text-neutral-900 tabular-nums">{rand(total)}</p>
      </div>

      {!method && (
        <div className="flex flex-col gap-2">
          <p className={LBL}>Select payment method</p>
          {METHODS.map((m) => (
            <button
              key={m.name}
              type="button"
              onClick={() => setMethod(m)}
              className="flex items-center gap-3 rounded-xl border border-neutral-200 px-3 py-2.5 text-left hover:border-primary-400 hover:bg-primary-50/40"
            >
              <img src={m.logo} alt="" width={28} height={28} className="w-7 h-7 rounded-lg object-contain" />
              <span className="flex-1 min-w-0">
                <span className="block text-sm font-semibold text-neutral-900">{m.name}</span>
                <span className="block text-[11px] text-neutral-500">{m.note}</span>
              </span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>
          ))}
        </div>
      )}

      {method && !steps.running && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <img src={method.logo} alt="" width={36} height={36} className="w-9 h-9 rounded-lg object-contain" />
            <p className="text-sm text-neutral-700">Continue in <b className="text-neutral-900">{method.name}</b></p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-neutral-50 border border-neutral-200 px-3 py-2.5 text-sm">
            <img src={COIN_LOGO.USDT} alt="" width={20} height={20} className="w-5 h-5 rounded-full" />
            <b className="text-neutral-900 tabular-nums">{units(total, 'USDT')}</b>
            <span className="ml-auto flex items-center gap-1 text-[11px] font-semibold text-success-700"><Lock className="w-3 h-3" />Rate locked</span>
          </div>
          <button type="button" className={BTN} onClick={steps.start}>Pay {units(total, 'USDT')}</button>
          <button type="button" onClick={() => setMethod(null)} className="flex items-center justify-center gap-1 text-sm font-semibold text-neutral-500 hover:text-neutral-800">
            <ChevronLeft className="w-4 h-4" />Choose another method
          </button>
        </div>
      )}

      {steps.running && (
        <div className="flex flex-col gap-4">
          <Steps items={['Payment detected', 'Confirmed on-chain', 'Order paid']} done={steps.done} />
          {steps.finished && (
            <button type="button" className={`${BTN} !bg-neutral-950 hover:!bg-neutral-800`} onClick={() => { steps.reset(); setMethod(null) }}>
              Start again
            </button>
          )}
        </div>
      )}
    </Widget>
  )
}

const AMOUNTS = [100, 250, 500, 1_000]

/** A platform's cashier: deposit with crypto, or withdraw to a verified wallet. */
export const CashierWidget = () => {
  const [balance, setBalance] = useState(1_240)
  const [mode, setMode] = useState<'deposit' | 'withdraw'>('deposit')
  const [amount, setAmount] = useState(500)
  const [coin, setCoin] = useState<Coin>('USDT')
  const steps = useSteps(4)
  const items = mode === 'deposit'
    ? ['Payment detected', 'Rate locked', 'Wallet screened', 'Credited to balance']
    : ['Wallet screened', 'Converted from fiat', 'Sent on-chain', 'Claimed']

  // The balance moves once the last step completes
  // The balance moves once the last step completes. The controls are hidden
  // until the reader presses Done, so mode and amount cannot change meanwhile.
  useEffect(() => {
    if (steps.finished) setBalance((b) => (mode === 'deposit' ? b + amount : b - amount))
  }, [steps.finished, mode, amount])

  const segment = (m: typeof mode, label: string) => (
    <button
      type="button"
      aria-pressed={mode === m}
      disabled={steps.running}
      onClick={() => { setMode(m); if (m === 'withdraw' && coin === 'BTC') setCoin('USDT') }}
      className={`flex-1 min-h-[40px] rounded-lg text-sm font-semibold ${mode === m ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-800'}`}
    >
      {label}
    </button>
  )

  return (
    <Widget title="Cashier" sub="Your platform" foot="Deposits fund withdrawals on one balance">
      <div className="flex items-end justify-between">
        <div>
          <p className={LBL}>Balance</p>
          <p className="text-3xl font-semibold tracking-tight text-neutral-900 tabular-nums">{rand(balance)}</p>
        </div>
        <span className="rounded-full bg-success-50 px-2 py-0.5 text-[11px] font-semibold text-success-700">Verified</span>
      </div>

      <div className="flex gap-1 rounded-xl bg-neutral-100 p-1">
        {segment('deposit', 'Deposit')}
        {segment('withdraw', 'Withdraw')}
      </div>

      {!steps.running && (
        <div className="flex flex-col gap-3">
          <p className={LBL}>Amount</p>
          <div className="grid grid-cols-4 gap-1.5">
            {AMOUNTS.map((a) => (
              <button
                key={a}
                type="button"
                aria-pressed={amount === a}
                onClick={() => setAmount(a)}
                className={`min-h-[40px] rounded-lg border text-sm font-semibold ${amount === a ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'}`}
              >
                R{a.toLocaleString('en-US')}
              </button>
            ))}
          </div>
          <p className={LBL}>{mode === 'deposit' ? 'Pay with' : 'Receive in'}</p>
          <div className={`grid gap-1.5 ${mode === 'deposit' ? 'grid-cols-3' : 'grid-cols-2'}`}>
            {(mode === 'deposit' ? (['USDT', 'USDC', 'BTC'] as Coin[]) : (['USDT', 'USDC'] as Coin[])).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={coin === c}
                onClick={() => setCoin(c)}
                className={`min-h-[40px] flex items-center justify-center gap-1.5 rounded-lg border text-sm font-semibold ${coin === c ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'}`}
              >
                <img src={COIN_LOGO[c]} alt="" width={18} height={18} className="w-[18px] h-[18px] rounded-full" />
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-neutral-50 border border-neutral-200 px-3 py-2.5 text-sm">
            <b className="text-neutral-900 tabular-nums">{units(amount, coin)}</b>
            <span className="text-neutral-500">on {NETWORK[coin]}</span>
            <span className="ml-auto flex items-center gap-1 text-[11px] font-semibold text-success-700"><Lock className="w-3 h-3" />{mode === 'deposit' ? 'Rate locked' : 'Verified wallet'}</span>
          </div>
          <button
            type="button"
            className={BTN}
            disabled={mode === 'withdraw' && amount > balance}
            onClick={steps.start}
          >
            {mode === 'deposit' ? `Deposit R${amount.toLocaleString('en-US')}` : `Withdraw R${amount.toLocaleString('en-US')}`}
          </button>
        </div>
      )}

      {steps.running && (
        <div className="flex flex-col gap-4">
          <Steps items={items} done={steps.done} />
          {steps.finished && (
            <button type="button" className={`${BTN} !bg-neutral-950 hover:!bg-neutral-800`} onClick={steps.reset}>Done</button>
          )}
        </div>
      )}
    </Widget>
  )
}
