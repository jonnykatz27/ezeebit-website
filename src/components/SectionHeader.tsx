import type { ReactNode } from 'react'

/** Small caps line above a heading, naming the section or which way the money moves. */
export const Eyebrow = ({ children, tone = 'light' }: { children: ReactNode; tone?: 'light' | 'dark' }) => (
  <p className={`text-xs font-semibold uppercase tracking-[0.14em] mb-3 ${tone === 'dark' ? 'text-primary-400' : 'text-primary-600'}`}>{children}</p>
)

/**
 * The header over a section, the same on every page: an optional eyebrow, the
 * heading, and a line of introduction. It sits to the left on a wide screen
 * and is centred on a phone, where a short block of text reads better in the
 * middle of a narrow column. `aside` sets it beside the section's content on
 * wide screens, inside a twelve-column grid. The sizes live in index.css
 * (.section-head, .section-title, .section-lead), so a header written by
 * hand on a page looks the same as this one.
 */
const SectionHeader = ({ eyebrow, title, intro, aside }: { eyebrow?: ReactNode; title: ReactNode; intro?: ReactNode; aside?: boolean }) => (
  <div className={`section-head ${aside ? 'section-head-aside lg:col-span-5' : ''}`}>
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <h2 className="section-title">{title}</h2>
    {intro && <p className="section-lead">{intro}</p>}
  </div>
)

export default SectionHeader
