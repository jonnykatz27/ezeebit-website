import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Smartphone, Wifi, QrCode, FileText,
  CheckCircle, ArrowRight, Zap
} from 'lucide-react'
import SEO from '../components/SEO'

const InStore = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast ePOS",
      description: "Process transactions in as quick as 0.5 seconds with our advanced point-of-sale technology"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Print Receipts",
      description: "Confirm successful crypto transactions with descriptive printed receipts"
    },
    {
      icon: <QrCode className="w-6 h-6" />,
      title: "QR Code Payments",
      description: "Generate unique QR codes for seamless stablecoin and crypto payments from any wallet"
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "Multi-Network Support",
      description: "Works with WiFi or 4G, and offers SIM card compatibility"
    }
  ]

  const deviceSpecs = [
    { label: "Transaction Speed", value: "As quick as 0.5 seconds" },
    { label: "Network Support", value: "WiFi, 4G, SIM Card ports" },
    { label: "Payment Methods", value: "QR Scan" },
    { label: "Supported Currencies", value: "7+ Cryptocurrencies" },
    { label: "Settlement", value: "Instant stablecoin, T+1 ZAR/KES/NGN" },
    { label: "Receipt", value: "Printed receipts" }
  ]

  return (
    <>
      <SEO
        title="In-Store Stablecoin and Crypto Payments with ePOS"
        description="Accept cryptocurrency at your physical store with our lightning-fast ePOS system. QR code payments, printed receipts, and instant settlement in ZAR, KES, or NGN."
        canonicalUrl="/in-store"
      />
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
                Transform Your <span className="text-gradient">In-Store</span> Experience
              </h1>
              <p className="text-xl text-neutral-600 mb-8">
                Accept stablecoin and cryptocurrency payments at your physical location with our advanced ePOS devices or our ezeebit Pay static QR Codes. 
                Lightning-fast transactions, multi-currency support, and rapid settlement in ZAR, KES, or NGN.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
                <a
                  href="https://forms.zohopublic.com/jonnyeze1/form/SignUp/formperma/9fAqEbBhSgAbpaRJPz9aEsfTxy4PdQRx4FEzRCXuxfk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center justify-center"
                >
                  <span className="flex items-center justify-center">
                    Get Your ePOS Device
                  </span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
                <Link
                  to="/contact"
                  className="btn-secondary flex items-center justify-center"
                >
                  Schedule Demo
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex items-center justify-center hidden lg:flex"
            >
              <img
                src="/ezeebitpay.webp"
                alt="ezeebit Pay QR Code solution"
                className="w-[70%] max-w-[500px] drop-shadow-2xl -ml-16"
              />
              <img
                src="/epos-image.webp"
                alt="Ezeebit ePOS device"
                className="w-[25%] max-w-[130px] drop-shadow-2xl -ml-36"
              />
            </motion.div>
          </div>
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
            <div className="flex justify-center mb-4">
              <img
                src="/epos-logo.png"
                alt="EPOS"
                className="h-16 w-auto"
              />
            </div>
            <div className="flex justify-center mb-8">
              <img
                src="/epos-image.webp"
                alt="Ezeebit ePOS device"
                className="h-48 w-auto object-contain lg:hidden"
              />
            </div>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our cutting-edge point-of-sale devices are designed for the modern merchant who wants to offer customers the latest in payment technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 text-center hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary-500">
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

      {/* Device Specifications */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:ml-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-center lg:text-left"
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
                Enterprise-Grade Specifications
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Built for reliability and performance, our ePOS devices meet the demanding needs of busy retail environments.
              </p>
              <div className="space-y-4">
                {deviceSpecs.map((spec, index) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-neutral-200 gap-1 sm:gap-0"
                  >
                    <span className="font-medium text-neutral-700 text-left">{spec.label}</span>
                    <span className="text-primary-500 font-semibold text-left sm:text-right">{spec.value}</span>
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

      {/* ezeebit Pay Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <img
                src="/ezeebitpay-logo.png"
                alt="ezeebitPay logo"
                className="h-24 w-auto max-w-[384px]"
              />
            </div>
            
            {/* Mobile Images - positioned under logo */}
            <div className="lg:hidden mb-8 flex justify-center items-center">
              <div className="relative flex justify-center items-center w-full max-w-md px-4 -translate-x-4">
                <img
                  src="/ezeebitpay-copy.webp"
                  alt="ezeebit Pay QR Code device"
                  className="w-full max-w-[308px]"
                />
                <div className="absolute right-4 top-8 z-10">
                  <img
                    src="/corrected-ezeebitpay.webp"
                    alt="Payment amount and currency selector interface"
                    className="w-[128px] rounded-xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
            
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Simple QR code payments that work with any crypto wallet. No device required - just print and display.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-center lg:text-left"
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
                Seamless QR Code Crypto Checkout
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
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
                    <div className="text-primary-500 mr-3">
                      {feature.icon}
                    </div>
                    <span className="text-neutral-700">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
              <a
                href="https://forms.zohopublic.com/jonnyeze1/form/SignUp/formperma/9fAqEbBhSgAbpaRJPz9aEsfTxy4PdQRx4FEzRCXuxfk"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex md:inline-flex items-center justify-center mx-auto md:mx-0"
              >
                <span className="inline-flex items-center">
                  GET STARTED
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
                    alt="ezeebit Pay QR Code device"
                    className="w-[150%] -ml-8"
                  />
                </div>
                <div className="absolute right-[40px] z-10">
                  <img
                    src="/corrected-ezeebitpay.webp"
                    alt="Payment amount and currency selector interface"
                    className="w-[100%] max-w-[240px] rounded-xl shadow-2xl translate-x-4"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Simple Payment Flow
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              From customer selection to settlement, every step is optimized for speed and security.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Select Crypto",
                description: "Customer chooses cryptocurrency payment option at checkout",
                icon: <Smartphone className="w-8 h-8" />
              },
              {
                step: "2",
                title: "Scan & Pay",
                description: "Customer scans QR code or connects their wallet to pay",
                icon: <QrCode className="w-8 h-8" />
              },
              {
                step: "3",
                title: "Instant Conversion",
                description: "Crypto is automatically converted to stablecoins in real-time",
                icon: <Zap className="w-8 h-8" />
              },
              {
                step: "4",
                title: "Local Currency Settlement",
                description: "Funds settled to your bank account in ZAR, KES, or NGN the next business day",
                icon: <CheckCircle className="w-8 h-8" />
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-500">
                  {step.icon}
                </div>
                <div className="text-sm font-semibold text-primary-500 mb-2">STEP {step.step}</div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-neutral-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
              Ready to Accept Stablecoin and Crypto Payments?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto opacity-90">
              Join the future of payments today. Get started in minutes with no setup fees and full regulatory compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://forms.zohopublic.com/jonnyeze1/form/SignUp/formperma/9fAqEbBhSgAbpaRJPz9aEsfTxy4PdQRx4FEzRCXuxfk"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-500 hover:bg-neutral-100 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </a>
              <Link
                to="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-500 font-medium px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center"
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