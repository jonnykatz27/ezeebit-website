import { describe, it, expect, vi, afterEach } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../../test/utils'
import { stores } from '../../lib/stores'

const mockUseParams = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useParams: () => mockUseParams(),
  }
})

// Dynamic import must happen after vi.mock
const { default: StoreDetail } = await import('../../pages/StoreDetail')

const firstStore = stores[0]

afterEach(() => {
  vi.clearAllMocks()
})

describe('StoreDetail page — valid slug', () => {
  it('renders the store name', () => {
    mockUseParams.mockReturnValue({ slug: firstStore.slug })
    render(<StoreDetail />)
    expect(screen.getAllByText(firstStore.name).length).toBeGreaterThan(0)
  })

  it('renders a link to the store website', () => {
    mockUseParams.mockReturnValue({ slug: firstStore.slug })
    render(<StoreDetail />)
    const websiteLinks = screen.getAllByRole('link').filter(
      (a) => a.getAttribute('href') === firstStore.websiteUrl
    )
    expect(websiteLinks.length).toBeGreaterThan(0)
  })

  it('renders a back-to-stores link', () => {
    mockUseParams.mockReturnValue({ slug: firstStore.slug })
    render(<StoreDetail />)
    const backLink = screen.getByRole('link', { name: /where to spend/i })
    expect(backLink).toHaveAttribute('href', '/resources/where-to-spend')
  })

  it('renders the payment steps section', () => {
    mockUseParams.mockReturnValue({ slug: firstStore.slug })
    render(<StoreDetail />)
    expect(screen.getByText(/scan the qr code/i)).toBeInTheDocument()
  })
})

describe('StoreDetail page — invalid slug', () => {
  it('renders a "Store Not Found" message for an unknown slug', () => {
    mockUseParams.mockReturnValue({ slug: 'nonexistent-store-xyz' })
    render(<StoreDetail />)
    expect(screen.getByText(/store not found/i)).toBeInTheDocument()
  })

  it('renders a link back to stores list when store is not found', () => {
    mockUseParams.mockReturnValue({ slug: 'nonexistent-store-xyz' })
    render(<StoreDetail />)
    const backLink = screen.getByRole('link', { name: /back to stores/i })
    expect(backLink).toHaveAttribute('href', '/resources/where-to-spend')
  })
})

