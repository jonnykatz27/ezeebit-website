import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Code, ExternalLink, Copy,
  Terminal, Webhook, Key, Shield, Zap, CheckCircle,
  Globe, Database, AlertCircle
} from 'lucide-react'
import SEO from '../components/SEO'

const Developers = () => {
  const [activeTab, setActiveTab] = useState('create-order')
  const [environment, setEnvironment] = useState<'live' | 'uat'>('uat')
  const [copiedCode, setCopiedCode] = useState('')

  const baseUrls = {
    live: 'https://api.ezeebit.com',
    uat: 'https://uat-ezeebit.com'
  }

  const apiEndpoints = {
    'create-order': {
      title: 'Create Order',
      method: 'POST',
      endpoint: '/create-order',
      description: 'Create a new crypto payment order with specified amount and currency',
      curl: `curl -X POST ${baseUrls[environment]}/create-order \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "merchant_id": "merchant_123",
    "amount": 100.00,
    "currency": "ZAR",
    "asset": "USDC",
    "network": "ERC20",
    "callback_url": "https://yoursite.com/webhook",
    "order_reference": "order_456"
  }'`,
      javascript: `// Create Order - JavaScript/Node.js
const response = await fetch('${baseUrls[environment]}/create-order', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    merchant_id: 'merchant_123',
    amount: 100.00,
    currency: 'ZAR',
    asset: 'USDC',
    network: 'ERC20',
    callback_url: 'https://yoursite.com/webhook',
    order_reference: 'order_456'
  })
});

const order = await response.json();
console.log('Order created:', order);`,
      python: `# Create Order - Python
import requests

url = '${baseUrls[environment]}/create-order'
headers = {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
}
data = {
    'merchant_id': 'merchant_123',
    'amount': 100.00,
    'currency': 'ZAR',
    'asset': 'USDC',
    'network': 'ERC20',
    'callback_url': 'https://yoursite.com/webhook',
    'order_reference': 'order_456'
}

response = requests.post(url, headers=headers, json=data)
order = response.json()
print('Order created:', order)`,
      response: `{
  "order_id": "ord_1234567890",
  "payment_address": "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
  "qr_code_url": "https://api.ezeebit.com/qr/ord_1234567890",
  "amount_crypto": "100.00",
  "amount_fiat": "100.00",
  "currency": "ZAR",
  "asset": "USDC",
  "network": "ERC20",
  "status": "pending",
  "expires_at": "2024-01-15T10:30:00Z"
}`
    },
    'get-order': {
      title: 'Get Order',
      method: 'GET',
      endpoint: '/order/{order_id}',
      description: 'Retrieve order details and current status',
      curl: `curl -X GET ${baseUrls[environment]}/order/ord_1234567890 \\
  -H "Authorization: Bearer your-api-key"`,
      javascript: `// Get Order - JavaScript/Node.js
const response = await fetch('${baseUrls[environment]}/order/ord_1234567890', {
  headers: {
    'Authorization': 'Bearer your-api-key'
  }
});

const order = await response.json();
console.log('Order status:', order);`,
      python: `# Get Order - Python
import requests

url = '${baseUrls[environment]}/order/ord_1234567890'
headers = {
    'Authorization': 'Bearer your-api-key'
}

response = requests.get(url, headers=headers)
order = response.json()
print('Order status:', order)`,
      response: `{
  "order_id": "ord_1234567890",
  "status": "completed",
  "amount_crypto": "100.00",
  "amount_fiat": "100.00",
  "currency": "ZAR",
  "asset": "USDC",
  "network": "ERC20",
  "transaction_hash": "0x1234...abcd",
  "created_at": "2024-01-15T10:00:00Z",
  "completed_at": "2024-01-15T10:05:00Z"
}`
    },
    'create-store': {
      title: 'Create Store',
      method: 'POST',
      endpoint: '/create-store',
      description: 'Create a new store for merchant management',
      curl: `curl -X POST ${baseUrls[environment]}/create-store \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "merchant_id": "merchant_123",
    "store_name": "My Crypto Store",
    "store_description": "Online electronics store",
    "callback_url": "https://mystore.com/webhook"
  }'`,
      javascript: `// Create Store - JavaScript/Node.js
const response = await fetch('${baseUrls[environment]}/create-store', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    merchant_id: 'merchant_123',
    store_name: 'My Crypto Store',
    store_description: 'Online electronics store',
    callback_url: 'https://mystore.com/webhook'
  })
});

const store = await response.json();
console.log('Store created:', store);`,
      python: `# Create Store - Python
import requests

url = '${baseUrls[environment]}/create-store'
headers = {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
}
data = {
    'merchant_id': 'merchant_123',
    'store_name': 'My Crypto Store',
    'store_description': 'Online electronics store',
    'callback_url': 'https://mystore.com/webhook'
}

response = requests.post(url, headers=headers, json=data)
store = response.json()
print('Store created:', store)`,
      response: `{
  "store_id": "store_789",
  "merchant_id": "merchant_123",
  "store_name": "My Crypto Store",
  "store_description": "Online electronics store",
  "status": "active",
  "created_at": "2024-01-15T10:00:00Z"
}`
    }
  }

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Payment Gateway API",
      description: "Create crypto payment orders and retrieve transaction certificates"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Merchant Management API",
      description: "Onboard stores, manage sub-merchants, and handle commissions"
    },
    {
      icon: <Webhook className="w-6 h-6" />,
      title: "Real-time Webhooks",
      description: "Instant notifications for payment events with signature verification"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Authentication",
      description: "JWT-based API authentication with comprehensive error handling"
    }
  ]

  const quickStartSteps = [
    {
      title: "Get API Credentials",
      description: "Obtain your API key from the merchant dashboard",
      icon: <Key className="w-6 h-6" />
    },
    {
      title: "Choose Environment",
      description: "Use UAT for testing, Live for production",
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: "Create Your First Order",
      description: "Make a POST request to create a crypto payment order",
      icon: <Code className="w-6 h-6" />
    },
    {
      title: "Handle Webhooks",
      description: "Set up webhook endpoints to receive payment notifications",
      icon: <Webhook className="w-6 h-6" />
    }
  ]

  const webhookEvents = [
    { event: 'order.created', description: 'New payment order has been created' },
    { event: 'order.pending', description: 'Payment is being processed on blockchain' },
    { event: 'order.completed', description: 'Payment has been successfully completed' },
    { event: 'order.failed', description: 'Payment has failed or expired' },
    { event: 'order.cancelled', description: 'Payment has been cancelled' }
  ]

  const errorCodes = [
    { code: '400', type: 'Bad Request', description: 'Invalid request parameters or missing required fields' },
    { code: '401', type: 'Unauthorized', description: 'Invalid or missing API key' },
    { code: '404', type: 'Not Found', description: 'Order or resource not found' },
    { code: '429', type: 'Rate Limited', description: 'Too many requests, please slow down' },
    { code: '500', type: 'Server Error', description: 'Internal server error, please retry' }
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

  const getCurrentCode = () => {
    const endpoint = apiEndpoints[activeTab as keyof typeof apiEndpoints]
    return {
      curl: endpoint.curl,
      javascript: endpoint.javascript,
      python: endpoint.python,
      response: endpoint.response
    }
  }

  return (
    <>
      <SEO
        title="API Documentation for Developers"
        description="Integrate Ezeebit stablecoin and crypto payments into your platform with our comprehensive API. Create orders, process payments, and handle webhooks with ease."
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
                Ezeebit <span className="text-gradient">API</span> Documentation
              </h1>
              <p className="text-xl text-neutral-600 mb-8">
                Integrate stablecoin and cryptocurrency payments with our comprehensive Payment Gateway and Merchant Management APIs.
                Built for developers, designed for scale.
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
                <a href="https://docs.ezeebit.com" target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center justify-center">
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
                    <div><span className="text-blue-400">$</span> curl -X POST {baseUrls[environment]}/create-order</div>
                    <div className="text-neutral-400">&#10003; Order created successfully</div>
                    <div><span className="text-blue-400">$</span> <span className="animate-pulse">|</span></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-6 text-sm text-neutral-500 mt-6">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-primary-500 mr-2" />
                  RESTful API
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-primary-500 mr-2" />
                  JWT Authentication
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-primary-500 mr-2" />
                  Webhook Support
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
                  <div><span className="text-blue-400">$</span> curl -X POST {baseUrls[environment]}/create-order</div>
                  <div className="text-neutral-400">&#10003; Order created successfully</div>
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
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Quick Start Guide
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Get up and running with the Ezeebit API in minutes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickStartSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-500">
                  {step.icon}
                </div>
                <div className="text-sm font-semibold text-primary-500 mb-2">STEP {index + 1}</div>
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

      {/* API Features */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Two Powerful APIs
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Everything you need for stablecoin and crypto payments and merchant management.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
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

      {/* API Examples */}
      <section className="py-8 lg:py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-8 lg:mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              API Examples
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Interactive examples for key API endpoints.
            </p>
          </motion.div>

          {/* Endpoint Tabs */}
          <div className="flex justify-center mb-6 lg:mb-8">
            <div className="flex bg-neutral-100 rounded-lg p-1 overflow-x-auto">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
              {/* Request */}
              <div className="card p-0 overflow-hidden min-w-0 bg-gray-800">
                <div className="text-white p-3 lg:p-4 min-w-0 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Terminal className="w-5 h-5 text-neutral-400" />
                      <span className="text-gray-300">Request</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        apiEndpoints[activeTab as keyof typeof apiEndpoints].method === 'POST' 
                          ? 'bg-green-600' : 'bg-blue-600'
                      }`}>
                        {apiEndpoints[activeTab as keyof typeof apiEndpoints].method}
                      </span>
                    </div>
                    <button
                      onClick={() => copyCode(getCurrentCode().curl, 'request')}
                      className="flex items-center text-neutral-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      {copiedCode === 'request' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="space-y-3 lg:space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">cURL</h4>
                      <pre className="text-xs lg:text-sm overflow-x-auto whitespace-pre-wrap break-all bg-gray-900 p-2 lg:p-3 rounded">
                        <code>{getCurrentCode().curl}</code>
                      </pre>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">JavaScript</h4>
                      <pre className="text-xs lg:text-sm overflow-x-auto whitespace-pre-wrap break-all bg-gray-900 p-2 lg:p-3 rounded">
                        <code>{getCurrentCode().javascript}</code>
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
                      <span className="text-gray-300">Response</span>
                      <span className="px-2 py-1 bg-green-600 rounded text-xs font-medium">200 OK</span>
                    </div>
                    <button
                      onClick={() => copyCode(getCurrentCode().response, 'response')}
                      className="flex items-center text-neutral-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      {copiedCode === 'response' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="text-xs lg:text-sm overflow-x-auto whitespace-pre-wrap break-all bg-gray-900 p-2 lg:p-3 rounded">
                    <code>{getCurrentCode().response}</code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="mt-4 lg:mt-6 p-3 lg:p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800">
                <strong>{apiEndpoints[activeTab as keyof typeof apiEndpoints].title}:</strong> {apiEndpoints[activeTab as keyof typeof apiEndpoints].description}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Supported Assets */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Supported Cryptos & Networks
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Accept payments in multiple cryptocurrencies across different networks.
            </p>
          </motion.div>

          <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] md:grid-cols-[repeat(4,minmax(0,1fr))] gap-4 auto-rows-fr">
            {supportedAssets.slice(0, 7).map((asset, index) => (
              <motion.div
                key={`${asset.asset}-${asset.network}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
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
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="card p-4 flex flex-col items-center justify-center space-y-1 text-center overflow-hidden"
            >
              <div className="text-center">
                <div className="font-semibold text-neutral-600 text-xs leading-tight">More coming soon</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Webhooks */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
                Webhook Events
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Receive real-time notifications for payment events. All webhooks include signature verification 
                and require a 200 OK response for acknowledgment.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="text-neutral-700">Automatic retry logic</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="text-neutral-700">HMAC signature verification</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="text-neutral-700">Delivery status monitoring</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="card p-6"
            >
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Available Events</h3>
              <div className="space-y-3">
                {webhookEvents.map((webhook) => (
                  <div key={webhook.event} className="flex items-start">
                    <code className="bg-neutral-100 px-2 py-1 rounded text-sm font-mono text-primary-500 mr-3 mt-0.5">
                      {webhook.event}
                    </code>
                    <span className="text-neutral-600 text-sm">{webhook.description}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Error Handling */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Error Handling
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Standardized error responses with clear codes and actionable messages.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {errorCodes.map((error, index) => (
                <motion.div
                  key={error.code}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="card p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded text-sm font-mono ${
                      error.code.startsWith('2') ? 'bg-green-100 text-green-700' :
                      error.code.startsWith('4') ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {error.code}
                    </span>
                    <AlertCircle className="w-4 h-4 text-neutral-400" />
                  </div>
                  <h4 className="font-semibold text-neutral-900 mb-1">{error.type}</h4>
                  <p className="text-sm text-neutral-600">{error.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Ready to Start Building?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Get your API keys and start integrating stablecoin and crypto payments today. Full documentation and sandbox environment included.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://merchant.ezeebit.com/#/signup" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white text-primary-500 hover:bg-neutral-100 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Get API Keys
                <Key className="w-5 h-5 ml-2 inline" />
              </a>
              <a 
                href="https://docs.ezeebit.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-500 font-medium px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                Full Documentation
                <ExternalLink className="w-5 h-5 ml-2 inline" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      </motion.div>
    </>
  )
}

export default Developers