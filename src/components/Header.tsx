import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'In-Store', href: '/in-store' },
    { name: 'Online', href: '/online' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Developers', href: '/developers' },
    {
      name: 'Resources',
      href: '/resources',
      dropdown: [
        { name: 'About Us', href: '/resources/about', description: 'Our story and mission' },
        { name: 'FAQ', href: '/resources/faq', description: 'Frequently asked questions' },
        { name: 'Legal', href: '/resources/legal', description: 'Terms, privacy, and compliance' },
        { name: 'Blog', href: '/resources/blog', description: 'Latest news and insights' },
        { name: 'User Manual', href: '/resources/user-manual', description: 'How-to guides and tutorials' },
        { name: 'Where to Spend Crypto', href: '/resources/where-to-spend', description: 'Verified merchants accepting crypto' },
      ]
    },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/ezeebit_black.png"
              alt="Ezeebit"
              className="h-10 w-auto transition-transform duration-200 hover:-translate-y-0.5"
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
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                        isActive(item.href)
                          ? 'text-primary-600'
                          : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                          className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-neutral-100 py-1.5 overflow-hidden"
                        >
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className="block px-4 py-3 hover:bg-neutral-50 transition-colors"
                            >
                              <div className="text-sm font-medium text-neutral-900">{subItem.name}</div>
                              <div className="text-xs text-neutral-500 mt-0.5">{subItem.description}</div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-primary-600'
                        : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                    }`}
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
              className="text-base text-neutral-700 hover:text-primary-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-neutral-50"
            >
              Login
            </a>
            <a
              href="https://forms.zohopublic.com/jonnyeze1/form/SignUp/formperma/9fAqEbBhSgAbpaRJPz9aEsfTxy4PdQRx4FEzRCXuxfk"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !py-2.5 !px-5 text-base"
            >
              Get Started
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:text-primary-600 transition-colors rounded-lg hover:bg-neutral-50"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
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
                          className="flex items-center justify-between w-full px-5 py-3 text-neutral-700 hover:text-primary-600 font-medium text-sm"
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
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  to={subItem.href}
                                  className="block px-9 py-2.5 text-sm text-neutral-600 hover:text-primary-600 transition-colors"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {subItem.name}
                                </Link>
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
                    href="https://forms.zohopublic.com/jonnyeze1/form/SignUp/formperma/9fAqEbBhSgAbpaRJPz9aEsfTxy4PdQRx4FEzRCXuxfk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center btn-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
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
