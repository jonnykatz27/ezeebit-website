import { describe, it, expect } from 'vitest'
import { storeDetailsMap, type StoreDetailData, type StoreLocation } from '../../lib/storeDetails'
import { stores } from '../../lib/stores'

describe('storeDetailsMap data', () => {
  it('is a non-null object', () => {
    expect(storeDetailsMap).toBeTruthy()
    expect(typeof storeDetailsMap).toBe('object')
  })

  it('has at least one entry', () => {
    expect(Object.keys(storeDetailsMap).length).toBeGreaterThan(0)
  })

  it('every key in storeDetailsMap corresponds to a valid store slug', () => {
    const validSlugs = new Set(stores.map((s) => s.slug))
    Object.keys(storeDetailsMap).forEach((slug) => {
      expect(
        validSlugs.has(slug),
        `storeDetailsMap has key "${slug}" which is not a valid store slug`
      ).toBe(true)
    })
  })

  it('every store slug has a corresponding entry in storeDetailsMap', () => {
    stores.forEach((store) => {
      expect(
        storeDetailsMap[store.slug],
        `store "${store.name}" (slug: "${store.slug}") has no entry in storeDetailsMap`
      ).toBeDefined()
    })
  })

  it('every entry has a locations array with at least one location', () => {
    Object.entries(storeDetailsMap).forEach(([slug, detail]: [string, StoreDetailData]) => {
      expect(
        Array.isArray(detail.locations),
        `storeDetailsMap["${slug}"].locations is not an array`
      ).toBe(true)
      expect(
        detail.locations.length,
        `storeDetailsMap["${slug}"].locations is empty`
      ).toBeGreaterThan(0)
    })
  })

  it('every location has required non-empty name, address, and city fields', () => {
    Object.entries(storeDetailsMap).forEach(([slug, detail]: [string, StoreDetailData]) => {
      detail.locations.forEach((loc: StoreLocation, idx: number) => {
        const prefix = `storeDetailsMap["${slug}"].locations[${idx}]`

        expect(
          typeof loc.name === 'string' && loc.name.trim().length > 0,
          `${prefix}.name is empty or missing`
        ).toBe(true)

        expect(
          typeof loc.address === 'string' && loc.address.trim().length > 0,
          `${prefix}.address is empty or missing`
        ).toBe(true)

        expect(
          typeof loc.city === 'string' && loc.city.trim().length > 0,
          `${prefix}.city is empty or missing`
        ).toBe(true)
      })
    })
  })

  it('phone field, when present, is a string', () => {
    Object.entries(storeDetailsMap).forEach(([slug, detail]: [string, StoreDetailData]) => {
      detail.locations.forEach((loc: StoreLocation, idx: number) => {
        if (loc.phone !== undefined) {
          expect(
            typeof loc.phone,
            `storeDetailsMap["${slug}"].locations[${idx}].phone should be a string`
          ).toBe('string')
        }
      })
    })
  })
})
