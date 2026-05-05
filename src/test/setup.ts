import '@testing-library/jest-dom'

// Mock IntersectionObserver (not available in jsdom, needed by framer-motion whileInView)
class MockIntersectionObserver {
  disconnect() {}
  observe() {}
  takeRecords() { return [] }
  unobserve() {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
})
