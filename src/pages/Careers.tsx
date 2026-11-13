import { motion } from '../lib/motion'
import { MapPin, Clock, Briefcase, ExternalLink, Zap, Compass, ShieldCheck, Sparkles, Coffee } from 'lucide-react'
import SEO from '../components/SEO'
import PageHero, { HERO_PRIMARY } from '../components/hero/PageHero'
import DarkBackdrop from '../components/DarkBackdrop'

const jobPostings = [
  {
    id: 'senior-software-engineer',
    title: 'Senior Software Engineer',
    subtitle: 'Java & Spring',
    department: 'Engineering',
    location: 'Cape Town, South Africa',
    type: 'Full-time',
    level: 'Senior',
    notionUrl: 'https://ezeebit.notion.site/Senior-Software-Engineer-07048424fe63421d9c688119334d8958?source=copy_link',
    description: "We're looking for a Senior Software Engineer to help build the infrastructure powering Africa's stablecoin payment rails. You'll work across our core backend services — designing APIs, integrating with blockchain networks, and building the reliability guarantees that merchants and users depend on.",
    skills: ['Java', 'Spring Boot', 'REST APIs', 'Microservices', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'junior-intermediate-software-engineer',
    title: 'Junior/Intermediate Software Engineer',
    subtitle: 'Java & Spring',
    department: 'Engineering',
    location: 'Cape Town, South Africa (hybrid)',
    type: 'Full-time',
    level: 'Junior to intermediate',
    notionUrl: 'https://ezeebit.notion.site/Ezeebit-Junior-Intermediate-Software-Engineer-414f9736dc0c813f9bafcf0b3210372c',
    description: "We're looking for a Junior or Intermediate Software Engineer to build backend services and APIs on our Java and Spring Boot microservices, for payments, merchant integrations, settlement, reconciliation, and ledgers. You'll ship to live payments infrastructure within your first few weeks, with senior engineers reviewing your code and pairing with you as you grow.",
    skills: ['Java', 'Spring Boot', 'REST APIs', 'SQL', 'Git', 'AWS'],
  },
]

const principles = [
  {
    icon: Zap,
    title: 'Iterate relentlessly',
    description: "We move fast and learn faster — laying the tracks as we ride the train. Your work ships to real merchants, and we treat every mistake as a lesson, not a loss.",
  },
  {
    icon: Compass,
    title: 'High agency, high ownership',
    description: "Everyone here acts like a founder. You take initiative, own the outcome, and don't wait to be told. A problem is everyone's until it's solved.",
  },
  {
    icon: ShieldCheck,
    title: 'Compliance by design',
    description: "We're FSCA-regulated and we build for legitimacy from day one. Regulation isn't a blocker here — it's part of the product, and it's our edge.",
  },
  {
    icon: Sparkles,
    title: 'Simplicity builds trust',
    description: "We make complex systems feel simple and reliable. From our code to a merchant's first payment, clarity always wins over noise.",
  },
]

const Careers = () => {
  return (
    <>
      <SEO
        title="Careers at Ezeebit in Cape Town"
        description="Open roles at Ezeebit in Cape Town. The team builds crypto and stablecoin payment infrastructure for merchants and platforms."
        crumbs={[{ name: 'Careers', path: '/careers' }]}
        canonicalUrl="/careers"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="overflow-hidden -mt-20"
      >
        {/* Hero */}
        <PageHero
          kicker="Careers"
          title="Build the future of"
          accent="payments in Africa and beyond"
          description="We're a small team in Cape Town building the rails that let merchants in Africa and beyond accept stablecoins and crypto, instantly hedged and settled the same day. 100+ platforms and businesses already run on Ezeebit. We're just getting started."
        />

        {/* How we work */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="section-head"
            >
              <h2 className="section-title">How we work</h2>
              <p className="section-lead">
                FSCA-regulated, backed by Founder Collective, Raba, and DCG — and small enough that what you build reaches real merchants this week. These are the principles we actually run on.
              </p>
            </motion.div>
            <div className="feature-grid">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card feature-card"
                >
                  <div className="bg-neutral-950 rounded-xl flex items-center justify-center text-primary-400 [&_svg]:w-5 [&_svg]:h-5 lg:[&_svg]:w-6 lg:[&_svg]:h-6">
                    <principle.icon className="w-8 h-8" />
                  </div>
                  <h3 className="feature-title">{principle.title}</h3>
                  <p className="feature-text">{principle.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* In the room, together */}
        <section className="py-16 md:py-24 bg-neutral-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="card p-8 md:p-12 max-w-4xl mx-auto text-center"
            >
              <div className="w-12 h-12 bg-neutral-950 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary-400 [&_svg]:w-6 [&_svg]:h-6">
                <Coffee className="w-8 h-8" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                We build in the room, together
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                We work from our office in Cape Town, and it's a deliberate choice. With a small team, being in the same room means everyone is exposed to every part of the business — sales, engineering, compliance, support. That's how our focus and our vision stay sharp, and it's a big part of how we keep moving quickly.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Some of our best decisions start as water-cooler conversations. You can't schedule those — you just have to be there for them.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">Open positions</h2>
              <p className="text-neutral-500">{jobPostings.length} role{jobPostings.length !== 1 ? 's' : ''} currently open</p>
            </motion.div>

            <div className="space-y-6">
              {jobPostings.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card overflow-hidden"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="bg-primary-100 text-primary-700 text-xs font-medium px-2.5 py-1 rounded-full">
                            {job.department}
                          </span>
                          <span className="bg-success-100 text-success-700 text-xs font-medium px-2.5 py-1 rounded-full">
                            {job.level}
                          </span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-0.5">
                          {job.title}
                        </h3>
                        <p className="text-primary-600 font-medium text-sm mb-4">{job.subtitle}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-neutral-500 mb-5">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="w-4 h-4" />
                            {job.level}
                          </span>
                        </div>

                        <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-5">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill) => (
                            <span
                              key={skill}
                              className="bg-neutral-100 text-neutral-700 text-xs font-medium px-3 py-1.5 rounded-lg"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="lg:ml-8 lg:shrink-0">
                        <a
                          href={job.notionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary flex items-center justify-center gap-2 w-full lg:w-auto whitespace-nowrap"
                        >
                          View Full Role
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 relative overflow-hidden bg-neutral-950 text-white">
          <DarkBackdrop glow="left" />
          <div className="relative container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Don't see your role?
              </h2>
              <p className="mb-8 text-neutral-300">
                We're always interested in exceptional people. If you're passionate about payments, fintech, or building for emerging markets, reach out.
              </p>
              <a
                href="mailto:careers@ezeebit.com"
                className={`${HERO_PRIMARY} gap-2`}
              >
                Get in touch
              </a>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  )
}

export default Careers
