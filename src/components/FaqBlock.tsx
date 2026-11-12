import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion } from '../lib/motion'
import SectionHeader from './SectionHeader'

type Item = { question: string; answer: string }

/**
 * Same accordion cards as the FAQ page, with the heading beside them on a
 * wide screen, as on the homepage. Answers stay in the HTML when closed, so
 * pre-rendered pages contain the copy, and stay visually hidden.
 */
const FaqBlock = ({ heading, items, tone = 'muted' }: { heading: string; items: Item[]; tone?: 'muted' | 'white' }) => {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className={tone === 'white' ? 'section-padding bg-white' : 'section-padding bg-neutral-50'}>
      <div className="container-custom lg:grid lg:grid-cols-12 lg:gap-12">
        <SectionHeader aside title={heading} />
        <div className="w-full lg:col-span-7 space-y-1.5 md:space-y-2">
          {items.map((item, index) => {
            const isOpen = open === index
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="w-full px-3 md:px-4 py-2 md:py-2.5 text-left flex items-center justify-between hover:bg-neutral-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-neutral-900 text-sm md:text-base text-left leading-tight">
                    {item.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-neutral-400 flex-shrink-0 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={isOpen ? 'px-3 md:px-4 pb-2.5 border-t border-neutral-100' : 'hidden'}>
                  <p className="text-neutral-600 pt-2.5 text-sm text-left leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FaqBlock
