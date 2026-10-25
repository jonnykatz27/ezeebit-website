import { AnimatePresence } from 'framer-motion'
import { motion } from '../../lib/motion'
import { Check, Link2, Loader2, Webhook } from 'lucide-react'
import {
  CARD, COIN, LABEL, SWAP, arrive, money, rands,
  useHeroLoop, HeroStage, Rings, FloatingCoin,
} from './heroKit'

/** Illustrative payouts, one after another. */
const PAYOUTS = [
  { zar: 2_000, asset: 'usdt', network: 'Tron', link: '8Hq2x', hash: '0x93f1…a7c2' },
  { zar: 15_000, asset: 'usdc', network: 'Ethereum', link: 'Rk7pW', hash: '0x4be0…19d5' },
  { zar: 650, asset: 'usdt', network: 'BSC', link: 'c3LmZ', hash: '0x7a2e…f04b' },
] as const

const RATE = 18.45
const STAGES = ['Quote accepted', 'Transaction sent', 'Confirming on-chain', 'Funds transferred']
/** Ticks per payout: link sent, four stages, then a beat to read the result. */
const CYCLE = 6

/**
 * The Payouts hero: a payout link goes to the customer, they claim it in the
 * Ezeebit widget, the transfer moves through its stages, and your webhook
 * hears about it.
 */
const PayoutsHeroVisual = () => {
  const { ref, step, still } = useHeroLoop(1350)
  const stage = still ? CYCLE - 1 : step % CYCLE // 0 = link sent, 1–4 = stages done
  const p = PAYOUTS[Math.floor(step / CYCLE) % PAYOUTS.length]
  const done = stage >= 4

  return (
    <HeroStage ref={ref} label="A stablecoin payout moving from a payout link, through quote, transfer, and confirmation, to funds transferred, with a webhook sent to the merchant.">
      <Rings x={320} y={240} still={still} />

      <FloatingCoin src="/usdt-logo.svg" x={500} y={56} delay={0} still={still} />
      <FloatingCoin src="/usdc-logo.svg" x={512} y={338} delay={0.5} still={still} />
      <FloatingCoin src="/eth-logo.svg" x={92} y={236} delay={1} still={still} />

      {/* ── The payout widget your customer sees ── */}
      <motion.div className={`absolute ${CARD} overflow-hidden`} style={{ left: 196, top: 36, width: 296 }} {...arrive(0.25)}>
        <div className="h-11 px-4 flex items-center justify-between bg-gradient-to-r from-primary-50 via-white to-primary-50">
          <span className="text-[13px] font-semibold text-neutral-800">Withdraw</span>
          <div className="flex flex-col items-end leading-none">
            <span className="text-[8px] font-semibold text-neutral-700 mb-0.5">Powered by</span>
            <img src="/ezeebit_black.png" alt="" className="h-3.5 w-auto" />
          </div>
        </div>
        <div className="h-[3px] bg-primary-500" />
        <div className="p-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={p.link} {...SWAP}>
              <p className="text-[11px] text-neutral-500">You receive</p>
              <p className="text-2xl font-bold tracking-tight text-neutral-900 leading-tight">
                {money(p.zar / RATE)} <span className="text-base text-primary-600">{p.asset.toUpperCase()}</span>
              </p>
              <p className="text-[11px] text-neutral-500 mb-3">≈ {rands(p.zar)}</p>
              <div className="flex items-center gap-2 rounded-xl bg-neutral-50 px-2.5 py-2 mb-4">
                <img src={`/${p.asset}-logo.svg`} alt="" className={`w-6 h-6 ${COIN}`} />
                <span className="text-xs font-medium text-neutral-800">{p.asset.toUpperCase()}</span>
                <span className="text-xs text-neutral-400">on</span>
                <span className="text-xs font-medium text-neutral-800">{p.network}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <ol className="relative space-y-3">
            <span className="absolute left-[11px] top-3 bottom-3 w-px bg-neutral-200" />
            {STAGES.map((label, i) => {
              const state = stage > i ? 'done' : stage === i ? 'now' : 'todo'
              return (
                <li key={label} className="relative flex items-center gap-3">
                  <span
                    className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      state === 'done' ? 'bg-success-500 text-white'
                      : state === 'now' ? 'bg-white border-2 border-primary-500 text-primary-500'
                      : 'bg-white border-2 border-neutral-200'
                    }`}
                  >
                    {state === 'done' && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                    {state === 'now' && <Loader2 className="w-3 h-3 animate-spin" />}
                  </span>
                  <span className={`text-[13px] transition-colors duration-300 ${state === 'todo' ? 'text-neutral-400' : 'text-neutral-800 font-medium'}`}>
                    {label}
                  </span>
                </li>
              )
            })}
          </ol>

          <div className="mt-4 h-8 rounded-lg bg-neutral-50 flex items-center justify-center text-[11px] text-neutral-500 overflow-hidden relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={done ? `h${p.link}` : `w${p.link}`} {...SWAP}>
                {done ? <>Tx <span className="text-neutral-800 font-medium">{p.hash}</span></> : 'Settles on-chain in minutes'}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* ── The link you send instead of asking for an address ── */}
      <motion.div className={`absolute ${CARD} p-3.5`} style={{ left: 0, top: 64, width: 214 }} {...arrive(0.45, 'left')}>
        <div className={`flex items-center gap-1.5 mb-2 ${LABEL}`}>
          <Link2 className="w-3.5 h-3.5 text-primary-500" />
          Payout link
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={p.link} {...SWAP}>
            <p className="text-[13px] font-semibold text-neutral-900">{rands(p.zar)} reserved</p>
            <p className="text-[11px] text-neutral-500 truncate">pay.ezeebit.com/p/{p.link}…</p>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Your server hears about it ── */}
      <motion.div className={`absolute ${CARD} p-3.5`} style={{ left: 20, top: 360, width: 232 }} {...arrive(0.6, 'left')}>
        <div className="flex items-center justify-between mb-2">
          <div className={`flex items-center gap-1.5 ${LABEL}`}>
            <Webhook className="w-3.5 h-3.5 text-primary-500" />
            Webhook
          </div>
          <span className={`text-[10px] font-semibold rounded-full px-2 py-0.5 transition-colors duration-300 ${done ? 'bg-success-50 text-success-700' : 'bg-neutral-100 text-neutral-500'}`}>
            {done ? '200 OK' : 'Pending'}
          </span>
        </div>
        <p className="text-[11px] text-neutral-500 mb-0.5">POST /webhooks/ezeebit</p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p key={done ? 'd' : `s${stage}`} {...SWAP} className="text-[13px] font-medium text-neutral-900">
            status: <span className={done ? 'text-success-600' : 'text-primary-600'}>{done ? 'success' : 'pending'}</span>
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </HeroStage>
  )
}

export default PayoutsHeroVisual
