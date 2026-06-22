import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Calendar, Clock, ArrowRight, Search
} from 'lucide-react'
import SEO from '../components/SEO'

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  type BlogPostItem = {
    id: string
    title: string
    excerpt: string
    author: string
    date: string
    readTime: string
    category: string
    categoryId: string
    image: string
    views: string
    featured: boolean
    hero?: boolean
    externalUrl?: string
  }

  const blogPosts: BlogPostItem[] = [
    {
      id: 'crypto-deposits-igaming-sunbet',
      title: "Crypto deposits for iGaming: inside the Sunbet integration",
      excerpt: "Sunbet — a subsidiary of JSE-listed Sun International — is one of the first online gaming platforms in South Africa to accept crypto deposits. Here's the complexity behind letting any user fund their account from any wallet, how we kept compliance and innovation at the forefront, and why the same deposit rail extends to FX, trading, and any platform that takes deposits.",
      author: 'Daniel Katz',
      date: '2026-06-01',
      readTime: '6 min read',
      category: 'Product',
      categoryId: 'product',
      image: '/sunbet-launch-cover@2x.png',
      views: '0',
      featured: false
    },
    {
      id: 'most-comprehensive-crypto-payment-gateway-africa',
      title: "Africa's most comprehensive crypto checkout",
      excerpt: "A single integration that accepts payments from any wallet, 700+ wallets via WalletConnect, and directly from Luno, VALR, and Binance. Merchants settle in stablecoins (T+0) or local currency (T+1), with zero crypto volatility exposure.",
      author: 'Jonathan Katz',
      date: '2026-05-13',
      readTime: '5 min read',
      category: 'Product',
      categoryId: 'product',
      image: '/checkout-launch-cover@2x.png',
      views: '0',
      featured: false,
      hero: true
    },
    {
      id: 'capital-flow-management-regulations',
      title: "Ezeebit's position on the draft Capital Flow Management Regulations",
      excerpt: "South Africa is replacing its Exchange Control framework for the first time in 65 years — and for the first time, crypto assets are explicitly part of that picture. We welcome the direction, and we intend to help shape the outcome.",
      author: 'Daniel Katz',
      date: '2026-04-29',
      readTime: '1 min read',
      category: 'Policy & Regulation',
      categoryId: 'policy',
      image: '/cfm-regulation-blog-cover copy.png',
      views: '0',
      featured: false
    },
    {
      id: 'mybroadband-r35-million-backing',
      title: 'South African stablecoin and crypto payments startup attracts R35-million backing from top investors',
      excerpt: 'MyBroadband covers Ezeebit\'s R34.9-million seed round, led by Raba Partnership and joined by David Frankel\'s Founder Collective — early backers of Uber, The Trade Desk, and Flutterwave — alongside strategic angels from Visa, Talos, Revolut, and BVNK.',
      author: 'MyBroadband',
      date: '2025-12-09',
      readTime: '4 min read',
      category: 'Company News',
      categoryId: 'company',
      image: '/David-Frankel-speaking-at-Founder-Collective.jpg',
      views: '0',
      featured: true,
      externalUrl: 'https://mybroadband.co.za/news/cryptocurrency/622384-south-african-stablecoin-and-crypto-payments-startup-attracts-r35-million-backing-from-top-investors.html'
    },
    {
      id: 'ezeebit-raises-r35-million',
      title: 'We Just Raised $2.05M to Build Africa\'s Stablecoin Payment Infrastructure',
      excerpt: 'Growing up in South Africa, my brothers Jonathan, David, and I saw something that didn\'t make sense: merchants trapped in payment systems that were slow, expensive, and built for a different era. That gap became our mission.',
      author: 'Daniel Katz',
      date: '2025-12-09',
      readTime: '2 min read',
      category: 'Company News',
      categoryId: 'company',
      image: '/ezeebit-blog.webp',
      views: '3.8k',
      featured: false
    },
    {
      id: 'mybroadband-crypto-payments-mainstream',
      title: 'Crypto payments becoming mainstream in South Africa',
      excerpt: 'MyBroadband on how crypto payments are going mainstream in South Africa — with Ezeebit emerging from stealth alongside iStore, Scoin, Diesel, Amiri, and Le Creuset, and COO Jonathan Katz on why utility is replacing hype: faster settlement, lower fees, and easier cross-border payments.',
      author: 'MyBroadband',
      date: '2025-10-18',
      readTime: '4 min read',
      category: 'Company News',
      categoryId: 'company',
      image: '/Bitcoin-crypto-rand.jpg',
      views: '0',
      featured: true,
      externalUrl: 'https://mybroadband.co.za/news/cryptocurrency/614650-crypto-payments-becoming-mainstream-in-south-africa.html'
    },
    {
      id: 'pundi-x-rebrand',
      title: 'Pundi X South Africa Rebrands To Ezeebit And Makes Key Acquisitions',
      excerpt: 'Pundi X South Africa Rebrands to Ezeebit and Acquires Advanced Cryptocurrency Wallet, Payment, and Exchange Infrastructure, Pioneering a New Era for Crypto Adoption in Africa and Beyond.',
      author: 'Daniel Katz',
      date: '2025-01-27',
      readTime: '5 min read',
      category: 'Company News',
      categoryId: 'company',
      image: '/blog-rebranding.webp',
      views: '5.2k',
      featured: false
    }
  ]

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    { id: 'product', name: 'Product', count: blogPosts.filter(p => p.categoryId === 'product').length },
    { id: 'policy', name: 'Policy & Regulation', count: blogPosts.filter(p => p.categoryId === 'policy').length },
    { id: 'company', name: 'Company News', count: blogPosts.filter(p => p.categoryId === 'company').length }
  ]

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesCategory = selectedCategory === 'all' || post.categoryId === selectedCategory
      const matchesSearch = searchTerm === '' ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchTerm])

  const featuredPost = filteredPosts.find(post => post.hero) || filteredPosts.find(post => post.featured) || filteredPosts[0]

  return (
    <>
      <SEO
        title="Blog"
        description="Latest news, insights, and updates from Ezeebit. Read about our funding rounds, product launches, and the future of stablecoin and crypto payments in Africa."
        canonicalUrl="/resources/blog"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="overflow-hidden -mt-20"
    >
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center gradient-bg pt-40">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-4 md:mb-6">
              Ezeebit <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-base md:text-xl text-neutral-600 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
              Stay updated with the latest news, insights, and tutorials from the world of
              stablecoin and cryptocurrency payments and African fintech.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-6 md:mb-8 px-4">
              <div className="relative">
                <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4 md:w-5 md:h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 md:pl-12 pr-4 py-3 md:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base md:text-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b border-neutral-200 sticky top-20 z-40">
        <div className="container-custom">
          <div className="flex items-center py-3 md:py-4">
            <div className="flex space-x-2 md:space-x-4 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-1 md:space-x-2 px-3 md:px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
                    selectedCategory === category.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="bg-gray-200 text-neutral-600 px-1.5 md:px-2 py-0.5 rounded-full text-xs">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-8 md:py-16 lg:py-24 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="card overflow-hidden mb-8 md:mb-12"
            >
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0">
                <div className="relative">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-48 md:h-64 lg:h-full object-cover"
                  />
                  {featuredPost.featured && (
                    <div className="absolute top-3 left-3 md:top-4 md:left-4">
                      <span className="bg-primary-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4 md:p-8 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-neutral-500 mb-3 md:mb-4">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  {featuredPost.externalUrl ? (
                    <a href={featuredPost.externalUrl} target="_blank" rel="noopener noreferrer">
                      <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-neutral-900 mb-3 md:mb-4 hover:text-primary-500 transition-colors cursor-pointer">
                        {featuredPost.title}
                      </h2>
                    </a>
                  ) : (
                    <Link to={`/blog/${featuredPost.id}`}>
                      <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-neutral-900 mb-3 md:mb-4 hover:text-primary-500 transition-colors cursor-pointer">
                        {featuredPost.title}
                      </h2>
                    </Link>
                  )}
                  <p className="text-sm md:text-base text-neutral-600 mb-4 md:mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold text-sm md:text-base">
                        {featuredPost.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium text-neutral-900 text-sm md:text-base">{featuredPost.author}</div>
                        <div className="text-xs md:text-sm text-neutral-500">{featuredPost.category}</div>
                      </div>
                    </div>
                    {featuredPost.externalUrl ? (
                      <a
                        href={featuredPost.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary flex items-center justify-center space-x-2 text-sm md:text-base px-4 md:px-6 py-2 md:py-3 w-full sm:w-auto transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        aria-label={`Read the full article about ${featuredPost.title}`}
                      >
                        <span>Read Full Article</span>
                        <ArrowRight className="w-4 h-4 flex-shrink-0" />
                      </a>
                    ) : (
                      <Link
                        to={`/blog/${featuredPost.id}`}
                        className="btn-primary flex items-center justify-center space-x-2 text-sm md:text-base px-4 md:px-6 py-2 md:py-3 w-full sm:w-auto transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        aria-label={`Read the full article about ${featuredPost.title}`}
                      >
                        <span>Read Full Article</span>
                        <ArrowRight className="w-4 h-4 flex-shrink-0" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-8 md:py-16 bg-neutral-50">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6 md:mb-8">
            {selectedCategory === 'all' ? 'All Posts' : categories.find(c => c.id === selectedCategory)?.name || 'Posts'}
          </h2>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-500 text-lg">No posts found matching your criteria.</p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchTerm(''); }}
                className="mt-4 text-primary-500 hover:text-primary-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="card overflow-hidden group hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative overflow-hidden bg-neutral-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  {post.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 mb-3">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  {post.externalUrl ? (
                    <a href={post.externalUrl} target="_blank" rel="noopener noreferrer">
                      <h3 className="text-lg font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors cursor-pointer">
                        {post.title}
                      </h3>
                    </a>
                  ) : (
                    <Link to={`/blog/${post.id}`}>
                      <h3 className="text-lg font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors cursor-pointer">
                        {post.title}
                      </h3>
                    </Link>
                  )}
                  <p className="text-sm text-neutral-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-neutral-900">{post.author}</div>
                        <div className="text-xs text-neutral-500">{post.category}</div>
                      </div>
                    </div>
                  </div>
                  {post.externalUrl ? (
                    <a
                      href={post.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center text-primary-500 hover:text-primary-700 font-medium text-sm group"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <Link
                      to={`/blog/${post.id}`}
                      className="mt-4 inline-flex items-center text-primary-500 hover:text-primary-700 font-medium text-sm group"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
          )}
        </div>
      </section>

      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
              Ready to accept stablecoin and crypto payments?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join the merchants featured in our stories. Get started in minutes with no setup fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://merchant.ezeebit.com/#/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-600 hover:bg-neutral-100 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              <Link to="/contact" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center">
                Talk to Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </motion.div>
    </>
  )
}

export default Blog