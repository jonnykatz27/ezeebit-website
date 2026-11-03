import { Fragment, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowDownLeft, ArrowLeftRight, ArrowRight, ArrowUpRight, Banknote, Check, ChevronDown, ChevronLeft,
  ChevronRight, Code, Headphones, Lock, MousePointerClick, Plug, ShieldCheck, Star, ThumbsUp,
  UserCheck, Wallet, Webhook,
} from 'lucide-react'
import { motion } from '../lib/motion'
import PartnerCarousel from '../components/PartnerCarousel'
import SEO from '../components/SEO'
import FlowDemo, { DemoPanel } from '../components/demo/FlowDemo'
import { ChannelDemo, type Channel } from '../components/demo/TourWidgets'
import PageHero, { HERO_PRIMARY, HERO_SECONDARY } from '../components/hero/PageHero'
import HomeFlowVisual from '../components/hero/HomeFlowVisual'
import { PortalBalanceCard, PortalConvertCard, PORTAL_PAGE_BG } from '../components/portal/PortalUI'
import DarkBackdrop from '../components/DarkBackdrop'
import { LIVE_MARKETS } from '../lib/schema'

/**
 * The facts the homepage repeats, worded as the product pages, the FAQ and
 * the contact page already state them, so a figure never differs between
 * sections or from the rest of the site.
 */
const SETTLEMENT = 'ZAR, KES, NGN or USD the next business day, or stablecoin the same day'

/** Regulatory status, in the "regulated by the FSCA" wording used for new copy. */
const REGULATED = 'Ezeebit is regulated by the FSCA as a Crypto Asset Service Provider, FSP No. 53664.'

/** As the contact page lists it: email around the clock, phone and WhatsApp in office hours. */
const SUPPORT = 'Support 24/7 by email, and by phone or WhatsApp Mon–Fri, 8am–6pm SAST.'


/** Logos cropped to their marks, with each file's size, so the carousel can give them equal weight. */
const PARTNERS_A: { name: string; logo: string; size: [number, number]; boost?: number }[] = [
  { name: 'iStore', logo: '/partners/istore.webp', size: [464, 128] },
  { name: 'Skins', logo: '/partners/skins.webp', size: [154, 155], boost: 1.3 },
  { name: 'Le Creuset', logo: '/partners/le-creuset.webp', size: [456, 72] },
  { name: 'Amiri', logo: '/partners/amiri.webp', size: [455, 111] },
  { name: 'Ritual', logo: '/partners/ritual.webp', size: [346, 58] },
  { name: 'Hydraulics', logo: '/partners/hydraulics.webp', size: [480, 41] },
  { name: 'Al Capone', logo: '/partners/alcapone.webp', size: [461, 101] },
  { name: 'Scoin', logo: '/partners/scoin.webp', size: [480, 148], boost: 1.15 },
  { name: 'Soul Gallery', logo: '/partners/soul-gallery.webp', size: [456, 105] },
  { name: 'Sunbet', logo: '/partners/sunbet.webp', size: [313, 164] },
]

const PARTNERS_B: typeof PARTNERS_A = [
  { name: 'Yawa', logo: '/partners/yawa.webp', size: [456, 145] },
  { name: 'Tintswalo Lodge', logo: '/partners/tintswalo.webp', size: [461, 309] },
  { name: 'Luxity', logo: '/partners/luxity.webp', size: [480, 129] },
  { name: 'The Capital', logo: '/partners/the-capital.webp', size: [464, 134] },
  { name: 'Spar', logo: '/partners/spar.webp', size: [370, 442] },
  { name: 'Cultish', logo: '/partners/cultish.webp', size: [298, 57] },
  { name: 'Watch Channel', logo: '/partners/watch-channel.webp', size: [480, 117], boost: 1.15 },
  { name: 'Diesel', logo: '/partners/diesel.webp', size: [469, 173] },
  { name: 'Sumptuous Tours', logo: '/partners/sumptuous-tours.webp', size: [364, 57] },
  { name: 'BHH', logo: '/partners/bhh.webp', size: [256, 164], boost: 1.3 },
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
/** A small card beside the demo, calling out one thing the screen does. */
type Side = { icon: typeof Lock; caption: string; value: string; sub?: string; ok?: string }
/** A photo of the hardware beside the demo, with its name and what it does. */
type Shot = { image: string; size: [number, number]; height: string; name: string; note: string }
/** One demo in the tour, with the cards (or photos) to its left and right on a wide screen. */
type Screen = { id: string; label: string; sides: [Side[] | Shot[], Side[] | Shot[]] }
type Stop = {
  id: string
  label: string
  heading: string
  body: string
  facts: Fact[]
  links: { label: string; to: string }[]
  /** The demos under this tab. More than one gets its own switch above the demo. */
  screens: Screen[]
  /** Headings over the cards either side of the demo, where they need saying. */
  sideTitles?: [string, string]
}

/** The same on every channel, because every channel opens the same checkout. */
const CHECKOUT_SIDES: Side[] = [
  { icon: Lock, caption: 'Rate', value: 'Locked before they pay', sub: 'You receive exactly what you charged' },
  { icon: ShieldCheck, caption: 'Chargebacks', value: 'None', sub: 'Crypto payments are final' },
]

const PAY_INS: Stop = {
  id: 'pay-ins',
  label: 'Pay-ins',
  heading: 'One checkout, wherever your customers pay',
  body: 'In your store, on your website or on your platform, customers land on the same checkout and pay from the wallet they already use.',
  facts: [
    ['Pay with', 'Any wallet, plus VALR, Luno and Binance'],
    ['Coins', 'BTC, ETH, USDT, USDC and more'],
    ['Settlement', 'Local currency next business day, or stablecoin same day'],
    ['Setup', 'No setup fees'],
  ],
  links: [
    { label: 'In-store payments', to: '/in-store' },
    { label: 'Online checkout', to: '/online' },
    { label: 'Crypto for platforms', to: '/platforms' },
  ],
  sideTitles: ['How they get there', 'Same on every channel'],
  screens: [
    {
      id: 'in-store',
      label: 'In-store',
      sides: [
        // The two ways into the checkout in a store, one either side of it. Each
        // photo's height keeps the two in proportion: the stand is shorter than the ePOS.
        [{ image: '/tour/epos.webp', size: [224, 601], height: 'h-[260px] xl:h-[360px]', name: 'Ezeebit ePOS', note: 'The checkout opens on the device' }],
        [{ image: '/tour/qr-stand.webp', size: [320, 470], height: 'h-[190px] xl:h-[260px]', name: 'Ezeebit Pay QR', note: 'Customers scan it and pay on their phone' }],
      ],
    },
    {
      id: 'online',
      label: 'Online checkout',
      sides: [
        [
          { icon: Plug, caption: 'Plugins', value: 'Shopify, WooCommerce, Magento', sub: 'Or the API' },
          { icon: MousePointerClick, caption: 'Checkout', value: 'Opens from Pay with crypto', sub: 'With the order total carried over' },
        ],
        CHECKOUT_SIDES,
      ],
    },
    {
      id: 'platforms',
      label: 'Platforms',
      sides: [
        [
          { icon: Code, caption: 'API', value: 'Opens from your cashier', sub: 'With the amount and the user' },
          { icon: UserCheck, caption: 'Attribution', value: 'Every deposit to its user', sub: 'No matching payments by hand' },
        ],
        CHECKOUT_SIDES,
      ],
    },
  ],
}

const PAY_OUT: Stop = {
  id: 'pay-out',
  label: 'Payouts',
  heading: 'A payout link your customer claims in minutes',
  body: 'Send a link from your fiat balance. Your customer adds their own wallet and the funds land in minutes.',
  facts: [
    ['Pay out in', 'USDT, with more stablecoins soon'],
    ['Speed', 'Minutes, at any hour'],
    ['Branding', 'Your name and colours'],
    ['Use it for', 'Winnings, seller payouts and remittance'],
  ],
  links: [{ label: 'Payouts', to: '/payouts' }],
  screens: [
    {
      id: 'pay-out',
      label: 'Payout claim',
      sides: [
        [
          { icon: Wallet, caption: 'Funding', value: 'Your fiat balance', sub: 'Reserved when the payout is created' },
          { icon: UserCheck, caption: 'Recipient', value: 'No Ezeebit account', sub: 'Only a wallet of their own' },
        ],
        [
          { icon: ShieldCheck, caption: 'Screening', value: 'Wallet address', sub: 'Checked before funds move', ok: 'Clear' },
          { icon: Webhook, caption: 'Webhook', value: 'Payout complete', sub: 'Signed, with the transaction hash', ok: '200 OK' },
        ],
      ],
    },
  ],
}

const HOLD: Stop = {
  id: 'hold',
  label: 'Your balance',
  heading: 'A fiat wallet and a USDT wallet, on one balance',
  body: 'Pay-ins, payouts and conversions land on one ledger. Withdraw to your bank or your own wallet.',
  facts: [
    ['Wallets', 'Fiat and USDT'],
    ['Records', 'A reference and timestamp on every movement'],
    ['Access', 'The Merchant Portal or the API'],
    ['Safeguarding', 'Held with an FSCA-regulated Crypto Asset Service Provider, FSP No. 53664'],
  ],
  links: [{ label: 'Wallets', to: '/wallets' }],
  screens: [
    {
      id: 'hold',
      label: 'Merchant Portal',
      sides: [
        [
          { icon: ArrowDownLeft, caption: 'Pay-ins', value: 'Land on one ledger', sub: 'Each with a reference and timestamp' },
          { icon: ArrowLeftRight, caption: 'Convert', value: 'At a quoted rate', sub: 'Between fiat and USDT' },
        ],
        [
          { icon: ArrowUpRight, caption: 'Payouts', value: 'From the same balance', sub: 'No second provider to pre-fund' },
          { icon: Banknote, caption: 'Withdraw', value: 'To your bank or wallet', sub: 'Fiat next business day, stablecoin same day' },
        ],
      ],
    },
  ],
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
  { flag: '/za-flag.svg', name: 'South Africa', note: 'Live · settle in ZAR' },
  { flag: '/ke-flag.svg', name: 'Kenya', note: 'Live · settle in KES' },
  { flag: '/ng-flag.svg', name: 'Nigeria', note: 'Live · settle in NGN' },
]

const PLANS = [
  {
    name: 'Starter',
    price: 'R0 a month',
    body: 'For a business taking its first stablecoin and crypto payments.',
    points: ['Ezeebit Pay and QR codes', 'Merchant Portal', 'E-commerce plugins and API', 'No ePOS device'],
  },
  {
    name: 'Professional',
    price: 'R150 per device a month',
    body: 'For a growing business that wants the counter covered too.',
    points: ['Everything in Starter', 'ePOS device', 'Printable receipts', 'Easy cash-ups'],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom pricing',
    body: 'For a business that needs its own setup and a named contact.',
    points: ['Dedicated account manager', 'Custom integrations', 'White-label options', 'Custom analytics and reporting'],
  },
]

const FAQS: { q: string; a: string }[] = [
  {
    q: 'How do I get started with Ezeebit?',
    a: "Sign up for a merchant account, complete our quick online KYC, then choose either an in-store ePOS device, Ezeebit Pay QR code or plug in our online payment plugin. We guide you through every step until you're live.",
  },
  {
    q: 'Which cryptocurrencies are supported?',
    a: 'Accept Bitcoin (BTC), Ethereum (ETH), USDT, USDC, BNB, DAI, PAXG, and the rand-backed stablecoins ZARP and ZARU. Every payment is hedged at checkout to shield you from volatility, then settled in fiat (ZAR, KES, NGN or USD) or in stablecoin.',
  },
  {
    q: 'How fast are payments processed?',
    a: 'The rate is locked at checkout and the payment is confirmed on-chain. Settlement is the next business day in local currency, or the same day in stablecoin.',
  },
  {
    q: 'Can I choose to be paid in stablecoins instead of local currency?',
    a: 'Yes. You decide how you want to be settled: stablecoins (USDT or USDC) for speed and flexibility, or fiat (ZAR, KES, NGN or USD) deposited directly into your bank account.',
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
    a: 'Yes. You create the payout with an amount and your own reference, we reserve the fiat and hand back a link, and your customer enters their own wallet address to claim it. Payouts settle on-chain in minutes, at any hour. Payouts are available in USDT today, with more stablecoin options coming soon.',
  },
  {
    q: 'Can I hold a balance with Ezeebit?',
    a: 'Yes. You have a fiat wallet and a USDT wallet, and you can convert between them at a quoted rate. What you take in funds what you pay out. Withdraw fiat to your bank, or stablecoin to your own wallet.',
  },
  {
    q: 'Is Ezeebit regulated?',
    a: `Yes. ${REGULATED} The FSCA is South Africa's Financial Sector Conduct Authority.`,
  },
  {
    q: 'Which countries does Ezeebit operate in?',
    a: 'Ezeebit provides stablecoin and crypto payment infrastructure for merchants and platforms across Africa. It is live in South Africa, Kenya and Nigeria, with more African markets to follow.',
  },
  {
    q: 'Do you provide customer support?',
    a: `Yes. ${SUPPORT} Email support@ezeebit.com, phone +27 21 879 5074 or WhatsApp +27 79 443 9375.`,
  },
]

function onTabKeys(e: KeyboardEvent, index: number, ids: string[], set: (id: string) => void, prefix: string) {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
  e.preventDefault()
  const next = e.key === 'ArrowRight' ? (index + 1) % ids.length : (index - 1 + ids.length) % ids.length
  set(ids[next])
  document.getElementById(`${prefix}-${ids[next]}`)?.focus()
}

/** A section's label, two-line heading and lead. `aside` sets it beside the content on wide screens. */
function Intro({ eyebrow, title, intro, aside }: { eyebrow: string; title: ReactNode; intro?: ReactNode; aside?: boolean }) {
  return (
    <div className={`max-w-3xl w-full text-left ${aside ? 'mb-8 lg:mb-0 lg:col-span-5' : 'mb-8 lg:mb-12'}`}>
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

/** The facts as a boxed grid, two to a row; an odd last fact takes the full row. */
function Facts({ facts }: { facts: Fact[] }) {
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200">
      {facts.map(([term, detail], i) => (
        <div key={term} className={`bg-white p-4 ${facts.length % 2 === 1 && i === facts.length - 1 ? 'sm:col-span-2' : ''}`}>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500 mb-1">{term}</dt>
          <dd className="text-sm text-neutral-800 leading-relaxed">{detail}</dd>
        </div>
      ))}
    </dl>
  )
}

/** The copy under the stage: what the screen is for on the left, the facts on the right. */
function StopCopy({ stop }: { stop: Stop }) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <h3 className="text-2xl lg:text-3xl font-display font-bold text-neutral-900 leading-tight mb-3 [text-wrap:balance]">{stop.heading}</h3>
        <p className="text-neutral-600 leading-relaxed max-w-xl">{stop.body}</p>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
          {stop.links.map((l) => (
            <Link key={l.to} to={l.to} className="inline-flex items-center gap-1.5 font-semibold text-primary-600 hover:text-primary-700">
              {l.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          ))}
        </div>
      </div>
      <div className="lg:col-span-5">
        <Facts facts={stop.facts} />
      </div>
    </div>
  )
}

const SideCard = ({ side }: { side: Side }) => {
  const Icon = side.icon
  return (
    <div className="w-full max-w-[250px] rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-[0_14px_36px_-18px_rgba(0,26,54,0.3)]">
      <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-neutral-500 mb-1.5">
        <Icon className="w-3.5 h-3.5 text-primary-600" />
        {side.caption}
      </p>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-neutral-900">{side.value}</p>
        {side.ok && <span className="shrink-0 rounded-full bg-success-50 px-2 py-0.5 text-[10px] font-semibold text-success-700">{side.ok}</span>}
      </div>
      {side.sub && <p className="mt-0.5 text-xs text-neutral-500 leading-snug">{side.sub}</p>}
    </div>
  )
}

type Product = {
  name: string
  icon: typeof ArrowDownLeft
  tagline: string
  steps: { who: string; what: string; you?: boolean }[]
  ticks: string[]
  strip: { label: string; marks: { name: string; logo: string; coin?: boolean; soon?: boolean }[]; note?: string; named?: boolean }
  docs: string
}

const DOCS = 'https://docs.ezeebit.com'

const PRODUCTS: Product[] = [
  {
    name: 'Crypto In',
    icon: ArrowDownLeft,
    tagline: 'Accept crypto. Settle in local currency or stablecoin.',
    steps: [
      { who: 'Your customer', what: 'Pays in USDT, USDC, BTC, ETH and more' },
      { who: 'Ezeebit', what: 'Locks the rate, screens and hedges' },
      { who: 'You', what: 'Get local currency next business day, or stablecoin same day', you: true },
    ],
    ticks: [
      'Any wallet, plus Binance Pay, Luno Pay, VALR Pay and 700+ wallets via WalletConnect',
      'In-store QR, online checkout and platform deposits',
      'Final payments, so no chargebacks',
      `You settle in ${SETTLEMENT}`,
    ],
    strip: {
      label: 'Pay with',
      marks: [
        { name: 'VALR Pay', logo: '/valr_logo%20(clean).png' },
        { name: 'Luno Pay', logo: '/luno_logo%20(clean).png' },
        { name: 'Binance Pay', logo: '/Binance-Logo%20(clean).png' },
        { name: 'WalletConnect Pay', logo: '/walletconnect-pay.svg' },
        { name: 'USDT', logo: '/usdt-round.svg', coin: true },
        { name: 'USDC', logo: '/usdc-logo.svg', coin: true },
        { name: 'Bitcoin', logo: '/btc-logo.svg', coin: true },
        { name: 'Ethereum', logo: '/eth-logo.svg', coin: true },
        { name: 'BNB', logo: '/bnb-logo.svg', coin: true },
      ],
    },
    docs: `${DOCS}/payment-gateway/overview`,
  },
  {
    name: 'Crypto Out',
    icon: ArrowUpRight,
    tagline: 'Fund in local currency. Pay out in stablecoin.',
    steps: [
      { who: 'You', what: 'Create the payout from your fiat balance', you: true },
      { who: 'Ezeebit', what: 'Screens the wallet and sends on-chain' },
      { who: 'Your customer', what: 'Claims it to their own wallet in minutes' },
    ],
    ticks: [
      'A payout link per order, claimed by your customer',
      'Every address screened before funds move',
      'You never collect or store the wallet',
      'Pay-ins fund payouts from the same balance',
    ],
    strip: {
      label: 'Pay out in',
      named: true,
      marks: [
        { name: 'USDT', logo: '/usdt-round.svg', coin: true },
        { name: 'USDC', logo: '/usdc-logo.svg', coin: true, soon: true },
        { name: 'ZARP', logo: '/zarp-logo.png', coin: true, soon: true },
        { name: 'ZARU', logo: '/zaru-logo.png', coin: true, soon: true },
      ],
    },
    docs: `${DOCS}/payout-gateway/overview`,
  },
]

type Mark = { name: string; logo: string }

/** What goes into and comes out of each combination, as the coins and flags themselves. */
const CRYPTO_IN: Mark[] = [
  { name: 'Bitcoin', logo: '/btc-logo.svg' },
  { name: 'Ethereum', logo: '/eth-logo.svg' },
  { name: 'USDT', logo: '/usdt-round.svg' },
  { name: 'USDC', logo: '/usdc-logo.svg' },
]
// Crypto goes out as USDT, the one coin payouts are made in today
const USDT: Mark[] = [{ name: 'USDT', logo: '/usdt-round.svg' }]
const LOCAL: Mark[] = [
  { name: 'ZAR', logo: '/za-flag.svg' },
  { name: 'KES', logo: '/ke-flag.svg' },
  { name: 'NGN', logo: '/ng-flag.svg' },
  { name: 'USD', logo: '/us-flag.svg' },
]

/** The ways the two products combine, from the merchant's side. */
const COMBOS = [
  { kind: 'Off-ramp', from: CRYPTO_IN, to: LOCAL, title: 'Crypto in, local currency out', body: 'Your customer pays in crypto. You receive ZAR, KES, NGN or USD in your bank.' },
  { kind: 'On-ramp', from: LOCAL, to: USDT, title: 'Local currency in, crypto out', body: 'You fund payouts in local currency. Your customer receives stablecoin.' },
  { kind: 'Stablecoin', from: CRYPTO_IN, to: USDT, title: 'Crypto in, stablecoin held', body: 'Keep what comes in as USDT and convert when it suits you.' },
  { kind: 'Round trip', from: CRYPTO_IN, to: USDT, title: 'Crypto in, crypto out', body: 'What your customers pay in funds what they cash out, on one balance.' },
]

/** One side of a combination: its coins or flags overlapping in a pill, named when there is only one. */
const Marks = ({ marks }: { marks: Mark[] }) => (
  <span title={marks.map((m) => m.name).join(', ')} className="inline-flex items-center gap-1.5 rounded-full bg-white p-1 ring-1 ring-inset ring-neutral-200">
    <span className="flex -space-x-1">
      {marks.map((m) => (
        <img key={m.name} src={m.logo} alt="" width={24} height={24} className="w-6 h-6 mx-0 rounded-full bg-white object-contain ring-2 ring-white" />
      ))}
    </span>
    {marks.length === 1 && <span className="pr-1.5 text-xs font-semibold text-neutral-800">{marks[0].name}</span>}
  </span>
)

function ProductCard({ product: p }: { product: Product }) {
  const Icon = p.icon
  return (
    <article className="flex flex-col rounded-3xl border border-neutral-200 bg-white p-6 lg:p-8 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between gap-4 mb-3">
        <h3 className="flex items-center gap-3 text-2xl lg:text-3xl font-display font-bold text-neutral-900">
          <span className="w-11 h-11 rounded-xl bg-neutral-950 text-primary-400 flex items-center justify-center shrink-0" aria-hidden="true">
            <Icon className="w-5 h-5" strokeWidth={2.5} />
          </span>
          {p.name}
        </h3>
        <span className="flex items-center gap-1.5 rounded-full bg-success-50 px-2.5 py-1 text-xs font-semibold text-success-700">
          <span className="w-1.5 h-1.5 rounded-full bg-success-500" />
          Live
        </span>
      </div>
      <p className="text-lg text-neutral-600 mb-6">{p.tagline}</p>

      <ol className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-1.5 sm:gap-2 mb-7">
        {p.steps.map((s, i) => (
          <Fragment key={s.who}>
            {i > 0 && (
              <li aria-hidden="true" className="flex items-center justify-center text-neutral-400">
                <ArrowRight className="w-4 h-4 rotate-90 sm:rotate-0" />
              </li>
            )}
            <li className={`rounded-xl px-3.5 py-3 ${s.you ? 'bg-neutral-950 text-white' : 'bg-neutral-50 border border-neutral-200 text-neutral-900'}`}>
              <span className={`block text-[11px] font-semibold uppercase tracking-[0.12em] mb-1 ${s.you ? 'text-primary-400' : 'text-neutral-500'}`}>{s.who}</span>
              <span className="block text-sm font-medium leading-snug">{s.what}</span>
            </li>
          </Fragment>
        ))}
      </ol>

      <Ticks items={p.ticks} />

      <div className="mt-auto pt-7">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-neutral-200 pt-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500">{p.strip.label}</span>
          <ul className="flex flex-wrap items-center gap-2">
            {p.strip.marks.map((m) =>
              p.strip.named ? (
                <li key={m.name} className={`flex items-center gap-1.5 rounded-full border py-1 pl-1 pr-2.5 text-xs font-semibold ${m.soon ? 'border-dashed border-neutral-300 text-neutral-500' : 'border-neutral-200 text-neutral-800'}`}>
                  <img src={m.logo} alt="" width={20} height={20} className={`w-5 h-5 rounded-full !mx-0 ${m.soon ? 'opacity-60 grayscale' : ''}`} />
                  {m.name}
                  {m.soon && <span className="rounded-full bg-neutral-100 px-1.5 text-[10px] font-semibold text-neutral-500">Soon</span>}
                </li>
              ) : (
                <li key={m.name}>
                  <img src={m.logo} alt={m.name} title={m.name} width={28} height={28} className={`w-7 h-7 !mx-0 ${m.coin ? 'rounded-full' : 'rounded-lg'}`} />
                </li>
              ),
            )}
          </ul>
          {p.strip.note && <span className="text-xs text-neutral-500">{p.strip.note}</span>}
        </div>
        <a href={p.docs} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-5 font-semibold text-primary-600 hover:text-primary-700">
          {p.name} docs
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </article>
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

/** Every tab in the tour, in the order money moves: in, out, and the balance between. */
const TOUR: Stop[] = [PAY_INS, PAY_OUT, HOLD]

/** Shows the open one of several things stacked in one grid cell, fading between them. */
const fade = (on: boolean) => `[grid-area:1/1] transition-opacity duration-300 ${on ? 'opacity-100' : 'opacity-0 invisible pointer-events-none'}`

/**
 * Every tab's demo sits in a frame of this height, whatever the screen inside
 * it, so switching tabs or moving through a demo never resizes the section. A
 * screen taller than the frame scrolls inside it, as it would on a phone.
 */
const DEVICE_HEIGHT = 700

/** The demo for a screen, in the fixed frame. */
function TourDemo({ id }: { id: string }) {
  switch (id) {
    case 'in-store':
    case 'online':
    case 'platforms':
      return <ChannelDemo channel={id as Channel} />
    case 'pay-out':
      return <FlowDemo fixed src="/demos/pay-out.html" flow="payout" label="Payout claim" title="Interactive demo of an Ezeebit payout" />
    default:
      return (
        <DemoPanel fixed label="Merchant Portal">
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden rounded-[20px]">
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
          </div>
        </DemoPanel>
      )
  }
}

/** Coins resting at the edges of the stage. Still, so the demo is the only thing that moves. */
const STAGE_COINS = [
  { src: '/usdt-round.svg', className: 'right-[6%] top-[7%]' },
  { src: '/usdc-logo.svg', className: 'left-[5%] bottom-[9%]' },
  { src: '/btc-logo.svg', className: 'right-[10%] bottom-[7%]' },
]

const isShots = (x: Side[] | Shot[]): x is Shot[] => 'image' in x[0]

/** Photos of the hardware, on one baseline, each named underneath. */
const Shots = ({ shots }: { shots: Shot[] }) => (
  <div className="flex items-end gap-5 xl:gap-8">
    {shots.map((s) => (
      <figure key={s.name} className="flex w-[140px] xl:w-[190px] flex-col items-center text-center">
        <img src={s.image} alt={s.name} width={s.size[0]} height={s.size[1]} loading="lazy" className={`${s.height} w-auto max-w-full object-contain drop-shadow-[0_18px_24px_rgba(0,26,54,0.18)]`} />
        <figcaption className="mt-4">
          <span className="block text-sm font-semibold text-neutral-900">{s.name}</span>
          <span className="block text-xs text-neutral-500 leading-snug">{s.note}</span>
        </figcaption>
      </figure>
    ))}
  </div>
)

/**
 * The cards or photos either side of a demo, with the tab's heading over the
 * cards if it has one; photos are named in their captions instead. Cards that
 * several screens share are drawn once, so they hold still while the demo
 * beside them changes.
 */
function SideColumn({ stop, col, showing }: { stop: Stop; col: 0 | 1; showing: string }) {
  const groups = [...new Set(stop.screens.map((s) => s.sides[col]))]
  const shown = stop.screens.find((s) => s.id === showing)!.sides[col]
  const align = col === 0 ? 'items-end' : 'items-start'
  return (
    <div className="hidden lg:grid grid-cols-1">
      {groups.map((cards, i) => (
        // The heading goes in with each set, so it sits on top of whichever is showing, however tall
        <div key={i} className={`${fade(cards === shown)} flex flex-col justify-center gap-3 ${align}`}>
          {/* Set against the edge nearest the demo */}
          {stop.sideTitles && !isShots(cards) && <p className={`w-full text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500 ${col === 0 ? 'text-right' : ''}`}>{stop.sideTitles[col]}</p>}
          <div className={`w-full flex flex-col gap-4 ${align}`}>
            {isShots(cards) ? <Shots shots={cards} /> : cards.map((side) => <SideCard key={side.caption} side={side} />)}
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * The product tour: a tab each for pay-ins, payouts and the balance between,
 * with pay-ins switching between its three channels, each leading into the
 * same checkout. The live demo sits on a
 * stage with what it does called out either side, and the copy and facts
 * follow underneath.
 */
function ProductTour() {
  const [open, setOpen] = useState(TOUR[0].id)
  // The demo each tab is showing, for a tab with more than one
  const [screenOf, setScreenOf] = useState<Record<string, string>>({})
  const current = (t: Stop) => screenOf[t.id] ?? t.screens[0].id
  // A demo mounts the first time it is shown and then stays, so the iframes
  // load only when asked for and going back to one picks up where it was
  const [seen, setSeen] = useState<string[]>([TOUR[0].screens[0].id])
  const see = (id: string) => setSeen((s) => (s.includes(id) ? s : [...s, id]))
  const show = (id: string) => {
    setOpen(id)
    see(current(TOUR.find((t) => t.id === id)!))
  }
  const pick = (stop: string, screen: string) => {
    setScreenOf((m) => ({ ...m, [stop]: screen }))
    see(screen)
  }

  return (
    <section id="how-it-works" className="scroll-mt-24 section-padding bg-white">
      <div className="container-custom">
        <Intro
          eyebrow="Product tour"
          title={<>See exactly what<br />your customers see.</>}
          intro="The screens your customers and your team use, with the details buyers ask about. Click through them."
        />

        <div className="mb-6 -mx-4 px-4 overflow-x-auto [scrollbar-width:none]">
          <div role="tablist" aria-label="Product screens" className="inline-flex gap-1 p-1 rounded-full bg-neutral-950">
            {TOUR.map((t, index) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`tour-tab-${t.id}`}
                aria-selected={open === t.id}
                aria-controls={`tour-panel-${t.id}`}
                tabIndex={open === t.id ? 0 : -1}
                onClick={() => show(t.id)}
                onKeyDown={(e) => onTabKeys(e, index, TOUR.map((x) => x.id), show, 'tour-tab')}
                className={`min-h-[44px] whitespace-nowrap rounded-full px-4 sm:px-5 py-2 text-sm font-semibold ${open === t.id ? 'bg-primary-500 text-white' : 'text-neutral-300 hover:text-white'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/*
          Every panel sits in the same grid cell, so the section takes the
          tallest one's height and nothing below it moves between tabs. The
          closed ones are invisible, which also keeps them out of the tab order
          and away from screen readers.
        */}
        {/* minmax(0, 1fr) so a wide demo inside can never stretch the panels past the page */}
        <div className="grid grid-cols-1">
          {TOUR.map((t) => (
            <div
              key={t.id}
              role="tabpanel"
              id={`tour-panel-${t.id}`}
              aria-labelledby={`tour-tab-${t.id}`}
              className={fade(open === t.id)}
            >
              {/* The bottom padding matches the switch row above the demo, so the demo sits in the middle of the stage */}
              <div className="relative overflow-hidden rounded-[32px] border border-neutral-200/70 bg-gradient-to-b from-neutral-50 to-white px-3 pt-5 pb-6 sm:px-8 lg:pt-8 lg:pb-[100px] [&_img]:!mx-0">
                {/* A still glow and hairline rings behind the demo */}
                <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2">
                  <span
                    className="absolute rounded-full"
                    style={{ width: 760, height: 760, left: -380, top: -380, background: 'radial-gradient(closest-side, color-mix(in srgb, var(--color-primary-500) 14%, transparent), transparent)' }}
                  />
                  {[500, 700, 900].map((d) => (
                    <span key={d} className="absolute rounded-full border border-neutral-200/80" style={{ width: d, height: d, left: -d / 2, top: -d / 2 }} />
                  ))}
                </div>
                {STAGE_COINS.map((c) => (
                  <img key={c.src} src={c.src} alt="" aria-hidden="true" width={44} height={44} className={`hidden lg:block absolute w-11 h-11 rounded-full bg-white p-0.5 shadow-md ${c.className}`} />
                ))}

                {/*
                  The switch between a tab's demos, or an empty row of the same
                  height where there is only one, so the demo sits in the same
                  place on every tab
                */}
                <div className="relative mb-5 lg:mb-6 flex h-11 justify-center">
                  {t.screens.length > 1 && (
                    <div role="tablist" aria-label={`${t.label} demos`} className="inline-flex gap-1 p-1 rounded-full bg-white ring-1 ring-neutral-200 shadow-[0_8px_24px_-12px_rgba(0,26,54,0.25)]">
                      {t.screens.map((s, index) => (
                        <button
                          key={s.id}
                          type="button"
                          role="tab"
                          id={`tour-screen-${s.id}`}
                          aria-selected={current(t) === s.id}
                          aria-controls={`tour-screen-panel-${s.id}`}
                          tabIndex={current(t) === s.id ? 0 : -1}
                          onClick={() => pick(t.id, s.id)}
                          onKeyDown={(e) => onTabKeys(e, index, t.screens.map((x) => x.id), (id) => pick(t.id, id), 'tour-screen')}
                          className={`whitespace-nowrap rounded-full px-3 sm:px-4 text-[13px] sm:text-sm font-semibold ${current(t) === s.id ? 'bg-neutral-950 text-white' : 'text-neutral-600 hover:text-neutral-900'}`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Each demo and its cards are stacked in place too, so switching between them moves nothing */}
                <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px_minmax(0,1fr)] lg:items-center lg:gap-10">
                  <SideColumn stop={t} col={0} showing={current(t)} />
                  <div className="grid grid-cols-1 grid-rows-1 w-full max-w-[380px] mx-auto" style={{ height: DEVICE_HEIGHT }}>
                    {t.screens.map((s) => (
                      <div
                        key={s.id}
                        {...(t.screens.length > 1 && { role: 'tabpanel', id: `tour-screen-panel-${s.id}`, 'aria-labelledby': `tour-screen-${s.id}` })}
                        className={`${fade(current(t) === s.id)} min-h-0`}
                      >
                        {seen.includes(s.id) && <TourDemo id={s.id} />}
                      </div>
                    ))}
                  </div>
                  <SideColumn stop={t} col={1} showing={current(t)} />
                </div>
              </div>

              <div className="mt-10 lg:mt-14">
                <StopCopy stop={t} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-neutral-950 px-6 py-5">
          <p className="text-neutral-300">Moving a large amount in stablecoin?</p>
          <Link to="/otc" className="inline-flex items-center gap-1.5 font-semibold text-primary-400 hover:text-white">
            Talk to our OTC desk
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
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
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-hidden -mt-20">
        <PageHero
          id="hero"
          stacked
          kicker="Stablecoin pay-ins and payouts"
          // Breaks only between the two phrases, so neither splits across lines
          title={<><span className="inline-block">Crypto in.</span> <span className="inline-block">Crypto out.</span></>}
          accent="One balance."
          description="Your customers pay in and cash out in crypto, in-store, online or on your platform, while you settle in ZAR, KES, NGN, USD or stablecoin. One balance and one API, with compliance built in."
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
            { icon: <ShieldCheck />, label: 'No chargebacks' },
            { icon: <Headphones />, label: '24/7 support' },
          ]}
          wideVisual={<HomeFlowVisual />}
        />

        <section id="stats" className="relative bg-neutral-950 pb-14 lg:pb-20">
          <div className="container-custom">
            <div className="border-t border-white/10 pt-10 lg:pt-14 home-stats">
              {[
                { n: '100,000+', l: 'Transactions processed' },
                { n: '$2m+', l: 'Processed monthly' },
                { n: '60+', l: 'Platforms and businesses' },
                { n: '700+', l: 'Wallets supported' },
              ].map((s) => (
                <div key={s.l} className="text-center even:border-l lg:[&:not(:first-child)]:border-l border-white/10">
                  <div className="text-3xl sm:text-4xl xl:text-5xl whitespace-nowrap font-display font-bold tracking-[-0.03em] text-primary-400 leading-none mb-2">{s.n}</div>
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
              title={<>Chosen by brands<br />your customers know.</>}
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
              intro="Two products on one balance. Your customers pay in and cash out in crypto, while you fund payouts and settle in local currency or stablecoin."
            />
            <div className="home-grid-2">
              {PRODUCTS.map((p) => <ProductCard key={p.name} product={p} />)}
            </div>
            <p className="mt-10 mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">On their own or together</p>
            <div className="home-grid-4">
              {COMBOS.map((c) => (
                <div key={c.kind} className="rounded-2xl border border-neutral-200 bg-white p-5">
                  <div className="flex items-center gap-2 mb-4" aria-hidden="true">
                    <Marks marks={c.from} />
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                    <Marks marks={c.to} />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600 mb-1">{c.kind}</p>
                  <h3 className="text-lg font-semibold leading-snug text-neutral-900 mb-1.5">{c.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ProductTour />

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
            <p className="mt-6 text-neutral-600 max-w-3xl">
              Fiat settles the next business day, in your local currency or in USD. Stablecoin settles the same day.
            </p>
          </div>
        </section>

        <section id="testimonials" className="section-padding bg-neutral-50">
          <div className="container-custom lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
            <Intro
              aside
              eyebrow="In their words"
              title={<>What our merchant<br />partners say.</>}
              intro="What merchants say about taking stablecoin and crypto payments with Ezeebit."
            />
            <div className="w-full lg:col-span-7">
              <figure className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
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
              {/* The arrows sit under the card, so they never cover the quote on a phone */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex">
                  {TESTIMONIALS.map((t, i) => (
                    <button key={t.name} type="button" onClick={() => setQuote(i)} className="px-1.5 py-3" aria-label={`Go to testimonial from ${t.name}`}>
                      <span className={`block h-2.5 rounded-full ${i === quote ? 'bg-primary-500 w-6' : 'w-2.5 bg-neutral-300'}`} />
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setQuote((q) => (q - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="w-11 h-11 bg-white rounded-full border border-neutral-200 flex items-center justify-center text-neutral-700 hover:border-neutral-400" aria-label="Previous testimonial">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button type="button" onClick={() => setQuote((q) => (q + 1) % TESTIMONIALS.length)} className="w-11 h-11 bg-white rounded-full border border-neutral-200 flex items-center justify-center text-neutral-700 hover:border-neutral-400" aria-label="Next testimonial">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="security" className="section-padding bg-white">
          <div className="container-custom">
            <Intro
              eyebrow="Security and compliance"
              title={<>The checks a buyer<br />asks about.</>}
              intro="How Ezeebit is regulated, how funds are held, and how every payment is checked before it reaches you."
            />
            <div className="home-grid-2">
              <article className="rounded-2xl border border-neutral-200 p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Regulation</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{REGULATED}</p>
                <p className="text-neutral-600 text-sm leading-relaxed mt-3">FIC compliant, with KYC, KYB, AML and POPIA handled by Ezeebit.</p>
              </article>
              <article className="rounded-2xl border border-neutral-200 p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Custody</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">Balances sit with an FSCA-regulated Crypto Asset Service Provider. Crypto moves through MPC wallets, which split every key so no single person can move funds.</p>
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
            <Intro
              eyebrow="Pricing"
              title={<>Simple pricing.<br />No setup fees.</>}
              intro="1% or lower per transaction, excluding VAT. Choose the plan that fits how you take payments."
            />
            <div className="home-grid-3">
              {PLANS.map((plan) => (
                <article key={plan.name} className={`rounded-2xl border bg-white p-6 flex flex-col ${plan.featured ? 'border-primary-500 ring-2 ring-primary-500' : 'border-neutral-200'}`}>
                  {plan.featured && <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600 mb-2">Most popular</p>}
                  <h3 className="text-xl font-semibold text-neutral-900 mb-1">{plan.name}</h3>
                  <p className="text-sm font-semibold text-neutral-900 mb-2">{plan.price}</p>
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
          <div className="container-custom lg:grid lg:grid-cols-12 lg:gap-12">
            <Intro
              aside
              eyebrow="FAQ"
              title={<>Questions we hear<br />before a first call.</>}
              intro="Short answers from our FAQ. The full list is one click away."
            />
            <div className="w-full lg:col-span-7">
              <div className="border-t border-neutral-200">
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
          </div>
        </section>

        <section id="talk-to-us" className="relative overflow-hidden bg-neutral-950 py-14 lg:py-20">
          <DarkBackdrop glow="left" />
          <div className="container-custom relative">
            <div className="home-grid-2 items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-400 mb-3">Get started</p>
                <h2 className="text-3xl lg:text-5xl font-display font-bold text-white leading-[1.08] tracking-[-0.02em] mb-4">
                  Sign up, verify,<br />and get paid.
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
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-400 mb-3">Talk to us</p>
                <h3 className="text-2xl font-display font-bold text-white mb-3">Talk to a person on the team</h3>
                <p className="text-neutral-300 leading-relaxed mb-6">
                  Bring your use case. We’ll walk through pay-ins, payouts and which plan fits.
                </p>
                <p className="text-sm text-neutral-300 mb-6">{SUPPORT}</p>
                <div className="flex flex-col gap-3">
                  <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 text-white font-semibold px-5 py-3 hover:bg-primary-600">
                    Contact the team
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
