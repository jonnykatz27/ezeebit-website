import { motion } from '../lib/motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, ArrowDownLeft, ArrowUpRight, SlidersHorizontal, ShieldCheck,
  UserCheck, Zap, RefreshCw, Wallet, Ban, Lock
} from 'lucide-react'
import SEO from '../components/SEO'
import {
  PillarsSection, PayinsSection, DepositSection, PayoutSection, CaseStudiesSection,
  type Feature, type Step,
} from '../components/PayFlowSections'
import { CASE_STUDIES } from '../lib/caseStudies'
import PageHero, { HERO_PRIMARY, HERO_SECONDARY } from '../components/hero/PageHero'
import PlatformsHeroVisual from '../components/hero/PlatformsHeroVisual'
import DarkBackdrop from '../components/DarkBackdrop'

const Platforms = () => {
  const pillars: Feature[] = [
    {
      icon: ArrowDownLeft,
      title: "Accept crypto without holding it",
      body: "Users pay in crypto or stablecoin. Every payment is hedged the moment it lands, so you are credited a fixed amount and never carry the asset."
    },
    {
      icon: ArrowUpRight,
      title: "Pay out in stablecoin without holding it",
      body: "Fund payouts from your fiat balance. We reserve the amount, convert it and send the stablecoin to your user's wallet."
    },
    {
      icon: SlidersHorizontal,
      title: "Choose your exposure",
      body: "Settle in stablecoin the same day, or in ZAR, KES, NGN or USD the next business day. How much crypto you hold is up to you."
    },
    {
      icon: ShieldCheck,
      title: "We handle the rest",
      body: "Compliance, volatility and the movement of funds are on us. Ezeebit is regulated by the FSCA as a Crypto Asset Service Provider and handles KYC and AML, the Travel Rule, address screening, hedging and on-chain settlement."
    }
  ]

  const payinFeatures: Feature[] = [
    {
      icon: UserCheck,
      title: "Attributed to the right user",
      body: "Every deposit carries a reference tied to one account, so funds land on the right balance across many deposits, assets and networks at once."
    },
    {
      icon: Zap,
      title: "Credited in seconds",
      body: "We watch the chains, apply each network's confirmation rules, and send a signed webhook the moment a deposit is final."
    },
    {
      icon: RefreshCw,
      title: "Processed exactly once",
      body: "Under-payments, over-payments, late confirmations and retries are handled the same way every time and reconciled to one ledger."
    },
    {
      icon: Wallet,
      title: "Any wallet, any exchange",
      body: "On-chain from any wallet, 700+ wallets through WalletConnect, and straight from Luno, VALR and Binance."
    },
    {
      icon: Lock,
      title: "Rate locked when they pay",
      body: "The fiat value is fixed the moment the user pays, so the amount you credit never moves with the market."
    },
    {
      icon: Ban,
      title: "Final, with no chargebacks",
      body: "A confirmed crypto deposit cannot be reversed, so there is no chargeback or deposit-reversal fraud to fight."
    }
  ]

  const payinSteps: Step[] = [
    {
      title: "Request a deposit",
      body: "Your platform creates an order for the user through the API and sends them to the checkout link it returns."
    },
    {
      title: "The user pays their way",
      body: "On-chain from any wallet, through WalletConnect, or from Luno, VALR or Binance. The rate is locked when they pay."
    },
    {
      title: "Credit the balance",
      body: "Once the deposit is final we post a signed webhook, and you credit the user's balance in real time."
    },
    {
      title: "Get settled",
      body: "T+0 in stablecoin, or T+1 in ZAR, KES, NGN or USD to your bank account."
    }
  ]

  const payoutSteps: Step[] = [
    {
      title: "Create the payout",
      body: "Call the Payout Gateway with the amount in your currency. We reserve it against your fiat balance and return a link."
    },
    {
      title: "Your user completes it",
      body: "They pick the network and enter their own wallet address, so you never collect or check addresses."
    },
    {
      title: "We convert and send",
      body: "We screen the address, convert at the quoted rate and send the stablecoin on-chain, usually within minutes."
    },
    {
      title: "You reconcile",
      body: "A signed webhook confirms the final status and the transaction hash."
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
        description="Accept crypto deposits and pay users in stablecoin. Ezeebit is live in South Africa, Kenya and Nigeria, with more African markets to follow."
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
          kicker="Platforms"
          title="Pay-ins and payouts"
          accent="for your platform."
          description="Take deposits in crypto and pay your users out in stablecoin, without holding either. Ezeebit handles the compliance, the volatility and the movement of funds, and you choose your exposure: settle in stablecoin, or in ZAR, KES, NGN or USD."
          actions={
            <>
            <Link to="/book-a-call" className={HERO_PRIMARY}>
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

        <PillarsSection
          title="Crypto in and out, without having to hold it"
          intro="Ezeebit sits between your platform and the blockchain. Your users pay and get paid in crypto; you keep a clean ledger in the currency you choose."
          items={pillars}
        />

        <PayinsSection
          title="A deposit is not a checkout"
          intro="The person paying is the account holder, so every deposit has to reach the right balance, in real time, against a ledger you and your regulator can audit."
          items={payinFeatures}
        />

        <DepositSection
          intro="One API call, one checkout link, one signed webhook back. Integrations take days, not months."
          steps={payinSteps}
        />

        <PayoutSection
          title="Pay users out in stablecoin"
          intro="Send winnings, withdrawals and seller balances as stablecoin, funded from your fiat balance. You never buy, hold or move the stablecoin yourself."
          steps={payoutSteps}
        />

        <CaseStudiesSection
          title="Live with leading platforms"
          intro="Regulated operators already run their crypto on Ezeebit."
          studies={CASE_STUDIES}
        />

        {/* Who it's for */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="section-head"
            >
              <h2 className="section-title">
                For any platform that moves user balances
              </h2>
              <p className="section-lead">
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
        <section className="section-padding relative overflow-hidden bg-neutral-950 text-white">
          <DarkBackdrop glow="left" />
          <div className="relative container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
                Add crypto pay-ins and payouts to your platform
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto text-neutral-300">
                Tell us about your platform and we will scope the integration with you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/book-a-call"
                  className={HERO_PRIMARY}
                >
                  Talk to the team
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </Link>
                <Link
                  to="/developers"
                  className={HERO_SECONDARY}
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

export default Platforms
