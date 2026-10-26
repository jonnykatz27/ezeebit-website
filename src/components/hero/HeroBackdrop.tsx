/**
 * The backdrop behind every page hero: Near Black, one static glow in the
 * deepest brand blue behind the illustration, and a fine grid that fades out
 * towards the edges. Pure CSS, and nothing moves.
 */
const HeroBackdrop = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden bg-neutral-950">
    <div
      className="absolute -top-[25%] right-[-15%] w-[75%] h-[110%]"
      style={{ background: 'radial-gradient(closest-side, color-mix(in srgb, var(--color-primary-800) 75%, transparent), transparent)' }}
    />
    {/* Each glow's box ends inside the hero, so it has faded to nothing by the bottom edge and leaves no seam */}
    <div
      className="absolute top-[25%] -left-[20%] w-[55%] h-[75%]"
      style={{ background: 'radial-gradient(closest-side, color-mix(in srgb, var(--color-primary-900) 80%, transparent), transparent)' }}
    />
    <div className="hero-grid absolute inset-0" />
  </div>
)

export default HeroBackdrop
