/**
 * Platforms live on Ezeebit, each with a story we are allowed to tell. Add
 * one here as it is announced; the Platforms page and the matching Solutions
 * page lay out one or many.
 */
export type CaseStudy = {
  name: string
  logo: string
  image: string
  sector: string
  summary: string
  points: string[]
  href: string
}

export const SUNBET: CaseStudy = {
  name: 'Sunbet',
  logo: '/sunbet-logo.png',
  image: '/blog/sunbet-launch-cover.webp',
  sector: 'iGaming',
  summary: 'Sunbet, part of JSE-listed Sun International, is one of the first online gaming platforms in South Africa to accept crypto deposits. Players fund their accounts straight from the wallet or exchange their money already sits in.',
  points: [
    'Deposits on-chain from any wallet, or from inside Luno, VALR and Binance',
    'Each deposit attributed to the right player and credited in seconds',
    'Hedged at the moment of payment, so Sunbet never holds crypto price risk',
  ],
  href: '/blog/crypto-deposits-igaming-sunbet',
}

export const CASE_STUDIES: CaseStudy[] = [SUNBET]
