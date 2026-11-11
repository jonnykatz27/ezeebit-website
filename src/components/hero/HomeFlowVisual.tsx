import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { motion } from '../../lib/motion'
import { SWAP, COIN, EASE, arrive, money, coinLogo, useHeroLoop, Counter, LiveTag } from './heroKit'
import { PortalBalanceCard } from '../portal/PortalUI'

/**
 * Each loop is one merchant, settling in the next currency in turn, so the
 * balance card shows every fiat currency a merchant can be paid out in.
 * `perZar` converts the loop's rand amounts; the rates are illustrative.
 */
const CURRENCIES = [
  { code: 'ZAR', flag: '/za-flag.svg', perZar: 1, fmt: (v: number) => `R ${money(v)}` },
  { code: 'KES', flag: '/ke-flag.svg', perZar: 7.05, fmt: (v: number) => `KSh ${money(v)}` },
  { code: 'NGN', flag: '/ng-flag.svg', perZar: 84.5, fmt: (v: number) => `₦${money(v)}` },
  { code: 'USD', flag: '/us-flag.svg', perZar: 0.0542, fmt: (v: number) => `$${money(v)}` },
] as const

/** Rand per unit of each payout stablecoin, so payouts come off the fiat balance. Illustrative. */
const STABLE_ZAR = { usdt: 18.45, usdc: 18.45, zarp: 1, zaru: 1 } as const
type Stable = keyof typeof STABLE_ZAR

const START = { zar: 714_602.25, usdt: 50_000 }

/** How long each event holds the screen before the next one arrives. */
const BEAT = 4000

type Event =
  | { kind: 'in'; method: string; channel: string; asset: string; zar: number }
  | { kind: 'out'; to: string; network: string; asset: Stable; amount: number }

/**
 * One loop of activity: pay-ins from each channel, and payouts in each
 * stablecoin. A USDT pay-in settles to the USDT wallet and a USDT payout
 * comes out of it; every other pay-in settles to fiat, and the other
 * stablecoins are paid out of the fiat balance, as the Payouts page
 * describes. Long enough that the four rows each list shows never repeat.
 */
const LOOP: Event[] = [
  { kind: 'in', method: 'Ezeebit Pay', channel: 'In-store', asset: 'btc', zar: 4_500 },
  { kind: 'out', to: 'Player withdrawal', network: 'Tron', asset: 'usdt', amount: 250 },
  { kind: 'in', method: 'Binance Pay', channel: 'Online checkout', asset: 'usdt', zar: 12_800 },
  { kind: 'in', method: 'Player deposit', channel: 'Platform', asset: 'usdc', zar: 2_150 },
  { kind: 'out', to: 'Seller payout', network: 'Ethereum', asset: 'zarp', amount: 4_500 },
  { kind: 'in', method: 'Luno Pay', channel: 'Online checkout', asset: 'eth', zar: 1_899 },
  { kind: 'out', to: 'Trader withdrawal', network: 'Solana', asset: 'usdc', amount: 1_500 },
  { kind: 'in', method: 'VALR Pay', channel: 'In-store', asset: 'usdt', zar: 7_350 },
  { kind: 'in', method: 'Trader top-up', channel: 'Platform', asset: 'usdt', zar: 25_000 },
  { kind: 'out', to: 'Creator payout', network: 'Solana', asset: 'zaru', amount: 2_000 },
  { kind: 'in', method: 'WalletConnect Pay', channel: 'Online checkout', asset: 'usdc', zar: 3_420 },
  { kind: 'out', to: 'Affiliate payout', network: 'Ethereum', asset: 'usdc', amount: 320 },
]

const mod = (n: number, m: number) => ((n % m) + m) % m

/** Whether an event moves the USDT wallet rather than the fiat one. */
const usesUsdt = (e: Event) => e.asset === 'usdt'

/** Both wallets after the first `k` events of a loop: fiat in rand, USDT in units. */
function walletsAfter(k: number) {
  let zar = START.zar
  let usdt = START.usdt
  for (const e of LOOP.slice(0, k)) {
    if (e.kind === 'in') {
      if (usesUsdt(e)) usdt += e.zar / STABLE_ZAR.usdt
      else zar += e.zar
    } else if (usesUsdt(e)) usdt -= e.amount
    else zar -= e.amount * STABLE_ZAR[e.asset]
  }
  return { zar, usdt }
}

/** The `count` latest events of a kind before `step`, newest first, keyed by the step each happened on. */
function recent<K extends Event['kind']>(kind: K, step: number, count: number) {
  const found: { at: number; e: Extract<Event, { kind: K }> }[] = []
  for (let at = step - 1; found.length < count && at > step - 1 - LOOP.length * count; at--) {
    const e = LOOP[mod(at, LOOP.length)]
    if (e.kind === kind) found.push({ at, e: e as Extract<Event, { kind: K }> })
  }
  return found
}

/**
 * The hero's panels, in dark glass: a faint white wash over the hero's own
 * navy, a hairline edge, and a blur, so the blue glow behind shows through
 * and the panels read as part of the hero rather than cards laid on top.
 */
const FLOW_CARD =
  'rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] backdrop-blur-md shadow-[0_30px_80px_-40px_rgba(0,116,228,0.6)]'
const LINE = 'border-white/[0.08]'

/** Text on the glass: white for what matters, a soft grey for the detail. */
const TEXT = 'text-white'
const SUBTLE = 'text-neutral-400'
const DONE = 'text-emerald-400'

/** Rows each list shows: two on a phone, four beside the balance card. */
const ROWS = 4

/**
 * A glass panel with a title row and a list that new rows push down.
 * On a wide screen it stretches to the balance card's height and splits it
 * between four rows; the list itself adds no height, so the balance card
 * alone sets the row.
 */
const Feed = ({ title, tag, children }: { title: string; tag: ReactNode; children: ReactNode }) => (
  <div className={`${FLOW_CARD} font-ui overflow-hidden flex flex-col lg:flex-1`}>
    <div className={`flex items-center justify-between px-4 pt-3.5 pb-3 border-b ${LINE}`}>
      <p className={`text-[14px] font-semibold ${TEXT}`}>{title}</p>
      {tag}
    </div>
    <div className="relative h-[128px] lg:h-0 lg:flex-1 overflow-hidden px-4">{children}</div>
  </div>
)

const ROW = { initial: { opacity: 0, y: -12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.7, ease: EASE } }
const ROW_CLASS = `h-16 lg:h-1/4 flex items-center gap-3 border-b ${LINE} last:border-b-0`

/** The caption over each panel, echoing the headline. */
const Caption = ({ children }: { children: ReactNode }) => (
  <p className="h-6 mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary-400 text-center lg:text-left">{children}</p>
)

/** What a connector carries across: the currency or coin the money moves in. */
type Token = { src: string; code: string }

/**
 * The line between two panels. Each time money moves that way, the currency
 * or coin it moves in travels along it, named underneath: across on a wide
 * screen, down when the panels stack.
 */
const Connector = ({ fire, still, token }: { fire: number | null; still: boolean; token: Token | null }) => (
  // Centred on the cards, not on the captions above them
  <div aria-hidden="true" className="relative h-16 lg:h-16 lg:self-center lg:mt-9">
    <span className="absolute left-1/2 top-1 bottom-3 w-px -translate-x-1/2 bg-white/15 lg:left-1 lg:right-3 lg:top-1/2 lg:bottom-auto lg:w-auto lg:h-px lg:translate-x-0 lg:-translate-y-1/2" />
    <ChevronDown className="absolute left-1/2 bottom-0 -translate-x-1/2 w-4 h-4 text-primary-400 lg:hidden" />
    <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400 hidden lg:block" />
    {fire !== null && !still && token && (
      <>
        <motion.span
          key={`x${fire}`}
          className="absolute top-1/2 -mt-[11px] hidden lg:flex flex-col items-center"
          initial={{ left: '0%', opacity: 0 }}
          animate={{ left: '62%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.1, ease: 'easeInOut', times: [0, 0.15, 0.8, 1] }}
        >
          <TokenMark token={token} />
        </motion.span>
        <motion.span
          key={`y${fire}`}
          className="absolute left-1/2 -ml-[11px] flex lg:hidden items-center"
          initial={{ top: '0%', opacity: 0 }}
          animate={{ top: '52%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.1, ease: 'easeInOut', times: [0, 0.15, 0.8, 1] }}
        >
          <TokenMark token={token} side />
        </motion.span>
      </>
    )}
  </div>
)

/** The coin or flag on the move, with its code: underneath on the line across, beside it on the line down. */
const TokenMark = ({ token, side = false }: { token: Token; side?: boolean }) => (
  <span className={`flex items-center ${side ? 'flex-row gap-1.5' : 'flex-col gap-1'}`}>
    <img src={token.src} alt="" className="size-[22px] rounded-full object-cover bg-white ring-2 ring-[#0b1424] shadow-[0_0_14px_rgba(61,154,237,0.75)]" />
    <span className="text-[9px] font-semibold tracking-[0.08em] text-primary-300 leading-none">{token.code}</span>
  </span>
)

/** A brief wash over the wallet that just changed. */
const Glow = ({ on, id }: { on: boolean; id: number }) =>
  on ? (
    <motion.span
      key={id}
      className="absolute -inset-x-2 -inset-y-1.5 rounded-xl bg-primary-400/15"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.6, ease: 'easeOut' }}
    />
  ) : null

/**
 * The homepage hero: crypto paid in on the left lands on one balance in the
 * Merchant Portal, and goes back out as stablecoin payouts on the right. One
 * thing happens at a time, with a pause between, and every loop is another
 * merchant in another settlement currency.
 */
const HomeFlowVisual = () => {
  const { ref, step, still } = useHeroLoop(BEAT)

  // Money moves left to right. A pay-in's row comes first, then its currency
  // crosses and the balance moves; a payout leaves the balance first, then its
  // coin crosses and the payout lands at the top of the list.
  const last = step > 0 ? LOOP[mod(step - 1, LOOP.length)] : null
  const [settled, setSettled] = useState(step)
  const [paid, setPaid] = useState(step)
  useEffect(() => {
    if (still) { setSettled(step); setPaid(step); return }
    const out = last?.kind === 'out'
    const a = window.setTimeout(() => setSettled(step), out ? 0 : 1000)
    const b = window.setTimeout(() => setPaid(step), out ? 1100 : 0)
    return () => { window.clearTimeout(a); window.clearTimeout(b) }
  }, [step, still, last?.kind])

  // The newest payout is sending, then claimed a beat after it lands
  const lastPaid = paid > 0 ? LOOP[mod(paid - 1, LOOP.length)] : null
  const [claimed, setClaimed] = useState(true)
  useEffect(() => {
    if (still || lastPaid?.kind !== 'out') { setClaimed(true); return }
    setClaimed(false)
    const t = window.setTimeout(() => setClaimed(true), 2000)
    return () => window.clearTimeout(t)
  }, [paid, still, lastPaid?.kind])

  const cur = CURRENCIES[mod(Math.floor(step / LOOP.length), CURRENCIES.length)]
  const balCur = CURRENCIES[mod(Math.floor(settled / LOOP.length), CURRENCIES.length)]
  const wallets = walletsAfter(mod(settled, LOOP.length))
  const fiat = wallets.zar * balCur.perZar
  const usdt = wallets.usdt
  const total = fiat + usdt * STABLE_ZAR.usdt * balCur.perZar

  // The wallet the last settled event moved, for its glow
  const landed = settled > 0 ? LOOP[mod(settled - 1, LOOP.length)] : null
  const glowUsdt = landed ? usesUsdt(landed) : false

  // What crosses each line: the currency a pay-in settles in, the coin a payout goes out in
  const inToken: Token | null =
    last?.kind === 'in' ? (usesUsdt(last) ? { src: '/usdt-round.svg', code: 'USDT' } : { src: cur.flag, code: cur.code }) : null
  const outToken: Token | null = last?.kind === 'out' ? { src: coinLogo(last.asset), code: last.asset.toUpperCase() } : null

  // One more than shows: the extra row waits below the clip, so the oldest
  // slides out of view instead of fading over the newest
  const ins = recent('in', step, ROWS + 1)
  const outs = recent('out', paid, ROWS + 1)

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Crypto payments arriving in-store, online and on platforms, landing on one balance in the Ezeebit Merchant Portal in ZAR, KES, NGN or USD, and going back out as payouts in USDT, USDC, ZARP and ZARU."
      className="mx-auto max-w-6xl [&_img]:!mx-0"
    >
      <div className="grid grid-cols-1 max-w-md mx-auto lg:max-w-none lg:grid-cols-[minmax(0,1fr)_80px_minmax(0,1.3fr)_80px_minmax(0,1fr)]">
        <motion.div {...arrive(0.35, 'left')} className="flex flex-col">
          <Caption>Crypto in</Caption>
          <Feed title="Pay-ins" tag={<LiveTag still dark />}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={cur.code} {...SWAP} className="h-full">
                <AnimatePresence mode="popLayout" initial={false}>
                  {ins.map(({ at, e }) => (
                    <motion.div key={at} layout {...ROW} className={ROW_CLASS}>
                      <img src={coinLogo(e.asset)} alt="" className={`w-8 h-8 shrink-0 ${COIN}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-[13px] font-medium truncate ${TEXT}`}>{e.method}</p>
                        <p className={`text-[11px] truncate ${SUBTLE}`}>{e.channel} · {e.asset.toUpperCase()}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`text-[13px] font-semibold tabular-nums ${TEXT}`}>+{cur.fmt(e.zar * cur.perZar)}</p>
                        <p className={`text-[11px] font-medium ${DONE}`}>Paid</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </Feed>
        </motion.div>

        <Connector fire={last?.kind === 'in' ? step : null} still={still} token={inToken} />

        <motion.div {...arrive(0.2)}>
          <Caption>One balance</Caption>
          <div className={`${FLOW_CARD} overflow-hidden`}>
            {/* A new merchant swaps the figures in rather than counting across currencies */}
            <PortalBalanceCard
              total={<Counter key={balCur.code} value={total} format={balCur.fmt} still={still} />}
              fiatShare={(fiat / total) * 100}
              fiat={{
                mark: balCur.flag,
                amount: <Counter key={balCur.code} value={fiat} format={balCur.fmt} still={still} />,
                label: `Fiat wallet · ${balCur.code}`,
              }}
              stable={{
                amount: <Counter key={balCur.code} value={usdt} format={(v) => `${money(v)} USDT`} still={still} />,
                label: 'USDT wallet',
              }}
              flash={{ fiat: <Glow on={!still && !!landed && !glowUsdt} id={settled} />, stable: <Glow on={!still && glowUsdt} id={settled} /> }}
              tone="dark"
            />
          </div>
        </motion.div>

        <Connector fire={last?.kind === 'out' ? step : null} still={still} token={outToken} />

        <motion.div {...arrive(0.5, 'right')} className="flex flex-col">
          <Caption>Crypto out</Caption>
          <Feed title="Payouts" tag={<span className={`text-[11px] font-medium ${SUBTLE}`}>Sent 24/7</span>}>
            <AnimatePresence mode="popLayout" initial={false}>
              {outs.map(({ at, e }) => {
                const sending = at === paid - 1 && !claimed
                return (
                  <motion.div key={at} layout {...ROW} className={ROW_CLASS}>
                    <img src={coinLogo(e.asset)} alt="" className={`w-8 h-8 shrink-0 ${COIN}`} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-[13px] font-medium truncate ${TEXT}`}>{e.to}</p>
                      <p className={`text-[11px] truncate ${SUBTLE}`}>{e.network} · screened</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`text-[13px] font-semibold tabular-nums ${TEXT}`}>{money(e.amount)} {e.asset.toUpperCase()}</p>
                      <p className={`text-[11px] font-medium transition-colors duration-500 ${sending ? 'text-amber-400' : DONE}`}>{sending ? 'Sending' : 'Claimed'}</p>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </Feed>
        </motion.div>
      </div>
    </div>
  )
}

export default HomeFlowVisual
