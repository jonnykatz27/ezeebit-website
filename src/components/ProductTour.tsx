import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
import { motion } from '../lib/motion'
import PlatformsHeroVisual from './hero/PlatformsHeroVisual'
import OnlineHeroVisual from './hero/OnlineHeroVisual'
import InStoreHeroVisual from './hero/InStoreHeroVisual'
import PayoutsHeroVisual from './hero/PayoutsHeroVisual'
import WalletsHeroVisual from './hero/WalletsHeroVisual'

type Stop = {
  id: string
  label: string
  visual: () => ReactNode
  eyebrow: string
  heading: string
  body: string
  ticks: string[]
  link: { to: string; label: string }
  facts: [string, string][]
}

/**
 * One stop per product: the screen people actually see, then what it does
 * and the facts a buyer asks about. Every fact here is one the product page
 * already states.
 */
const STOPS: Stop[] = [
  {
    id: 'platforms',
    label: 'Platforms',
    visual: () => <PlatformsHeroVisual />,
    eyebrow: 'Gaming, trading and wallets',
    heading: 'Deposits and withdrawals, without holding crypto',
    body: 'Your users deposit with the crypto they already hold and withdraw in stablecoin. Every deposit is hedged the moment it lands, so you credit a fixed amount and never carry the asset.',
    ticks: [
      'Every deposit attributed to the right user',
      'A signed webhook the moment a deposit is final',
      'Rate locked when they pay, with no chargebacks',
      'Withdrawals paid in stablecoin from your fiat balance',
    ],
    link: { to: '/platforms', label: 'See crypto for platforms' },
    facts: [
      ['Pay with', 'Any on-chain wallet, 700+ wallets through WalletConnect, Luno, VALR and Binance'],
      ['Deposits', 'Credited by signed webhook once final'],
      ['Withdrawals', 'Stablecoin on-chain, usually within minutes'],
      ['Settlement', 'Stablecoin the same day, or ZAR, KES, NGN or USD the next business day'],
      ['Compliance', 'KYC, AML, the Travel Rule and address screening, handled by us'],
    ],
  },
  {
    id: 'online',
    label: 'Online checkout',
    visual: () => <OnlineHeroVisual />,
    eyebrow: 'Online stores',
    heading: 'A checkout your customers already know how to use',
    body: 'Customers pick their exchange or wallet and pay in a few taps. The amount is fixed in your currency when they pay, so you receive exactly what you charged.',
    ticks: [
      'VALR Pay, Luno Pay, Binance Pay, WalletConnect Pay and any on-chain wallet',
      'Plugins for Shopify, WooCommerce and Magento, or the API',
      'Final payments, with no chargebacks',
      'Settled in your currency or in stablecoin',
    ],
    link: { to: '/online', label: 'See online payments' },
    facts: [
      ['Coins', 'BTC, ETH, USDT, USDC, BNB, DAI, PAXG, ZARP and ZARU'],
      ['Rate', 'Locked when the customer pays'],
      ['Plugins', 'Shopify, WooCommerce and Magento, or the API'],
      ['Settlement', 'ZAR, KES, NGN or USD the next business day, or stablecoin the same day'],
    ],
  },
  {
    id: 'in-store',
    label: 'In-store',
    visual: () => <InStoreHeroVisual />,
    eyebrow: 'Shops, restaurants and hotels',
    heading: 'Ring it up in your currency. They pay in crypto.',
    body: 'Staff enter the amount and the customer scans the code with the wallet or exchange app already on their phone. Every payment is hedged on the spot, so your takings never move with the market.',
    ticks: [
      'An Android ePOS that prints receipts, or a printed Ezeebit Pay QR',
      'The locked rate shown to the customer before they pay',
      'Final payments, with no chargebacks',
      'Refunds handled by you, in local currency or store credit',
    ],
    link: { to: '/in-store', label: 'See in-store payments' },
    facts: [
      ['Ways to pay', 'An ePOS over WiFi, 4G or SIM, or a static Ezeebit Pay QR'],
      ['Fees', '1% or lower per transaction, excluding VAT'],
      ['Plans', 'Starter R0 a month, Professional R150 a month, Enterprise custom'],
      ['Setup', 'No setup fees for the ePOS or Ezeebit Pay'],
      ['Settlement', 'Stablecoin the same day, or local currency the next business day'],
    ],
  },
  {
    id: 'payouts',
    label: 'Payouts',
    visual: () => <PayoutsHeroVisual />,
    eyebrow: 'Payouts',
    heading: 'A payout link your customer claims in minutes',
    body: 'You create the payout from your fiat balance and send a link. Your customer picks the asset and network, enters their own wallet and watches it land. Every address is screened before funds move.',
    ticks: [
      'The widget carries your name and colours',
      'No wallet addresses to collect, so a mistyped one is never your liability',
      'Sent 24/7, with no banking cut-offs',
      'RSA-signed webhooks on every status change',
    ],
    link: { to: '/payouts', label: 'See payouts' },
    facts: [
      ['Funding', 'Your fiat balance, reserved when the payout is created'],
      ['Speed', 'Usually within minutes, at any hour'],
      ['Recipients', 'No Ezeebit account needed, only a wallet'],
      ['Webhooks', 'Signed, with the final status and transaction hash'],
      ['Use it for', 'Player winnings, marketplace sellers, remittance and disbursement'],
    ],
  },
  {
    id: 'dashboard',
    label: 'Your dashboard',
    visual: () => <WalletsHeroVisual />,
    eyebrow: 'Merchant Portal',
    heading: 'Every currency and every coin, on one balance',
    body: 'Pay-ins, payouts, conversions and withdrawals land on one ledger. Hold fiat or USDT, convert at a quoted rate, and withdraw to your bank or your own wallet.',
    ticks: [
      'Fiat and USDT wallets, converted at a quoted rate',
      'Payouts funded from the same balance',
      'Every movement a line item with a reference and timestamp',
      'Balances, conversions and withdrawals by API too',
    ],
    link: { to: '/wallets', label: 'See wallets' },
    facts: [
      ['Wallets', 'Fiat and USDT'],
      ['Withdrawals', 'Fiat to your bank the next business day, stablecoin the same day'],
      ['Records', 'A reference and timestamp on every movement'],
      ['Access', 'The Merchant Portal or the API'],
      ['Safeguarding', 'Held with an FSCA-regulated CASP, FSP No. 53664'],
    ],
  },
]

const ProductTour = () => {
  const [active, setActive] = useState(STOPS[0].id)

  // Left/right arrows move between tabs, as a tablist is expected to
  const onKeys = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = STOPS[(index + (e.key === 'ArrowRight' ? 1 : STOPS.length - 1)) % STOPS.length]
    setActive(next.id)
    document.getElementById(`tour-tab-${next.id}`)?.focus()
  }

  return (
    <section id="product-tour" className="scroll-mt-20 py-10 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-8 lg:mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-600 mb-3">Product tour</p>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">See what your customers see</h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            The screens your customers, players and team use, for every way money moves through Ezeebit.
          </p>
        </motion.div>

        <div className="mb-8 lg:mb-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Ezeebit products"
            className="flex flex-wrap items-center justify-center gap-1 p-1 rounded-[24px] bg-neutral-950 max-w-full"
          >
            {STOPS.map((stop, index) => (
              <button
                key={stop.id}
                type="button"
                role="tab"
                id={`tour-tab-${stop.id}`}
                aria-selected={active === stop.id}
                aria-controls={`tour-panel-${stop.id}`}
                tabIndex={active === stop.id ? 0 : -1}
                onClick={() => setActive(stop.id)}
                onKeyDown={(e) => onKeys(e, index)}
                className={`whitespace-nowrap rounded-full px-4 sm:px-5 py-2.5 text-sm font-semibold transition-colors ${
                  active === stop.id ? 'bg-primary-500 text-white' : 'text-neutral-300 hover:text-white'
                }`}
              >
                {stop.label}
              </button>
            ))}
          </div>
        </div>

        {/*
          Every panel's copy stays in the page, hidden when not selected, so the
          pre-render carries all five. Only the selected panel mounts its
          illustration, so it plays its entrance each time the tab is opened.
        */}
        {STOPS.map((stop) => {
          const isActive = active === stop.id
          return (
            <div
              key={stop.id}
              role="tabpanel"
              id={`tour-panel-${stop.id}`}
              aria-labelledby={`tour-tab-${stop.id}`}
              hidden={!isActive}
            >
              {/* The product on the same Near Black as the page's opening, as a framed stage */}
              <div className="relative overflow-hidden rounded-[28px] bg-neutral-950 px-3 py-8 sm:px-10 lg:py-12">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-[30%] left-1/2 -translate-x-1/2 w-[110%] h-[90%]"
                  style={{ background: 'radial-gradient(closest-side, color-mix(in srgb, var(--color-primary-800) 70%, transparent), transparent)' }}
                />
                <div className="relative mx-auto max-w-[600px]">{isActive && stop.visual()}</div>
              </div>

              <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 text-left">
                <div className="lg:col-span-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-600 mb-2">{stop.eyebrow}</p>
                  <h3 className="text-2xl lg:text-3xl font-display font-bold text-neutral-900 mb-4 leading-tight">{stop.heading}</h3>
                  <p className="text-lg text-neutral-600 leading-relaxed mb-6">{stop.body}</p>
                  <ul className="space-y-3 mb-6">
                    {stop.ticks.map((tick) => (
                      <li key={tick} className="flex items-start gap-3 text-neutral-700">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-neutral-950 text-primary-400 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" strokeWidth={3} />
                        </span>
                        {tick}
                      </li>
                    ))}
                  </ul>
                  <Link to={stop.link.to} className="inline-flex items-center gap-1.5 font-semibold text-primary-600 hover:text-primary-700">
                    {stop.link.label}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <dl className="lg:col-span-5 self-start border-b border-neutral-200">
                  {stop.facts.map(([term, detail]) => (
                    <div key={term} className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-neutral-200 py-3.5">
                      <dt className="text-sm font-semibold text-neutral-900">{term}</dt>
                      <dd className="text-sm text-neutral-600 leading-relaxed">{detail}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ProductTour
