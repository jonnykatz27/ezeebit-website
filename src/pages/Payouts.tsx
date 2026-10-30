import { motion } from '../lib/motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Send, Globe, Clock, ShieldCheck,
  Webhook, Link2, CheckCircle
} from 'lucide-react'
import SEO from '../components/SEO'
import FaqBlock from '../components/FaqBlock'
import FlowDemo from '../components/demo/FlowDemo'
import { faqPageNode } from '../lib/faqSchema'
import PageHero, { HERO_PRIMARY, HERO_SECONDARY } from '../components/hero/PageHero'
import PayoutsHeroVisual from '../components/hero/PayoutsHeroVisual'
import DarkBackdrop from '../components/DarkBackdrop'

const payoutFaqs = [
  {
    question: 'What is a stablecoin payout?',
    answer: 'A payment from your platform to a user in a US-dollar stablecoin, sent to the user\'s own crypto wallet. You create the payout through the API from your fiat balance. The user opens a payout link carrying your brand, chooses the asset and network, and enters their wallet address. Ezeebit screens the address, converts the funds and sends them on-chain.',
  },
  {
    question: 'How fast do payouts arrive?',
    answer: 'Usually within minutes of the recipient submitting their wallet address. Ezeebit sends payouts 24/7, with no banking cut-offs on weekends or public holidays, although confirmation times vary by network. You receive an RSA-signed webhook on every status change, including the final status and transaction hash.',
  },
  {
    question: 'Do recipients need an Ezeebit account?',
    answer: 'No. Recipients don\'t need an Ezeebit account or app. They open the payout link in any mobile browser, choose the asset and network, and enter their own wallet address. They do need a crypto wallet that supports the asset and network they choose. The widget carries your brand.',
  },
]

const Payouts = () => {
  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Settled in minutes, not days",
      description: "Payouts clear on-chain around the clock. No cut-off times, no waiting for the next banking day, no weekend delays."
    },
    {
      icon: <Link2 className="w-6 h-6" />,
      title: "No wallet addresses to collect",
      description: "You send a link, not a transfer. Your customer chooses their asset and network and enters their own address, so a mistyped address is never your liability."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Pays anyone, anywhere",
      description: "Reach customers without a local bank account or across a border. A wallet is the only thing your recipient needs."
    },
    {
      icon: <Send className="w-6 h-6" />,
      title: "Funded from your fiat balance",
      description: "We reserve the fiat the moment the order is created, so the amount you owe is fixed before your customer ever opens the link."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Screened and compliant",
      description: "Every recipient address is screened before funds move. FSCA-regulated as a CASP, with Travel Rule and FIC obligations handled for you."
    },
    {
      icon: <Webhook className="w-6 h-6" />,
      title: "Signed webhooks on every change",
      description: "Each status change is posted to your endpoint with an RSA signature, so your ledger reconciles itself without polling."
    }
  ]

  const steps = [
    {
      number: "01",
      title: "Create the payout",
      description: "Call the Payout Gateway with the amount and your reference. We reserve the fiat against your balance and return a link."
    },
    {
      number: "02",
      title: "Your customer completes it",
      description: "They open the link, pick the asset and network they want, and enter their wallet address in our widget. You never handle their details."
    },
    {
      number: "03",
      title: "Funds land and you reconcile",
      description: "The transfer settles on-chain and we post a signed webhook with the final status and transaction hash."
    }
  ]

  const customerExperience = [
    {
      title: "Your brand, not ours",
      description: "The widget carries your name and colours. Ezeebit sits quietly underneath as the provider."
    },
    {
      title: "Live status, start to finish",
      description: "Each stage is ticked off as it happens, so nobody is left wondering whether the money is coming."
    },
    {
      title: "A reference they can quote",
      description: "Every payout carries an ID your support team can look up, alongside the amount and destination wallet."
    }
  ]

  const useCases = [
    {
      title: "Gaming and betting",
      description: "Pay winnings out the moment they are approved, instead of holding players over a weekend."
    },
    {
      title: "Marketplaces and platforms",
      description: "Settle sellers, drivers, and creators on your own schedule, including across borders."
    },
    {
      title: "Remittance and disbursement",
      description: "Reach recipients who have a phone and a wallet but no reliable access to a bank."
    }
  ]

  return (
    <>
      <SEO
        title="Stablecoin payouts"
        description="Pay customers from an Ezeebit balance in USDT or other crypto. Ezeebit is live in South Africa, Kenya and Nigeria, with more African markets to follow."
        canonicalUrl="/payouts"
        crumbs={[{ name: 'Payouts', path: '/payouts' }]}
        extraNodes={[faqPageNode('https://ezeebit.com/payouts#faq', payoutFaqs)]}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="overflow-hidden -mt-20"
      >
        {/* Hero Section */}
        <PageHero
          title="Pay your customers"
          accent="in stablecoin."
          description="Send payouts from your fiat balance without collecting a single wallet address. Your customer picks the asset and network, completes the payout themselves, and the funds settle on-chain in minutes. Ezeebit is live in South Africa, Kenya and Nigeria, with more African markets to follow."
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
          visual={<PayoutsHeroVisual />}
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
                Payouts without the bank rails
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Bank transfers are slow, expensive across borders, and closed on weekends.
                Stablecoin payouts are none of those things.
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
                One API call, one link, one signed webhook back.
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

        {/* What your customer sees */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1 w-full max-w-[380px] mx-auto"
              >
                {/* The widget itself, rather than a picture of it */}
                <FlowDemo
                  src="/demos/pay-out.html"
                  flow="payout"
                  label="Try it"
                  title="Interactive demo of an Ezeebit payout"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
                  What your customer sees
                </h2>
                <p className="text-xl text-neutral-600 mb-8">
                  The payout link opens in any mobile browser. No app to install, no Ezeebit
                  account to create, and nothing for your support team to talk anyone through.
                </p>

                {/* Left-aligned even where phones centre the section, so each line stays beside its tick */}
                <ul className="space-y-5 text-left">
                  {customerExperience.map((point) => (
                    <li key={point.title} className="flex gap-4">
                      <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-neutral-900 mb-1">{point.title}</h3>
                        <p className="text-neutral-600">{point.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
                Built for businesses that owe people money
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Wherever payouts are high in volume, time sensitive, or hard to route through a bank.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={useCase.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-8 h-full"
                >
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    {useCase.title}
                  </h3>
                  <p className="text-neutral-600">
                    {useCase.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <FaqBlock heading="Payouts: frequently asked questions" items={payoutFaqs} tone="white" />

        {/* CTA Section */}
        <section className="section-padding relative overflow-hidden bg-neutral-950 text-white">
          <DarkBackdrop glow="left" />
          <div className="relative container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
                Ready to start paying out?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto text-neutral-300">
                Get an API key and send your first payout today, or talk to us about volume.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://merchant.ezeebit.com/#/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-500 text-white hover:bg-primary-600 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
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

export default Payouts
