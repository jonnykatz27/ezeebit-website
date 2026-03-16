export const colors = {
  brand: {
    blue: '#0074E3',
    black: '#000000',
    white: '#FFFFFF',
  },

  primary: {
    50: '#EBF5FF',
    100: '#D6EAFF',
    200: '#ADD5FF',
    300: '#70B8FF',
    400: '#3399FF',
    500: '#0074E3',
    600: '#005CB8',
    700: '#00458A',
    800: '#002E5C',
    900: '#001A36',
    950: '#000D1A',
  },

  secondary: {
    50: '#ECFCFF',
    100: '#CFF7FE',
    200: '#A5F0FC',
    300: '#67E3F9',
    400: '#22CCEE',
    500: '#06AED4',
    600: '#088AB2',
    700: '#0E6F90',
    800: '#155876',
    900: '#164964',
    950: '#082F44',
  },

  neutral: {
    0: '#FFFFFF',
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#030712',
  },

  success: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
  },

  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
  },

  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
  },

  info: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
  },
} as const

export const typography = {
  fontFamily: {
    sans: "'THICCCBOI', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', 'Courier New', monospace",
  },

  scale: {
    display: { size: '4.5rem', lineHeight: '1.08', letterSpacing: '-0.03em', weight: 700 },
    h1: { size: '3.25rem', lineHeight: '1.12', letterSpacing: '-0.025em', weight: 700 },
    h2: { size: '2.5rem', lineHeight: '1.15', letterSpacing: '-0.02em', weight: 700 },
    h3: { size: '1.75rem', lineHeight: '1.2', letterSpacing: '-0.015em', weight: 600 },
    h4: { size: '1.375rem', lineHeight: '1.25', letterSpacing: '-0.01em', weight: 600 },
    title: { size: '1.125rem', lineHeight: '1.35', letterSpacing: '-0.005em', weight: 600 },
    body: { size: '1rem', lineHeight: '1.6', letterSpacing: '0', weight: 400 },
    bodyLarge: { size: '1.125rem', lineHeight: '1.6', letterSpacing: '0', weight: 400 },
    callout: { size: '2rem', lineHeight: '1.2', letterSpacing: '-0.02em', weight: 700 },
    subheadline: { size: '0.875rem', lineHeight: '1.5', letterSpacing: '0.01em', weight: 500 },
    footnote: { size: '0.8125rem', lineHeight: '1.45', letterSpacing: '0.01em', weight: 400 },
    caption: { size: '0.75rem', lineHeight: '1.4', letterSpacing: '0.02em', weight: 400 },
    overline: { size: '0.6875rem', lineHeight: '1.35', letterSpacing: '0.1em', weight: 600 },
  },

  mobile: {
    display: { size: '2.75rem', lineHeight: '1.1', letterSpacing: '-0.025em' },
    h1: { size: '2.25rem', lineHeight: '1.15', letterSpacing: '-0.02em' },
    h2: { size: '1.875rem', lineHeight: '1.2', letterSpacing: '-0.015em' },
    h3: { size: '1.375rem', lineHeight: '1.25', letterSpacing: '-0.01em' },
  },
} as const

export const spacing = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
} as const

export const borderRadius = {
  none: '0',
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
} as const

export const shadows = {
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -2px rgba(0, 0, 0, 0.04)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.06), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.12)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
} as const

export const animation = {
  duration: {
    instant: '100ms',
    fast: '200ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
  },
  easing: {
    default: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    in: 'cubic-bezier(0.42, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.58, 1)',
    inOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',
  epos: '480px',
} as const

export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  overlay: 30,
  modal: 40,
  toast: 50,
  tooltip: 60,
} as const
