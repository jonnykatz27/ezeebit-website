import { nextui } from '@nextui-org/react'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'THICCCBOI'", "'Inter'", '-apple-system', 'BlinkMacSystemFont', "'Segoe UI'", 'Roboto', "'Helvetica Neue'", 'Arial', 'sans-serif'],
        display: ["'THICCCBOI'", "'Inter'", '-apple-system', 'BlinkMacSystemFont', "'Segoe UI'", 'Roboto', "'Helvetica Neue'", 'Arial', 'sans-serif'],
        mono: ["'SF Mono'", "'Fira Code'", "'Fira Mono'", "'Roboto Mono'", "'Courier New'", 'monospace'],
        // Brand accent — Caveat Bold, used sparingly for one-line emphasis
        accent: ["'Caveat'", 'ui-rounded', 'cursive'],
        // The Merchant Portal's typeface, for mockups of our product UI
        ui: ["'Figtree'", "'Inter'", '-apple-system', 'BlinkMacSystemFont', "'Segoe UI'", 'Roboto', 'sans-serif'],
      },
      colors: {
        // Ezeebit master brand palette — Ezeebit Blue #0074E4 is the hero accent
        primary: {
          50: '#E6F0FC',
          100: '#D6EAFF',
          200: '#ADD5FF',
          300: '#70B8FF',
          400: '#3D9AED',
          500: '#0074E4',
          600: '#00509E',
          700: '#00458A',
          800: '#002E5C',
          900: '#001A36',
        },
        // Secondary maps to the brand's blue family (Blue Mid / Blue Dark) —
        // the old cyan ramp is off-brand
        secondary: {
          50: '#E6F0FC',
          100: '#D6EAFF',
          200: '#ADD5FF',
          300: '#70B8FF',
          400: '#3D9AED',
          500: '#3D9AED',
          600: '#00509E',
          700: '#00458A',
          800: '#002E5C',
          900: '#001A36',
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
          950: '#111111',
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
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.08', letterSpacing: '-0.03em', fontWeight: '700' }],
        'h1': ['3.25rem', { lineHeight: '1.12', letterSpacing: '-0.025em', fontWeight: '700' }],
        'h2': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h3': ['1.75rem', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' }],
        'h4': ['1.375rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        'title': ['1.125rem', { lineHeight: '1.35', letterSpacing: '-0.005em', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'body': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'callout': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'subheadline': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '500' }],
        'footnote': ['0.8125rem', { lineHeight: '1.45', letterSpacing: '0.01em' }],
        'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
        'overline': ['0.6875rem', { lineHeight: '1.35', letterSpacing: '0.1em', fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '128': '32rem',
      },
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -2px rgba(0, 0, 0, 0.04)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.06), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.12)',
      },
      transitionTimingFunction: {
        'ease-default': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'ease-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      screens: {
        'epos': '480px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [
    typography,
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              50: '#E6F0FC',
              100: '#D6EAFF',
              200: '#ADD5FF',
              300: '#70B8FF',
              400: '#3D9AED',
              500: '#0074E4',
              600: '#00509E',
              700: '#00458A',
              800: '#002E5C',
              900: '#001A36',
              DEFAULT: '#0074E4',
              foreground: '#FFFFFF',
            },
            secondary: {
              DEFAULT: '#3D9AED',
              foreground: '#FFFFFF',
            },
            success: {
              DEFAULT: '#10B981',
              foreground: '#FFFFFF',
            },
            warning: {
              DEFAULT: '#F59E0B',
              foreground: '#FFFFFF',
            },
            danger: {
              DEFAULT: '#EF4444',
              foreground: '#FFFFFF',
            },
          },
        },
      },
    }),
  ],
}
