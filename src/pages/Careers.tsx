import { motion } from 'framer-motion'
import { MapPin, Clock, Briefcase, ExternalLink, Users, Zap, Globe } from 'lucide-react'
import SEO from '../components/SEO'

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
]

const perks = [
  {
    icon: Globe,
    title: 'Meaningful work',
    description: "Build payment infrastructure that expands financial access across Africa — not another ad-tech product.",
  },
  {
    icon: Zap,
    title: 'Move fast',
    description: 'Small team, high ownership. Ship real features to real merchants, not demos.',
  },
  {
    icon: Users,
    title: 'Great people',
    description: 'Work alongside the founding team and early engineers who care deeply about the mission.',
  },
]

const Careers = () => {
  return (
    <>
      <SEO
        title="Careers"
        description="Join the team building Africa's stablecoin payment infrastructure. View open roles at Ezeebit and apply today."
        canonicalUrl="/careers"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="overflow-hidden -mt-20"
      >
        {/* Hero */}
        <section className="relative min-h-[55vh] flex items-center gradient-bg pt-40 pb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10" />
          <div className="container-custom relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-block bg-primary-100 text-primary-700 text-sm font-medium px-4 py-1.5 rounded-full mb-5">
                We're hiring
              </span>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-neutral-900 mb-5">
                Build the future of <span className="text-gradient">African payments</span>
              </h1>
              <p className="text-base md:text-xl text-neutral-600 max-w-2xl mx-auto">
                Ezeebit is a small, focused team on a big mission — making stablecoin and crypto payments accessible for merchants across Africa. Come help us build it.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Ezeebit */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Why Ezeebit?</h2>
              <p className="text-neutral-600 max-w-xl mx-auto">
                We raised $2M to build payment rails that didn't exist — and we're just getting started.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {perks.map((perk, index) => (
                <motion.div
                  key={perk.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card p-6 md:p-8"
                >
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <perk.icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{perk.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{perk.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 md:py-24 bg-neutral-50">
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
                          <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
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
        <section className="py-16 md:py-24 bg-primary-600 text-white">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Don't see your role?
              </h2>
              <p className="mb-8 opacity-90">
                We're always interested in exceptional people. If you're passionate about payments, fintech, or building for emerging markets, reach out.
              </p>
              <a
                href="mailto:careers@ezeebit.com"
                className="bg-white text-primary-600 hover:bg-neutral-100 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  )
}

export default Careers
