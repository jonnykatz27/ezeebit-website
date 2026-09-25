import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Zap, Shield, Globe, TrendingUp,
  ArrowRight, Star, ChevronLeft, ChevronRight,
  ThumbsUp, Headphones, Lock, Landmark, Store, Webhook, Receipt, Link2
} from 'lucide-react'
import PartnerCarousel from '../components/PartnerCarousel'
import SEO from '../components/SEO'

const FLOWS = [
  { id: 'pay-in', label: 'Pay in' },
  { id: 'pay-out', label: 'Pay out' },
  { id: 'hold', label: 'Hold & convert' },
] as const

type FlowId = (typeof FLOWS)[number]['id']

/** Shell shared by every step card: number, kicker, headline, body, then its own visual. */
const FlowStep = ({ number, kicker, title, body, children }: {
  number: string
  kicker: string
  title: string
  body: string
  children?: React.ReactNode
}) => (
  <div className="bg-white border border-neutral-200/80 rounded-3xl shadow-sm">
    <div className="p-6 sm:p-10">
      <div className="flex items-center justify-center gap-3 mb-7">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-50 text-xs font-semibold text-primary-600 shrink-0">
          {number}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
          {kicker}
        </span>
      </div>
      <h3 className="text-2xl lg:text-[1.75rem] font-bold text-neutral-900 mb-3">{title}</h3>
      <p className={`text-neutral-500 leading-relaxed max-w-xl mx-auto ${children ? 'mb-8' : ''}`}>
        {body}
      </p>
      {children}
    </div>
  </div>
)

/** The animated rail that links one step to the next. */
const FlowConnector = () => (
  <div className="flex justify-center py-6 sm:py-8">
    <div className="relative overflow-hidden rounded-full" style={{ width: 3, height: 96 }}>
      <div className="absolute inset-0 bg-neutral-200/50" />
      <motion.div
        className="absolute left-0 right-0"
        style={{
          height: 38,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,116,227,0.45) 55%, #0074E3 100%)',
        }}
        animate={{ y: [-38, 96] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.35, ease: 'linear' }}
      />
    </div>
  </div>
)

const PayOutFlow = () => (
  <>
    <FlowStep
      number="01"
      kicker="You create it"
      title="One API call."
      body="Send the amount and your reference. We reserve the fiat against your balance and hand back a link."
    >
      <div className="bg-neutral-50 rounded-2xl p-5 text-left">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-bold tracking-wider text-white bg-primary-500 rounded px-2 py-1">
            POST
          </span>
          <code className="font-mono text-xs sm:text-sm text-neutral-700 break-all">
            /consumerPayout/newOrder
          </code>
        </div>

        <div className="bg-white rounded-xl divide-y divide-neutral-100 mb-4">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-neutral-500">Amount</span>
            <span className="text-sm font-semibold text-neutral-900">R2,000.00</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-neutral-500">Your reference</span>
            <span className="text-sm font-mono font-semibold text-neutral-900">PO-1042</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
            <Link2 className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-neutral-900">Returns a payout link</p>
            <p className="text-xs text-neutral-500 font-mono truncate">pay.ezeebit.com/p/8f2c…</p>
          </div>
        </div>
      </div>
    </FlowStep>

    <FlowConnector />

    <FlowStep
      number="02"
      kicker="Your customer completes it"
      title="They enter their own wallet address."
      body="They open the link and complete the payout themselves, so a mistyped address is never your liability."
    >
      <div className="grid grid-cols-2 gap-3 text-left">
        <div className="bg-neutral-50 rounded-2xl p-5">
          <div className="flex items-center gap-1 mb-5 h-[58px]">
            <img src="/usdt-logo.svg" alt="USDT" className="w-10 h-10 object-contain !mx-0" />
            <img src="/usdc-logo.svg" alt="USDC" className="w-10 h-10 object-contain -ml-2 !mx-0" />
          </div>
          <h4 className="font-semibold text-neutral-900 text-sm mb-1.5">Paid in stablecoin</h4>
          <p className="text-sm text-neutral-500 leading-relaxed">
            USDT or USDC — dollar-pegged, so what they receive holds its value
          </p>
        </div>

        <div className="bg-neutral-50 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-5 h-[58px]">
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center p-2 shrink-0">
              <img src="/eth-logo.svg" alt="Ethereum" className="w-full h-full object-contain !mx-0" />
            </div>
            <span className="text-sm font-semibold text-neutral-700">Ethereum</span>
          </div>
          <h4 className="font-semibold text-neutral-900 text-sm mb-1.5">On Ethereum</h4>
          <p className="text-sm text-neutral-500 leading-relaxed">
            Any wallet on the network, from self-custody to an exchange address
          </p>
        </div>
      </div>
    </FlowStep>

    <FlowConnector />

    <FlowStep
      number="03"
      kicker="Funds land"
      title="Settled on-chain in minutes."
      body="Your customer watches it complete, and we post a signed webhook so your ledger reconciles itself."
    >
      <div className="grid grid-cols-2 gap-3 items-center text-left">
        <div className="flex justify-center">
          <img
            src="/payout-widget-mockup.webp"
            alt="The payout widget showing a withdrawal completing and funds transferred"
            width={800}
            height={1615}
            loading="lazy"
            className="w-full max-w-[14rem] h-auto !mx-0"
          />
        </div>

        <div className="bg-neutral-50 rounded-2xl p-1 divide-y divide-neutral-100">
          {[
            { icon: <Webhook className="w-4 h-4" />, label: 'Signed webhook', desc: 'RSA-signed on every status change' },
            { icon: <Shield className="w-4 h-4" />, label: 'Processed once', desc: 'retries and late confirmations are idempotent' },
            { icon: <Receipt className="w-4 h-4" />, label: 'Transaction hash', desc: 'returned with the final status, for your ledger' },
          ].map((f) => (
            <div key={f.label} className="flex items-start gap-3 p-4">
              <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600 shrink-0">
                {f.icon}
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                <span className="font-semibold text-neutral-900">{f.label}</span>
                {' '}—{' '}{f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </FlowStep>
  </>
)

const HoldFlow = () => (
  <>
    <FlowStep
      number="01"
      kicker="Money arrives"
      title="Everything lands in one balance."
      body="In-store, online and OTC settlement all land in the same wallets, hedged on arrival so you carry no volatility."
    >
      <div className="grid grid-cols-3 gap-3">
        {[
          { name: 'In-store', icon: <Store className="w-5 h-5" />, note: 'ePOS and QR' },
          { name: 'Online', icon: <Globe className="w-5 h-5" />, note: 'Hosted checkout' },
          { name: 'OTC', icon: <TrendingUp className="w-5 h-5" />, note: 'Desk settlement' },
        ].map((sourceItem) => (
          <div key={sourceItem.name} className="bg-neutral-50 rounded-2xl p-5 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary-600">
              {sourceItem.icon}
            </div>
            <span className="font-semibold text-neutral-900 text-sm">{sourceItem.name}</span>
            <span className="text-xs text-neutral-400 text-center">{sourceItem.note}</span>
          </div>
        ))}
      </div>
    </FlowStep>

    <FlowConnector />

    <FlowStep
      number="02"
      kicker="You decide"
      title="Hold fiat, or hold USDT."
      body="Convert between them at a quoted rate and keep the balance in whichever one suits your exposure."
    >
      <div className="bg-neutral-50 rounded-2xl p-5 text-left">
        <p className="text-sm text-neutral-500 mb-1">Total wallet balance</p>
        <p className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">~R 1,529,602.25</p>

        <div className="h-2 w-full rounded-full bg-primary-200 overflow-hidden mb-5">
          <div className="h-full w-[46.7%] rounded-full bg-primary-800" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 flex items-center gap-3">
            <img src="/za-flag.svg" alt="" width={32} height={32} className="w-8 h-8 shrink-0 !mx-0" />
            <div>
              <p className="font-semibold text-neutral-900 text-sm">R714,602.25</p>
              <p className="text-xs text-neutral-500">ZAR wallet</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 flex items-center gap-3">
            <img src="/usdt-badge.svg" alt="" width={32} height={32} className="w-8 h-8 shrink-0 !mx-0" />
            <div>
              <p className="font-semibold text-neutral-900 text-sm">50,000.00 USDT</p>
              <p className="text-xs text-neutral-500">USDT wallet</p>
            </div>
          </div>
        </div>
      </div>
    </FlowStep>

    <FlowConnector />

    <FlowStep
      number="03"
      kicker="Money leaves"
      title="Pay out, or withdraw."
      body="Fund customer payouts from the same balance, or withdraw to your bank account or your own wallet."
    >
      <div className="grid grid-cols-2 gap-3 text-left">
        <div className="bg-neutral-50 rounded-2xl p-5 flex flex-col">
          <div className="h-10 flex items-center mb-4">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
              <Landmark className="w-5 h-5 text-primary-600" />
            </div>
          </div>
          <h4 className="font-semibold text-neutral-900 text-sm mb-1.5">To your bank</h4>
          <p className="text-sm text-neutral-500 leading-relaxed mb-4">
            Fiat withdrawal, next business day.
          </p>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-primary-500 mt-auto">
            <span>ZAR</span>
            <span className="text-neutral-300">·</span>
            <span>KES</span>
            <span className="text-neutral-300">·</span>
            <span>NGN</span>
          </div>
        </div>

        <div className="bg-neutral-50 rounded-2xl p-5 flex flex-col">
          <div className="h-10 flex items-center mb-4">
            <img src="/usdt-badge.svg" alt="" width={40} height={40} className="w-10 h-10 !mx-0" />
          </div>
          <h4 className="font-semibold text-neutral-900 text-sm mb-1.5">To your own wallet</h4>
          <p className="text-sm text-neutral-500 leading-relaxed mb-4">
            On-chain withdrawal, same day.
          </p>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-primary-500 mt-auto">
            <span>USDT</span>
          </div>
        </div>
      </div>
    </FlowStep>
  </>
)

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [activeFlow, setActiveFlow] = useState<FlowId>('pay-in')

  // Left/right arrows move between tabs, which is what a tablist is expected to do.
  const handleFlowKeys = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = e.key === 'ArrowRight'
      ? (index + 1) % FLOWS.length
      : (index - 1 + FLOWS.length) % FLOWS.length
    setActiveFlow(FLOWS[next].id)
    document.getElementById(`flow-tab-${FLOWS[next].id}`)?.focus()
  }


  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning fast",
      description: "Near-instant payment verification with advanced crypto payment technology"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Bank-grade security",
      description: "FSCA regulated and FIC compliant with enterprise-level security protocols"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multi-currency support",
      description: "Accept Bitcoin, Ethereum, USDT, USDC, BNB and more"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Stablecoin settlement",
      description: "Automatic conversion to stablecoins and settlement in ZAR, KES, or NGN to eliminate volatility risk"
    }
  ]

  const stats = [
    { number: "100,000+", label: "Transactions processed" },
    { number: "$ Millions", label: "Volume processed (since 2024)" },
    { number: "99.99%", label: "Uptime" },
    { number: "24/7", label: "Customer support" }
  ]

  const testimonials = [
    {
      name: "Rael Demby",
      role: "CEO",
      company: "Scoin",
      content: "We have tried various methods of accepting Cryptocurrency, but Ezeebit's integration and back-end support has been fantastic. Ezeebit opens up a huge opportunity for retailers around Southern Africa. This is the future.",
      rating: 5,
      logo: "/scoin-logo.webp"
    },
    {
      name: "Adam Woolf",
      role: "Owner",
      company: "The Watch Channel",
      content: "Partnering with Ezeebit has transformed our payment solutions at The Watch Channel. Their advanced cryptocurrency payment system offers our customers a seamless, secure way to pay with their preferred cryptocurrencies, enhancing their shopping experience.",
      rating: 5,
      logo: "/watchchannel-logo(latest).png"
    },
    {
      name: "Kokona",
      role: "Co-founder",
      company: "Usurpa",
      content: "Pioneering into the Web3 space, partnering with Ezeebit has enabled us to accept stablecoin and cryptocurrency payments easily without any problems whatsoever. We strongly believe our partnership with Ezeebit will allow access to all Africans. Thanks to the team for this amazing opportunity.",
      rating: 5,
      logo: "/usurpa-logo.webp"
    }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <>
      <SEO
        title="Crypto Payment Solutions for African Merchants"
        description="Accept Bitcoin, Ethereum, and stablecoins at your store. FSCA regulated, instant ZAR, KES, and NGN settlement, and 100,000+ transactions processed. Join 150+ merchants across South Africa."
        canonicalUrl="/"
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Ezeebit",
          "url": "https://ezeebit.com",
          "logo": "https://ezeebit.com/ezeebit_black.png",
          "description": "Leading crypto payment solutions for African merchants. Accept Bitcoin, Ethereum, and stablecoins with instant settlement in ZAR, KES, or NGN.",
          "foundingDate": "2023",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Cape Town",
            "addressCountry": "ZA"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+27-21-879-5074",
            "contactType": "customer service",
            "email": "support@ezeebit.com",
            "availableLanguage": "English"
          },
          "sameAs": [
            "https://www.linkedin.com/company/ezeebit"
          ]
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Ezeebit",
          "image": "https://ezeebit.com/ezeebit_black.png",
          "telephone": "+27-21-879-5074",
          "email": "support@ezeebit.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Cape Town",
            "addressRegion": "Western Cape",
            "addressCountry": "ZA"
          },
          "priceRange": "$$",
          "openingHours": "Mo-Fr 08:00-18:00"
        })}
      </script>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="overflow-hidden -mt-20"
      >

      <section className="relative min-h-[60vh] flex items-center gradient-bg pt-40">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left lg:col-span-3"
            >
              <h1 className="text-4xl lg:text-[3.5rem] font-display font-bold text-neutral-900 mb-6 leading-none lg:leading-[1.15]">
                Grow your business, reach new customers.
                <br />
                <span className="text-primary-500">
                  Accept stablecoin and crypto payments.
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Accept crypto and stablecoin payments in-store and online. Ezeebit handles the checkout, hedging, and compliance — you get settled in stablecoin or local currency (ZAR, KES, NGN) the next business day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
                <a
                  href="https://merchant.ezeebit.com/#/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 flex items-center justify-center"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Get Started Free
                </a>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-neutral-500 -mt-4 pb-6">
                <div className="flex items-center gap-1.5">
                  <ThumbsUp className="w-4 h-4 text-secondary-500" />
                  No setup fees
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-secondary-500" />
                  FSCA regulated
                </div>
                <div className="flex items-center gap-1.5">
                  <Headphones className="w-4 h-4 text-secondary-500" />
                  24/7 support
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:col-span-3"
            >
              <div className="relative z-10">
                <img
                  src="/merchant-portal.png"
                  alt="Ezeebit Merchant Portal"
                  className="rounded-2xl shadow-xl w-full max-w-[32rem] lg:max-w-[43rem] xl:max-w-[50rem] scale-110 origin-center"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-2xl transform rotate-3 scale-110 -z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-2xl transform rotate-3 scale-110 translate-x-2 -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center px-2 py-4"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-500 mb-1 lg:mb-2">
                  {stat.number}
                </div>
                <div className="text-neutral-600 text-xs sm:text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-20 bg-white overflow-hidden">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">Our partners</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Trusted by leading brands across South Africa and beyond.
            </p>
          </motion.div>

          <div className="mb-2 md:mb-8 partner-carousel-container">
            <PartnerCarousel
              partners={[
                { name: 'iStore', logo: '/istore-logo(final).png', scale: 1.06 },
                { name: 'Skins', logo: '/skins-logo.png' },
                { name: 'Le Creuset', logo: '/le-creuset-logo(final).png', scale: 1.475 },
                { name: 'Amiri', logo: '/amiri-logo(latest).png', mobileScale: 0.95 },
                { name: 'Court Order', logo: '/courtorder-logo(latest).png', scale: 0.75 },
                { name: 'Ritual', logo: '/ritual-logo(latest).png', scale: 1.15 },
                { name: 'Hydraulics', logo: '/hydraulics-logo(latest).png', scale: 1.15 },
                { name: 'Al Capone', logo: '/alcapone-logo(final).png', scale: 1.15 },
                { name: 'Scoin', logo: '/scoin-logo(latest).png' },
                { name: 'Soul Gallery', logo: '/soul-gallery-logo(final).png', scale: 0.8, mobileScale: 0.69 },
                { name: 'Sunbet', logo: '/sunbet-logo.png' }
              ]}
              direction="left"
              speed={40}
            />
          </div>

          <div className="partner-carousel-container">
            <PartnerCarousel
              partners={[
                { name: 'Yawa', logo: '/yawa-logo(final).png', scale: 0.9, mobileScale: 1.089 },
                { name: 'Tintswalo Lodge', logo: '/tintswalo-logo(latest).png', scale: 1.32, mobileScale: 1.2245 },
                { name: 'Luxity', logo: '/luxity-logo(latest).png', mobileScale: 0.8 },
                { name: 'Story', logo: '/story-logo(latest).png', mobileScale: 0.95 },
                { name: 'Spar', logo: '/spar-logo(latest).png', mobileScale: 0.8 },
                { name: 'Cultish', logo: '/cultish-logo(latest).png', scale: 1.6, mobileScale: 1.32 },
                { name: 'Watch Channel', logo: '/watch-channel-logo(final).png', mobileScale: 1.05 },
                { name: 'Diesel', logo: '/diesel-logo(final).png', scale: 0.806, mobileScale: 0.772 },
                { name: 'Sumptuous Tours', logo: '/sumptuous-tours-logo.png', scale: 1.5 },
                { name: 'BHH', logo: '/bhh-logo.png' }
              ]}
              direction="right"
              speed={40}
            />
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-20 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-10 lg:mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">Why choose Ezeebit?</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Built for African merchants who want to embrace the future of payments without compromising on security or simplicity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card px-5 py-4 text-center hover:scale-[1.03] transition-transform"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-2 text-primary-500">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works — one flow per product area ── */}
      <section className="pt-8 pb-16 lg:pt-12 lg:pb-24 bg-neutral-50/60">
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 text-center">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-8 lg:mb-10"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              How it works
            </h2>
            <p className="text-neutral-500 text-lg leading-relaxed">
              Money in, money held, money out. Pick a flow to see the steps.
            </p>
          </motion.div>

          {/* ── Flow switcher ── */}
          <div className="mb-10 lg:mb-14 flex justify-center">
            <div
              role="tablist"
              aria-label="How money moves through Ezeebit"
              className="inline-flex items-center gap-1 p-1 rounded-full bg-white border border-neutral-200/80 shadow-sm max-w-full overflow-x-auto"
            >
              {FLOWS.map((flow, index) => (
                <button
                  key={flow.id}
                  role="tab"
                  id={`flow-tab-${flow.id}`}
                  aria-selected={activeFlow === flow.id}
                  aria-controls={`flow-panel-${flow.id}`}
                  tabIndex={activeFlow === flow.id ? 0 : -1}
                  onClick={() => setActiveFlow(flow.id)}
                  onKeyDown={(e) => handleFlowKeys(e, index)}
                  className={`whitespace-nowrap rounded-full px-4 sm:px-6 py-2.5 text-sm font-semibold transition-colors ${
                    activeFlow === flow.id
                      ? 'bg-primary-500 text-white'
                      : 'text-neutral-600 hover:text-primary-600'
                  }`}
                >
                  {flow.label}
                </button>
              ))}
            </div>
          </div>

          {/*
            Every panel stays mounted and is toggled with `hidden`, so the
            pre-render writes all three flows into the static HTML rather than
            only whichever one happens to be selected.
          */}

          {/* ── Pay in ── */}
          <div
            role="tabpanel"
            id="flow-panel-pay-in"
            aria-labelledby="flow-tab-pay-in"
            hidden={activeFlow !== 'pay-in'}
          >
            {/* ── Step 01 — Customer Pays ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border border-neutral-200/80 rounded-3xl shadow-sm"
            >
              <div className="p-6 sm:p-10">
                <div className="flex items-center justify-center gap-3 mb-7">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-50 text-xs font-semibold text-primary-600 shrink-0">
                    01
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                    Customer Pays
                  </span>
                </div>

                <h3 className="text-2xl lg:text-[1.75rem] font-bold text-neutral-900 mb-3">
                  Any wallet.
                </h3>
                <p className="text-neutral-500 leading-relaxed mb-8">
                  Your customers pay from whichever wallet they already use — no new app, no extra steps.
                </p>

                {/* Direct on-chain + WalletConnect */}
                <div className="grid grid-cols-2 gap-3 mb-3 text-left">
                  <div className="bg-neutral-50 rounded-2xl p-5">
                    <div className="relative mb-5" style={{ width: 80, height: 58 }}>
                      {[
                        { t: 'usdc', left: 0,  top: 0,  z: 1 },
                        { t: 'bnb',  left: 24, top: 0,  z: 2 },
                        { t: 'btc',  left: 0,  top: 26, z: 4 },
                        { t: 'eth',  left: 24, top: 26, z: 5 },
                        { t: 'usdt', left: 48, top: 26, z: 6 },
                      ].map(({ t, left, top, z }) => (
                        <div
                          key={t}
                          className="absolute w-8 h-8 rounded-full overflow-hidden bg-white border-2 border-neutral-100 shadow-sm"
                          style={{ left, top, zIndex: z }}
                        >
                          <img src={`/${t}-logo.svg`} alt={t} className="w-full h-full object-contain" />
                        </div>
                      ))}
                      <div
                        className="absolute w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-500 border-2 border-neutral-100"
                        style={{ left: 48, top: 0, zIndex: 3 }}
                      >
                        +
                      </div>
                    </div>
                    <h4 className="font-semibold text-neutral-900 text-sm mb-1.5">Direct on-chain</h4>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      Pay from any wallet compatible with our supported networks — sent directly on-chain
                    </p>
                  </div>

                  <div className="bg-neutral-50 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-5 h-[58px]">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white flex items-center justify-center p-1.5 shadow-sm shrink-0">
                        <img src="/walletconnect-logo.svg" alt="WalletConnect" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <div className="text-lg sm:text-2xl font-bold text-primary-500 leading-none mb-0.5">700+</div>
                        <div className="text-[10px] sm:text-xs text-neutral-400">compatible wallets</div>
                      </div>
                    </div>
                    <h4 className="font-semibold text-neutral-900 text-sm mb-1.5">WalletConnect</h4>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      Connect any WalletConnect-compatible wallet in seconds with a simple QR scan
                    </p>
                  </div>
                </div>

                {/* Luno / VALR / Binance */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: 'Luno', logo: '/luno_logo (clean).png' },
                    { name: 'VALR', logo: '/valr_logo (clean).png' },
                    { name: 'Binance', logo: '/Binance-Logo (clean).png' },
                  ].map((w) => (
                    <div key={w.name} className="bg-neutral-50 rounded-2xl p-5 flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white flex items-center justify-center p-2 shadow-sm">
                        <img src={w.logo} alt={w.name} className="w-full h-full object-contain" />
                      </div>
                      <span className="font-semibold text-neutral-900 text-sm">{w.name}</span>
                      <span className="text-xs text-neutral-400">Direct integration</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Flow connector ── */}
            <div className="flex justify-center py-6 sm:py-8">
              <div className="relative overflow-hidden rounded-full" style={{ width: 3, height: 96 }}>
                <div className="absolute inset-0 bg-neutral-200/50" />
                <motion.div
                  className="absolute left-0 right-0"
                  style={{
                    height: 38,
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(0,116,227,0.45) 55%, #0074E3 100%)',
                  }}
                  animate={{ y: [-38, 96] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 0.35,
                    ease: 'linear',
                  }}
                />
              </div>
            </div>

            {/* ── Step 02 — Ezeebit Converts ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border border-neutral-200/80 rounded-3xl shadow-sm"
            >
              <div className="p-6 sm:p-10">
                <div className="flex items-center justify-center gap-3 mb-7">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-50 text-xs font-semibold text-primary-600 shrink-0">
                    02
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                    Ezeebit Converts
                  </span>
                </div>

                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center overflow-hidden shadow-sm">
                    <img src="/ezeebit-icon-blue.png" alt="Ezeebit" className="w-14 h-14 object-contain" />
                  </div>
                </div>

                <h3 className="text-2xl lg:text-[1.75rem] font-bold text-neutral-900 mb-3">
                  We handle the conversion.
                </h3>
                <p className="text-neutral-500 leading-relaxed mb-8">
                  Your customer's crypto is automatically converted at a locked rate at the moment of payment.
                  You never hold volatile assets — Ezeebit hedges everything instantly.
                </p>

                <div className="bg-neutral-50 rounded-2xl p-1 divide-y divide-neutral-100 text-left">
                  {[
                    { icon: <Zap className="w-4 h-4" />, label: 'Rate locked in < 1 second', desc: 'no slippage, no exposure window between payment and settlement' },
                    { icon: <Shield className="w-4 h-4" />, label: 'Hedged at point of payment', desc: 'you receive the settled value, not the market value of the crypto' },
                    { icon: <Lock className="w-4 h-4" />, label: 'No overnight crypto positions', desc: 'all conversions are closed before settlement is issued' },
                  ].map((f) => (
                    <div key={f.label} className="flex items-start gap-4 p-4">
                      <div className="w-9 h-9 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 shrink-0">
                        {f.icon}
                      </div>
                      <p className="text-sm text-neutral-600 leading-relaxed pt-1">
                        <span className="font-semibold text-neutral-900">{f.label}</span>
                        {' '}—{' '}{f.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Flow connector ── */}
            <div className="flex justify-center py-6 sm:py-8">
              <div className="relative overflow-hidden rounded-full" style={{ width: 3, height: 96 }}>
                <div className="absolute inset-0 bg-neutral-200/50" />
                <motion.div
                  className="absolute left-0 right-0"
                  style={{
                    height: 38,
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(0,116,227,0.45) 55%, #0074E3 100%)',
                  }}
                  animate={{ y: [-38, 96] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 0.35,
                    ease: 'linear',
                  }}
                />
              </div>
            </div>

            {/* ── Step 03 — Merchant Receives ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border border-neutral-200/80 rounded-3xl shadow-sm"
            >
              <div className="p-6 sm:p-10">
                <div className="flex items-center justify-center gap-3 mb-7">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-50 text-xs font-semibold text-primary-600 shrink-0">
                    03
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                    Merchant Receives
                  </span>
                </div>

                <h3 className="text-2xl lg:text-[1.75rem] font-bold text-neutral-900 mb-3">
                  Settled in your currency.
                </h3>
                <p className="text-neutral-500 leading-relaxed mb-8">
                  No volatility. No chargebacks. Choose between fiat and stablecoin settlement — or both.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-3 text-left">
                  <div className="bg-neutral-50 rounded-2xl p-5 flex flex-col">
                    <div className="h-10 flex items-center mb-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                        <Landmark className="w-5 h-5 text-primary-600" />
                      </div>
                    </div>
                    <h4 className="font-semibold text-neutral-900 text-sm mb-1.5">Fiat settlement</h4>
                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                      Next-day funds direct to your bank account. T+1 settlement.
                    </p>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-primary-500 mt-auto">
                      <span>ZAR</span>
                      <span className="text-neutral-300">·</span>
                      <span>KES</span>
                      <span className="text-neutral-300">·</span>
                      <span>NGN</span>
                    </div>
                  </div>

                  <div className="bg-neutral-50 rounded-2xl p-5 flex flex-col">
                    <div className="h-10 flex items-center gap-1 mb-4">
                      <img src="/usdt-logo.svg" alt="USDT" className="w-10 h-10 object-contain" />
                      <img src="/usdc-logo.svg" alt="USDC" className="w-10 h-10 object-contain -ml-1" />
                    </div>
                    <h4 className="font-semibold text-neutral-900 text-sm mb-1.5">Stablecoin settlement</h4>
                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                      Hold or transfer in stablecoin. Instant, borderless.
                    </p>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-primary-500 mt-auto">
                      <span>USDT</span>
                      <span className="text-neutral-300">·</span>
                      <span>USDC</span>
                    </div>
                  </div>
                </div>

                {/* Zero exposure card */}
                <div className="bg-neutral-50 rounded-2xl p-5 flex items-start gap-4 text-left">
                  <div className="w-9 h-9 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 text-sm mb-1.5">
                      Zero crypto exposure for your business
                    </h4>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      Your business never holds or touches crypto. Every payment is hedged the moment it lands — volatility stays with us, settlement arrives with you.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Pay out ── */}
          <div
            role="tabpanel"
            id="flow-panel-pay-out"
            aria-labelledby="flow-tab-pay-out"
            hidden={activeFlow !== 'pay-out'}
          >
            <PayOutFlow />
          </div>

          {/* ── Hold & convert ── */}
          <div
            role="tabpanel"
            id="flow-panel-hold"
            aria-labelledby="flow-tab-hold"
            hidden={activeFlow !== 'hold'}
          >
            <HoldFlow />
          </div>

          {/* OTC is a desk, not a self-serve flow, so it sits beside the tabs */}
          <p className="mt-10 lg:mt-14 text-neutral-500">
            Moving large volumes?{' '}
            <Link to="/otc" className="font-semibold text-primary-600 hover:text-primary-700">
              Talk to our OTC desk →
            </Link>
          </p>

        </div>
      </section>


      <section className="py-10 lg:py-20 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-8 lg:mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">Enterprise-grade security</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Built with the highest security standards to protect your business and your customers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: <Shield className="w-8 h-8 text-primary-500" />,
                title: "FSCA regulated",
                description: "FSCA regulated and FIC compliant, with full KYC/KYB, AML/CFT, and POPIA processes handled end to end by Ezeebit."
              },
              {
                icon: <Lock className="w-8 h-8 text-primary-500" />,
                title: "MPC wallet technology",
                description: "Multi-party computation (MPC) eliminates single points of failure by distributing key management across multiple parties, keeping funds secure.",
                badge: "SOC 2 Certified"
              },
              {
                icon: <Zap className="w-8 h-8 text-primary-500" />,
                title: "No chargebacks",
                description: "Blockchain payments are final and irreversible — every sale stays settled, with rates locked and hedged at the point of payment."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="card p-6 text-center relative"
              >
                {item.badge && (
                  <div className="absolute -top-3 -right-3 bg-primary-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {item.badge}
                  </div>
                )}
                <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-8 lg:mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">Backed by world-class investors</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Supported by leading global funds and industry veterans who share our belief in building the future of payments in Africa
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest text-center mb-6">
                Lead Investors
              </p>
              <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
                <a
                  href="https://foundercollective.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/founder_collective_logo.png"
                    alt="Founder Collective"
                    className="h-8 md:h-10 w-auto object-contain"
                  />
                </a>
                <a
                  href="https://rabacap.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/Raba_logo.webp"
                    alt="Raba Partnership"
                    className="h-7 md:h-9 w-auto object-contain"
                  />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="border-t border-neutral-200 pt-10 mb-12"
            >
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest text-center mb-6">
                Strategic Investors
              </p>
              <div className="flex justify-center items-center">
                <a
                  href="https://dcg.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/digital-currency-group-logo-nobg.png"
                    alt="Digital Currency Group"
                    className="h-14 md:h-[70px] w-auto object-contain"
                  />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="border-t border-neutral-200 pt-10"
            >
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest text-center mb-8">
                Angel Investors
              </p>
              <div className="max-w-2xl mx-auto">
                <div className="grid grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
                  {[
                    { name: 'Terry Angelos', note: 'ex-Visa', image: '/terry-image-nobg.png', linkedin: 'https://www.linkedin.com/in/tangelos' },
                    { name: 'Anton Katz', note: 'Talos', image: '/anton_image-nobg.png', linkedin: 'https://www.linkedin.com/in/katzanton' },
                    { name: 'David|de Picciotto', note: 'ex-Revolut', image: '/david_image-nobg.png', linkedin: 'https://www.linkedin.com/in/david-de-picciotto' }
                  ].map((investor, index) => (
                    <motion.div
                      key={investor.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="text-center"
                    >
                      <a
                        href={investor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100 hover:ring-4 hover:ring-primary-200 transition-all"
                        aria-label={`${investor.name.replace('|', ' ')} LinkedIn profile`}
                      >
                        <img
                          src={investor.image}
                          alt={investor.name.replace('|', ' ')}
                          className="w-full h-full object-cover"
                        />
                      </a>
                      <p className="text-sm font-medium text-neutral-700 leading-tight">
                        {investor.name.includes('|')
                          ? investor.name.split('|').map((part, i) => (
                              <span key={i}>
                                {part}
                                {i < investor.name.split('|').length - 1 && <br />}
                              </span>
                            ))
                          : investor.name.split(' ').map((part, i) => (
                              <span key={i}>
                                {part}
                                {i < investor.name.split(' ').length - 1 && <br />}
                              </span>
                            ))
                        }
                      </p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">{investor.note}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-6 md:gap-8 max-w-md mx-auto">
                  {[
                    { name: 'Nadir Khamissa', note: 'Hello Group', image: '/nadir_image-nobg.png', linkedin: 'https://www.linkedin.com/in/nadir-khamissa' },
                    { name: 'Chris Harmse', note: 'BVNK', image: '/chris_image-nobg.png', linkedin: 'https://www.linkedin.com/in/chrisharmse' }
                  ].map((investor, index) => (
                    <motion.div
                      key={investor.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + (index + 3) * 0.05 }}
                      className="text-center"
                    >
                      <a
                        href={investor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100 hover:ring-4 hover:ring-primary-200 transition-all"
                        aria-label={`${investor.name} LinkedIn profile`}
                      >
                        <img
                          src={investor.image}
                          alt={investor.name}
                          className="w-full h-full object-cover"
                        />
                      </a>
                      <p className="text-sm font-medium text-neutral-700 leading-tight">
                        {investor.name.split(' ').map((part, i) => (
                          <span key={i}>
                            {part}
                            {i < investor.name.split(' ').length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">{investor.note}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-neutral-200 rounded-full shadow-xs">
                <Shield className="w-5 h-5 text-secondary-600" />
                <span className="text-sm font-medium text-neutral-700">
                  Trusted by industry leaders and backed by experienced investors
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-20 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-8 lg:mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">Trusted by merchants across Africa</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Join hundreds of businesses already accepting stablecoin and crypto payments with confidence.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <div className="relative overflow-hidden group">
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center text-neutral-600 hover:text-primary-500 transition-all duration-200 opacity-0 group-hover:opacity-100"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center text-neutral-600 hover:text-primary-500 transition-all duration-200 opacity-0 group-hover:opacity-100"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <motion.div
                key={currentTestimonial}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="card p-8 text-center min-h-[400px] flex flex-col justify-between shadow-xl"
              >
                <div className="flex items-center justify-center mb-6 flex-shrink-0">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-warning-400 fill-current" />
                  ))}
                </div>
                <p className="text-lg text-neutral-600 mb-8 italic flex-grow flex items-center justify-center leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </p>
                <div className="flex items-center justify-center flex-shrink-0">
                  <div className="w-32 h-32 mr-4">
                    <img
                      src={testimonials[currentTestimonial].logo}
                      alt={testimonials[currentTestimonial].company}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900 text-lg">{testimonials[currentTestimonial].name}</div>
                    <div className="text-neutral-500">{testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  index === currentTestimonial ? 'bg-primary-500 w-6' : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-20 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
              Ready to accept stablecoin and crypto payments?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto opacity-90">
              Join the future of payments today. Get started in minutes with no setup fees and full regulatory compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://merchant.ezeebit.com/#/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-600 hover:bg-neutral-100 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </a>
              <Link
                to="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                Talk to Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      </motion.div>
    </>
  )
}

export default Home
