import { useEffect } from 'react'
import { motion } from '../lib/motion'
import {
  Mail, Phone, Clock,
  Headphones, Users, ArrowRight, CheckCircle
} from 'lucide-react'
import SEO from '../components/SEO'
import PageHero from '../components/hero/PageHero'
import DarkBackdrop from '../components/DarkBackdrop'

const Contact = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.id = 'ze-snippet'
    script.src = 'https://static.zdassets.com/ekr/snippet.js?key=a6ca5c3e-5ecf-45c9-82f0-40e61445fead'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.getElementById('ze-snippet')?.remove()
      // Remove the Zendesk widget iframe/container on unmount
      document.getElementById('launcher')?.remove()
      document.querySelectorAll('[data-product="web_widget"]').forEach(el => el.remove())
    }
  }, [])
  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone support",
      description: "Speak directly with our support team",
      contact: "+27 21 879 5074",
      availability: "Mon-Fri, 8AM-6PM SAST"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email support",
      description: "Get detailed help via email",
      contact: "support@ezeebit.com",
      availability: "24/7 response within 2 hours"
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "WhatsApp support",
      description: "Quick support via WhatsApp",
      contact: "+27 79 443 9375",
      availability: "Mon-Fri, 8AM-6PM SAST"
    }
  ]

  return (
    <>
      <SEO
        title="Contact"
        description="Talk to Ezeebit about in-store ePOS, online payments, payouts or the API. Cape Town, with support by phone and email."
        canonicalUrl="/contact"
        crumbs={[{ name: 'Contact', path: '/contact' }]}
      />
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-hidden -mt-20"
    >
      {/* Hero Section */}
      <PageHero
        title="Get in touch"
        accent="with our team"
        accentPlain
        description="Have questions about our crypto payment solutions? Our team is here to help you get started and support your business every step of the way."
        trust={[
          { icon: <Clock />, label: '24/7 support' },
          { icon: <Users />, label: 'Expert team' },
          { icon: <CheckCircle />, label: 'Quick response' },
        ]}
      />

      {/* Contact Methods */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Multiple ways to reach us
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
      <section className="section-padding relative overflow-hidden bg-neutral-950 text-white">
        <DarkBackdrop glow="left" />
        <div className="relative container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-neutral-300">
              Don't wait to transform your payment system. Join hundreds of merchants already accepting stablecoin and crypto payments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://merchant.ezeebit.com/#/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-500 text-white hover:bg-primary-600 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Open a merchant account
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </a>
              <a
                href="mailto:support@ezeebit.com?subject=Schedule%20Demo"
                className="border border-white/20 text-white hover:border-white/40 hover:bg-white/5 font-medium px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center"
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