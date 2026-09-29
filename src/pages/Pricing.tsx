import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Check, X, ArrowRight, Zap,
  Users, Building, Star
} from 'lucide-react'
import SEO from '../components/SEO'
import PageHero from '../components/hero/PageHero'

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  const plans = [
    {
      name: 'Starter',
      icon: <Zap className="w-6 h-6" />,
      description: 'Perfect for small businesses getting started with stablecoin and crypto payments',
      price: { monthly: 0, annual: 0 },
      transactionFee: 1,
      features: [
        'ezeebit Pay',
        '24/7 support',
        'Standard settlement (T+1)',
        'QR code payments',
        'Merchant Portal',
        'E-commerce plugins',
        'API access'
      ],
      limitations: [
        'No ePOS device',
      ],
      popular: false,
      cta: 'Start Free'
    },
    {
      name: 'Professional',
      icon: <Users className="w-6 h-6" />,
      description: 'Ideal for growing businesses with higher transaction volumes',
      price: { monthly: 150, annual: 1500 },
      transactionFee: 1.0,
      features: [
        'Everything in Starter plan',
        'Advanced ePOS device',
        'Printable receipts',
        'Easy cash-ups'
      ],
      limitations: [
      ],
      popular: true,
      cta: 'Sign Up'
    },
    {
      name: 'Enterprise',
      icon: <Building className="w-6 h-6" />,
      description: 'For large businesses requiring custom solutions and dedicated support',
      price: { monthly: 'Custom', annual: 'Custom' },
      transactionFee: 'Negotiable',
      features: [
        'Dedicated account manager',
        'Instant settlement',
        'Custom analytics & reporting',
        'White-label solutions',
        'Custom integrations',
        'SLA guarantees',
        'Advanced security features',
        'Compliance assistance',
        'Training & onboarding'
      ],
      limitations: [],
      popular: false,
      cta: 'Contact Sales'
    }
  ]

  return (
    <>
      <SEO
        title="Pricing & Plans"
        description="Transparent crypto payment pricing. No setup fees, just 1% transaction fees. Choose from Starter, Professional, or Enterprise plans for your business."
        canonicalUrl="/pricing"
      />
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-hidden -mt-20"
    >
      {/* Hero Section */}
      <PageHero
        title="Simple, transparent"
        accent="pricing"
        description="Choose the perfect plan for your business. No hidden fees, no surprises. Start with our free plan and scale as you grow."
      >
        <div className="flex items-center justify-center">
          <span className={`mr-3 ${billingCycle === 'monthly' ? 'text-neutral-900 font-medium' : 'text-neutral-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`ml-3 ${billingCycle === 'annual' ? 'text-neutral-900 font-medium' : 'text-neutral-500'}`}>
            Annual
          </span>
          {billingCycle === 'annual' && (
            <span className="ml-2 bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Save 17%
            </span>
          )}
        </div>
      </PageHero>

      {/* Pricing Plans */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`card p-6 relative flex flex-col ${
                  plan.popular ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3 text-primary-500">
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">{plan.name}</h3>
                  <p className="text-neutral-600 mb-4 text-sm">{plan.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-neutral-900">
                      {typeof plan.price[billingCycle] === 'number' 
                        ? plan.price[billingCycle] === 0 
                          ? 'Free' 
                          : `R${plan.price[billingCycle]}`
                        : plan.price[billingCycle]
                      }
                    </div>
                    {typeof plan.price[billingCycle] === 'number' && plan.price[billingCycle] > 0 && (
                      <div className="text-neutral-500">
                        per device per {billingCycle === 'monthly' ? 'month' : 'year'}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center mb-4">
                    <span className="text-sm text-neutral-500">Transaction fee: </span>
                    <span className="font-semibold text-neutral-900">
                      {typeof plan.transactionFee === 'number'
                        ? `1%`
                        : plan.transactionFee
                      }
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start">
                      <Check className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation) => (
                    <div key={limitation} className="flex items-start">
                      <X className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-500 text-sm">{limitation}</span>
                    </div>
                  ))}
                </div>

                {plan.name === 'Enterprise' ? (
                  <Link
                    to="/contact"
                    className={`w-full text-center py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                      plan.popular
                        ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                ) : (
                  <a
                    href="https://merchant.ezeebit.com/#/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full text-center py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                      plan.popular
                        ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* FAQ Section */}

      {/* CTA Section */}
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
              Join thousands of merchants already accepting stablecoin and crypto payments. Start with our free plan today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://merchant.ezeebit.com/#/signup" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white text-primary-600 hover:bg-neutral-100 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </a>
              <a 
                href="mailto:sales@ezeebit.com" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                Contact Sales
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      </motion.div>
    </>
  )
}

export default Pricing