import { AnimatePresence } from 'framer-motion'
import { motion } from '../../lib/motion'
import { Check, Lock, Loader2, ChevronRight, ShoppingBag } from 'lucide-react'
import {
  CARD, COIN, LABEL, SWAP, arrive, rands,
  useHeroLoop, HeroStage, Halo,
} from './heroKit'

const METHODS = [
  { name: 'VALR Pay', logo: '/valr_logo%20(clean).png' },
  { name: 'Luno Pay', logo: '/luno_logo%20(clean).png' },
  { name: 'Binance Pay', logo: '/Binance-Logo%20(clean).png' },
  { name: 'WalletConnect', logo: '/walletconnect-logo.svg' },
]

/** Illustrative orders, each paid a different way. */
const ORDERS = [
  { no: 1042, zar: 1_250, method: 2 },
  { no: 1043, zar: 3_480, method: 0 },
  { no: 1044, zar: 899, method: 3 },
  { no: 1045, zar: 6_200, method: 1 },
]

const PLUGINS = [
  { name: 'Shopify', logo: '/shopify-icon.png' },
  { name: 'WooCommerce', logo: '/woocommerce-logo.png' },
  { name: 'Magento', logo: '/magento-logo.png' },
]

/**
 * The Online hero: a storefront hands off to the Ezeebit checkout, the
 * customer picks how to pay, and the order is confirmed.
 */
const OnlineHeroVisual = () => {
  const { ref, step, still } = useHeroLoop(1900)
  const phase = still ? 2 : step % 3 // 0 choosing, 1 confirming, 2 paid
  const order = ORDERS[Math.floor(step / 3) % ORDERS.length]

  return (
    <HeroStage ref={ref} label="An online store handing off to the Ezeebit checkout, where the customer pays with VALR Pay, Luno Pay, Binance Pay, or WalletConnect.">
      <Halo x={300} y={250} />


      {/* ── The merchant's store, in a browser ── */}
      <motion.div className={`absolute ${CARD} overflow-hidden`} style={{ left: 0, top: 70, width: 380, height: 320 }} {...arrive(0.2, 'left')}>
        <div className="h-9 px-3 flex items-center gap-2 border-b border-neutral-100 bg-neutral-50/80">
          <span className="flex gap-1">
            {['bg-neutral-300', 'bg-neutral-300', 'bg-neutral-300'].map((c, i) => <span key={i} className={`w-2 h-2 rounded-full ${c}`} />)}
          </span>
          <span className="flex-1 mx-6 h-5 rounded-md bg-white border border-neutral-200 flex items-center gap-1 px-2 text-[10px] text-neutral-500">
            <Lock className="w-2.5 h-2.5" /> yourstore.co.za/checkout
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800">
              <ShoppingBag className="w-3.5 h-3.5 text-primary-500" /> Your store
            </span>
            <span className="h-2 w-16 rounded-full bg-neutral-100" />
          </div>
          <p className={`${LABEL} mb-2`}>Order summary</p>
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-2.5 mb-2.5">
              <span className={`w-10 h-10 rounded-lg ${i ? 'bg-primary-50' : 'bg-gradient-to-br from-primary-100 to-primary-50'}`} />
              <div className="flex-1 space-y-1.5">
                <span className="block h-2 w-24 rounded-full bg-neutral-200" />
                <span className="block h-2 w-14 rounded-full bg-neutral-100" />
              </div>
            </div>
          ))}
          <div className="border-t border-neutral-100 pt-3 mt-3 flex items-center justify-between w-[150px]">
            <span className="text-xs text-neutral-500">Total</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={order.no} {...SWAP} className="text-sm font-bold text-neutral-900">{rands(order.zar)}</motion.span>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* ── The Ezeebit checkout ── */}
      <motion.div className={`absolute ${CARD} p-4`} style={{ left: 232, top: 104, width: 300 }} {...arrive(0.4)}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[13px] font-semibold text-neutral-900">Select payment method</p>
            <p className="text-[11px] text-neutral-500">Amount: <b className="text-neutral-800">{rands(order.zar)}</b></p>
          </div>
          <img src="/ezeebit-icon-blue.png" alt="" className="w-6 h-6 object-contain" />
        </div>

        <div className="relative h-[232px]">
          <AnimatePresence mode="wait" initial={false}>
            {phase < 2 ? (
              <motion.div key={`list${order.no}`} {...SWAP} className="absolute inset-0 space-y-1.5">
                {METHODS.map((m, i) => {
                  const picked = i === order.method
                  return (
                    <div
                      key={m.name}
                      className={`h-11 rounded-xl border flex items-center gap-2.5 px-2.5 transition-colors duration-300 ${
                        picked ? 'border-primary-500 bg-primary-50/60' : 'border-neutral-200 bg-white'
                      }`}
                    >
                      <img src={m.logo} alt="" className="w-7 h-7 rounded-lg object-contain bg-white" />
                      <span className="flex-1 text-[13px] font-medium text-neutral-800">{m.name}</span>
                      {picked && phase === 1 ? (
                        <Loader2 className="w-4 h-4 text-primary-500 animate-spin" />
                      ) : (
                        <ChevronRight className={`w-4 h-4 ${picked ? 'text-primary-500' : 'text-neutral-300'}`} />
                      )}
                    </div>
                  )
                })}
                <div className="h-11 rounded-xl border border-neutral-200 bg-white flex items-center gap-2.5 px-2.5">
                  <span className="flex items-center">
                    {['btc', 'eth', 'usdt'].map((c, i) => (
                      <img key={c} src={`/${c}-logo.svg`} alt="" className={`w-6 h-6 ${COIN} ${i ? '-ml-2.5' : ''}`} style={{ zIndex: 3 - i }} />
                    ))}
                  </span>
                  <span className="flex-1 text-[13px] font-medium text-neutral-800">On-chain crypto</span>
                  <ChevronRight className="w-4 h-4 text-neutral-300" />
                </div>
              </motion.div>
            ) : (
              <motion.div key={`paid${order.no}`} {...SWAP} className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <motion.span
                  className="w-16 h-16 rounded-full bg-success-50 text-success-600 flex items-center justify-center mb-3"
                  initial={still ? false : { scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                >
                  <Check className="w-8 h-8" strokeWidth={2.5} />
                </motion.span>
                <p className="text-base font-semibold text-neutral-900">Payment confirmed</p>
                <p className="text-[11px] text-neutral-500 mt-0.5 flex items-center gap-1.5">
                  <img src={METHODS[order.method].logo} alt="" className="w-4 h-4 rounded object-contain" />
                  Paid with {METHODS[order.method].name}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── The order lands in the store's system ── */}
      <motion.div className={`absolute ${CARD} px-3.5 py-3`} style={{ left: 312, top: 20, width: 220 }} {...arrive(0.55, 'right')}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={phase === 2 ? `done${order.no}` : `wait${order.no}`} {...SWAP} className="flex items-center gap-2.5">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${phase === 2 ? 'bg-success-50 text-success-600' : 'bg-neutral-100 text-neutral-400'}`}>
              {phase === 2 ? <Check className="w-4 h-4" /> : <Loader2 className="w-4 h-4 animate-spin" />}
            </span>
            <div>
              <p className="text-[13px] font-semibold text-neutral-900">Order #{order.no} {phase === 2 ? 'paid' : 'awaiting payment'}</p>
              <p className="text-[11px] text-neutral-500">{phase === 2 ? 'Marked paid in your store' : 'Checkout open'}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Plugins ── */}
      <motion.div className={`absolute ${CARD} px-3.5 py-3 flex items-center gap-3`} style={{ left: 24, top: 414, width: 232 }} {...arrive(0.7, 'left')}>
        <span className={LABEL}>Plugs into</span>
        <span className="flex items-center gap-2">
          {PLUGINS.map((p) => (
            <img key={p.name} src={p.logo} alt="" title={p.name} className="w-8 h-8 rounded-lg bg-white border border-neutral-100 object-contain p-1" />
          ))}
        </span>
      </motion.div>
    </HeroStage>
  )
}

export default OnlineHeroVisual
