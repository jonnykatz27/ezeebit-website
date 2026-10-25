import { motion } from '../lib/motion'
import { Link } from 'react-router-dom'
import {
  Users, Award, Globe, TrendingUp, Shield, Zap,
  ArrowRight, Heart
} from 'lucide-react'
import SEO from '../components/SEO'
import PageHero from '../components/hero/PageHero'

const About = () => {
  const stats = [
    { number: "100,000+", label: "Transactions processed", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "150+", label: "Active stores", icon: <Users className="w-6 h-6" /> },
    { number: "7+", label: "Supported cryptocurrencies", icon: <Globe className="w-6 h-6" /> },
    { number: "99.99%", label: "Uptime", icon: <Shield className="w-6 h-6" /> }
  ]

  const team = [
    {
      name: "Daniel Katz",
      role: "Chief Executive Officer",
      image: "/Daniel_pic - no bg.png",
      linkedin: "https://www.linkedin.com/in/daniel-katz-090464145"
    },
    {
      name: "Jonathan Katz",
      role: "Chief Operating Officer",
      image: "/Jonathan Katz - no bg.png",
      linkedin: "https://www.linkedin.com/in/jonathan-katz-b311b3225"
    },
    {
      name: "David Katz",
      role: "Head of Financial Operations",
      image: "/David_pic - no bg.png",
      linkedin: "https://www.linkedin.com/in/david-katz-227a00265"
    }
  ]

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Security First",
      description: "We prioritize the security of your funds and data above everything else, implementing bank-grade security measures."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovation",
      description: "We keep pushing at what stablecoin infrastructure can do, from checkout and payouts to the wallets underneath them."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Customer Success",
      description: "Your success is our success. We're committed to providing exceptional support and service to every business we work with."
    }
  ]

  const milestones = [
    {
      year: "2023",
      title: "Operations Begin",
      description: "Kicked off live operations, onboarding our very first merchants and enabling real-world stablecoin and crypto payments."
    },
    {
      year: "2024",
      title: "10,000 Transactions Processed",
      description: "Hit a major milestone with our 10,000th transaction, as demand for stablecoin and crypto payments surged across the region."
    },
    {
      year: "2025",
      title: "IP Acquisition & Rebrand",
      description: "Acquired the full stablecoin and crypto payments technology and IP from Pundi X, rebranding to Ezeebit and positioning ourselves for broader scale and innovation."
    },
    {
      year: "2025",
      title: "Seed Funding Closed",
      description: "Closed our seed funding round of $2.05m to accelerate product development and merchant expansion across Africa."
    }
  ]

  return (
    <>
      <SEO
        title="About Ezeebit"
        description="Ezeebit builds stablecoin and crypto payment infrastructure for merchants. Based in Cape Town, live in South Africa, expanding to Kenya and Nigeria."
        canonicalUrl="/resources/about"
        crumbs={[{ name: 'About', path: '/resources/about' }]}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="overflow-hidden -mt-20"
      >
      {/* Hero Section */}
      <PageHero
        title="Pioneering stablecoin"
        accent="payments in Africa"
        description="We're on a mission to make stablecoin payments as simple and secure as traditional ones — money in, money held and money out — so African businesses can move value as easily as information."
        trust={[
          { icon: <Award />, label: 'FSCA regulated' },
          { icon: <Shield />, label: 'Bank-grade security' },
          { icon: <Users />, label: '150+ stores' },
        ]}
      />

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary-500">
                  {stat.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-neutral-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-neutral-50 mt-8 lg:mt-0">
        <div className="container-custom">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative order-first lg:order-last flex justify-center lg:block"
            >
              <img 
                src="/africa-pic.png" 
                alt="Africa map" 
                className="w-2/5 lg:w-4/5"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="order-last lg:order-first text-center lg:text-left"
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
                Our mission
              </h2>
              <p className="text-base lg:text-lg text-neutral-600">
                To transform how businesses in Africa move money — by building the trusted stablecoin infrastructure layer beneath it. We give them one place to take payments in, hold a balance in fiat or stablecoin, and pay customers out, with the hedging and compliance handled underneath.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Our core values
            </h2>
            <p className="text-base lg:text-xl text-neutral-600 max-w-3xl mx-auto">
              The principles that guide everything we do and every decision we make.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 text-center hover:scale-105 transition-transform"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary-500">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card p-6 text-center hover:scale-105 transition-transform"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary-500">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Access for all
              </h3>
              <p className="text-neutral-600">
                We're here to democratise stablecoin payments — not just for the privileged few, but for every business and customer across Africa and beyond.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Our journey
            </h2>
            <p className="text-base lg:text-xl text-neutral-600 max-w-3xl mx-auto">
              Key milestones in our mission to transform stablecoin and crypto payments in Africa.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary-200"></div>
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative flex items-start"
                  >
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm relative z-10">
                      {index + 1}
                    </div>
                    <div className="ml-6 card p-6 flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-neutral-900">{milestone.title}</h3>
                        <span className="text-primary-500 font-bold">{milestone.year}</span>
                      </div>
                      <p className="text-neutral-600">{milestone.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Our co-founders
            </h2>
            <p className="text-base lg:text-xl text-neutral-600 max-w-3xl mx-auto">
              Meet the team driving crypto payment innovation across Africa.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-[5.75rem] h-[5.75rem] lg:w-[9.2rem] lg:h-[9.2rem] mx-auto mb-3 rounded-full overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100 hover:ring-4 hover:ring-primary-200 transition-all"
                  aria-label={`${member.name} LinkedIn profile`}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </a>
                <h3 className="text-sm font-semibold text-neutral-900 leading-tight mb-1">
                  {member.name.split(' ').map((part, i) => (
                    <span key={i}>
                      {part}
                      {i < member.name.split(' ').length - 1 && <br />}
                    </span>
                  ))}
                </h3>
                <p className="text-xs text-neutral-600 leading-tight">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-8 lg:mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">Backed by world-class investors</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Supported by leading global funds and industry veterans who share our belief in building the future of payments in Africa
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest text-center mb-6">
                Lead Investors
              </p>
              <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
                <a
                  href="https://foundercollective.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/founder_collective_logo.png"
                    alt="Founder Collective"
                    className="h-7 md:h-8 w-auto object-contain"
                  />
                </a>
                <a
                  href="https://rabacap.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/Raba_logo.webp"
                    alt="Raba Partnership"
                    className="h-6 md:h-7 w-auto object-contain"
                  />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="border-t border-neutral-200 pt-10 mb-12"
            >
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest text-center mb-6">
                Strategic Investors
              </p>
              <div className="flex justify-center items-center">
                <a
                  href="https://dcg.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/digital-currency-group-logo-nobg.png"
                    alt="Digital Currency Group"
                    className="h-14 md:h-[70px] w-auto object-contain"
                  />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="border-t border-neutral-200 pt-10"
            >
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest text-center mb-8">
                Angel Investors
              </p>
              <div className="max-w-2xl mx-auto">
                <div className="grid grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
                  {[
                    { name: 'Terry Angelos', note: 'ex-Visa', image: '/terry-image-nobg.png', linkedin: 'https://www.linkedin.com/in/tangelos' },
                    { name: 'Anton Katz', note: 'Talos', image: '/anton_image-nobg.png', linkedin: 'https://www.linkedin.com/in/katzanton' },
                    { name: 'David|de Picciotto', note: 'ex-Revolut', image: '/david_image-nobg.png', linkedin: 'https://www.linkedin.com/in/david-de-picciotto' }
                  ].map((investor, index) => (
                    <motion.div
                      key={investor.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="text-center"
                    >
                      <a
                        href={investor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100 hover:ring-4 hover:ring-primary-200 transition-all"
                        aria-label={`${investor.name.replace('|', ' ')} LinkedIn profile`}
                      >
                        <img
                          src={investor.image}
                          alt={investor.name.replace('|', ' ')}
                          className="w-full h-full object-cover"
                        />
                      </a>
                      <p className="text-sm font-medium text-neutral-700 leading-tight">
                        {investor.name.includes('|')
                          ? investor.name.split('|').map((part, i) => (
                              <span key={i}>
                                {part}
                                {i < investor.name.split('|').length - 1 && <br />}
                              </span>
                            ))
                          : investor.name.split(' ').map((part, i) => (
                              <span key={i}>
                                {part}
                                {i < investor.name.split(' ').length - 1 && <br />}
                              </span>
                            ))
                        }
                      </p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">{investor.note}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-6 md:gap-8 max-w-md mx-auto">
                  {[
                    { name: 'Nadir Khamissa', note: 'Hello Group', image: '/nadir_image-nobg.png', linkedin: 'https://www.linkedin.com/in/nadir-khamissa' },
                    { name: 'Chris Harmse', note: 'BVNK', image: '/chris_image-nobg.png', linkedin: 'https://www.linkedin.com/in/chrisharmse' }
                  ].map((investor, index) => (
                    <motion.div
                      key={investor.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + (index + 3) * 0.05 }}
                      className="text-center"
                    >
                      <a
                        href={investor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100 hover:ring-4 hover:ring-primary-200 transition-all"
                        aria-label={`${investor.name} LinkedIn profile`}
                      >
                        <img
                          src={investor.image}
                          alt={investor.name}
                          className="w-full h-full object-cover"
                        />
                      </a>
                      <p className="text-sm font-medium text-neutral-700 leading-tight">
                        {investor.name.split(' ').map((part, i) => (
                          <span key={i}>
                            {part}
                            {i < investor.name.split(' ').length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">{investor.note}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-neutral-200 rounded-full shadow-xs">
                <Shield className="w-5 h-5 text-secondary-600" />
                <span className="text-sm font-medium text-neutral-700">
                  Trusted by industry leaders and backed by experienced investors
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
              Join our mission
            </h2>
            <p className="text-base lg:text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Be part of the stablecoin and crypto payment revolution in Africa. Start accepting stablecoin and cryptocurrency payments today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://merchant.ezeebit.com/#/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-600 hover:bg-neutral-100 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              <Link to="/contact" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center">
                Contact Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      </motion.div>
    </>
  )
}

export default About