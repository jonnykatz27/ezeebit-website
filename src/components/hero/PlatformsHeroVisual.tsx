import { motion, AnimatePresence } from 'framer-motion'
import { Check, Loader2, Lock, ArrowDownLeft, ArrowUpRight, ShieldCheck, ChevronRight } from 'lucide-react'
import {
  CARD, LABEL, SWAP, arrive, money,
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

/** The ways a user can pay, as the checkout lists them. */
const METHODS = [
  { name: 'Binance Pay', logo: '/Binance-Logo%20(clean).png' },
  { name: 'VALR Pay', logo: '/valr_logo%20(clean).png' },
  { name: 'WalletConnect', logo: '/walletconnect-logo.svg' },
  { name: 'USDT on Tron', logo: '/usdt-logo.svg' },
]

/** Illustrative deposits, one in each settlement currency, each paid a different way. */
const DEPOSITS = [
  { ref: 'DEP-20418', amount: 2_000, fiat: 'ZAR', method: 0 },
  { ref: 'DEP-20419', amount: 15_000, fiat: 'KES', method: 3 },
  { ref: 'DEP-20420', amount: 80_000, fiat: 'NGN', method: 2 },
  { ref: 'DEP-20421', amount: 150, fiat: 'USD', method: 1 },
] as const

/** The user's balance before the loop starts, in each currency. */
const BALANCE_START: Record<Fiat, number> = { ZAR: 1_250, KES: 8_400, NGN: 46_500, USD: 85 }

const PHASES = ['paying', 'confirmed', 'credited'] as const

/**
 * The Platforms hero: a user funds their account on a platform through the
 * Ezeebit checkout, the platform receives a signed webhook, and the user's
 * balance is credited a moment later.
 */
const PlatformsHeroVisual = () => {
  const { ref, step, still } = useHeroLoop(2000)
  const phase = still ? 'credited' : PHASES[step % 3]
  const deposit = DEPOSITS[Math.floor(step / 3) % DEPOSITS.length]
  const fmt = FIAT[deposit.fiat]
  const method = METHODS[deposit.method]
  const paid = phase !== 'paying'
  const completed = Math.floor((step + 1) / 3)
  // The balance follows the deposit's currency, adding up only the deposits made in it
  const balance = BALANCE_START[deposit.fiat] + Array.from({ length: completed }, (_, i) => DEPOSITS[i % DEPOSITS.length])
    .filter((d) => d.fiat === deposit.fiat)
    .reduce((sum, d) => sum + d.amount, 0)

  return (
    <HeroStage ref={ref} label="A platform taking a crypto deposit: the user pays through the Ezeebit checkout, the platform receives a signed webhook, and the user's balance is credited.">
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
            <Counter key={deposit.fiat} value={balance} format={fmt} still={still} />
          </p>
          <div className="flex gap-2 mb-4">
            <span className="flex-1 h-8 rounded-lg bg-primary-500 text-white text-xs font-semibold flex items-center justify-center gap-1">
              <ArrowDownLeft className="w-3.5 h-3.5" /> Deposit
            </span>
            <span className="flex-1 h-8 rounded-lg bg-neutral-100 text-neutral-700 text-xs font-semibold flex items-center justify-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> Withdraw
            </span>
          </div>
          <p className={`${LABEL} mb-2`}>Recent</p>
          <div className="h-10 relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={`${deposit.ref}${phase === 'credited'}`} {...SWAP} className="absolute inset-0 flex items-center gap-2.5">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${phase === 'credited' ? 'bg-success-50 text-success-600' : 'bg-neutral-100 text-neutral-400'}`}>
                  {phase === 'credited' ? <Check className="w-4 h-4" /> : <Loader2 className="w-4 h-4 animate-spin" />}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-neutral-900">Crypto deposit</p>
                  <p className="text-[10px] text-neutral-500">{phase === 'credited' ? 'Credited' : 'Pending'}</p>
                </div>
                <span className={`text-[12px] font-semibold tabular-nums ${phase === 'credited' ? 'text-success-700' : 'text-neutral-400'}`}>
                  +{fmt(deposit.amount)}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* ── The Ezeebit checkout the user pays through ── */}
      <motion.div className={`absolute ${CARD} p-4`} style={{ left: 284, top: 112, width: 268 }} {...arrive(0.4)}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[13px] font-semibold text-neutral-900">Deposit with crypto</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p key={deposit.ref} {...SWAP} className="text-[11px] text-neutral-500">
                Amount: <b className="text-neutral-800">{fmt(deposit.amount)}</b>
              </motion.p>
            </AnimatePresence>
          </div>
          <img src="/ezeebit-icon-blue.png" alt="" className="w-6 h-6 object-contain" />
        </div>

        <div className="relative h-[172px]">
          <AnimatePresence mode="wait" initial={false}>
            {!paid ? (
              <motion.div key={`list${deposit.ref}`} {...SWAP} className="absolute inset-0 space-y-1.5">
                {METHODS.map((m, i) => {
                  const picked = i === deposit.method
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
            ) : (
              <motion.div key={`paid${deposit.ref}`} {...SWAP} className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <motion.span
                  className="w-14 h-14 rounded-full bg-success-50 text-success-600 flex items-center justify-center mb-3"
                  initial={still ? false : { scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                >
                  <Check className="w-7 h-7" strokeWidth={2.5} />
                </motion.span>
                <p className="text-[15px] font-semibold text-neutral-900">Payment confirmed</p>
                <p className="text-[11px] text-neutral-500 mt-0.5 flex items-center gap-1.5">
                  <img src={method.logo} alt="" className="w-4 h-4 rounded object-contain" />
                  Paid with {method.name}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── The signed webhook the platform receives, in the shape the API sends it ── */}
      <motion.div className={`absolute ${CARD} px-3.5 py-3`} style={{ left: 0, top: 316, width: 264 }} {...arrive(0.6, 'left')}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={`${deposit.ref}${paid}`} {...SWAP}>
            <div className="flex items-center justify-between mb-2">
              <span className={LABEL}>Webhook</span>
              <span className={`text-[10px] font-semibold rounded-full px-2 py-0.5 ${paid ? 'bg-success-50 text-success-700' : 'bg-neutral-100 text-neutral-500'}`}>
                {paid ? '200 OK' : 'Waiting'}
              </span>
            </div>
            <pre className="font-mono text-[10px] leading-[1.55] text-neutral-600 bg-neutral-50 rounded-lg px-2.5 py-2 mb-2 whitespace-pre">
              <span className="text-primary-600 font-semibold">POST</span> /webhooks/ezeebit{'\n'}
              {'{ '}"status": <span className={paid ? 'text-success-700' : 'text-neutral-400'}>"{paid ? 'success' : 'pending'}"</span>,{'\n'}
              {'  '}"tradeOrderNo": "{deposit.ref}",{'\n'}
              {'  '}"currency": "{deposit.fiat}",{'\n'}
              {'  '}"amount": "{deposit.amount.toFixed(2)}" {'}'}
            </pre>
            <p className={`text-[10px] flex items-center gap-1 ${paid ? 'text-success-700' : 'text-neutral-400'}`}>
              <ShieldCheck className="w-3.5 h-3.5" /> {paid ? 'Signature verified' : 'Waiting for the payment'}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </HeroStage>
  )
}

export default PlatformsHeroVisual
