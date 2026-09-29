import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ChevronDown, HelpCircle,
  Phone, Mail, Star,
  Shield, CreditCard, Zap, Users, ArrowRight
} from 'lucide-react'
import SEO from '../components/SEO'
import PageHero, { HeroSearch } from '../components/hero/PageHero'

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [openItems, setOpenItems] = useState<string[]>([])

  const faqItems = [
    {
      id: '1',
      category: 'getting-started',
      question: 'How do I get started with Ezeebit?',
      answer: 'Sign up for a merchant account, complete our quick online KYC, then choose either an in-store ePOS device, ezeebit Pay QR code or plug in our online payment plugin. We guide you through every step until you\'re live.',
      popular: true
    },
    {
      id: '2',
      category: 'getting-started',
      question: 'What documents are required?',
      answer: 'We need your South African business registration, proof of address, bank account details, and ID documents for directors. This ensures FSCA and FIC compliance for seamless onboarding.',
      popular: false
    },
    {
      id: '3',
      category: 'payments',
      question: 'Which cryptocurrencies are supported?',
      answer: 'Accept Bitcoin (BTC), Ethereum (ETH), USDT, USDC, BNB, DAI, PAXG and more. All transactions are instantly hedged to stablecoins at checkout to shield you from volatility, then settled in your local currency (ZAR, KES, or NGN).',
      popular: true
    },
    {
      id: '4',
      category: 'payments',
      question: 'How fast are payments processed?',
      answer: 'In-store ePOS payments can complete in as quick as 0.5 seconds. BTC transactions can take longer. Online transactions confirm within a minute on most networks, and fiat settlement (ZAR, KES, or NGN) lands in your bank by the next business day.',
      popular: true
    },
    {
      id: '5',
      category: 'payments',
      question: 'How does settlement work?',
      answer: 'Funds convert instantly to USD-pegged stablecoins at checkout to shield from any crypto-price volatility, then settle to your South African bank account automatically by the next business day.',
      popular: false
    },
    {
      id: '6',
      category: 'security',
      question: 'Is Ezeebit regulated and secure?',
      answer: 'Ezeebit is FSCA-regulated and FIC-compliant. We use end-to-end encryption, cold-storage reserves, and partner with SumSub for ongoing transaction monitoring.',
      popular: true
    },
    {
      id: '7',
      category: 'security',
      question: 'How do you protect against fraud?',
      answer: 'We employ multiple layers of fraud protection including real-time transaction monitoring, blockchain verification, and compliance with anti-money laundering (AML) regulations.',
      popular: false
    },
    {
      id: '8',
      category: 'technical',
      question: 'How do I log into the ePOS device?',
      answer: 'Staff can receive a one-time password (OTP) via their registered phone number or use a Staff Login Password to access the device.',
      popular: false
    },
    {
      id: '9',
      category: 'technical',
      question: 'How do I conduct a sale in-store?',
      answer: 'On ePOS: select "Cashier Pro," enter the ZAR amount, choose network and currency, accept the rate, then select "Pay via QR Code" and have the customer scan it. For "Scan to Pay," customers scan your static QR, enter amount, select currency, and confirm.',
      popular: true
    },
    {
      id: '10',
      category: 'technical',
      question: "The device won't power on—what should I do?",
      answer: 'If the docked device doesn\'t charge, unplug the cable and insert it directly into the device. A red light in the top-right indicates charging.',
      popular: false
    },
    {
      id: '11',
      category: 'technical',
      question: 'Where can I buy replacement paper rolls?',
      answer: 'Purchase compatible 57 × 30 mm thermal till rolls from our trusted supplier: castlepapercapetown.co.za.',
      popular: false
    },
    {
      id: '12',
      category: 'technical',
      question: 'Do you provide customer support?',
      answer: 'Yes! We offer 24/7 support for all plans. Our average response time is under 1 hours.',
      popular: true
    },
    {
      id: '13',
      category: 'getting-started',
      question: 'How long does account approval take?',
      answer: 'Most accounts are approved within 24-48 hours after submitting complete documentation. Complex business structures may take up to 5 business days. We\'ll keep you updated throughout the process.',
      popular: false
    },
    {
      id: '14',
      category: 'technical',
      question: 'Can I integrate with my existing e-commerce platform?',
      answer: 'Absolutely! We have plugins for Shopify, and soon to be WooCommerce, Magento, and other major platforms. For custom integrations, our API makes it easy to add stablecoin and crypto payments to any website or application.',
      popular: true
    },
    {
      id: '15',
      category: 'payments',
      question: 'What are your transaction fees?',
      answer: 'Our fees are 1% or lower per transaction (excluding VAT)—up to 68% cheaper than traditional card processors. No surprises, no fine print. You keep more of every sale.',
      popular: true
    },
    {
      id: '16',
      category: 'payments',
      question: 'Are there any monthly fees or hidden costs?',
      answer: 'None. There are no monthly subscriptions, no setup fees for ePOS and ezeebit Pay, and no hidden charges. You only pay a small percentage when a transaction completes successfully.',
      popular: true
    },
    {
      id: '17',
      category: 'payments',
      question: 'How do your fees compare to card payments?',
      answer: 'Traditional card processors typically charge 2–3.5%, plus interchange fees, gateway costs, and chargeback penalties. With Ezeebit, you\'re looking at roughly half the cost—or less—with none of the chargeback risk.',
      popular: false
    },
    {
      id: '18',
      category: 'payments',
      question: 'How do you protect me from crypto price swings?',
      answer: 'The moment your customer initiates payment, our system locks in the exchange rate instantly. Our AI-driven hedging converts the crypto to your chosen settlement currency in real time—so you receive exactly what you quoted, regardless of what the market does next.',
      popular: true
    },
    {
      id: '19',
      category: 'payments',
      question: 'What exchange rate do you use?',
      answer: 'We aggregate real-time pricing from leading local and global exchanges to ensure you always get a competitive, transparent rate at checkout.',
      popular: false
    },
    {
      id: '20',
      category: 'payments',
      question: 'Can I choose to be paid in stablecoins instead of local currency?',
      answer: 'Yes. You decide how you want to be settled: stablecoins (USDT or USDC) for speed and flexibility, or local currency (ZAR, KES, or NGN) deposited directly into your bank account.',
      popular: true
    },
    {
      id: '21',
      category: 'payments',
      question: 'Are there minimum payout thresholds?',
      answer: 'No. We settle what you\'re owed without holding funds to arbitrary minimums. Payouts land in your account the next business day (T+1).',
      popular: false
    },
    {
      id: '22',
      category: 'security',
      question: 'Are there chargebacks with crypto payments?',
      answer: 'No—and that\'s one of the biggest advantages. Crypto payments are irreversible, which means no fraudulent chargebacks, no disputes months after a sale, and no fees for transactions you\'ve already fulfilled.',
      popular: true
    },
    {
      id: '23',
      category: 'technical',
      question: 'Which wallets can my customers pay from?',
      answer: 'Over 700 wallets are supported via WalletConnect, plus direct integrations with Africa\'s most popular exchanges such as VALR, and soon to be more. Whether your customer uses MetaMask, Trust Wallet, or their exchange app—they can pay.',
      popular: true
    },
    {
      id: '24',
      category: 'technical',
      question: 'Do my customers need a specific app to pay?',
      answer: 'No. Customers simply scan your QR code with whatever crypto wallet they already use. No downloads, no sign-ups, no new accounts. If they hold crypto, they\'re ready to pay.',
      popular: false
    },
    {
      id: '25',
      category: 'technical',
      question: 'What blockchain networks do you support?',
      answer: 'We support Bitcoin Mainnet, Ethereum (ERC-20), Tron (TRC-20), BNB Smart Chain (BEP-20), and Solana (SPL)—covering the vast majority of crypto holders worldwide.',
      popular: true
    },
    {
      id: '26',
      category: 'payments',
      question: 'How do refunds work with crypto payments?',
      answer: 'Ezeebit does not currently process refunds on behalf of merchants—all refunds are handled directly by the store.\n\nFor customers: If you paid with crypto and need a refund, contact the store directly with your proof or confirmation of payment. The merchant will refund you in ZAR (via cash or bank transfer) or offer store credit, depending on their refund policy.\n\nFor merchants: When a customer requests a refund on a crypto payment, request their proof or confirmation of payment, then simply refund them in ZAR or offer store credit as you normally would. The original crypto payment is still settled to your account as usual. This approach avoids the complexity of crypto-to-crypto refunds, wallet address verification, and blockchain fees—keeping the process simple for everyone.',
      popular: true
    },
    {
      id: '27',
      category: 'payments',
      question: 'Can I pay my customers out in stablecoin?',
      answer: 'Yes. Our Payout Gateway lets you send payouts from your fiat balance without collecting a single wallet address. You create the payout with an amount and your own reference, we reserve the fiat and hand back a link, and your customer enters their own wallet address to claim it. Payouts settle on-chain in minutes, at any hour.',
      popular: true
    },
    {
      id: '28',
      category: 'payments',
      question: 'Do I have to collect and store wallet addresses to pay someone?',
      answer: 'No, and that is deliberate. Your customer supplies their own address in our widget, so a mistyped address is never your liability and you are not holding wallet details you would rather not hold. Every recipient address is screened before funds move.',
      popular: false
    },
    {
      id: '29',
      category: 'payments',
      question: 'Can I hold a balance with Ezeebit?',
      answer: 'Yes. Your Ezeebit wallets hold both fiat and USDT, and you can convert between them at a quoted rate. What you take in funds what you pay out, so pay-ins and payouts draw on the same balance. Withdraw fiat to your bank account, or stablecoin to your own wallet.',
      popular: true
    },
    {
      id: '30',
      category: 'payments',
      question: 'Do you handle large one-off trades?',
      answer: 'Our OTC desk does. It is for volumes that would move the market on an exchange: you get a firm quote from a named dealer, the rate is locked when you accept it, and settlement is same day in ZAR, KES or NGN. It is a desk rather than a self-serve product, so it starts with a conversation.',
      popular: false
    },
  ]

  // Counted from the list rather than written down beside it, so the numbers
  // cannot fall behind the questions the way they already had.
  const countIn = (id: string) =>
    id === 'all' ? faqItems.length
    : id === 'popular' ? faqItems.filter((i) => i.popular).length
    : faqItems.filter((i) => i.category === id).length

  const categories = [
    { id: 'all', name: 'All Questions', icon: <HelpCircle className="w-4 h-4" />, count: countIn('all') },
    { id: 'popular', name: 'Popular', icon: <Star className="w-4 h-4" />, count: countIn('popular') },
    { id: 'getting-started', name: 'Getting Started', icon: <Users className="w-4 h-4" />, count: countIn('getting-started') },
    { id: 'payments', name: 'Payments', icon: <CreditCard className="w-4 h-4" />, count: countIn('payments') },
    { id: 'security', name: 'Security', icon: <Shield className="w-4 h-4" />, count: countIn('security') },
    { id: 'technical', name: 'Technical', icon: <Zap className="w-4 h-4" />, count: countIn('technical') }
  ]


  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const filteredFAQs = faqItems.filter(item => {
    const matchesCategory =
      activeCategory === 'all' ||
      activeCategory === 'popular' && item.popular ||
      item.category === activeCategory
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return text
    }
    const regex = new RegExp(`(${highlight})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    )
  }

  return (
    <>
      <SEO
        title="Frequently Asked Questions"
        description="Answers to common questions about Ezeebit — taking payments in, paying customers out in stablecoin, holding a fiat or USDT balance, fees, settlement, security and integration."
        canonicalUrl="/resources/faq"
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqItems.slice(0, 10).map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        })}
      </script>
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-hidden -mt-20"
    >
      {/* Hero Section */}
      <PageHero
        title="Frequently asked"
        accent="questions"
        description="Find answers to common questions about Ezeebit's cryptocurrency payment solutions. Can't find what you're looking for? Our support team is here to help."
      >
        <HeroSearch placeholder="Search frequently asked questions..." value={searchTerm} onChange={setSearchTerm} />
      </PageHero>

      {/* Categories */}
      <section className="bg-white border-b border-neutral-200 sticky top-20 z-40">
        <div className="container-custom px-4">
          <div className="flex space-x-2 md:space-x-4 overflow-x-auto py-4 scrollbar-hide">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-1 md:space-x-2 px-3 md:px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
                  activeCategory === category.id
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
                <span className="bg-gray-200 text-neutral-600 px-2 py-0.5 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ List */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-1.5 md:space-y-2">
              {filteredFAQs.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden"
                  style={{ padding: 0 }}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-3 md:px-4 py-2 md:py-2.5 text-left flex items-center justify-between hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center flex-1 min-w-0">
                      {item.popular && <Star className="w-3.5 h-3.5 text-yellow-500 mr-1.5 flex-shrink-0" />}
                      <span className="font-medium text-neutral-900 text-sm md:text-base text-left leading-tight">
                        {highlightText(item.question, searchTerm)}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-neutral-400 flex-shrink-0 ml-2 transition-transform duration-200 ${
                      openItems.includes(item.id) ? 'rotate-180' : ''
                    }`} />
                  </button>
                  {openItems.includes(item.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-3 md:px-4 pb-2.5 border-t border-neutral-100"
                    >
                      <p className="text-neutral-600 pt-2.5 text-sm text-left leading-relaxed whitespace-pre-line">
                        {highlightText(item.answer, searchTerm)}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">No questions found</h3>
                <p className="text-neutral-600 mb-6">
                  Try adjusting your search terms or browse different categories.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setActiveCategory('all')
                  }}
                  className="btn-primary"
                >
                  View All Questions
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              Multiple ways to reach us
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto px-4 md:px-0">
              Choose the contact method that works best for you. We're available across multiple channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="card p-6 text-center hover:scale-105 transition-transform flex flex-col h-full"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary-600">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Phone Support
              </h3>
              <p className="text-neutral-600 text-sm mb-3 flex-1">
                Speak directly with our support team
              </p>
              <div className="text-primary-600 font-medium mb-2">
                +27 21 879 5074
              </div>
              <div className="text-xs text-neutral-500 mb-4">
                Mon-Fri, 8AM-6PM SAST
              </div>
              <a
                href="tel:+27218795074"
                className="btn-primary w-full flex items-center justify-center mt-auto"
              >
                Start Chat
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6 text-center hover:scale-105 transition-transform flex flex-col h-full">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary-600">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Email support</h3>
              <p className="text-neutral-600 text-sm mb-3 flex-1">
                Get detailed help via email
              </p>
              <div className="text-primary-600 font-medium mb-2">
                support@ezeebit.com
              </div>
              <div className="text-xs text-neutral-500 mb-4">
                24/7 response within 2 hours
              </div>
              <a
                href="mailto:support@ezeebit.com"
                className="btn-primary w-full flex items-center justify-center mt-auto"
              >
                Start Chat
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6 text-center hover:scale-105 transition-transform flex flex-col h-full">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">WhatsApp support</h3>
              <p className="text-neutral-600 text-sm mb-3 flex-1">
                Quick support via WhatsApp
              </p>
              <div className="text-primary-600 font-medium mb-2">
                +27 79 443 9375
              </div>
              <div className="text-xs text-neutral-500 mb-4">
                Mon-Fri, 8AM-6PM SAST
              </div>
              <a
                href="https://wa.me/27794439375"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full flex items-center justify-center mt-auto"
              >
                Start Chat
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Sign up in minutes and start accepting stablecoin and crypto payments with no setup fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://merchant.ezeebit.com/#/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-600 hover:bg-neutral-100 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              <Link to="/contact" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center">
                Contact Support
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      </motion.div>
    </>
  )
}

export default FAQ
