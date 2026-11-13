import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, MapPin } from 'lucide-react'
import { motion } from '../lib/motion'
import SEO from '../components/SEO'
import DarkBackdrop from '../components/DarkBackdrop'
import { HERO_PRIMARY, HERO_SECONDARY } from '../components/hero/PageHero'

/** The coins a customer can pay in. ETH and PAXG ship as bare marks, so they sit on a white disc. */
const COINS = [
  { src: '/btc-logo.svg', name: 'Bitcoin' },
  { src: '/eth-logo.svg', name: 'Ethereum', bare: true },
  { src: '/usdt-round.svg', name: 'USDT' },
  { src: '/usdc-logo.svg', name: 'USDC' },
  { src: '/bnb-logo.svg', name: 'BNB' },
  { src: '/paxg-logo.svg', name: 'PAXG' },
  { src: '/zarp-logo.png', name: 'ZARP' },
  { src: '/zaru-logo.png', name: 'ZARU' },
]

/** The exchanges and wallets a customer can pay straight from. */
const PAY_FROM = [
  { src: '/marks/valr.webp', name: 'VALR' },
  { src: '/marks/luno.webp', name: 'Luno' },
  { src: '/marks/binance.webp', name: 'Binance' },
  { src: '/walletconnect-pay.svg', name: 'WalletConnect Pay', note: '700+ wallets' },
]

const EYEBROW = 'text-xs font-semibold uppercase tracking-[0.14em] text-primary-400'

/**
 * Where an Ezeebit Pay QR code's "learn more" lands: a single dark screen, in
 * the style of the site's heroes, with what a customer can pay with and the
 * three places they are most likely to want next.
 */
const EzeebitResources = () => (
  <>
    <SEO
      title="Quick links"
      description="Jump to the Ezeebit user manual, merchant sign-up, and stores in South Africa that accept crypto payments."
      crumbs={[{ name: 'Quick links', path: '/ezeebit-resources' }]}
      canonicalUrl="/ezeebit-resources"
      noindex
    />
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-hidden -mt-20">
      <section className="relative overflow-hidden bg-neutral-950 pt-40 pb-16 lg:pt-48 lg:pb-24">
        <DarkBackdrop glow="left" />
        <div className="container-custom relative text-center [&_img]:!mx-0">
          <p className={`${EYEBROW} mb-4`}>Quick links</p>
          <h1 className="font-display font-bold text-white !leading-[1.06] tracking-[-0.03em] text-4xl sm:text-5xl lg:text-6xl mb-4">
            Welcome to <span className="text-primary-400">Ezeebit.</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-neutral-300 leading-relaxed">
            Scanned our QR code? You are in the right place. Pay with crypto, find stores that accept it, or start accepting it yourself.
          </p>

          <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-white/10 bg-white/[0.04] p-5 lg:p-6">
            <p className={EYEBROW}>Pay with</p>
            <ul className="mt-4 flex flex-wrap items-center justify-center gap-2 lg:gap-3">
              {COINS.map((c) => (
                <li key={c.name}>
                  <img src={c.src} alt={c.name} title={c.name} width={36} height={36} className={`size-8 lg:size-9 rounded-full ${c.bare ? 'bg-white p-1.5 object-contain' : 'object-cover'}`} />
                </li>
              ))}
            </ul>
            <p className={`${EYEBROW} mt-6 border-t border-white/10 pt-5`}>Pay from</p>
            <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {PAY_FROM.map((p) => (
                <li key={p.name} className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-2 py-3">
                  <img src={p.src} alt="" width={36} height={36} className="size-9 rounded-lg object-cover" />
                  <span className="text-[13px] font-semibold text-white leading-tight">{p.name}</span>
                  {p.note && <span className="text-[11px] text-neutral-400 leading-none">{p.note}</span>}
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3">
            <a href="https://merchant.ezeebit.com/#/signup" target="_blank" rel="noopener noreferrer" className={HERO_PRIMARY}>
              Merchant sign-up
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link to="/resources/where-to-spend" className={`${HERO_SECONDARY} gap-2 whitespace-nowrap !px-4 !text-base`}>
                <MapPin className="w-5 h-5" />
                Where to spend crypto
              </Link>
              <Link to="/resources/user-manual" className={`${HERO_SECONDARY} gap-2 whitespace-nowrap !px-4 !text-base`}>
                <BookOpen className="w-5 h-5" />
                User guide
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  </>
)

export default EzeebitResources
