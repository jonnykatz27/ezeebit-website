/**
 * Pages that open on the dark PageHero. On them the header is light-on-dark,
 * and the page's root is Near Black, so the fade-in on arrival happens over
 * dark rather than flashing white first. Every other page, including any path
 * not listed (the 404 page), stays light. A page that starts using PageHero
 * belongs in this list, and every section on it must set its own background.
 */
const DARK_HERO_PATHS = new Set([
  '/', '/in-store', '/online', '/platforms', '/payouts', '/wallets', '/otc', '/pricing', '/developers',
  '/contact', '/careers', '/resources', '/resources/about', '/resources/faq', '/resources/blog',
  '/resources/user-manual', '/resources/where-to-spend',
])

export const hasDarkHero = (pathname: string) => DARK_HERO_PATHS.has(pathname.replace(/\/+$/, '') || '/')
