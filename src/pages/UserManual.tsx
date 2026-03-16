import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Book, Search, Download,
  ArrowRight, Clock, UserPlus, FileText
} from 'lucide-react'

const UserManual = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const manualCards = [
    {
      id: 'user-guide',
      title: 'Ezeebit User Guide',
      subtitle: 'This section contains all the steps required to show customers how to pay using the ePOS system',
      icon: <FileText className="w-6 h-6" />,
      downloadUrl: '/Ezeebit_User_Guide.pdf',
      downloadLabel: 'Download User Guide'
    },
    {
      id: 'create-account',
      title: 'Create Your Account',
      subtitle: 'Sign up for an Ezeebit merchant account with your business details',
      estimatedTime: 'Est. 10 minutes',
      icon: <UserPlus className="w-6 h-6" />,
      steps: [
        'Visit ezeebit.com and click "Sign Up"',
        'Fill in your business information',
        'Verify your email address',
        'Complete KYC verification',
        'Wait for account approval (usually 24-48 hours)'
      ]
    },
    {
      id: 'welcome-pack',
      title: 'Welcome Pack',
      subtitle: 'This section contains steps to help users set up their merchant portal and Ezeebit Pay',
      icon: <Book className="w-6 h-6" />,
      downloadUrl: '/Welcome_Pack.pdf',
      downloadLabel: 'Download Welcome Pack'
    }
  ]

  return (
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
              User <span className="text-gradient">Manual</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
              Comprehensive guides and tutorials to help you get the most out of your Ezeebit account. 
              From setup to advanced features, we've got you covered.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search guides and tutorials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {manualCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-6 h-full flex flex-col"
                >
                  {/* Card Header */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-500 mr-4">
                      {card.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-neutral-900 mb-1">
                        {card.title}
                      </h3>
                      {card.estimatedTime && (
                        <div className="flex items-center text-sm text-neutral-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {card.estimatedTime}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex-1">
                    <p className="text-neutral-600 mb-6 text-center">
                      {card.subtitle}
                    </p>

                    {/* Steps for Create Account card */}
                    {card.steps && (
                      <div className="space-y-3">
                        <ol className="list-decimal list-inside space-y-2 text-neutral-700">
                          {card.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="text-sm leading-relaxed">
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>

                  {card.downloadUrl && (
                    <div className="mt-6 pt-4 border-t border-neutral-100">
                      <a
                        href={card.downloadUrl}
                        download
                        className="w-full bg-primary-500 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        {card.downloadLabel}
                      </a>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Need More Help?
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you succeed.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link to="/contact" className="btn-primary flex-1 text-center">
              Contact Support
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Link>
            <Link to="/resources/faq" className="btn-outline flex-1 text-center">
              View FAQ
            </Link>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Was This Helpful?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Help us improve our documentation by rating this guide and sharing your feedback.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-500 hover:bg-neutral-100 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center">
                Leave Feedback
              </button>
              <Link to="/contact" className="border-2 border-white text-white hover:bg-white hover:text-primary-500 font-medium px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center">
                Suggest Improvement
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default UserManual