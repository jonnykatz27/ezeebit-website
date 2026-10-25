import { AnimatePresence } from 'framer-motion'
import { motion } from '../../lib/motion'
import { Check, Clock, Store } from 'lucide-react'
import {
  CARD, PORTAL_CARD, COIN, SWAP, arrive, money,
  useHeroLoop, HeroStage, Rings, FloatingCoin, Counter,
} from './heroKit'
import { PortalScale, PortalStatCard } from '../portal/PortalUI'

type Fiat = 'ZAR' | 'KES' | 'NGN' | 'USD'

/** How the terminal writes each currency a merchant can settle in. */
const FIAT: Record<Fiat, (v: number) => string> = {
  ZAR: (v) => `R${money(v)}`,
  KES: (v) => `KSh ${money(v)}`,
  NGN: (v) => `₦${money(v)}`,
  USD: (v) => `$${money(v)}`,
}

/**
 * Illustrative sales the terminal rings up, one after another, each in a
 * different settlement currency. `rate` is that currency per unit of the asset.
 */
const SALES = [
  { amount: 4_500, fiat: 'ZAR', asset: 'usdt', network: 'Tron', rate: 18.45, dp: 2 },
  { amount: 32_000, fiat: 'KES', asset: 'usdc', network: 'Solana', rate: 129.5, dp: 2 },
  { amount: 185_000, fiat: 'NGN', asset: 'btc', network: 'Bitcoin', rate: 165_765_000, dp: 6 },
  { amount: 240, fiat: 'USD', asset: 'eth', network: 'Ethereum', rate: 2_596, dp: 4 },
] as const

const PHASES = ['amount', 'qr', 'paid'] as const
/** The day's takings before the loop starts, in each currency. */
const TODAY_START: Record<Fiat, number> = { ZAR: 38_240, KES: 268_500, NGN: 3_120_000, USD: 2_075 }

/**
 * A real, scannable QR code for https://ezeebit.com/in-store — version 4 at
 * the highest error correction, so the coin over its centre does not stop it
 * reading. It points at this page rather than a wallet, so nobody scanning the
 * illustration can ever mistake it for somewhere to send money.
 * Regenerate with any QR encoder if the URL changes.
 */
const QR_ROWS = [
  '111111101001111011111110101111111',
  '100000100101101000010010101000001',
  '101110101111011100101101101011101',
  '101110100000100110110111001011101',
  '101110101111100111110100101011101',
  '100000100001111010010100001000001',
  '111111101010101010101010101111111',
  '000000001011100110111010100000000',
  '000001100110010100011010001010101',
  '100111001000010011101101010111010',
  '000010110110111111111010010101010',
  '010101010010110011111100010101110',
  '011000111011011010101100001111001',
  '101010000110010000000101001110101',
  '100101100110000010000010001110010',
  '101100011101101100011000111101101',
  '010111110100001001000001010110011',
  '000100001001100101011101101100011',
  '010000101011011011000001011001101',
  '001011000011101100100001110111111',
  '101011100001001001111010100111011',
  '110000010010001000000010011110000',
  '100000110001101010101111100000010',
  '100000001010111011100001000101111',
  '111111111111111100000000111111011',
  '000000001111000111011000100011001',
  '111111100101001101010101101011110',
  '100000101000110100100000100010110',
  '101110100101010101101100111110011',
  '101110100010111110001110010111110',
  '101110100101111001000010000010111',
  '100000100110111000111010000000100',
  '111111100110111000100011101000110',
]
const QR_N = QR_ROWS.length
/** Four modules of white around the code, as scanners expect. */
const QUIET = 4

/** Dark modules as one path, merged into horizontal runs so no seams show when scaled. */
const QR_PATH = QR_ROWS.map((row, y) =>
  [...row.matchAll(/1+/g)].map((m) => `M${m.index! + QUIET} ${y + QUIET}h${m[0].length}v1h-${m[0].length}z`).join(''),
).join('')

const QR = ({ size, coin }: { size: number; coin?: string }) => (
  <div className="relative" style={{ width: size, height: size }}>
    <svg viewBox={`0 0 ${QR_N + QUIET * 2} ${QR_N + QUIET * 2}`} width={size} height={size} shapeRendering="crispEdges">
      <path d={QR_PATH} fill="#111" />
    </svg>
    {coin && (
      <span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-[3px]"
        style={{ width: size * 0.2, height: size * 0.2 }}
      >
        <img src={coin} alt="" className={`w-full h-full ${COIN} shadow-none`} />
      </span>
    )}
  </div>
)

/**
 * The In-Store hero: an ePOS terminal rings up a sale, shows the customer a
 * QR code for the asset they chose, and confirms the payment, while the
 * day's takings tick up beside it.
 */
const InStoreHeroVisual = () => {
  const { ref, step, still } = useHeroLoop(2100)
  const phase = still ? 'paid' : PHASES[step % 3]
  const saleIndex = Math.floor(step / 3) % SALES.length
  const sale = SALES[saleIndex]
  const fmt = FIAT[sale.fiat]
  const crypto = sale.amount / sale.rate
  const completed = Math.floor((step + 1) / 3)
  // The takings card follows the sale's currency, adding up only the sales made in it
  const today = TODAY_START[sale.fiat] + Array.from({ length: completed }, (_, i) => SALES[i % SALES.length])
    .filter((s) => s.fiat === sale.fiat)
    .reduce((sum, s) => sum + s.amount, 0)

  return (
    <HeroStage ref={ref} label="An Ezeebit ePOS terminal taking a payment: the amount is entered, the customer scans a QR code, and the payment is confirmed.">
      <Rings x={280} y={250} still={still} />

      <FloatingCoin src="/usdt-logo.svg" x={470} y={96} delay={0} still={still} />
      <FloatingCoin src="/btc-logo.svg" x={48} y={300} delay={0.4} still={still} />
      <FloatingCoin src="/usdc-logo.svg" x={500} y={214} delay={0.8} still={still} />
      <FloatingCoin src="/eth-logo.svg" x={118} y={432} delay={1.2} still={still} />

      {/* ── The terminal ── */}
      <motion.div
        className={`absolute ${CARD} overflow-hidden !rounded-[28px]`}
        style={{ left: 170, top: 18, width: 220, height: 452 }}
        {...arrive(0.25)}
      >
        <div className="h-12 px-4 flex items-center justify-between bg-gradient-to-r from-primary-50 via-white to-primary-50">
          <span className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-neutral-500">
            <Store className="w-3.5 h-3.5" />
          </span>
          <div className="flex flex-col items-end leading-none">
            <span className="text-[8px] font-semibold text-neutral-700 mb-0.5">Powered by</span>
            <img src="/ezeebit_black.png" alt="" className="h-3.5 w-auto" />
          </div>
        </div>
        <div className="h-[3px] bg-primary-500" />

        <div className="relative h-[397px]">
          <AnimatePresence mode="wait" initial={false}>
            {phase === 'amount' && (
              <motion.div key={`a${step}`} {...SWAP} className="absolute inset-0 px-4 pt-5 flex flex-col items-center">
                <p className="text-[13px] font-semibold text-neutral-800 mb-3">Enter amount</p>
                <p className="text-[26px] font-semibold text-neutral-900 tracking-tight mb-1">
                  <Counter value={sale.amount} format={(v) => money(v, 0)} still={still} /> <span className="text-neutral-400">{sale.fiat}</span>
                </p>
                <p className="text-[10px] text-neutral-500 bg-white border border-neutral-200 rounded-md px-1.5 py-0.5 mb-4">
                  ≈ {money(crypto, sale.dp)} {sale.asset.toUpperCase()}
                </p>
                <div className="grid grid-cols-3 gap-1.5 w-full mb-3">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '←'].map((k) => (
                    <span key={k} className="h-9 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-sm font-semibold text-neutral-800">
                      {k}
                    </span>
                  ))}
                </div>
                <span className="w-full h-9 rounded-xl bg-primary-500 text-white text-sm font-semibold flex items-center justify-center">Pay</span>
              </motion.div>
            )}

            {phase === 'qr' && (
              <motion.div key={`q${step}`} {...SWAP} className="absolute inset-0 px-4 pt-5 flex flex-col items-center">
                <p className="text-[10px] text-neutral-500 mb-0.5">Amount to send</p>
                <p className="text-[22px] font-semibold text-neutral-900 tracking-tight leading-tight">
                  {money(crypto, sale.dp)} <span className="text-sm text-primary-600">{sale.asset.toUpperCase()}</span>
                </p>
                <p className="text-[10px] text-neutral-500 mb-3">≈ {fmt(sale.amount)} · {sale.network}</p>
                <div className="p-1 rounded-2xl bg-white border border-neutral-200 shadow-sm mb-3">
                  <QR size={152} coin={`/${sale.asset}-logo.svg`} />
                </div>
                <p className="flex items-center gap-1 text-[10px] text-neutral-500 mb-3">
                  <Clock className="w-3 h-3" /> 14:52
                </p>
                <span className="w-full h-9 rounded-xl bg-primary-500 text-white text-sm font-semibold flex items-center justify-center">Pay</span>
              </motion.div>
            )}

            {phase === 'paid' && (
              <motion.div key={`p${step}`} {...SWAP} className="absolute inset-0 px-4 pt-16 flex flex-col items-center text-center">
                <motion.span
                  className="w-20 h-20 rounded-full bg-success-50 text-success-600 flex items-center justify-center mb-4"
                  initial={still ? false : { scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                >
                  <Check className="w-10 h-10" strokeWidth={2.5} />
                </motion.span>
                <p className="text-lg font-semibold text-neutral-900 mb-1">Payment received</p>
                <p className="text-[22px] font-bold text-neutral-900 tracking-tight mb-1">{fmt(sale.amount)}</p>
                <p className="text-[11px] text-neutral-500 flex items-center gap-1.5">
                  <img src={`/${sale.asset}-logo.svg`} alt="" className={`w-4 h-4 ${COIN}`} />
                  Paid in {sale.asset.toUpperCase()} on {sale.network}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── The Ezeebit Pay poster a merchant prints from the portal (Figma artwork, with our safe QR) ── */}
      <motion.div
        className="absolute rounded-md overflow-hidden shadow-[0_18px_40px_-14px_rgba(0,46,92,0.35)] [&_img]:!mx-0"
        style={{ left: 18, top: 58, width: 130, rotate: -4 }}
        {...arrive(0.45, 'left')}
      >
        <img src="/portal/ezeebit-pay-poster.png" alt="" className="block w-full h-auto" />
      </motion.div>

      {/* ── The day's takings, as the portal's Total volume card ── */}
      <motion.div className={`absolute ${PORTAL_CARD} !border-0`} style={{ left: 372, top: 362 }} {...arrive(0.6, 'right')}>
        <PortalScale width={232} scale={0.8}>
          {/* Re-keyed per currency, so a new currency swaps the figure rather than counting across from the last one */}
          <PortalStatCard label="Total volume" value={<Counter key={sale.fiat} value={today} format={fmt} still={still} />} />
        </PortalScale>
      </motion.div>
    </HeroStage>
  )
}

export default InStoreHeroVisual
