import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from '../lib/motion'
import SEO from '../components/SEO'
import PageHero, { HERO_PRIMARY, HERO_SECONDARY } from '../components/hero/PageHero'
import DarkBackdrop from '../components/DarkBackdrop'
import FaqBlock from '../components/FaqBlock'
import {
  CaseStudiesSection, DepositSection, Eyebrow, PayinsSection, PayoutSection, PillarsSection, Steps,
} from '../components/PayFlowSections'
import PlatformsHeroVisual from '../components/hero/PlatformsHeroVisual'
import InStoreHeroVisual from '../components/hero/InStoreHeroVisual'
import OnlineHeroVisual from '../components/hero/OnlineHeroVisual'
import PayoutsHeroVisual from '../components/hero/PayoutsHeroVisual'
import WalletsHeroVisual from '../components/hero/WalletsHeroVisual'
import OTCHeroVisual from '../components/hero/OTCHeroVisual'
import { findSolution, solutionPath, type Solution as SolutionData } from '../lib/solutions'
import NotFound from './NotFound'

/** Each solution borrows the hero illustration of the product it leans on most. */
const VISUALS: Record<SolutionData['visual'], () => ReactNode> = {
  platforms: () => <PlatformsHeroVisual />,
  instore: () => <InStoreHeroVisual />,
  online: () => <OnlineHeroVisual />,
  payouts: () => <PayoutsHeroVisual />,
  wallets: () => <WalletsHeroVisual />,
  otc: () => <OTCHeroVisual />,
}

/** A link that may leave the site, such as sign-up. */
const Go = ({ to, className, children }: { to: string; className: string; children: ReactNode }) =>
  to.startsWith('http') ? (
    <a href={to} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
  ) : (
    <Link to={to} className={className}>{children}</Link>
  )

/**
 * A Solutions page: one kind of business, what Ezeebit does for it, how the
 * money moves, and its questions. The content lives in lib/solutions.ts. A
 * platform that takes deposits and pays users out is told the way the
 * Platforms page tells it, with the live deposit and payout demos; any other
 * in four steps, beside links to the products behind it.
 */
const Solution = () => {
  const { slug } = useParams<{ slug: string }>()
  const s = findSolution(slug)
  if (!s) return <NotFound />

  return (
    <>
      <SEO
        title={s.seo.title}
        description={s.seo.description}
        canonicalUrl={solutionPath(s)}
        crumbs={[{ name: s.name, path: solutionPath(s) }]}
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-hidden -mt-20">
        <PageHero
          kicker={s.name}
          title={s.hero.title}
          accent={s.hero.accent}
          description={s.hero.description}
          actions={
            <>
              <Go to={s.primary.to} className={HERO_PRIMARY}>
                {s.primary.label}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Go>
              <Go to={s.secondary.to} className={HERO_SECONDARY}>
                {s.secondary.label}
              </Go>
            </>
          }
          visual={VISUALS[s.visual]()}
          itemProps
        />

        {s.flows ? (
          <>
            <PillarsSection title={s.flows.why.title} intro={s.flows.why.intro} items={s.points} />
            <PayinsSection title={s.flows.payins.title} intro={s.flows.payins.intro} items={s.flows.payins.items} />
            <DepositSection intro={s.flows.deposit.intro} steps={s.flows.deposit.steps} />
            <PayoutSection title={s.flows.payouts.title} intro={s.flows.payouts.intro} steps={s.flows.payouts.steps} />
          </>
        ) : (
          <>
            {/* What Ezeebit does for this kind of business */}
            <section className="section-padding bg-white">
              <div className="container-custom">
                <div className="section-head">
                  <Eyebrow>Why Ezeebit</Eyebrow>
                  <h2 className="section-title">What you get</h2>
                </div>
                <div className="feature-grid feature-grid-4">
                  {s.points.map(({ icon: Icon, title, body }) => (
                    <div key={title} className="card feature-card">
                      {/* The site's dark icon tile, as on the product pages */}
                      <span className="flex items-center justify-center rounded-xl bg-neutral-950 text-primary-400 [&_svg]:w-5 [&_svg]:h-5 lg:[&_svg]:w-6 lg:[&_svg]:h-6">
                        <Icon className="w-6 h-6" />
                      </span>
                      <h3 className="feature-title">{title}</h3>
                      <p className="feature-text">{body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* How the money moves, and the products behind it */}
            <section className="section-padding bg-neutral-50">
              <div className="container-custom grid gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-7">
                  <Eyebrow>How it works</Eyebrow>
                  <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 leading-tight mb-8">Four steps, start to finish</h2>
                  <Steps steps={s.steps} />
                </div>
                <div className="lg:col-span-5">
                  <Eyebrow>The products behind it</Eyebrow>
                  <div className="flex flex-col gap-3">
                    {s.products.map((p) => (
                      <Link key={p.to} to={p.to} className="group flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-5 hover:border-neutral-300">
                        <span>
                          <span className="block text-lg font-semibold text-neutral-900">{p.name}</span>
                          <span className="block text-[15px] text-neutral-600">{p.body}</span>
                        </span>
                        <ArrowRight className="w-5 h-5 shrink-0 text-primary-600 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {s.caseStudy && <CaseStudiesSection title={s.caseStudy.title} intro={s.caseStudy.intro} studies={[s.caseStudy.study]} />}

        {/* Both layouts end on grey, or on white after a case study, so the questions take the other */}
        <FaqBlock heading={`${s.name}: frequently asked questions`} items={s.faqs} tone={s.caseStudy ? 'muted' : 'white'} />

        <section className="section-padding relative overflow-hidden bg-neutral-950 text-white">
          <DarkBackdrop glow="left" />
          <div className="relative container-custom text-center">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">Ready when you are</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-neutral-300">
              {s.group === 'platforms'
                ? 'Tell us about your platform and we will scope the integration with you.'
                : 'Sign up free and pay only when money moves, or talk to us first.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Go to={s.primary.to} className={HERO_PRIMARY}>
                {s.primary.label}
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Go>
              <Go to={s.secondary.to} className={HERO_SECONDARY}>
                {s.secondary.label}
              </Go>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  )
}

export default Solution
