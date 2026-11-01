import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, Headphones,
  Star, ThumbsUp,
} from 'lucide-react'
import { motion } from '../lib/motion'
import PartnerCarousel from '../components/PartnerCarousel'
import SEO from '../components/SEO'
import FlowDemo, { DemoPanel } from '../components/demo/FlowDemo'
import PageHero, { HERO_PRIMARY, HERO_SECONDARY } from '../components/hero/PageHero'
import { coinLogo } from '../components/hero/heroKit'
import { PortalBalanceCard, PortalConvertCard, PORTAL_PAGE_BG } from '../components/portal/PortalUI'
import DarkBackdrop from '../components/DarkBackdrop'
import { LIVE_MARKETS } from '../lib/schema'

/**
 * TODO(confirm): settlement. Company docs: ZAR next business day (T+1) and
 * stablecoin USDT or USDC the same day (T+0). A merchant has a fiat wallet
 * and a USDT wallet. Do not mention KES, NGN or USD settlement. The rest of
 * the site still says ZAR, KES, NGN or USD.
 */
const SETTLEMENT = 'ZAR the next business day (T+1), or USDT or USDC the same day (T+0)'

/**
 * TODO(confirm): regulatory wording. Do not say "authorised and regulated by
 * the FSCA", and do not show FSCA-regulated, FAIS Licensed or FSCA-authorised
 * badges. This is the sentence the fact-check calls the published footer line.
 * Other pages still use the older sentence.
 */
const LICENCE =
  'Ezee Solutions Group (Pty) Ltd has applied for a Financial Service Provider (FSP) & Crypto Asset Service Provider (CASP) licence, FSP 53664.'

/**
 * TODO(confirm): support. Fact-check wording. Do not say "24/7 support".
 * The contact page still lists phone and WhatsApp as Mon–Fri 8am–6pm, and
 * the FAQ page still says 24/7 support.
 */
const SUPPORT = '24/7 chatbot, with human support Mon-Fri during business hours (SAST)'

/**
 * TODO(confirm): SOC 2. Not a "SOC 2 Certified" badge. Fact-check wording
 * for custody.
 */
const CUSTODY = 'Custody runs on SOC 2 Type II-compliant MPC infrastructure.'

const COINS = ['btc', 'eth', 'usdt', 'usdc', 'bnb'] as const

const PARTNERS_A = [
  { name: 'iStore', logo: '/istore-logo(final).webp' },
  { name: 'Skins', logo: '/skins-logo.webp' },
  { name: 'Le Creuset', logo: '/le-creuset-logo(final).webp' },
  { name: 'Amiri', logo: '/amiri-logo(latest).webp' },
  { name: 'Ritual', logo: '/ritual-logo(latest).webp' },
  { name: 'Hydraulics', logo: '/hydraulics-logo(latest).webp' },
  { name: 'Al Capone', logo: '/alcapone-logo(final).webp' },
  { name: 'Scoin', logo: '/scoin-logo(latest).webp' },
  { name: 'Soul Gallery', logo: '/soul-gallery-logo(final).webp' },
  { name: 'Sunbet', logo: '/sunbet-logo.webp' },
]

const PARTNERS_B = [
  { name: 'Yawa', logo: '/yawa-logo(final).webp' },
  { name: 'Tintswalo Lodge', logo: '/tintswalo-logo(latest).webp' },
  { name: 'Luxity', logo: '/luxity-logo(latest).webp' },
  { name: 'The Capital', logo: '/thecapital-logo.webp' },
  { name: 'Spar', logo: '/spar-logo(latest).webp' },
  { name: 'Cultish', logo: '/cultish-logo(latest).webp' },
  { name: 'Watch Channel', logo: '/watch-channel-logo(final).webp' },
  { name: 'Diesel', logo: '/diesel-logo(final).webp' },
  { name: 'Sumptuous Tours', logo: '/sumptuous-tours-logo.webp' },
  { name: 'BHH', logo: '/bhh-logo.webp' },
]

const TESTIMONIALS = [
  {
    name: 'Rael Demby',
    role: 'CEO',
    company: 'Scoin',
    content: "We have tried various methods of accepting Cryptocurrency, but Ezeebit's integration and back-end support has been fantastic. Ezeebit opens up a huge opportunity for retailers around Southern Africa. This is the future.",
    logo: '/scoin-logo.webp',
  },
  {
    name: 'Adam Woolf',
    role: 'Owner',
    company: 'The Watch Channel',
    content: 'Partnering with Ezeebit has transformed our payment solutions at The Watch Channel. Their advanced cryptocurrency payment system offers our customers a seamless, secure way to pay with their preferred cryptocurrencies, enhancing their shopping experience.',
    logo: '/watchchannel-logo(latest).png',
  },
  {
    name: 'Kokona',
    role: 'Co-founder',
    company: 'Usurpa',
    content: 'Pioneering into the Web3 space, partnering with Ezeebit has enabled us to accept stablecoin and cryptocurrency payments easily without any problems whatsoever. We strongly believe our partnership with Ezeebit will allow access to all Africans. Thanks to the team for this amazing opportunity.',
    logo: '/usurpa-logo.webp',
  },
]

type Fact = [string, string]
type Stop = {
  id: string
  label: string
  eyebrow: string
  heading: string
  body: string
  ticks: string[]
  facts: Fact[]
  links: { label: string; to: string }[]
}

const PAY_IN: Stop[] = [
  {
    id: 'in-store',
    label: 'In-store',
    eyebrow: 'Shops, restaurants and hotels',
    heading: 'Ring it up in your currency. They pay in crypto.',
    body: 'Staff enter the amount and the customer scans the code with the wallet or exchange app already on their phone. Every payment is hedged on the spot, so your takings never move with the market.',
    ticks: [
      'An Android ePOS that prints receipts, or a printed Ezeebit Pay QR',
      'The locked rate shown to the customer before they pay',
      'Final payments, with no chargebacks',
      'Refunds handled by you, in rand or store credit',
    ],
    facts: [
      ['Ways to pay', 'An ePOS over WiFi, 4G or SIM, or a static Ezeebit Pay QR'],
      ['Fees', '1% or lower per transaction, excluding VAT'],
      ['Setup', 'No setup fees for the ePOS or Ezeebit Pay'],
      // TODO(confirm): settlement
      ['Settlement', SETTLEMENT],
    ],
    links: [{ label: 'In-store payments', to: '/in-store' }],
  },
  {
    id: 'online',
    label: 'Online',
    eyebrow: 'Online stores',
    heading: 'A checkout your customers already know how to use',
    body: 'Customers pick their exchange or wallet and pay in a few taps. The amount is fixed in your currency when they pay, so you receive exactly what you charged.',
    ticks: [
      'VALR Pay, Luno Pay, Binance Pay, WalletConnect Pay and any on-chain wallet',
      'Plugins for Shopify, WooCommerce and Magento, or the API',
      'Final payments, with no chargebacks',
    ],
    facts: [
      ['Coins', 'BTC, ETH, USDT, USDC, BNB, DAI, PAXG, ZARP and ZARU'],
      ['Rate', 'Locked when the customer pays'],
      ['Plugins', 'Shopify, WooCommerce and Magento, or the API'],
      // TODO(confirm): settlement
      ['Settlement', SETTLEMENT],
    ],
    links: [{ label: 'Online checkout', to: '/online' }],
  },
  {
    id: 'platforms',
    label: 'Platforms',
    eyebrow: 'Gaming, trading and wallets',
    heading: 'Deposits and withdrawals, without holding crypto',
    body: 'Your users deposit with the crypto they already hold and withdraw in stablecoin. Every deposit is hedged the moment it lands, so you credit a fixed amount and never carry the asset.',
    ticks: [
      'Every deposit attributed to the right user',
      'A signed webhook the moment a deposit is final',
      'Rate locked when they pay, with no chargebacks',
      'Withdrawals paid in stablecoin from your fiat balance',
    ],
    facts: [
      ['Pay with', 'Any on-chain wallet, 700+ wallets through WalletConnect, Luno, VALR and Binance'],
      ['Deposits', 'Credited by signed webhook once final'],
      ['Withdrawals', 'Stablecoin on-chain, usually within minutes'],
      // TODO(confirm): settlement
      ['Settlement', SETTLEMENT],
      ['Compliance', 'KYC, AML, the Travel Rule and address screening, handled by us'],
    ],
    links: [{ label: 'Crypto for platforms', to: '/platforms' }],
  },
]

const PAY_OUT: Stop = {
  id: 'pay-out',
  label: 'Pay out',
  eyebrow: 'Payouts',
  heading: 'A payout link your customer claims in minutes',
  body: 'You create the payout from your fiat balance and send a link. Your customer picks the asset and network, enters their own wallet and watches it land. Every address is screened before funds move.',
  ticks: [
    'The widget carries your name and colours',
    'No wallet addresses to collect, so a mistyped one is never your liability',
    'Sent at any hour, with no banking cut-offs',
    'RSA-signed webhooks on every status change',
  ],
  facts: [
    ['Funding', 'Your fiat balance, reserved when the payout is created'],
    ['Speed', 'Usually within minutes, at any hour'],
    ['Recipients', 'No Ezeebit account needed, only a wallet'],
    ['Webhooks', 'Signed, with the final status and transaction hash'],
    ['Use it for', 'Player winnings, marketplace sellers, remittance and disbursement'],
  ],
  links: [{ label: 'Payouts', to: '/payouts' }],
}

const HOLD: Stop = {
  id: 'hold',
  label: 'Hold & convert',
  eyebrow: 'Merchant Portal',
  heading: 'A fiat wallet and a USDT wallet, on one balance',
  body: 'Pay-ins, payouts, conversions and withdrawals land on one ledger. Hold fiat or USDT, convert at a quoted rate, and withdraw to your bank or your own wallet.',
  ticks: [
    'A fiat wallet and a USDT wallet, converted at a quoted rate',
    'Payouts funded from the same balance',
    'Every movement a line item with a reference and timestamp',
    'Balances, conversions and withdrawals by API too',
  ],
  facts: [
    // TODO(confirm): settlement — wallets are fiat plus USDT
    ['Wallets', 'A fiat wallet and a USDT wallet'],
    // TODO(confirm): settlement
    ['Withdrawals', SETTLEMENT],
    ['Records', 'A reference and timestamp on every movement'],
    ['Access', 'The Merchant Portal or the API'],
    // TODO(confirm): regulatory wording
    ['Safeguarding', LICENCE],
  ],
  links: [{ label: 'Wallets', to: '/wallets' }],
}

const SOLUTIONS = [
  { title: 'Gaming and betting', body: 'Players deposit in seconds and withdraw winnings in stablecoin, with no chargebacks on the way in.', to: '/platforms' },
  { title: 'Trading and investment', body: 'Traders top up from stablecoins they already hold and withdraw profits the same way, instead of waiting on cards or wires.', to: '/platforms' },
  { title: 'Payment gateways', body: 'Offer crypto pay-ins and stablecoin payouts to your own merchants, each with its own stores and history.', to: '/platforms' },
  { title: 'Wallets and neobanks', body: 'Make crypto a first-class way to top up and to cash out, for the users who keep their money on-chain.', to: '/platforms' },
  { title: 'Online stores', body: 'Add checkout with a plugin or the API. Customers pay from the wallet or exchange they already use.', to: '/online' },
  { title: 'Shops and hospitality', body: 'Staff enter the amount. The customer scans a code with the wallet already on their phone.', to: '/in-store' },
  { title: 'Marketplaces', body: 'Settle sellers, drivers and creators on your own schedule, including across borders.', to: '/payouts' },
  { title: 'Large trades', body: 'The OTC desk quotes large trades. You get a firm price from a named dealer, locked when you accept it.', to: '/otc' },
]

const MARKETS = [
  { flag: '/za-flag.svg', name: 'South Africa', note: 'Live' },
  { flag: '/ke-flag.svg', name: 'Kenya', note: 'Live' },
  { flag: '/ng-flag.svg', name: 'Nigeria', note: 'Live' },
]

const PLANS = [
  {
    name: 'Starter',
    body: 'For a business taking its first stablecoin and crypto payments.',
    points: ['Ezeebit Pay and QR codes', 'Merchant Portal', 'E-commerce plugins and API', 'No ePOS device'],
  },
  {
    name: 'Professional',
    body: 'For a growing business that wants the counter covered too.',
    points: ['Everything in Starter', 'ePOS device', 'Printable receipts', 'Easy cash-ups'],
    featured: true,
  },
  {
    name: 'Enterprise',
    body: 'For a business that needs its own setup and a named contact.',
    points: ['Dedicated account manager', 'Custom integrations', 'White-label options', 'Talk to us about the fit'],
  },
]

const FAQS: { q: string; a: string }[] = [
  {
    q: 'How do I get started with Ezeebit?',
    a: "Sign up for a merchant account, complete our quick online KYC, then choose either an in-store ePOS device, Ezeebit Pay QR code or plug in our online payment plugin. We guide you through every step until you're live.",
  },
  {
    q: 'Which cryptocurrencies are supported?',
    // TODO(confirm): settlement — coin list is the existing FAQ; the settlement clause follows the fact-check, not KES, NGN or USD.
    a: `Accept Bitcoin (BTC), Ethereum (ETH), USDT, USDC, BNB, DAI, PAXG, and the rand-backed stablecoins ZARP and ZARU. Payments are hedged at checkout. Settlement is ${SETTLEMENT}.`,
  },
  {
    q: 'How fast are payments processed?',
    // TODO(confirm): settlement
    a: `The rate is locked at checkout and the payment is confirmed on-chain. Settlement is ${SETTLEMENT}.`,
  },
  {
    q: 'What are your transaction fees?',
    a: '1% or lower per transaction, excluding VAT. No surprises, no fine print. You keep more of every sale.',
  },
  {
    q: 'Are there chargebacks with crypto payments?',
    a: "No. Crypto payments are irreversible, which means no fraudulent chargebacks and no disputes months after a sale.",
  },
  {
    q: 'Do my customers need a specific app to pay?',
    a: "No. Customers scan your QR code with whatever crypto wallet they already use. No downloads, no sign-ups, no new accounts.",
  },
  {
    q: 'Can I pay my customers out in stablecoin?',
    a: 'Yes. You create the payout with an amount and your own reference, we reserve the fiat and hand back a link, and your customer enters their own wallet address to claim it. Payouts settle on-chain in minutes, at any hour.',
  },
  {
    q: 'Can I hold a balance with Ezeebit?',
    // TODO(confirm): settlement — fiat wallet plus USDT wallet
    a: 'Yes. You have a fiat wallet and a USDT wallet, and you can convert between them at a quoted rate. What you take in funds what you pay out. Withdraw fiat to your bank, or stablecoin to your own wallet.',
  },
  {
    q: 'Is Ezeebit regulated?',
    // TODO(confirm): regulatory wording
    a: LICENCE,
  },
  {
    q: 'Which countries does Ezeebit operate in?',
    a: 'Ezeebit provides stablecoin and crypto payment infrastructure for merchants and platforms across Africa. It is live in South Africa, Kenya and Nigeria, with more African markets to follow.',
  },
  {
    q: 'Do you provide customer support?',
    // TODO(confirm): support
    a: `Yes. ${SUPPORT}. Phone +27 21 879 5074, email support@ezeebit.com, WhatsApp +27 79 443 9375.`,
  },
]

function onTabKeys(e: KeyboardEvent, index: number, ids: string[], set: (id: string) => void, prefix: string) {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
  e.preventDefault()
  const next = e.key === 'ArrowRight' ? (index + 1) % ids.length : (index - 1 + ids.length) % ids.length
  set(ids[next])
  document.getElementById(`${prefix}-${ids[next]}`)?.focus()
}

function Intro({ eyebrow, title, intro }: { eyebrow: string; title: ReactNode; intro?: ReactNode }) {
  return (
    <div className="max-w-3xl mb-8 lg:mb-12 w-full text-left">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600 mb-3">{eyebrow}</p>
      <h2 className="text-3xl lg:text-5xl font-display font-bold text-neutral-900 leading-[1.08] tracking-[-0.02em]">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg text-neutral-600 leading-relaxed">{intro}</p>}
    </div>
  )
}

function Ticks({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-neutral-700 text-[15px] leading-relaxed">
          <span className="mt-0.5 w-5 h-5 rounded-full bg-neutral-950 text-primary-400 flex items-center justify-center shrink-0">
            <Check className="w-3 h-3" strokeWidth={3} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}

function Facts({ facts }: { facts: Fact[] }) {
  return (
    <dl className="border-b border-neutral-200">
      {facts.map(([term, detail]) => (
        <div key={term} className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-neutral-200 py-3">
          <dt className="text-sm font-semibold text-neutral-900">{term}</dt>
          <dd className="text-sm text-neutral-600 leading-relaxed">{detail}</dd>
        </div>
      ))}
    </dl>
  )
}

function StopCopy({ stop }: { stop: Stop }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600 mb-2">{stop.eyebrow}</p>
      <h3 className="text-2xl lg:text-3xl font-display font-bold text-neutral-900 leading-tight mb-3">{stop.heading}</h3>
      <p className="text-neutral-600 leading-relaxed mb-5">{stop.body}</p>
      <Ticks items={stop.ticks} />
      <div className="mt-6">
        <Facts facts={stop.facts} />
      </div>
      <div className="mt-5 flex flex-wrap gap-4">
        {stop.links.map((l) => (
          <Link key={l.to} to={l.to} className="inline-flex items-center gap-1.5 font-semibold text-primary-600 hover:text-primary-700">
            {l.label}
            <ArrowRight className="w-4 h-4" />
          </Link>
        ))}
      </div>
    </div>
  )
}

const ScaleToFit = ({ design, children }: { design: number; children: ReactNode }) => {
  const box = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [fit, setFit] = useState<{ scale: number; height?: number }>({ scale: 1 })

  useEffect(() => {
    const b = box.current
    const i = inner.current
    if (!b || !i) return
    const measure = () => setFit({ scale: Math.min(1, b.clientWidth / design), height: i.offsetHeight * Math.min(1, b.clientWidth / design) })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(b)
    ro.observe(i)
    return () => ro.disconnect()
  }, [design])

  return (
    <div ref={box} style={{ height: fit.height }}>
      <div ref={inner} style={{ width: design, transform: `scale(${fit.scale})`, transformOrigin: 'top left' }}>
        {children}
      </div>
    </div>
  )
}

function FlowDiagram() {
  const card = 'flex-1 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left'
  return (
    <div className="max-w-5xl mx-auto" aria-label="Crypto in, one balance, crypto out">
      <div className="flex flex-col lg:flex-row lg:items-stretch gap-3">
        <div className={card}>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-400 mb-2">Crypto In</p>
          <p className="text-white font-semibold text-lg mb-3">They pay in crypto</p>
          <div className="flex items-center gap-1.5 mb-4">
            {COINS.map((c) => (
              <img key={c} src={coinLogo(c)} alt={c.toUpperCase()} width={28} height={28} className="w-7 h-7 rounded-full !mx-0" />
            ))}
          </div>
          <ul className="space-y-1.5 text-sm text-neutral-300">
            <li>Any on-chain wallet</li>
            <li>Luno Pay, VALR Pay, Binance Pay</li>
            <li>700+ wallets via WalletConnect</li>
            <li>In-store, online or in your app</li>
          </ul>
        </div>
        <div aria-hidden="true" className="hidden lg:flex items-center text-primary-400 px-1">
          <ChevronRight className="w-5 h-5" />
        </div>
        <div className={card}>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-400 mb-2">One balance</p>
          <p className="text-white font-semibold text-lg mb-3">You hold fiat and USDT</p>
          {/* TODO(confirm): settlement */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
              <img src="/za-flag.svg" alt="" width={22} height={22} className="w-5 h-5 rounded-full !mx-0" />
              <span className="text-sm text-white">Fiat wallet</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
              <img src="/usdt-round.svg" alt="" width={22} height={22} className="w-5 h-5 !mx-0" />
              <span className="text-sm text-white">USDT wallet</span>
            </div>
          </div>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Convert between them when it suits you. Pay-ins fund payouts. Settle in {SETTLEMENT}.
          </p>
        </div>
        <div aria-hidden="true" className="hidden lg:flex items-center text-primary-400 px-1">
          <ChevronRight className="w-5 h-5" />
        </div>
        <div className={card}>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-400 mb-2">Crypto Out</p>
          <p className="text-white font-semibold text-lg mb-3">They cash out in crypto</p>
          <ul className="space-y-1.5 text-sm text-neutral-300">
            <li>You send a link, not a wallet address</li>
            <li>They choose the asset and network</li>
            <li>Screened before funds move</li>
            <li>Stablecoin, usually in minutes</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const OUTER = [
  { id: 'pay-in', label: 'Pay in' },
  { id: 'pay-out', label: 'Pay out' },
  { id: 'hold', label: 'Hold & convert' },
] as const

type OuterId = (typeof OUTER)[number]['id']

function MoneyMovement() {
  const [outer, setOuter] = useState<OuterId>('pay-in')
  const [payIn, setPayIn] = useState(PAY_IN[0].id)

  return (
    <section id="how-it-works" className="scroll-mt-24 section-padding bg-white">
      <div className="container-custom">
        <Intro
          eyebrow="Product"
          title={<>See it move.<br />Then read the facts.</>}
          intro="One place for the live demos and the details buyers ask about. Pay in, pay out, or hold and convert."
        />

        <div className="mb-8">
          <div role="tablist" aria-label="How money moves through Ezeebit" className="inline-flex flex-wrap gap-1 p-1 rounded-full bg-neutral-950">
            {OUTER.map((tab, index) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`flow-tab-${tab.id}`}
                aria-selected={outer === tab.id}
                aria-controls={`flow-panel-${tab.id}`}
                tabIndex={outer === tab.id ? 0 : -1}
                onClick={() => setOuter(tab.id)}
                onKeyDown={(e) => onTabKeys(e, index, OUTER.map((t) => t.id), (id) => setOuter(id as OuterId), 'flow-tab')}
                className={`min-h-[44px] whitespace-nowrap rounded-full px-4 sm:px-5 py-2 text-sm font-semibold ${outer === tab.id ? 'bg-primary-500 text-white' : 'text-neutral-300 hover:text-white'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div role="tabpanel" id="flow-panel-pay-in" aria-labelledby="flow-tab-pay-in" hidden={outer !== 'pay-in'}>
          <div className="mb-6">
            <div role="tablist" aria-label="Pay-in products" className="inline-flex flex-wrap gap-2">
              {PAY_IN.map((stop, index) => (
                <button
                  key={stop.id}
                  type="button"
                  role="tab"
                  id={`payin-tab-${stop.id}`}
                  aria-selected={payIn === stop.id}
                  aria-controls={`payin-panel-${stop.id}`}
                  tabIndex={payIn === stop.id ? 0 : -1}
                  onClick={() => setPayIn(stop.id)}
                  onKeyDown={(e) => onTabKeys(e, index, PAY_IN.map((s) => s.id), setPayIn, 'payin-tab')}
                  className={`min-h-[44px] rounded-full border px-4 text-sm font-semibold ${payIn === stop.id ? 'border-neutral-950 bg-neutral-950 text-white' : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'}`}
                >
                  {stop.label}
                </button>
              ))}
            </div>
          </div>
          {PAY_IN.map((stop) => (
            <div key={stop.id} role="tabpanel" id={`payin-panel-${stop.id}`} aria-labelledby={`payin-tab-${stop.id}`} hidden={payIn !== stop.id}>
              <div className="home-flow">
                <StopCopy stop={stop} />
                {outer === 'pay-in' && payIn === stop.id && (
                  <FlowDemo src="/demos/pay-in.html" flow="payin" label="Try the in-store checkout" title="Interactive demo of the Ezeebit in-store checkout" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div role="tabpanel" id="flow-panel-pay-out" aria-labelledby="flow-tab-pay-out" hidden={outer !== 'pay-out'}>
          <div className="home-flow">
            <StopCopy stop={PAY_OUT} />
            {outer === 'pay-out' && (
              <FlowDemo src="/demos/pay-out.html" flow="payout" label="Try a payout" title="Interactive demo of an Ezeebit payout" />
            )}
          </div>
        </div>

        <div role="tabpanel" id="flow-panel-hold" aria-labelledby="flow-tab-hold" hidden={outer !== 'hold'}>
          <div className="home-flow">
            <StopCopy stop={HOLD} />
            {outer === 'hold' && (
              <DemoPanel label="Merchant Portal">
                <ScaleToFit design={430}>
                  <div className={`rounded-[20px] ${PORTAL_PAGE_BG} p-3 space-y-3`}>
                    <div className="rounded-[12px] border border-neutral-200/70 overflow-hidden">
                      <PortalBalanceCard
                        total="R 1,637,102.25"
                        fiatShare={43.65}
                        fiat={{ mark: '/za-flag.svg', amount: 'R714,602.25', label: 'Fiat wallet' }}
                        stable={{ amount: '50,000.00 USDT', label: 'USDT wallet' }}
                      />
                    </div>
                    <div className="rounded-[12px] border border-neutral-200/70 overflow-hidden">
                      <PortalConvertCard
                        from="Fiat (ZAR)"
                        fromMark="/za-flag.svg"
                        fromAmount="50,000.00"
                        balance="714,602"
                        toAmount="2,710.03"
                        rate="Exchange rate: 1 ZAR = 0.0542 USDT"
                      />
                    </div>
                  </div>
                </ScaleToFit>
              </DemoPanel>
            )}
          </div>
        </div>

        <p className="mt-8 text-neutral-600">
          Moving a large amount?{' '}
          <Link to="/otc" className="font-semibold text-primary-600 hover:text-primary-700">Talk to our OTC desk →</Link>
        </p>
      </div>
    </section>
  )
}

const Home = () => {
  const [quote, setQuote] = useState(0)
  const current = TESTIMONIALS[quote]

  return (
    <>
      <SEO
        title="Ezeebit | Stablecoin and crypto payments for Africa"
        exactTitle
        description="Stablecoin and crypto payments across Africa. Ezeebit is live in South Africa, Kenya and Nigeria, with more African markets to follow."
        canonicalUrl="/"
        // TODO(confirm): settlement and regulatory wording — homepage structured data only
        orgDescription={`Ezeebit provides stablecoin and cryptocurrency payment infrastructure for merchants across Africa, including in-store ePOS, online checkout, payouts and wallets. ${LIVE_MARKETS} Settlement is ${SETTLEMENT}. ${LICENCE}`}
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-hidden -mt-20">
        <PageHero
          id="hero"
          stacked
          kicker="Stablecoin pay-ins and payouts"
          title={<><span className="block">Crypto in.</span><span className="block">Crypto out.</span></>}
          accent="One balance."
          // TODO(confirm): settlement — cards and agents removed; no KES, NGN or USD
          description={`Your customers pay in and cash out in crypto, in-store, online or in your app. You settle in ${SETTLEMENT}. One balance and one API, with compliance built in.`}
          actions={
            <>
              <a href="https://merchant.ezeebit.com/#/signup" target="_blank" rel="noopener noreferrer" className={HERO_PRIMARY}>
                Get started free
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              <button type="button" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className={HERO_SECONDARY}>
                See how it works
              </button>
            </>
          }
          trust={[
            { icon: <ThumbsUp />, label: 'No setup fees' },
            // TODO(confirm): support
            { icon: <Headphones />, label: SUPPORT },
          ]}
          wideVisual={<FlowDiagram />}
        />

        <section id="stats" className="relative bg-neutral-950 pb-14 lg:pb-20">
          <div className="container-custom">
            <div className="border-t border-white/10 pt-10 lg:pt-14 home-stats">
              {[
                { n: '100,000+', l: 'Transactions processed' },
                { n: '1% or lower', l: 'Per transaction, excl. VAT' },
                { n: '700+', l: 'Wallets via WalletConnect' },
                // TODO(confirm): customer count — "hundreds", no specific number
                { n: 'Hundreds', l: 'Businesses' },
              ].map((s) => (
                <div key={s.l} className="text-left">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-[-0.03em] text-primary-400 leading-none mb-2">{s.n}</div>
                  <div className="text-sm text-neutral-300">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="logos" className="section-padding bg-white">
          <div className="container-custom">
            <Intro
              eyebrow="Customers"
              title={<>Trusted by the businesses<br />we move money for.</>}
              intro="Retail, hospitality, gaming and more, across our live markets."
            />
            <div className="partner-carousel-container mb-6">
              <PartnerCarousel partners={PARTNERS_A} direction="left" speed={40} />
            </div>
            <div className="partner-carousel-container mb-12">
              <PartnerCarousel partners={PARTNERS_B} direction="right" speed={40} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500 mb-5">Backed by</p>
            <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
              {[
                { name: 'Founder Collective', logo: '/founder_collective_logo.png', size: 'h-7 lg:h-8' },
                { name: 'Raba Partnership', logo: '/Raba_logo.webp', size: 'h-6 lg:h-7' },
                { name: 'Digital Currency Group', logo: '/digital-currency-group-logo-nobg.png', size: 'h-10 lg:h-12' },
              ].map((b) => (
                <img key={b.name} src={b.logo} alt={b.name} className={`${b.size} w-auto object-contain !mx-0`} />
              ))}
            </div>
            <Link to="/resources/about" className="inline-flex items-center gap-1.5 mt-5 font-semibold text-primary-600 hover:text-primary-700">
              Meet our investors and angels
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <section id="crypto-in-out" className="section-padding bg-neutral-50">
          <div className="container-custom">
            <Intro
              eyebrow="Crypto In · Crypto Out"
              title={<>Your customers use crypto.<br />You never have to.</>}
              intro="The two products run in opposite directions on the same balance. They pay and get paid in crypto. You fund and settle from the wallets you already hold."
            />
            <div className="home-grid-2">
              <article className="rounded-2xl border border-neutral-200 bg-white p-6 lg:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600 mb-2">Live</p>
                <h3 className="text-2xl font-display font-bold text-neutral-900 mb-2">Crypto In</h3>
                <p className="text-neutral-600 mb-5">Accept crypto. Settle in rand or stablecoin.</p>
                <ol className="flex flex-col sm:flex-row gap-2 sm:gap-3 text-sm mb-6">
                  {['Your customer pays', 'We lock the rate', 'You get settled'].map((step, i) => (
                    <li key={step} className="flex-1 rounded-xl bg-neutral-50 border border-neutral-200 px-3 py-2">
                      <span className="block text-xs font-semibold text-primary-600 mb-0.5">0{i + 1}</span>
                      <span className="font-medium text-neutral-900">{step}</span>
                    </li>
                  ))}
                </ol>
                <Ticks items={[
                  'Any wallet, plus Binance Pay, Luno Pay, VALR Pay and 700+ via WalletConnect',
                  'Checkout, in-store QR and player deposits',
                  'Final settlement, so no chargebacks',
                  // TODO(confirm): settlement
                  `You settle in ${SETTLEMENT}`,
                ]} />
                <Link to="/online" className="inline-flex items-center gap-1.5 mt-6 font-semibold text-primary-600 hover:text-primary-700">
                  Crypto In
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
              <article className="rounded-2xl border border-neutral-200 bg-white p-6 lg:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600 mb-2">Live</p>
                <h3 className="text-2xl font-display font-bold text-neutral-900 mb-2">Crypto Out</h3>
                <p className="text-neutral-600 mb-5">Fund in fiat. Pay out in crypto.</p>
                <ol className="flex flex-col sm:flex-row gap-2 sm:gap-3 text-sm mb-6">
                  {['You start the payout', 'They claim the link', 'It lands in minutes'].map((step, i) => (
                    <li key={step} className="flex-1 rounded-xl bg-neutral-50 border border-neutral-200 px-3 py-2">
                      <span className="block text-xs font-semibold text-primary-600 mb-0.5">0{i + 1}</span>
                      <span className="font-medium text-neutral-900">{step}</span>
                    </li>
                  ))}
                </ol>
                <Ticks items={[
                  'A payout link per order, claimed by your customer',
                  'Every address screened before funds move',
                  'You never collect or store the wallet',
                  'Crypto In funds payouts from the same balance',
                ]} />
                <Link to="/payouts" className="inline-flex items-center gap-1.5 mt-6 font-semibold text-primary-600 hover:text-primary-700">
                  Crypto Out
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            </div>
          </div>
        </section>

        <MoneyMovement />

        <section id="solutions" className="section-padding bg-neutral-50">
          <div className="container-custom">
            <Intro
              eyebrow="Solutions"
              title={<>For anyone whose users<br />move money in and out.</>}
              intro="Start with the flow you need. Pay-ins, payouts and the balance are the same underneath."
            />
            <div className="home-grid-4">
              {SOLUTIONS.map((s) => (
                <Link key={s.title} to={s.to} className="rounded-2xl border border-neutral-200 bg-white p-5 hover:border-neutral-300 block h-full">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{s.body}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="coverage" className="section-padding bg-white">
          <div className="container-custom">
            <Intro
              eyebrow="Coverage"
              title={<>Live where we operate.<br />More of Africa to follow.</>}
              intro={LIVE_MARKETS}
            />
            <div className="home-grid-3">
              {MARKETS.map((m) => (
                <article key={m.name} className="rounded-2xl border border-neutral-200 p-5 flex items-center gap-4">
                  <img src={m.flag} alt="" width={40} height={40} className="w-10 h-10 rounded-full !mx-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">{m.name}</h3>
                    <p className="text-sm text-primary-600 font-semibold">{m.note}</p>
                  </div>
                </article>
              ))}
            </div>
            {/* TODO(confirm): settlement — markets are live; settlement is not stated per country */}
            <p className="mt-6 text-neutral-600 max-w-3xl">Wherever you are live, settlement is {SETTLEMENT}.</p>
          </div>
        </section>

        <section id="testimonials" className="section-padding bg-neutral-50">
          <div className="container-custom">
            <Intro
              eyebrow="In their words"
              // TODO(confirm): customer count
              title={<>Hundreds of businesses.<br />Three of them, in their words.</>}
              intro="What merchants say about taking payments and paying people with Ezeebit."
            />
            <div className="max-w-3xl w-full">
              <div className="relative">
                <button type="button" onClick={() => setQuote((q) => (q - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white rounded-full shadow flex items-center justify-center text-neutral-700" aria-label="Previous testimonial">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button type="button" onClick={() => setQuote((q) => (q + 1) % TESTIMONIALS.length)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white rounded-full shadow flex items-center justify-center text-neutral-700" aria-label="Next testimonial">
                  <ChevronRight className="w-5 h-5" />
                </button>
                <figure className="rounded-2xl border border-neutral-200 bg-white p-8 sm:px-16">
                  <div className="flex gap-1 mb-4" aria-label="5 stars">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 text-warning-500 fill-current" />)}
                  </div>
                  <blockquote className="text-lg text-neutral-700 leading-relaxed">“{current.content}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-4">
                    <img src={current.logo} alt="" width={64} height={64} className="w-16 h-16 object-contain !mx-0" />
                    <div>
                      <div className="font-semibold text-neutral-900">{current.name}</div>
                      <div className="text-sm text-neutral-500">{current.role}, {current.company}</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
              <div className="flex mt-4">
                {TESTIMONIALS.map((t, i) => (
                  <button key={t.name} type="button" onClick={() => setQuote(i)} className="px-1.5 py-3" aria-label={`Go to testimonial from ${t.name}`}>
                    <span className={`block h-2.5 rounded-full ${i === quote ? 'bg-primary-500 w-6' : 'w-2.5 bg-neutral-300'}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="security" className="section-padding bg-white">
          <div className="container-custom">
            <Intro
              eyebrow="Security and compliance"
              title={<>The checks a buyer<br />asks about.</>}
              intro="Licensing, custody and screening, in the words we can stand behind today."
            />
            <div className="home-grid-2">
              <article className="rounded-2xl border border-neutral-200 p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Licensing</h3>
                {/* TODO(confirm): regulatory wording */}
                <p className="text-neutral-600 text-sm leading-relaxed">{LICENCE}</p>
                <p className="text-neutral-600 text-sm leading-relaxed mt-3">FIC compliant, with KYC, KYB, AML and POPIA handled by Ezeebit.</p>
              </article>
              <article className="rounded-2xl border border-neutral-200 p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Custody</h3>
                {/* TODO(confirm): SOC 2 */}
                <p className="text-neutral-600 text-sm leading-relaxed">{CUSTODY} Multi-party computation splits the keys, so no one person can move the funds.</p>
              </article>
              <article className="rounded-2xl border border-neutral-200 p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Screening</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">Every payer, payee and wallet is checked. Travel Rule data is captured on transfers, and addresses are screened before funds move.</p>
              </article>
              <article className="rounded-2xl border border-neutral-200 p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">No chargebacks</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">A confirmed crypto payment is final. The rate is locked and hedged at the point of payment, so the sale stays settled.</p>
              </article>
            </div>
            <a href="https://trust.ezeebit.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-6 font-semibold text-primary-600 hover:text-primary-700">
              Trust Centre
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        <section id="pricing" className="section-padding bg-neutral-50">
          <div className="container-custom">
            {/* TODO(confirm): pricing — plan structure only. No R150, no ePOS monthly price, no per-payout fee. */}
            <Intro
              eyebrow="Pricing"
              title={<>Three plans.<br />The prices live on one page.</>}
              intro="1% or lower per transaction, excluding VAT. Starter, Professional and Enterprise. Open the pricing page for the figures."
            />
            <div className="home-grid-3">
              {PLANS.map((plan) => (
                <article key={plan.name} className={`rounded-2xl border bg-white p-6 flex flex-col ${plan.featured ? 'border-primary-500 ring-2 ring-primary-500' : 'border-neutral-200'}`}>
                  {plan.featured && <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600 mb-2">Most used</p>}
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">{plan.name}</h3>
                  <p className="text-sm text-neutral-600 mb-4">{plan.body}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-neutral-700">
                        <Check className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link to="/pricing" className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-neutral-950 text-white font-semibold px-4 py-3 hover:bg-neutral-800">
                    See pricing
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section-padding bg-white">
          <div className="container-custom">
            <Intro
              eyebrow="FAQ"
              title={<>Questions we hear<br />before a first call.</>}
              intro="Short answers from the questions already on our FAQ. The full list is one click away."
            />
            <div className="max-w-3xl w-full border-t border-neutral-200">
              {FAQS.map((item) => (
                <details key={item.q} className="group border-b border-neutral-200">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-medium text-neutral-900 [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0 group-open:rotate-180" />
                  </summary>
                  <p className="pb-4 text-sm text-neutral-600 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
            <Link to="/resources/faq" className="inline-flex items-center gap-1.5 mt-6 font-semibold text-primary-600 hover:text-primary-700">
              All questions
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <section id="book-a-call" className="relative overflow-hidden bg-neutral-950 py-14 lg:py-20">
          <DarkBackdrop glow="left" />
          <div className="container-custom relative">
            <div className="home-grid-2 items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-400 mb-3">Get started</p>
                <h2 className="text-3xl lg:text-5xl font-display font-bold text-white leading-[1.08] tracking-[-0.02em] mb-4">
                  Sign up, verify,<br />then choose a way to get paid.
                </h2>
                <ol className="space-y-4 mt-6">
                  {[
                    ['Create your merchant account', 'A few minutes, with no setup fee.'],
                    ['Complete online KYC', 'We guide you through it until you are live.'],
                    ['Choose how you take payments', 'An ePOS, an Ezeebit Pay QR code, or an online plugin.'],
                  ].map(([t, d], i) => (
                    <li key={t} className="flex gap-4">
                      <span className="text-primary-400 font-display font-bold text-xl leading-none mt-0.5">0{i + 1}</span>
                      <div>
                        <p className="text-white font-semibold">{t}</p>
                        <p className="text-sm text-neutral-300">{d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 lg:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-400 mb-3">Book a call</p>
                <h3 className="text-2xl font-display font-bold text-white mb-3">Talk to a person on the team</h3>
                <p className="text-neutral-300 leading-relaxed mb-6">
                  Bring your use case. We’ll walk through pay-ins, payouts and which plan fits.
                </p>
                {/* TODO(confirm): support */}
                <p className="text-sm text-neutral-300 mb-6">{SUPPORT}</p>
                <div className="flex flex-col gap-3">
                  <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 text-white font-semibold px-5 py-3 hover:bg-primary-600">
                    Book a call
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href="https://merchant.ezeebit.com/#/signup" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 text-white font-semibold px-5 py-3 hover:bg-white/5">
                    Get started free
                  </a>
                </div>
                <p className="mt-5 text-sm text-neutral-400">
                  +27 21 879 5074 · support@ezeebit.com · Cape Town
                </p>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  )
}

export default Home
