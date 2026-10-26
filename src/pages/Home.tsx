import { useState, useEffect, useRef, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Zap, Shield, Globe, TrendingUp,
  ArrowRight, Star, ChevronLeft, ChevronRight,
  ThumbsUp, Headphones, Lock, Landmark, Link2, Wallet, Send, Store, ArrowLeftRight,
  ArrowDownToLine
} from 'lucide-react'
import PartnerCarousel from '../components/PartnerCarousel'
import SEO from '../components/SEO'
import FlowDemo, { DemoPanel } from '../components/demo/FlowDemo'
import PageHero, { HERO_PRIMARY, HERO_SECONDARY } from '../components/hero/PageHero'
import HomeHeroVisual from '../components/hero/HomeHeroVisual'
import { PortalBalanceCard, PortalConvertCard, PORTAL_PAGE_BG } from '../components/portal/PortalUI'
import DarkBackdrop from '../components/DarkBackdrop'

const FLOWS = [
  { id: 'pay-in', label: 'Pay in' },
  { id: 'pay-out', label: 'Pay out' },
  { id: 'hold', label: 'Hold & convert' },
] as const

type FlowId = (typeof FLOWS)[number]['id']

/**
 * How far each logo in a group tucks under the one before it. Important, so
 * it wins over the !mx-0 each logo carries against the site-wide phone rule
 * that centres images.
 */
const OVERLAP = '!-ml-2.5'
/**
 * Every digital-asset mark is drawn the same way, wherever it appears: a white
 * ring, then a faint outline, so marks with white in them (like Nigeria's flag)
 * keep their edge on a white card and stay distinct where they overlap.
 */
const ASSET_CHIP = 'relative w-9 h-9 rounded-full bg-white ring-2 ring-white shadow-[0_0_0_3px_rgba(9,30,66,0.1)] object-contain !mx-0'

/** Overlapping coin logos that pop in one after another. */
const CoinStack = ({ coins }: { coins: string[] }) => (
  <div className="flex items-center">
    {coins.map((coin, i) => (
      <motion.img
        key={coin}
        src={`/${coin}-logo.svg`}
        alt={coin.toUpperCase()}
        variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1 } }}
        className={`${ASSET_CHIP} ${i > 0 ? OVERLAP : ''}`}
        style={{ zIndex: coins.length - i }}
      />
    ))}
  </div>
)

/** The three settlement currencies, overlapping. */
const FlagStack = () => (
  <div className="flex items-center">
    {['za', 'ke', 'ng'].map((c, i) => (
      <motion.img
        key={c}
        src={`/${c}-flag.svg`}
        alt=""
        variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1 } }}
        className={`relative w-9 h-9 rounded-full ring-2 ring-white shadow-[0_0_0_3px_rgba(9,30,66,0.1)] !mx-0 ${i > 0 ? OVERLAP : ''}`}
        style={{ zIndex: 3 - i }}
      />
    ))}
  </div>
)

/**
 * The rail between two stacked steps, with a blue head running down it. Each
 * one starts later than the last, so the pulse reads top to bottom. On wider
 * screens it lines up under the column of step visuals.
 */
const StepConnector = ({ still, index }: { still: boolean; index: number }) => (
  <div aria-hidden="true" className="flex justify-center sm:justify-start sm:pl-[115px] lg:pl-[139px] py-2">
    <div className="relative overflow-hidden rounded-full bg-neutral-200/60 w-[3px] h-7">
      {!still && (
        <motion.div
          className="absolute left-0 right-0"
          style={{ height: 16, background: 'linear-gradient(to bottom, transparent, var(--color-primary-500))' }}
          animate={{ y: [-16, 28] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1.4, delay: index * 0.75, ease: 'linear' }}
        />
      )}
    </div>
  </div>
)

const flowSteps = (still: boolean): Record<FlowId, { title: string; body: string; visual: React.ReactNode }[]> => ({
  'pay-in': [
    {
      title: 'Your customer pays',
      body: 'From whichever wallet or exchange they already use. Nothing new to download.',
      visual: <CoinStack coins={['btc', 'eth', 'usdt', 'usdc', 'bnb']} />,
    },
    {
      title: 'We lock the rate',
      body: 'The amount is fixed and hedged the moment they pay, so its value cannot move.',
      visual: <img src="/ezeebit-icon-blue.png" alt="Ezeebit" className="w-11 h-11 object-contain !mx-0" />,
    },
    {
      title: 'You get settled',
      body: 'Fiat in your bank the next business day — ZAR, KES, NGN or USD — or stablecoin the same day.',
      visual: (
        <div className="flex items-center gap-2.5">
          <FlagStack />
          <span className="text-xs font-medium text-neutral-400">or</span>
          <div className="flex items-center">
            <img src="/usdt-logo.svg" alt="USDT" className={ASSET_CHIP} />
            <img src="/usdc-logo.svg" alt="USDC" className={`${ASSET_CHIP} ${OVERLAP}`} />
          </div>
        </div>
      ),
    },
  ],
  'pay-out': [
    {
      title: 'You start the payout',
      body: 'Send us the amount and your own reference. We hold the funds aside.',
      visual: (
        <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-full pl-3 pr-2 py-1.5 shadow-sm">
          <span className="text-sm font-semibold text-neutral-900">R2,000.00</span>
          <span className="w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center">
            <Send className="w-3 h-3" />
          </span>
        </div>
      ),
    },
    {
      title: 'They claim it',
      body: 'Your customer opens a link and enters their own wallet address.',
      visual: (
        <div className="flex items-center gap-2">
          <span className="w-10 h-10 rounded-xl bg-neutral-950 text-primary-400 flex items-center justify-center shrink-0">
            <Link2 className="w-5 h-5" />
          </span>
          <span className="font-mono text-xs text-neutral-500 bg-white border border-neutral-200 rounded-lg px-2 py-1">
            0x7Ab2…c21F
          </span>
        </div>
      ),
    },
    {
      title: 'It lands in minutes',
      body: 'Stablecoin arrives, and you get a confirmation to match against your records.',
      visual: (
        <img src="/usdt-logo.svg" alt="USDT" className={ASSET_CHIP} />
      ),
    },
  ],
  'hold': [
    {
      title: 'Everything lands together',
      body: 'In-store, online, OTC and direct deposits all land in the same balance.',
      visual: (
        <div className="flex items-center gap-1.5">
          {[
            <Store key="s" className="w-4 h-4" />,
            <Globe key="g" className="w-4 h-4" />,
            <TrendingUp key="t" className="w-4 h-4" />,
            <ArrowDownToLine key="d" className="w-4 h-4" />,
          ].map((icon, i) => (
            <motion.span
              key={i}
              variants={{ hidden: { opacity: 0, x: -6 }, visible: { opacity: 1, x: 0 } }}
              className="w-8 h-8 rounded-lg bg-white border border-neutral-200 text-primary-600 flex items-center justify-center shadow-sm"
            >
              {icon}
            </motion.span>
          ))}
        </div>
      ),
    },
    {
      title: 'Hold it how you like',
      body: 'Keep fiat or stablecoin, and switch between them whenever it suits you.',
      visual: (
        <div className="flex items-center gap-2">
          <FlagStack />
          <motion.span
            className="text-primary-500"
            animate={still ? undefined : { rotate: 180 }}
            transition={{ duration: 2.2, repeat: Infinity, repeatType: 'reverse', repeatDelay: 1.6, ease: 'easeInOut' }}
          >
            <ArrowLeftRight className="w-4 h-4" />
          </motion.span>
          <img src="/usdt-logo.svg" alt="USDT" className={ASSET_CHIP} />
        </div>
      ),
    },
    {
      title: 'Move it when you need',
      body: 'Fund payouts, or withdraw to your bank account or your own wallet.',
      visual: (
        <div className="flex items-center gap-2">
          <span className="w-10 h-10 rounded-xl bg-neutral-950 text-primary-400 flex items-center justify-center">
            <Landmark className="w-5 h-5" />
          </span>
          <span className="w-10 h-10 rounded-xl bg-neutral-950 text-primary-400 flex items-center justify-center">
            <Wallet className="w-5 h-5" />
          </span>
        </div>
      ),
    },
  ],
})

/**
 * A live, clickable copy of a flow, served from /public/demos. Each demo lays
 * out at 640px and scales itself to the frame, then posts its new height up
 * whenever the screen changes, so the frame grows with it instead of scrolling
 * inside the page.
 */
/**
 * Each demo's own natural height at full width, used until it reports its own.
 * The iframe is sized from this rather than left to collapse, so a message
 * that never arrives cannot break the layout.
 */
/**
 * Renders its children at a fixed design width and scales them down to whatever
 * width it actually gets, reporting the scaled height so the box does not keep
 * the unscaled one. The same trick the demo iframes use on themselves, so the
 * portal view can sit at the same size as they do without the shared portal
 * components being resized for every other page that uses them.
 */
const ScaleToFit = ({ design, children }: { design: number; children: React.ReactNode }) => {
  const box = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [fit, setFit] = useState<{ scale: number; height?: number }>({ scale: 1 })

  useEffect(() => {
    const b = box.current
    const i = inner.current
    if (!b || !i) return
    const measure = () => {
      const scale = Math.min(1, b.clientWidth / design)
      setFit({ scale, height: i.offsetHeight * scale })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(b)
    ro.observe(i)
    return () => ro.disconnect()
  }, [design])

  return (
    <div ref={box} style={{ height: fit.height }}>
      <div
        ref={inner}
        style={{ width: design, transform: `scale(${fit.scale})`, transformOrigin: 'top left' }}
      >
        {children}
      </div>
    </div>
  )
}

type FlowDemoSpec = {
  node: React.ReactNode
  /** Where to read more, shown under the steps. */
  links: { label: string; to: string }[]
}

const FLOW_DEMOS: Record<FlowId, FlowDemoSpec> = {
  'pay-in': {
    node: <FlowDemo src="/demos/pay-in.html" flow="payin" label="Try it" fill title="Interactive demo of the Ezeebit in-store checkout" />,
    links: [{ label: 'In-store payments', to: '/in-store' }, { label: 'Online checkout', to: '/online' }],
  },
  'pay-out': {
    node: <FlowDemo src="/demos/pay-out.html" flow="payout" label="Try it" fill title="Interactive demo of an Ezeebit payout" />,
    links: [{ label: 'Payouts', to: '/payouts' }],
  },
  'hold': {
    // The portal's own page background, so the cards sit as they do in the product
    node: (
      <DemoPanel label="Merchant Portal">
      <ScaleToFit design={430}>
      <div className={`rounded-[20px] ${PORTAL_PAGE_BG} p-3 space-y-3`}>
        <div className="rounded-[12px] border border-neutral-200/70 overflow-hidden">
          <PortalBalanceCard
            total="R 1,637,102.25"
            fiatShare={43.65}
            fiat={{ mark: '/za-flag.svg', amount: 'R714,602.25' }}
            stable={{ amount: '$50,000.00' }}
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
    ),
    links: [{ label: 'Wallets', to: '/wallets' }],
  },
}

/**
 * One flow: its three steps stacked on the left, and the product itself beside
 * them, so the explanation and the thing it explains are read together. On
 * wide screens the step cards stretch to the demo's height, so both columns
 * start and end together however tall the current demo screen is.
 */
const FlowCards = ({ flow, isActive }: { flow: FlowId; isActive: boolean }) => {
  const still = useReducedMotion() ?? false
  const steps = flowSteps(still)[flow]
  const demo = FLOW_DEMOS[flow]
  const rise = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.06 } },
  }

  return (
    <motion.div
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
      className="text-left"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 lg:gap-14 items-start lg:items-stretch">
        {/* The steps are the whole column, so the last one finishes level with
            the demo rather than stopping short of it. */}
        <ol className="flex flex-col">
          {steps.map((step, index) => (
            <Fragment key={step.title}>
              <motion.li
                variants={rise}
                className="lg:flex-1 bg-white border border-neutral-200/80 rounded-2xl shadow-sm p-5 lg:p-7 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 lg:gap-6 text-center sm:text-left"
              >
                <div className="sm:w-48 lg:w-56 shrink-0 h-12 flex items-center justify-center lg:scale-[1.15]">{step.visual}</div>
                <div className="min-w-0">
                  {/* The same large number as the steps on the Wallets page */}
                  <div className="text-3xl lg:text-4xl font-display font-bold text-gradient leading-none mb-3">
                    <span className="sr-only">Step </span>0{index + 1}
                  </div>
                  <h3 className="text-lg lg:text-xl font-semibold text-neutral-900 mb-1 lg:mb-1.5">{step.title}</h3>
                  <p className="text-sm lg:text-[15px] text-neutral-500 leading-relaxed">{step.body}</p>
                </div>
              </motion.li>
              {index < steps.length - 1 && <StepConnector still={still} index={index} />}
            </Fragment>
          ))}
        </ol>

        {/* The product itself, beside the steps that describe it */}
        <motion.div variants={rise} className="w-full max-w-[360px] mx-auto lg:mx-0 flex flex-col">
          <div className="flex-1">
            {demo.node}
          </div>
        </motion.div>
      </div>

      {/*
        Somewhere to go next. It sits under the grid rather than inside the
        steps column, where it used to take the height the last card needed to
        finish level with the demo.
      */}
      <motion.div variants={rise} className="mt-6 flex flex-wrap items-center justify-center sm:justify-start gap-3">
        <span className="text-sm text-neutral-500">Read more:</span>
        {demo.links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="inline-flex items-center gap-1.5 rounded-full bg-neutral-950 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-950/85 transition-colors"
          >
            {l.label}
            <ArrowRight className="w-4 h-4" />
          </Link>
        ))}
      </motion.div>
    </motion.div>
  )
}

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
      icon: <Wallet className="w-6 h-6" />,
      title: "Any wallet, both directions",
      description: "Any wallet on-chain, plus Binance Pay, Luno Pay, VALR Pay and 700+ via WalletConnect Pay."
    },
    {
      icon: <ArrowLeftRight className="w-6 h-6" />,
      title: "One balance behind it all",
      description: "Money in funds money out. Hold it in fiat or stablecoin and convert whenever."
    },
    {
      icon: <Landmark className="w-6 h-6" />,
      title: "Settlement on your terms",
      description: "Fiat next business day in ZAR, KES, NGN or USD. Stablecoin same day. Payouts in minutes."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Your funds, held safely",
      description: "MPC custody splits the keys, so no one person can move your money. FSCA-regulated, FSP No. 53664."
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
        title="Crypto Payment Solutions for African Businesses"
        description="Accept crypto and stablecoins in-store and online, pay your customers out in minutes, and hold your balance in fiat or stablecoin. FSCA regulated, with settlement in ZAR, KES, NGN or USD."
        canonicalUrl="/"
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Ezeebit",
          "url": "https://ezeebit.com",
          "logo": "https://ezeebit.com/ezeebit_black.png",
          "description": "Leading crypto payment solutions for African businesses. Accept Bitcoin, Ethereum, and stablecoins with instant settlement in ZAR, KES, NGN or USD.",
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

      <PageHero
        title="Stablecoin payments,"
        accent="in and out."
        description="Accept crypto and stablecoins in-store and online, pay your customers out in minutes, and hold your balance in fiat or stablecoin. One regulated account, settled in ZAR, KES, NGN or USD."
        actions={
          <>
            <a href="https://merchant.ezeebit.com/#/signup" target="_blank" rel="noopener noreferrer" className={HERO_PRIMARY}>
              Get started free
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            {/* A button, not a #hash link: the router scrolls to the top on hash changes */}
            <button
              type="button"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className={HERO_SECONDARY}
            >
              See how it works
            </button>
          </>
        }
        trust={[
          { icon: <ThumbsUp />, label: 'No setup fees' },
          { icon: <Shield />, label: 'FSCA regulated' },
          { icon: <Headphones />, label: '24/7 support' },
        ]}
        visual={<HomeHeroVisual />}
        bleedVisual
      />

      {/*
        The dark opening: the proof of scale on the hero's own Near Black, set
        off by a hairline, so hero and stats read as one block. Everything
        after it is light, apart from the security section and the closing
        panel.
      */}
      <section className="relative bg-neutral-950 pb-14 lg:pb-24">
        <div className="container-custom relative">
          <div className="border-t border-white/10 pt-12 lg:pt-16 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center px-2 py-4"
              >
                {/*
                  The page's one oversized number. Sized so the longest,
                  "$ Millions", still fits its column: two up on phones and
                  tablets, four up from lg, full size only from xl.
                */}
                <div className="text-4xl sm:text-5xl xl:text-6xl font-display font-bold tracking-[-0.03em] leading-none text-primary-400 mb-3">
                  {stat.number}
                </div>
                <div className="text-neutral-400 text-xs sm:text-sm">{stat.label}</div>
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
              Trusted by leading brands across Africa.
            </p>
          </motion.div>

          <div className="mb-2 md:mb-8 partner-carousel-container">
            <PartnerCarousel
              partners={[
                { name: 'iStore', logo: '/istore-logo(final).png', scale: 1.06 },
                { name: 'Skins', logo: '/skins-logo.png' },
                { name: 'Le Creuset', logo: '/le-creuset-logo(final).png', scale: 1.475 },
                { name: 'Amiri', logo: '/amiri-logo(latest).png', mobileScale: 0.95 },
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
                { name: 'The Capital', logo: '/thecapital-logo.png', scale: 1.25 },
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

      <section className="py-10 lg:py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-10 lg:mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">Why choose Ezeebit?</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              One regulated account for money in, money held and money out — with the volatility hedged the moment it lands.
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
                <div className="w-12 h-12 bg-neutral-950 rounded-xl flex items-center justify-center mx-auto mb-2 text-primary-400">
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
      <section id="how-it-works" className="scroll-mt-20 pt-8 pb-16 lg:pt-12 lg:pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">

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
          <div className="mb-8 lg:mb-10 flex justify-center">
            <div
              role="tablist"
              aria-label="How money moves through Ezeebit"
              className="inline-flex items-center gap-1 p-1 rounded-full bg-neutral-950 max-w-full overflow-x-auto"
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
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {flow.label}
                </button>
              ))}
            </div>
          </div>

          {/*
            Every panel stays mounted and toggles with `hidden`, so the
            pre-render writes all three flows into the static HTML rather than
            only whichever one happens to be selected.
          */}
          {FLOWS.map((flow) => (
            <div
              key={flow.id}
              role="tabpanel"
              id={`flow-panel-${flow.id}`}
              aria-labelledby={`flow-tab-${flow.id}`}
              hidden={activeFlow !== flow.id}
            >
              <FlowCards flow={flow.id} isActive={activeFlow === flow.id} />
            </div>
          ))}

          {/* OTC is a desk, not a self-serve flow, so it sits beside the tabs */}
          <p className="mt-10 text-neutral-500">
            Moving large volumes?{' '}
            <Link to="/otc" className="font-semibold text-primary-600 hover:text-primary-700">
              Talk to our OTC desk{' '}→
            </Link>
          </p>

        </div>
      </section>


      <section className="py-10 lg:py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-400 mb-8">
              Backed by
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 lg:gap-x-20">
              {/*
                Heights are per logo. Two things pull against each other: DCG
                fills only 863x226 of its 900x500 canvas so it needs the most
                height, while Founder Collective is a long two-line lockup that
                grows wide fast, so it needs the least. Matched by eye on how
                large each reads, not on artwork height or cap height alone.
              */}
              {[
                { name: 'Founder Collective', logo: '/founder_collective_logo.png', size: 'h-6 lg:h-8' },
                { name: 'Raba Partnership', logo: '/Raba_logo.webp', size: 'h-6 lg:h-7' },
                { name: 'Digital Currency Group', logo: '/digital-currency-group-logo-nobg.png', size: 'h-10 lg:h-12' },
              ].map((backer) => (
                <img
                  key={backer.name}
                  src={backer.logo}
                  alt={backer.name}
                  loading="lazy"
                  className={`${backer.size} w-auto object-contain`}
                />
              ))}
            </div>

            <p className="mt-6 text-sm text-neutral-500">
              <Link to="/resources/about" className="inline-block py-2 font-semibold text-primary-600 hover:text-primary-700">
                Meet our investors and angels →
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 lg:py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-8 lg:mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">Trusted by businesses across Africa</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Join hundreds of businesses already moving money with stablecoin, in and out, with confidence.
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

          {/* The dots stay small; the padding around each one is what a thumb hits */}
          <div className="flex justify-center mt-5">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className="group px-1.5 py-3"
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-200 ${
                    index === currentTestimonial ? 'bg-primary-500 w-6' : 'w-2.5 bg-neutral-300 group-hover:bg-neutral-400'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/*
        The dark close, the bookend to the dark opening: security, the call to
        action and the footer run on as one Near Black block. Trust comes right
        before the ask.
      */}
      <section className="relative overflow-hidden bg-neutral-950 py-14 lg:py-24">
        <DarkBackdrop glow="left" />
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-8 lg:mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">Enterprise-grade security</h2>
            <p className="text-lg text-neutral-400 max-w-3xl mx-auto">
              Built with the highest security standards to protect your business and your customers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: <Shield className="w-8 h-8 text-primary-400" />,
                title: "FSCA regulated",
                description: "FSCA regulated and FIC compliant, with full KYC/KYB, AML/CFT, and POPIA processes handled end to end by Ezeebit."
              },
              {
                icon: <Lock className="w-8 h-8 text-primary-400" />,
                title: "MPC wallet technology",
                description: "Multi-party computation (MPC) eliminates single points of failure by distributing key management across multiple parties, keeping funds secure.",
                badge: "SOC 2 Certified"
              },
              {
                icon: <Zap className="w-8 h-8 text-primary-400" />,
                title: "No chargebacks",
                description: "Blockchain payments are final and irreversible — every sale stays settled, with rates locked and hedged at the point of payment."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                // Hairline panels rather than white cards: a white card would be a light patch in the dark moment
                className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center"
              >
                {item.badge && (
                  <div className="absolute -top-3 -right-3 bg-primary-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {item.badge}
                  </div>
                )}
                <div className="w-16 h-16 bg-primary-500/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-neutral-950 pb-14 lg:pb-24">
        <DarkBackdrop glow="right" />
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="border-t border-white/10 pt-12 lg:pt-16 text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
              Ready to accept stablecoin and crypto payments?
            </h2>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              Join the future of payments today. Get started in minutes with no setup fees and full regulatory compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://merchant.ezeebit.com/#/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-500 text-white hover:bg-primary-600 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </a>
              <Link
                to="/contact"
                className="border border-white/20 text-white hover:border-white/40 hover:bg-white/5 font-medium px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center"
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
