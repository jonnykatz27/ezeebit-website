/**
 * The backdrop behind every page hero: Near Black, one static glow in the
 * deepest brand blue behind the illustration, and a fine grid that fades out
 * towards the edges. Pure CSS, and nothing moves.
 */
const HeroBackdrop = ({ glow = 'side' }: { glow?: 'side' | 'top' }) => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden bg-neutral-950">
    {glow === 'top' ? (
      // A centred hero: one glow from above the headline, ending well inside the hero
      <>
      <div
        className="absolute -top-[35%] left-1/2 -translate-x-1/2 w-[110%] lg:w-[80%] h-[85%]"
        style={{ background: 'radial-gradient(closest-side, color-mix(in srgb, var(--color-primary-800) 80%, transparent), transparent)' }}
      />
      {/* and a second under the illustration, so the black gives way to blue around its cards. Its box ends at the hero's edge, where it has faded out */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] lg:w-[110%] h-[75%] lg:h-[70%]"
        style={{ background: 'radial-gradient(closest-side, color-mix(in srgb, var(--color-primary-800) 85%, transparent), color-mix(in srgb, var(--color-primary-900) 55%, transparent) 60%, transparent)' }}
      />
      </>
    ) : (
      <>
    <div
      className="absolute -top-[25%] right-[-15%] w-[75%] h-[110%]"
      style={{ background: 'radial-gradient(closest-side, color-mix(in srgb, var(--color-primary-800) 75%, transparent), transparent)' }}
    />
    {/* Each glow's box ends inside the hero, so it has faded to nothing by the bottom edge and leaves no seam */}
    <div
      className="absolute top-[25%] -left-[20%] w-[55%] h-[75%]"
      style={{ background: 'radial-gradient(closest-side, color-mix(in srgb, var(--color-primary-900) 80%, transparent), transparent)' }}
    />
      </>
    )}
    {/* The grid fades out around the glow: over to the right beside a split hero, centred under a stacked one */}
    <div className={`hero-grid absolute inset-0 ${glow === 'top' ? 'hero-grid-centre' : ''}`} />
  </div>
)

export default HeroBackdrop
