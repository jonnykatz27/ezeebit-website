import { motion } from '../lib/motion'
import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import PageHero, { HERO_PRIMARY, HERO_SECONDARY } from '../components/hero/PageHero'
import DarkBackdrop from '../components/DarkBackdrop'
import FaqBlock from '../components/FaqBlock'
import PricingPlans from '../components/pricing/PricingPlans'

/** What comes with every account, whichever products it uses. */
const INCLUDED = ['Merchant Portal', 'Ezeebit Pay QR codes', 'E-commerce plugins and API access', '24/7 support', 'No setup fees']

const pricingFaqs = [
  {
    question: 'What does Ezeebit cost?',
    answer: 'Crypto In is 1% or less per payment and Crypto Out is $0.65 per payout, both excluding VAT. Converting between your fiat and USDT wallets is at a quoted rate, shown before you convert. Enterprise pricing is based on your volumes.',
  },
  {
    question: 'Are there setup or monthly fees?',
    answer: 'No. There are no setup fees and no monthly platform fees. The only monthly charge is the optional ePOS rental, at R150 a month per device. An Ezeebit Pay QR code is free.',
  },
  {
    question: 'Do I lose anything on the exchange rate?',
    answer: 'No. You receive exactly the amount you charged. Your customer sees and accepts the rate before paying.',
  },
  {
    question: 'When do I get paid?',
    answer: 'In local currency the next business day, or in stablecoin the same day.',
  },
  {
    question: 'Can I get lower rates?',
    answer: 'Yes. Enterprise gives businesses moving money both ways at scale volume pricing, based on their volumes. Book a call and we will put a price together.',
  },
]

const Pricing = () => (
  <>
    <SEO
      title="Pricing"
      description="Crypto In is 1% or less per payment and Crypto Out is $0.65 per payout, excluding VAT. No setup fees and no monthly platform fees."
      canonicalUrl="/pricing"
      crumbs={[{ name: 'Pricing', path: '/pricing' }]}
    />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-hidden -mt-20"
    >
      <PageHero
        kicker="Pricing"
        title="Pay when"
        accent="money moves"
        description="A percentage on the way in, a flat fee on the way out. No setup fees and no monthly platform fees."
      />

      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <PricingPlans />
          <div className="mt-10 border-t border-neutral-200 pt-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">Every account includes</p>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[15px] text-neutral-700">
                  <Check className="w-4 h-4 text-primary-600 shrink-0" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FaqBlock heading="Pricing: frequently asked questions" items={pricingFaqs} tone="white" />

      <section className="section-padding relative overflow-hidden bg-neutral-950 text-white">
        <DarkBackdrop glow="left" />
        <div className="relative container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-neutral-300">
              Sign up free and pay only when money moves, or talk to us about volume pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://merchant.ezeebit.com/#/signup"
                target="_blank"
                rel="noopener noreferrer"
                className={HERO_PRIMARY}
              >
                Start free
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </a>
              <Link to="/book-a-call" className={HERO_SECONDARY}>
                Contact sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  </>
)

export default Pricing
