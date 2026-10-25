import { motion, AnimatePresence } from 'framer-motion'
import { Check, Loader2, Lock, ArrowDownLeft, ArrowUpRight, ShieldCheck, ChevronRight } from 'lucide-react'
import {
  CARD, COIN, LABEL, SWAP, arrive, money,
  useHeroLoop, HeroStage, Rings, FloatingCoin, Counter,
} from './heroKit'

type Fiat = 'ZAR' | 'KES' | 'NGN' | 'USD'

/** How the platform writes each currency it can credit a user in. */
const FIAT: Record<Fiat, (v: number) => string> = {
  ZAR: (v) => `R${money(v)}`,
  KES: (v) => `KSh ${money(v)}`,
  NGN: (v) => `₦${money(v)}`,
  USD: (v) => `$${money(v)}`,
}

/** The ways a user can pay in, as the checkout lists them. */
const METHODS = [
  { name: 'Binance Pay', logo: '/Binance-Logo%20(clean).png' },
  { name: 'VALR Pay', logo: '/valr_logo%20(clean).png' },
  { name: 'WalletConnect', logo: '/walletconnect-logo.svg' },
  { name: 'USDT on Tron', logo: '/usdt-logo.svg' },
]

type Deposit = { kind: 'deposit'; ref: string; amount: number; fiat: Fiat; method: number }
type Payout = { kind: 'payout'; ref: string; amount: number; fiat: Fiat; asset: 'usdt' | 'usdc'; network: string; perCoin: number; to: string }

/**
 * Illustrative money in and out, alternating, one in each settlement
 * currency. A payout is funded from the platform's fiat balance and arrives
 * as stablecoin; `perCoin` is that currency per coin.
 */
const EVENTS: (Deposit | Payout)[] = [
  { kind: 'deposit', ref: 'DEP-20418', amount: 2_000, fiat: 'ZAR', method: 0 },
  { kind: 'payout', ref: 'PO-88213', amount: 6_500, fiat: 'KES', asset: 'usdt', network: 'Tron', perCoin: 129.5, to: 'TQn9…x7Fk' },
  { kind: 'deposit', ref: 'DEP-20420', amount: 80_000, fiat: 'NGN', method: 2 },
  { kind: 'payout', ref: 'PO-88214', amount: 120, fiat: 'USD', asset: 'usdc', network: 'Solana', perCoin: 1, to: '7xKX…9sDm' },
]

/** The user's balance before the loop starts, in each currency. */
const BALANCE_START: Record<Fiat, number> = { ZAR: 1_250, KES: 18_400, NGN: 46_500, USD: 385 }

const PHASES = ['moving', 'confirmed', 'settled'] as const

/**
 * The Platforms hero: a user's wallet on a platform takes a deposit through
 * the Ezeebit checkout, then pays a withdrawal out as stablecoin, with the
 * platform hearing about each through a signed webhook. The platform never
 * holds the crypto either way.
 */
const PlatformsHeroVisual = () => {
  const { ref, step, still } = useHeroLoop(2000)
  const phase = still ? 'settled' : PHASES[step % 3]
  const event = EVENTS[Math.floor(step / 3) % EVENTS.length]
  const fmt = FIAT[event.fiat]
  const done = phase !== 'moving'
  const settled = phase === 'settled'
  const isDeposit = event.kind === 'deposit'
  const completed = Math.floor((step + 1) / 3)
  // The balance follows the event's currency: deposits in that currency add, payouts take away
  const balance = BALANCE_START[event.fiat] + Array.from({ length: completed }, (_, i) => EVENTS[i % EVENTS.length])
    .filter((e) => e.fiat === event.fiat)
    .reduce((sum, e) => sum + (e.kind === 'deposit' ? e.amount : -e.amount), 0)

  return (
    <HeroStage ref={ref} label="A platform's wallet taking a crypto deposit through the Ezeebit checkout and paying a withdrawal out in stablecoin, with a signed webhook to the platform for each.">
      <Rings x={300} y={260} still={still} />

      <FloatingCoin src="/usdt-logo.svg" x={470} y={40} delay={0} still={still} />
      <FloatingCoin src="/usdc-logo.svg" x={372} y={420} delay={0.5} still={still} />
      <FloatingCoin src="/btc-logo.svg" x={484} y={404} delay={1} still={still} />

      {/* ── The user's wallet on the platform ── */}
      <motion.div className={`absolute ${CARD} overflow-hidden`} style={{ left: 0, top: 24, width: 264 }} {...arrive(0.2, 'left')}>
        <div className="h-9 px-3 flex items-center gap-2 border-b border-neutral-100 bg-neutral-50/80">
          <span className="flex gap-1">
            {[0, 1, 2].map((i) => <span key={i} className="w-2 h-2 rounded-full bg-neutral-300" />)}
          </span>
          <span className="flex-1 mx-3 h-5 rounded-md bg-white border border-neutral-200 flex items-center gap-1 px-2 text-[10px] text-neutral-500">
            <Lock className="w-2.5 h-2.5" /> yourplatform.com/wallet
          </span>
        </div>
        <div className="p-4">
          <p className={`${LABEL} mb-1.5`}>Your wallet</p>
          <p className="text-[11px] text-neutral-500">Available balance</p>
          <p className="text-[26px] font-semibold text-neutral-900 tracking-tight tabular-nums mb-3">
            {/* Re-keyed per currency, so a new currency swaps the figure rather than counting across from the last one */}
            <Counter key={event.fiat} value={balance} format={fmt} still={still} />
          </p>
          {/* Whichever way the money is moving is the button in use */}
          <div className="flex gap-2 mb-4">
            {([['Deposit', ArrowDownLeft, isDeposit], ['Withdraw', ArrowUpRight, !isDeposit]] as const).map(([label, Icon, on]) => (
              <span
                key={label}
                className={`flex-1 h-8 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors duration-300 ${
                  on ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" /> {label}
              </span>
            ))}
          </div>
          <p className={`${LABEL} mb-2`}>Recent</p>
          <div className="h-10 relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={`${event.ref}${settled}`} {...SWAP} className="absolute inset-0 flex items-center gap-2.5">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${settled ? 'bg-success-50 text-success-600' : 'bg-neutral-100 text-neutral-400'}`}>
                  {settled ? <Check className="w-4 h-4" /> : <Loader2 className="w-4 h-4 animate-spin" />}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-neutral-900">{isDeposit ? 'Crypto deposit' : 'Withdrawal'}</p>
                  <p className="text-[10px] text-neutral-500">
                    {isDeposit ? (settled ? 'Credited' : 'Pending') : (settled ? `Sent as ${event.asset.toUpperCase()}` : 'Processing')}
                  </p>
                </div>
                <span className={`text-[12px] font-semibold tabular-nums ${!settled ? 'text-neutral-400' : isDeposit ? 'text-success-700' : 'text-neutral-900'}`}>
                  {isDeposit ? '+' : '−'}{fmt(event.amount)}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* ── The Ezeebit screen the user is on: the checkout to pay in, the payout widget to cash out ── */}
      <motion.div className={`absolute ${CARD} p-4`} style={{ left: 284, top: 112, width: 268 }} {...arrive(0.4)}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={event.ref} {...SWAP} className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[13px] font-semibold text-neutral-900">{isDeposit ? 'Deposit with crypto' : 'Withdraw to your wallet'}</p>
              <p className="text-[11px] text-neutral-500">
                Amount: <b className="text-neutral-800">{fmt(event.amount)}</b>
              </p>
            </div>
            <img src="/ezeebit-icon-blue.png" alt="" className="w-6 h-6 object-contain" />
          </motion.div>
        </AnimatePresence>

        <div className="relative h-[172px]">
          <AnimatePresence mode="wait" initial={false}>
            {event.kind === 'deposit' && !done && (
              <motion.div key={`list${event.ref}`} {...SWAP} className="absolute inset-0 space-y-1.5">
                {METHODS.map((m, i) => {
                  const picked = i === event.method
                  return (
                    <div
                      key={m.name}
                      className={`h-10 rounded-xl border flex items-center gap-2.5 px-2.5 ${
                        picked ? 'border-primary-500 bg-primary-50/60' : 'border-neutral-200 bg-white'
                      }`}
                    >
                      <img src={m.logo} alt="" className="w-6 h-6 rounded-lg object-contain bg-white" />
                      <span className="flex-1 text-[12px] font-medium text-neutral-800">{m.name}</span>
                      {picked
                        ? <Loader2 className="w-4 h-4 text-primary-500 animate-spin" />
                        : <ChevronRight className="w-4 h-4 text-neutral-300" />}
                    </div>
                  )
                })}
              </motion.div>
            )}

            {event.kind === 'payout' && !done && (
              <motion.div key={`claim${event.ref}`} {...SWAP} className="absolute inset-0">
                <p className="text-[11px] text-neutral-500">You receive</p>
                <p className="text-[22px] font-bold tracking-tight text-neutral-900 leading-tight mb-3">
                  {money(event.amount / event.perCoin)} <span className="text-sm text-primary-600">{event.asset.toUpperCase()}</span>
                </p>
                <div className="flex items-center gap-2 rounded-xl bg-neutral-50 px-2.5 py-2 mb-2">
                  <img src={`/${event.asset}-logo.svg`} alt="" className={`w-6 h-6 ${COIN}`} />
                  <span className="text-xs font-medium text-neutral-800">{event.asset.toUpperCase()}</span>
                  <span className="text-xs text-neutral-400">on</span>
                  <span className="text-xs font-medium text-neutral-800">{event.network}</span>
                </div>
                <div className="rounded-xl border border-neutral-200 px-2.5 py-2 mb-3">
                  <p className="text-[9px] uppercase tracking-[0.08em] text-neutral-400">Your wallet address</p>
                  <p className="text-xs font-medium text-neutral-800 font-mono">{event.to}</p>
                </div>
                <p className="flex items-center gap-1.5 text-[11px] text-primary-600">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Sending on-chain
                </p>
              </motion.div>
            )}

            {done && (
              <motion.div key={`done${event.ref}`} {...SWAP} className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <motion.span
                  className="w-14 h-14 rounded-full bg-success-50 text-success-600 flex items-center justify-center mb-3"
                  initial={still ? false : { scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                >
                  <Check className="w-7 h-7" strokeWidth={2.5} />
                </motion.span>
                {event.kind === 'deposit' ? (
                  <>
                    <p className="text-[15px] font-semibold text-neutral-900">Payment confirmed</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5 flex items-center gap-1.5">
                      <img src={METHODS[event.method].logo} alt="" className="w-4 h-4 rounded object-contain" />
                      Paid with {METHODS[event.method].name}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-[15px] font-semibold text-neutral-900">Payout sent</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5 flex items-center gap-1.5">
                      <img src={`/${event.asset}-logo.svg`} alt="" className={`w-4 h-4 ${COIN}`} />
                      {money(event.amount / event.perCoin)} {event.asset.toUpperCase()} on {event.network}
                    </p>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── The signed webhook the platform receives for each ── */}
      <motion.div className={`absolute ${CARD} px-3.5 py-3`} style={{ left: 0, top: 316, width: 264 }} {...arrive(0.6, 'left')}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={`${event.ref}${done}`} {...SWAP}>
            <div className="flex items-center justify-between mb-2">
              <span className={LABEL}>Webhook</span>
              <span className={`text-[10px] font-semibold rounded-full px-2 py-0.5 ${done ? 'bg-success-50 text-success-700' : 'bg-neutral-100 text-neutral-500'}`}>
                {done ? '200 OK' : 'Waiting'}
              </span>
            </div>
            <pre className="font-mono text-[10px] leading-[1.55] text-neutral-600 bg-neutral-50 rounded-lg px-2.5 py-2 mb-2 whitespace-pre">
              <span className="text-primary-600 font-semibold">POST</span> /webhooks/{isDeposit ? 'ezeebit' : 'payouts'}{'\n'}
              {'{ '}"status": <span className={done ? 'text-success-700' : 'text-neutral-400'}>"{done ? 'success' : 'pending'}"</span>,{'\n'}
              {isDeposit ? (
                <>
                  {'  '}"tradeOrderNo": "{event.ref}",{'\n'}
                  {'  '}"currency": "{event.fiat}",{'\n'}
                  {'  '}"amount": "{event.amount.toFixed(2)}" {'}'}
                </>
              ) : (
                <>
                  {'  '}"externalReference": "{event.ref}",{'\n'}
                  {'  '}"fiatCurrency": "{event.fiat}",{'\n'}
                  {'  '}"fiatAmount": "{event.amount.toFixed(2)}" {'}'}
                </>
              )}
            </pre>
            <p className={`text-[10px] flex items-center gap-1 ${done ? 'text-success-700' : 'text-neutral-400'}`}>
              <ShieldCheck className="w-3.5 h-3.5" /> {done ? 'Signature verified' : isDeposit ? 'Waiting for the payment' : 'Waiting for the transfer'}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </HeroStage>
  )
}

export default PlatformsHeroVisual
