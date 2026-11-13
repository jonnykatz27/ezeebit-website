import { useEffect } from 'react'
import { motion } from '../lib/motion'
import {
  Mail, Phone, Clock,
  Headphones, Users, ArrowRight, CheckCircle
} from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import PageHero, { HERO_PRIMARY, HERO_SECONDARY } from '../components/hero/PageHero'
import DarkBackdrop from '../components/DarkBackdrop'

const ZENDESK_SRC = 'https://static.zdassets.com/ekr/snippet.js?key=a6ca5c3e-5ecf-45c9-82f0-40e61445fead'

const Contact = () => {
  useEffect(() => {
    let loaded = false
    let idleId = 0
    const load = () => {
      if (loaded || document.getElementById('ze-snippet')) return
      loaded = true
      const script = document.createElement('script')
      script.id = 'ze-snippet'
      script.src = ZENDESK_SRC
      script.async = true
      document.body.appendChild(script)
    }
    const onInteract = () => load()
    window.addEventListener('pointerdown', onInteract, { passive: true })
    window.addEventListener('keydown', onInteract)
    const scheduleIdle = () => {
      idleId = window.requestIdleCallback(load, { timeout: 8000 })
    }
    if (document.readyState === 'complete') scheduleIdle()
    else window.addEventListener('load', scheduleIdle, { once: true })

    return () => {
      window.removeEventListener('pointerdown', onInteract)
      window.removeEventListener('keydown', onInteract)
      window.removeEventListener('load', scheduleIdle)
      if (idleId) window.cancelIdleCallback(idleId)
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
      availability: "Monday to Friday, 8am to 6pm SAST",
      action: { label: "Call us", href: "tel:+27218795074" }
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email support",
      description: "Get detailed help via email",
      contact: "support@ezeebit.com",
      availability: "24/7",
      action: { label: "Send an email", href: "mailto:support@ezeebit.com" }
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "WhatsApp support",
      description: "Quick support via WhatsApp",
      contact: "+27 79 443 9375",
      availability: "Monday to Friday, 8am to 6pm SAST",
      action: { label: "Start a chat", href: "https://wa.me/27794439375" }
    }
  ]

  return (
    <>
      <SEO
        title="Contact Ezeebit: phone, email, and WhatsApp"
        description="Talk to Ezeebit about in-store payments, online checkout, payouts, or the API. Support by email 24/7, and by phone or WhatsApp on weekdays, from Cape Town."
        canonicalUrl="/contact"
        crumbs={[{ name: 'Contact', path: '/contact' }]}
        pageType="ContactPage"
      />
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-hidden -mt-20"
    >
      {/* Hero Section */}
      <PageHero
        kicker="Contact"
        title="Get in touch"
        accent="with our team"
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
            className="section-head"
          >
            <h2 className="section-title">
              Multiple ways to reach us
            </h2>
            <p className="section-lead">
              Choose the contact method that works best for you. We're available across multiple channels.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 text-center w-full h-full flex flex-col"
              >
                <div className="flex-1">
                  <div className="w-12 h-12 bg-neutral-950 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary-400 [&_svg]:w-6 [&_svg]:h-6">
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
                  <a
                    href={method.action.href}
                    {...(method.action.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="btn-primary w-full flex items-center justify-center"
                  >
                    {method.action.label}
                  </a>
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
              Don't wait to transform your payment system. Join 100+ platforms and businesses already accepting stablecoin and crypto payments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://merchant.ezeebit.com/#/signup"
                target="_blank"
                rel="noopener noreferrer"
                className={HERO_PRIMARY}
              >
                Get started free
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </a>
              <Link to="/book-a-call" className={HERO_SECONDARY}>
                Book a call
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      </motion.div>
    </>
  )
}

export default Contact