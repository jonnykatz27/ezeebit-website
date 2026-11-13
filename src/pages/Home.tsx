import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeftRight, ArrowRight, BadgeCheck, Banknote, BarChart3, CandlestickChart, Check, ChevronDown, ChevronLeft,
  ChevronRight, Clock, Code, Coins, Gamepad2, KeyRound, Landmark, LayoutDashboard, Lock, Mail, MessageCircle, MousePointerClick,
  Network, Palette, Phone, Plug, Scale, ScrollText, Send, ShieldCheck, Smartphone,
  Receipt, ShoppingCart, Star, Store, TrendingUp, UserCheck, Users, Wallet, Webhook, Workflow, type LucideIcon,
} from 'lucide-react'
import { motion } from '../lib/motion'
import PartnerCarousel from '../components/PartnerCarousel'
import SEO from '../components/SEO'
import { prefetchDemos } from '../components/demo/FlowDemo'
import PortalPanel from '../components/demo/PortalPanel'
import { ChannelDemo, PayoutDemo, type Channel } from '../components/demo/TourWidgets'
import CustomerAccountsDemo from '../components/demo/CustomerAccountsDemo'
import PageHero, { HERO_PRIMARY, HERO_SECONDARY } from '../components/hero/PageHero'
import HomeFlowVisual from '../components/hero/HomeFlowVisual'
import Intro from '../components/SectionHeader'
import { PortalDashboard, PortalIncome, PortalTransactions } from '../components/demo/PortalScreens'
import DarkBackdrop from '../components/DarkBackdrop'
import { LIVE_MARKETS } from '../lib/schema'
import { SOLUTIONS, solutionPath } from '../lib/solutions'

/**
 * The facts the homepage repeats, worded as the product pages, the FAQ and
 * the contact page already state them, so a figure never differs between
 * sections or from the rest of the site.
 */

/** As the contact page lists it: email around the clock, phone and WhatsApp in office hours. */
const SUPPORT = 'Support 24/7 by email, and by phone or WhatsApp Monday to Friday, 8am to 6pm SAST.'

/** Ways to reach the team, as the Contact page lists them, each one a link that starts the conversation. */
const CONTACTS: { icon: LucideIcon; label: string; value: string; href: string; hours: string }[] = [
  { icon: Mail, label: 'Email', value: 'support@ezeebit.com', href: 'mailto:support@ezeebit.com', hours: '24/7' },
  { icon: Phone, label: 'Phone', value: '+27 21 879 5074', href: 'tel:+27218795074', hours: 'Mon to Fri, 8am to 6pm SAST' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+27 79 443 9375', href: 'https://wa.me/27794439375', hours: 'Mon to Fri, 8am to 6pm SAST' },
]

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

/** A wallet's logo, a coin, or a flag shown with a fact. Its label is its alt text and tooltip. */
type Mark = { src: string; label: string; shape?: 'round' | 'square'; soon?: boolean; /** A bare mark, not a badge: shown whole on a white disc instead of filling it. */ bare?: boolean }
/** A term and its detail under an icon, with any marks behind it in groups set apart from each other. */
type Fact = [LucideIcon, string, string, Mark[][]?]
/** A small card beside the demo, calling out one thing the screen does. */
type Side = { icon: typeof Lock; caption: string; value: string; sub?: string; ok?: string }
/** A photo of the hardware beside the demo, with its name and what it does. */
type Shot = { image: string; size: [number, number]; height: string; name: string; note: string }
/** One demo in the tour, with the cards (or photos) to its left and right on a wide screen. */
type Screen = { id: string; label: string; sides?: [Side[] | Shot[], Side[] | Shot[]] }
type Stop = {
  id: string
  label: string
  /** A shorter label for the tab on a phone, where four tabs share one row. */
  short?: string
  heading: string
  body: string
  facts: Fact[]
  /** Where to read more. `short` is the label on a phone, where the links share one line. */
  links: { label: string; short?: string; to: string }[]
  /** The demos under this tab. More than one makes the tab a menu of them. */
  screens: Screen[]
  /** What the tab's menu lists, for screen readers, where it has one. */
  menuTitle?: string
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

/** What a customer can pay from: any wallet through WalletConnect, or straight from an exchange. */
const PAY_WITH: Mark[][] = [[
  { src: '/marks/valr.webp', label: 'VALR', shape: 'square' },
  { src: '/marks/luno.webp', label: 'Luno', shape: 'square' },
  { src: '/marks/binance.webp', label: 'Binance', shape: 'square' },
  { src: '/walletconnect-pay.svg', label: 'WalletConnect Pay', shape: 'square' },
]]

const COINS: Mark[][] = [[
  { src: '/btc-logo.svg', label: 'Bitcoin (BTC)' },
  { src: '/eth-logo.svg', label: 'Ether (ETH)', bare: true },
  { src: '/usdt-round.svg', label: 'Tether (USDT)' },
  { src: '/usdc-logo.svg', label: 'USD Coin (USDC)' },
]]

/** The local currencies, then the stablecoin; both settle the same day. */
const SETTLES_IN: Mark[][] = [
  [
    { src: '/za-flag.svg', label: 'South African rand (ZAR)' },
    { src: '/ke-flag.svg', label: 'Kenyan shilling (KES)' },
    { src: '/ng-flag.svg', label: 'Nigerian naira (NGN)' },
    { src: '/us-flag.svg', label: 'US dollar (USD)' },
  ],
  [{ src: '/usdt-round.svg', label: 'Tether (USDT)' }],
]

/** What payouts go out in: USDT today, with the stablecoins to come shown faded. */
const PAYS_OUT_IN: Mark[][] = [
  [{ src: '/usdt-round.svg', label: 'Tether (USDT)' }],
  [
    { src: '/usdc-logo.svg', label: 'USD Coin (USDC), coming soon', soon: true },
    { src: '/zarp-logo.png', label: 'ZARP, coming soon', soon: true },
    { src: '/zaru-logo.png', label: 'ZARU, coming soon', soon: true },
  ],
]

/** The balances a merchant holds: fiat in each settlement currency, and stablecoin. */
const HOLDS: Mark[][] = [
  SETTLES_IN[0],
  [{ src: '/usdt-round.svg', label: 'Tether (USDT)' }, { src: '/usdc-logo.svg', label: 'USD Coin (USDC), coming soon', soon: true }],
]

const PAY_INS: Stop = {
  id: 'pay-ins',
  label: 'Pay-ins',
  heading: 'One checkout, wherever your customers pay',
  body: 'On your platform, in your store, or on your website, customers land on the same checkout and pay from the wallet they already use.',
  facts: [
    [Wallet, 'Pay with', 'Any wallet on-chain, or with VALR, Luno, Binance, and WalletConnect Pay', PAY_WITH],
    [Coins, 'Coins', 'BTC, ETH, USDT, USDC, and more', COINS],
    [Landmark, 'Settlement', 'The same day, in local currency or stablecoin', SETTLES_IN],
    [BadgeCheck, 'Setup', 'No setup fees, and live in days'],
  ],
  links: [
    { label: 'Crypto for platforms', short: 'Platforms', to: '/platforms' },
    { label: 'In-store payments', short: 'In-store', to: '/in-store' },
    { label: 'Online checkout', short: 'Online', to: '/online' },
  ],
  sideTitles: ['How they get there', 'Same on every channel'],
  screens: [
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
  ],
}

const PAY_OUT: Stop = {
  id: 'pay-out',
  label: 'Payouts',
  heading: 'Payouts your customers receive in minutes',
  body: 'A customer asks to withdraw on your platform, or you send them a payout link. They confirm their own wallet, and the stablecoin lands in minutes, funded from your fiat balance.',
  facts: [
    [Send, 'Pay out in', 'USDT, with more stablecoins soon', PAYS_OUT_IN],
    [Clock, 'Speed', 'Minutes, at any hour'],
    [Palette, 'Branding', 'Your name and colours'],
    [Banknote, 'Use it for', 'Winnings, seller payouts, and remittance'],
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
  short: 'Accounts',
  heading: 'A stablecoin wallet for every customer, under your account',
  body: 'Open a USDT wallet for each customer with one API call, with USDC coming soon. Their deposits are credited to them rather than to your balance, and you move funds between your wallet and theirs instantly.',
  facts: [
    [Network, 'Deposit networks', 'Ethereum, BSC, Tron, and Solana'],
    [ArrowLeftRight, 'Transfers', 'Instant book transfers, with no fee'],
    [ShieldCheck, 'Withdrawals', 'To whitelisted addresses, with Travel Rule screening'],
    [ScrollText, 'Records', 'A ledger for every account, with the balance after each entry'],
  ],
  links: [
    { label: 'Customer accounts API', short: 'Accounts API', to: 'https://docs.ezeebit.com/customer-accounts/overview' },
    { label: 'Crypto for platforms', short: 'Platforms', to: '/platforms' },
  ],
  wide: true,
  screens: [{ id: 'accounts', label: 'Customer accounts' }],
}

/**
 * The Merchant Portal: three of its pages, after the portal's Figma. The
 * figures are illustrative and shared across the three, so they agree.
 */
const PORTAL: Stop = {
  id: 'portal',
  label: 'Portal',
  menuTitle: 'Merchant Portal pages',
  heading: 'Your balance, your payments, and your income, in one portal',
  body: 'Pay-ins, payouts, and conversions land on one ledger. Filter your transactions by channel, see what each month brings in, and withdraw to your bank or your own wallet.',
  facts: [
    [Wallet, 'Wallets', 'Fiat and USDT, with USDC coming soon', HOLDS],
    [BarChart3, 'Reports', 'Income by channel, store, and day'],
    [KeyRound, 'Access', 'The Merchant Portal or the API'],
    [Lock, 'Safeguarding', 'MPC wallets on SOC 2 audited infrastructure, with every key split'],
  ],
  links: [{ label: 'Wallets', to: '/wallets' }],
  wide: true,
  screens: [
    { id: 'portal-dashboard', label: 'Dashboard' },
    { id: 'portal-transactions', label: 'Transactions' },
    { id: 'portal-income', label: 'Monthly income' },
  ],
}


const MARKETS = [
  { flag: '/za-flag.svg', name: 'South Africa', note: 'Live · settle in ZAR' },
  { flag: '/ke-flag.svg', name: 'Kenya', note: 'Live · settle in KES' },
  { flag: '/ng-flag.svg', name: 'Nigeria', note: 'Live · settle in NGN' },
  { flag: '/us-flag.svg', name: 'Global', note: 'Settle in USD' },
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
    a: 'The rate is locked at checkout and the payment is confirmed on-chain. Settlement is the same day, in local currency or in stablecoin.',
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
    a: "Yes. Ezeebit is regulated by the FSCA as a Crypto Asset Service Provider, FSP No. 53664. The FSCA is South Africa's Financial Sector Conduct Authority. That covers the South African company, Ezee Solutions Group (Pty) Ltd. In Kenya, Ezee Solutions Group (Kenya) Limited operates under the transitional provisions of the Virtual Asset Service Providers Act, 2025. In Canada, Ezeebit Canada Ltd. is on FINTRAC's money services business registry, MSB No. N300001912.",
  },
  {
    q: 'Which countries does Ezeebit operate in?',
    a: 'Ezeebit provides stablecoin and crypto payment infrastructure for merchants and platforms across Africa. It is live in South Africa, Kenya and Nigeria, with more markets to follow.',
  },
  {
    q: 'Do you provide customer support?',
    a: `Yes. ${SUPPORT} Email support@ezeebit.com, phone +27 21 879 5074, or WhatsApp +27 79 443 9375.`,
  },
]

function onTabKeys(e: KeyboardEvent, index: number, ids: string[], set: (id: string) => void, prefix: string) {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
  e.preventDefault()
  const next = e.key === 'ArrowRight' ? (index + 1) % ids.length : (index - 1 + ids.length) % ids.length
  set(ids[next])
  document.getElementById(`${prefix}-${ids[next]}`)?.focus()
}

/** The site's icon tile: a dark square with the icon in blue, as on the About page. */
const TILE = 'flex shrink-0 items-center justify-center rounded-xl bg-neutral-950 text-primary-400'

/**
 * The facts as a boxed strip: a row each on a phone, with the icon beside the
 * words; two to a row from sm and all four across from lg, with the icon over
 * them. Every fact has an icon, so the boxes match; a fact's logos, coins, or
 * flags sit under its words in one line.
 */
function Facts({ facts }: { facts: Fact[] }) {
  return (
    <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 text-left sm:grid-cols-2 lg:grid-cols-4">
      {facts.map(([Icon, term, detail, marks]) => (
        <div key={term} className="flex gap-3.5 bg-white p-4 sm:block lg:p-5">
          <span className={`${TILE} size-9 sm:mb-3`} aria-hidden="true">
            <Icon className="size-[18px]" />
          </span>
          <div className="min-w-0">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 mb-1">{term}</dt>
            <dd className="text-sm text-neutral-800 leading-relaxed">{detail}</dd>
            {marks && (
              <dd className="mt-2.5 flex items-center gap-2">
                {marks.map((group, g) => (
                  <ul key={g} className={`flex items-center gap-1.5 ${g > 0 ? 'border-l border-neutral-200 pl-2' : ''}`}>
                    {group.map((m) => (
                      <li key={m.label} className="leading-none">
                        <img
                          src={m.src}
                          alt={m.label}
                          title={m.label}
                          width={22}
                          height={22}
                          loading="lazy"
                          className={`size-[22px] !mx-0 ring-1 ring-black/5 ${m.bare ? 'object-contain bg-white p-[3px]' : 'object-cover'} ${m.shape === 'square' ? 'rounded-md' : 'rounded-full'} ${m.soon ? 'opacity-45 grayscale' : ''}`}
                        />
                      </li>
                    ))}
                  </ul>
                ))}
              </dd>
            )}
          </div>
        </div>
      ))}
    </dl>
  )
}

/**
 * The copy under the stage: what the screen is for, with where to read more
 * beside it on a wide screen, then the facts in a strip across the full width.
 */
function StopCopy({ stop }: { stop: Stop }) {
  return (
    <div>
      <div className="grid gap-6 text-center lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12 lg:text-left">
        <div>
          <h3 className="text-2xl lg:text-3xl font-display font-bold text-neutral-900 leading-tight mb-3 [text-wrap:balance]">{stop.heading}</h3>
          <p className="mx-auto max-w-2xl text-neutral-600 leading-relaxed lg:mx-0">{stop.body}</p>
        </div>
        <div>
          <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 lg:text-right">Check out more</p>
          {/* One line on a phone, with the shorter labels */}
          <div className="flex justify-center gap-2 sm:flex-wrap lg:justify-end">
            {stop.links.map((l) => {
              const cls = 'inline-flex items-center gap-1 sm:gap-1.5 whitespace-nowrap rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[13px] sm:px-3.5 sm:py-2 sm:text-sm font-semibold text-neutral-900 hover:border-neutral-400'
              const body = (
                <>
                  <span className="sm:hidden">{l.short ?? l.label}</span>
                  <span className="hidden sm:inline">{l.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-primary-600" />
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
      </div>
      <div className="mt-7 lg:mt-8">
        <Facts facts={stop.facts} />
      </div>
    </div>
  )
}

const SideCard = ({ side }: { side: Side }) => {
  const Icon = side.icon
  return (
    <div className="w-full max-w-[250px] rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-[0_14px_36px_-18px_rgba(0,26,54,0.3)]">
      <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 mb-1.5">
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

/** The figures under the hero, each with what is behind it. Four, all live today, so they sit evenly. */
const STATS: { n: string; l: string; detail: string }[] = [
  { n: '$25M+', l: 'Moved every year', detail: "Today's run rate" },
  { n: '100+', l: 'Platforms and businesses', detail: 'Today' },
  { n: '9', l: 'Cryptocurrencies accepted', detail: 'BTC, ETH, USDT, USDC, BNB, DAI, PAXG, ZARP and ZARU on 5 networks' },
  { n: '5', l: 'Currencies held and converted', detail: 'ZAR, KES, NGN, USD, and USDT, with USDC coming soon' },
]

/** An icon for each solution's card, by its slug. */
const SOLUTION_ICONS: Record<string, LucideIcon> = {
  'gaming-and-betting': Gamepad2,
  'trading-and-investment': CandlestickChart,
  'payment-gateways': Workflow,
  'wallets-and-neobanks': Smartphone,
  'online-stores': ShoppingCart,
  'shops-and-hospitality': Store,
  marketplaces: Users,
  'large-trades': Scale,
}

/** The pricing section's figures, each with what it covers. */
const PRICE_SUMMARY = [
  { value: '1%', label: 'Crypto In, or less per payment' },
  { value: '$0.65', label: 'Crypto Out, per payout' },
  { value: '$0', label: 'Setup and monthly platform fees' },
]

/** Every stop in the tour, in the order money moves: in, out, your customers' wallets, and your own portal. */
const TOUR: Stop[] = [PAY_INS, PAY_OUT, ACCOUNTS, PORTAL]

/**
 * Every demo in the tour, with its stop. Pay-ins' three channels and the
 * portal's three pages are each one under their tab's menu; the other stops
 * have one demo each.
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
const DEMO_FRAME = 'h-[540px] lg:h-[580px]'

/** The demo for a screen, in its frame. */
function TourDemo({ id }: { id: string }) {
  switch (id) {
    case 'in-store':
    case 'online':
    case 'platforms':
      return <ChannelDemo channel={id as Channel} />
    case 'pay-out':
      return <PayoutDemo fixed />
    case 'accounts':
      return <PortalPanel wide={[820, 660]} phone={[390, 600]} restart>{(c) => <CustomerAccountsDemo compact={c} />}</PortalPanel>
    case 'portal-dashboard':
      return <PortalPanel wide={[820, 660]} phone={[390, 740]}>{(c) => <PortalDashboard compact={c} />}</PortalPanel>
    case 'portal-transactions':
      return <PortalPanel wide={[820, 660]} phone={[390, 700]}>{(c) => <PortalTransactions compact={c} />}</PortalPanel>
    default:
      return <PortalPanel wide={[820, 660]} phone={[390, 740]}>{(c) => <PortalIncome compact={c} />}</PortalPanel>
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
          {stop.sideTitles && !isShots(cards) && <p className={`w-full text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 ${col === 0 ? 'text-right' : ''}`}>{stop.sideTitles[col]}</p>}
          <div className={`w-full flex flex-col gap-4 ${align}`}>
            {isShots(cards) ? <Shots shots={cards} /> : cards.map((side) => <SideCard key={side.caption} side={side} />)}
          </div>
        </div>
      ))}
    </div>
  )
}

/** What each screen in a tab's menu is: the Pay-ins channels and the portal's pages. */
const SCREEN_NOTES: Record<string, { icon: LucideIcon; note: string }> = {
  'in-store': { icon: Store, note: 'On the Ezeebit ePOS or an Ezeebit Pay QR code' },
  online: { icon: ShoppingCart, note: 'Shopify, WooCommerce, Magento, or the API' },
  platforms: { icon: Wallet, note: 'Deposits from your own cashier' },
  'portal-dashboard': { icon: LayoutDashboard, note: 'Your balance and the payments coming in' },
  'portal-transactions': { icon: Receipt, note: 'Every payment, by channel, store, and order' },
  'portal-income': { icon: TrendingUp, note: 'What each month brings in, day by day' },
}

/**
 * The product tour. Pay-ins and Portal are menu buttons: hovering one (or
 * tapping it on a phone) opens its screens, Pay-ins' three channels (Platforms,
 * In-store, and Online checkout) and the
 * portal's three pages, each a page of its own. Payouts and Customer accounts
 * are plain buttons between them. The live demo sits on a stage with what it
 * does called out either side, or across the stage for a portal page, and
 * the copy and facts follow underneath.
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

  // The stop whose menu is open, if any
  const [menu, setMenu] = useState<string | null>(null)
  const menuBoxes = useRef<Record<string, HTMLDivElement | null>>({})
  const closing = useRef<number>()
  // How the last press on a menu button was made, so a mouse click doesn't close what hovering opened
  const pointer = useRef('')
  // Hover opens and closes a menu for a mouse only; a short delay lets the pointer cross to it
  const hoverOpen = (id: string) => (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    window.clearTimeout(closing.current)
    setMenu(id)
  }
  const hoverClose = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    closing.current = window.setTimeout(() => setMenu(null), 160)
  }
  useEffect(() => {
    if (!menu) return
    const outside = (e: MouseEvent) => { if (!menuBoxes.current[menu]?.contains(e.target as Node)) setMenu(null) }
    const escape = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setMenu(null)
      document.getElementById(`tour-tab-${menu}`)?.focus()
    }
    document.addEventListener('mousedown', outside)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('mousedown', outside)
      document.removeEventListener('keydown', escape)
    }
  }, [menu])
  useEffect(() => () => window.clearTimeout(closing.current), [])

  // Fetch the checkout and payout demos as the tour comes near, so they open at once when asked for
  const section = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = section.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      prefetchDemos()
      io.disconnect()
    }, { rootMargin: '800px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const pick = (id: string) => {
    select(id)
    setMenu(null)
  }
  const topIds = TOUR.map((s) => s.id)
  const goTop = (id: string) => {
    const stop = TOUR.find((s) => s.id === id)!
    select(current(stop))
  }
  const item = 'min-h-[44px] min-w-0 whitespace-nowrap rounded-full px-1 sm:px-5 py-2 text-[13px] sm:text-sm font-semibold transition-colors'
  /** A tab's name: the short one on a phone, where there is one, and the full one from a tablet up. */
  const tabLabel = (stop: Stop) =>
    stop.short ? (
      <>
        <span className="sm:hidden" aria-hidden="true">{stop.short}</span>
        <span className="sr-only sm:not-sr-only">{stop.label}</span>
      </>
    ) : (
      stop.label
    )

  return (
    <section ref={section} id="how-it-works" className="scroll-mt-24 section-padding bg-white">
      <div className="container-custom">
        <Intro
          eyebrow="Product tour"
          title={<>See exactly what<br />your customers see.</>}
          intro="The screens your customers and your team use, with the details buyers ask about. Click through them."
        />

        {/* One row at every width: four equal segments in a pill on a phone, sized to the longest label on a wide screen */}
        <div role="toolbar" aria-label="Product screens" className="relative z-20 mb-6 grid w-full grid-cols-4 gap-1 rounded-full bg-neutral-950 p-1 lg:mx-auto lg:w-fit lg:grid-cols-none lg:grid-flow-col lg:auto-cols-fr">
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
                  {tabLabel(stop)}
                </button>
              )
            const shown = TABS.find((x) => x.id === current(stop))!
            const isOpen = menu === stop.id
            const menuId = `tour-menu-${stop.id}`
            return (
              // Wide enough for the longest screen name, so picking one never shifts the buttons beside it;
              // the bar's equal columns give the other buttons the same width
              <div
                key={stop.id}
                ref={(el) => { menuBoxes.current[stop.id] = el }}
                className="relative lg:w-[232px]"
                onPointerEnter={hoverOpen(stop.id)}
                onPointerLeave={hoverClose}
              >
                <button
                  type="button"
                  id={`tour-tab-${stop.id}`}
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                  aria-controls={menuId}
                  onPointerDown={(e) => { pointer.current = e.pointerType }}
                  onClick={() => {
                    if (!on) goTop(stop.id)
                    // A mouse has already opened it by hovering, so its click keeps it open; a tap or a key toggles it
                    setMenu((m) => (pointer.current === 'mouse' || !on ? stop.id : m === stop.id ? null : stop.id))
                    pointer.current = ''
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                      e.preventDefault()
                      setMenu(stop.id)
                      requestAnimationFrame(() => document.querySelector<HTMLButtonElement>(`#${menuId} [role=menuitemradio]`)?.focus())
                    } else onTabKeys(e, index, topIds, goTop, 'tour-tab')
                  }}
                  className={`${item} flex w-full items-center justify-center gap-1 sm:gap-1.5 ${on ? 'bg-primary-500 text-white' : 'text-neutral-300 hover:text-white'}`}
                >
                  {tabLabel(stop)}
                  {/* The screen showing is named beside the tab only where the tab is wide enough for it */}
                  <span className={`hidden lg:inline font-medium ${on ? 'text-white/75' : 'text-neutral-500'}`}>· {shown.label}</span>
                  <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {/* The padding, not a margin, bridges the gap to the menu so hover holds while the pointer crosses */}
                {/* The last tab's menu opens leftwards, so it stays on the page */}
                <div className={`absolute top-full pt-2 transition-all duration-150 ${index === TOUR.length - 1 ? 'right-0' : 'left-0'} ${isOpen ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-1'}`}>
                  <div
                    id={menuId}
                    role="menu"
                    aria-label={stop.menuTitle ?? stop.label}
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
                      const { icon: Icon, note } = SCREEN_NOTES[s.id]
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
                  <div className={`relative mx-auto grid w-full max-w-[920px] grid-cols-1 grid-rows-1 ${DEMO_FRAME}`}>
                    {t.screens.map((s) => (
                      <div key={s.id} className={`${fade(current(t) === s.id)} min-h-0 ${DEMO_FRAME}`}>
                        {seen.includes(s.id) && <TourDemo id={s.id} />}
                      </div>
                    ))}
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

              <div className="mt-8 lg:mt-10">
                <StopCopy stop={t} />
              </div>
            </div>
          ))}
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
        title="Ezeebit | Crypto and stablecoin payment infrastructure"
        exactTitle
        description="Accept crypto and stablecoin payments in-store, online, or on your platform, and pay customers out in stablecoin. Settle the same day in ZAR, KES, NGN, or USD."
        canonicalUrl="/"
        faqs={FAQS.map((f) => ({ question: f.q, answer: f.a }))}
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-hidden -mt-20">
        <PageHero
          id="hero"
          stacked
          kicker="Crypto and stablecoin payment infrastructure"
          // Wraps between the two phrases first, and "pay-ins" never splits at its hyphen
          title={<><span className="inline-block">Stablecoin <span className="whitespace-nowrap">pay-ins</span></span> <span className="inline-block">and payouts,</span></>}
          accent="made Ezee."
          description="Your customers pay in and cash out in crypto, on your platform, in-store, or online, while you settle in ZAR, KES, NGN, USD, or stablecoin. One account and one API, with compliance built in."
          actions={
            <>
              <a href="https://merchant.ezeebit.com/#/signup" target="_blank" rel="noopener noreferrer" className={HERO_PRIMARY}>
                Get started free
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              <Link to="/book-a-call" className={HERO_SECONDARY}>
                Talk to sales
              </Link>
            </>
          }
          wideVisual={<HomeFlowVisual />}
        />

        <section id="stats" className="relative bg-neutral-950 pb-14 lg:pb-20">
          <div className="container-custom">
            <div className="border-t border-white/10 pt-10 lg:pt-14 home-stats">
              {STATS.map((s) => (
                // Two by two on a phone or tablet; four columns from lg
                <div key={s.l} className="text-center">
                  <div className="text-[2rem] sm:text-4xl xl:text-5xl whitespace-nowrap font-display font-bold tracking-[-0.03em] text-primary-400 leading-none mb-3">{s.n}</div>
                  <div>
                    <p className="text-[15px] text-neutral-200">{s.l}</p>
                    {/* Narrower than its column and balanced, so a second line is never one or two words */}
                    <p className="mx-auto mt-1 lg:mt-1.5 max-w-[17rem] text-[13px] leading-relaxed text-neutral-400 [text-wrap:balance]">{s.detail}</p>
                  </div>
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
            {/* The companies we integrate with on the first row, merchants on the second */}
            <div className="partner-carousel-container mb-4 lg:mb-6">
              <PartnerCarousel partners={PARTNERS_B} direction="left" speed={40} />
            </div>
            <div className="partner-carousel-container">
              <PartnerCarousel partners={PARTNERS_A} direction="right" speed={40} />
            </div>
          </div>
        </section>

        <ProductTour />

        <section id="solutions" className="section-padding bg-neutral-50">
          <div className="container-custom">
            <Intro
              eyebrow="Solutions"
              title={<>For anyone who accepts,<br />holds, and sends money.</>}
              intro="Pick the flow you need. Every one runs from the same account."
            />
            {/* Two to a row on a phone, so several show at once; four across on a wide screen */}
            <div className="grid w-full grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
              {SOLUTIONS.map((s) => {
                const Icon = SOLUTION_ICONS[s.slug] ?? Wallet
                return (
                  <Link key={s.slug} to={solutionPath(s)} className="group block h-full rounded-2xl border border-neutral-200 bg-white p-4 lg:p-5 text-center lg:text-left hover:border-neutral-400">
                    <span className={`${TILE} size-9 lg:size-10 mb-3 mx-auto lg:mx-0`} aria-hidden="true">
                      <Icon className="size-[18px] lg:size-5" />
                    </span>
                    <h3 className="text-[15px] lg:text-lg font-semibold text-neutral-900 leading-snug mb-1">{s.name}</h3>
                    <p className="text-[13px] lg:text-sm text-neutral-600 leading-snug lg:leading-relaxed">{s.card}</p>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section id="coverage" className="section-padding bg-white">
          <div className="container-custom">
            <Intro
              eyebrow="Coverage"
              title={<>Live where we operate.<br />More markets to follow.</>}
              intro={LIVE_MARKETS}
            />
            {/* Two to a row on a phone, four across from lg: the three live markets, and the dollar every one can settle in */}
            <div className="grid w-full grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
              {MARKETS.map((m) => (
                <article key={m.name} className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 p-4 text-center lg:flex-row lg:gap-4 lg:p-5 lg:text-left">
                  <img src={m.flag} alt="" width={40} height={40} className="size-9 lg:size-10 shrink-0 rounded-full object-cover !mx-0" />
                  <div className="min-w-0">
                    <h3 className="text-[15px] lg:text-lg font-semibold text-neutral-900 leading-snug">{m.name}</h3>
                    <p className="text-[13px] lg:text-sm text-primary-600 font-semibold">{m.note}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-3 grid gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 lg:mt-4 lg:grid-cols-2">
              <div className="flex items-center gap-4 bg-neutral-50 p-4 lg:p-5">
                <p className="w-[4.5rem] shrink-0 font-display text-4xl font-bold leading-none tracking-[-0.03em] text-primary-600">140</p>
                <div>
                  <p className="flex flex-wrap items-center gap-2 font-semibold text-neutral-900">
                    Payout countries
                    <span className="rounded-full bg-warning-100 px-2 py-0.5 text-[11px] font-semibold text-warning-700">Soon</span>
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-neutral-600">By bank, mobile wallet, and cash pickup. Crypto payouts reach any wallet worldwide today.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-neutral-50 p-4 lg:p-5">
                <div className="w-[4.5rem] shrink-0"><span className={`${TILE} size-11`} aria-hidden="true"><Clock className="size-5" /></span></div>
                <div>
                  <p className="font-semibold text-neutral-900">Settlement</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-neutral-600">The same day, in your local currency, in USD, or in stablecoin.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The investors, on their own just before what merchants say */}
        <section id="investors" className="bg-white pb-12 lg:pb-20">
          <div className="container-custom">
            <div className="grid gap-7 border-t border-neutral-200 pt-10 text-center lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16 lg:text-left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600 mb-3">Our investors</p>
                <h2 className="text-2xl lg:text-3xl font-display font-bold text-neutral-900 leading-tight tracking-[-0.02em]">Backed by leading investors.</h2>
                <p className="mx-auto mt-2 max-w-md text-neutral-600 leading-relaxed lg:mx-0">Global funds and industry veterans who share our belief in the future of payments.</p>
                <Link to="/resources/about" className="hidden lg:inline-flex items-center gap-1.5 mt-4 font-semibold text-primary-600 hover:text-primary-700">
                  Meet our investors and angels
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              {/* One row at every width: three equal columns, each logo scaled to fit its own */}
              <div className="grid grid-cols-3 items-center justify-items-center gap-x-5 lg:gap-x-12">
                {[
                  { name: 'Founder Collective', logo: '/founder_collective_logo.png', size: 'max-h-7 lg:max-h-9' },
                  { name: 'Raba Partnership', logo: '/Raba_logo.webp', size: 'max-h-6 lg:max-h-8' },
                  { name: 'Digital Currency Group', logo: '/digital-currency-group-logo-nobg.png', size: 'max-h-10 lg:max-h-14' },
                ].map((b) => (
                  <img key={b.name} src={b.logo} alt={b.name} className={`${b.size} w-auto max-w-full object-contain !mx-0`} />
                ))}
              </div>
              <Link to="/resources/about" className="inline-flex items-center justify-center gap-1.5 font-semibold text-primary-600 hover:text-primary-700 lg:hidden">
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
              eyebrow="Security"
              title={<>Every payment checked,<br />every key split.</>}
              intro="How funds are held, and how every payment is checked before it reaches you."
            />
            {/* A row each on a phone, the icon beside the words; three across from md */}
            <div className="home-grid-3">
              {([
                [Lock, 'Custody', 'Balances held by an FSCA-regulated provider, in MPC wallets on SOC 2 audited infrastructure.'],
                [ShieldCheck, 'Screening', 'Every payer, payee, and wallet is screened before funds move.'],
                [BadgeCheck, 'No chargebacks', 'A confirmed payment is final, at a rate locked when it is made.'],
              ] as const).map(([Icon, title, body]) => (
                <article key={title} className="flex items-start gap-3.5 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-left md:block lg:p-6">
                  <span className={`${TILE} size-10 md:mb-4 lg:size-12`} aria-hidden="true"><Icon className="size-5 lg:size-6" /></span>
                  <div className="min-w-0">
                    <h3 className="text-base lg:text-lg font-semibold text-neutral-900 mb-1">{title}</h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">{body}</p>
                  </div>
                </article>
              ))}
            </div>
            <a href="https://trust.ezeebit.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-6 font-semibold text-primary-600 hover:text-primary-700">
              Trust Centre
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* The full plans are on /pricing; here, just the figures a first visit asks about */}
        <section id="pricing" className="bg-white py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-8 rounded-3xl border border-neutral-200 bg-neutral-50 p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12 lg:p-10">
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
                <p className="mt-6 text-[13px] text-neutral-500">Excluding VAT. In a shop, the optional ePOS rents at R150 a month per device. Enterprise pricing is based on your volumes.</p>
              </div>
              <Link to="/pricing" className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-neutral-950 text-white font-semibold px-5 py-3 hover:bg-neutral-800">
                See pricing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <section id="faq" className="section-padding bg-neutral-50">
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
            <div className="home-grid-2 lg:items-center">
              {/* Signing up: the steps, then the button that starts them */}
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
                <a
                  href="https://merchant.ezeebit.com/#/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${HERO_PRIMARY} mt-8 w-full sm:w-auto sm:inline-flex`}
                >
                  Get started free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </div>

              {/* Talking first: every way to reach the team, each one a link */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 lg:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-400 mb-3">Talk to us</p>
                <h3 className="text-2xl font-display font-bold text-white mb-3">Rather talk it through first?</h3>
                <p className="text-neutral-300 leading-relaxed mb-6">
                  Best for platforms and enterprises with larger volumes or a custom integration. Bring your use case, and we’ll walk through pay-ins, payouts, and which plan fits.
                </p>
                <ul className="divide-y divide-white/10 border-y border-white/10 mb-6">
                  {CONTACTS.map(({ icon: Icon, label, value, href, hours }) => (
                    <li key={label}>
                      <a
                        href={href}
                        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="group flex items-center gap-4 py-3.5"
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-primary-400">
                          <Icon className="w-5 h-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-white font-semibold group-hover:text-primary-300">{value}</span>
                          <span className="block text-sm text-neutral-400">{label} · {hours}</span>
                        </span>
                        <ArrowRight className="w-4 h-4 shrink-0 text-neutral-500 transition-transform group-hover:translate-x-0.5 group-hover:text-primary-300" />
                      </a>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/book-a-call"
                  className={`${HERO_SECONDARY} w-full`}
                >
                  Book a call
                </Link>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  )
}

export default Home
