import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'

const DOCS = 'https://docs.ezeebit.com'

type Plan = {
  name: string
  tag?: string
  price: string
  unit?: string
  fee: string
  body: string
  points: string[]
  cta: { label: string; href: string }
}

/** What each product costs: a rate on the way in, a flat fee on the way out, and custom pricing at volume. */
const PLANS: Plan[] = [
  {
    name: 'Crypto In',
    price: '1%',
    unit: 'or less per payment',
    fee: 'Excluding VAT',
    body: 'You receive exactly the amount you charged. Your customer sees and accepts the rate before paying.',
    points: ['In store, online checkout and platform deposits', 'Settled the same day, in local currency or stablecoin', 'Lower rates at volume on Enterprise'],
    cta: { label: 'Start free', href: 'https://merchant.ezeebit.com/#/signup' },
  },
  {
    name: 'Crypto Out',
    price: '$0.75',
    unit: 'or less per payout',
    fee: 'Excluding VAT',
    body: 'Converted at a quoted rate that your customer accepts before the payout goes out to their wallet.',
    points: ['A payout link per order', 'USDT today, more stablecoins soon', 'Funded straight from your Crypto In balance'],
    cta: { label: 'Payout docs', href: `${DOCS}/payout-gateway/overview` },
  },
  {
    name: 'Balances and conversion',
    price: 'Quoted rate',
    fee: 'Shown before you convert',
    body: 'Hold fiat and USDT, convert whenever it suits you, and withdraw to your bank or your own wallet.',
    points: ['A fiat wallet and a USDT wallet', 'Fiat to your bank, USDT to your own wallet', 'OTC desk for large trades'],
    cta: { label: 'Wallet docs', href: `${DOCS}/wallets-and-withdrawal/overview` },
  },
  {
    name: 'Enterprise',
    tag: 'Volume pricing',
    price: 'Custom',
    fee: 'Based on your volumes',
    body: 'For gaming operators, PSPs and platforms moving money both ways at scale.',
    points: ['Crypto In and Crypto Out in one account', 'Dedicated account manager', 'Custom integrations and white-label options'],
    cta: { label: 'Book a call', href: '/book-a-call' },
  },
]

/** The four plans, the optional ePOS rental under them, and the VAT note. */
const PricingPlans = () => (
  <>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {PLANS.map((plan) => {
        const external = plan.cta.href.startsWith('http')
        const ctaClass = `mt-auto inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-3 font-semibold ${
          plan.tag ? 'bg-primary-500 text-white hover:bg-primary-600' : 'border border-neutral-300 text-neutral-900 hover:border-neutral-900'
        }`
        return (
          <article
            key={plan.name}
            className={`flex flex-col gap-4 rounded-3xl bg-white p-6 lg:p-7 ${
              // A ring rather than a thicker border, so the featured card's contents line up with the others
              plan.tag ? 'border border-primary-500 ring-1 ring-primary-500 shadow-[0_20px_50px_rgba(0,74,145,0.12)]' : 'border border-neutral-200'
            }`}
          >
            <h2 className="flex flex-wrap items-center justify-between gap-2 text-xl font-semibold text-neutral-900">
              {plan.name}
              {plan.tag && <span className="rounded-full bg-primary-500 px-2.5 py-0.5 text-[11px] leading-4 font-semibold text-white">{plan.tag}</span>}
            </h2>
            <div>
              <p className="text-4xl font-semibold tracking-[-0.02em] text-neutral-900 leading-none">
                {plan.price}
                {plan.unit && <span className="ml-1.5 text-[15px] font-normal tracking-normal text-neutral-500">{plan.unit}</span>}
              </p>
              <p className="mt-2 text-sm text-neutral-500">{plan.fee}</p>
            </div>
            <p className="text-[15px] text-neutral-600 leading-relaxed">{plan.body}</p>
            <ul className="space-y-2.5 mb-2">
              {plan.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[15px] text-neutral-700">
                  <Check className="w-4 h-4 text-primary-600 mt-1 shrink-0" strokeWidth={2.5} />
                  {p}
                </li>
              ))}
            </ul>
            {external ? (
              <a href={plan.cta.href} target="_blank" rel="noopener noreferrer" className={ctaClass}>
                {plan.cta.label}
              </a>
            ) : (
              <Link to={plan.cta.href} className={ctaClass}>
                {plan.cta.label}
              </Link>
            )}
          </article>
        )
      })}
    </div>
    {/* The one monthly charge, and only for a shop that wants the device */}
    <div className="mt-4 flex flex-wrap lg:flex-nowrap items-center justify-between gap-x-6 gap-y-3 rounded-2xl border border-neutral-200 bg-white px-5 py-4">
      <div className="flex min-w-0 items-center gap-4">
        <img src="/tour/epos.webp" alt="" width={224} height={601} loading="lazy" className="h-14 w-auto mx-0 shrink-0" />
        <p className="text-[15px] text-neutral-600 leading-relaxed">
          <b className="font-semibold text-neutral-900">Taking payments in a shop?</b> The Ezeebit ePOS is optional: rent one for R150 a month per device, with printable receipts and cash-ups, or take payments with a free Ezeebit Pay QR code.
        </p>
      </div>
      <Link to="/in-store" className="inline-flex items-center gap-1.5 whitespace-nowrap font-semibold text-primary-600 hover:text-primary-700">
        In-store payments
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
    <p className="mt-3 text-[13px] text-neutral-500">Prices exclude VAT. Payout fees are in US dollars and the ePOS rental in rand.</p>
  </>
)

export default PricingPlans
