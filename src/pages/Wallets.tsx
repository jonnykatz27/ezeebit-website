import { motion } from '../lib/motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Wallet, ArrowLeftRight, Landmark,
  Receipt, ShieldCheck, Database
} from 'lucide-react'
import SEO from '../components/SEO'
import FaqBlock from '../components/FaqBlock'
import PageHero, { HERO_PRIMARY, HERO_SECONDARY } from '../components/hero/PageHero'
import WalletsHeroVisual from '../components/hero/WalletsHeroVisual'
import DarkBackdrop from '../components/DarkBackdrop'

/** The questions this page answers, shown above the closing section and emitted as FAQPage data. */
const walletFaqs = [
  { question: "What can I hold in my Ezeebit wallets?", answer: "Fiat and USDT, each in its own wallet, with USDC coming soon." },
  { question: "Can I convert between fiat and USDT?", answer: "Yes, at a quoted rate that is shown before you convert." },
  { question: "How do I withdraw?", answer: "Fiat goes to your bank account, and USDT goes to your own wallet." },
  { question: "Can I fund payouts from my wallets?", answer: "Yes. What you take in funds what you pay out, so pay-ins and payouts run through the same wallets." },
  { question: "How are funds kept safe?", answer: "Crypto sits in MPC wallets where every key is split, so no single person can move funds. Ezeebit is regulated by the FSCA as a Crypto Asset Service Provider, FSP No. 53664." },
]

const Wallets = () => {
  const features = [
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "One account, both directions",
      description: "Money you take in funds the money you pay out. Pay-ins and payouts run through the same wallets instead of sitting in separate systems."
    },
    {
      icon: <ArrowLeftRight className="w-6 h-6" />,
      title: "Convert between fiat and USDT",
      description: "Move between local currency and stablecoin at a quoted rate, and hold the balance in whichever one suits your exposure. Settle in ZAR, KES, NGN or USD."
    },
    {
      icon: <Landmark className="w-6 h-6" />,
      title: "Withdraw to bank or chain",
      description: "Send fiat to your bank account or USDT to your own wallet. Fiat and stablecoin both settle the same day."
    },
    {
      icon: <Receipt className="w-6 h-6" />,
      title: "A ledger that reconciles",
      description: "Every movement is a line item with a reference and a timestamp, so your finance team can tie the balance back to source."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Available over the API",
      description: "Read balances, quote conversions, and trigger withdrawals programmatically, or do all of it from the Merchant Portal."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Regulated by the FSCA",
      description: "Ezeebit holds your balances as a Crypto Asset Service Provider regulated by the FSCA, FSP No. 53664, with FIC and POPIA obligations built in."
    }
  ]

  const steps = [
    {
      number: "01",
      title: "Take payments in",
      description: "In-store, online, and OTC settlement all land in your Ezeebit wallets, hedged on arrival so you carry no volatility."
    },
    {
      number: "02",
      title: "Hold or convert",
      description: "Keep the balance in fiat or USDT and convert between them whenever the rate or your obligations call for it."
    },
    {
      number: "03",
      title: "Pay out or withdraw",
      description: "Fund customer payouts from the same wallets, or withdraw to your bank account or your own wallet."
    }
  ]

  return (
    <>
      <SEO
        title="Business wallets for fiat and stablecoin"
        description="Hold fiat and USDT with Ezeebit, convert between them at a quoted rate, fund payouts, and withdraw to your bank account or your own wallet."
        canonicalUrl="/wallets"
        crumbs={[{ name: 'Wallets', path: '/wallets' }]}
        service={{ name: 'Business wallets', serviceType: 'Business crypto and fiat wallets' }}
        faqs={walletFaqs}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="overflow-hidden -mt-20"
      >
        {/* Hero Section */}
        <PageHero
          kicker="Wallets"
          title="Your money,"
          accent="in fiat or stablecoin."
          description="Hold fiat and USDT in one place, convert between them when it suits you, fund your customer payouts from the same wallets, and withdraw to your bank or your own wallet."
          actions={
            <>
            <a href="https://merchant.ezeebit.com/#/signup" target="_blank" rel="noopener noreferrer" className={HERO_PRIMARY}>
              Get started free
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            <Link to="/developers" className={HERO_SECONDARY}>
              View the API
            </Link>
            </>
          }
          visual={<WalletsHeroVisual />}
          itemProps
        />

        {/* Features Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="section-head"
            >
              <h2 className="section-title">
                The account underneath everything
              </h2>
              <p className="section-lead">
                Wallets are where your pay-ins land and where your payouts are funded from,
                in the currency you choose to hold.
              </p>
            </motion.div>

            <div className="feature-grid feature-grid-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card feature-card"
                >
                  <div className="bg-neutral-950 rounded-xl flex items-center justify-center text-primary-400 [&_svg]:w-5 [&_svg]:h-5 lg:[&_svg]:w-6 lg:[&_svg]:h-6">
                    {feature.icon}
                  </div>
                  <h3 className="feature-title">
                    {feature.title}
                  </h3>
                  <p className="feature-text">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="section-head"
            >
              <h2 className="section-title">
                How it works
              </h2>
              <p className="section-lead">
                Money in, held how you want it, money out.
              </p>
            </motion.div>

            <div className="feature-grid md:grid-cols-3">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="card step-card h-full">
                    <div className="font-display font-bold text-gradient">
                      {step.number}
                    </div>
                    <h3 className="feature-title">
                      {step.title}
                    </h3>
                    <p className="feature-text">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <FaqBlock heading="Wallets: frequently asked questions" items={walletFaqs} tone="white" />


        {/* CTA Section */}
        <section className="section-padding relative overflow-hidden bg-neutral-950 text-white">
          <DarkBackdrop glow="left" />
          <div className="relative container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
                Open your wallets
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto text-neutral-300">
                Sign up and your fiat and USDT wallets are ready from your first transaction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://merchant.ezeebit.com/#/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={HERO_PRIMARY}
                >
                  Sign up
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  )
}

export default Wallets
