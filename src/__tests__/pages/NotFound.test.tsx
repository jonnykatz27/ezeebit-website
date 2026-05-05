import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../../test/utils'
import NotFound from '../../pages/NotFound'

describe('NotFound page', () => {
  it('renders without crashing', () => {
    render(<NotFound />)
    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('renders the main heading', () => {
    render(<NotFound />)
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument()
  })

  it('renders a descriptive message', () => {
    render(<NotFound />)
    expect(screen.getByText(/couldn't find the page/i)).toBeInTheDocument()
  })

  it('renders a "Back to Home" link pointing to "/"', () => {
    render(<NotFound />)
    const homeLink = screen.getByRole('link', { name: /back to home/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('renders a "Contact Support" link pointing to "/contact"', () => {
    render(<NotFound />)
    const contactLink = screen.getByRole('link', { name: /contact support/i })
    expect(contactLink).toBeInTheDocument()
    expect(contactLink).toHaveAttribute('href', '/contact')
  })

  it('renders a "Pricing" suggestion link', () => {
    render(<NotFound />)
    const pricingLink = screen.getByRole('link', { name: /pricing/i })
    expect(pricingLink).toHaveAttribute('href', '/pricing')
  })

  it('renders an "In-Store Payments" suggestion link', () => {
    render(<NotFound />)
    const inStoreLink = screen.getByRole('link', { name: /in-store payments/i })
    expect(inStoreLink).toHaveAttribute('href', '/in-store')
  })

  it('renders an "Online Payments" suggestion link', () => {
    render(<NotFound />)
    const onlineLink = screen.getByRole('link', { name: /online payments/i })
    expect(onlineLink).toHaveAttribute('href', '/online')
  })

  it('renders an FAQ suggestion link', () => {
    render(<NotFound />)
    const faqLink = screen.getByRole('link', { name: /faq/i })
    expect(faqLink).toHaveAttribute('href', '/resources/faq')
  })

  it('renders a "you might be looking for" section', () => {
    render(<NotFound />)
    expect(screen.getByText(/you might be looking for/i)).toBeInTheDocument()
  })
})
