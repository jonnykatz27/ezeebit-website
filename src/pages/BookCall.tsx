import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowRight, Check, Pencil } from 'lucide-react'
import { motion } from '../lib/motion'
import SEO from '../components/SEO'
import PageHero, { HERO_PRIMARY } from '../components/hero/PageHero'
import CalendlyEmbed from '../components/CalendlyEmbed'

/**
 * The sales call on Calendly, in the site's own colours, without the panel
 * that repeats the host and the meeting name (this page says both).
 */
const EVENT = 'https://calendly.com/ezeebit-sales/30min?primary_color=0074e4&text_color=111827&background_color=ffffff&hide_event_type_details=1'

/** The questions from the team's Calendly routing form, with its options word for word. */
const SIZES = ['1-10', '11-20', '21-50', '51-100', '101-200', '200+']
const VOLUMES = ['Under $25,000', '$25,000-$50,000', '$50,000-$100,000', '$100,000-$1,000,000', '$1,000,000-$10,000,000', 'Over $10,000,000', 'Not Sure']

type Details = {
  firstName: string
  lastName: string
  jobTitle: string
  email: string
  company: string
  website: string
  size: string
  volume: string
  industry: string
  problems: string
}

const EMPTY: Details = { firstName: '', lastName: '', jobTitle: '', email: '', company: '', website: '', size: '', volume: '', industry: '', problems: '' }

/**
 * The calendar's address with the visitor's answers in it. Calendly fills
 * its own name and email from `name` and `email`; the event has one question
 * of its own, so everything else goes into it (`a1`) as one line.
 */
const bookingUrl = (d: Details) => {
  const notes = [
    `Job title: ${d.jobTitle}`,
    `Company: ${d.company}`,
    `Website: ${d.website}`,
    `Company size: ${d.size}`,
    `Monthly volume: ${d.volume}`,
    `Industry: ${d.industry}`,
    d.problems.trim() && `Hoping to solve: ${d.problems.trim().replace(/\s+/g, ' ')}`,
  ].filter(Boolean).join(' · ')
  const params = new URLSearchParams({ name: `${d.firstName} ${d.lastName}`.trim(), email: d.email, a1: notes })
  return `${EVENT}&${params.toString()}`
}

/**
 * A light bot check, with nothing for a person to do. Simple bots fill in
 * every field they find and send a form the instant it loads, so the form has
 * a field people never see, and will not go on until it has been open a few
 * seconds. It is not a captcha: the calendar's own address is public, so
 * bookings themselves are guarded by Calendly.
 */
const MIN_FILL_MS = 4000

const INPUT =
  'block w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30'

const Field = ({ label, optional, wide, children }: { label: string; optional?: boolean; wide?: boolean; children: ReactNode }) => (
  <label className={`block ${wide ? 'sm:col-span-2' : ''}`}>
    <span className="mb-1.5 block text-sm font-medium text-neutral-800">
      {label}
      {optional && <span className="font-normal text-neutral-500"> (optional)</span>}
    </span>
    {children}
  </label>
)

/** Two steps, named over the form so the visitor knows a calendar follows. */
const Steps = ({ at }: { at: 1 | 2 }) => (
  <ol className="mb-8 flex items-center justify-center gap-3 text-sm lg:justify-start">
    {['Your details', 'Pick a time'].map((label, i) => {
      const n = (i + 1) as 1 | 2
      const done = n < at
      const on = n === at
      return (
        <li key={label} className="flex items-center gap-3">
          {i > 0 && <span className="h-px w-8 bg-neutral-300" aria-hidden="true" />}
          <span className={`flex items-center gap-2 font-semibold ${on ? 'text-neutral-900' : 'text-neutral-500'}`} aria-current={on ? 'step' : undefined}>
            <span className={`flex size-6 items-center justify-center rounded-full text-xs ${done ? 'bg-success-500 text-white' : on ? 'bg-primary-500 text-white' : 'bg-neutral-200 text-neutral-600'}`}>
              {done ? <Check className="h-3.5 w-3.5" /> : n}
            </span>
            {label}
          </span>
        </li>
      )
    })}
  </ol>
)

/**
 * Book a call with the team: the page every "Talk to sales" and "Book a call"
 * button leads to. The questions are a form of the site's own, so they show
 * the moment the page opens. Meanwhile Calendly loads out of sight, and once
 * the form is sent the calendar opens in its place with the answers already
 * filled in, to pick a time and confirm. Nothing is stored by the site: the
 * answers reach the team with the booking. The Contact page keeps support.
 */
const BookCall = () => {
  const [details, setDetails] = useState<Details>(EMPTY)
  const [sent, setSent] = useState<Details | null>(null)
  const [booked, setBooked] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const openedAt = useRef(0)
  const trap = useRef<HTMLInputElement>(null)
  useEffect(() => {
    openedAt.current = Date.now()
  }, [])
  const set = (key: keyof Details) => (e: { target: { value: string } }) => setDetails((d) => ({ ...d, [key]: e.target.value }))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    // A filled-in hidden field means a bot: go no further, and say nothing that helps it adapt
    if (trap.current?.value) {
      setNotice('Something went wrong. Please try again in a moment.')
      return
    }
    if (Date.now() - openedAt.current < MIN_FILL_MS) {
      setNotice('Please check your details, then choose a time.')
      return
    }
    setNotice(null)
    setSent(details)
    requestAnimationFrame(() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return (
    <>
      <SEO
        title="Book a call with the Ezeebit team"
        description="Tell us about your business and pick a time to talk to the Ezeebit team about crypto and stablecoin pay-ins, payouts, and pricing."
        canonicalUrl="/book-a-call"
        crumbs={[{ name: 'Book a call', path: '/book-a-call' }]}
      />
      {/* Open the connection to Calendly while this page's own script is still loading */}
      <Helmet>
        <link rel="preconnect" href="https://calendly.com" />
        <link rel="preconnect" href="https://assets.calendly.com" />
      </Helmet>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-hidden -mt-20">
        <PageHero
          kicker="Talk to sales"
          title="Book a call"
          accent="with the team."
          description="Tell us a little about your business, then pick a time that suits you. We will walk through pay-ins, payouts, and pricing on a 30-minute call on Microsoft Teams."
          itemProps
        />

        <section id="booking" className="relative scroll-mt-20 bg-white py-10 lg:py-16">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl">
              <Steps at={sent ? 2 : 1} />

              {!sent ? (
                <form onSubmit={submit} className="relative grid gap-5 sm:grid-cols-2">
                  {/* The bot check: out of sight and out of the tab order, so only a bot fills it in */}
                  <div className="sr-only pointer-events-none" aria-hidden="true">
                    <label>
                      Leave this field empty
                      <input ref={trap} type="text" name="ezb_contact_ref" tabIndex={-1} autoComplete="off" defaultValue="" />
                    </label>
                  </div>
                  <Field label="First name">
                    <input required autoComplete="given-name" value={details.firstName} onChange={set('firstName')} className={INPUT} />
                  </Field>
                  <Field label="Last name">
                    <input required autoComplete="family-name" value={details.lastName} onChange={set('lastName')} className={INPUT} />
                  </Field>
                  <Field label="Job title">
                    <input required autoComplete="organization-title" value={details.jobTitle} onChange={set('jobTitle')} className={INPUT} />
                  </Field>
                  <Field label="Work email">
                    <input required type="email" autoComplete="email" value={details.email} onChange={set('email')} className={INPUT} />
                  </Field>
                  <Field label="Company name">
                    <input required autoComplete="organization" value={details.company} onChange={set('company')} className={INPUT} />
                  </Field>
                  <Field label="Company website">
                    <input required inputMode="url" autoComplete="url" placeholder="example.com" value={details.website} onChange={set('website')} className={INPUT} />
                  </Field>
                  <Field label="Company size">
                    <select required value={details.size} onChange={set('size')} className={`${INPUT} ${details.size ? '' : 'text-neutral-400'}`}>
                      <option value="" disabled>Select…</option>
                      {SIZES.map((s) => <option key={s} value={s} className="text-neutral-900">{s} people</option>)}
                    </select>
                  </Field>
                  <Field label="Expected monthly transaction volume">
                    <select required value={details.volume} onChange={set('volume')} className={`${INPUT} ${details.volume ? '' : 'text-neutral-400'}`}>
                      <option value="" disabled>Select…</option>
                      {VOLUMES.map((v) => <option key={v} value={v} className="text-neutral-900">{v === 'Not Sure' ? 'Not sure' : v}</option>)}
                    </select>
                  </Field>
                  <Field label="Industry" wide>
                    <input required placeholder="For example gaming, retail, or payments" value={details.industry} onChange={set('industry')} className={INPUT} />
                  </Field>
                  <Field label="What problems are you hoping to solve?" optional wide>
                    <textarea rows={4} maxLength={600} value={details.problems} onChange={set('problems')} className={`${INPUT} resize-y`} />
                  </Field>
                  <div className="sm:col-span-2 flex flex-col items-center gap-3 pt-1 sm:flex-row sm:justify-between">
                    <p className={`text-sm ${notice ? 'font-medium text-error-600' : 'text-neutral-500'}`} role={notice ? 'alert' : undefined}>
                      {notice ?? 'Next, you will pick a time.'}
                    </p>
                    <button type="submit" className={`${HERO_PRIMARY} w-full sm:w-auto`}>
                      Choose a time
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </form>
              ) : (
                !booked && (
                  <div className="mb-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 rounded-2xl bg-neutral-50 px-5 py-3 text-sm text-neutral-700 lg:justify-between">
                    <span>
                      Booking for <b className="font-semibold text-neutral-900">{sent.firstName} {sent.lastName}</b>, {sent.company}
                    </span>
                    <button type="button" onClick={() => setSent(null)} className="inline-flex items-center gap-1.5 font-semibold text-primary-600 hover:text-primary-700">
                      <Pencil className="h-3.5 w-3.5" />
                      Edit details
                    </button>
                  </div>
                )
              )}
            </div>

            {/* Loading from the moment the page opens; shown, with the answers, once the form is sent */}
            <div className="mx-auto max-w-5xl">
              <CalendlyEmbed url={sent ? bookingUrl(sent) : EVENT} show={!!sent} title="Pick a time for your call with Ezeebit" onScheduled={() => setBooked(true)} />
            </div>

            <p className="mt-8 text-center text-sm text-neutral-600">
              Need help with an account instead?{' '}
              <Link to="/contact" className="font-semibold text-primary-600 hover:underline">Contact support</Link>
            </p>
          </div>
        </section>
      </motion.div>
    </>
  )
}

export default BookCall
