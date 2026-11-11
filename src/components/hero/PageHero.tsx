import type { ReactNode } from 'react'
import { motion } from '../../lib/motion'
import { Search } from 'lucide-react'
import HeroBackdrop from './HeroBackdrop'
import { EASE } from './heroKit'

/** Each line of a hero rises in after the one before it. */
export const HERO_ITEM = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

/** Button sizes shared by every hero, on top of the site's btn-* styles. */
export const HERO_PRIMARY = 'btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 flex items-center justify-center'
/**
 * The secondary hero button is an outline on the dark hero, so Ezeebit Blue
 * stays the one filled button the eye goes to.
 */
export const HERO_SECONDARY =
  'rounded-xl font-medium text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-200 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] flex items-center justify-center'

/** The search field some heroes carry, styled the same on every page. */
export const HeroSearch = ({ placeholder, value, onChange }: { placeholder: string; value?: string; onChange?: (value: string) => void }) => (
  <div className="max-w-2xl mx-auto">
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
      <input
        type="text"
        aria-label={placeholder}
        placeholder={placeholder}
        value={value}
        onChange={onChange && ((e) => onChange(e.target.value))}
        className="w-full pl-12 pr-4 py-3.5 md:py-4 rounded-xl border border-white/10 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-base md:text-lg"
      />
    </div>
  </div>
)

type PageHeroProps = {
  /** The first line of the headline. */
  title: ReactNode
  /** The second line, in Blue Mid. */
  accent?: ReactNode
  description?: ReactNode
  /** Buttons, laid out in a row. */
  actions?: ReactNode
  /** Short reassurance points under the buttons. */
  trust?: { icon: ReactNode; label: string }[]
  /** An illustration. With one, the hero splits into two columns. */
  visual?: ReactNode
  /** Anything else under the description, such as a search field. */
  children?: ReactNode
  /** Adds schema.org itemProps to the headline and description. */
  itemProps?: boolean
  /**
   * Lets the visual run into the page margin on wide screens, for a hero
   * whose product visual is the focal point. Only as far as the margin
   * allows: into the container padding at xl, and the wider gutter at 2xl.
   */
  bleedVisual?: boolean
  /**
   * Centres a larger headline over the visual instead of beside it, with the
   * glow coming from the top, for the homepage, where the headline leads.
   */
  stacked?: boolean
  /** Small label above the headline. Stays outside the entrance animation. */
  kicker?: ReactNode
  /**
   * A full-width block under the headline, outside the entrance animation,
   * so it paints with the h1 and is not capped at the illustration width.
   */
  wideVisual?: ReactNode
  id?: string
}

/**
 * The hero at the top of every page, on Near Black: the same backdrop,
 * headline scale, entrance, and spacing everywhere. Pages with an
 * illustration get text on the left and the visual on the right; the rest
 * are centred. The real product UI in the illustrations reads as white
 * cards against the dark.
 */
const PageHero = ({ title, accent, description, actions, trust, visual, children, itemProps, bleedVisual, stacked, kicker, wideVisual, id }: PageHeroProps) => {
  const split = Boolean(visual) && !stacked
  const align = split ? 'text-center lg:text-left' : 'text-center'
  const justify = split ? 'justify-center lg:justify-start' : 'justify-center'

  const text = (
    <div className={`${align} ${split ? 'lg:col-span-6' : stacked ? 'max-w-7xl mx-auto' : 'max-w-3xl mx-auto'}`}>
      {/*
        hero-title opts out of the site-wide phone rule that pins every h1 to
        30px. The headline stays outside the entrance animation: it is the LCP
        text, and data-entrance would hide it until hydration. The phone clamp
        is a step below the old 10vw size so "Stablecoin payments," stays on
        one line at 390px.
      */}
      {kicker && (
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-400 mb-4">
          {kicker}
        </p>
      )}
      <h1
        itemProp={itemProps ? 'name' : undefined}
        className={`hero-title font-display font-bold text-white mb-5 sm:mb-6 !leading-[1.04] tracking-[-0.03em] ${
          split
            ? 'text-[clamp(1.7rem,8.2vw,2.15rem)] sm:text-6xl lg:text-[3rem] xl:text-[3.75rem]'
            : stacked
              ? 'text-[clamp(2.1rem,10vw,2.6rem)] sm:text-6xl lg:text-7xl xl:text-[5.25rem]'
              : 'text-[clamp(1.7rem,8.2vw,2.15rem)] sm:text-[3.25rem] lg:text-[3.75rem]'
        }`}
      >
        <span className="block">{title}</span>
        {accent && <span className="block text-primary-400">{accent}</span>}
      </h1>

      {description && (
        <p
          itemProp={itemProps ? 'description' : undefined}
          className={`text-lg lg:text-xl text-neutral-300 leading-relaxed mb-8 ${split ? 'max-w-xl mx-auto lg:mx-0' : stacked ? 'max-w-3xl mx-auto' : 'max-w-2xl mx-auto'}`}
        >
          {description}
        </p>
      )}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
      {actions && (
        <motion.div variants={HERO_ITEM} className={`flex flex-col sm:flex-row gap-3 mb-8 ${justify}`}>
          {actions}
        </motion.div>
      )}

      {children && <motion.div variants={HERO_ITEM}>{children}</motion.div>}

      {trust && (
        <motion.div variants={HERO_ITEM} className={`flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-400 ${justify}`}>
          {trust.map((t) => (
            <div key={t.label} className="flex items-center gap-1.5 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-primary-400">
              {t.icon}
              {t.label}
            </div>
          ))}
        </motion.div>
      )}
      </motion.div>
    </div>
  )

  return (
    <section id={id} className={`relative overflow-hidden ${stacked ? 'pt-40 lg:pt-44' : 'pt-40 lg:pt-48'} ${split ? 'pb-14 lg:pb-24' : 'pb-12 lg:pb-20'}`}>
      <HeroBackdrop glow={stacked ? 'top' : 'side'} />
      <div className="container-custom relative z-10">
        {split ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {text}
            <div className={`lg:col-span-6 ${bleedVisual ? 'xl:-mr-6 2xl:-mr-20' : ''}`}>{visual}</div>
          </div>
        ) : (
          <>
            {text}
            {wideVisual && <div className="mt-12 lg:mt-16">{wideVisual}</div>}
            {visual && <div className="mt-12 lg:mt-16 mx-auto max-w-[620px]">{visual}</div>}
          </>
        )}
      </div>
    </section>
  )
}

export default PageHero
