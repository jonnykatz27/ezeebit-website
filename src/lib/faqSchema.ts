/** The only FSCA wording that may appear in FAQPage JSON-LD. */
export const FSCA_LINE =
  'Ezeebit is authorised and regulated by the FSCA, and has applied for its CASP licence (FSP 53664).'

const FSCA_DEFINITION = "The FSCA is South Africa's Financial Sector Conduct Authority."

const BLOCKED =
  /68%|SOC 2|0\.5 seconds|100,000|150\+|130\+|40,000|R120|700 wallets|\binstant|half the cost|cheaper/i

const OTHER_REGULATORY = /FSCA|FAIS/i

/** Editorial markers such as [confirm with Ezeebit] or [date]. */
const PLACEHOLDER = /\[[^\]\n]+\]/

export type FaqItem = { question: string; answer: string }

export function includeInFaqSchema(item: FaqItem): boolean {
  const text = `${item.question} ${item.answer}`
  if (PLACEHOLDER.test(text)) return false

  const withoutApproved = text
    .split(FSCA_LINE).join('')
    .split(FSCA_DEFINITION).join('')

  if (BLOCKED.test(withoutApproved)) return false
  if (OTHER_REGULATORY.test(withoutApproved)) return false
  return true
}

export function faqPageNode(id: string, items: FaqItem[]) {
  return {
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: items.filter(includeInFaqSchema).map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}
