import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Code, ExternalLink, Copy,
  Terminal, Webhook, Key, Shield, Zap, CheckCircle,
  Globe, Database, Wallet, Send, Store,
  Fingerprint, Wrench
} from 'lucide-react'
import SEO from '../components/SEO'

const DOCS = 'https://docs.ezeebit.com'

const Developers = () => {
  const [activeTab, setActiveTab] = useState('new-order')
  const [environment, setEnvironment] = useState<'live' | 'uat'>('uat')
  const [copiedCode, setCopiedCode] = useState('')

  const baseUrls = {
    live: 'https://api.ezeebit.com/open/api/v1',
    uat: 'https://uat-api.ezeebit.com/open/api/v1'
  }

  // Where the paymentLink we return points, per environment.
  const checkoutHosts = {
    live: 'https://payment.ezeebit.com',
    uat: 'https://uat-payment.ezeebit.com'
  }

  const apiEndpoints = {
    'new-order': {
      title: 'New Order',
      product: 'Payment Gateway',
      inbound: false,
      method: 'POST',
      endpoint: '/newOrder',
      docs: `${DOCS}/payment-gateway/new-order`,
      description: 'Create a payment order and get the hosted checkout link to send your customer to.',
      curl: `curl -X POST ${baseUrls[environment]}/newOrder \\
  -H "Content-Type: application/json" \\
  -H "Ezeebit-Certificate-SN: YOUR_API_KEY" \\
  -H "Ezeebit-Timestamp: 1624459200000" \\
  -H "Ezeebit-Nonce: 550e8400e29b41d4a716446655440000" \\
  -H "Ezeebit-Signature: A1B2C3D4E5F6..." \\
  -d '{
    "amount": 20.00,
    "tradeOrderNo": "1717581234-595333",
    "storeNumber": "635428229",
    "webHookUrl": "https://yoursite.com/webhooks/ezeebit",
    "redirectUrl": "https://yoursite.com/order/complete"
  }'`,
      javascript: `// New Order - JavaScript/Node.js
const body = {
  amount: 20.00,
  tradeOrderNo: '1717581234-595333', // must be unique - a repeat returns 10010
  storeNumber: '635428229',
  webHookUrl: 'https://yoursite.com/webhooks/ezeebit',
  redirectUrl: 'https://yoursite.com/order/complete'
}

const { headers, rawBody } = signedHeaders(body)

const res = await fetch('${baseUrls[environment]}/newOrder', {
  method: 'POST',
  headers,
  body: rawBody
})

const { code, msg, data } = await res.json()
if (code !== 200) throw new Error(msg)

// Keep the payId - it is what you query the order with.
await saveOrder({ payId: data.payId })
redirect(data.paymentLink)`,
      response: `{
  "code": 200,
  "msg": "success",
  "data": {
    "payId": "656908f833d54bee9b83db467741694e",
    "paymentLink": "${checkoutHosts[environment]}/pay/656908f8...",
    "currency": "ZAR",
    "amount": "20.00"
  }
}`
    },
    'query-order': {
      title: 'Query Order',
      product: 'Payment Gateway',
      inbound: false,
      method: 'POST',
      endpoint: '/queryOrder',
      docs: `${DOCS}/payment-gateway/query-order`,
      description: 'Read the current state of one order by payId. Treat the webhook as the fast path and this as the source of truth.',
      curl: `curl -X POST ${baseUrls[environment]}/queryOrder \\
  -H "Content-Type: application/json" \\
  -H "Ezeebit-Certificate-SN: YOUR_API_KEY" \\
  -H "Ezeebit-Timestamp: 1624459200000" \\
  -H "Ezeebit-Nonce: 550e8400e29b41d4a716446655440000" \\
  -H "Ezeebit-Signature: A1B2C3D4E5F6..." \\
  -d '{
    "payId": "656908f833d54bee9b83db467741694e"
  }'`,
      javascript: `// Query Order - JavaScript/Node.js
// Note: you query by payId, not by your own tradeOrderNo.
const body = { payId: '656908f833d54bee9b83db467741694e' }

const { headers, rawBody } = signedHeaders(body)

const res = await fetch('${baseUrls[environment]}/queryOrder', {
  method: 'POST',
  headers,
  body: rawBody
})

const { code, msg, data } = await res.json()
if (code !== 200) throw new Error(msg) // 10009 = no order matches this payId

// initial | pending | success | invalid | expired
if (data.status === 'success') {
  await fulfil(data.tradeOrderNo, data.payInfo.txHash)
}`,
      response: `{
  "code": 200,
  "msg": "success",
  "data": {
    "payId": "b94a16a59d9c41a19e2aad8a925a7aa4",
    "tradeOrderNo": "EB-00018",
    "status": "success",
    "currency": "ZAR",
    "amount": "17.17",
    "createTime": 1772806863563,
    "payInfo": {
      "paySymbol": "USDT",
      "gateway": "Bsc",
      "payAmount": "1.04390000",
      "txHash": "0xb4e2ea9c463f9e2062e8cf0d7f38...",
      "fromAddress": "0x9030d15e4dc3520421cd55c7b6...",
      "matchType": "AmountMatch"
    }
  }
}`
    },
    'payout-order': {
      title: 'Payout Order',
      product: 'Payout Gateway',
      inbound: false,
      method: 'POST',
      endpoint: '/consumerPayout/newOrder',
      docs: `${DOCS}/payout-gateway/new-order`,
      description: 'Create a consumer payout order. We reserve the fiat and return a link your customer completes themselves.',
      curl: `curl -X POST ${baseUrls[environment]}/consumerPayout/newOrder \\
  -H "Content-Type: application/json" \\
  -H "Ezeebit-Certificate-SN: YOUR_API_KEY" \\
  -H "Ezeebit-Timestamp: 1624459200000" \\
  -H "Ezeebit-Nonce: 550e8400e29b41d4a716446655440000" \\
  -H "Ezeebit-Signature: A1B2C3D4E5F6..." \\
  -d '{
    "storeNum": "ST0001482",
    "fiatAmount": 1500.00,
    "fiatCurrency": "ZAR",
    "externalReference": "PAYOUT-88213",
    "redirectUrl": "https://yoursite.com/payout/done",
    "webhookUrl": "https://yoursite.com/webhooks/payouts"
  }'`,
      javascript: `// Payout Order - JavaScript/Node.js
// Heads up: this product uses storeNum and fiatAmount,
// where the Payment Gateway uses storeNumber and amount.
const body = {
  storeNum: 'ST0001482',
  fiatAmount: 1500.00,
  fiatCurrency: 'ZAR',
  externalReference: 'PAYOUT-88213',
  redirectUrl: 'https://yoursite.com/payout/done',
  webhookUrl: 'https://yoursite.com/webhooks/payouts'
}

const { headers, rawBody } = signedHeaders(body)

const res = await fetch('${baseUrls[environment]}/consumerPayout/newOrder', {
  method: 'POST',
  headers,
  body: rawBody
})

const { code, msg, data } = await res.json()
if (code !== 200) throw new Error(msg) // 10086 = insufficient balance

// The handoff token lives 5 minutes - redirect promptly.
redirect(data.payoutUrl)`,
      response: `{
  "code": 200,
  "msg": "success",
  "data": {
    "orderNo": "PO2026082600001482",
    "payoutUrl": "https://payout.ezeebit.com/payout?t=eyJhbGciOi...",
    "expiresAt": 1756112400000,
    "redirectUrl": "https://yoursite.com/payout/done",
    "storeNum": "ST0001482",
    "subMerchantNum": "SM0043",
    "walletAddress": null,
    "externalUserId": null
  }
}`
    },
    'list-wallets': {
      title: 'List Wallets',
      product: 'Wallets',
      inbound: false,
      method: 'POST',
      endpoint: '/merchant/wallet/list',
      docs: `${DOCS}/wallets-and-withdrawal/list-wallets`,
      description: 'List the FIAT and USDT wallets for the authenticated merchant, and the walletId values every other wallet call needs.',
      curl: `curl -X POST ${baseUrls[environment]}/merchant/wallet/list \\
  -H "Content-Type: application/json" \\
  -H "Ezeebit-Certificate-SN: YOUR_API_KEY" \\
  -H "Ezeebit-Timestamp: 1624459200000" \\
  -H "Ezeebit-Nonce: 550e8400e29b41d4a716446655440000" \\
  -H "Ezeebit-Signature: A1B2C3D4E5F6..." \\
  -d '{}'`,
      javascript: `// List Wallets - JavaScript/Node.js
// No fields required, but the empty body is still signed.
const { headers, rawBody } = signedHeaders({})

const res = await fetch('${baseUrls[environment]}/merchant/wallet/list', {
  method: 'POST',
  headers,
  body: rawBody
})

const { code, msg, data } = await res.json()
if (code !== 200) throw new Error(msg)

// data is the array itself. Balances are strings -
// parse them as decimals, never as floats.
for (const wallet of data) {
  console.log(wallet.type, wallet.currency, wallet.balance)
}`,
      response: `{
  "code": 200,
  "msg": "success",
  "data": [
    {
      "walletId": "9865391b-3f2a-4a2b-8c3d-abcdef123456",
      "type": "FIAT",
      "currency": "ZAR",
      "balance": "1200.00"
    },
    {
      "walletId": "9864fa36-7e1c-4d9e-a1b2-987654321fed",
      "type": "CRYPTO",
      "currency": "USDT",
      "balance": "125.50"
    }
  ]
}`
    },
    'create-store': {
      title: 'Create Store',
      product: 'Merchant',
      inbound: false,
      method: 'POST',
      endpoint: '/store/add',
      docs: `${DOCS}/merchant/create-store`,
      description: 'Create a store under a sub-merchant. Orders and payouts are always created against a store number.',
      curl: `curl -X POST ${baseUrls[environment]}/store/add \\
  -H "Content-Type: application/json" \\
  -H "Ezeebit-Certificate-SN: YOUR_API_KEY" \\
  -H "Ezeebit-Timestamp: 1624459200000" \\
  -H "Ezeebit-Nonce: 550e8400e29b41d4a716446655440000" \\
  -H "Ezeebit-Signature: A1B2C3D4E5F6..." \\
  -d '{
    "storeName": "My Crypto Store",
    "physicalAddress": "12 Long Street, Cape Town",
    "phoneNumber": "3111145",
    "email": "store.manager@yoursite.com",
    "feeAndTaxId": "c87522a0355b41788f2dbab17dcc97e2",
    "subMerchantNum": "9706541042"
  }'`,
      javascript: `// Create Store - JavaScript/Node.js
const body = {
  storeName: 'My Crypto Store',
  physicalAddress: '12 Long Street, Cape Town',
  phoneNumber: '3111145',
  email: 'store.manager@yoursite.com',
  // Get this from /feeAndTax/query first - it is required.
  feeAndTaxId: 'c87522a0355b41788f2dbab17dcc97e2',
  subMerchantNum: '9706541042'
}

const { headers, rawBody } = signedHeaders(body)

const res = await fetch('${baseUrls[environment]}/store/add', {
  method: 'POST',
  headers,
  body: rawBody
})

const { code, msg, data } = await res.json()
if (code !== 200) throw new Error(msg) // 10011 = duplicate store name

// data is simply true. Read the new store number back
// from /store/query or the Merchant Portal.
console.log('Store created:', data)`,
      response: `{
  "code": 200,
  "msg": "success",
  "data": true
}`
    },
    'order-webhook': {
      title: 'Order Webhook',
      product: 'Webhooks',
      inbound: true,
      method: 'POST',
      endpoint: 'your webHookUrl',
      docs: `${DOCS}/payment-gateway/order-webhooks`,
      description: 'A signed notification we POST to your webHookUrl on every status change. Payout and withdrawal webhooks work the same way \u2014 an unverified callback is not proof of payment.',
      curl: `POST /webhooks/ezeebit HTTP/1.1
Host: yoursite.com
Content-Type: application/json
Ezeebit-Timestamp: 1784878207800
Ezeebit-Nonce: 550e8400e29b41d4a716446655440000
Ezeebit-Certificate-SN: YOUR_API_KEY
Ezeebit-Signature: <base64 SHA256withRSA>

<JSON payload \u2014 shown on the right>`,
      javascript: `// Order Webhook - verify it before you trust it
import crypto from 'node:crypto'

// Note the asymmetry: you sign requests with HMAC-SHA512,
// we sign webhooks with SHA256withRSA. Fetch the public key
// from POST /certificates, keyed by Ezeebit-Certificate-SN.
app.post(
  '/webhooks/ezeebit',
  express.raw({ type: 'application/json' }),
  (req, res) => {
    // Verify the raw bytes - re-serialising the JSON breaks the signature.
    const rawBody = req.body.toString('utf8')
    const timestamp = req.headers['ezeebit-timestamp']
    const nonce = req.headers['ezeebit-nonce']
    const signature = req.headers['ezeebit-signature']

    const signed = timestamp + '\\n' + nonce + '\\n' + rawBody + '\\n'

    const verified = crypto
      .createVerify('RSA-SHA256')
      .update(signed, 'utf8')
      .verify(ezeebitPublicKey, Buffer.from(signature, 'base64'))

    if (!verified) return res.sendStatus(400)

    // Ack fast, process after. Deliveries retry and can arrive
    // twice, so deduplicate on payId and stay idempotent.
    res.sendStatus(200)

    const { data } = JSON.parse(rawBody)
    // initial | pending | success | invalid | expired
    if (data.status === 'success') void fulfil(data.tradeOrderNo)
  }
)`,
      response: `{
  "id": "b176563a2a2b4a08a5d250e6f6c8d9d7",
  "type": "PAY",
  "status": "success",
  "data": {
    "payId": "b176563a2a2b4a08a5d250e6f6c8d9d7",
    "tradeOrderNo": "EB-000093",
    "status": "success",
    "currency": "ZAR",
    "amount": "16.50",
    "createTime": 1784878061704,
    "payInfo": {
      "paySymbol": "USDT",
      "payAmount": "1.00400000",
      "gateway": "Bsc",
      "txHash": "0x968082ff67a02bff15b...",
      "matchType": "AmountMatch",
      "receivedLegalAmount": "16.50",
      "differenceLegalAmount": "0",
      "paymentDiscrepancyReason": "no_discrepancy"
    }
  }
}`
    }
  }



  const products = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Payment Gateway",
      count: "3 endpoints",
      description: "Hosted checkout, hedged on arrival, settled to your bank the next business day.",
      href: `${DOCS}/payment-gateway/overview`
    },
    {
      icon: <Send className="w-6 h-6" />,
      title: "Payout Gateway",
      count: "2 endpoints",
      description: "Pay customers out in crypto from your fiat balance, completed in our widget.",
      href: `${DOCS}/payout-gateway/overview`
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Wallets & Withdrawal",
      count: "13 endpoints",
      description: "Balances, ledger, ZAR and USDT conversion, fiat and crypto withdrawals.",
      href: `${DOCS}/wallets-and-withdrawal/overview`
    },
    {
      icon: <Store className="w-6 h-6" />,
      title: "Merchant & Stores",
      count: "8 endpoints",
      description: "Sub-merchants, stores, fees and taxes, transaction history.",
      href: `${DOCS}/merchant/overview`
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Services",
      count: "2 endpoints",
      description: "Settlement quotes and payer address screening.",
      href: `${DOCS}/services/screen-payer-address`
    }
  ]

  const quickStartSteps = [
    {
      title: "Create an API key",
      description: "Save the secret key when it is shown — you cannot retrieve it later.",
      icon: <Key className="w-6 h-6" />
    },
    {
      title: "Get a store number",
      description: "Every order is created against a store.",
      icon: <Store className="w-6 h-6" />
    },
    {
      title: "Sign your request",
      description: "HMAC-SHA512 over the timestamp, nonce and body.",
      icon: <Fingerprint className="w-6 h-6" />
    },
    {
      title: "Create an order",
      description: "POST /newOrder, then redirect to the paymentLink.",
      icon: <Code className="w-6 h-6" />
    },
    {
      title: "Verify the webhook",
      description: "Check the RSA signature before treating it as payment.",
      icon: <Webhook className="w-6 h-6" />
    }
  ]




  const supportedAssets = [
    { name: 'Bitcoin', symbol: 'BTC', network: 'Mainnet', asset: 'BTC', description: 'Bitcoin network' },
    { name: 'Ethereum', symbol: 'ETH', network: 'ERC20', asset: 'ETH', description: 'Ethereum network' },
    { name: 'Tether', symbol: 'USDT', network: 'ERC20 | TRC20 | BEP20 | SPL', asset: 'USDT', description: 'USD-backed stablecoin' },
    { name: 'Binance Coin', symbol: 'BNB', network: 'BEP20', asset: 'BNB', description: 'Binance Smart Chain' },
    { name: 'USD Coin', symbol: 'USDC', network: 'ERC20 | SPL', asset: 'USDC', description: 'USD-backed stablecoin' },
    { name: 'PAX Gold', symbol: 'PAXG', network: 'ERC20', asset: 'PAXG', description: 'Gold-backed token' },
    { name: 'Dai', symbol: 'DAI', network: 'BEP20', asset: 'DAI', description: 'Decentralized stablecoin' }
  ]

  const currentEndpoint = apiEndpoints[activeTab as keyof typeof apiEndpoints]

  const copyCode = async (code: string, tab: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = code
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }
      setCopiedCode(tab)
      setTimeout(() => setCopiedCode(''), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }


  return (
    <>
      <SEO
        title="API Documentation for Developers"
        description="Integrate Ezeebit crypto payments, payouts and wallet infrastructure with one API and one set of credentials. Signed REST endpoints, hosted checkout, and signed webhooks."
        canonicalUrl="/developers"
      />
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden -mt-20"
    >
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center gradient-bg pt-40">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
                Ezeebit <span className="text-gradient">API</span> documentation
              </h1>
              <p className="text-xl text-neutral-600 mb-8">
                Accept crypto, hold and convert balances, and pay your customers out — from one API
                and one set of credentials.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
                <a
                  href="https://merchant.ezeebit.com/#/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center justify-center"
                >
                  Get API Keys
                  <Key className="w-5 h-5 ml-2" />
                </a>
                <a href={DOCS} target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center justify-center">
                  Full Documentation
                  <ExternalLink className="w-5 h-5 ml-2" />
                </a>
              </div>

              {/* Environment Toggle */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6">
                <span className="text-sm font-medium text-neutral-700">Environment:</span>
                <div className="flex bg-neutral-100 rounded-lg p-1">
                  <button
                    onClick={() => setEnvironment('uat')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      environment === 'uat'
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    UAT (Testing)
                  </button>
                  <button
                    onClick={() => setEnvironment('live')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      environment === 'live'
                        ? 'bg-green-500 text-white shadow-sm'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Live (Production)
                  </button>
                </div>
              </div>

              <div className="block lg:hidden mt-6">
                <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-neutral-400">API Terminal</span>
                  </div>
                  <div className="space-y-2">
                    <div className="break-all"><span className="text-blue-400">$</span> curl -X POST {baseUrls[environment]}/newOrder</div>
                    <div className="text-neutral-400">&#10003; &#123;"code": 200, "msg": "success"&#125;</div>
                    <div><span className="text-blue-400">$</span> <span className="animate-pulse">|</span></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-6 text-sm text-neutral-500 mt-6">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-primary-500 mr-2" />
                  Signed REST API
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-primary-500 mr-2" />
                  HMAC-SHA512
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-primary-500 mr-2" />
                  Signed Webhooks
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative hidden lg:block"
            >
              <div className="bg-gray-900 rounded-lg p-6 text-green-400 font-mono text-sm overflow-x-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-neutral-400">API Terminal</span>
                </div>
                <div className="space-y-2">
                  <div className="break-all"><span className="text-blue-400">$</span> curl -X POST {baseUrls[environment]}/newOrder</div>
                  <div className="text-neutral-400">&#10003; &#123;"code": 200, "msg": "success"&#125;</div>
                  <div className="text-neutral-400">&#8618; paymentLink: https://pay.ezeebit.com/...</div>
                  <div><span className="text-blue-400">$</span> <span className="animate-pulse">|</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Quick start guide
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              From an empty portal account to a verified payment notification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {quickStartSteps.map((step, index) => (
              <div
                key={step.title}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-500">
                  {step.icon}
                </div>
                <div className="text-sm font-semibold text-primary-500 mb-2">STEP {index + 1}</div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-neutral-600 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              One API, five surfaces
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Twenty-eight endpoints, one integration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <a
                key={product.title}
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 will-change-transform group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-500">
                    {product.icon}
                  </div>
                  <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
                    {product.count}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3 flex items-center">
                  {product.title}
                  <ExternalLink className="w-4 h-4 ml-2 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-neutral-600">
                  {product.description}
                </p>
              </a>
            ))}

            <div className="card p-6 border-dashed border-neutral-200 bg-transparent shadow-none">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-400">
                  <Wrench className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-neutral-400 bg-neutral-100 px-2 py-1 rounded">
                  In build
                </span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-500 mb-3">
                More coming soon
              </h3>
              <p className="text-neutral-500">
                New surfaces are in development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* API Examples */}
      <section className="py-8 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-8 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              API examples
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              One call from each product area, plus the webhook we send back to you.
            </p>
          </div>

          {/* Endpoint Tabs */}
          <div className="flex justify-center mb-6 lg:mb-8">
            <div className="flex bg-neutral-100 rounded-lg p-1 overflow-x-auto max-w-full">
              {Object.entries(apiEndpoints).map(([key, endpoint]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-3 py-2 lg:px-4 lg:py-3 rounded-md font-medium transition-all whitespace-nowrap text-sm lg:text-base ${
                    activeTab === key
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {endpoint.title}
                </button>
              ))}
            </div>
          </div>

          {/* Code Examples */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex flex-wrap items-center justify-center gap-3 mb-4 lg:mb-6">
              <span className="px-2 py-1 bg-green-600 text-white rounded text-xs font-medium">
                {currentEndpoint.method}
              </span>
              <code className="text-sm font-mono text-neutral-700 bg-neutral-50 border border-neutral-200 px-3 py-1 rounded break-all">
                {currentEndpoint.endpoint}
              </code>
              <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
                {currentEndpoint.product}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
              {/* Request */}
              <div className="card p-0 overflow-hidden min-w-0 bg-gray-800">
                <div className="text-white p-3 lg:p-4 min-w-0 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Terminal className="w-5 h-5 text-neutral-400" />
                      <span className="text-gray-300">
                        {currentEndpoint.inbound ? 'From Ezeebit' : 'Request'}
                      </span>
                    </div>
                    <button
                      onClick={() => copyCode(currentEndpoint.curl, 'request')}
                      className="flex items-center text-neutral-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      {copiedCode === 'request' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="space-y-3 lg:space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">
                        {currentEndpoint.inbound ? 'Incoming request' : 'cURL'}
                      </h4>
                      <pre className="text-xs lg:text-sm overflow-x-auto whitespace-pre-wrap break-all bg-gray-900 p-2 lg:p-3 rounded">
                        <code>{currentEndpoint.curl}</code>
                      </pre>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">JavaScript</h4>
                      <pre className="text-xs lg:text-sm overflow-x-auto whitespace-pre-wrap break-all bg-gray-900 p-2 lg:p-3 rounded">
                        <code>{currentEndpoint.javascript}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response */}
              <div className="card p-0 overflow-hidden min-w-0 bg-gray-800">
                <div className="text-white p-3 lg:p-4 min-w-0 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">
                        {currentEndpoint.inbound ? 'Payload' : 'Response'}
                      </span>
                      <span className="px-2 py-1 bg-green-600 rounded text-xs font-medium">
                        {currentEndpoint.inbound ? 'signed' : 'code 200'}
                      </span>
                    </div>
                    <button
                      onClick={() => copyCode(currentEndpoint.response, 'response')}
                      className="flex items-center text-neutral-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      {copiedCode === 'response' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="text-xs lg:text-sm overflow-x-auto whitespace-pre-wrap break-all bg-gray-900 p-2 lg:p-3 rounded">
                    <code>{currentEndpoint.response}</code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="mt-4 lg:mt-6 p-3 lg:p-4 bg-blue-50 rounded-lg flex flex-wrap items-baseline gap-x-2">
              <p className="text-blue-800">
                <strong>{currentEndpoint.title}:</strong> {currentEndpoint.description}
              </p>
              <a
                href={currentEndpoint.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline hover:text-blue-900 whitespace-nowrap text-sm"
              >
                Read the reference
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Merchant hierarchy */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
                Where a store number comes from
              </h2>
              <p className="text-lg text-neutral-600 mb-4">
                Orders and payouts are always created against a <strong>store</strong>, and
                attributed up the tree from there.
              </p>
              <p className="text-neutral-600 mb-6">
                Platforms get a sub-merchant per business they serve, all under one merchant
                account and one integration.
              </p>
              <a
                href={`${DOCS}/merchant/overview`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 font-medium hover:text-primary-600 inline-flex items-center"
              >
                Merchant &amp; store management
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>

            <div
              className="card p-6"
            >
              <div className="space-y-2">
                <div className="flex items-center p-3 bg-primary-50 rounded-lg">
                  <Database className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-neutral-900 text-sm">Merchant</div>
                    <div className="text-xs text-neutral-500">Your account, your credentials, your KYB</div>
                  </div>
                </div>
                <div className="ml-4 pl-4 border-l-2 border-neutral-200 space-y-2 pt-2">
                  <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
                    <Globe className="w-5 h-5 text-neutral-500 mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-neutral-900 text-sm">Sub-merchant</div>
                      <div className="text-xs text-neutral-500">One per business you serve</div>
                    </div>
                  </div>
                  <div className="ml-4 pl-4 border-l-2 border-neutral-200 pt-2">
                    <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
                      <Store className="w-5 h-5 text-neutral-500 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-neutral-900 text-sm">Store</div>
                        <div className="text-xs text-neutral-500">
                          The <code className="font-mono">storeNumber</code> every order needs
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Assets */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Supported cryptos & networks
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Accept payments in multiple cryptocurrencies across different networks.
            </p>
          </div>

          <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] md:grid-cols-[repeat(4,minmax(0,1fr))] gap-4 auto-rows-fr">
            {supportedAssets.slice(0, 7).map((asset) => (
              <div
                key={`${asset.asset}-${asset.network}`}
                className="card p-4 flex flex-col items-center justify-center space-y-1 text-center overflow-hidden"
              >
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <img
                    src={`/${asset.symbol.toLowerCase()}-logo.svg`}
                    alt={`${asset.symbol} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center w-full overflow-hidden">
                  <div className="font-semibold text-neutral-900 text-xs leading-tight">{asset.asset}</div>
                  <div className="text-[10px] text-neutral-500 leading-tight truncate max-w-full">{asset.network}</div>
                  <div className="text-[10px] text-neutral-400 truncate max-w-full">{asset.description}</div>
                </div>
              </div>
            ))}

            <div
              className="card p-4 flex flex-col items-center justify-center space-y-1 text-center overflow-hidden"
            >
              <div className="text-center">
                <div className="font-semibold text-neutral-600 text-xs leading-tight">More coming soon</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <div
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
              Ready to start building?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Create a UAT account, generate a key, and make your first signed call.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://merchant.ezeebit.com/#/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-600 hover:bg-neutral-100 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Get API Keys
                <Key className="w-5 h-5 ml-2 inline" />
              </a>
              <a
                href={DOCS}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                Full Documentation
                <ExternalLink className="w-5 h-5 ml-2 inline" />
              </a>
            </div>
          </div>
        </div>
      </section>
      </motion.div>
    </>
  )
}

export default Developers
