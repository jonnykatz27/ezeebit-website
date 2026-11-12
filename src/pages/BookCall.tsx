import { Link } from 'react-router-dom'
import { motion } from '../lib/motion'
import SEO from '../components/SEO'
import PageHero from '../components/hero/PageHero'
import CalendlyEmbed from '../components/CalendlyEmbed'

/** The team's shared calendar, in Ezeebit Blue. */
const CALENDAR = 'https://calendly.com/d/dvcz-95m-9mt?primary_color=0074e4'

/**
 * Book a call with the team: the page every "Talk to sales" and "Book a call"
 * button leads to. The calendar is the page; the Contact page keeps support.
 */
const BookCall = () => (
  <>
    <SEO
      title="Book a call with the Ezeebit team"
      description="Pick a time to talk to the Ezeebit team about crypto and stablecoin pay-ins, payouts, and pricing for your platform or business."
      canonicalUrl="/book-a-call"
      crumbs={[{ name: 'Book a call', path: '/book-a-call' }]}
    />
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-hidden -mt-20">
      <PageHero
        kicker="Talk to sales"
        title="Book a call"
        accent="with the team."
        description="Tell us a little about your business, then pick a time that suits you. We will walk through pay-ins, payouts, and pricing."
        itemProps
      />

      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <CalendlyEmbed url={CALENDAR} title="Book a call with the Ezeebit team" />
            <p className="mt-6 text-center text-sm text-neutral-600">
              Need help with an account instead?{' '}
              <Link to="/contact" className="font-semibold text-primary-600 hover:underline">Contact support</Link>
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  </>
)

export default BookCall
