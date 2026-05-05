import { describe, it, expect } from 'vitest'
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animation,
  breakpoints,
  zIndex,
} from '../../lib/designTokens'

describe('colors', () => {
  it('has brand colors', () => {
    expect(colors.brand.blue).toBe('#0074E3')
    expect(colors.brand.black).toBe('#000000')
    expect(colors.brand.white).toBe('#FFFFFF')
  })

  it('has a primary palette with expected keys', () => {
    const expectedKeys = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']
    expectedKeys.forEach((key) => {
      expect(
        Object.prototype.hasOwnProperty.call(colors.primary, key),
        `colors.primary is missing key "${key}"`
      ).toBe(true)
    })
  })

  it('all color values are valid hex strings', () => {
    const hexPattern = /^#[0-9A-Fa-f]{3,8}$/

    function validateColors(obj: Record<string, unknown>, path = 'colors') {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string') {
          expect(
            hexPattern.test(value),
            `${path}.${key} = "${value}" is not a valid hex color`
          ).toBe(true)
        } else if (typeof value === 'object' && value !== null) {
          validateColors(value as Record<string, unknown>, `${path}.${key}`)
        }
      }
    }

    validateColors(colors as unknown as Record<string, unknown>)
  })
})

describe('typography', () => {
  it('has fontFamily definitions', () => {
    expect(typeof typography.fontFamily.sans).toBe('string')
    expect(typeof typography.fontFamily.mono).toBe('string')
  })

  it('scale entries have size, lineHeight, and weight', () => {
    Object.entries(typography.scale).forEach(([name, entry]) => {
      expect(typeof entry.size, `typography.scale.${name}.size`).toBe('string')
      expect(typeof entry.lineHeight, `typography.scale.${name}.lineHeight`).toBe('string')
      expect(typeof entry.weight, `typography.scale.${name}.weight`).toBe('number')
    })
  })

  it('mobile entries have size and lineHeight', () => {
    Object.entries(typography.mobile).forEach(([name, entry]) => {
      expect(typeof entry.size, `typography.mobile.${name}.size`).toBe('string')
      expect(typeof entry.lineHeight, `typography.mobile.${name}.lineHeight`).toBe('string')
    })
  })
})

describe('spacing', () => {
  it('exports a spacing object', () => {
    expect(typeof spacing).toBe('object')
  })

  it('all spacing values are pixel strings', () => {
    Object.entries(spacing).forEach(([key, value]) => {
      expect(
        value === '0' || /^\d+(\.\d+)?px$/.test(value),
        `spacing["${key}"] = "${value}" is not a valid spacing value`
      ).toBe(true)
    })
  })
})

describe('borderRadius', () => {
  it('has expected keys', () => {
    const expectedKeys = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full']
    expectedKeys.forEach((key) => {
      expect(
        Object.prototype.hasOwnProperty.call(borderRadius, key),
        `borderRadius is missing key "${key}"`
      ).toBe(true)
    })
  })

  it('"none" has value "0"', () => {
    expect(borderRadius.none).toBe('0')
  })

  it('"full" has value "9999px"', () => {
    expect(borderRadius.full).toBe('9999px')
  })
})

describe('shadows', () => {
  it('has expected shadow levels', () => {
    const expectedKeys = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'inner']
    expectedKeys.forEach((key) => {
      expect(
        Object.prototype.hasOwnProperty.call(shadows, key),
        `shadows is missing key "${key}"`
      ).toBe(true)
      expect(typeof (shadows as Record<string, string>)[key]).toBe('string')
    })
  })
})

describe('animation', () => {
  it('has duration entries', () => {
    const expectedDurations = ['instant', 'fast', 'normal', 'slow', 'slower']
    expectedDurations.forEach((key) => {
      const val = (animation.duration as Record<string, string>)[key]
      expect(val, `animation.duration.${key} is missing`).toBeDefined()
      expect(/^\d+ms$/.test(val), `animation.duration.${key} = "${val}" is not in ms format`).toBe(true)
    })
  })

  it('has easing entries as valid strings', () => {
    const expectedEasings = ['default', 'in', 'out', 'inOut', 'spring', 'bounce']
    expectedEasings.forEach((key) => {
      const val = (animation.easing as Record<string, string>)[key]
      expect(val, `animation.easing.${key} is missing`).toBeDefined()
      expect(typeof val).toBe('string')
    })
  })
})

describe('breakpoints', () => {
  it('has standard breakpoint keys', () => {
    const expectedKeys = ['sm', 'md', 'lg', 'xl', '2xl']
    expectedKeys.forEach((key) => {
      expect(
        Object.prototype.hasOwnProperty.call(breakpoints, key),
        `breakpoints is missing key "${key}"`
      ).toBe(true)
    })
  })

  it('all values are pixel strings', () => {
    Object.entries(breakpoints).forEach(([key, value]) => {
      expect(
        /^\d+px$/.test(value),
        `breakpoints["${key}"] = "${value}" is not a valid pixel value`
      ).toBe(true)
    })
  })
})

describe('zIndex', () => {
  it('has layering keys', () => {
    const expectedKeys = ['base', 'dropdown', 'sticky', 'overlay', 'modal', 'toast', 'tooltip']
    expectedKeys.forEach((key) => {
      expect(
        Object.prototype.hasOwnProperty.call(zIndex, key),
        `zIndex is missing key "${key}"`
      ).toBe(true)
    })
  })

  it('values are non-negative numbers', () => {
    Object.entries(zIndex).forEach(([key, value]) => {
      expect(typeof value, `zIndex.${key} should be a number`).toBe('number')
      expect(value >= 0, `zIndex.${key} should be non-negative`).toBe(true)
    })
  })

  it('values increase in expected order', () => {
    expect(zIndex.base).toBeLessThan(zIndex.dropdown)
    expect(zIndex.dropdown).toBeLessThan(zIndex.sticky)
    expect(zIndex.sticky).toBeLessThan(zIndex.overlay)
    expect(zIndex.overlay).toBeLessThan(zIndex.modal)
    expect(zIndex.modal).toBeLessThan(zIndex.toast)
    expect(zIndex.toast).toBeLessThan(zIndex.tooltip)
  })
})
