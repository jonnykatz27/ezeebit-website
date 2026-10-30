import { AnimatePresence } from 'framer-motion'
import { motion } from '../../lib/motion'
import { ArrowDown, Check, Headphones, Lock } from 'lucide-react'
import {
  CARD, COIN, LABEL, SWAP, EASE, arrive, money, rands,
  useHeroLoop, HeroStage, Halo, Counter, LiveTag,
} from './heroKit'

/** Illustrative trades the desk quotes, one after another. */
const TRADES = [
  { side: 'sell', asset: 'usdt', qty: 300_000, rate: 18.45, rateDp: 4, qtyDp: 0 },
  { side: 'buy', asset: 'btc', qty: 2.5, rate: 1_948_000, rateDp: 0, qtyDp: 1 },
] as const

/** Ticks per trade: three with a live price, three locked, two executed. */
const CYCLE = 8
/** Tiny, repeatable moves in the live price. */
const WOBBLE = [0, 0.0006, -0.0004, 0.0009]

const SPARK = 'M0 24 C 12 20, 20 28, 34 22 S 56 10, 70 14 S 94 24, 108 16 S 130 4, 150 8'

/**
 * The OTC hero: a firm quote with a live price, locked for 30 seconds,
 * then executed and settled the same day, with the dealer alongside.
 */
const OTCHeroVisual = () => {
  const { ref, step, still } = useHeroLoop(1300)
  const tick = still ? 3 : step % CYCLE
  const trade = TRADES[Math.floor(step / CYCLE) % TRADES.length]
  const phase = tick < 3 ? 'live' : tick < 6 ? 'locked' : 'done'
  const rate = trade.rate * (1 + (phase === 'live' ? WOBBLE[tick % WOBBLE.length] : WOBBLE[2]))
  const zar = trade.qty * rate
  const seconds = phase === 'locked' ? [30, 20, 10][tick - 3] : 0
  const sym = trade.asset.toUpperCase()

  const give = trade.side === 'sell'
    ? { label: 'You sell', value: `${money(trade.qty, trade.qtyDp)} ${sym}`, coin: `/${trade.asset}-logo.svg` }
    : { label: 'You pay', value: null, coin: '/za-flag.svg' }
  const get = trade.side === 'sell'
    ? { label: 'You receive', value: null, coin: '/za-flag.svg' }
    : { label: 'You receive', value: `${money(trade.qty, trade.qtyDp)} ${sym}`, coin: `/${trade.asset}-logo.svg` }

  const dealer = {
    live: `Here’s a firm price for ${money(trade.qty, trade.qtyDp)} ${sym}.`,
    locked: 'Rate locked for 30 seconds. Accept when ready.',
    done: 'Done. Settling to your account today.',
  }[phase]

  // The rand leg counts as the price moves; the asset leg is fixed
  const amount = (value: string | null) =>
    value ?? <Counter key={trade.asset} value={zar} format={rands} still={still} />

  return (
    <HeroStage ref={ref} label="An OTC quote with a live price, locked for 30 seconds, then executed and settled the same day, with a dealer handling the trade.">
      <Halo x={280} y={220} />


      {/* ── The quote ── */}
      <motion.div className={`absolute ${CARD} p-5`} style={{ left: 110, top: 30, width: 340 }} {...arrive(0.25)}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-neutral-900">OTC quote</span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={phase} {...SWAP}>
              {phase === 'live' && <LiveTag still={still}>Live price</LiveTag>}
              {phase === 'locked' && (
                <span className="flex items-center gap-1 text-[11px] font-semibold text-primary-700 bg-primary-50 rounded-full px-2 py-0.5">
                  <Lock className="w-3 h-3" /> Locked · {seconds}s
                </span>
              )}
              {phase === 'done' && (
                <span className="flex items-center gap-1 text-[11px] font-semibold text-success-700 bg-success-50 rounded-full px-2 py-0.5">
                  <Check className="w-3 h-3" /> Executed
                </span>
              )}
            </motion.span>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={trade.asset} {...SWAP}>
            {[give, get].map((s, i) => (
              <div key={i}>
                {i === 1 && (
                  <div className="flex justify-center -my-1.5 relative z-10">
                    <span className="w-8 h-8 rounded-full bg-white border border-neutral-200 shadow-sm text-primary-600 flex items-center justify-center">
                      <ArrowDown className="w-4 h-4" />
                    </span>
                  </div>
                )}
                <div className="rounded-xl bg-neutral-50 px-3.5 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-neutral-500 mb-0.5">{s.label}</p>
                    <p className="text-xl font-bold tracking-tight text-neutral-900">{amount(s.value)}</p>
                  </div>
                  <img src={s.coin} alt="" className={`w-9 h-9 ${COIN}`} />
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-3 flex items-center justify-between text-[11px]">
          <span className="text-neutral-500">Rate</span>
          <span className="font-medium text-neutral-800 tabular-nums">1 {sym} = R{money(rate, trade.rateDp)}</span>
        </div>

        <div className="mt-3 h-1 rounded-full bg-neutral-100 overflow-hidden">
          <motion.div
            className="h-full bg-primary-500 rounded-full"
            initial={false}
            animate={{ width: phase === 'locked' ? `${(seconds / 30) * 100}%` : phase === 'done' ? '0%' : '100%' }}
            transition={{ duration: 1.3, ease: 'linear' }}
            style={{ opacity: phase === 'live' ? 0.25 : 1 }}
          />
        </div>

        <div className="mt-4 relative h-10">
          <AnimatePresence mode="wait" initial={false}>
            {phase === 'done' ? (
              <motion.div key="done" {...SWAP} className="absolute inset-0 rounded-xl bg-success-50 text-success-700 text-sm font-semibold flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4" /> Settling same day in ZAR
              </motion.div>
            ) : (
              <motion.div key="cta" {...SWAP} className={`absolute inset-0 rounded-xl text-sm font-semibold flex items-center justify-center transition-colors ${phase === 'locked' ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                {phase === 'locked' ? 'Accept quote' : 'Lock rate'}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── The market ── */}
      <motion.div className={`absolute ${CARD} p-3.5`} style={{ left: 364, top: 380, width: 196 }} {...arrive(0.45, 'right')}>
        <div className="flex items-center justify-between mb-0.5">
          <span className={LABEL}>{sym} / ZAR</span>
          <span className="text-[10px] font-semibold text-success-600">▲ 0.12%</span>
        </div>
        <p className="text-base font-bold text-neutral-900 tabular-nums">R{money(rate, trade.rateDp === 4 ? 2 : 0)}</p>
        <svg viewBox="0 0 150 30" className="w-full h-6 mt-0.5" fill="none">
          <motion.path
            key={trade.asset}
            d={SPARK}
            className="stroke-primary-500"
            strokeWidth={2}
            strokeLinecap="round"
            initial={{ pathLength: still ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: EASE }}
          />
        </svg>
      </motion.div>

      {/* ── The dealer ── */}
      <motion.div className={`absolute ${CARD} p-3.5`} style={{ left: 0, top: 380, width: 262 }} {...arrive(0.6, 'left')}>
        <div className="flex items-start gap-2.5">
          <span className="w-9 h-9 rounded-full bg-primary-500 text-white flex items-center justify-center shrink-0">
            <Headphones className="w-4 h-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className={`${LABEL} mb-1`}>Your dealer</p>
            <div className="relative h-9">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p key={`${phase}${trade.asset}`} {...SWAP} className="absolute inset-0 text-[12px] leading-snug text-neutral-700">
                  {dealer}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </HeroStage>
  )
}

export default OTCHeroVisual
