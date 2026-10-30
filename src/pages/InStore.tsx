import { motion } from '../lib/motion'
import { Link } from 'react-router-dom'
import {
  Smartphone, Wifi, QrCode, FileText,
  CheckCircle, ArrowRight
} from 'lucide-react'
import SEO from '../components/SEO'
import FaqBlock from '../components/FaqBlock'
import PageHero, { HERO_PRIMARY, HERO_SECONDARY } from '../components/hero/PageHero'
import InStoreHeroVisual from '../components/hero/InStoreHeroVisual'
import DarkBackdrop from '../components/DarkBackdrop'
import { faqPageNode } from '../lib/faqSchema'

const eposSteps = [
  'The cashier enters the amount in local currency.',
  'They select the coin and network the customer wants to use.',
  'They accept the locked rate and show the QR code.',
  'The customer scans and pays from their wallet.',
  'The receipt prints, and settlement follows at T+0 (stablecoin) or T+1 (local currency).',
]

const staticQrSteps = [
  'The customer scans the QR code displayed in your store.',
  'They enter the amount.',
  'They choose a coin.',
  'They confirm on their phone.',
]

const inStoreFaqs = [
  {
    question: 'What is a crypto POS?',
    answer: 'A crypto POS is a point-of-sale device that lets a store accept cryptocurrency and stablecoin payments: the cashier enters the price in local currency and the customer pays by scanning a QR code with their wallet. Ezeebit\'s ePOS is an Android device that prints receipts and connects over WiFi, 4G or SIM, so it works wherever you have WiFi or mobile signal.',
  },
  {
    question: 'How do refunds work?',
    answer: 'Your store handles refunds directly. Confirmed crypto payments can\'t be reversed by the payer, so there are no chargebacks. If a customer returns an item, refund them in local currency or store credit under your own returns policy.',
  },
  {
    question: 'What does in-store crypto acceptance cost?',
    answer: '1% or lower per transaction, excluding VAT. The Starter plan is R0 a month, Professional is R150 a month, and Enterprise pricing is custom. There are no setup fees for the ePOS or Ezeebit Pay.',
  },
]

const InStore = () => {
  const features = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Android ePOS",
      description: "An Android point-of-sale device that prints receipts and connects over WiFi, 4G or SIM."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Print receipts",
      description: "Confirm successful crypto transactions with descriptive printed receipts"
    },
    {
      icon: <QrCode className="w-6 h-6" />,
      title: "QR code payments",
      description: "Generate unique QR codes for seamless stablecoin and crypto payments from any wallet"
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "Multi-network support",
      description: "Works with WiFi or 4G, and offers SIM card compatibility"
    }
  ]

  const deviceSpecs = [
    { label: "Network Support", value: "WiFi, 4G, SIM Card ports" },
    { label: "Payment Methods", value: "QR Scan" },
    { label: "Supported Currencies", value: "7+ Cryptocurrencies" },
    { label: "Settlement", value: "Stablecoin same day, local currency next business day" },
    { label: "Receipt", value: "Printed receipts" }
  ]

  return (
    <>
      <SEO
        title="In-store ePOS and static QR"
        description="In-store stablecoin and crypto payments. Ezeebit is live in South Africa, Kenya and Nigeria, with more African markets to follow."
        canonicalUrl="/in-store"
        crumbs={[{ name: 'In-store ePOS', path: '/in-store' }]}
        extraNodes={[faqPageNode('https://ezeebit.com/in-store#faq', inStoreFaqs)]}
      />
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-hidden -mt-20"
    >
      {/* Hero Section */}
      <PageHero
        title="Accept stablecoins"
        accent="at the counter."
        description="Take stablecoin and crypto payments in your store with an ePOS device or an Ezeebit Pay QR code. Every payment is hedged on the spot and settled in ZAR, KES, NGN or USD."
        actions={
          <>
          <a href="https://merchant.ezeebit.com/#/signup" target="_blank" rel="noopener noreferrer" className={HERO_PRIMARY}>
            Get your ePOS device
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
          <Link to="/contact" className={HERO_SECONDARY}>
            Book a demo
          </Link>
          </>
        }
        visual={<InStoreHeroVisual />}
      />

      {/* Features Section */}
      <section className="story">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center justify-center h-16 px-5 bg-white rounded-xl">
                <img
                  src="/epos-logo.png"
                  alt="EPOS"
                  className="h-9 w-auto"
                />
              </div>
            </div>
            <div className="flex justify-center mb-8">
              <img
                src="/epos-image.webp"
                alt="Ezeebit ePOS device"
                className="h-48 w-auto object-contain lg:hidden"
              />
            </div>
            <p className="story-lead">
              Our Android ePOS devices are designed for the modern merchant who wants to offer customers the latest in payment technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="panel"
              >
                <div className="panel-icon">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Device Specifications */}
      <section className="story">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:ml-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-center lg:text-left"
            >
              <h2 className="story-title">
                Enterprise-grade specifications
              </h2>
              <p className="text-lg text-neutral-400 mb-8">
                Built for reliability and performance, our ePOS devices meet the demanding needs of busy retail environments.
              </p>
              <div className="space-y-4">
                {deviceSpecs.map((spec, index) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-white/10 gap-1 sm:gap-0"
                  >
                    <span className="font-medium text-neutral-300 text-left">{spec.label}</span>
                    <span className="text-primary-400 font-semibold text-left sm:text-right">{spec.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex justify-center lg:ml-20"
            >
              <img
                src="/epos-image.webp"
                alt="Ezeebit ePOS device"
                className="w-1/3 hidden md:block"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ezeebit Pay Section */}
      <section className="story">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center justify-center h-20 px-6 bg-white rounded-xl">
                <img
                  src="/ezeebitpay-logo.png"
                  alt="Ezeebit Pay logo"
                  className="h-12 w-auto max-w-[280px]"
                />
              </div>
            </div>
            
            {/* Mobile Images - positioned under logo */}
            <div className="lg:hidden mb-8 flex justify-center items-center">
              <div className="relative flex justify-center items-center w-full max-w-md px-4 -translate-x-4">
                <img
                  src="/ezeebitpay-copy.webp"
                  alt="Ezeebit Pay QR Code device"
                  className="w-full max-w-[308px]"
                />
                <div className="absolute right-4 top-8 z-10">
                  <img
                    src="/ezeebit-pay-checkout.webp"
                    alt="Ezeebit checkout: select a payment method, from on-chain crypto or a wallet"
                    className="w-[128px] rounded-xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
            
            <p className="story-lead">
              Simple QR code payments that work with any crypto wallet. No device required - just print and display.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-center lg:text-left"
            >
              <h2 className="story-title">
                Seamless QR code crypto checkout
              </h2>
              <p className="text-lg text-neutral-400 mb-8">
                Transform any location into a crypto payment point with our static QR code solution.
                Perfect for small businesses, market stalls, or anywhere you need simple crypto acceptance.
              </p>
              <div className="w-full max-w-sm mx-auto md:max-w-none md:mx-0 grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  { icon: <CheckCircle className="w-5 h-5" />, text: 'Free to use' },
                  { icon: <CheckCircle className="w-5 h-5" />, text: 'Digital receipts' },
                  { icon: <CheckCircle className="w-5 h-5" />, text: 'Print or embed codes' },
                  { icon: <CheckCircle className="w-5 h-5" />, text: 'Minimal training' },
                  { icon: <CheckCircle className="w-5 h-5" />, text: 'All wallet compatible' },
                  { icon: <CheckCircle className="w-5 h-5" />, text: '7+ cryptocurrencies' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="text-primary-400 mr-3">
                      {feature.icon}
                    </div>
                    <span className="text-neutral-300">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
              <a
                href="https://merchant.ezeebit.com/#/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex md:inline-flex items-center justify-center mx-auto md:mx-0"
              >
                <span className="inline-flex items-center">
                  Open a merchant account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </span>
              </a>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative hidden lg:block"
            >
              <div className="relative flex items-center justify-center">
                <div className="relative">
                  <img
                    src="/ezeebitpay-copy.webp"
                    alt="Ezeebit Pay QR Code device"
                    className="w-[150%] -ml-8"
                  />
                </div>
                <div className="absolute right-[40px] z-10">
                  <img
                    src="/ezeebit-pay-checkout.webp"
                    alt="Ezeebit checkout: select a payment method, from on-chain crypto or a wallet"
                    className="w-[100%] max-w-[240px] rounded-xl shadow-2xl translate-x-4"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="story">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="story-title">
              How in-store crypto payments work
            </h2>
            <p className="story-lead">
              Take payment with an Android ePOS, or with a static QR code.
            </p>
          </motion.div>

          {([
            { title: 'With the ePOS', steps: eposSteps },
            { title: 'With a static QR (Ezeebit Pay)', steps: staticQrSteps },
          ] as const).map((group) => (
            <div key={group.title} className="mb-16 last:mb-0">
              <h3 className="text-2xl font-display font-bold text-white text-center mb-10">
                {group.title}
              </h3>
              {/* One row per flow on large screens, so the ePOS's fifth step doesn't sit alone */}
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${group.steps.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}>
                {group.steps.map((step, index) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary-500/15 text-primary-400 flex items-center justify-center mx-auto mb-4 text-xl font-semibold">
                      {index + 1}
                    </div>
                    <p className="text-neutral-400">{step}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <FaqBlock heading="In-store: frequently asked questions" items={inStoreFaqs} />


      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden bg-neutral-950 text-white">
        <DarkBackdrop glow="left" />
        <div className="relative container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
              Ready to accept stablecoin and crypto payments?
            </h2>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              Get started with no setup fees. Ezeebit is authorised and regulated by the FSCA, and has applied for its CASP licence (FSP 53664).
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

export default InStore