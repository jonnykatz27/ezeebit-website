import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../../test/utils'
import Footer from '../../components/Footer'

describe('Footer', () => {
  it('renders without crashing', () => {
    render(<Footer />)
    expect(document.querySelector('footer')).toBeInTheDocument()
  })

  it('renders the Ezeebit logo image', () => {
    render(<Footer />)
    const logos = screen.getAllByAltText('Ezeebit')
    expect(logos.length).toBeGreaterThan(0)
  })

  it('renders all four navigation sections', () => {
    render(<Footer />)
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Resources')).toBeInTheDocument()
    expect(screen.getByText('Legal')).toBeInTheDocument()
    expect(screen.getByText('Support')).toBeInTheDocument()
  })

  it('renders product links', () => {
    render(<Footer />)
    expect(screen.getByText('In-Store Payments')).toBeInTheDocument()
    expect(screen.getByText('Online Payments')).toBeInTheDocument()
    expect(screen.getByText('Pricing')).toBeInTheDocument()
    expect(screen.getByText('API Documentation')).toBeInTheDocument()
  })

  it('renders resource links', () => {
    render(<Footer />)
    expect(screen.getByText('About Us')).toBeInTheDocument()
    expect(screen.getByText('FAQ')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('User Manual')).toBeInTheDocument()
    expect(screen.getByText('Careers')).toBeInTheDocument()
  })

  it('renders legal links', () => {
    render(<Footer />)
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Terms & Conditions')).toBeInTheDocument()
    expect(screen.getByText('Compliance')).toBeInTheDocument()
  })

  it('renders support links', () => {
    render(<Footer />)
    expect(screen.getByText('Contact')).toBeInTheDocument()
    expect(screen.getByText('Help Center')).toBeInTheDocument()
    expect(screen.getByText('Developer Docs')).toBeInTheDocument()
    expect(screen.getByText('Merchant Portal')).toBeInTheDocument()
  })

  it('external links have target="_blank" and rel="noopener noreferrer"', () => {
    render(<Footer />)
    const merchantPortalLink = screen.getByText('Merchant Portal').closest('a')
    expect(merchantPortalLink).toHaveAttribute('target', '_blank')
    expect(merchantPortalLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders contact information', () => {
    render(<Footer />)
    expect(screen.getByText('+27 21 879 5074')).toBeInTheDocument()
    expect(screen.getByText('support@ezeebit.com')).toBeInTheDocument()
    expect(screen.getByText('Cape Town, South Africa')).toBeInTheDocument()
  })

  it('renders compliance badges', () => {
    render(<Footer />)
    expect(screen.getByText('FSCA Regulated')).toBeInTheDocument()
    expect(screen.getByText('FIC Compliant')).toBeInTheDocument()
    expect(screen.getByText('FAIS Registered')).toBeInTheDocument()
  })

  it('renders copyright notice', () => {
    render(<Footer />)
    expect(screen.getByText(/Ezeebit\. All rights reserved\./)).toBeInTheDocument()
  })
})
