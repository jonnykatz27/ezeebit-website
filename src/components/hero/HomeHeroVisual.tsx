import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { motion } from '../../lib/motion'
import {
  PORTAL_CARD, SWAP, arrive, money,
  useHeroLoop, HeroStage, Halo, FloatingCoin, Counter, Flash,
} from './heroKit'
import { PortalScale, PortalBalanceCard, PortalActivityRow } from '../portal/PortalUI'

/** Illustrative only, so the conversions below add up. */
const RATE = 18.45
const START = { zar: 714_602.25, usdt: 50_000 }

type Activity =
  | { kind: 'in'; channel: 'In-store' | 'Online'; asset: 'usdt' | 'btc' | 'usdc' | 'zarp'; zar: number }
  | { kind: 'out'; usdt: number; to: string }
  | { kind: 'convert'; zar: number; usdt: number }

/**
 * One loop of activity. It nets to zero — the rands that come in are
 * converted, and the stablecoin is paid back out — so the balance never
 * drifts however long the page stays open.
 */
const ACTIVITY: Activity[] = [
  { kind: 'in', channel: 'In-store', asset: 'usdt', zar: 4_500 },
  { kind: 'in', channel: 'Online', asset: 'btc', zar: 12_800 },
  { kind: 'out', usdt: 250, to: '0x7Ab2…c21F' },
  { kind: 'in', channel: 'In-store', asset: 'zarp', zar: 2_150 },
  { kind: 'convert', zar: 19_450, usdt: 1_054.2 },
  { kind: 'out', usdt: 804.2, to: 'TXk9…4bQe' },
]

const delta = (a: Activity) =>
  a.kind === 'in' ? { zar: a.zar, usdt: 0 }
  : a.kind === 'out' ? { zar: 0, usdt: -a.usdt }
  : { zar: -a.zar, usdt: a.usdt }

/** Balances after the first `n` activities of the loop. */
const balancesAt = (n: number) =>
  ACTIVITY.slice(0, n).reduce(
    (b, a) => ({ zar: b.zar + delta(a).zar, usdt: b.usdt + delta(a).usdt }),
    { ...START },
  )

const wrap = (n: number) => ((n % ACTIVITY.length) + ACTIVITY.length) % ACTIVITY.length

/** The most recent activity of a kind, looking back from `step`. */
const latest = (kind: Activity['kind'], step: number) => {
  for (let back = 1; back <= ACTIVITY.length; back++) {
    const i = wrap(step - back)
    if (ACTIVITY[i].kind === kind) return { i, at: step - back }
  }
  return { i: 0, at: 0 }
}

/** Amounts written the way the Merchant Portal writes them. */
const total = (v: number) => `R ${money(v)}`
const fiat = (v: number) => `R${money(v)}`
const usd = (v: number) => `$${money(v)}`

/**
 * The home page hero illustration, drawn with the Merchant Portal's own
 * components: payments land in the wallet balance card, get converted, and go
 * back out as payouts, each reported like a row of "Recent activities".
 */
const HomeHeroVisual = () => {
  const { ref, step, still } = useHeroLoop(2600)
  const [confirmedAt, setConfirmedAt] = useState(() => latest('out', 0).at)

  const payIn = latest('in', step)
  const payOut = latest('out', step)
  const justChanged = step > 0 ? ACTIVITY[wrap(step - 1)].kind : null

  // A payout shows as in progress first, then confirms a beat later
  useEffect(() => {
    if (still || justChanged !== 'out') { setConfirmedAt(payOut.at); return }
    const t = window.setTimeout(() => setConfirmedAt(payOut.at), 1300)
    return () => window.clearTimeout(t)
  }, [payOut.at, justChanged, still])

  /*
   * The balance follows the activity that caused it rather than moving with it.
   * Everything changing on the same frame is what made the loop feel like a
   * jolt every few seconds; this reads as payment, then balance.
   */
  const [settled, setSettled] = useState(step)
  useEffect(() => {
    if (still) { setSettled(step); return }
    const t = window.setTimeout(() => setSettled(step), 420)
    return () => window.clearTimeout(t)
  }, [step, still])
  const settledChange = settled > 0 ? ACTIVITY[wrap(settled - 1)].kind : null

  const bal = balancesAt(wrap(settled))
  const sum = bal.zar + bal.usdt * RATE

  const inAct = ACTIVITY[payIn.i] as Extract<Activity, { kind: 'in' }>
  const outAct = ACTIVITY[payOut.i] as Extract<Activity, { kind: 'out' }>
  const confirmed = confirmedAt === payOut.at
  const action = settledChange === 'in' ? 'deposit' : settledChange === 'out' ? 'withdraw' : settledChange === 'convert' ? 'convert' : null

  return (
    <HeroStage
      ref={ref}
      // The real product is the homepage's focal point, so it may grow past its design width on wide screens
      maxWidth={680}
      label="The Ezeebit Merchant Portal: payments arriving in-store and online, landing in the fiat and stablecoin wallets, and going back out as payouts."
    >
      <Halo x={280} y={262} />

      <FloatingCoin src="/usdt-logo.svg" x={488} y={70} delay={0} still={still} />
      <FloatingCoin src="/btc-logo.svg" x={20} y={300} delay={0.4} still={still} />
      <FloatingCoin src="/eth-logo.svg" x={508} y={250} delay={0.8} still={still} />
      <FloatingCoin src="/usdc-logo.svg" x={150} y={446} delay={1.2} still={still} />
      {/* Clear of the three cards: the activity row above (x 0-246, y 50-110),
          the balance card (x 62-499, y 146-356) and the payout row below
          (x 284-530, y 372-432). The first spots put both behind a card. */}
      <FloatingCoin src="/zarp-logo.png" x={310} y={8} delay={1.6} still={still} />
      <FloatingCoin src="/zaru-logo.png" x={420} y={450} delay={2} still={still} />

      {/* ── The wallet balance card, as on the portal's dashboard ── */}
      <motion.div className={`absolute ${PORTAL_CARD} overflow-hidden`} style={{ left: 62, top: 146 }} {...arrive(0.25)}>
        <PortalScale width={560} scale={0.78}>
          <PortalBalanceCard
            total={<Counter value={sum} format={total} still={still} />}
            fiatShare={(bal.zar / sum) * 100}
            fiat={{ mark: '/za-flag.svg', amount: <Counter value={bal.zar} format={fiat} still={still} /> }}
            stable={{ amount: <Counter value={bal.usdt} format={usd} still={still} /> }}
            active={action}
            flash={{
              fiat: <Flash on={settledChange === 'in' || settledChange === 'convert'} id={settled} />,
              stable: <Flash on={settledChange === 'out' || settledChange === 'convert'} id={settled} />,
            }}
          />
        </PortalScale>
      </motion.div>

      {/* ── Money in ── */}
      <motion.div className={`absolute ${PORTAL_CARD} px-3.5 py-3`} style={{ left: 0, top: 50 }} {...arrive(0.45, 'left')}>
        <PortalScale width={300} scale={0.82}>
          <div className="h-11 relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={payIn.at} {...SWAP} className="absolute inset-0 flex items-center">
                <div className="w-full">
                  <PortalActivityRow
                    kind="payment"
                    title="Payment processed"
                    sub={`${inAct.channel} · paid in ${inAct.asset.toUpperCase()}`}
                    amount={total(inAct.zar)}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </PortalScale>
      </motion.div>

      {/* ── Money out ── */}
      <motion.div className={`absolute ${PORTAL_CARD} px-3.5 py-3`} style={{ left: 284, top: 372 }} {...arrive(0.6, 'right')}>
        <PortalScale width={300} scale={0.82}>
          <div className="h-11 relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={`${payOut.at}-${confirmed}`} {...SWAP} className="absolute inset-0 flex items-center">
                <div className="w-full">
                  <PortalActivityRow
                    kind={confirmed ? 'done' : 'pending'}
                    title={confirmed ? 'Payout processed' : 'Payout in progress'}
                    sub={`To ${outAct.to}`}
                    amount={`${money(outAct.usdt)} USDT`}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </PortalScale>
      </motion.div>
    </HeroStage>
  )
}

export default HomeHeroVisual
