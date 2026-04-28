import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import {
  Calendar, Clock, ArrowLeft, Twitter, Linkedin,
  Mail, Eye, Tag
} from 'lucide-react'
import SEO from '../components/SEO'

const blogPostsData: Record<string, {
  title: string
  subtitle: string
  author: string
  role: string
  date: string
  readTime: string
  category: string
  image: string
  views: string
  content: React.ReactNode
}> = {
  'ezeebit-raises-r35-million': {
    title: 'We Just Raised $2.05M to Build Africa\'s Stablecoin Payment Infrastructure',
    subtitle: 'A personal note from our CEO on our seed funding round and what it means for the future of payments in Africa.',
    author: 'Daniel Katz',
    role: 'CEO & Co-Founder of Ezeebit',
    date: '2025-12-09',
    readTime: '2 min read',
    category: 'Company News',
    image: '/ezeebit-blog.webp',
    views: '3.8k',
    content: (
      <>
        <p className="text-lg text-neutral-600 mb-8">
          Growing up in South Africa, my brothers Jonathan, David, and I saw something that didn't make sense: merchants trapped in payment systems that were slow, expensive, and built for a different era - while millions of consumers around us held stablecoin and crypto but had nowhere to spend it.
        </p>

        <p className="text-lg text-neutral-600 mb-8">
          That gap became our mission.
        </p>

        <p className="text-lg font-semibold text-neutral-900 mb-8">
          Today, I'm thrilled to share that <strong>Ezeebit has raised $2.05 million in seed funding</strong> to scale the stablecoin payment infrastructure we've been building since 2023.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-10 mb-4">The investors who believe in our vision</h2>

        <p>
          The round is backed by <strong>Founder Collective</strong>, whose co-founder David Frankel has appeared four times on the Forbes Midas List and backed more than ten billion-dollar startups including Uber, Airtable, and The Trade Desk. We're also backed by <strong>Raba Partnership</strong>—early believers in Flutterwave, Stitch, Fuse, and BVNK—alongside strategic angels who've shaped global fintech: Terry Angelos (ex-Visa), Anton Katz (Talos), Nadir Khamissa (Hello Group), David De Picciotto (ex-Revolut), and Chris Harmse (BVNK).
        </p>

        <p className="mt-4">
          Having investors of this calibre isn't just about capital. It's validation that the problem we're solving matters—and that our approach is the right one.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-10 mb-4">Why this matters for Africa</h2>

        <p>
          African merchants are tied to slow, expensive payment rails. Card fees run 2–3% or higher. Settlement takes three to five days. Cross-border options are limited. And at 8.78%, Sub-Saharan Africa remains the most expensive region in the world for receiving remittances.
        </p>

        <p className="mt-4">
          Meanwhile, consumers increasingly hold crypto for remittances and savings—but lack a safe, compliant way to spend it.
        </p>

        <p className="mt-4 text-lg font-semibold text-neutral-900">We bridge that gap.</p>

        <p className="mt-4">
          Ezeebit connects decentralised and traditional finance with a compliant stablecoin settlement layer. Our merchants enjoy fees of <strong>1% or lower</strong> — 68% cheaper than credit cards—with instant stablecoin settlement and next-business-day local fiat payouts. No volatility risk. No waiting days for your money.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-10 mb-4">The timing is no accident</h2>

        <p>
          Africa is experiencing a convergence of structural tailwinds that make this the perfect moment to build:
        </p>

        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li><strong>Persistent inflation</strong> is driving demand for stablecoin alternatives</li>
          <li><strong>Just 4% of adults</strong> in Sub-Saharan Africa hold credit cards—leaving massive room for new rails</li>
          <li><strong>Mobile money has trained hundreds of millions</strong> to pay digitally via QR codes</li>
          <li><strong>Smartphone adoption is racing toward 87% by 2030</strong>, expanding our addressable market exponentially</li>
        </ul>

        <p className="mt-4">
          The numbers tell the story. Between July 2024 and June 2025, Sub-Saharan Africa received over <strong>$205 billion in on-chain value</strong>—a 52% year-over-year increase, making it the third fastest-growing crypto region globally.
        </p>

        <p className="mt-4">
          The infrastructure to unlock that value? That's what we're building.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-10 mb-4">What we've proven so far</h2>

        <p>
          Since launching in 2023, my brothers and I have built Ezeebit from the ground up with compliance-first infrastructure. We're proud to be an <strong>FSCA-regulated Financial Services Provider</strong> (FSP & CASP No. 53664).
        </p>

        <p className="mt-4">The results speak for themselves:</p>

        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li><strong>40,000+ transactions</strong> processed, totalling millions of dollars in gross merchandise value</li>
          <li>Some merchants now see <strong>stablecoin payments account for over 50%</strong> of their transactions</li>
          <li>Clients include <strong>iStore, Le Creuset, Scoin, Tintswalo Lodges, Amiri, and Diesel</strong></li>
        </ul>

        <p className="mt-4">
          Our platform is Compliance by Design—built-in AML/KYC, Travel Rule readiness—allowing merchants to accept Bitcoin, USDT, USDC, ETH and more from any wallet (custodial, DeFi, or foreign) through Android ePOS devices, e-commerce plugins, and APIs.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-10 mb-4">What our investors are saying</h2>

        <p>David Frankel, Co-founder and Managing Partner at Founder Collective, put it this way:</p>

        <blockquote className="bg-neutral-50 border-l-4 border-primary-500 p-6 my-6">
          <p className="text-lg italic text-neutral-700">
            "What's happening in Africa is extraordinary. Millions of people hold crypto but can't spend it; merchants need faster, cheaper rails, but legacy systems keep them locked out. Ezeebit is building the bridge. This team has an uncommon gift for integrating modern financial technology with a grounded understanding of the dynamics shaping the markets they serve."
          </p>
        </blockquote>

        <p>Amanda Herson, General Partner at Founder Collective, added:</p>

        <blockquote className="bg-neutral-50 border-l-4 border-primary-500 p-6 my-6">
          <p className="text-lg italic text-neutral-700">
            "What excites us most is how Ezeebit makes something complex feel simple. They've built real infrastructure—wallet orchestration, instant hedging, and compliance tooling—that makes crypto payments work like tapping a card. In markets where half the population is unbanked, Ezeebit isn't just processing transactions; they're opening access and building the trusted brand in the space."
          </p>
        </blockquote>

        <p>And George Rzepecki, Founder at Raba Partnership:</p>

        <blockquote className="bg-neutral-50 border-l-4 border-primary-500 p-6 my-6">
          <p className="text-lg italic text-neutral-700">
            "While Sub-Saharan Africa remains the most expensive region for money movement, Ezeebit is rebuilding the payment stack with compliant stablecoin and crypto rails. Regulatory clarity in key African markets creates a rare window to build this infrastructure at scale."
          </p>
        </blockquote>

        <h2 className="text-2xl font-bold text-neutral-900 mt-10 mb-4">What's next</h2>

        <p>
          This capital will accelerate our product development and merchant adoption in <strong>South Africa, Kenya, and Nigeria</strong>—while expanding strategic partnerships with banks, PSPs, and telcos.
        </p>

        <p className="mt-4">
          We're not just processing transactions. We're building the infrastructure that allows millions to participate fully in the global digital economy.
        </p>

        <p className="mt-4 text-lg font-semibold text-neutral-900">
          The gap my brothers and I saw years ago? We're closing it.
        </p>
      </>
    )
  },
  'capital-flow-management-regulations': {
    title: "Ezeebit's position on the draft Capital Flow Management Regulations",
    subtitle: "South Africa is replacing its Exchange Control framework for the first time in 65 years — and for the first time, crypto assets are explicitly part of that picture.",
    author: 'Daniel Katz',
    role: 'CEO, Ezeebit',
    date: '2026-04-29',
    readTime: '4 min read',
    category: 'Policy & Regulation',
    image: '/cfm-regulation-blog-cover.png',
    views: '0',
    content: (
      <>
        <blockquote className="bg-neutral-50 border-l-4 border-primary-500 p-6 my-6">
          <p className="text-lg italic text-neutral-700">
            South Africa is replacing its Exchange Control framework for the first time in 65 years — and for the first time, crypto assets are explicitly part of that picture.
          </p>
        </blockquote>

        <h2 className="text-2xl font-bold text-neutral-900 mt-10 mb-4">A meaningful step in the right direction</h2>

        <p className="text-lg text-neutral-600 mb-8">
          The draft Capital Flow Management Regulations published by National Treasury and the SARB on 17 April represent a meaningful step toward the kind of regulatory clarity this industry has long needed. The stated approach — positive-bias, reporting-led rather than restriction-led — is the right instinct. Compliant infrastructure, not regulatory grey zones, is what gives platforms, merchants, and consumers the confidence to adopt crypto payment rails at scale. We welcome that direction.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-10 mb-4">The consultation process matters as much as the draft</h2>

        <p className="text-lg text-neutral-600 mb-8">
          At the same time, we believe the consultation process matters as much as the draft itself. Some of the proposed provisions are broad in their scope, and we hope that National Treasury and the SARB approach the comment period with genuine openness — treating industry feedback not as noise to be managed, but as material input that shapes a better outcome. The goal should be a framework that closes real gaps, delivers meaningful regulatory clarity, and still fosters a healthy, competitive environment for the estimated seven million South Africans who hold crypto assets and the growing ecosystem of fintech and crypto companies building here.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-10 mb-4">Domestic payments are not cross-border flows</h2>

        <p className="text-lg text-neutral-600 mb-8">
          As a CASP operating at the intersection of stablecoin payments and platform infrastructure, we have a particular interest in ensuring that domestic crypto payment use cases are correctly distinguished from cross-border capital flows. Getting that distinction right is not a technicality — it has direct implications for how this industry grows and who can participate in it.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-10 mb-4">Cross-border flows are rarely one-directional</h2>

        <p className="text-lg text-neutral-600 mb-8">
          Equally important is how the framework treats legitimate cross-border activity. Stablecoin rails are increasingly the infrastructure behind diaspora remittances, intra-African trade settlement, cross-border services, and foreign investment into South African businesses — flows that bring real economic value into the country. While exchange controls naturally focus on managing outflows, overly restrictive outbound provisions create friction that suppresses legitimate inbound activity too. Cross-border flows are rarely one-directional. A framework that gets the outbound balance wrong risks undermining the very inflows South Africa wants to attract, and the regional financial hub positioning the country has worked to build.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-10 mb-4">What we're doing next</h2>

        <p className="text-lg text-neutral-600 mb-6">
          Ezeebit will be submitting detailed comments to National Treasury before the 18 May deadline. We encourage all industry participants to do the same.
        </p>

        <p className="text-lg font-semibold text-neutral-900">
          Regulatory clarity is how this industry matures. We intend to help shape it responsibly.
        </p>
      </>
    )
  },
  'pundi-x-rebrand': {
    title: 'Pundi X South Africa Rebrands To Ezeebit And Makes Key Acquisitions',
    subtitle: 'Pundi X South Africa Rebrands to Ezeebit and Acquires Advanced Cryptocurrency Wallet, Payment, and Exchange Infrastructure, Pioneering a New Era for Crypto Adoption in Africa and Beyond',
    author: 'Daniel Katz',
    role: 'CEO of Ezeebit',
    date: '2025-01-27',
    readTime: '12 min read',
    category: 'Company News',
    image: '/blog-rebranding.webp',
    views: '5.2k',
    content: (
      <>
        <p className="text-lg font-medium text-neutral-600 border-l-4 border-primary-500 pl-6 italic">
          Cape Town, South Africa – [27 January 2025] – Formerly trading as Pundi X South Africa, Ezeebit, announces its strategic rebranding, underscoring a bold vision to accelerate cryptocurrency adoption across Africa, emerging markets, and beyond.
        </p>

        <p className="mt-6">
          This transformation follows the acquisition of advanced cryptocurrency wallet, payment, and exchange infrastructure, encompassing POS systems, APIs, and online technologies—positioning Ezeebit at the forefront of secure, user-friendly digital transactions for both in-store and online environments.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">A Bold Rebrand for the Future of Payments</h2>

        <blockquote className="bg-neutral-50 border-l-4 border-primary-500 p-6 my-6">
          <p className="text-lg italic text-neutral-700 mb-4">
            "This is an exciting new chapter for us. In 2024, we processed millions of dollars in transactions, proving the strength and reliability of our solutions. With the acquisition of advanced cryptocurrency payment and exchange infrastructure — we're ready to scale rapidly and offer merchants and customers an even better experience. The future of payments is here, and Ezeebit is at the forefront."
          </p>
          <footer className="text-sm text-neutral-600">
            — <strong>Daniel Katz</strong>, CEO of Ezeebit
          </footer>
        </blockquote>

        <p>
          Ezeebit's rebrand underscores its mission to make stablecoin and cryptocurrency payments more accessible for everyday transactions—regardless of whether customers use centralized or decentralized wallets. By eliminating traditional barriers to stablecoin and crypto payments, Ezeebit aims to drive mass adoption across retail outlets, large enterprises, and online platforms alike.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">What This Means for Existing Merchants</h2>

        <h3 className="text-xl font-semibold text-neutral-900 mt-6 mb-3">Seamless Continuity</h3>
        <p>
          Merchants can expect uninterrupted service, with a straightforward transition to the Ezeebit ecosystem. Behind the scenes, a joint team of Pundi X and Ezee Solutions Group engineers is ensuring a smooth and seamless migration of technology and services.
        </p>

        <h3 className="text-xl font-semibold text-neutral-900 mt-6 mb-3">Branding & UI Updates</h3>
        <p>
          An upcoming software update will refresh device interfaces with Ezeebit's new brand identity, ensuring a modern look and feel while preserving existing workflows.
        </p>

        <h3 className="text-xl font-semibold text-neutral-900 mt-6 mb-3">Proactive Communication</h3>
        <p>
          Merchants have already been informed of these changes. Ezeebit's dedicated support team remains available to address any inquiries.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Expanding Global Footprint with Advanced Infrastructure</h2>

        <p>
          With the newly acquired cryptocurrency wallet, payment, and exchange infrastructure, Ezeebit is well-positioned to support a wide range of merchants, enterprises, and financial institutions:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h4 className="font-semibold text-neutral-900 mb-2">Cutting-Edge POS Devices</h4>
            <p className="text-neutral-700 text-sm">Android-based point-of-sale terminals that enable merchants to accept stablecoin and crypto payments in-store, while mitigating cryptocurrency price-volatility risk.</p>
          </div>
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h4 className="font-semibold text-neutral-900 mb-2">Flexible Payment APIs</h4>
            <p className="text-neutral-700 text-sm">Streamlined integration options for websites, mobile apps, and e-commerce platforms, catering to the checkout preferences of crypto users.</p>
          </div>
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h4 className="font-semibold text-neutral-900 mb-2">Online Payment Links</h4>
            <p className="text-neutral-700 text-sm">Dynamic invoicing and remote payment capabilities that accommodate transactions anytime, anywhere.</p>
          </div>
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h4 className="font-semibold text-neutral-900 mb-2">Instant Conversions & Stable Transactions</h4>
            <p className="text-neutral-700 text-sm">Proprietary backend technology instantly converts stablecoin and crypto payments to stable forms, safeguarding merchants and customers from market and price fluctuations.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-neutral-900 mt-6 mb-3">Robust Crypto Payment & Wallet Infrastructure</h3>
        <p>
          Built for scalability and security, Ezeebit's ecosystem supports enterprise-level systems and large financial institutions worldwide. Planned enhancements include expanded fiat on-ramp and off-ramp options as well as crypto asset swaps, bridging the gap between traditional finance and the crypto economy.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Proven Success and Future Plans</h2>

        <p>
          Having processed tens of thousands of transactions, Ezeebit has already demonstrated its ability to lower fees for merchants while unlocking new revenue opportunities.
        </p>

        <p className="font-medium mt-4">Looking ahead, the company intends to:</p>

        <div className="not-prose space-y-4 my-6">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-primary-500 rounded-full mt-[9px] mr-3 flex-shrink-0"></div>
            <div>
              <h4 className="font-semibold text-neutral-900 text-base">Expand Distribution</h4>
              <p className="text-neutral-700 mt-1">Form partnerships with enterprises and financial providers to broaden its market reach across Africa and beyond.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-primary-500 rounded-full mt-[9px] mr-3 flex-shrink-0"></div>
            <div>
              <h4 className="font-semibold text-neutral-900 text-base">Launch New Technologies</h4>
              <p className="text-neutral-700 mt-1">Introduce solutions to further improve transaction speed, user experience, and stability, including additional fiat and crypto functionalities.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-primary-500 rounded-full mt-[9px] mr-3 flex-shrink-0"></div>
            <div>
              <h4 className="font-semibold text-neutral-900 text-base">Strengthen Regional Presence</h4>
              <p className="text-neutral-700 mt-1">Deliver secure, inclusive digital payments to underserved communities, driving greater financial inclusion.</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">About Ezeebit</h2>

        <p>
          Formerly trading as Pundi X South Africa, Ezeebit provides comprehensive cryptocurrency payment solutions to merchants, partners, and consumers worldwide. By integrating Android POS systems, APIs, and online payment infrastructure, Ezeebit is reshaping digital transactions—making them secure, frictionless, and universally accessible.
        </p>

        <p className="mt-4">
          Guided by the core values of security, innovation, and inclusion, Ezeebit champions financial empowerment in emerging markets and sets a new standard for the future of global payments.
        </p>
      </>
    )
  }
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? blogPostsData[slug] : null


  if (!post) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-20 min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">Post Not Found</h1>
          <p className="text-neutral-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/resources/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </motion.div>
    )
  }

  const shareUrl = window.location.href
  const shareTitle = post.title

  const handleShare = (platform: string) => {
    let url = ''
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`
        break
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        break
      case 'email':
        url = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`
        break
    }
    if (url) window.open(url, '_blank')
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.subtitle}
        canonicalUrl={`/blog/${slug}`}
        ogImage={post.image}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-20"
    >
      <section className="bg-white border-b border-neutral-100">
        <div className="container-custom py-4">
          <Link
            to="/resources/blog"
            className="flex items-center text-neutral-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="flex items-center mb-6">
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Tag className="w-4 h-4 mr-1" />
                  {post.category}
                </span>
              </div>

              <h1 className="text-3xl lg:text-5xl font-display font-bold text-neutral-900 mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                {post.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500 mb-8">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {post.readTime}
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  {post.views} views
                </div>
              </div>

              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">{post.author}</div>
                  <div className="text-sm text-neutral-500">{post.role}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-8">
                <span className="text-sm text-neutral-500 mr-2">Share:</span>
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 text-neutral-400 hover:text-blue-500 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-2 text-neutral-400 hover:text-blue-700 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare('email')}
                  className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto object-contain rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="prose prose-lg max-w-none"
            >
              <div className="text-neutral-700 leading-relaxed space-y-6 text-left">
                {post.content}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Ready to Experience Ezeebit?
            </h2>
            <p className="text-neutral-600 mb-8">
              Join the future of stablecoin and cryptocurrency payments and start accepting stablecoin and crypto today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://merchant.ezeebit.com/#/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center"
              >
                Get Started Today
              </a>
              <Link to="/contact" className="btn-secondary flex items-center justify-center">
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
    </>
  )
}

export default BlogPost
