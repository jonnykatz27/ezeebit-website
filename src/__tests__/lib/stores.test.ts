import { describe, it, expect } from 'vitest'
import { stores, categories, type Store } from '../../lib/stores'

describe('stores data', () => {
  it('exports a non-empty array of stores', () => {
    expect(Array.isArray(stores)).toBe(true)
    expect(stores.length).toBeGreaterThan(0)
  })

  it('every store has all required fields with non-empty values', () => {
    const requiredStringFields: (keyof Store)[] = [
      'name', 'slug', 'category', 'excerpt', 'about', 'websiteUrl', 'image', 'moreInfoRoute',
    ]

    stores.forEach((store) => {
      requiredStringFields.forEach((field) => {
        expect(
          typeof store[field] === 'string' && (store[field] as string).trim().length > 0,
          `store "${store.name}" is missing or has empty field "${field}"`
        ).toBe(true)
      })

      expect(
        typeof store.order === 'number',
        `store "${store.name}" has a non-numeric order`
      ).toBe(true)
    })
  })

  it('all store slugs are unique', () => {
    const slugs = stores.map((s) => s.slug)
    const uniqueSlugs = new Set(slugs)
    expect(uniqueSlugs.size).toBe(slugs.length)
  })

  it('all store order values are unique', () => {
    const orders = stores.map((s) => s.order)
    const uniqueOrders = new Set(orders)
    expect(uniqueOrders.size).toBe(orders.length)
  })

  it('every store category is one of the known categories (excluding "All")', () => {
    const knownCategories = new Set(categories.filter((c) => c !== 'All'))
    stores.forEach((store) => {
      expect(
        knownCategories.has(store.category),
        `store "${store.name}" has unknown category "${store.category}"`
      ).toBe(true)
    })
  })

  it('every store slug matches the moreInfoRoute', () => {
    stores.forEach((store) => {
      expect(
        store.moreInfoRoute,
        `store "${store.name}" moreInfoRoute does not contain its slug`
      ).toContain(store.slug)
    })
  })

  it('every store websiteUrl starts with https://', () => {
    stores.forEach((store) => {
      expect(
        store.websiteUrl.startsWith('https://'),
        `store "${store.name}" websiteUrl "${store.websiteUrl}" does not start with https://`
      ).toBe(true)
    })
  })

  it('every store image starts with /', () => {
    stores.forEach((store) => {
      expect(
        store.image.startsWith('/'),
        `store "${store.name}" image path "${store.image}" does not start with /`
      ).toBe(true)
    })
  })

  it('every store moreInfoRoute starts with /resources/stores/', () => {
    stores.forEach((store) => {
      expect(
        store.moreInfoRoute.startsWith('/resources/stores/'),
        `store "${store.name}" moreInfoRoute "${store.moreInfoRoute}" is unexpected`
      ).toBe(true)
    })
  })
})

describe('categories data', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(categories)).toBe(true)
    expect(categories.length).toBeGreaterThan(0)
  })

  it('first category is "All"', () => {
    expect(categories[0]).toBe('All')
  })

  it('all entries are non-empty strings', () => {
    categories.forEach((cat) => {
      expect(typeof cat).toBe('string')
      expect(cat.trim().length).toBeGreaterThan(0)
    })
  })

  it('all categories are unique', () => {
    const unique = new Set(categories)
    expect(unique.size).toBe(categories.length)
  })

  it('contains all categories referenced by stores', () => {
    const storeCategories = new Set(stores.map((s) => s.category))
    storeCategories.forEach((cat) => {
      expect(
        categories.includes(cat),
        `category "${cat}" used by a store is not in the categories list`
      ).toBe(true)
    })
  })
})
