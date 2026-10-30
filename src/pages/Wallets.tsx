import { motion } from '../lib/motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Wallet, ArrowLeftRight, Landmark,
  Receipt, ShieldCheck, Database
} from 'lucide-react'
import SEO from '../components/SEO'
import PageHero, { HERO_PRIMARY, HERO_SECONDARY } from '../components/hero/PageHero'
import WalletsHeroVisual from '../components/hero/WalletsHeroVisual'
import DarkBackdrop from '../components/DarkBackdrop'

const Wallets = () => {
  const features = [
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "One balance, both directions",
      description: "Money you take in funds the money you pay out. Pay-ins and payouts draw on the same balance instead of sitting in separate systems."
    },
    {
      icon: <ArrowLeftRight className="w-6 h-6" />,
      title: "Convert between fiat and USDT",
      description: "Move between local currency and stablecoin at a quoted rate, and hold the balance in whichever one suits your exposure. Settle in ZAR, KES, NGN or USD."
    },
    {
      icon: <Landmark className="w-6 h-6" />,
      title: "Withdraw to bank or chain",
      description: "Send fiat to your bank account or USDT to your own wallet. Fiat settles the next business day, stablecoin settles same day."
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
      description: "Balances sit with an FSCA-regulated Crypto Asset Service Provider, FSP No. 53664, with FIC and POPIA obligations built in."
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
      description: "Fund customer payouts from the same balance, or withdraw to your bank account or your own wallet."
    }
  ]

  return (
    <>
      <SEO
        title="Business wallets for fiat and stablecoin"
        description="Business wallets for fiat and stablecoin. Ezeebit is live in South Africa, Kenya and Nigeria, with more African markets to follow."
        canonicalUrl="/wallets"
        crumbs={[{ name: 'Wallets', path: '/wallets' }]}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="overflow-hidden -mt-20"
      >
        {/* Hero Section */}
        <PageHero
          title="Your money,"
          accent="in fiat or stablecoin."
          description="Hold fiat and USDT in one place, convert between them when it suits you, fund your customer payouts from the same balance, and withdraw to your bank or your own wallet."
          actions={
            <>
            <a href="https://merchant.ezeebit.com/#/signup" target="_blank" rel="noopener noreferrer" className={HERO_PRIMARY}>
              Open a merchant account
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
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
                The account underneath everything
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Wallets are where your pay-ins land and where your payouts are funded from,
                in the currency you choose to hold.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        {/* How It Works */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
                How it works
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Money in, held how you want it, money out.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="card p-8 h-full">
                    <div className="text-4xl font-display font-bold text-gradient mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600">
                      {step.description}
                    </p>
                  </div>
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
                  className="bg-primary-500 text-white hover:bg-primary-600 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  Open a merchant account
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
