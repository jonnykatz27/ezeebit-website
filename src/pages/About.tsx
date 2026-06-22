import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Users, Award, Globe, TrendingUp, Shield, Zap,
  ArrowRight, Heart
} from 'lucide-react'
import SEO from '../components/SEO'

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
      description: "We continuously push the boundaries of what's possible in stablecoin and crypto payments, delivering cutting-edge solutions."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Customer Success",
      description: "Your success is our success. We're committed to providing exceptional support and service to every merchant."
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
        title="About Us"
        description="Learn about Ezeebit's mission to revolutionize stablecoin and crypto payments in Africa. FSCA regulated, 100,000+ transactions processed, and backed by seed funding to accelerate growth."
        canonicalUrl="/resources/about"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="overflow-hidden -mt-20"
      >
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center gradient-bg pt-40">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-center mb-6">
              <img
                src="/ezeebit_black.png"
                alt="Ezeebit"
                className="h-16 w-auto hidden md:block"
              />
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Pioneering <span className="text-gradient">stablecoin and crypto payments</span><br className="hidden lg:block" /> in Africa
            </h1>
            <p className="text-base lg:text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
              We're on a mission to make stablecoin and cryptocurrency payments as simple and secure as traditional payments,
              empowering African merchants to embrace the future of finance.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-neutral-500">
              <div className="flex items-center">
                <Award className="w-4 h-4 md:w-5 md:h-5 text-secondary-500 mr-1 md:mr-2" />
                <span className="text-xs md:text-sm">FSCA Regulated</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-secondary-500 mr-1 md:mr-2" />
                <span className="text-xs md:text-sm">Bank-Grade Security</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-secondary-500 mr-1 md:mr-2" />
                <span className="text-xs md:text-sm">150+ Stores</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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
                To transform how businesses in Africa accept and settle digital payments — by building the trusted stablecoin and crypto infrastructure layer for modern commerce. We empower merchants with fast, secure, and compliant payment solutions that bridge traditional finance and the emerging crypto economy.
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
                We're here to democratize stablecoin and crypto payments — not just for the privileged few, but for every merchant and customer across Africa and beyond.
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