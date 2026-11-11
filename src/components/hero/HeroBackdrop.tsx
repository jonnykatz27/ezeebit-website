import HeroTracers from './HeroTracers'

/**
 * The backdrop behind every page hero: Near Black, still glows in the deepest
 * brand blues, and a faint grid with tracers of light running along it (see
 * HeroTracers), clear of the copy. The tracers are the only thing that moves.
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
    {/* The grid keeps clear of the copy: the left of a split hero, the middle of a stacked one */}
    <HeroTracers clear={glow === 'top' ? 'centre' : 'side'} />
  </div>
)

export default HeroBackdrop
