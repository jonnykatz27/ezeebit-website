import { AnimatePresence } from 'framer-motion'
import { motion } from '../../lib/motion'
import {
  PORTAL_CARD, SWAP, arrive, money,
  useHeroLoop, HeroStage, Halo, Counter, Flash,
} from './heroKit'
import { PortalScale, PortalBalanceCard, PortalConvertCard, PortalActivityRow } from '../portal/PortalUI'

type Fiat = 'ZAR' | 'KES' | 'NGN'
type Ccy = Fiat | 'USDT'

/** Each fiat wallet: its flag, how the portal writes it, and an illustrative rate. */
const FIAT: Record<Fiat, { mark: string; fmt: (v: number) => string; perUsdt: number }> = {
  ZAR: { mark: '/za-flag.svg', fmt: (v) => `R${money(v)}`, perUsdt: 18.45 },
  KES: { mark: '/ke-flag.svg', fmt: (v) => `KSh ${money(v)}`, perUsdt: 129.5 },
  NGN: { mark: '/ng-flag.svg', fmt: (v) => `₦${money(v)}`, perUsdt: 1_570 },
}
const ORDER: Ccy[] = ['ZAR', 'KES', 'NGN', 'USDT']
const START: Record<Ccy, number> = { ZAR: 714_602.25, KES: 1_250_000, NGN: 18_500_000, USDT: 50_000 }

type Move =
  | { kind: 'deposit'; ccy: Fiat; amount: number }
  | { kind: 'convert'; ccy: Fiat; amount: number; usdt: number }
  | { kind: 'wallet'; usdt: number; to: string }
  | { kind: 'bank'; ccy: Fiat; amount: number; to: string }

/**
 * One loop of activity across the fiat wallets. It nets to zero — the naira
 * and shillings that come in are converted to USDT and sent out, and the rands
 * are withdrawn — so the balances never drift.
 */
const MOVES: Move[] = [
  { kind: 'deposit', ccy: 'ZAR', amount: 120_000 },
  { kind: 'deposit', ccy: 'NGN', amount: 2_355_000 },
  { kind: 'convert', ccy: 'NGN', amount: 2_355_000, usdt: 1_500 },
  { kind: 'deposit', ccy: 'KES', amount: 388_500 },
  { kind: 'convert', ccy: 'KES', amount: 388_500, usdt: 3_000 },
  { kind: 'wallet', usdt: 4_500, to: '0x7Ab2…c21F' },
  { kind: 'bank', ccy: 'ZAR', amount: 120_000, to: 'bank account ••4821' },
]

const delta = (m: Move): Partial<Record<Ccy, number>> =>
  m.kind === 'deposit' ? { [m.ccy]: m.amount }
  : m.kind === 'convert' ? { [m.ccy]: -m.amount, USDT: m.usdt }
  : m.kind === 'wallet' ? { USDT: -m.usdt }
  : { [m.ccy]: -m.amount }

const wrap = (n: number) => ((n % MOVES.length) + MOVES.length) % MOVES.length

/** The most recent move that matches, looking back from `step`. */
const latest = (test: (m: Move) => boolean, step: number) => {
  for (let back = 1; back <= MOVES.length; back++) {
    const i = wrap(step - back)
    if (test(MOVES[i])) return { move: MOVES[i], at: step - back }
  }
  return { move: MOVES[0], at: 0 }
}

/** The row in "Recent activities" for a deposit or withdrawal. */
const describe = (m: Move) => {
  switch (m.kind) {
    case 'deposit':
      return { title: 'Deposit processed', sub: `To your ${m.ccy} wallet`, amount: `+${FIAT[m.ccy].fmt(m.amount)}` }
    case 'wallet':
      return { title: 'Withdrawal processed', sub: `To ${m.to}`, amount: `${money(m.usdt)} USDT` }
    case 'bank':
      return { title: 'Withdrawal processed', sub: `To ${m.to}`, amount: FIAT[m.ccy].fmt(m.amount) }
    default:
      return { title: '', sub: '', amount: '' }
  }
}

/**
 * The Wallets hero, drawn with the Merchant Portal's own components: the
 * wallet balance card, whose fiat wallet can be ZAR, KES, or NGN; the Convert
 * panel; and deposits and withdrawals as rows of "Recent activities".
 */
const WalletsHeroVisual = () => {
  const { ref, step, still } = useHeroLoop(2600)
  const n = wrap(step)
  const bal = MOVES.slice(0, n).reduce<Record<Ccy, number>>((b, m) => {
    const d = delta(m)
    return Object.fromEntries(ORDER.map((c) => [c, b[c] + (d[c] ?? 0)])) as Record<Ccy, number>
  }, { ...START })

  const last = MOVES[wrap(step - 1)]
  const changed = step > 0 ? Object.keys(delta(last)) as Ccy[] : []

  // The balance card shows whichever fiat wallet was used last
  const view = (latest((m) => m.kind !== 'wallet', step).move as Exclude<Move, { kind: 'wallet' }>).ccy
  const fiatInRands = (bal[view] / FIAT[view].perUsdt) * FIAT.ZAR.perUsdt
  const stableInRands = bal.USDT * FIAT.ZAR.perUsdt
  const sum = fiatInRands + stableInRands

  const conv = latest((m) => m.kind === 'convert', step)
  const cv = conv.move as Extract<Move, { kind: 'convert' }>
  const act = latest((m) => m.kind !== 'convert', step)
  const row = describe(act.move)

  const action = step === 0 ? null : last.kind === 'deposit' ? 'deposit' : last.kind === 'convert' ? 'convert' : 'withdraw'

  return (
    <HeroStage ref={ref} label="The Ezeebit Merchant Portal: a wallet balance card with a ZAR, KES, or NGN fiat wallet beside a USDT wallet, the Convert panel, and recent deposits and withdrawals.">
      <Halo x={260} y={300} />

      {/* One flag for each settlement currency, in the gaps between the cards */}

      {/* ── The Convert panel ── */}
      <motion.div className={`absolute ${PORTAL_CARD} overflow-hidden`} style={{ left: 325, top: 0 }} {...arrive(0.45, 'right')}>
        <PortalScale width={317} scale={0.74}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={conv.at} {...SWAP}>
              <PortalConvertCard
                from={`Fiat (${cv.ccy})`}
                fromMark={FIAT[cv.ccy].mark}
                fromAmount={money(cv.amount)}
                balance={money(bal[cv.ccy], 0)}
                toAmount={money(cv.usdt)}
                rate={`Exchange rate: 1 ${cv.ccy} = ${(1 / FIAT[cv.ccy].perUsdt).toPrecision(3)} USDT`}
              />
            </motion.div>
          </AnimatePresence>
        </PortalScale>
      </motion.div>

      {/* ── Deposits and withdrawals ── */}
      <motion.div className={`absolute ${PORTAL_CARD} px-3.5 py-3`} style={{ left: 8, top: 112 }} {...arrive(0.6, 'left')}>
        <PortalScale width={350} scale={0.78}>
          <div className="h-11 relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={act.at} {...SWAP} className="absolute inset-0 flex items-center">
                <div className="w-full">
                  <PortalActivityRow kind={act.move.kind === 'deposit' ? 'payment' : 'done'} title={row.title} sub={row.sub} amount={row.amount} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </PortalScale>
      </motion.div>

      {/* ── The wallet balance card ── */}
      <motion.div className={`absolute ${PORTAL_CARD} overflow-hidden`} style={{ left: 0, top: 300 }} {...arrive(0.25)}>
        <PortalScale width={560} scale={0.76}>
          <PortalBalanceCard
            total={<Counter value={sum} format={(v) => `R ${money(v)}`} still={still} />}
            fiatShare={(fiatInRands / sum) * 100}
            fiat={{
              mark: FIAT[view].mark,
              label: `Fiat wallet (${view})`,
              // Re-keyed per currency, so switching wallets swaps the figure rather than counting across currencies
              amount: <Counter key={view} value={bal[view]} format={FIAT[view].fmt} still={still} />,
            }}
            stable={{ amount: <Counter value={bal.USDT} format={(v) => `$${money(v)}`} still={still} /> }}
            active={action}
            flash={{
              fiat: <Flash on={changed.includes(view)} id={step} />,
              stable: <Flash on={changed.includes('USDT')} id={step} />,
            }}
          />
        </PortalScale>
      </motion.div>
    </HeroStage>
  )
}

export default WalletsHeroVisual
