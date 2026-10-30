import { useState } from 'react'
import { motion } from '../lib/motion'
import { Link } from 'react-router-dom'
import {
  Search, ExternalLink, ArrowRight
} from 'lucide-react'
import { stores, categories } from '../lib/stores'
import SEO from '../components/SEO'
import PageHero, { HeroSearch } from '../components/hero/PageHero'
import DarkBackdrop from '../components/DarkBackdrop'

const WhereToSpend = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStores = stores
    .filter(store => {
      const matchesCategory = selectedCategory === 'All' || store.category === selectedCategory
      const matchesSearch = 
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.category.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => a.order - b.order) // Preserve initial order

  return (
    <>
      <SEO
        title="Where to spend crypto in South Africa"
        description="Stores in South Africa where you can pay with stablecoins and cryptocurrency through Ezeebit."
        crumbs={[{ name: 'Where to spend', path: '/resources/where-to-spend' }]}
        canonicalUrl="/resources/where-to-spend"
      />
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-hidden -mt-20"
    >
      {/* Hero Section */}
      <PageHero
        title="Where to"
        accent="spend crypto"
        accentPlain
        description="Discover verified merchants across South Africa where you can pay with cryptocurrency using Ezeebit."
      >
        <HeroSearch placeholder="Search stores..." value={searchTerm} onChange={setSearchTerm} />
      </PageHero>

      {/* Categories Filter */}
      <section className="bg-white border-b border-neutral-200 sticky top-20 z-40">
        <div className="container-custom px-4">
          <div className="flex items-center justify-between py-3 md:py-4">
            <div className="flex space-x-2 md:space-x-4 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center space-x-1 md:space-x-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
                    selectedCategory === category
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  <span>{category}</span>
                  <span className="bg-neutral-200 text-neutral-600 px-1.5 md:px-2 py-0.5 rounded-full text-xs">
                    {category === 'All'
                      ? stores.length
                      : stores.filter(store => store.category === category).length
                    }
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Store Grid */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container-custom px-4">
          {filteredStores.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">No stores found</h3>
              <p className="text-neutral-600 mb-6">
                Try adjusting your search terms or browse different categories.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
                className="btn-primary"
              >
                View All Stores
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {filteredStores.map((store, index) => (
                <motion.div
                  key={store.slug}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.25, delay: Math.min(index % 6, 2) * 0.05 }}
                  className="card store-card overflow-hidden md:hover:scale-105 transition-transform will-change-transform"
                >
                  {/* Store Image */}
                  <div className="relative h-44 md:h-48 overflow-hidden">
                    <img
                      src={store.image}
                      alt={`${store.name} store`}
                      className="w-full h-full object-cover"
                      style={store.imagePosition ? { objectPosition: store.imagePosition } : undefined}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400';
                      }}
                    />
                    <div className="absolute top-3 md:top-4 left-3 md:left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-2.5 md:px-3 py-1 md:py-1 rounded-full text-xs md:text-sm font-medium">
                        {store.category}
                      </span>
                    </div>
                  </div>

                  {/* Store Content */}
                  <div className="p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-semibold text-neutral-900 mb-2 md:mb-3">
                      {store.name}
                    </h3>
                    <p className="text-neutral-600 mb-5 md:mb-6 text-sm md:text-sm leading-relaxed line-clamp-3 md:line-clamp-3">
                      {store.excerpt}
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col gap-2.5 md:gap-3">
                      <Link
                        to={store.moreInfoRoute}
                        className="btn-primary flex items-center justify-center text-sm md:text-base py-3 md:py-3"
                      >
                        More Information
                        <ArrowRight className="w-4 h-4 md:w-4 md:h-4 ml-2" />
                      </Link>
                      <a
                        href={store.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline flex items-center justify-center text-sm md:text-base py-3 md:py-3"
                      >
                        View Store
                        <ExternalLink className="w-4 h-4 md:w-4 md:h-4 ml-2" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 relative overflow-hidden bg-neutral-950 text-white">
        <DarkBackdrop glow="left" />
        <div className="relative container-custom text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-3 md:mb-4">
              Want to accept stablecoin and crypto payments?
            </h2>
            <p className="text-base md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto text-neutral-300">
              Join these trusted merchants and start accepting stablecoin and cryptocurrency payments today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <a
                href="https://merchant.ezeebit.com/#/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-500 text-white hover:bg-primary-600 font-medium px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center text-sm md:text-base"
              >
                Become a Partner
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 inline" />
              </a>
              <Link to="/contact" className="border border-white/20 text-white hover:border-white/40 hover:bg-white/5 font-medium px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all duration-200 flex items-center justify-center text-sm md:text-base">
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      </motion.div>
    </>
  )
}

export default WhereToSpend