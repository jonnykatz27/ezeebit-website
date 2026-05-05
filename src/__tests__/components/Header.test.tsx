import { describe, it, expect } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { render } from '../../test/utils'
import Header from '../../components/Header'

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header />)
    expect(document.querySelector('header')).toBeInTheDocument()
  })

  it('renders the Ezeebit logo', () => {
    render(<Header />)
    expect(screen.getByAltText('Ezeebit')).toBeInTheDocument()
  })

  it('renders main navigation links', () => {
    render(<Header />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('In-Store')).toBeInTheDocument()
    expect(screen.getByText('Online')).toBeInTheDocument()
    expect(screen.getByText('Pricing')).toBeInTheDocument()
    expect(screen.getByText('Developers')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders a Resources dropdown trigger', () => {
    render(<Header />)
    const resourcesButtons = screen.getAllByText('Resources')
    expect(resourcesButtons.length).toBeGreaterThan(0)
  })

  it('renders Login and Get Started CTA links', () => {
    render(<Header />)
    const loginLinks = screen.getAllByText('Login')
    expect(loginLinks.length).toBeGreaterThan(0)
    const getStartedLinks = screen.getAllByText('Get Started')
    expect(getStartedLinks.length).toBeGreaterThan(0)
  })

  it('Login link points to the merchant portal', () => {
    render(<Header />)
    const loginLinks = screen.getAllByText('Login')
    const loginAnchor = loginLinks[0].closest('a')
    expect(loginAnchor).toHaveAttribute('href', 'https://merchant.ezeebit.com/#/login')
  })

  it('Get Started link points to the merchant portal signup', () => {
    render(<Header />)
    const getStartedLinks = screen.getAllByText('Get Started')
    const getStartedAnchor = getStartedLinks[0].closest('a')
    expect(getStartedAnchor).toHaveAttribute('href', 'https://merchant.ezeebit.com/#/signup')
  })

  it('renders a mobile menu toggle button with accessible label', () => {
    render(<Header />)
    const menuButton = screen.getByRole('button', { name: /open menu/i })
    expect(menuButton).toBeInTheDocument()
  })

  it('toggles the mobile menu when the button is clicked', () => {
    render(<Header />)
    const menuButton = screen.getByRole('button', { name: /open menu/i })

    fireEvent.click(menuButton)
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /close menu/i }))
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument()
  })

  it('shows mobile nav links when menu is open', () => {
    render(<Header />)
    const menuButton = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(menuButton)

    const homeLinks = screen.getAllByText('Home')
    expect(homeLinks.length).toBeGreaterThan(1)
  })
})

describe('Header isActive logic', () => {
  it('marks the Home link active on the root path', () => {
    render(<Header />, { routerProps: { initialEntries: ['/'] } })
    const homeLink = screen.getByText('Home').closest('a')
    expect(homeLink?.classList.contains('text-primary-600')).toBe(true)
  })

  it('marks In-Store link active on /in-store path', () => {
    render(<Header />, { routerProps: { initialEntries: ['/in-store'] } })
    const inStoreLink = screen.getByText('In-Store').closest('a')
    expect(inStoreLink?.classList.contains('text-primary-600')).toBe(true)
  })

  it('does not mark Home link active on a sub-page', () => {
    render(<Header />, { routerProps: { initialEntries: ['/pricing'] } })
    const homeLink = screen.getByText('Home').closest('a')
    expect(homeLink?.classList.contains('text-primary-600')).toBe(false)
  })
})
