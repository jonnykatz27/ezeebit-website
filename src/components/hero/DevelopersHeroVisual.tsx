import { motion, AnimatePresence } from 'framer-motion'
import { Check, ShieldCheck, Webhook } from 'lucide-react'
import {
  CARD, COIN, LABEL, SWAP, arrive,
  useHeroLoop, HeroStage, Rings, FloatingCoin,
} from './heroKit'

type Token = [string, string?]
type Line = { indent?: number; tokens: Token[] }

const K = 'text-sky-300'
const S = 'text-emerald-300'
const N = 'text-amber-200'
const P = 'text-neutral-500'

const request = (host: string): Line[] => [
  { tokens: [['POST', 'text-primary-300 font-semibold'], [` ${host.replace('https://', '')}/newOrder`, 'text-neutral-200']] },
  { tokens: [['{', P]] },
  { indent: 1, tokens: [['"amount"', K], [': ', P], ['1250.00', N], [',', P]] },
  { indent: 1, tokens: [['"tradeOrderNo"', K], [': ', P], ['"INV-1042"', S], [',', P]] },
  { indent: 1, tokens: [['"storeNumber"', K], [': ', P], ['"635428229"', S], [',', P]] },
  { indent: 1, tokens: [['"webHookUrl"', K], [': ', P], ['"https://yoursite.com/hooks"', S]] },
  { tokens: [['}', P]] },
]

const response = (checkout: string): Line[] => [
  { tokens: [['← 200 OK', 'text-success-400 font-semibold']] },
  { tokens: [['{', P]] },
  { indent: 1, tokens: [['"code"', K], [': ', P], ['200', N], [', ', P], ['"msg"', K], [': ', P], ['"success"', S], [',', P]] },
  { indent: 1, tokens: [['"data"', K], [': {', P]] },
  { indent: 2, tokens: [['"payId"', K], [': ', P], ['"656908f8…"', S], [',', P]] },
  { indent: 2, tokens: [['"paymentLink"', K], [': ', P], [`"${checkout.replace('https://', '')}/pay/…"`, S]] },
  { indent: 1, tokens: [['}', P]] },
  { tokens: [['}', P]] },
]

/**
 * The Developers hero: a New Order request typed out against the chosen
 * environment, the response with its checkout link, and the signed webhook
 * that follows once the customer pays.
 */
const DevelopersHeroVisual = ({ environment, baseUrl, checkoutHost }: { environment: 'uat' | 'live'; baseUrl: string; checkoutHost: string }) => {
  const { ref, step, still } = useHeroLoop(420)
  const req = request(baseUrl)
  const res = response(checkoutHost)
  const lines = [...req, { tokens: [] }, ...res]
  const pause = 14
  const shown = still ? lines.length : Math.min(step % (lines.length + pause), lines.length)
  const linkShown = shown >= req.length + 1 + 6
  const hooked = still || (step % (lines.length + pause)) >= lines.length + 3

  return (
    <HeroStage ref={ref} label="A New Order request sent to the Ezeebit API, the response with a payment link, and a signed webhook confirming payment.">
      <Rings x={260} y={230} still={still} />

      <FloatingCoin src="/usdt-logo.svg" x={500} y={40} delay={0} still={still} />
      <FloatingCoin src="/btc-logo.svg" x={24} y={410} delay={0.6} still={still} />

      {/* ── The terminal ── */}
      <motion.div
        className="absolute rounded-2xl bg-neutral-950 border border-white/5 shadow-[0_24px_60px_-20px_rgba(0,26,54,0.55)] overflow-hidden"
        style={{ left: 16, top: 34, width: 420, height: 372 }}
        {...arrive(0.2, 'left')}
      >
        <div className="h-10 px-4 flex items-center gap-3 border-b border-white/5">
          <span className="flex gap-1.5">
            {[0, 1, 2].map((i) => <span key={i} className="w-2.5 h-2.5 rounded-full bg-white/15" />)}
          </span>
          <span className="text-[11px] text-neutral-400 font-mono">newOrder</span>
          <span className={`ml-auto text-[10px] font-semibold rounded-full px-2 py-0.5 ${environment === 'uat' ? 'bg-orange-500/15 text-orange-300' : 'bg-success-500/15 text-success-400'}`}>
            {environment === 'uat' ? 'UAT' : 'Live'}
          </span>
        </div>
        <div className="px-4 py-3 font-mono text-[12px] leading-[20px]">
          {lines.map((l, i) => (
            <div
              key={i}
              className="whitespace-nowrap overflow-hidden text-ellipsis transition-opacity duration-200"
              style={{ paddingLeft: (l.indent ?? 0) * 16, opacity: i < shown ? 1 : 0, height: 20 }}
            >
              {l.tokens.map(([t, c], j) => <span key={j} className={c}>{t}</span>)}
              {!still && i === shown - 1 && shown < lines.length && <span className="inline-block w-1.5 h-3.5 bg-primary-400 align-middle ml-0.5 animate-pulse" />}
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Where the payment link goes ── */}
      <motion.div className={`absolute ${CARD} p-3.5`} style={{ left: 364, top: 150, width: 196 }} {...arrive(0.45, 'right')}>
        <p className={`${LABEL} mb-2`}>Hosted checkout</p>
        <div className="relative h-5 mb-2">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p key={linkShown ? 'on' : 'off'} {...SWAP} className={`absolute inset-0 text-[13px] font-semibold ${linkShown ? 'text-neutral-900' : 'text-neutral-400 font-normal text-[11px]'}`}>
              {linkShown ? 'R1,250.00' : 'Waiting for the order…'}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className={`space-y-1.5 transition-opacity duration-500 ${linkShown ? 'opacity-100' : 'opacity-40 grayscale'}`}>
          {['valr_logo%20(clean).png', 'Binance-Logo%20(clean).png'].map((l) => (
            <div key={l} className="h-7 rounded-lg border border-neutral-200 flex items-center gap-2 px-2">
              <img src={`/${l}`} alt="" className="w-4 h-4 object-contain" />
              <span className="h-1.5 w-16 rounded-full bg-neutral-100" />
            </div>
          ))}
          <div className="h-7 rounded-lg border border-neutral-200 flex items-center gap-2 px-2">
            <img src="/usdt-logo.svg" alt="" className={`w-4 h-4 ${COIN}`} />
            <span className="h-1.5 w-12 rounded-full bg-neutral-100" />
          </div>
        </div>
      </motion.div>

      {/* ── The webhook that follows ── */}
      <motion.div className={`absolute ${CARD} p-3.5`} style={{ left: 236, top: 382, width: 256 }} {...arrive(0.6)}>
        <div className="flex items-center justify-between mb-1.5">
          <span className={`flex items-center gap-1.5 ${LABEL}`}>
            <Webhook className="w-3.5 h-3.5 text-primary-500" /> Webhook
          </span>
          <span className={`text-[10px] font-semibold rounded-full px-2 py-0.5 transition-colors duration-300 ${hooked ? 'bg-success-50 text-success-700' : 'bg-neutral-100 text-neutral-500'}`}>
            {hooked ? 'Received' : 'Waiting'}
          </span>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={hooked ? 'y' : 'n'} {...SWAP}>
            <p className="text-[13px] font-medium text-neutral-900">
              status: <span className={hooked ? 'text-success-600' : 'text-neutral-400'}>{hooked ? '"success"' : '"pending"'}</span>
            </p>
            <p className="text-[11px] text-neutral-500 flex items-center gap-1 mt-0.5">
              {hooked ? <><ShieldCheck className="w-3 h-3 text-success-600" /> Signature verified</> : <><Check className="w-3 h-3" /> Signed with SHA256withRSA</>}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </HeroStage>
  )
}

export default DevelopersHeroVisual
