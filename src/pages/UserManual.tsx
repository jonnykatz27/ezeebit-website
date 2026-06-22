import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Search, Download, ArrowRight, Book, FileText,
  Rocket, QrCode, GraduationCap, HelpCircle,
  LogIn, Percent, Store, Users,
  ScanLine, Banknote, Globe, Coins, Send, CheckCircle2,
  Wallet, Hash, Layers, Sparkles, ShieldCheck, ChevronDown,
  Smartphone, ShoppingCart, CreditCard
} from 'lucide-react'
import SEO from '../components/SEO'

type TabId = 'getting-started' | 'payments' | 'basics' | 'faq' | 'downloads'

const TABS: { id: TabId; label: string; icon: JSX.Element }[] = [
  { id: 'getting-started', label: 'Getting Started', icon: <Rocket className="w-4 h-4" /> },
  { id: 'payments', label: 'Accepting Payments', icon: <QrCode className="w-4 h-4" /> },
  { id: 'basics', label: 'Crypto Basics', icon: <GraduationCap className="w-4 h-4" /> },
  { id: 'faq', label: 'FAQ', icon: <HelpCircle className="w-4 h-4" /> },
  { id: 'downloads', label: 'Downloads', icon: <Download className="w-4 h-4" /> }
]

const accountSteps = [
  'Visit ezeebit.com and click "Sign Up".',
  'Fill in your business information.',
  'Verify your email address.',
  'Complete KYC verification.',
  'Wait for account approval (usually 24–48 hours).'
]

const portalSteps = [
  {
    title: 'Portal Login',
    icon: <LogIn className="w-5 h-5" />,
    body: 'Use the link in your welcome email to retrieve your brand number and login details, then sign in to the Merchant Portal.'
  },
  {
    title: 'VAT Setup',
    icon: <Percent className="w-5 h-5" />,
    body: 'In Settings → Fees and Tax Management, add a fee called "VAT" and set the Crypto Collection Tax to 15%. Adjust the Crypto Collection Service Charge to add your own premium, and keep all other options at zero.'
  },
  {
    title: 'Store Setup',
    icon: <Store className="w-5 h-5" />,
    body: 'Under "Store", select "Create Store" and complete the required information. A store number is generated — use it to set up your ePOS device.'
  },
  {
    title: 'Staff Setup',
    icon: <Users className="w-5 h-5" />,
    body: 'Open the "Staff" tab to add team members. OTPs are then sent directly to individuals, and you can create a Staff Login Password for ePOS access.'
  }
]

const qrSteps = [
  'Tap the QR code icon on the ePOS and select "In Store Payment".',
  'Create your "In Store QR Code".',
  'Select your store and add an email address to receive transaction confirmations.',
  'Tap "Details", then download your preferred QR format or copy the link.'
]

type FlowId = 'epos' | 'qr' | 'checkout'

const paymentFlows: {
  id: FlowId
  label: string
  icon: JSX.Element
  blurb: string
  steps: { title: string; icon: JSX.Element; body: string }[]
}[] = [
  {
    id: 'epos',
    label: 'ePOS Device',
    icon: <Smartphone className="w-4 h-4" />,
    blurb: 'You drive the payment from the handheld ePOS terminal.',
    steps: [
      {
        title: 'Open Cashier Pro',
        icon: <CreditCard className="w-5 h-5" />,
        body: 'On the ePOS, tap Cashier Pro to start a new transaction.'
      },
      {
        title: 'Enter the amount',
        icon: <Banknote className="w-5 h-5" />,
        body: 'Type in the amount due in your store\'s currency (e.g. R150.00). Tax and any service charge are applied automatically.'
      },
      {
        title: 'Select network & crypto',
        icon: <Globe className="w-5 h-5" />,
        body: 'Choose the customer\'s network and cryptocurrency. The exact crypto amount is calculated and locked in.'
      },
      {
        title: 'Show the QR code',
        icon: <QrCode className="w-5 h-5" />,
        body: 'Present the QR code on the screen for the customer to scan with their wallet, then have them send the exact amount shown.'
      },
      {
        title: 'Wait for the receipt',
        icon: <CheckCircle2 className="w-5 h-5" />,
        body: 'Wait for the confirmation receipt before releasing goods. Transactions are usually instant — Bitcoin can take up to 30 minutes depending on network fees.'
      }
    ]
  },
  {
    id: 'qr',
    label: 'In-Store QR Code',
    icon: <QrCode className="w-4 h-4" />,
    blurb: 'The customer scans your displayed Ezeebit Pay QR code and pays themselves.',
    steps: [
      {
        title: 'They scan your QR code',
        icon: <ScanLine className="w-5 h-5" />,
        body: 'The customer opens their wallet app or phone camera and scans the Ezeebit Pay QR code at your counter. A payment page opens on their phone.'
      },
      {
        title: 'They enter the amount due',
        icon: <Banknote className="w-5 h-5" />,
        body: 'They type in the exact amount due in your store\'s currency (e.g. R150.00). The system automatically converts it to crypto.'
      },
      {
        title: 'They pick the network',
        icon: <Globe className="w-5 h-5" />,
        body: 'They choose the network the payment travels on. It must match the network in their wallet — just like choosing the right bank for an EFT.'
      },
      {
        title: 'They pick their crypto',
        icon: <Coins className="w-5 h-5" />,
        body: 'They choose which cryptocurrency to pay with (Bitcoin, USDT, and so on). The price updates instantly.'
      },
      {
        title: 'They send the payment',
        icon: <Send className="w-5 h-5" />,
        body: 'They tap "Pay with VALR / Luno" to open their wallet automatically, or "Send to Address" to copy the address and amount manually — then hit send.'
      },
      {
        title: 'You see the success screen',
        icon: <CheckCircle2 className="w-5 h-5" />,
        body: 'Wait for the green "Payment Successful" screen before handing over the goods. Once it\'s confirmed, you\'re done.'
      }
    ]
  },
  {
    id: 'checkout',
    label: 'Online Checkout',
    icon: <ShoppingCart className="w-4 h-4" />,
    blurb: 'Crypto payments on your e-commerce store via the Ezeebit plugin.',
    steps: [
      {
        title: 'They choose crypto at checkout',
        icon: <ShoppingCart className="w-5 h-5" />,
        body: 'At your online checkout, the customer selects Ezeebit — pay with crypto — as their payment method.'
      },
      {
        title: 'The payment page opens',
        icon: <Globe className="w-5 h-5" />,
        body: 'Ezeebit displays the order total alongside a payment page with a QR code and wallet options.'
      },
      {
        title: 'They pick network & crypto',
        icon: <Coins className="w-5 h-5" />,
        body: 'The customer selects their network and cryptocurrency. The amount is locked to the order total.'
      },
      {
        title: 'They pay from their wallet',
        icon: <Wallet className="w-5 h-5" />,
        body: 'They scan the QR code or connect their wallet, then send the payment.'
      },
      {
        title: 'The order is confirmed',
        icon: <CheckCircle2 className="w-5 h-5" />,
        body: 'Once the payment is confirmed, the order is marked paid automatically and the customer sees an order confirmation.'
      }
    ]
  }
]

type PaymentMethod = { ticker?: string; name: string; tags?: string[]; logo?: string; color?: string }

const paymentMethods: PaymentMethod[] = [
  { ticker: 'BTC', name: 'Bitcoin', tags: ['Mainnet'], logo: '/btc-logo.svg' },
  { ticker: 'ETH', name: 'Ethereum', tags: ['ERC20'], logo: '/eth-logo.svg' },
  { ticker: 'USDT', name: 'Tether', tags: ['TRC20', 'BSC-BEP20', 'ERC20', 'SPL'], logo: '/usdt-logo.svg' },
  { ticker: 'BNB', name: 'BNB', tags: ['BSC-BEP20'], logo: '/bnb-logo.svg' },
  { ticker: 'USDC', name: 'USD Coin', tags: ['ERC20', 'SPL'], logo: '/usdc-logo.svg' },
  { name: 'Luno', logo: '/luno_logo (clean).png' },
  { name: 'VALR', logo: '/valr_logo (clean).png' },
  { name: 'Binance', logo: '/Binance-Logo (clean).png' },
  { name: 'WalletConnect', tags: ['700+ Wallets'], logo: '/walletconnect-logo.svg' }
]

const goldenRules = [
  'Always wait for the green "Payment Successful" screen before releasing goods. No green = no payment.',
  'The network must match on both sides. If the customer picks the wrong one, the payment will fail.',
  'You\'re paid out in your desired settlement option — fiat or stablecoin (Rands, for example). Crypto price movements aren\'t your concern — Ezeebit handles the conversion.',
  'Be patient with first-time customers. A 30-second explanation turns a confused customer into a loyal one.',
  'When in doubt, contact support. It\'s always better to ask than to guess.'
]

const basics = [
  {
    term: 'Why this matters for your business',
    icon: <Sparkles className="w-5 h-5" />,
    body: 'Your customers can pay with cryptocurrency, but you still get paid in your desired settlement option — fiat or stablecoin (Rands, for example). Ezeebit handles the conversion in the background. Think of it like accepting a card from a tourist — they pay in their currency, the money lands in your account in the option you\'ve chosen.'
  },
  {
    term: 'What is cryptocurrency?',
    icon: <Coins className="w-5 h-5" />,
    body: 'Crypto is simply digital money. Just as countries have Rands, Dollars and Euros, the digital world has its own currencies like Bitcoin and Ethereum. Imagine sending money over WhatsApp instead of handing over physical cash — that\'s the basic idea.'
  },
  {
    term: 'What is a stablecoin?',
    icon: <Layers className="w-5 h-5" />,
    body: 'A stablecoin is crypto designed to hold a steady value, usually pegged to the US Dollar — most often USDT or USDC. Unlike Bitcoin, whose price moves like a share, a stablecoin stays close to $1, like a digital dollar. Most customers pay in stablecoins because they\'re predictable.'
  },
  {
    term: 'What is a network (or "blockchain")?',
    icon: <Globe className="w-5 h-5" />,
    body: 'A network is the road the money travels on to get from your customer\'s wallet to Ezeebit. It\'s like choosing a bank for an EFT — if they say "FNB" but you\'re set up for "Standard Bank", it won\'t go through. The network must match on both sides.'
  },
  {
    term: 'What is a wallet?',
    icon: <Wallet className="w-5 h-5" />,
    body: 'A wallet is an app on your customer\'s phone where they keep their digital money — just like a banking app, but for crypto. Common ones include VALR, Luno and MetaMask.'
  },
  {
    term: 'What is an address?',
    icon: <Hash className="w-5 h-5" />,
    body: 'An address is the destination for the payment — a long string of letters and numbers that works just like a bank account number. The customer\'s wallet sends crypto to this address, and Ezeebit handles the rest.'
  }
]

const faqs = [
  {
    q: 'Which crypto can my customer pay with?',
    a: 'BTC, ETH, USDT, USDC or BNB — whichever they hold. See the Accepting Payments tab for the full list of supported networks for each coin.'
  },
  {
    q: 'Which network should they choose?',
    a: 'Whichever matches their wallet. If they\'re not sure, they should check their wallet first — the network must be the same on both sides or the payment will fail.'
  },
  {
    q: 'What if the customer doesn\'t have a crypto wallet?',
    a: 'They\'ll need a wallet app like VALR, Luno or MetaMask to pay this way.'
  },
  {
    q: 'Will they be charged in fiat or crypto?',
    a: 'They pay in crypto, but the amount is locked to the price shown on screen. You receive funds in your desired settlement option — fiat or stablecoin (Rands, for example).'
  },
  {
    q: 'How long does a payment take?',
    a: 'Usually under a minute — you\'ll see a green "Payment Successful" screen when it\'s done. Bitcoin can take up to 30 minutes depending on network fees.'
  },
  {
    q: 'When can I release the goods?',
    a: 'Only once you see the green "Payment Successful" screen. No green means no payment has arrived yet.'
  }
]

const downloads = [
  {
    title: 'Ezeebit User Guide',
    desc: 'Step-by-step instructions for accepting crypto payments on the ePOS, including accepted networks and the rules to follow for each.',
    url: '/Ezeebit_User_Guide.pdf',
    icon: <FileText className="w-6 h-6" />
  },
  {
    title: 'Welcome Pack',
    desc: 'Everything you need to set up your Merchant Portal and Ezeebit Pay — from portal login and VAT setup to creating your store and payment QR code.',
    url: '/Welcome_Pack.pdf',
    icon: <Book className="w-6 h-6" />
  }
]

// Flat, maintainable search index built from the section data above.
const searchIndex: { tab: TabId; title: string; text: string }[] = [
  ...accountSteps.map((s, i) => ({ tab: 'getting-started' as TabId, title: `Create your account · Step ${i + 1}`, text: s })),
  ...portalSteps.map((s) => ({ tab: 'getting-started' as TabId, title: `Portal setup · ${s.title}`, text: s.body })),
  ...qrSteps.map((s, i) => ({ tab: 'getting-started' as TabId, title: `Payment QR code · Step ${i + 1}`, text: s })),
  ...paymentFlows.flatMap((f) =>
    f.steps.map((s) => ({ tab: 'payments' as TabId, title: `${f.label} · ${s.title}`, text: s.body }))
  ),
  ...paymentMethods.map((m) => ({
    tab: 'payments' as TabId,
    title: m.ticker ? `${m.name} (${m.ticker})` : m.name,
    text: `Accepted payment method${m.tags?.length ? ` · ${m.tags.join(', ')}` : ''}`
  })),
  ...goldenRules.map((r) => ({ tab: 'payments' as TabId, title: 'Golden rule', text: r })),
  ...basics.map((b) => ({ tab: 'basics' as TabId, title: b.term, text: b.body })),
  ...faqs.map((f) => ({ tab: 'faq' as TabId, title: f.q, text: f.a })),
  ...downloads.map((d) => ({ tab: 'downloads' as TabId, title: d.title, text: d.desc }))
]

const tabLabel = (id: TabId) => TABS.find((t) => t.id === id)?.label ?? ''

const StepCircle = ({ n }: { n: number }) => (
  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 text-white font-bold flex items-center justify-center shadow-md">
    {n}
  </div>
)

const MethodBadge = ({ method }: { method: PaymentMethod }) => {
  if (method.logo) {
    return (
      <div className="w-12 h-12 rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center">
        <img src={method.logo} alt={method.name} className="w-8 h-8 object-contain" />
      </div>
    )
  }
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-bold"
      style={{ backgroundColor: method.color }}
    >
      {(method.ticker ?? method.name).slice(0, 3)}
    </div>
  )
}

const UserManual = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<TabId>('getting-started')
  const [activeFlow, setActiveFlow] = useState<FlowId>('epos')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const currentFlow = paymentFlows.find((f) => f.id === activeFlow) ?? paymentFlows[0]

  const query = searchTerm.trim().toLowerCase()
  const isSearching = query.length > 0

  const results = useMemo(() => {
    if (!isSearching) return []
    return searchIndex.filter(
      (item) => item.title.toLowerCase().includes(query) || item.text.toLowerCase().includes(query)
    )
  }, [query, isSearching])

  const goToTab = (id: TabId) => {
    setSearchTerm('')
    setActiveTab(id)
  }

  return (
    <>
      <SEO
        title="User Manual"
        description="Step-by-step guides for Ezeebit merchants: set up your Merchant Portal, accept crypto payments in-store, understand crypto basics, and find answers fast."
        canonicalUrl="/resources/user-manual"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="overflow-hidden -mt-20"
      >
        {/* Hero Section */}
        <section className="relative flex items-center gradient-bg pt-40 pb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
          <div className="container-custom relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
                User <span className="text-gradient">manual</span>
              </h1>
              <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
                Everything you need to set up Ezeebit and accept crypto payments with confidence —
                no technical background required.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search the manual… e.g. 'network', 'VAT', 'QR code'"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg bg-white"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sticky Tab Bar */}
        <section className="bg-white border-b border-neutral-200 sticky top-20 z-40">
          <div className="container-custom">
            <div className="flex gap-1 overflow-x-auto scrollbar-hide py-3">
              {TABS.map((tab) => {
                const active = !isSearching && tab.id === activeTab
                return (
                  <button
                    key={tab.id}
                    onClick={() => goToTab(tab.id)}
                    className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              {/* Search results */}
              {isSearching && (
                <div>
                  <p className="text-neutral-600 mb-6">
                    {results.length} result{results.length === 1 ? '' : 's'} for{' '}
                    <span className="font-semibold text-neutral-900">"{searchTerm}"</span>
                  </p>
                  {results.length === 0 ? (
                    <div className="text-center py-16">
                      <HelpCircle className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">No matches found</h3>
                      <p className="text-neutral-600">
                        Try a different term, or{' '}
                        <Link to="/contact" className="text-primary-600 font-medium hover:underline">
                          contact support
                        </Link>
                        .
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {results.map((r, i) => (
                        <button
                          key={i}
                          onClick={() => goToTab(r.tab)}
                          className="w-full text-left card p-5 hover:border-primary-200 transition-all"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <span className="badge badge-primary mb-2">{tabLabel(r.tab)}</span>
                              <h3 className="font-semibold text-neutral-900">{r.title}</h3>
                              <p className="text-sm text-neutral-600 mt-1 line-clamp-2">{r.text}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Getting Started */}
              {!isSearching && activeTab === 'getting-started' && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-14">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-neutral-900 mb-1">1. Create your account</h2>
                    <p className="text-neutral-600 mb-6">Sign up for an Ezeebit merchant account. Takes about 10 minutes.</p>
                    <div className="space-y-3">
                      {accountSteps.map((step, i) => (
                        <div key={i} className="flex items-start gap-4 card p-4">
                          <StepCircle n={i + 1} />
                          <p className="text-neutral-700 pt-2">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-display font-bold text-neutral-900 mb-1">2. Set up your Merchant Portal</h2>
                    <p className="text-neutral-600 mb-6">Four quick steps to get your business ready to transact.</p>
                    <div className="grid sm:grid-cols-2 gap-5">
                      {portalSteps.map((step, i) => (
                        <div key={i} className="card p-6 flex flex-col">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-11 h-11 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                              {step.icon}
                            </div>
                            <span className="badge badge-neutral">Step {i + 1}</span>
                          </div>
                          <h3 className="font-semibold text-neutral-900 mb-2">{step.title}</h3>
                          <p className="text-sm text-neutral-600 leading-relaxed">{step.body}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-display font-bold text-neutral-900 mb-1">3. Create your payment QR code</h2>
                    <p className="text-neutral-600 mb-6">Generate the in-store QR code your customers will scan to pay.</p>
                    <div className="space-y-3">
                      {qrSteps.map((step, i) => (
                        <div key={i} className="flex items-start gap-4 card p-4">
                          <StepCircle n={i + 1} />
                          <p className="text-neutral-700 pt-2">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Accepting Payments */}
              {!isSearching && activeTab === 'payments' && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-14">
                  <div className="rounded-2xl bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100 p-6 flex items-start gap-4">
                    <Banknote className="w-7 h-7 text-primary-600 flex-shrink-0 mt-0.5" />
                    <p className="text-neutral-700">
                      <span className="font-semibold text-neutral-900">
                        You get paid in your desired settlement option — fiat or stablecoin (Rands, for example).
                      </span>{' '}
                      Your customer pays in crypto and Ezeebit converts it automatically — the price stays locked to the
                      amount shown on screen. The whole thing takes about 30 seconds.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-display font-bold text-neutral-900 mb-1">The payment journey</h2>
                    <p className="text-neutral-600 mb-5">Pick how you're accepting payment — each flow is a little different.</p>

                    {/* Flow selector */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {paymentFlows.map((flow) => {
                        const active = flow.id === activeFlow
                        return (
                          <button
                            key={flow.id}
                            onClick={() => setActiveFlow(flow.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
                              active
                                ? 'bg-primary-50 border-primary-300 text-primary-700 shadow-sm'
                                : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
                            }`}
                          >
                            {flow.icon}
                            {flow.label}
                          </button>
                        )
                      })}
                    </div>

                    <p className="text-sm text-neutral-500 mb-6 flex items-center gap-2">
                      <span className="text-primary-600">{currentFlow.icon}</span>
                      {currentFlow.blurb}
                    </p>

                    <div className="space-y-3">
                      {currentFlow.steps.map((step, i) => (
                        <div key={`${currentFlow.id}-${i}`} className="flex items-start gap-4 card p-5">
                          <StepCircle n={i + 1} />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-primary-600">{step.icon}</span>
                              <h3 className="font-semibold text-neutral-900">{step.title}</h3>
                            </div>
                            <p className="text-sm text-neutral-600 leading-relaxed">{step.body}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-display font-bold text-neutral-900 mb-1">Accepted payment methods</h2>
                    <p className="text-neutral-600 mb-6">Confirm the network matches on both sides before sending — it must be consistent.</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {paymentMethods.map((m) => (
                        <div key={m.name} className="card p-5 flex items-center gap-4">
                          <MethodBadge method={m} />
                          <div className="min-w-0">
                            <h3 className="font-semibold text-neutral-900">
                              {m.name}
                              {m.ticker && <span className="text-neutral-400 font-normal"> {m.ticker}</span>}
                            </h3>
                            {m.tags && m.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-1.5">
                                {m.tags.map((t) => (
                                  <span key={t} className="badge badge-neutral">{t}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-display font-bold text-neutral-900 mb-1">Golden rules</h2>
                    <p className="text-neutral-600 mb-6">Follow these every time you accept a crypto payment.</p>
                    <div className="space-y-3">
                      {goldenRules.map((rule, i) => (
                        <div key={i} className="flex items-start gap-3 card p-4">
                          <ShieldCheck className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
                          <p className="text-neutral-700">{rule}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Crypto Basics */}
              {!isSearching && activeTab === 'basics' && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="text-center mb-10">
                    <h2 className="text-2xl font-display font-bold text-neutral-900 mb-2">New to crypto? Don't worry.</h2>
                    <p className="text-neutral-600 max-w-2xl mx-auto">
                      The basics, explained like you're chatting over coffee. By the end you'll feel confident
                      using the ePOS to accept crypto payments.
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {basics.map((b, i) => (
                      <div key={i} className="card p-6">
                        <div className="w-11 h-11 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                          {b.icon}
                        </div>
                        <h3 className="font-semibold text-neutral-900 mb-2">{b.term}</h3>
                        <p className="text-sm text-neutral-600 leading-relaxed">{b.body}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* FAQ */}
              {!isSearching && activeTab === 'faq' && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="text-center mb-10">
                    <h2 className="text-2xl font-display font-bold text-neutral-900 mb-2">Quick cheat sheet</h2>
                    <p className="text-neutral-600 max-w-2xl mx-auto">What your customers might ask — and how to answer.</p>
                  </div>
                  <div className="space-y-3">
                    {faqs.map((faq, i) => (
                      <div key={i} className="card overflow-hidden">
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-full flex items-center justify-between gap-4 p-5 text-left"
                        >
                          <span className="font-semibold text-neutral-900">{faq.q}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform duration-200 ${
                              openFaq === i ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {openFaq === i && (
                          <div className="px-5 pb-5 -mt-1 text-neutral-600 leading-relaxed">{faq.a}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Downloads */}
              {!isSearching && activeTab === 'downloads' && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="text-center mb-10">
                    <h2 className="text-2xl font-display font-bold text-neutral-900 mb-2">Downloadable guides</h2>
                    <p className="text-neutral-600 max-w-2xl mx-auto">Keep these printable PDFs at your counter for quick reference.</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {downloads.map((d, i) => (
                      <div key={i} className="card p-6 flex flex-col">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                            {d.icon}
                          </div>
                          <h3 className="text-lg font-semibold text-neutral-900">{d.title}</h3>
                        </div>
                        <p className="text-sm text-neutral-600 flex-1 mb-6 leading-relaxed">{d.desc}</p>
                        <a
                          href={d.url}
                          download
                          className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                        >
                          <Download className="w-5 h-5 mr-2" />
                          Download PDF
                        </a>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Need More Help */}
        <section className="section-padding bg-primary-600 text-white">
          <div className="container-custom text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">Still need a hand?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                When in doubt, it's always better to ask than to guess. Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Link
                  to="/contact"
                  className="bg-white text-primary-600 hover:bg-neutral-100 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center flex-1"
                >
                  Contact Support
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/resources/faq"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center flex-1"
                >
                  View FAQ
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  )
}

export default UserManual
