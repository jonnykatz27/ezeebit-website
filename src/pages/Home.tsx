import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Zap, Shield, Globe, TrendingUp,
  ArrowRight, Star, ChevronLeft, ChevronRight,
  ThumbsUp, Headphones, Lock
} from 'lucide-react'
import PartnerCarousel from '../components/PartnerCarousel'
import SEO from '../components/SEO'

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Near-instant payment verification with advanced crypto payment technology"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Bank-Grade Security",
      description: "FSCA regulated and FIC compliant with enterprise-level security protocols"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multi-Currency Support",
      description: "Accept Bitcoin, Ethereum, USDT, USDC, BNB and more"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Stablecoin Settlement",
      description: "Automatic conversion to stablecoins and settlement in ZAR, KES, or NGN to eliminate volatility risk"
    }
  ]

  const stats = [
    { number: "40,000+", label: "Transactions Processed" },
    { number: "$ Millions", label: "Volume Processed (since 2024)" },
    { number: "99.99%", label: "Uptime" },
    { number: "24/7", label: "Customer Support" }
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
        title="Crypto Payment Solutions for African Merchants"
        description="Accept Bitcoin, Ethereum, and stablecoins at your store. FSCA regulated, instant ZAR, KES, and NGN settlement, and 40,000+ transactions processed. Join 150+ merchants across South Africa."
        canonicalUrl="/"
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Ezeebit",
          "url": "https://ezeebit.com",
          "logo": "https://ezeebit.com/ezeebit_black.png",
          "description": "Leading crypto payment solutions for African merchants. Accept Bitcoin, Ethereum, and stablecoins with instant settlement in ZAR, KES, or NGN.",
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

      <section className="relative min-h-[60vh] flex items-center gradient-bg pt-40">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left lg:col-span-3"
            >
              <h1 className="text-4xl lg:text-[3.5rem] font-display font-bold text-neutral-900 mb-6 leading-none lg:leading-[1.15]">
                <span className="text-primary-500">
                  Grow your business, reach new customers.
                </span>
                <br />
                Accept stablecoin and crypto payments.
              </h1>
              <p className="text-lg lg:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Leading crypto and stablecoin payment solutions for African businesses. Process transactions seamlessly with automatic settlement in stablecoin or local currency (ZAR, KES, NGN).
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
                <a
                  href="https://forms.zohopublic.com/jonnyeze1/form/SignUp/formperma/9fAqEbBhSgAbpaRJPz9aEsfTxy4PdQRx4FEzRCXuxfk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 flex items-center justify-center"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Get Started Free
                </a>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-neutral-500 -mt-4 pb-6">
                <div className="flex items-center gap-1.5">
                  <ThumbsUp className="w-4 h-4 text-secondary-500" />
                  No setup fees
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-secondary-500" />
                  FSCA regulated
                </div>
                <div className="flex items-center gap-1.5">
                  <Headphones className="w-4 h-4 text-secondary-500" />
                  24/7 support
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:col-span-3"
            >
              <div className="relative z-10">
                <img
                  src="/merchant-portal.png"
                  alt="Ezeebit Merchant Portal"
                  className="rounded-2xl shadow-xl w-full max-w-[39.6rem] lg:max-w-[52.8rem] xl:max-w-[61.6rem] scale-110 origin-center"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-2xl transform rotate-3 scale-110 -z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-2xl transform rotate-3 scale-110 translate-x-2 -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center px-2 py-4"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-500 mb-1 lg:mb-2">
                  {stat.number}
                </div>
                <div className="text-neutral-600 text-xs sm:text-sm">{stat.label}</div>
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
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">Our Partners</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Trusted by leading brands across South Africa and beyond.
            </p>
          </motion.div>

          <div className="mb-2 md:mb-8 partner-carousel-container">
            <PartnerCarousel
              partners={[
                { name: 'iStore', logo: '/istore-logo(final).png', scale: 1.06 },
                { name: 'Le Creuset', logo: '/le-creuset-logo(final).png', scale: 1.475 },
                { name: 'Amiri', logo: '/amiri-logo(latest).png', mobileScale: 0.95 },
                { name: 'Court Order', logo: '/courtorder-logo(latest).png', scale: 0.75 },
                { name: 'Ritual', logo: '/ritual-logo(latest).png', scale: 1.15 },
                { name: 'Hydraulics', logo: '/hydraulics-logo(latest).png', scale: 1.15 },
                { name: 'Al Capone', logo: '/alcapone-logo(final).png', scale: 1.15 },
                { name: 'Scoin', logo: '/scoin-logo(latest).png' },
                { name: 'Soul Gallery', logo: '/soul-gallery-logo(final).png', scale: 0.8, mobileScale: 0.69 }
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
                { name: 'Story', logo: '/story-logo(latest).png', mobileScale: 0.95 },
                { name: 'Spar', logo: '/spar-logo(latest).png', mobileScale: 0.8 },
                { name: 'Cultish', logo: '/cultish-logo(latest).png', scale: 1.6, mobileScale: 1.32 },
                { name: 'Watch Channel', logo: '/watch-channel-logo(final).png', mobileScale: 1.05 },
                { name: 'Diesel', logo: '/diesel-logo(final).png', scale: 0.806, mobileScale: 0.772 },
                { name: 'Sumptuous Tours', logo: '/sumptuous-tours-logo.png', scale: 1.5 }
              ]}
              direction="right"
              speed={40}
            />
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-20 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-10 lg:mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">Why Choose Ezeebit?</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Built for African merchants who want to embrace the future of payments without compromising on security or simplicity.
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

      <section className="py-10 lg:py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-10 lg:mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">How It Works</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Simple, secure, and seamless crypto payment processing in three easy steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {[
              {
                step: "01",
                title: "Customer Pays",
                description: "Customer selects crypto payment and scans the QR code from their preferred wallet",
                image: "/scan-pic-nobg-min.png"
              },
              {
                step: "02",
                title: "Instant Conversion",
                description: "Cryptocurrency is automatically converted to stablecoins to eliminate volatility risk",
                image: "/download.png"
              },
              {
                step: "03",
                title: "Local Currency Settlement",
                description: "Funds are settled to your bank account in ZAR, KES, or NGN the next business day with full transaction details",
                image: "/zar-pic-nobg.png"
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-20 md:h-32 object-contain rounded-xl"
                  />
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-20 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-8 lg:mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">7+ Cryptos</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Accept payments in all major cryptocurrencies with automatic conversion to stablecoins or local currency (ZAR, KES, NGN).
            </p>
          </motion.div>

          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3 lg:gap-4 max-w-5xl mx-auto">
            {[
              { symbol: 'BTC', name: 'Bitcoin' },
              { symbol: 'ETH', name: 'ERC-20' },
              { symbol: 'USDT', name: 'Multiple' },
              { symbol: 'USDC', name: 'Multiple' },
              { symbol: 'BNB', name: 'BSC' },
              { symbol: 'DAI', name: 'ERC-20' },
              { symbol: 'PAXG', name: 'ERC-20' }
            ].map((token, index) => (
              <motion.div
                key={token.symbol}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="card crypto-card aspect-square p-2 lg:p-4 text-center hover:scale-105 transition-transform flex flex-col items-center justify-center"
              >
                <div className="w-8 h-8 lg:w-12 lg:h-12 mb-1 lg:mb-2">
                  <img
                    src={`/${token.symbol.toLowerCase()}-logo.svg`}
                    alt={`${token.symbol} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="font-semibold text-neutral-900 text-xs lg:text-sm">{token.symbol}</div>
                <div className="text-[9px] lg:text-xs text-neutral-500 whitespace-nowrap">{token.name}</div>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.35 }}
              className="card crypto-card aspect-square p-2 lg:p-4 text-center hover:scale-105 transition-transform flex flex-col items-center justify-center w-full h-full"
            >
              <div className="font-semibold text-neutral-500 text-xs lg:text-sm leading-tight">More coming soon</div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-8 lg:mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">Compatible With Any Wallet</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Customers can pay directly using any centralised wallet or any decentralised wallets.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <p className="text-center text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-8">
              Direct Integrations
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 lg:gap-10 max-w-md md:max-w-none mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-100 flex flex-col items-center justify-center hover:shadow-md transition-shadow"
              >
                <img src="/luno_logo.png" alt="Luno" className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover mb-3 flex-shrink-0" />
                <span className="font-semibold text-neutral-900 text-base md:text-lg">Luno</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-100 flex flex-col items-center justify-center hover:shadow-md transition-shadow"
              >
                <img src="/valr_logo.png" alt="VALR" className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover mb-3 flex-shrink-0" />
                <span className="font-semibold text-neutral-900 text-base md:text-lg">VALR</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-100 flex flex-col items-center justify-center hover:shadow-md transition-shadow"
              >
                <img src="/Binance-Logo.svg" alt="Binance" className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover mb-3 flex-shrink-0" />
                <span className="font-semibold text-neutral-900 text-base md:text-lg">Binance</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-100 flex flex-col items-center justify-center hover:shadow-md transition-shadow relative"
              >
                <div className="absolute -top-2 -right-2 md:-top-2.5 md:-right-2.5 bg-primary-500 text-white text-[9px] md:text-[10px] font-bold px-2 py-0.5 md:px-2 md:py-1 rounded-full shadow-md whitespace-nowrap">
                  700+ Wallets
                </div>
                <img src="/walletconnect-logo.svg" alt="WalletConnect" className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover mb-3 flex-shrink-0" />
                <span className="font-semibold text-neutral-900 text-base md:text-lg">WalletConnect</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-20 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-8 lg:mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">Enterprise-Grade Security</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Built with the highest security standards to protect your business and your customers.
            </p>
          </motion.div>

          <div className="max-w-xs mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-6 text-center relative"
            >
              <div className="absolute -top-3 -right-3 bg-primary-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-current" />
                SOC 2 Certified
              </div>
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                MPC Wallet Technology
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Multi-party computation (MPC) eliminates single points of failure by distributing key management across multiple parties, ensuring your funds are always secure.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-8 lg:mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">Backed by World-Class Investors</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Supported by leading global funds and industry veterans who share our belief in building the future of payments in Africa
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest text-center mb-6">
                Lead Investors
              </p>
              <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
                <a
                  href="https://foundercollective.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/founder_collective_logo.png"
                    alt="Founder Collective"
                    className="h-8 md:h-10 w-auto object-contain"
                  />
                </a>
                <a
                  href="https://rabacap.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/Raba_logo.webp"
                    alt="Raba Partnership"
                    className="h-7 md:h-9 w-auto object-contain"
                  />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="border-t border-neutral-200 pt-10 mb-12"
            >
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest text-center mb-6">
                Strategic Investors
              </p>
              <div className="flex justify-center items-center">
                <a
                  href="https://dcg.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/digital-currency-group-logo-nobg.png"
                    alt="Digital Currency Group"
                    className="h-14 md:h-[70px] w-auto object-contain"
                  />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="border-t border-neutral-200 pt-10"
            >
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest text-center mb-8">
                Angel Investors
              </p>
              <div className="max-w-2xl mx-auto">
                <div className="grid grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
                  {[
                    { name: 'Terry Angelos', image: '/terry-image-nobg.png', linkedin: 'https://www.linkedin.com/in/tangelos' },
                    { name: 'Anton Katz', image: '/anton_image-nobg.png', linkedin: 'https://www.linkedin.com/in/katzanton' },
                    { name: 'David|de Picciotto', image: '/david_image-nobg.png', linkedin: 'https://www.linkedin.com/in/david-de-picciotto' }
                  ].map((investor, index) => (
                    <motion.div
                      key={investor.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="text-center"
                    >
                      <a
                        href={investor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100 hover:ring-4 hover:ring-primary-200 transition-all"
                        aria-label={`${investor.name.replace('|', ' ')} LinkedIn profile`}
                      >
                        <img
                          src={investor.image}
                          alt={investor.name.replace('|', ' ')}
                          className="w-full h-full object-cover"
                        />
                      </a>
                      <p className="text-sm font-medium text-neutral-700 leading-tight">
                        {investor.name.includes('|')
                          ? investor.name.split('|').map((part, i) => (
                              <span key={i}>
                                {part}
                                {i < investor.name.split('|').length - 1 && <br />}
                              </span>
                            ))
                          : investor.name.split(' ').map((part, i) => (
                              <span key={i}>
                                {part}
                                {i < investor.name.split(' ').length - 1 && <br />}
                              </span>
                            ))
                        }
                      </p>
                    </motion.div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-6 md:gap-8 max-w-md mx-auto">
                  {[
                    { name: 'Nadir Khamissa', image: '/nadir_image-nobg.png', linkedin: 'https://www.linkedin.com/in/nadir-khamissa' },
                    { name: 'Chris Harmse', image: '/chris_image-nobg.png', linkedin: 'https://www.linkedin.com/in/chrisharmse' }
                  ].map((investor, index) => (
                    <motion.div
                      key={investor.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + (index + 3) * 0.05 }}
                      className="text-center"
                    >
                      <a
                        href={investor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100 hover:ring-4 hover:ring-primary-200 transition-all"
                        aria-label={`${investor.name} LinkedIn profile`}
                      >
                        <img
                          src={investor.image}
                          alt={investor.name}
                          className="w-full h-full object-cover"
                        />
                      </a>
                      <p className="text-sm font-medium text-neutral-700 leading-tight">
                        {investor.name.split(' ').map((part, i) => (
                          <span key={i}>
                            {part}
                            {i < investor.name.split(' ').length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-neutral-200 rounded-full shadow-xs">
                <Shield className="w-5 h-5 text-secondary-600" />
                <span className="text-sm font-medium text-neutral-700">
                  Trusted by industry leaders and backed by experienced investors
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-20 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-8 lg:mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">Trusted by Merchants Across Africa</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Join hundreds of businesses already accepting stablecoin and crypto payments with confidence.
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

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  index === currentTestimonial ? 'bg-primary-500 w-6' : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
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

export default Home
