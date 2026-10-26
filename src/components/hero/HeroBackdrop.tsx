/**
 * The slowly moving backdrop behind a page hero: a soft blue tint, two glows
 * that drift, and a fine grid that fades out towards the edges. Pure CSS, so
 * it costs nothing to run and stops for anyone who prefers reduced motion.
 *
 * `into` says what the section below is. Into a dark section, the bottom of
 * the hero deepens through the darkest brand blue into Near Black, so the
 * page runs on into it rather than cutting from light to dark.
 */
const HeroBackdrop = ({ into = 'light' }: { into?: 'light' | 'dark' }) => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-primary-50 via-primary-100/60 to-primary-100" />
    <div className="hero-blob hero-blob-a absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-primary-200/70 blur-3xl" />
    <div className="hero-blob hero-blob-b absolute top-1/3 -left-40 h-[28rem] w-[28rem] rounded-full bg-primary-200/50 blur-3xl" />
    <div className="hero-grid absolute inset-0" />
    {/* Into a light section, the deeper tint eases back to white so there's no line where the hero ends */}
    {into === 'light' && <div className="absolute inset-x-0 bottom-0 h-24 lg:h-32 bg-gradient-to-b from-transparent to-white" />}
    {into === 'dark' && (
      // Through a light brand blue before the deep one: straight from pale blue to navy
      // the midpoint mixes to a flat slate grey
      <div
        className="absolute inset-x-0 bottom-0 h-56 lg:h-72"
        style={{
          background: `linear-gradient(to bottom,
            transparent 0%,
            color-mix(in srgb, var(--color-primary-300) 22%, transparent) 30%,
            color-mix(in srgb, var(--color-primary-800) 88%, transparent) 72%,
            var(--color-neutral-950) 100%)`,
        }}
      />
    )}
  </div>
)

export default HeroBackdrop
