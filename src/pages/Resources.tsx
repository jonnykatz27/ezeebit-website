import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Book, HelpCircle, FileText, Newspaper, Users,
  ArrowRight, Search, Clock
} from 'lucide-react'
import SEO from '../components/SEO'

const Resources = () => {
  const resourceCategories = [
    {
      title: 'About Us',
      description: 'Learn about our mission, team, and journey in transforming African payments',
      icon: <Users className="w-8 h-8" />,
      href: '/resources/about',
      color: 'bg-blue-100 text-blue-600',
      items: ['Company Story', 'Our Team', 'Mission & Values', 'Pundi X Partnership']
    },
    {
      title: 'FAQ',
      description: 'Find answers to the most commonly asked questions about our platform',
      icon: <HelpCircle className="w-8 h-8" />,
      href: '/resources/faq',
      color: 'bg-green-100 text-green-600',
      items: ['Getting Started', 'Payments', 'Security', 'Compliance']
    },
    {
      title: 'Legal',
      description: 'Terms of service, privacy policy, and regulatory compliance information',
      icon: <FileText className="w-8 h-8" />,
      href: '/resources/legal',
      color: 'bg-purple-100 text-purple-600',
      items: ['Terms of Service', 'Privacy Policy', 'Compliance', 'Security']
    },
    {
      title: 'Blog',
      description: 'Latest news, insights, and updates from the world of stablecoin and crypto payments',
      icon: <Newspaper className="w-8 h-8" />,
      href: '/resources/blog',
      color: 'bg-orange-100 text-orange-600',
      items: ['Industry News', 'Product Updates', 'Case Studies', 'Tutorials']
    },
    {
      title: 'User Manual',
      description: 'Step-by-step guides and tutorials for using our platform effectively',
      icon: <Book className="w-8 h-8" />,
      href: '/resources/user-manual',
      color: 'bg-indigo-100 text-indigo-600',
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

  return (
    <>
      <SEO
        title="Resources"
        description="Everything you need to get the most out of Ezeebit. Access user guides, FAQs, legal documents, the latest blog posts, and our full merchant directory — all in one place."
        canonicalUrl="/resources"
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
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Resources & <span className="text-gradient">Support</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
              Everything you need to succeed with Ezeebit. From getting started guides to 
              legal documentation, we've got you covered.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search resources, guides, and FAQs..."
                  className="w-full pl-12 pr-4 py-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resourceCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 hover:scale-105 transition-transform group"
              >
                <div className={`w-16 h-16 ${category.color} rounded-lg flex items-center justify-center mb-4`}>
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
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-2"></div>
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
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Popular Resources
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Most accessed guides and articles to help you get the most out of Ezeebit.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularResources.map((resource, index) => (
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
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Quick Links
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
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
                  className="card p-6 text-center hover:scale-105 transition-transform group"
                >
                  <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-100 group-hover:text-primary-500 transition-colors">
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
      <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Need More Help?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Can't find what you're looking for? Our support team is here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://merchant.ezeebit.com/#/signup" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white text-primary-500 hover:bg-neutral-100 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </a>
              <Link to="/contact" className="border-2 border-white text-white hover:bg-white hover:text-primary-500 font-medium px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center">
                Contact Support
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