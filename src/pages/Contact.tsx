import { motion } from 'framer-motion'
import {
  Mail, Phone, Clock,
  Headphones, Users, ArrowRight, CheckCircle
} from 'lucide-react'
import SEO from '../components/SEO'

const Contact = () => {
  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Support",
      description: "Speak directly with our support team",
      contact: "+27 21 879 5074",
      availability: "Mon-Fri, 8AM-6PM SAST"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      description: "Get detailed help via email",
      contact: "support@ezeebit.com",
      availability: "24/7 response within 2 hours"
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "WhatsApp Support",
      description: "Quick support via WhatsApp",
      contact: "+27 79 443 9375",
      availability: "Mon-Fri, 8AM-6PM SAST"
    }
  ]

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Ezeebit. Our team is available 24/7 to help with sales inquiries, technical support, and partnership opportunities."
        canonicalUrl="/contact"
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
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
              Have questions about our crypto payment solutions? Our team is here to help you 
              get started and support your business every step of the way.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-neutral-500">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>Expert Team</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Quick Response</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Choose the contact method that works best for you. We're available across multiple channels.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 text-center hover:scale-105 transition-transform w-full max-w-xs h-full flex flex-col"
              >
                <div className="flex-1">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary-500">
                    {method.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-3">
                    {method.description}
                  </p>
                  <div className="text-primary-500 font-medium mb-2">
                    {method.contact}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {method.availability}
                  </div>
                </div>
                <div className="mt-4">
                  {method.title === 'Phone Support' ? (
                    <a
                      href={`tel:${method.contact}`}
                      className="btn-primary w-full flex items-center justify-center"
                    >
                      Call Now
                    </a>
                  ) : method.title === 'Email Support' ? (
                    <a
                      href={`mailto:${method.contact}`}
                      className="btn-primary w-full flex items-center justify-center"
                    >
                      Email Us
                    </a>
                  ) : (
                    <a
                      href={`https://wa.me/${method.contact.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full flex items-center justify-center"
                    >
                      Message Us
                    </a>
                  )}
                </div>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Don't wait to transform your payment system. Join hundreds of merchants already accepting stablecoin and crypto payments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://forms.zohopublic.com/jonnyeze1/form/SignUp/formperma/9fAqEbBhSgAbpaRJPz9aEsfTxy4PdQRx4FEzRCXuxfk"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-500 hover:bg-neutral-100 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </a>
              <a
                href="mailto:support@ezeebit.com?subject=Schedule%20Demo"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-500 font-medium px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                Schedule Demo
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      </motion.div>
    </>
  )
}

export default Contact