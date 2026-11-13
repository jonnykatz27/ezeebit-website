import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import SectionHeader from './SectionHeader'

type Item = { question: string; answer: string }

/**
 * The same list of questions as the FAQ page, with hairlines between them and
 * the heading beside them on a wide screen, as on the homepage. Answers stay in the HTML when closed, so
 * pre-rendered pages contain the copy, and stay visually hidden.
 */
const FaqBlock = ({ heading, items, tone = 'muted' }: { heading: string; items: Item[]; tone?: 'muted' | 'white' }) => {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className={tone === 'white' ? 'section-padding bg-white' : 'section-padding bg-neutral-50'}>
      <div className="container-custom lg:grid lg:grid-cols-12 lg:gap-12">
        <SectionHeader aside title={heading} />
        <div className="w-full lg:col-span-7 border-t border-neutral-200">
          {items.map((item, index) => {
            const isOpen = open === index
            return (
              <div key={item.question} className="border-b border-neutral-200">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="w-full py-4 text-left flex items-center justify-between gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-neutral-900 text-left">{item.question}</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-500 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={isOpen ? 'pb-4' : 'hidden'}>
                  <p className="text-neutral-600 text-sm text-left leading-relaxed">{item.answer}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FaqBlock
