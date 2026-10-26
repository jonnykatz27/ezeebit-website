/**
 * The backdrop of a "dark moment": one static, off-centre glow in the deep
 * brand blue, with an optional quiet texture beneath it. The section itself
 * supplies the Near Black surface (bg-neutral-950) and `relative
 * overflow-hidden`; its content sits in a `relative` layer above this.
 *
 * Dark moments are the brand's rare emphasis: at most three on a page and
 * never two in a row, so it is the contrast that draws the eye, not colour.
 */
const DarkBackdrop = ({ glow = 'right', texture }: {
  /** Which side the glow sits on, so neighbouring dark moments don't mirror each other. */
  glow?: 'left' | 'right'
  /** A decorative texture from /public/generated, given at its two sizes. */
  texture?: { src: string; srcSet: string }
}) => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0">
    {texture && (
      <img
        src={texture.src}
        srcSet={texture.srcSet}
        sizes="100vw"
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover !m-0"
      />
    )}
    {/*
      A radial gradient fades to nothing on its own. A blurred circle at this
      size kept a visible edge across wide, short sections like the stats band.
    */}
    <div
      className={`absolute w-[75%] h-[180%] ${glow === 'right' ? '-right-[20%] -top-[40%]' : '-left-[20%] -bottom-[40%]'}`}
      style={{
        background: 'radial-gradient(closest-side, color-mix(in srgb, var(--color-primary-800) 55%, transparent), transparent)',
      }}
    />
  </div>
)

export default DarkBackdrop
