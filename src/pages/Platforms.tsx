import { motion } from '../lib/motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, ArrowDownLeft, ArrowUpRight, SlidersHorizontal, ShieldCheck,
  UserCheck, Zap, RefreshCw, Wallet, Ban, Lock, CheckCircle
} from 'lucide-react'
import SEO from '../components/SEO'
import FlowDemo from '../components/demo/FlowDemo'
import PageHero, { HERO_PRIMARY, HERO_SECONDARY } from '../components/hero/PageHero'
import PlatformsHeroVisual from '../components/hero/PlatformsHeroVisual'

/**
 * Platforms live on Ezeebit, each with a story we are allowed to tell. Add
 * one here as it is announced; the section lays out one or many.
 */
const caseStudies = [
  {
    name: 'Sunbet',
    logo: '/sunbet-logo.png',
    image: '/sunbet-launch-cover@2x.png',
    sector: 'iGaming',
    summary: 'Sunbet, part of JSE-listed Sun International, is one of the first online gaming platforms in South Africa to accept crypto deposits. Players fund their accounts straight from the wallet or exchange their money already sits in.',
    points: [
      'Deposits on-chain from any wallet, or from inside Luno, VALR and Binance',
      'Each deposit attributed to the right player and credited in seconds',
      'Hedged at the moment of payment, so Sunbet never holds crypto price risk',
    ],
    href: '/blog/crypto-deposits-igaming-sunbet',
  },
]

/** Small caps line above a section heading, naming which way the money moves. */
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600 mb-3">{children}</p>
)

const Platforms = () => {
  const pillars = [
    {
      icon: <ArrowDownLeft className="w-6 h-6" />,
      title: "Accept crypto without holding it",
      description: "Users pay in crypto or stablecoin. Every payment is hedged the moment it lands, so you are credited a fixed amount and never carry the asset."
    },
    {
      icon: <ArrowUpRight className="w-6 h-6" />,
      title: "Pay out in stablecoin without holding it",
      description: "Fund payouts from your fiat balance. We reserve the amount, convert it and send the stablecoin to your user's wallet."
    },
    {
      icon: <SlidersHorizontal className="w-6 h-6" />,
      title: "Choose your exposure",
      description: "Settle in stablecoin the same day, or in ZAR, KES, NGN or USD the next business day. How much crypto you hold is up to you."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "We handle the rest",
      description: "Compliance, volatility and the movement of funds are on us, as an FSCA-regulated CASP: KYC and AML, the Travel Rule, address screening, hedging and on-chain settlement."
    }
  ]

  const payinFeatures = [
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Attributed to the right user",
      description: "Every deposit carries a reference tied to one account, so funds land on the right balance across many deposits, assets and networks at once."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Credited in seconds",
      description: "We watch the chains, apply each network's confirmation rules, and send a signed webhook the moment a deposit is final."
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Processed exactly once",
      description: "Under-payments, over-payments, late confirmations and retries are handled the same way every time and reconciled to one ledger."
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Any wallet, any exchange",
      description: "On-chain from any wallet, 700+ wallets through WalletConnect, and straight from Luno, VALR and Binance."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Rate locked when they pay",
      description: "The fiat value is fixed the moment the user pays, so the amount you credit never moves with the market."
    },
    {
      icon: <Ban className="w-6 h-6" />,
      title: "Final, with no chargebacks",
      description: "A confirmed crypto deposit cannot be reversed, so there is no chargeback or deposit-reversal fraud to fight."
    }
  ]

  const payinSteps = [
    {
      title: "Request a deposit",
      description: "Your platform creates an order for the user through the API and sends them to the checkout link it returns."
    },
    {
      title: "The user pays their way",
      description: "On-chain from any wallet, through WalletConnect, or from Luno, VALR or Binance. The rate is locked when they pay."
    },
    {
      title: "Credit the balance",
      description: "Once the deposit is final we post a signed webhook, and you credit the user's balance in real time."
    },
    {
      title: "Get settled",
      description: "T+0 in stablecoin, or T+1 in ZAR, KES, NGN or USD to your bank account."
    }
  ]

  const payoutSteps = [
    {
      title: "Create the payout",
      description: "Call the Payout Gateway with the amount in your currency. We reserve it against your fiat balance and return a link."
    },
    {
      title: "Your user completes it",
      description: "They pick the stablecoin and network and enter their own wallet address, so you never collect or check addresses."
    },
    {
      title: "We convert and send",
      description: "We screen the address, convert at the quoted rate and send the stablecoin on-chain, usually within minutes."
    },
    {
      title: "You reconcile",
      description: "A signed webhook confirms the final status and the transaction hash."
    }
  ]

  const audiences = [
    {
      title: "Gaming and betting",
      description: "Players deposit in seconds and withdraw winnings in stablecoin, with no chargebacks on the way in."
    },
    {
      title: "Trading and investment",
      description: "Traders top up margin from stablecoins they already hold and withdraw profits the same way, instead of waiting on cards or wires."
    },
    {
      title: "Payment gateways",
      description: "Offer crypto pay-ins and stablecoin payouts to your own merchants. Onboard them as sub-merchants through the API, each with its own stores, fees and transaction history."
    },
    {
      title: "Wallets and neobanks",
      description: "Make crypto a first-class way to top up and to cash out, for the users who keep their money on-chain."
    }
  ]

  return (
    <>
      <SEO
        title="Crypto pay-ins and payouts for platforms"
        description="Accept crypto deposits and pay users in stablecoin. Settlement can be in stablecoin or in ZAR, KES, NGN or USD."
        canonicalUrl="/platforms"
        ogImage="/og-platforms.jpg"
        crumbs={[{ name: 'Platforms', path: '/platforms' }]}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="overflow-hidden -mt-20"
      >
        {/* Hero Section */}
        <PageHero
          title="Pay-ins and payouts"
          accent="for your platform."
          description="Take deposits in crypto and pay your users out in stablecoin, without holding either. Ezeebit handles the compliance, the volatility and the movement of funds, and you choose your exposure: settle in stablecoin, or in ZAR, KES, NGN or USD."
          actions={
            <>
            <Link to="/contact" className={HERO_PRIMARY}>
              Talk to the team
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link to="/developers" className={HERO_SECONDARY}>
              View the API
            </Link>
            </>
          }
          visual={<PlatformsHeroVisual />}
          itemProps
        />

        {/* Without holding it */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
                Crypto in and out, without having to hold it
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Ezeebit sits between your platform and the blockchain. Your users pay and get paid
                in crypto; you keep a clean ledger in the currency you choose.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-6 h-full"
                >
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4 text-primary-500">
                    {pillar.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pay-ins */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <Eyebrow>Pay-ins</Eyebrow>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
                A deposit is not a checkout
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                The person paying is the account holder, so every deposit has to reach the right
                balance, in real time, against a ledger you and your regulator can audit.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {payinFeatures.map((feature, index) => (
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

        {/* How a deposit works */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
                  How a deposit works
                </h2>
                <p className="text-xl text-neutral-600 mb-8">
                  One API call, one checkout link, one signed webhook back. Integrations take days, not months.
                </p>
                <Steps steps={payinSteps} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="w-full max-w-[380px] mx-auto"
              >
                {/* The checkout itself, rather than a picture of it */}
                <FlowDemo
                  src="/demos/pay-in.html"
                  flow="payin"
                  label="Try a deposit"
                  title="Interactive demo of the Ezeebit checkout a user deposits through"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Payouts */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1 w-full max-w-[380px] mx-auto"
              >
                <FlowDemo
                  src="/demos/pay-out.html"
                  flow="payout"
                  label="Try a payout"
                  title="Interactive demo of an Ezeebit payout a user claims"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <Eyebrow>Payouts</Eyebrow>
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
                  Pay users out in stablecoin
                </h2>
                <p className="text-xl text-neutral-600 mb-8">
                  Send winnings, withdrawals and seller balances as stablecoin, funded from your fiat
                  balance. You never buy, hold or move the stablecoin yourself.
                </p>
                <Steps steps={payoutSteps} />
                <Link to="/payouts" className="inline-flex items-center font-semibold text-primary-600 hover:text-primary-700 mt-8">
                  More on Payouts
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Case studies */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
                Live with leading platforms
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Regulated operators already run their crypto on Ezeebit.
              </p>
            </motion.div>

            <div className="space-y-8 max-w-6xl mx-auto">
              {caseStudies.map((study) => (
                <motion.article
                  key={study.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="card overflow-hidden grid grid-cols-1 lg:grid-cols-5"
                >
                  {/* The cover carries its own headline, so it is shown whole on its navy, never cropped */}
                  <Link to={study.href} className="lg:col-span-3 flex items-center bg-[#091221]">
                    <img
                      src={study.image}
                      alt={`${study.name} accepting crypto deposits through Ezeebit`}
                      className="w-full h-auto !mx-0"
                      loading="lazy"
                    />
                  </Link>
                  <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-5">
                      <img src={study.logo} alt={study.name} className="h-10 w-auto !mx-0" />
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-600 bg-primary-50 rounded-full px-3 py-1">
                        {study.sector}
                      </span>
                    </div>
                    <p className="text-lg text-neutral-700 mb-6">{study.summary}</p>
                    <ul className="space-y-3 mb-8">
                      {study.points.map((point) => (
                        <li key={point} className="flex gap-3 text-neutral-600">
                          <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <Link to={study.href} className="inline-flex items-center font-semibold text-primary-600 hover:text-primary-700">
                      Read how it was built
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
                For any platform that moves user balances
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Wherever money goes into an account and comes back out, the same rails apply.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {audiences.map((audience, index) => (
                <motion.div
                  key={audience.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-8 h-full"
                >
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    {audience.title}
                  </h3>
                  <p className="text-neutral-600">
                    {audience.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary-600 text-white">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
                Add crypto pay-ins and payouts to your platform
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Tell us about your platform and we will scope the integration with you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-white text-primary-600 hover:bg-neutral-100 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  Talk to the team
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </Link>
                <Link
                  to="/developers"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center"
                >
                  View the API
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  )
}

/**
 * A numbered list of what happens, in order. Always left-aligned: on phones
 * the site centres two-column sections, which pulled the text away from its
 * numbers.
 */
const Steps = ({ steps }: { steps: { title: string; description: string }[] }) => (
  <ol className="space-y-6 text-left">
    {steps.map((step, index) => (
      <li key={step.title} className="flex gap-4">
        <span className="w-9 h-9 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold flex items-center justify-center flex-shrink-0">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-1">{step.title}</h3>
          <p className="text-neutral-600">{step.description}</p>
        </div>
      </li>
    ))}
  </ol>
)

export default Platforms
