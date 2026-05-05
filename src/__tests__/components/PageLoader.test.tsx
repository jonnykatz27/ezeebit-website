import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../../test/utils'
import PageLoader from '../../components/PageLoader'

describe('PageLoader', () => {
  it('renders loading status elements', () => {
    render(<PageLoader />)
    const statusElements = screen.getAllByRole('status')
    expect(statusElements.length).toBeGreaterThan(0)
  })

  it('outer container has aria-busy="true"', () => {
    render(<PageLoader />)
    const busyElement = document.querySelector('[aria-busy="true"]')
    expect(busyElement).toBeInTheDocument()
  })

  it('has aria-label describing loading on the outer container', () => {
    render(<PageLoader />)
    const status = screen.getByLabelText(/loading page/i)
    expect(status).toBeInTheDocument()
  })

  it('renders "Loading..." text', () => {
    render(<PageLoader />)
    const loadingTexts = screen.getAllByText('Loading...')
    expect(loadingTexts.length).toBeGreaterThan(0)
  })

  it('renders a visible paragraph with "Loading..." text', () => {
    render(<PageLoader />)
    const paragraph = document.querySelector('p')
    expect(paragraph).toBeInTheDocument()
    expect(paragraph?.textContent).toBe('Loading...')
  })
})
