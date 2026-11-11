import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowDownLeft, ArrowLeftRight, ArrowRight, ArrowUpRight, Banknote, Check, ChevronDown, ChevronLeft,
  ChevronRight, Code, Headphones, Lock, MousePointerClick, Plug, RotateCcw, ShieldCheck, ShoppingCart, Star, Store,
  ThumbsUp, UserCheck, Wallet, Webhook, type LucideIcon,
} from 'lucide-react'
import { motion } from '../lib/motion'
import PartnerCarousel from '../components/PartnerCarousel'
import SEO from '../components/SEO'
import FlowDemo, { DemoPanel } from '../components/demo/FlowDemo'
import { ChannelDemo, type Channel } from '../components/demo/TourWidgets'
import CustomerAccountsDemo from '../components/demo/CustomerAccountsDemo'
import PageHero, { HERO_PRIMARY, HERO_SECONDARY } from '../components/hero/PageHero'
import HomeFlowVisual from '../components/hero/HomeFlowVisual'
import { FitToFrame, PortalBalanceCard, PortalConvertCard, PORTAL_PAGE_BG } from '../components/portal/PortalUI'
import DarkBackdrop from '../components/DarkBackdrop'
import { LIVE_MARKETS } from '../lib/schema'
import { SOLUTIONS, solutionPath } from '../lib/solutions'

/**
 * The facts the homepage repeats, worded as the product pages, the FAQ and
 * the contact page already state them, so a figure never differs between
 * sections or from the rest of the site.
 */

/** Regulatory status, in the "regulated by the FSCA" wording used for new copy. */
const REGULATED = 'Ezeebit is regulated by the FSCA as a Crypto Asset Service Provider, FSP No. 53664.'

/** As the contact page lists it: email around the clock, phone and WhatsApp in office hours. */
const SUPPORT = 'Support 24/7 by email, and by phone or WhatsApp Mon–Fri, 8am–6pm SAST.'


/** Logos cropped to their marks, with each file's size, so the carousel can give them equal weight. */
const PARTNERS_A: { name: string; logo: string; size: [number, number]; boost?: number }[] = [
  { name: 'Sunbet', logo: '/partners/sunbet.webp', size: [313, 164] },
  { name: 'iStore', logo: '/partners/istore.webp', size: [464, 128] },
  { name: 'Le Creuset', logo: '/partners/le-creuset.webp', size: [456, 72] },
  { name: 'Skins', logo: '/partners/skins.webp', size: [154, 155], boost: 1.3 },
  { name: 'Amiri', logo: '/partners/amiri.webp', size: [455, 111] },
  { name: 'Scoin', logo: '/partners/scoin.webp', size: [480, 148], boost: 1.15 },
  { name: 'Diesel', logo: '/partners/diesel.webp', size: [469, 173] },
  { name: 'BHH', logo: '/partners/bhh.webp', size: [256, 164], boost: 1.3 },
]

/** The exchanges, wallets, platforms and stablecoin issuers. ZARP's solid badge gets less area, so it doesn't outweigh the wordmarks. */
const PARTNERS_B: typeof PARTNERS_A = [
  { name: 'WalletConnect', logo: '/partners/walletconnect.webp', size: [480, 78] },
  { name: 'Tether', logo: '/partners/tether.webp', size: [480, 103] },
  { name: 'Shopify', logo: '/partners/shopify.webp', size: [480, 139] },
  { name: 'Luno', logo: '/partners/luno.webp', size: [480, 150] },
  { name: 'VALR', logo: '/partners/valr.webp', size: [480, 140] },
  { name: 'Binance', logo: '/partners/binance.webp', size: [480, 95] },
  { name: 'Quidax', logo: '/partners/quidax.webp', size: [480, 120] },
  { name: 'Utila', logo: '/partners/utila.webp', size: [480, 124] },
  { name: 'Sumsub', logo: '/partners/sumsub.webp', size: [480, 110] },
  { name: 'BlockTower', logo: '/partners/blocktower.webp', size: [480, 90] },
  { name: 'ZARP', logo: '/partners/zarp.webp', size: [170, 170], boost: 0.75 },
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
type Screen = { id: string; label: string; sides?: [Side[] | Shot[], Side[] | Shot[]] }
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
  /**
   * A demo laid out as a desktop page, given the stage's full width instead of
   * a phone-width column between cards. Its points go in the facts below.
   */
  wide?: boolean
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
        // The checkout runs on the ePOS in the middle; the other way in sits beside it
        [{ image: '/tour/qr-stand.webp', size: [320, 470], height: 'h-[190px] xl:h-[260px]', name: 'Or an Ezeebit Pay QR', note: 'Customers scan it and pay on their phone, with no device needed' }],
        CHECKOUT_SIDES,
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

/** From the Customer Accounts API at docs.ezeebit.com. */
const ACCOUNTS: Stop = {
  id: 'accounts',
  label: 'Customer accounts',
  heading: 'A USDT wallet for every customer, under your account',
  body: 'Open a wallet for each customer with one API call. Their deposits are credited to them rather than to your balance, and you move funds between your wallet and theirs instantly.',
  facts: [
    ['Deposit networks', 'Ethereum, BSC, Tron, and Solana'],
    ['Transfers', 'Instant book transfers, with no fee'],
    ['Withdrawals', 'To whitelisted addresses, with Travel Rule screening'],
    ['Records', 'A ledger for every account, with the balance after each entry'],
  ],
  links: [
    { label: 'Customer accounts API', to: 'https://docs.ezeebit.com/customer-accounts/overview' },
    { label: 'Crypto for platforms', to: '/platforms' },
  ],
  wide: true,
  screens: [{ id: 'accounts', label: 'Customer accounts' }],
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


const MARKETS = [
  { flag: '/za-flag.svg', name: 'South Africa', note: 'Live · settle in ZAR' },
  { flag: '/ke-flag.svg', name: 'Kenya', note: 'Live · settle in KES' },
  { flag: '/ng-flag.svg', name: 'Nigeria', note: 'Live · settle in NGN' },
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
    q: 'What does Ezeebit cost?',
    a: 'Crypto In is 1% or less per payment and Crypto Out is $0.65 per payout, both excluding VAT. There are no setup fees or monthly platform fees. The only monthly charge is the optional ePOS rental, at R150 a month per device. Platforms get volume pricing.',
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
          {stop.links.map((l) => {
            const cls = 'inline-flex items-center gap-1.5 font-semibold text-primary-600 hover:text-primary-700'
            const body = (
              <>
                {l.label}
                <ArrowRight className="w-4 h-4" />
              </>
            )
            return l.to.startsWith('http') ? (
              <a key={l.to} href={l.to} target="_blank" rel="noopener noreferrer" className={cls}>{body}</a>
            ) : (
              <Link key={l.to} to={l.to} className={cls}>{body}</Link>
            )
          })}
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

/** The figures under the hero, each with what is behind it. One marked soon is not live yet. */
const STATS: { n: string; l: string; detail: string; soon?: boolean }[] = [
  { n: '140', l: 'Payout countries', soon: true, detail: 'Bank, mobile wallet and cash pickup · crypto worldwide today' },
  { n: '6', l: 'Currencies held and converted', detail: 'ZAR, KES, NGN, USD, USDT and USDC · up to 90 with global rails' },
  { n: '9', l: 'Cryptocurrencies accepted', detail: 'BTC, ETH, USDT, USDC, BNB, DAI, PAXG, ZARP and ZARU on 5 networks' },
  { n: '60+', l: 'Platforms and businesses', detail: 'Today' },
  { n: '$25M+', l: 'Moved every year', detail: "Today's run rate" },
]

/** The pricing section's figures, each with what it covers. */
const PRICE_SUMMARY = [
  { value: '1%', label: 'Crypto In, or less per payment' },
  { value: '$0.65', label: 'Crypto Out, per payout' },
  { value: 'R0', label: 'Setup and monthly platform fees' },
]

/** The company behind Ezeebit in each country, and what it operates under. */
const ENTITIES: { flag: string; country: string; entity: string; reg?: string; points: ReactNode[]; check?: { label: string; href: string } }[] = [
  {
    flag: '/za-flag.svg',
    country: 'South Africa',
    entity: 'Ezee Solutions Group (Pty) Ltd',
    reg: '2022/250578/07',
    points: [
      <>Regulated by the FSCA as a Crypto Asset Service Provider, <b>FSP No. 53664</b></>,
      'FIC compliant, with KYC, KYB, AML and POPIA handled by Ezeebit',
    ],
  },
  {
    flag: '/ke-flag.svg',
    country: 'Kenya',
    entity: 'Ezee Solutions Group (Kenya) Limited',
    reg: 'PVT-RQ13JL95',
    points: ['Operates under the transitional provisions of the Virtual Asset Service Providers Act, 2025'],
  },
  {
    flag: '/ca-flag.svg',
    country: 'Canada',
    entity: 'Kinetic Payments Ltd., changing its name to Ezeebit Canada Ltd.',
    points: [<>On FINTRAC&apos;s money services business registry, <b>MSB No. N300001912</b>, for foreign exchange, money transfers, virtual currency and payment services</>],
    check: { label: 'Check the FINTRAC registry', href: 'https://fintrac-canafe.canada.ca/msb-esm/reg-eng' },
  },
]

/** Every stop in the tour, in the order money moves: in, out, your customers' wallets, and your balance. */
const TOUR: Stop[] = [PAY_INS, PAY_OUT, ACCOUNTS, HOLD]

/**
 * Every demo in the tour, with its stop. Pay-ins' three channels are each a
 * page under the Pay-ins menu; the other stops have one demo each.
 */
const TABS = TOUR.flatMap((stop) => stop.screens.map((screen) => ({ id: screen.id, stop, label: stop.screens.length > 1 ? screen.label : stop.label })))

/** Shows the open one of several things stacked in one grid cell, fading between them. */
const fade = (on: boolean) => `[grid-area:1/1] transition-opacity duration-300 ${on ? 'opacity-100' : 'opacity-0 invisible pointer-events-none'}`

/**
 * Every demo sits in a frame of this height, the ePOS included, so switching
 * tabs or moving through a demo never resizes the section, and the whole stage
 * fits on a laptop screen under the tabs. A screen taller than the frame
 * scrolls inside it, as it would on a phone.
 */
const DEMO_FRAME = 'h-[640px]'

/** Customer accounts in the Merchant Portal, at the portal's mobile width, with a restart that starts it afresh. */
function AccountsDemo() {
  const [run, setRun] = useState(0)
  const box = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(() => setWidth(el.clientWidth))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const compact = width < 600
  return (
    <DemoPanel
      fixed
      label="Merchant Portal"
      action={
        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          className="flex items-center gap-1.5 -my-2 py-2 -mr-1.5 pr-1.5 pl-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-500 hover:text-primary-700"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Restart
        </button>
      }
    >
      <div ref={box} className="flex-1 min-h-0 overflow-hidden rounded-[20px]">
        {width > 0 && (
          // The portal's section where there is room for it; its compact page on a phone. A fixed
          // design height locks the scale, so choosing another customer never resizes the demo.
          <FitToFrame design={compact ? 390 : 820} height={compact ? 600 : 660} background="bg-[#f8f9fb]">
            <CustomerAccountsDemo key={`${run}-${compact}`} compact={compact} />
          </FitToFrame>
        )}
      </div>
    </DemoPanel>
  )
}

/** The demo for a screen, in its frame. */
function TourDemo({ id }: { id: string }) {
  switch (id) {
    case 'in-store':
    case 'online':
    case 'platforms':
      return <ChannelDemo channel={id as Channel} />
    case 'pay-out':
      return <FlowDemo fixed src="/demos/pay-out.html" flow="payout" label="Payout claim" title="Interactive demo of an Ezeebit payout" />
    case 'accounts':
      return <AccountsDemo />
    default:
      return (
        <DemoPanel fixed label="Merchant Portal">
          <div className="flex-1 min-h-0 overflow-hidden rounded-[20px]">
          <FitToFrame design={430} background={PORTAL_PAGE_BG}>
            <div className="p-3 space-y-3">
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
          </FitToFrame>
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
  const groups = [...new Set(stop.screens.map((s) => s.sides![col]))]
  const shown = stop.screens.find((s) => s.id === showing)!.sides![col]
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

/** What each pay-in channel is, for the Pay-ins menu. */
const CHANNEL_NOTES: Record<string, { icon: LucideIcon; note: string }> = {
  'in-store': { icon: Store, note: 'On the Ezeebit ePOS or an Ezeebit Pay QR code' },
  online: { icon: ShoppingCart, note: 'Shopify, WooCommerce, Magento, or the API' },
  platforms: { icon: Wallet, note: 'Deposits from your own cashier' },
}

/**
 * The product tour. Pay-ins is a menu button: hovering it (or tapping it on a
 * phone) opens its three channels, In-store, Online checkout and Platforms,
 * each a page of its own. Payouts, Customer accounts and Your balance are
 * plain buttons beside it. The live demo sits on a stage with what it does
 * called out either side, and the copy and facts follow underneath.
 */
function ProductTour() {
  const [tab, setTab] = useState(TABS[0].id)
  const open = TABS.find((t) => t.id === tab)!.stop
  // The demo each stop last showed, so going back to pay-ins returns to the same channel
  const [screenOf, setScreenOf] = useState<Record<string, string>>({})
  const current = (t: Stop) => screenOf[t.id] ?? t.screens[0].id
  // A demo mounts the first time it is shown and then stays, so the iframes
  // load only when asked for and going back to one picks up where it was
  const [seen, setSeen] = useState<string[]>([TABS[0].id])
  const select = (id: string) => {
    const stop = TABS.find((t) => t.id === id)!.stop
    setTab(id)
    setScreenOf((m) => ({ ...m, [stop.id]: id }))
    setSeen((s) => (s.includes(id) ? s : [...s, id]))
  }

  const [menu, setMenu] = useState(false)
  const menuBox = useRef<HTMLDivElement>(null)
  const closing = useRef<number>()
  // How the last press on the Pay-ins button was made, so a mouse click doesn't close what hovering opened
  const pointer = useRef('')
  // Hover opens and closes the menu for a mouse only; a short delay lets the pointer cross to it
  const hoverOpen = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    window.clearTimeout(closing.current)
    setMenu(true)
  }
  const hoverClose = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    closing.current = window.setTimeout(() => setMenu(false), 160)
  }
  useEffect(() => {
    if (!menu) return
    const outside = (e: MouseEvent) => { if (!menuBox.current?.contains(e.target as Node)) setMenu(false) }
    const escape = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setMenu(false)
      document.getElementById(`tour-tab-${PAY_INS.id}`)?.focus()
    }
    document.addEventListener('mousedown', outside)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('mousedown', outside)
      document.removeEventListener('keydown', escape)
    }
  }, [menu])
  useEffect(() => () => window.clearTimeout(closing.current), [])

  const pick = (id: string) => {
    select(id)
    setMenu(false)
  }
  const topIds = TOUR.map((s) => s.id)
  const goTop = (id: string) => {
    const stop = TOUR.find((s) => s.id === id)!
    select(current(stop))
  }
  const item = 'min-h-[44px] whitespace-nowrap rounded-full px-4 sm:px-5 py-2 text-sm font-semibold transition-colors'
  const channel = TABS.find((t) => t.id === current(PAY_INS))!

  return (
    <section id="how-it-works" className="scroll-mt-24 section-padding bg-white">
      <div className="container-custom">
        <Intro
          eyebrow="Product tour"
          title={<>See exactly what<br />your customers see.</>}
          intro="The screens your customers and your team use, with the details buyers ask about. Click through them."
        />

        <div role="toolbar" aria-label="Product screens" className="relative z-20 mb-6 grid w-full grid-cols-2 gap-1 rounded-[24px] bg-neutral-950 p-1 lg:mx-auto lg:w-fit lg:grid-cols-none lg:grid-flow-col lg:auto-cols-fr lg:rounded-full">
          {TOUR.map((stop, index) => {
            const on = open === stop
            if (stop.screens.length === 1)
              return (
                <button
                  key={stop.id}
                  type="button"
                  id={`tour-tab-${stop.id}`}
                  aria-pressed={on}
                  aria-controls={`tour-panel-${stop.id}`}
                  onClick={() => goTop(stop.id)}
                  onKeyDown={(e) => onTabKeys(e, index, topIds, goTop, 'tour-tab')}
                  className={`${item} w-full ${on ? 'bg-primary-500 text-white' : 'text-neutral-300 hover:text-white'}`}
                >
                  {stop.label}
                </button>
              )
            return (
              // Wide enough for the longest channel name, so picking one never shifts the buttons beside it;
              // the bar's equal columns give the other buttons the same width
              <div key={stop.id} ref={menuBox} className="relative lg:w-[232px]" onPointerEnter={hoverOpen} onPointerLeave={hoverClose}>
                <button
                  type="button"
                  id={`tour-tab-${stop.id}`}
                  aria-haspopup="menu"
                  aria-expanded={menu}
                  aria-controls="tour-channels"
                  onPointerDown={(e) => { pointer.current = e.pointerType }}
                  onClick={() => {
                    if (!on) goTop(stop.id)
                    // A mouse has already opened it by hovering, so its click keeps it open; a tap or a key toggles it
                    setMenu((m) => (pointer.current === 'mouse' || !on ? true : !m))
                    pointer.current = ''
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                      e.preventDefault()
                      setMenu(true)
                      requestAnimationFrame(() => document.querySelector<HTMLButtonElement>('#tour-channels [role=menuitemradio]')?.focus())
                    } else onTabKeys(e, index, topIds, goTop, 'tour-tab')
                  }}
                  className={`${item} flex w-full items-center justify-center gap-1.5 ${on ? 'bg-primary-500 text-white' : 'text-neutral-300 hover:text-white'}`}
                >
                  {stop.label}
                  <span className={`hidden sm:inline font-medium ${on ? 'text-white/75' : 'text-neutral-500'}`}>· {channel.label}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${menu ? 'rotate-180' : ''}`} />
                </button>
                {/* The padding, not a margin, bridges the gap to the menu so hover holds while the pointer crosses */}
                <div className={`absolute left-0 top-full pt-2 transition-all duration-150 ${menu ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-1'}`}>
                  <div
                    id="tour-channels"
                    role="menu"
                    aria-label={`${stop.label} channels`}
                    className="w-[min(320px,calc(100vw-2rem))] rounded-2xl bg-white p-2 ring-1 ring-neutral-200 shadow-[0_24px_60px_-20px_rgba(0,26,54,0.45)]"
                    onKeyDown={(e) => {
                      const items = [...e.currentTarget.querySelectorAll<HTMLButtonElement>('[role=menuitemradio]')]
                      const at = items.indexOf(document.activeElement as HTMLButtonElement)
                      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                        e.preventDefault()
                        items[(at + (e.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length]?.focus()
                      }
                    }}
                  >
                    {stop.screens.map((s) => {
                      const { icon: Icon, note } = CHANNEL_NOTES[s.id]
                      const chosen = tab === s.id
                      return (
                        <button
                          key={s.id}
                          type="button"
                          role="menuitemradio"
                          aria-checked={chosen}
                          onClick={() => pick(s.id)}
                          className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors ${chosen ? 'bg-primary-50' : 'hover:bg-neutral-50'}`}
                        >
                          <span className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${chosen ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-700'}`}>
                            <Icon className="w-[18px] h-[18px]" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold text-neutral-900">{s.label}</span>
                            <span className="block text-xs text-neutral-500 leading-snug">{note}</span>
                          </span>
                          {chosen && <Check className="w-4 h-4 shrink-0 text-primary-600" />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/*
          Every panel sits in the same grid cell, so the section takes the
          tallest one's height and nothing below it moves between tabs. The
          closed ones are invisible, which also keeps them out of the tab order
          and away from screen readers.
        */}
        <div className="grid grid-cols-1">
          {TOUR.map((t) => (
            <div
              key={t.id}
              role="region"
              id={`tour-panel-${t.id}`}
              aria-label={t.label}
              className={fade(open === t)}
            >
              <div className="relative overflow-hidden rounded-[32px] border border-neutral-200/70 bg-gradient-to-b from-neutral-50 to-white px-3 pt-5 pb-6 sm:px-8 lg:py-8 [&_img]:!mx-0">
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

                {t.wide ? (
                  <div className={`relative mx-auto w-full max-w-[920px] ${DEMO_FRAME}`}>
                    {seen.includes(t.screens[0].id) && <TourDemo id={t.screens[0].id} />}
                  </div>
                ) : (
                // Each demo and its cards are stacked in place too, so switching between them moves nothing
                <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px_minmax(0,1fr)] lg:items-center lg:gap-10">
                  <SideColumn stop={t} col={0} showing={current(t)} />
                  <div className="grid grid-cols-1 grid-rows-1 items-center w-full max-w-[380px] mx-auto">
                    {t.screens.map((s) => (
                      <div key={s.id} className={`${fade(current(t) === s.id)} min-h-0 ${DEMO_FRAME}`}>
                        {seen.includes(s.id) && <TourDemo id={s.id} />}
                      </div>
                    ))}
                  </div>
                  <SideColumn stop={t} col={1} showing={current(t)} />
                </div>
                )}
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
          kicker="Payments infrastructure for Africa"
          // Wraps between the two phrases first, and "pay-ins" never splits at its hyphen
          title={<><span className="inline-block">Stablecoin <span className="whitespace-nowrap">pay-ins</span></span> <span className="inline-block">and payouts,</span></>}
          accent="made Ezee."
          description="Your customers pay in and cash out in crypto, in-store, online, or on your platform, while you settle in ZAR, KES, NGN, USD, or stablecoin. One balance and one API, with compliance built in."
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
            { icon: <Headphones />, label: '24/7 chat support' },
          ]}
          wideVisual={<HomeFlowVisual />}
        />

        <section id="stats" className="relative bg-neutral-950 pb-14 lg:pb-20">
          <div className="container-custom">
            <div className="border-t border-white/10 pt-10 lg:pt-14 home-stats">
              {STATS.map((s) => (
                <div key={s.l} className="border-l border-white/10 pl-5">
                  <div className="text-4xl xl:text-5xl whitespace-nowrap font-display font-bold tracking-[-0.03em] text-primary-400 leading-none mb-3">{s.n}</div>
                  <p className="flex flex-wrap items-center gap-2 text-[15px] text-neutral-200">
                    {s.l}
                    {s.soon && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">Soon</span>}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-400">{s.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="logos" className="section-padding bg-white">
          <div className="container-custom">
            <Intro
              eyebrow="Trusted partners"
              title={<>Names your customers<br />already trust.</>}
              intro="Merchants that take payments with Ezeebit, and the exchanges, wallets, platforms and stablecoin issuers we work with."
            />
            <div className="partner-carousel-container mb-6">
              <PartnerCarousel partners={PARTNERS_A} direction="left" speed={40} />
            </div>
            <div className="partner-carousel-container">
              <PartnerCarousel partners={PARTNERS_B} direction="right" speed={40} />
            </div>
          </div>
        </section>

        <ProductTour />

        <section id="solutions" className="section-padding bg-neutral-50">
          <div className="container-custom">
            <Intro
              eyebrow="Solutions"
              title={<>For anyone who accepts,<br />holds, and sends money.</>}
              intro="Start with the flow you need. Pay-ins, payouts and the balance are the same underneath."
            />
            <div className="home-grid-4">
              {SOLUTIONS.map((s) => (
                <Link key={s.slug} to={solutionPath(s)} className="rounded-2xl border border-neutral-200 bg-white p-5 hover:border-neutral-300 block h-full">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{s.name}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{s.card}</p>
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

        {/* The investors, on their own just before what merchants say */}
        <section id="investors" className="bg-white pb-10 lg:pb-20">
          <div className="container-custom">
            <div className="border-t border-neutral-200 pt-10">
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
              title={<>Regulated where<br />we operate.</>}
              intro="The companies behind Ezeebit, how funds are held, and how every payment is checked before it reaches you."
            />
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">Our entities</p>
            <div className="grid gap-4 lg:grid-cols-3">
              {ENTITIES.map((e) => (
                <article key={e.country} className="flex gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 lg:p-6">
                  <img src={e.flag} alt="" width={28} height={28} className="w-7 h-7 mx-0 mt-0.5 shrink-0 rounded-full" />
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-neutral-900">{e.country}</h3>
                    <p className="mt-0.5 mb-3 text-[13px] text-neutral-500">
                      {e.entity}
                      {/* Kept whole so a registration number never breaks across lines */}
                      {e.reg && <> · <span className="whitespace-nowrap">Reg. {e.reg}</span></>}
                    </p>
                    <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-neutral-600 marker:text-neutral-300 [&_b]:font-semibold [&_b]:text-neutral-900">
                      {e.points.map((point, i) => <li key={i}>{point}</li>)}
                    </ul>
                    {e.check && (
                      <a href={e.check.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-primary-600 hover:text-primary-700">
                        {e.check.label}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
            <div className="home-grid-3 mt-4">
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

        {/* The full plans are on /pricing; here, just the figures a first visit asks about */}
        <section id="pricing" className="bg-neutral-50 py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-8 rounded-3xl border border-neutral-200 bg-white p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12 lg:p-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600 mb-3">Pricing</p>
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 leading-[1.08] tracking-[-0.02em]">Pay when money moves.</h2>
                <dl className="mt-8 grid gap-6 sm:grid-cols-3">
                  {PRICE_SUMMARY.map((p) => (
                    <div key={p.label} className="flex flex-col-reverse justify-end gap-2 border-t border-neutral-200 pt-4">
                      <dt className="text-sm text-neutral-600">{p.label}</dt>
                      <dd className="text-3xl font-semibold tracking-[-0.02em] text-neutral-900 leading-none">{p.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-[13px] text-neutral-500">Excluding VAT. The ePOS is optional, at R150 a month per device. Platforms get volume pricing.</p>
              </div>
              <Link to="/pricing" className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-neutral-950 text-white font-semibold px-5 py-3 hover:bg-neutral-800">
                See pricing
                <ArrowRight className="w-4 h-4" />
              </Link>
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
