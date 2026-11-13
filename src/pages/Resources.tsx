import { useState } from 'react'
import { motion } from '../lib/motion'
import { Link } from 'react-router-dom'
import {
  Book, HelpCircle, FileText, Newspaper, Users,
  ArrowRight, Clock
} from 'lucide-react'
import SEO from '../components/SEO'
import PageHero, { HeroSearch, HERO_PRIMARY, HERO_SECONDARY } from '../components/hero/PageHero'
import DarkBackdrop from '../components/DarkBackdrop'

const Resources = () => {
  const [query, setQuery] = useState('')
  const resourceCategories = [
    {
      title: 'About Us',
      description: 'Learn about our mission, team, and journey in transforming African payments',
      icon: <Users className="w-8 h-8" />,
      href: '/resources/about',
      items: ['Company Story', 'Our Team', 'Mission & Values', 'Pundi X Partnership']
    },
    {
      title: 'FAQ',
      description: 'Find answers to the most commonly asked questions about our platform',
      icon: <HelpCircle className="w-8 h-8" />,
      href: '/resources/faq',
      items: ['Getting Started', 'Payments', 'Security', 'Compliance']
    },
    {
      title: 'Legal',
      description: 'Terms of use, privacy policy, and regulatory compliance information',
      icon: <FileText className="w-8 h-8" />,
      href: '/resources/legal',
      items: ['Terms of Use', 'Privacy Policy', 'Compliance', 'Security']
    },
    {
      title: 'Blog',
      description: 'Latest news, insights, and updates from the world of stablecoin and crypto payments',
      icon: <Newspaper className="w-8 h-8" />,
      href: '/resources/blog',
      items: ['Industry News', 'Product Updates', 'Case Studies', 'Tutorials']
    },
    {
      title: 'User Manual',
      description: 'Step-by-step guides and tutorials for using our platform effectively',
      icon: <Book className="w-8 h-8" />,
      href: '/resources/user-manual',
      items: ['Setup Guides', 'Integration Help', 'Troubleshooting', 'Best Practices']
    }
  ]

  const popularResources = [
    {
      title: 'Getting Started with Ezeebit',
      type: 'Guide',
      readTime: '5 min read',
      href: '/resources/user-manual',
      description: 'Complete setup guide for new merchants'
    },
    {
      title: 'Understanding Crypto Payment Fees',
      type: 'FAQ',
      readTime: '3 min read',
      href: '/resources/faq',
      description: 'Transparent breakdown of all costs'
    },
    {
      title: 'FSCA Compliance Explained',
      type: 'Legal',
      readTime: '7 min read',
      href: '/resources/legal',
      description: 'How we ensure regulatory compliance'
    },
    {
      title: 'The Future of African Fintech',
      type: 'Blog',
      readTime: '8 min read',
      href: '/resources/blog',
      description: 'Industry insights and trends'
    }
  ]

  const quickLinks = [
    { name: 'API Documentation', href: '/developers', icon: <Book className="w-4 h-4" /> },
    { name: 'Contact Support', href: '/contact', icon: <HelpCircle className="w-4 h-4" /> },
    { name: 'Merchant Portal', href: 'https://merchant.ezeebit.com/#/login', icon: <Users className="w-4 h-4" /> },
    { name: 'Status Page', href: 'https://status.ezeebit.com', icon: <Clock className="w-4 h-4" /> }
  ]

  const needle = query.trim().toLowerCase()
  const matches = (parts: string[]) => !needle || parts.join(' ').toLowerCase().includes(needle)
  const visibleCategories = resourceCategories.filter((category) =>
    matches([category.title, category.description, ...category.items])
  )
  const visiblePopular = popularResources.filter((resource) =>
    matches([resource.title, resource.type, resource.description])
  )

  return (
    <>
      <SEO
        title="Guides, FAQs, and support for merchants"
        description="Guides, FAQs, legal information, and the blog for merchants and platforms using Ezeebit for crypto and stablecoin payments."
        canonicalUrl="/resources"
        crumbs={[{ name: 'Guides and support', path: '/resources' }]}
        pageType="CollectionPage"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="overflow-hidden -mt-20"
    >
      {/* Hero Section */}
      <PageHero
        kicker="Resources"
        title="Resources"
        accent="and support"
        description="Everything you need to succeed with Ezeebit. From getting started guides to legal documentation, we've got you covered."
      >
        <HeroSearch placeholder="Search resources, guides, and FAQs..." value={query} onChange={setQuery} />
      </PageHero>

      {/* Resource Categories */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="sr-only">Browse by topic</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {needle && visibleCategories.length === 0 && (
              <p className="col-span-full text-center text-neutral-600">No guides match “{query.trim()}”.</p>
            )}
            {visibleCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 hover:border-neutral-300 group"
              >
                <div className="w-12 h-12 bg-neutral-950 text-primary-400 rounded-xl flex items-center justify-center mb-4 [&_svg]:w-6 [&_svg]:h-6">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {category.title}
                </h3>
                <p className="text-neutral-600 mb-4">
                  {category.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {category.items.map((item) => (
                    <li key={item} className="text-sm text-neutral-500 flex items-center">
                      <div className="w-1.5 h-1.5 bg-neutral-300 rounded-full mr-2"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to={category.href}
                  className="flex items-center text-primary-500 hover:text-primary-700 font-medium group-hover:translate-x-1 transition-transform"
                >
                  Explore {category.title}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Resources */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="section-head"
          >
            <h2 className="section-title">
              Popular resources
            </h2>
            <p className="section-lead">
              Most accessed guides and articles to help you get the most out of Ezeebit.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {needle && visiblePopular.length === 0 && (
              <p className="col-span-full text-center text-neutral-600">No articles match “{query.trim()}”.</p>
            )}
            {visiblePopular.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                    {resource.type}
                  </span>
                  <div className="flex items-center text-neutral-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {resource.readTime}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {resource.title}
                </h3>
                <p className="text-neutral-600 mb-4">
                  {resource.description}
                </p>
                <Link
                  to={resource.href}
                  className="text-primary-500 hover:text-primary-700 font-medium flex items-center"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="section-head"
          >
            <h2 className="section-title">
              Quick links
            </h2>
            <p className="section-lead">
              Fast access to the most important tools and support channels.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.href}
                  className="card p-6 text-center lg:text-left hover:border-neutral-300 group"
                >
                  <div className="w-12 h-12 bg-neutral-950 rounded-xl flex items-center justify-center mx-auto lg:mx-0 mb-3 text-primary-400 [&_svg]:w-6 [&_svg]:h-6">
                    {link.icon}
                  </div>
                  <span className="text-sm font-medium text-neutral-900 group-hover:text-primary-500 transition-colors">
                    {link.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden bg-neutral-950 text-white">
        <DarkBackdrop glow="left" />
        <div className="relative container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
              Need more help?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-neutral-300">
              Can't find what you're looking for? Our support team is here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://merchant.ezeebit.com/#/signup" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={HERO_PRIMARY}
              >
                Get started
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </a>
              <Link to="/contact" className={HERO_SECONDARY}>
                Contact support
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
    </>
  )
}

export default Resources