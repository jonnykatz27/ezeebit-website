import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Wallet, ArrowLeftRight, Landmark,
  Receipt, ShieldCheck, Database, ArrowDownToLine, ArrowUpFromLine, RefreshCw
} from 'lucide-react'
import SEO from '../components/SEO'

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
      description: "Move between local currency and stablecoin at a quoted rate, and hold the balance in whichever one suits your exposure. Settle in ZAR, KES, or NGN."
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
      title: "Held under a CASP licence",
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
        title="Business Wallets for Fiat and Stablecoin"
        description="Hold fiat and USDT balances with Ezeebit, convert between them, fund customer payouts, and withdraw to your bank or your own wallet. Settle in ZAR, KES, or NGN, with a full ledger, API access, and an FSCA-regulated CASP behind it."
        keywords="business stablecoin wallet, USDT wallet for business, fiat to stablecoin conversion, ZAR KES NGN settlement, merchant wallet Africa, crypto treasury, stablecoin balance, business crypto withdrawal, CASP regulated wallet"
        canonicalUrl="/wallets"
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FinancialService",
          "name": "Ezeebit Wallets",
          "url": "https://ezeebit.com/wallets",
          "description": "Business wallets holding fiat and USDT balances, with conversion between them, payout funding, bank and on-chain withdrawals, and a full ledger.",
          "serviceType": "Business wallet and settlement balances",
          "areaServed": ["ZA", "KE", "NG"],
          "currenciesAccepted": ["ZAR", "KES", "NGN", "USDT"],
          "provider": {
            "@type": "Organization",
            "name": "Ezeebit",
            "url": "https://ezeebit.com"
          }
        })}
      </script>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="overflow-hidden -mt-20"
      >
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center gradient-bg pt-40">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
          <div className="container-custom relative z-10">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto text-center"
              >
                <h1 className="text-5xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
                  <span itemProp="name">Your money, in <span className="text-gradient">fiat or stablecoin</span></span>
                </h1>
                <p className="text-xl text-neutral-600 mb-8" itemProp="description">
                  Hold fiat and USDT in one place, convert between them when it suits you,
                  fund your customer payouts from the same balance, and withdraw to your bank
                  or your own wallet.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
                  <a
                    href="https://merchant.ezeebit.com/#/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center justify-center"
                  >
                    Sign Up
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                  <Link
                    to="/developers"
                    className="btn-secondary flex items-center justify-center"
                  >
                    View the API
                  </Link>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Balances card */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
                Your balances at a glance
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Both wallets, what they come to together, and the three things you do most,
                on the first screen of the Merchant Portal.
              </p>
            </motion.div>

            <motion.figure
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white rounded-xl shadow-lg border border-neutral-100 overflow-hidden">
                <div className="p-6 sm:p-8">
                  {/* Total + legend */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-5">
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">Total wallet balance</p>
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span className="text-2xl sm:text-3xl font-bold text-neutral-900">~R 1,529,602.25</span>
                        <span className="text-xs font-medium text-green-700 bg-green-50 rounded px-1.5 py-0.5">
                          +5.2%
                        </span>
                        <span className="text-xs text-neutral-500">vs last month</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-neutral-700">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-primary-800"></span>
                        ZAR wallet
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-primary-200"></span>
                        USDT wallet
                      </span>
                    </div>
                  </div>

                  {/* Split bar */}
                  <div className="h-2 w-full rounded-full bg-primary-200 overflow-hidden mb-8">
                    <div className="h-full w-[46.7%] rounded-full bg-primary-800"></div>
                  </div>

                  {/* The two wallets */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                      <img src="/za-flag.svg" alt="" width={40} height={40} className="w-10 h-10 flex-shrink-0 !mx-0" />
                      <div>
                        <p className="text-lg font-semibold text-neutral-900">R714,602.25</p>
                        <p className="text-sm text-neutral-500">ZAR wallet</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <img src="/usdt-badge.svg" alt="" width={40} height={40} className="w-10 h-10 flex-shrink-0 !mx-0" />
                      <div>
                        <p className="text-lg font-semibold text-neutral-900">50,000.00 USDT</p>
                        <p className="text-sm text-neutral-500">USDT wallet</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-neutral-100 px-6 sm:px-8 py-4">
                  <div className="flex items-center gap-4 sm:gap-8 text-primary-600 font-medium">
                    <span className="flex items-center gap-2">
                      <ArrowDownToLine className="w-4 h-4" />
                      Deposit
                    </span>
                    <span className="w-px h-5 bg-neutral-200" aria-hidden="true"></span>
                    <span className="flex items-center gap-2">
                      <ArrowUpFromLine className="w-4 h-4" />
                      Withdraw
                    </span>
                    <span className="w-px h-5 bg-neutral-200" aria-hidden="true"></span>
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4" />
                      Convert
                    </span>
                  </div>
                </div>
              </div>
              <figcaption className="sr-only">
                The Merchant Portal dashboard, showing an estimated total wallet balance split
                between a ZAR wallet and a USDT wallet, with deposit, withdraw and convert actions.
              </figcaption>
            </motion.figure>
          </div>
        </section>

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
                  className="card p-6 hover:scale-105 transition-transform"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 text-primary-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600">
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
        <section className="section-padding bg-primary-600 text-white">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
                Open your wallets
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Sign up and your fiat and USDT wallets are ready from your first transaction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://merchant.ezeebit.com/#/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-primary-600 hover:bg-neutral-100 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  Sign Up
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
