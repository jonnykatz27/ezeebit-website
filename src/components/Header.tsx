import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { motion } from '../lib/motion'
import { hasDarkHero } from '../lib/darkHero'

type NavLink = {
  name: string
  href: string
  description: string
}

type NavGroup = {
  /** Heading shown above the links. Omitted for ungrouped links. */
  group?: string
  items: NavLink[]
}

/**
 * A plain link always has a route. A dropdown parent only has one when it is
 * also a page of its own, which Products is not.
 */
type NavItem =
  | { name: string; href: string; dropdown?: undefined }
  | { name: string; href?: string; dropdown: NavGroup[] }

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }, [location.pathname])

  // While the phone menu is open the page behind it holds still, and Escape closes it
  useEffect(() => {
    if (!isMenuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [isMenuOpen])

  const navigation: NavItem[] = [
    { name: 'Home', href: '/' },
    {
      name: 'Products',
      dropdown: [
        {
          group: 'Payments',
          items: [
            { name: 'In-Store', href: '/in-store', description: 'Accept payments at the point of sale' },
            { name: 'Online', href: '/online', description: 'Hosted checkout for your website' },
            { name: 'Platforms', href: '/platforms', description: 'Crypto pay-ins and payouts for platforms' },
            { name: 'Payouts', href: '/payouts', description: 'Pay your customers out in stablecoin' },
          ],
        },
        {
          items: [
            { name: 'Wallets', href: '/wallets', description: 'Hold, convert, and withdraw balances' },
            { name: 'OTC', href: '/otc', description: 'Large-volume trades with a dedicated dealer' },
          ],
        },
      ],
    },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Developers', href: '/developers' },
    {
      name: 'Resources',
      href: '/resources',
      dropdown: [
        {
          items: [
            { name: 'About Us', href: '/resources/about', description: 'Our story and mission' },
            { name: 'FAQ', href: '/resources/faq', description: 'Frequently asked questions' },
            { name: 'Legal', href: '/resources/legal', description: 'Terms, privacy, and compliance' },
            { name: 'Blog', href: '/resources/blog', description: 'Latest news and insights' },
            { name: 'User Manual', href: '/resources/user-manual', description: 'How-to guides and tutorials' },
            { name: 'Where to Spend Crypto', href: '/resources/where-to-spend', description: 'Verified merchants accepting crypto' },
            { name: 'Careers', href: '/careers', description: 'Open roles at Ezeebit' },
          ],
        },
      ]
    },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  // A dropdown parent highlights for its own route and for any route beneath it,
  // so Products stays lit on /in-store, /payouts and the rest without being a page.
  const isItemActive = (item: NavItem) =>
    (item.href ? isActive(item.href) : false) ||
    (item.dropdown?.some((group) => group.items.some((sub) => isActive(sub.href))) ?? false)

  // Light-on-dark over a dark hero (transparent, then Near Black once scrolled); the open phone menu is always the light one
  const onDark = hasDarkHero(location.pathname) && !isMenuOpen
  const navLink = (active: boolean) =>
    active
      ? onDark ? 'text-primary-400' : 'text-primary-600'
      : onDark
        ? 'text-neutral-300 hover:text-white hover:bg-white/5'
        : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'

  return (
    <header
      // Solid, unblurred white while the phone menu is open: a backdrop-filter would make
      // the header the containing block for the fixed backdrop and shrink it to the header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isMenuOpen
          ? 'bg-white shadow-md'
          : !isScrolled
            ? 'bg-transparent'
            : onDark
              ? 'bg-neutral-950/95 backdrop-blur-xl border-b border-white/10'
              : 'bg-white/95 backdrop-blur-xl shadow-md'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20 px-1 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center space-x-2">
            {/* The brand's own white-wordmark logo on dark, the black one on light; never one recoloured */}
            <img
              src={onDark ? '/ezeebit-logo-white.svg' : '/ezeebit_black.png'}
              alt="Ezeebit"
              className="h-8 sm:h-9 lg:h-10 w-auto transition-transform duration-200 hover:-translate-y-0.5"
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-base font-medium transition-colors ${navLink(isItemActive(item))}`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {/* Always in the DOM so crawlers can follow the product links; CSS gives it the same quick fade and lift it had */}
                    <div
                      className={`absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-neutral-100 py-1.5 overflow-hidden origin-top transition-[opacity,transform,visibility] duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                        activeDropdown === item.name ? 'visible opacity-100 translate-y-0 scale-100' : 'invisible opacity-0 translate-y-2 scale-[0.98]'
                      }`}
                    >
                          {item.dropdown.map((group, groupIndex) => (
                            <div
                              key={group.group ?? `group-${groupIndex}`}
                              className={
                                groupIndex > 0 ? 'border-t border-neutral-100 mt-1.5 pt-1.5' : ''
                              }
                            >
                              {group.group && (
                                <div className="px-4 pt-2 pb-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-neutral-400">
                                  {group.group}
                                </div>
                              )}
                              {group.items.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  to={subItem.href}
                                  className="block px-4 py-3 hover:bg-neutral-50 transition-colors"
                                >
                                  <div className="text-sm font-medium text-neutral-900">{subItem.name}</div>
                                  <div className="text-xs text-neutral-500 mt-0.5">{subItem.description}</div>
                                </Link>
                              ))}
                            </div>
                          ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`px-3 py-2 rounded-lg text-base font-medium transition-colors ${navLink(isActive(item.href))}`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="https://merchant.ezeebit.com/#/login"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-base font-medium transition-colors px-3 py-2 rounded-lg ${navLink(false)}`}
            >
              Login
            </a>
            <a
              href="https://merchant.ezeebit.com/#/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !py-2.5 !px-5 text-base"
            >
              Open account
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 transition-colors rounded-lg ${onDark ? 'text-neutral-200 hover:text-white hover:bg-white/5' : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'}`}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {/* Dims the page under the menu; tapping it closes the menu. Behind the bar, above the page. */}
          {isMenuOpen && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-x-0 bottom-0 top-16 -z-10 bg-neutral-900/30"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
          )}
          {isMenuOpen && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="lg:hidden bg-white border-t border-neutral-100 max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              <div className="py-3 space-y-0.5">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div>
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                          className={`flex items-center justify-between w-full px-5 py-3 font-medium text-sm transition-colors ${
                            isItemActive(item)
                              ? 'text-primary-600'
                              : 'text-neutral-700 hover:text-primary-600'
                          }`}
                        >
                          <span>{item.name}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              activeDropdown === item.name ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.15 }}
                              className="bg-neutral-50"
                            >
                              {item.dropdown.map((group, groupIndex) => (
                                <div
                                  key={group.group ?? `group-${groupIndex}`}
                                  className={groupIndex > 0 ? 'border-t border-neutral-200/70' : ''}
                                >
                                  {group.group && (
                                    <div className="px-9 pt-3 pb-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-neutral-400">
                                      {group.group}
                                    </div>
                                  )}
                                  {group.items.map((subItem) => (
                                    <Link
                                      key={subItem.name}
                                      to={subItem.href}
                                      className="block px-9 py-2.5 text-sm text-neutral-600 hover:text-primary-600 transition-colors"
                                      onClick={() => setIsMenuOpen(false)}
                                    >
                                      {subItem.name}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className={`block px-5 py-3 text-sm font-medium transition-colors ${
                          isActive(item.href)
                            ? 'text-primary-600'
                            : 'text-neutral-700 hover:text-primary-600'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="px-5 pt-3 border-t border-neutral-100 space-y-2">
                  <a
                    href="https://merchant.ezeebit.com/#/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-2.5 text-sm text-neutral-700 hover:text-primary-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </a>
                  <a
                    href="https://merchant.ezeebit.com/#/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center btn-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Open account
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

export default Header
