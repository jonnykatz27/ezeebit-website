import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BookOpen, UserPlus, MapPin } from 'lucide-react'
import SEO from '../components/SEO'

const EzeebitResources = () => {
  return (
    <>
      <SEO
        title="Ezeebit Resources"
        description="Quick access to Ezeebit's user manual, merchant sign-up, and the full directory of South African stores accepting crypto payments."
        canonicalUrl="/ezeebit-resources"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 -mt-20 pt-20"
    >
      <div className="h-full flex flex-col items-center justify-center px-4 py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4 md:mb-6"
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-2 md:mb-4">
            Welcome to <span className="text-gradient">Ezeebit</span>
          </h1>
          <p className="text-sm md:text-base text-neutral-500 max-w-lg mx-auto">
            Get started with stablecoin and cryptocurrency payments or learn more about our platform
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 md:mb-10 text-center"
        >
          <p className="text-xs md:text-sm text-primary-500 uppercase tracking-wider mb-4 md:mb-5">Pay With Crypto</p>
          <div className="flex items-center justify-center gap-4 md:gap-5">
            <img src="/btc-logo.svg" alt="Bitcoin" className="w-9 h-9 md:w-10 md:h-10" />
            <img src="/eth-logo.svg" alt="Ethereum" className="w-9 h-9 md:w-10 md:h-10" />
            <img src="/usdt-logo.svg" alt="USDT" className="w-9 h-9 md:w-10 md:h-10" />
            <img src="/usdc-logo.svg" alt="USDC" className="w-9 h-9 md:w-10 md:h-10" />
            <img src="/bnb-logo.svg" alt="BNB" className="w-9 h-9 md:w-10 md:h-10" />
            <img src="/paxg-logo.svg" alt="PAXG" className="w-9 h-9 md:w-10 md:h-10" />
            <img src="/zarp-logo.png" alt="ZARP" className="w-9 h-9 md:w-10 md:h-10 rounded-full" />
            <img src="/zaru-logo.png" alt="ZARU" className="w-9 h-9 md:w-10 md:h-10 rounded-full" />
          </div>
          <p className="text-xs md:text-sm text-primary-500 uppercase tracking-widest mt-5 md:mt-7 mb-4 md:mb-5">Direct Integrations</p>
          <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-sm md:max-w-xl mx-auto">
            <div className="bg-white rounded-xl md:rounded-2xl p-3.5 md:p-5 shadow-sm border border-neutral-100 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
              <img src="/luno_logo.png" alt="Luno" className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover mb-1.5 md:mb-2 flex-shrink-0" />
              <span className="font-semibold text-neutral-900 text-xs md:text-sm">Luno</span>
            </div>
            <div className="bg-white rounded-xl md:rounded-2xl p-3.5 md:p-5 shadow-sm border border-neutral-100 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
              <img src="/valr_logo.png" alt="VALR" className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover mb-1.5 md:mb-2 flex-shrink-0" />
              <span className="font-semibold text-neutral-900 text-xs md:text-sm">VALR</span>
            </div>
            <div className="bg-white rounded-xl md:rounded-2xl p-3.5 md:p-5 shadow-sm border border-neutral-100 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
              <img src="/Binance-Logo.svg" alt="Binance" className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover mb-1.5 md:mb-2 flex-shrink-0" />
              <span className="font-semibold text-neutral-900 text-xs md:text-sm">Binance</span>
            </div>
            <div className="bg-white rounded-xl md:rounded-2xl p-3.5 md:p-5 shadow-sm border border-neutral-100 flex flex-col items-center justify-center hover:shadow-md transition-shadow relative">
              <div className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 bg-primary-500 text-white text-[8px] md:text-[9px] font-bold px-1.5 md:px-2 py-0.5 rounded-full shadow-md whitespace-nowrap">
                700+ Wallets
              </div>
              <img src="/walletconnect-logo.svg" alt="WalletConnect" className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover mb-1.5 md:mb-2 flex-shrink-0" />
              <span className="font-semibold text-neutral-900 text-[10px] md:text-xs leading-tight text-center">WalletConnect</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full max-w-sm md:max-w-md mx-auto space-y-3 md:space-y-4"
        >
          <Link
            to="/resources/user-manual"
            className="w-full bg-white hover:bg-neutral-50 text-neutral-900 font-semibold py-3 md:py-4 px-5 md:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-3 text-base md:text-lg border-2 border-neutral-200 hover:border-primary-300"
          >
            <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
            <span>User Guide</span>
          </Link>

          <Link
            to="/resources/where-to-spend"
            className="w-full bg-white hover:bg-neutral-50 text-neutral-900 font-semibold py-3 md:py-4 px-5 md:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-3 text-base md:text-lg border-2 border-neutral-200 hover:border-primary-300"
          >
            <MapPin className="w-5 h-5 md:w-6 md:h-6" />
            <span>Where to Spend Crypto</span>
          </Link>

          <a
            href="https://merchant.ezeebit.com/#/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full btn-primary py-3 md:py-4 px-5 md:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-3 text-base md:text-lg"
          >
            <UserPlus className="w-5 h-5 md:w-6 md:h-6" />
            <span>Merchant Sign Up</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-5 md:mt-8 text-center"
        >
          <p className="text-xs md:text-sm text-neutral-500 max-w-md mx-auto">
            Scanned our QR code? You're in the right place! Explore our crypto payment solutions above.
          </p>
        </motion.div>
      </div>
    </motion.div>
    </>
  )
}

export default EzeebitResources
