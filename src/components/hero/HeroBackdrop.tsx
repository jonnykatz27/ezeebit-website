/**
 * The light, slowly moving backdrop behind a page hero: two soft blue glows
 * that drift, and a fine grid that fades out towards the edges. Pure CSS, so
 * it costs nothing to run and stops for anyone who prefers reduced motion.
 */
const HeroBackdrop = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-primary-50/60" />
    <div className="hero-blob hero-blob-a absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-primary-200/50 blur-3xl" />
    <div className="hero-blob hero-blob-b absolute top-1/3 -left-40 h-[28rem] w-[28rem] rounded-full bg-primary-100/70 blur-3xl" />
    <div className="hero-grid absolute inset-0" />
  </div>
)

export default HeroBackdrop
