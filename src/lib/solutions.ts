import {
  ArrowDownLeft, ArrowUpRight, Ban, Building2, Clock, Globe, Layers, Lock, Plug, Printer, QrCode,
  Receipt, RefreshCw, ShieldCheck, SlidersHorizontal, UserCheck, Users, Wallet, Zap,
} from 'lucide-react'
import type { Feature, Step } from '../components/PayFlowSections'
import { SUNBET, type CaseStudy } from './caseStudies'

/**
 * The Solutions pages: one per kind of business, each a page at
 * /solutions/<slug>, listed in the header's Solutions menu, the footer, and
 * the homepage's Solutions section. Every claim here is one the site already
 * makes on a product page, in the FAQs, or in the docs at docs.ezeebit.com,
 * so a solution page never says more than the product does.
 */

export type SolutionGroup = 'platforms' | 'businesses'

type Base = {
  slug: string
  name: string
  group: SolutionGroup
  /** One line under the name in the header menu. */
  nav: string
  /** The homepage card's line. */
  card: string
  seo: { title: string; description: string }
  hero: { title: string; accent: string; description: string }
  /** Which existing hero illustration to show. */
  visual: 'platforms' | 'instore' | 'online' | 'payouts' | 'wallets' | 'otc'
  primary: { label: string; to: string }
  secondary: { label: string; to: string }
  points: Feature[]
  faqs: { question: string; answer: string }[]
  /** A live customer, where there is a story we can tell, shown in full. */
  caseStudy?: { title: string; intro: string; study: CaseStudy }
  /** The heading over the page's closing call to action, in the solution's own words. */
  cta?: string
}

/** What sits beside a solution's steps: one of the live demos, or the merchant tree a gateway builds. */
export type SolutionDemo = 'online' | 'in-store' | 'platforms' | 'payout' | 'accounts' | 'hierarchy'

/**
 * Told the way the Platforms page tells it: what you get, what a deposit
 * does, how one works beside the live checkout, and how a payout works
 * beside the live claim. For a platform that both takes deposits and pays
 * its users out.
 */
export type Flows = {
  /** The heading over the points. */
  why: { title: string; intro: string }
  payins: { title: string; intro: string; items: Feature[] }
  deposit: { intro: string; steps: Step[] }
  payouts: { title: string; intro: string; steps: Step[] }
}

export type Solution = Base &
  (
    | { flows: Flows; steps?: never; products?: never }
    /**
     * Told in four steps, with links to the products behind it. Each page has
     * its own headings, and shows the demo closest to what it sells beside
     * the steps; one without a demo sets the steps out across the page.
     */
    | {
        flows?: never
        steps: Step[]
        products: { name: string; to: string; body: string }[]
        /** The heading over what you get. */
        why: string
        /** The heading over the steps. */
        how: string
        demo?: SolutionDemo
        /** True where the steps, with their demo, come before what you get. */
        stepsFirst?: boolean
      }
  )

const SIGNUP = { label: 'Get started free', to: 'https://merchant.ezeebit.com/#/signup' }
const TALK = { label: 'Talk to the team', to: '/book-a-call' }

const SETTLE = 'Settle the same day, in ZAR, KES, NGN, or USD, or in stablecoin.'

export const SOLUTIONS: Solution[] = [
  {
    slug: 'gaming-and-betting',
    name: 'Gaming and betting',
    group: 'platforms',
    nav: 'Crypto deposits and stablecoin withdrawals',
    card: 'Instant crypto deposits and stablecoin withdrawals.',
    seo: {
      title: 'Crypto deposits for gaming and betting',
      description: 'Let players deposit in crypto and withdraw winnings in stablecoin, with no chargebacks. Ezeebit is live in South Africa, Kenya, and Nigeria.',
    },
    hero: {
      title: 'Crypto deposits for',
      accent: 'gaming and betting.',
      description: 'Players deposit from the wallet or exchange their money already sits in, and withdraw winnings in stablecoin. You never hold crypto, and a confirmed deposit can never be charged back.',
    },
    visual: 'platforms',
    primary: TALK,
    secondary: { label: 'How platforms use Ezeebit', to: '/platforms' },
    points: [
      { icon: ArrowDownLeft, title: 'Take deposits without holding crypto', body: 'Players pay in crypto or stablecoin. Each deposit is hedged the moment it lands, so you credit a fixed amount and never carry the asset.' },
      { icon: ArrowUpRight, title: 'Pay winnings in stablecoin', body: "Fund payouts from your fiat balance. We reserve the amount, convert it, and send the stablecoin to the player's wallet." },
      { icon: SlidersHorizontal, title: 'Choose your exposure', body: `${SETTLE} How much crypto you hold is up to you.` },
      { icon: ShieldCheck, title: 'We handle the rest', body: 'Ezeebit is regulated by the FSCA and takes care of KYC and AML, the Travel Rule, address screening, hedging, and on-chain settlement.' },
    ],
    flows: {
      why: {
        title: 'Deposits in and winnings out, without holding crypto',
        intro: 'Ezeebit sits between your platform and the blockchain. Players deposit and get paid in crypto; you keep a clean ledger in the currency you choose.',
      },
      payins: {
        title: 'Every deposit reaches the right player',
        intro: 'The player paying is the account holder, so every deposit has to reach the right balance, in real time, against a ledger you and your regulator can audit.',
        items: [
          { icon: UserCheck, title: 'Credited to the right player', body: 'Every deposit carries a reference tied to one player, so funds land on the right balance across many deposits, assets, and networks at once.' },
          { icon: Zap, title: 'Credited in seconds', body: "We watch the chains, apply each network's confirmation rules, and send a signed webhook the moment a deposit is final." },
          { icon: RefreshCw, title: 'Processed exactly once', body: 'Under-payments, over-payments, late confirmations, and retries are handled the same way every time and reconciled to one ledger.' },
          { icon: Wallet, title: 'Any wallet, any exchange', body: 'On-chain from any wallet, 700+ wallets through WalletConnect, and straight from Luno, VALR, and Binance.' },
          { icon: Lock, title: 'Rate locked when they pay', body: 'The value is fixed the moment the player pays, so the amount you credit never moves with the market.' },
          { icon: Ban, title: 'Final, with no chargebacks', body: 'A confirmed crypto deposit cannot be reversed, so there is no chargeback or deposit-reversal fraud to fight.' },
        ],
      },
      deposit: {
        intro: 'One API call, one checkout link, and one signed webhook back. Integrations take days, not months.',
        steps: [
          { title: 'The player chooses crypto', body: 'Your cashier creates a deposit through the API and opens the checkout link it returns.' },
          { title: 'They pay their way', body: 'On-chain from any wallet, through WalletConnect, or from Luno, VALR, or Binance. The rate is locked when they pay.' },
          { title: 'You credit the balance', body: 'Once the deposit is final, a signed webhook arrives and you credit the player in real time.' },
          { title: 'You get settled', body: SETTLE },
        ],
      },
      payouts: {
        title: 'Pay winnings out in stablecoin',
        intro: 'Send winnings and withdrawals as stablecoin, funded from your fiat balance. You never buy, hold, or move the stablecoin yourself.',
        steps: [
          { title: 'Create the payout', body: 'Call the Payout Gateway with the amount in your currency. We reserve it against your fiat balance and return a link.' },
          { title: 'The player claims it', body: 'They pick the network and enter their own wallet address, so you never collect or check addresses.' },
          { title: 'We convert and send', body: 'We screen the address, convert at the quoted rate, and send the stablecoin on-chain, usually within minutes.' },
          { title: 'You reconcile', body: 'A signed webhook confirms the final status and the transaction hash.' },
        ],
      },
    },
    faqs: [
      { question: 'Which wallets can players deposit from?', answer: 'Any wallet on-chain, 700+ wallets through WalletConnect, and straight from Luno, VALR, and Binance.' },
      { question: 'How are deposits matched to players?', answer: 'Each deposit is created through the API for one player, with a reference that carries through to the signed webhook, so you credit the right balance automatically.' },
      { question: 'How do players withdraw?', answer: 'You create a payout in your own currency. The player opens the payout link, adds their own wallet, and receives USDT, usually within minutes.' },
    ],
    caseStudy: {
      title: 'Live with regulated operators',
      intro: 'Sunbet takes its crypto deposits through Ezeebit.',
      study: SUNBET,
    },
  },
  {
    slug: 'trading-and-investment',
    name: 'Trading and investment',
    group: 'platforms',
    nav: 'Top-ups and withdrawals in stablecoin',
    card: 'Stablecoin top-ups and withdrawals for traders.',
    seo: {
      title: 'Crypto top-ups and withdrawals for trading platforms',
      description: 'Let traders fund their accounts from stablecoins they already hold and withdraw profits the same way. Ezeebit is live in South Africa, Kenya, and Nigeria.',
    },
    hero: {
      title: 'Crypto top-ups',
      accent: 'for traders.',
      description: 'Let traders fund their accounts from the stablecoins they already hold, and withdraw profits the same way, instead of waiting on cards or wires.',
    },
    visual: 'platforms',
    primary: TALK,
    secondary: { label: 'How platforms use Ezeebit', to: '/platforms' },
    points: [
      { icon: Zap, title: 'Funded in seconds', body: 'Traders top up from any wallet or exchange, and you credit them the moment the deposit is final.' },
      { icon: Lock, title: 'Rate locked when they pay', body: 'The value is fixed the moment the trader pays, so the amount you credit never moves with the market.' },
      { icon: Clock, title: 'Withdrawals at any hour', body: 'Payouts go out 24/7, with no banking cut-offs on weekends or public holidays.' },
      { icon: Wallet, title: 'A USDT wallet for every trader', body: 'Customer accounts give each trader a USDT wallet under your account, with deposit addresses on Tron, Ethereum, BSC, and Solana.' },
    ],
    why: 'Built for traders who already hold stablecoins',
    how: 'From top-up to withdrawal',
    demo: 'platforms',
    cta: 'Give your traders a faster way in and out',
    steps: [
      { title: 'The trader tops up', body: 'From any wallet on-chain, through WalletConnect, or from Luno, VALR, or Binance.' },
      { title: 'You credit their account', body: 'A signed webhook confirms the deposit, with the reference that ties it to the trader.' },
      { title: 'They trade', body: `You hold no crypto price risk. ${SETTLE}` },
      { title: 'Profits go out in stablecoin', body: 'Create a payout; the trader claims it to their own wallet in minutes.' },
    ],
    products: [
      { name: 'Platforms', to: '/platforms', body: 'Pay-ins and payouts for any platform, in one account.' },
      { name: 'Payouts', to: '/payouts', body: 'Stablecoin withdrawals your traders claim themselves.' },
      { name: 'Wallets', to: '/wallets', body: 'Hold fiat and USDT, and convert between them.' },
    ],
    faqs: [
      { question: 'Can traders keep a USDT balance with us?', answer: 'Yes. Customer accounts give each trader a USDT wallet under your merchant account, with its own balance, ledger, and deposit addresses. You run them through the same API as your own wallets.' },
      { question: 'How fast are withdrawals?', answer: 'Usually within minutes of the trader submitting their wallet address, at any hour, although confirmation times vary by network.' },
      { question: 'Do we have to hold crypto?', answer: `No. Every deposit is hedged the moment it lands. ${SETTLE}` },
    ],
  },
  {
    slug: 'payment-gateways',
    name: 'Payment gateways',
    group: 'platforms',
    nav: 'Crypto for the merchants on your gateway',
    card: 'Crypto pay-ins and stablecoin payouts for your own merchants.',
    seo: {
      title: 'Crypto pay-ins and payouts for payment gateways',
      description: 'Offer crypto pay-ins and stablecoin payouts to the merchants on your gateway, each a sub-merchant with its own stores and history.',
    },
    hero: {
      title: 'Pay-ins and payouts',
      accent: 'for your merchants.',
      description: 'Offer crypto pay-ins and stablecoin payouts to the merchants on your gateway. Onboard each one as a sub-merchant through the API, with its own stores, fees, and transaction history.',
    },
    visual: 'platforms',
    primary: TALK,
    secondary: { label: 'View the API', to: '/developers' },
    points: [
      { icon: Users, title: 'Sub-merchants through the API', body: 'Create, read, and remove sub-merchants from your own systems, with no manual onboarding.' },
      { icon: Layers, title: 'Their own stores and history', body: 'Each merchant has its own stores, fees, and transaction history, kept apart from the rest.' },
      { icon: Globe, title: 'Every channel', body: 'In store, online checkout, and platform deposits all open the same checkout.' },
      { icon: ShieldCheck, title: 'Compliance handled', body: 'KYC and KYB, AML, address screening, and the Travel Rule are handled by Ezeebit, which is regulated by the FSCA as a Crypto Asset Service Provider.' },
    ],
    why: 'Crypto as one more rail on your gateway',
    how: 'From onboarding a merchant to settlement',
    demo: 'hierarchy',
    cta: 'Add crypto to your gateway',
    steps: [
      { title: 'Onboard the merchant', body: 'Create them as a sub-merchant through the API.' },
      { title: 'Add their stores', body: 'Each store gets its own checkout and its own history.' },
      { title: 'They take payments', body: 'Customers pay from any wallet or exchange, at a rate locked when they pay.' },
      { title: 'Everyone gets settled', body: SETTLE },
    ],
    products: [
      { name: 'Platforms', to: '/platforms', body: 'Pay-ins and payouts for any platform, in one account.' },
      { name: 'Developers', to: '/developers', body: 'The API, webhooks, and sandbox.' },
      { name: 'Pricing', to: '/pricing', body: 'Volume pricing for platforms.' },
    ],
    faqs: [
      { question: 'How do we onboard our merchants?', answer: 'Create each one as a sub-merchant through the API. Each gets its own stores, fees, and transaction history.' },
      { question: 'Can our merchants take payments in store?', answer: 'Yes. In store, online checkout, and platform deposits all open the same Ezeebit checkout.' },
      { question: 'What does it cost?', answer: 'Platforms get volume pricing, based on their volumes. Book a call and we will put a price together.' },
    ],
  },
  {
    slug: 'wallets-and-neobanks',
    name: 'Wallets and neobanks',
    group: 'platforms',
    nav: 'Crypto top-ups and cash-outs for your app',
    card: 'Crypto top-ups and cash-outs inside your app.',
    seo: {
      title: 'Crypto top-ups and cash-outs for wallets and neobanks',
      description: 'Make crypto a first-class way to top up and to cash out, with a USDT wallet for every user. Ezeebit is live in South Africa, Kenya, and Nigeria.',
    },
    hero: {
      title: 'Crypto in and out',
      accent: 'for your app.',
      description: 'Make crypto a first-class way to top up and to cash out, for the users who keep their money on-chain.',
    },
    visual: 'wallets',
    primary: TALK,
    secondary: { label: 'How platforms use Ezeebit', to: '/platforms' },
    points: [
      { icon: ArrowDownLeft, title: 'Top up from anywhere', body: 'On-chain from any wallet, 700+ wallets through WalletConnect, and straight from Luno, VALR, and Binance.' },
      { icon: ArrowUpRight, title: 'Cash out in stablecoin', body: 'Users withdraw USDT to their own wallet, usually within minutes, at any hour.' },
      { icon: Wallet, title: 'A USDT wallet for every user', body: 'Customer accounts give each user a USDT wallet under your account, with instant, free transfers between your wallet and theirs.' },
      { icon: ShieldCheck, title: 'Screened and compliant', body: 'Addresses are screened before funds move, with the Travel Rule applied.' },
    ],
    why: 'Crypto as a first-class way in and out',
    how: "From a user's first top-up to their cash-out",
    demo: 'accounts',
    cta: 'Put crypto in your app',
    steps: [
      { title: 'Open a wallet per user', body: 'One API call, with your own customer ID.' },
      { title: 'They top up', body: 'Deposits to their addresses on Tron, Ethereum, BSC, or Solana are credited to them.' },
      { title: 'Move funds instantly', body: 'Book transfers between your wallet and theirs are instant, with no fee.' },
      { title: 'They cash out', body: 'To a whitelisted address, screened before it goes.' },
    ],
    products: [
      { name: 'Platforms', to: '/platforms', body: 'Pay-ins and payouts for any platform, in one account.' },
      { name: 'Payouts', to: '/payouts', body: 'Stablecoin cash-outs your users claim themselves.' },
      { name: 'Wallets', to: '/wallets', body: 'Hold fiat and USDT, and convert between them.' },
    ],
    faqs: [
      { question: 'Can each user have their own wallet?', answer: 'Yes. Customer accounts give each user a USDT wallet under your merchant account, with its own balance, ledger, and deposit addresses on Tron, Ethereum, BSC, and Solana.' },
      { question: 'Who are deposits credited to?', answer: 'To the user. A deposit to a customer account is credited to that account, not to your own balance.' },
      { question: 'Where can users withdraw to?', answer: 'To whitelisted addresses. Every address is screened, with the Travel Rule applied, before funds move.' },
    ],
  },
  {
    slug: 'online-stores',
    name: 'Online stores',
    group: 'businesses',
    nav: 'Crypto checkout with a plugin or the API',
    card: 'Crypto checkout with a plugin or the API.',
    seo: {
      title: 'Crypto checkout for online stores',
      description: 'Add stablecoin and crypto checkout to Shopify, WooCommerce, or Magento, or build on the API. 1% or less per payment, with no setup fees.',
    },
    hero: {
      title: 'Crypto checkout',
      accent: 'for online stores.',
      description: 'Add stablecoin and crypto payments to your store with a plugin for Shopify, WooCommerce, or Magento, or build on the API. You receive exactly the amount you charged.',
    },
    visual: 'online',
    primary: SIGNUP,
    secondary: { label: 'See online checkout', to: '/online' },
    points: [
      { icon: Plug, title: 'A plugin or the API', body: 'Zero-code plugins for Shopify, WooCommerce, and Magento, or build on the API.' },
      { icon: Wallet, title: 'The wallet they already use', body: 'Customers pay from any wallet, 700+ wallets through WalletConnect, or Luno, VALR, and Binance.' },
      { icon: Lock, title: 'Exactly what you charged', body: 'The customer sees and accepts the rate before paying, so you receive the full amount.' },
      { icon: Ban, title: 'No chargebacks', body: 'Confirmed crypto payments are final.' },
    ],
    why: 'What your store gets',
    how: 'From install to settlement',
    demo: 'online',
    stepsFirst: true,
    cta: 'Add crypto to your checkout',
    steps: [
      { title: 'Add the plugin', body: 'Or call the API from your own checkout.' },
      { title: 'The customer picks crypto', body: 'Checkout opens with the order total carried over.' },
      { title: 'They pay', body: 'From any wallet or exchange, at a rate locked when they pay.' },
      { title: 'You get settled', body: SETTLE },
    ],
    products: [
      { name: 'Online', to: '/online', body: 'Hosted checkout for your website.' },
      { name: 'Pricing', to: '/pricing', body: '1% or less per payment, with no setup fees.' },
    ],
    faqs: [
      { question: 'Which store platforms have plugins?', answer: 'Shopify, WooCommerce, and Magento. Anything else can use the API.' },
      { question: 'What does it cost?', answer: '1% or less per payment, excluding VAT. There are no setup fees and no monthly platform fees.' },
      { question: 'When do I get paid?', answer: 'The same day, in local currency or in stablecoin.' },
    ],
  },
  {
    slug: 'shops-and-hospitality',
    name: 'Shops and hospitality',
    group: 'businesses',
    nav: 'Crypto at the counter, with an ePOS or a QR code',
    card: 'Crypto at the counter, with an ePOS or a QR code.',
    seo: {
      title: 'Crypto payments for shops and hospitality',
      description: 'Take stablecoin and crypto payments at the counter with the Ezeebit ePOS or a free Ezeebit Pay QR code. Settled in ZAR, KES, NGN, or USD.',
    },
    hero: {
      title: 'Crypto payments',
      accent: 'at the counter.',
      description: 'Staff enter the amount, and the customer scans a code with the wallet already on their phone. Use the Ezeebit ePOS, or a free Ezeebit Pay QR code.',
    },
    visual: 'instore',
    primary: SIGNUP,
    secondary: { label: 'See in-store payments', to: '/in-store' },
    points: [
      { icon: Printer, title: 'The Ezeebit ePOS', body: 'An Android device that prints receipts and does cash-ups, optional at R150 a month per device.' },
      { icon: QrCode, title: 'Or a free QR code', body: 'An Ezeebit Pay QR code at the till, with no device needed.' },
      { icon: Lock, title: 'Rate locked at the till', body: 'Every payment is hedged on the spot, so you receive exactly what you charged.' },
      { icon: Receipt, title: 'Refunds your way', body: 'Confirmed payments cannot be charged back. Refund under your own returns policy.' },
    ],
    why: 'What your counter gets',
    how: 'From the till to your bank',
    demo: 'in-store',
    stepsFirst: true,
    cta: 'Take crypto at your counter',
    steps: [
      { title: 'Enter the amount', body: 'On the ePOS, or show the customer your QR code.' },
      { title: 'The customer scans', body: 'With the wallet or exchange app already on their phone.' },
      { title: 'They pay', body: 'In BTC, ETH, USDT, USDC, and more, at a rate locked when they pay.' },
      { title: 'You get settled', body: SETTLE },
    ],
    products: [
      { name: 'In-Store', to: '/in-store', body: 'The ePOS and Ezeebit Pay QR codes.' },
      { name: 'Pricing', to: '/pricing', body: '1% or less per payment, and the optional ePOS rental.' },
    ],
    faqs: [
      { question: 'What equipment do I need?', answer: 'None to start: an Ezeebit Pay QR code is free. The Ezeebit ePOS is optional, at R150 a month per device, with printed receipts and cash-ups.' },
      { question: 'How do refunds work?', answer: 'Your store handles refunds directly. Confirmed crypto payments cannot be reversed by the payer, so refund in local currency or store credit under your own returns policy.' },
      { question: 'What does it cost?', answer: '1% or less per payment, excluding VAT, with no setup fees and no monthly platform fees.' },
    ],
  },
  {
    slug: 'marketplaces',
    name: 'Marketplaces',
    group: 'businesses',
    nav: 'Stablecoin payouts to sellers, drivers, and creators',
    card: 'Stablecoin payouts to sellers, drivers, and creators.',
    seo: {
      title: 'Stablecoin payouts for marketplaces',
      description: 'Pay sellers, drivers, and creators in stablecoin on your own schedule, including across borders, without collecting a single wallet address.',
    },
    hero: {
      title: 'Pay your sellers',
      accent: 'in stablecoin.',
      description: 'Settle the people on your marketplace on your own schedule, including across borders, from your fiat balance. They add their own wallet, and the funds land in minutes.',
    },
    visual: 'payouts',
    primary: TALK,
    secondary: { label: 'See payouts', to: '/payouts' },
    points: [
      { icon: Users, title: 'No addresses to collect', body: 'Each payout is a link carrying your brand. The recipient adds their own wallet.' },
      { icon: Clock, title: 'At any hour', body: 'Payouts go out 24/7, with no banking cut-offs on weekends or public holidays.' },
      { icon: Building2, title: 'From your fiat balance', body: 'The amount is reserved when the payout is created, so there is no second provider to pre-fund.' },
      { icon: ShieldCheck, title: 'Screened and confirmed', body: 'The address is screened before funds move, and a signed webhook confirms the final status and transaction hash.' },
    ],
    why: 'Payouts without the admin',
    how: 'From payout to reconciliation',
    demo: 'payout',
    cta: 'Pay your sellers in stablecoin',
    steps: [
      { title: 'Create the payout', body: 'In your own currency, through the API.' },
      { title: 'Send the link', body: 'The recipient chooses the network and adds their own wallet.' },
      { title: 'We convert and send', body: 'At the quoted rate, on-chain, usually within minutes.' },
      { title: 'You reconcile', body: 'A signed webhook confirms the final status and the transaction hash.' },
    ],
    products: [
      { name: 'Payouts', to: '/payouts', body: 'Stablecoin payouts your recipients claim themselves.' },
      { name: 'Wallets', to: '/wallets', body: 'Hold fiat and USDT, and fund payouts from your own wallets.' },
    ],
    faqs: [
      { question: 'Do recipients need an Ezeebit account?', answer: 'No. They open the payout link in any mobile browser and enter their own wallet address. They need a crypto wallet that supports the network they choose.' },
      { question: 'How fast do payouts arrive?', answer: 'Usually within minutes of the recipient submitting their wallet address, at any hour, although confirmation times vary by network.' },
      { question: 'Which stablecoins can we pay in?', answer: 'USDT today, with more stablecoins coming soon.' },
    ],
  },
  {
    slug: 'large-trades',
    name: 'Large trades',
    group: 'businesses',
    nav: 'Firm prices from the OTC desk',
    card: 'Firm prices on large trades from the OTC desk.',
    seo: {
      title: 'Large crypto trades at a firm price',
      description: 'Buy or sell crypto at scale with a firm price from a named dealer, locked when you accept it, and settle the same day.',
    },
    hero: {
      title: 'Large crypto trades,',
      accent: 'at a firm price.',
      description: 'The OTC desk quotes large trades. You get a firm price from a named dealer, locked when you accept it, and settle the same day in ZAR, KES, NGN, or USD.',
    },
    visual: 'otc',
    primary: TALK,
    secondary: { label: 'See the OTC desk', to: '/otc' },
    points: [
      { icon: Lock, title: 'A firm price', body: 'Locked when you accept the quote, without moving the market.' },
      { icon: UserCheck, title: 'A named dealer', body: 'A dedicated dealer handles every trade, from quote to settlement.' },
      { icon: Zap, title: 'Same-day settlement', body: 'Settle the same day in ZAR, KES, NGN, or USD.' },
      { icon: ShieldCheck, title: 'Regulated', body: 'Ezeebit is regulated by the FSCA as a Crypto Asset Service Provider, FSP No. 53664.' },
    ],
    why: 'What the desk gives you',
    how: 'From quote to settlement',
    cta: 'Ask the desk for a quote',
    steps: [
      { title: 'Ask for a quote', body: 'Tell the desk what you want to buy or sell.' },
      { title: 'Get a firm price', body: 'From your dealer, for the full size.' },
      { title: 'Accept it', body: 'The price is locked the moment you do.' },
      { title: 'Settle the same day', body: 'In ZAR, KES, NGN, or USD.' },
    ],
    products: [
      { name: 'OTC', to: '/otc', body: 'Large-volume trades with a dedicated dealer.' },
      { name: 'Wallets', to: '/wallets', body: 'Hold fiat and USDT, and convert between them.' },
    ],
    faqs: [
      { question: 'How is the price set?', answer: 'Your dealer gives you a firm quote for the full size, and it is locked the moment you accept it.' },
      { question: 'When do we settle?', answer: 'The same day, in ZAR, KES, NGN, or USD.' },
      { question: 'Who handles the trade?', answer: 'A dedicated dealer at the OTC desk, from quote to settlement.' },
    ],
  },
]

export const solutionPath = (s: Solution) => `/solutions/${s.slug}`
export const findSolution = (slug: string | undefined) => SOLUTIONS.find((s) => s.slug === slug)

