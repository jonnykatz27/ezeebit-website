import type { ReactNode } from 'react'

/**
 * The Ezeebit group of companies: the company behind Ezeebit in each country,
 * its registration, and what it operates under. The homepage's entities
 * section and the footer on every page both read from here, so a
 * registration or a status is only ever written once.
 */
export type Entity = {
  flag: string
  country: string
  entity: string
  /** Company registration number, where it is published. */
  reg?: string
  /** What the entity operates under, as the homepage's cards list it. */
  points: ReactNode[]
  /** The same in one plain line, for the footer. */
  status: string
}

export const ENTITIES: Entity[] = [
  {
    flag: '/za-flag.svg',
    country: 'South Africa',
    entity: 'Ezee Solutions Group (Pty) Ltd',
    reg: '2022/250578/07',
    points: [
      <>Regulated by the FSCA as a Crypto Asset Service Provider, <b>FSP No. 53664</b></>,
      'FIC compliant, with KYC, KYB, AML and POPIA handled by Ezeebit',
    ],
    status: 'Regulated by the FSCA as a Crypto Asset Service Provider, FSP No. 53664',
  },
  {
    flag: '/ke-flag.svg',
    country: 'Kenya',
    entity: 'Ezee Solutions Group (Kenya) Limited',
    reg: 'PVT-RQ13JL95',
    points: ['Operates under the transitional provisions of the Virtual Asset Service Providers Act, 2025'],
    status: 'Operates under the transitional provisions of the Virtual Asset Service Providers Act, 2025',
  },
  {
    flag: '/ca-flag.svg',
    country: 'Canada',
    entity: 'Ezeebit Canada Ltd.',
    points: [<>On FINTRAC&apos;s money services business registry, <b>MSB No. N300001912</b>, for foreign exchange, money transfers, virtual currency and payment services</>],
    status: "On FINTRAC's money services business registry, MSB No. N300001912",
  },
]
