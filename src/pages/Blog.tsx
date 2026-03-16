import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Calendar, Clock, ArrowRight, Search, Eye
} from 'lucide-react'

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const blogPosts = [
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
      featured: true
    },
    {
      id: 'pundi-x-rebrand',
      title: 'Pundi X South Africa Rebrands To Ezeebit And Makes Key Acquisitions',
      excerpt: 'Pundi X South Africa Rebrands to Ezeebit and Acquires Advanced Cryptocurrency Wallet, Payment, and Exchange Infrastructure, Pioneering a New Era for Crypto Adoption in Africa and Beyond.',
      author: 'Daniel Katz',
      date: '2025-01-27',
      readTime: '12 min read',
      category: 'Company News',
      categoryId: 'company',
      image: '/blog-rebranding.webp',
      views: '5.2k',
      featured: false
    }
  ]

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
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

  const featuredPost = filteredPosts.find(post => post.featured) || filteredPosts[0]

  return (
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
                  <div className="absolute top-3 left-3 md:top-4 md:left-4">
                    <span className="bg-primary-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                      Featured
                    </span>
                  </div>
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
                    <span className="flex items-center">
                      <Eye className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                      {featuredPost.views}
                    </span>
                  </div>
                  <Link to={`/blog/${featuredPost.id}`}>
                    <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-neutral-900 mb-3 md:mb-4 hover:text-primary-500 transition-colors cursor-pointer">
                      {featuredPost.title}
                    </h2>
                  </Link>
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
                    <Link
                      to={`/blog/${featuredPost.id}`}
                      className="btn-primary flex items-center justify-center space-x-2 text-sm md:text-base px-4 md:px-6 py-2 md:py-3 w-full sm:w-auto transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      aria-label={`Read the full article about ${featuredPost.title}`}
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="w-4 h-4 flex-shrink-0" />
                    </Link>
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
                    <span className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {post.views}
                    </span>
                  </div>
                  <Link to={`/blog/${post.id}`}>
                    <h3 className="text-lg font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                  </Link>
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
                  <Link
                    to={`/blog/${post.id}`}
                    className="mt-4 inline-flex items-center text-primary-500 hover:text-primary-700 font-medium text-sm group"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
          )}
        </div>
      </section>

    </motion.div>
  )
}

export default Blog