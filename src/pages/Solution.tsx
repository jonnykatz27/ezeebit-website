import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Building2, Store, Users } from 'lucide-react'
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
import { ChannelDemo, PayoutDemo } from '../components/demo/TourWidgets'
import PortalPanel from '../components/demo/PortalPanel'
import CustomerAccountsDemo from '../components/demo/CustomerAccountsDemo'
import { findSolution, solutionPath, type Solution as SolutionData, type SolutionDemo } from '../lib/solutions'
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

/** The merchant tree a gateway builds: its own account, a sub-merchant per business, and their stores. */
const Hierarchy = () => (
  <div className="rounded-2xl border border-neutral-200 bg-white p-5 text-left lg:p-6">
    <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">One integration, every merchant</p>
    {[
      { icon: Building2, name: 'Your gateway', note: 'Your account, your credentials, and one API', indent: '' },
      { icon: Users, name: 'Each merchant', note: 'A sub-merchant with its own fees and history', indent: 'ml-5 lg:ml-7' },
      { icon: Store, name: 'Their stores', note: 'A checkout each, in store or online', indent: 'ml-10 lg:ml-14' },
    ].map(({ icon: Icon, name, note, indent }, i) => (
      <div key={name} className={indent}>
        {i > 0 && <span className="ml-[18px] block h-4 w-px bg-neutral-300" aria-hidden="true" />}
        <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-neutral-950 text-primary-400">
            <Icon className="size-[18px]" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-neutral-900">{name}</span>
            <span className="block text-[13px] text-neutral-600 leading-snug">{note}</span>
          </span>
        </div>
      </div>
    ))}
  </div>
)

/** What a solution shows beside its steps. The live demos sit in a frame held at one height, as in the homepage's tour. */
const Beside = ({ demo }: { demo: SolutionDemo }) => {
  if (demo === 'hierarchy') return <Hierarchy />
  return (
    <div className="mx-auto h-[540px] w-full max-w-[380px] lg:h-[580px] [&_img]:!mx-0">
      {demo === 'payout' ? (
        <PayoutDemo fixed />
      ) : demo === 'accounts' ? (
        <PortalPanel wide={[820, 660]} phone={[390, 600]} restart>{(c) => <CustomerAccountsDemo compact={c} />}</PortalPanel>
      ) : (
        <ChannelDemo channel={demo} />
      )}
    </div>
  )
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
        faqs={s.faqs}
        service={{ name: s.seo.title, serviceType: s.group === 'platforms' ? 'Crypto payment infrastructure' : 'Crypto payments' }}
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
          (() => {
            // The first of the two sections is white and the second grey, whichever order they come in
            const why = (tone: string) => (
              <section key="why" className={`section-padding ${tone}`}>
                <div className="container-custom">
                  <div className="section-head">
                    <Eyebrow>Why Ezeebit</Eyebrow>
                    <h2 className="section-title">{s.why}</h2>
                  </div>
                  <div className="feature-grid feature-grid-4">
                    {s.points.map(({ icon: Icon, title, body }) => (
                      <div key={title} className={`card feature-card ${tone === 'bg-white' ? '' : 'bg-white'}`}>
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
            )
            // Where to read more: the products behind the solution, as links
            const more = (
              <div className="mt-8 text-center lg:mt-10 lg:text-left">
                <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">Check out more</p>
                <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                  {s.products.map((p) => (
                    <Link key={p.to} to={p.to} title={p.body} className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-sm font-semibold text-neutral-900 hover:border-neutral-400">
                      {p.name}
                      <ArrowRight className="w-3.5 h-3.5 text-primary-600" />
                    </Link>
                  ))}
                </div>
              </div>
            )
            const how = (tone: string) =>
              s.demo ? (
                // The steps, beside the demo or diagram closest to what this solution sells
                <section key="how" className={`section-padding ${tone}`}>
                  <div className="container-custom grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
                    <div className="lg:col-span-7">
                      <div className="text-center lg:text-left">
                        <Eyebrow>How it works</Eyebrow>
                        <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 leading-tight mb-8">{s.how}</h2>
                      </div>
                      <Steps steps={s.steps} />
                      {more}
                    </div>
                    <div className="w-full lg:col-span-5">
                      <Beside demo={s.demo} />
                    </div>
                  </div>
                </section>
              ) : (
                // With no demo to show, the steps go across the page
                <section key="how" className={`section-padding ${tone}`}>
                  <div className="container-custom">
                    <div className="section-head">
                      <Eyebrow>How it works</Eyebrow>
                      <h2 className="section-title">{s.how}</h2>
                    </div>
                    <div className="feature-grid feature-grid-4">
                      {s.steps.map((step, i) => (
                        <div key={step.title} className={`card step-card ${tone === 'bg-white' ? '' : 'bg-white'}`}>
                          <span className="font-display font-bold text-primary-500">{String(i + 1).padStart(2, '0')}</span>
                          <h3 className="feature-title">{step.title}</h3>
                          <p className="feature-text">{step.body}</p>
                        </div>
                      ))}
                    </div>
                    {more}
                  </div>
                </section>
              )
            return s.stepsFirst ? [how('bg-white'), why('bg-neutral-50')] : [why('bg-white'), how('bg-neutral-50')]
          })()
        )}

        {s.caseStudy && <CaseStudiesSection title={s.caseStudy.title} intro={s.caseStudy.intro} studies={[s.caseStudy.study]} />}

        {/* Both layouts end on grey, or on white after a case study, so the questions take the other */}
        <FaqBlock heading={`${s.name}: frequently asked questions`} items={s.faqs} tone={s.caseStudy ? 'muted' : 'white'} />

        <section className="section-padding relative overflow-hidden bg-neutral-950 text-white">
          <DarkBackdrop glow="left" />
          <div className="relative container-custom text-center">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">{s.cta ?? 'Ready when you are'}</h2>
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
