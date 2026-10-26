import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'

/**
 * Pieces of the Merchant Portal, rebuilt from its Figma file
 * ("Ezeebit – The Ezee Way", page "Merchant Portal Designs") so every place the
 * site shows our product UI looks like the real thing: Figtree type, the
 * portal's own colour tokens, and its Phosphor icons from /public/portal.
 *
 * They are laid out at the portal's own sizes. Wrap one in <PortalScale> to fit
 * it into a smaller illustration without changing its proportions.
 */

/** Colour tokens, exactly as named in the portal's Figma variables. */
const C = {
  text: '#172b4d',         // color.text
  subtle: '#44546f',       // color.text.subtle
  subtlest: '#626f86',     // color.text.subtlest
  brand: '#0074e3',        // color.text.brand
  gray900: '#181d27',      // Gray/900
  amount: '#181c1e',
  success: '#22a06b',      // color.text.success
  successBg: '#dcfff1',    // color.background.accent.green.subtlest
  fiat: '#00509e',
  stable: '#cfe7ff',
  teal: '#2898bd',         // color.border.accent.teal
  divider: '#ededed',
}

/**
 * The portal's page background, as a class. It belongs to the product's own UI,
 * so it lives here with the rest of the portal's colours rather than as a
 * stray value in the pages that show portal cards.
 */
export const PORTAL_PAGE_BG = 'bg-[#f8f9fb]'

/**
 * Renders a portal component at its design width, scaled to fit a smaller
 * space. A transform does not shrink the room an element takes up, so the
 * scaled height is measured and applied to the outer box.
 */
export const PortalScale = ({ width, scale, children, className = '' }: { width: number; scale: number; children: ReactNode; className?: string }) => {
  const inner = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>()

  useEffect(() => {
    const el = inner.current
    if (!el) return
    const measure = () => setHeight(el.offsetHeight * scale)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [scale])

  return (
    <div className={className} style={{ width: width * scale, height }}>
      <div ref={inner} style={{ width, transform: `scale(${scale})`, transformOrigin: 'top left' }}>{children}</div>
    </div>
  )
}

/** The green "+5.2%" chip and its "vs last month" note. */
const Change = ({ value }: { value: string }) => (
  <span className="flex items-center gap-1">
    <span className="h-[14px] px-1 rounded-[2px] flex items-center text-[10px] font-semibold" style={{ background: C.successBg, color: C.success }}>
      {value}
    </span>
    <span className="text-[9px] leading-[13.5px] text-[#464555]">vs last month</span>
  </span>
)

type Action = 'deposit' | 'withdraw' | 'convert'

const ACTIONS: { key: Action; label: string; icon: string; flip?: boolean }[] = [
  { key: 'deposit', label: 'Deposit', icon: '/portal/arrow-line-down.svg' },
  { key: 'withdraw', label: 'Withdraw', icon: '/portal/arrow-line-down.svg', flip: true },
  { key: 'convert', label: 'Convert', icon: '/portal/arrows-counter-clockwise.svg' },
]

/**
 * The wallet balance card from the Dashboard and Wallet overview: total,
 * fiat/stablecoin split, the two wallets, and Deposit · Withdraw · Convert.
 * Design width 560–976px.
 */
export const PortalBalanceCard = ({
  total, change = '+5.2%', fiatShare, fiat, stable, active = null, flash,
}: {
  total: ReactNode
  change?: string
  /** Percentage of the bar that is fiat. */
  fiatShare: number
  fiat: { mark: string; amount: ReactNode; label?: string }
  stable: { amount: ReactNode; label?: string }
  /** Briefly highlights one of the actions, as if it had just been used. */
  active?: Action | null
  /** Extra layers drawn under each wallet, for a highlight when it changes. */
  flash?: { fiat?: ReactNode; stable?: ReactNode }
}) => (
  // Sized by its own width, not the screen: narrow, the wallets stack as the portal does on mobile
  <div className="font-ui bg-white rounded-[12px] pt-6 [container-type:inline-size] [&_img]:!mx-0">
    <div className="px-8 [@container(max-width:480px)]:px-5">
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-3 mb-4">
        <div className="flex flex-col gap-1">
          <p className="text-[12px]" style={{ color: C.subtlest }}>Total wallet balance</p>
          <div className="flex items-center gap-2">
            <p className="text-[20px] font-bold tabular-nums" style={{ color: C.amount }}>{total}</p>
            <Change value={change} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          {[{ c: C.fiat, l: 'Fiat wallet' }, { c: C.stable, l: 'Stablecoin wallet' }].map((k) => (
            <span key={k.l} className="flex items-center gap-1 text-[14px] leading-[12px] font-medium" style={{ color: C.text }}>
              <span className="size-3 rounded-full" style={{ background: k.c }} />
              {k.l}
            </span>
          ))}
        </div>
      </div>

      <div className="h-2 w-full rounded-[12px] overflow-hidden mb-6" style={{ background: C.stable }}>
        <motion.div
          className="h-full rounded-[12px]"
          style={{ background: C.fiat }}
          initial={false}
          animate={{ width: `${fiatShare}%` }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="flex items-start gap-3 pb-6 [@container(max-width:480px)]:flex-col [@container(max-width:480px)]:gap-4">
        <div className="relative flex flex-1 items-center gap-3 min-w-0 rounded-xl [@container(max-width:480px)]:w-full">
          {flash?.fiat}
          <span className="relative size-10 rounded-full flex items-center justify-center shrink-0" style={{ background: C.teal }}>
            <img src={fiat.mark} alt="" className="size-8 rounded-full object-cover" />
          </span>
          <div className="relative flex flex-col gap-1.5 min-w-0">
            <p className="text-[18px] font-semibold tabular-nums truncate" style={{ color: C.gray900 }}>{fiat.amount}</p>
            <p className="text-[12px]" style={{ color: C.subtle }}>{fiat.label ?? 'Fiat wallet'}</p>
          </div>
        </div>
        <div className="relative flex flex-1 items-center gap-3 min-w-0 rounded-xl [@container(max-width:480px)]:w-full">
          {flash?.stable}
          <span className="relative size-10 rounded-full flex items-center justify-center shrink-0" style={{ background: C.stable }}>
            <img src="/portal/usdt.png" alt="" className="size-8 object-cover" />
          </span>
          <div className="relative flex flex-col gap-1.5 min-w-0">
            <p className="text-[18px] font-semibold tabular-nums truncate" style={{ color: C.gray900 }}>{stable.amount}</p>
            <p className="text-[12px]" style={{ color: C.subtle }}>{stable.label ?? 'Stablecoin wallet'}</p>
          </div>
        </div>
      </div>
    </div>

    <div className="border-t px-8 py-4 flex items-center gap-6 [@container(max-width:480px)]:px-5 [@container(max-width:480px)]:gap-4" style={{ borderColor: C.divider }}>
      {ACTIONS.map((a, i) => (
        <span key={a.key} className="flex items-center gap-6 [@container(max-width:480px)]:gap-4">
          {i > 0 && <span className="h-[19px] w-px bg-[#dcdfe4]" />}
          <span
            className={`flex items-center gap-1 rounded-md -mx-1.5 px-1.5 transition-colors duration-300 ${active === a.key ? 'bg-[#e9f2ff]' : ''}`}
          >
            <img src={a.icon} alt="" className={`size-5 ${a.flip ? '-scale-y-100' : ''}`} />
            <span className="text-[14px] leading-5 font-semibold" style={{ color: C.brand }}>{a.label}</span>
          </span>
        </span>
      ))}
    </div>
  </div>
)

const ACTIVITY_ICONS = {
  payment: { bg: '#f3f0ff', icon: '/portal/file-text.svg' },             // Payment processed
  pending: { bg: '#ffecf8', icon: '/portal/arrow-counter-clockwise.svg' }, // In progress
  done: { bg: '#dcfff1', icon: '/portal/check.svg' },                     // Settlement processed
}

/** One row of the Dashboard's "Recent activities" list. Design width ~300–530px. */
export const PortalActivityRow = ({ kind, title, sub, amount }: { kind: keyof typeof ACTIVITY_ICONS; title: ReactNode; sub: ReactNode; amount?: ReactNode }) => (
  <div className="font-ui flex items-center gap-3 [&_img]:!mx-0">
    <span className="size-10 rounded-full flex items-center justify-center shrink-0" style={{ background: ACTIVITY_ICONS[kind].bg }}>
      <img src={ACTIVITY_ICONS[kind].icon} alt="" className="size-5" />
    </span>
    <div className="flex flex-1 flex-col gap-1 min-w-0 pr-3 leading-5">
      <p className="text-[14px] font-medium truncate" style={{ color: C.text }}>{title}</p>
      <p className="text-[12px] truncate" style={{ color: C.subtlest }}>{sub}</p>
    </div>
    {amount && <p className="text-[16px] font-bold leading-5 text-right whitespace-nowrap tabular-nums" style={{ color: C.text }}>{amount}</p>}
  </div>
)

/**
 * The currency picker inside the converter. The portal's design shows a globe
 * here; we show the currency's own mark instead — the flag for a fiat wallet,
 * the coin for stablecoin — so the currency reads at a glance.
 */
const Picker = ({ label, mark }: { label: string; mark: string }) => (
  <span className="flex items-center gap-1">
    <img src={mark} alt="" className="size-4 rounded-full object-cover" />
    <span className="flex items-center gap-0.5 text-[12px]" style={{ color: C.subtle }}>
      {label}
      <img src="/portal/chevron-down.svg" alt="" className="size-[22px]" />
    </span>
  </span>
)

/** The Convert panel from the Wallet overview. Design width 317px. */
export const PortalConvertCard = ({ from, fromMark, fromAmount, balance, to = 'USDT', toMark = '/portal/usdt.png', toAmount, rate }: {
  from: string
  /** The flag or coin for the currency being converted from. */
  fromMark: string
  toMark?: string
  fromAmount: ReactNode
  balance: ReactNode
  to?: string
  toAmount: ReactNode
  rate: ReactNode
}) => (
  <div className="font-ui bg-white rounded-[12px] p-6 flex flex-col gap-6 [&_img]:!mx-0">
    <p className="text-[16px] font-semibold" style={{ color: C.gray900 }}>Convert</p>
    <div className="relative flex flex-col gap-[17px]">
      <div className="rounded-[6px] p-3 flex items-center gap-1 bg-[#f1f2f4]">
        <div className="flex shrink-0 flex-col justify-between h-12">
          <p className="text-[10px]" style={{ color: C.subtlest }}>From</p>
          <Picker label={from} mark={fromMark} />
        </div>
        <div className="flex flex-1 flex-col items-end gap-1.5 min-w-0">
          <p className="text-[18px] font-bold tabular-nums truncate max-w-full" style={{ color: C.text }}>{fromAmount}</p>
          <p className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-[12px]" style={{ color: C.subtlest }}>Balance : {balance}</span>
            <span className="text-[14px] font-medium" style={{ color: C.brand }}>Max</span>
          </p>
        </div>
      </div>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-8 rounded-full bg-white border-[0.5px] border-black/10 shadow-[0px_4px_6px_-2px_rgba(10,13,18,0.03)] flex items-center justify-center z-10">
        <img src="/portal/arrows-down-up.svg" alt="" className="size-4" />
      </span>
      <div className="rounded-[6px] p-3 flex items-center gap-1 bg-[#f1f2f4]">
        <div className="flex flex-1 flex-col justify-between h-12 min-w-0">
          <p className="text-[10px]" style={{ color: C.subtlest }}>To</p>
          <Picker label={to} mark={toMark} />
        </div>
        <p className="flex-1 text-[18px] font-bold text-right tabular-nums truncate" style={{ color: C.text }}>{toAmount}</p>
      </div>
    </div>
    <p className="text-[12px] leading-[18px] text-center" style={{ color: C.subtle }}>{rate}</p>
    <span className="h-[39px] w-full rounded-full bg-[#0074e4] text-white text-[14px] font-semibold flex items-center justify-center">Preview</span>
  </div>
)

const BARS = [
  { h: 16, c: '#9dd9ee' }, { h: 24, c: '#9dd9ee' }, { h: 20, c: '#9dd9ee' }, { h: 32, c: '#2898bd' }, { h: 28, c: '#e7f9ff' },
]

/** A metric card from Transactions, like "Total volume". Design width ~230px. */
export const PortalStatCard = ({ label, value, change = '+5.2%' }: { label: string; value: ReactNode; change?: string }) => (
  <div className="font-ui bg-white border border-[rgba(199,196,216,0.3)] rounded-[12px] p-[13px] h-[86px] flex items-center justify-between">
    <div className="flex flex-col gap-1">
      <p className="text-[12px]" style={{ color: C.subtlest }}>{label}</p>
      <p className="text-[18px] font-bold tabular-nums" style={{ color: C.amount }}>{value}</p>
      <Change value={change} />
    </div>
    <div className="h-8 flex items-end gap-[2px]">
      {BARS.map((b, i) => <span key={i} className="w-1 rounded-[12px]" style={{ height: b.h, background: b.c }} />)}
    </div>
  </div>
)
