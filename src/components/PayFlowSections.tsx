import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, type LucideIcon } from 'lucide-react'
import { motion } from '../lib/motion'
import FlowDemo from './demo/FlowDemo'
import { PayoutDemo } from './demo/TourWidgets'
import type { CaseStudy } from '../lib/caseStudies'
import SectionHeader, { Eyebrow } from './SectionHeader'

export { Eyebrow }

/**
 * The sections the Platforms page tells pay-ins and payouts with, shared with
 * the Solutions pages that tell the same story for one kind of platform: what
 * a deposit does, how one works beside the live checkout, how a payout works
 * beside the live claim, and the customers already live.
 */

export type Step = { title: string; body: string }
export type Feature = { icon: LucideIcon; title: string; body: string }
type Tone = 'white' | 'muted'

const BG: Record<Tone, string> = { white: 'bg-white', muted: 'bg-neutral-50' }

/**
 * A numbered list of what happens, in order. Always left-aligned: on phones
 * the site centres two-column sections, which pulled the text away from its
 * numbers.
 */
export const Steps = ({ steps }: { steps: Step[] }) => (
  <ol className="space-y-6 text-left">
    {steps.map((step, index) => (
      <li key={step.title} className="flex gap-4">
        <span className="w-9 h-9 rounded-full bg-neutral-950 text-primary-400 text-sm font-semibold flex items-center justify-center flex-shrink-0">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-1">{step.title}</h3>
          <p className="text-neutral-600">{step.body}</p>
        </div>
      </li>
    ))}
  </ol>
)

/** Four cards, side by side on desktop, on what the product does for you. */
export const PillarsSection = ({ title, intro, items, tone = 'white' }: { title: string; intro: string; items: Feature[]; tone?: Tone }) => (
  <section className={`section-padding ${BG[tone]}`}>
    <div className="container-custom">
      <SectionHeader title={title} intro={intro} />
      <div className="feature-grid feature-grid-4">
        {items.map(({ icon: Icon, title, body }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card feature-card h-full"
          >
            <div className="bg-neutral-950 rounded-xl flex items-center justify-center text-primary-400 [&_svg]:w-5 [&_svg]:h-5 lg:[&_svg]:w-6 lg:[&_svg]:h-6">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="feature-title">{title}</h3>
            <p className="feature-text">{body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

/** What makes a deposit different from a checkout, as a grid of six. */
export const PayinsSection = ({ title, intro, items, tone = 'muted' }: { title: string; intro: string; items: Feature[]; tone?: Tone }) => (
  <section className={`section-padding ${BG[tone]}`}>
    <div className="container-custom">
      <SectionHeader eyebrow="Pay-ins" title={title} intro={intro} />
      <div className="feature-grid feature-grid-3">
        {items.map(({ icon: Icon, title, body }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card feature-card"
          >
            <div className="bg-neutral-950 rounded-xl flex items-center justify-center text-primary-400 [&_svg]:w-5 [&_svg]:h-5 lg:[&_svg]:w-6 lg:[&_svg]:h-6">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="feature-title">{title}</h3>
            <p className="feature-text">{body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

/** How a deposit works, step by step, beside the checkout itself. */
export const DepositSection = ({ intro, steps, tone = 'white' }: { intro: string; steps: Step[]; tone?: Tone }) => (
  <section className={`section-padding ${BG[tone]}`}>
    <div className="container-custom">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">How a deposit works</h2>
          <p className="text-xl text-neutral-600 mb-8">{intro}</p>
          <Steps steps={steps} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="w-full max-w-[380px] mx-auto"
        >
          {/* The checkout itself, rather than a picture of it */}
          <FlowDemo
            src="/demos/pay-in.html"
            flow="payin"
            label="Try a deposit"
            title="Interactive demo of the Ezeebit checkout a user deposits through"
          />
        </motion.div>
      </div>
    </div>
  </section>
)

/** How a payout works, step by step, beside the claim a user makes. */
export const PayoutSection = ({ title, intro, steps, tone = 'muted' }: { title: string; intro: string; steps: Step[]; tone?: Tone }) => (
  <section className={`section-padding ${BG[tone]}`}>
    <div className="container-custom">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="order-2 lg:order-1 w-full max-w-[380px] mx-auto"
        >
          <PayoutDemo title="Interactive demo of an Ezeebit payout a user claims" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="order-1 lg:order-2"
        >
          <Eyebrow>Payouts</Eyebrow>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">{title}</h2>
          <p className="text-xl text-neutral-600 mb-8">{intro}</p>
          <Steps steps={steps} />
          <Link to="/payouts" className="inline-flex items-center font-semibold text-primary-600 hover:text-primary-700 mt-8">
            More on Payouts
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
)

/** Customers already live, each with its cover, summary, and story. */
export const CaseStudiesSection = ({ title, intro, studies, tone = 'white' }: { title: string; intro: string; studies: CaseStudy[]; tone?: Tone }) => (
  <section className={`section-padding ${BG[tone]}`}>
    <div className="container-custom">
      <SectionHeader title={title} intro={intro} />
      <div className="space-y-8">
        {studies.map((study) => (
          <motion.article
            key={study.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="card overflow-hidden"
          >
            {/*
              The cover carries its own headline, so it runs full width at its
              own shape: never cropped, and with no backing colour around it
              to show a seam against the banner's navy.
            */}
            <Link to={study.href} className="block">
              <img
                src={study.image}
                alt={`${study.name} accepting crypto deposits through Ezeebit`}
                width={3200}
                height={1800}
                className="w-full h-auto !mx-0"
                loading="lazy"
              />
            </Link>
            <div className="p-8 lg:p-10 grid gap-8 lg:grid-cols-2 text-left">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <img src={study.logo} alt={study.name} className="h-10 w-auto !mx-0" />
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600 bg-primary-50 rounded-full px-3 py-1">
                    {study.sector}
                  </span>
                </div>
                <p className="text-lg text-neutral-700">{study.summary}</p>
              </div>
              <div className="flex flex-col justify-center">
                <ul className="space-y-3 mb-8">
                  {study.points.map((point) => (
                    <li key={point} className="flex gap-3 text-neutral-600">
                      <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link to={study.href} className="inline-flex items-center font-semibold text-primary-600 hover:text-primary-700">
                  Read how it was built
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
)
