import { describe, it, expect } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { render } from '../../test/utils'
import WhereToSpend from '../../pages/WhereToSpend'
import { stores, categories } from '../../lib/stores'

describe('WhereToSpend page', () => {
  it('renders without crashing', () => {
    render(<WhereToSpend />)
    // Heading text is split across elements: "Where to" + "Spend Crypto" in a span
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading.textContent).toMatch(/where to spend crypto/i)
  })

  it('renders all category filter buttons', () => {
    render(<WhereToSpend />)
    categories.forEach((cat) => {
      const buttons = screen.getAllByText(cat)
      expect(buttons.length).toBeGreaterThan(0)
    })
  })

  it('renders all stores by default (All category selected)', () => {
    render(<WhereToSpend />)
    stores.forEach((store) => {
      expect(screen.getByText(store.name)).toBeInTheDocument()
    })
  })

  it('filters stores when a category button is clicked', () => {
    render(<WhereToSpend />)
    const fashionCategory = 'Fashion & Apparel'
    const fashionButtons = screen.getAllByText(fashionCategory)
    fireEvent.click(fashionButtons[0])

    const fashionStores = stores.filter((s) => s.category === fashionCategory)
    const nonFashionStores = stores.filter((s) => s.category !== fashionCategory)

    fashionStores.forEach((store) => {
      expect(screen.getByText(store.name)).toBeInTheDocument()
    })

    nonFashionStores.forEach((store) => {
      expect(screen.queryByText(store.name)).not.toBeInTheDocument()
    })
  })

  it('filters stores by search term (name match)', () => {
    render(<WhereToSpend />)
    const searchInput = screen.getByPlaceholderText(/search stores/i)

    const targetStore = stores[0]
    fireEvent.change(searchInput, { target: { value: targetStore.name } })

    expect(screen.getByText(targetStore.name)).toBeInTheDocument()

    const otherStores = stores.filter(
      (s) =>
        !s.name.toLowerCase().includes(targetStore.name.toLowerCase()) &&
        !s.excerpt.toLowerCase().includes(targetStore.name.toLowerCase()) &&
        !s.category.toLowerCase().includes(targetStore.name.toLowerCase())
    )
    otherStores.forEach((store) => {
      expect(screen.queryByText(store.name)).not.toBeInTheDocument()
    })
  })

  it('shows "No stores found" when search has no results', () => {
    render(<WhereToSpend />)
    const searchInput = screen.getByPlaceholderText(/search stores/i)
    fireEvent.change(searchInput, { target: { value: 'xyznonexistentquery12345' } })
    expect(screen.getByText(/no stores found/i)).toBeInTheDocument()
  })

  it('resets filters when "View All Stores" is clicked after a no-result search', () => {
    render(<WhereToSpend />)
    const searchInput = screen.getByPlaceholderText(/search stores/i)
    fireEvent.change(searchInput, { target: { value: 'xyznonexistentquery12345' } })

    const resetButton = screen.getByRole('button', { name: /view all stores/i })
    fireEvent.click(resetButton)

    stores.forEach((store) => {
      expect(screen.getByText(store.name)).toBeInTheDocument()
    })
  })

  it('renders a store search input', () => {
    render(<WhereToSpend />)
    expect(screen.getByPlaceholderText(/search stores/i)).toBeInTheDocument()
  })
})
