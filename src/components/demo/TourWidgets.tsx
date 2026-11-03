import { useCallback, useState, type ReactNode } from 'react'
import { ChevronRight, CreditCard, Landmark, ShoppingBag, type LucideIcon } from 'lucide-react'
import FlowDemo, { DemoPanel } from './FlowDemo'

/**
 * The pay-ins in the homepage's product tour. In a store, on a website and on
 * a platform the customer ends up on the same Ezeebit checkout; what differs is
 * where they come from. Online and on a platform that is a screen of the
 * merchant's own, so those channels open on it and hand off to the checkout
 * demo. In a store it is the ePOS or the Ezeebit Pay code, which the tour shows
 * beside the demo, so that channel opens on the checkout itself. The amounts
 * are illustrative.
 */

export type Channel = 'in-store' | 'online' | 'platforms'

/** Where each channel's customer starts, as the panel's label names it. */
const FROM: Record<Channel, string> = { 'in-store': 'In store', online: 'Your checkout', platforms: 'Your cashier' }

const rand = (v: number) => `R${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const LBL = 'text-[11px] font-semibold uppercase tracking-[0.1em] text-neutral-500'
// The merchant's screens are in neutral colours with a dark button, so the
// hand-off to the checkout, in Ezeebit's blue, reads as a change of screen
const GO = 'w-full min-h-[48px] rounded-xl bg-neutral-900 px-4 text-sm font-semibold text-white hover:bg-neutral-700'

/** The panel's label: the merchant's screen, then the checkout, with the one showing picked out. Phones show only that one. */
const Handoff = ({ from, at }: { from: string; at: 'from' | 'checkout' }) => (
  <p className="flex items-center gap-1.5 whitespace-nowrap">
    <span className={at === 'from' ? 'text-neutral-900' : 'hidden sm:inline'}>{from}</span>
    <ChevronRight className="hidden sm:block w-3 h-3 shrink-0" aria-hidden="true" />
    <span className={at === 'checkout' ? 'text-neutral-900' : 'hidden sm:inline'}>Ezeebit checkout</span>
  </p>
)

/** One of the merchant's own screens, inside the panel's card. */
const MerchantScreen = ({ title, sub, children, action }: { title: string; sub: string; children: ReactNode; action?: ReactNode }) => (
  <div className="flex-1 min-h-0 flex flex-col rounded-[20px] bg-white font-ui overflow-hidden [&_img]:!mx-0">
    <div className="px-5 pt-4 pb-3 border-b border-neutral-100">
      <p className="text-[15px] font-semibold text-neutral-900">{title}</p>
      <p className="text-xs text-neutral-500">{sub}</p>
    </div>
    <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-5 p-5">{children}</div>
    {action && <div className="px-5 pb-5 pt-3 border-t border-neutral-100">{action}</div>}
  </div>
)

const OTHER_METHODS: { icon: LucideIcon; name: string }[] = [
  { icon: CreditCard, name: 'Card' },
  { icon: Landmark, name: 'Instant EFT' },
]

/** The merchant's list of ways to pay, with crypto chosen. */
const Methods = () => (
  <div>
    <p className={LBL}>Payment method</p>
    <ul className="mt-2 flex flex-col gap-2">
      {OTHER_METHODS.map(({ icon: Icon, name }) => (
        <li key={name} className="flex items-center gap-3 rounded-xl border border-neutral-200 px-3 py-2.5 text-sm text-neutral-500">
          <span className="w-4 h-4 rounded-full border border-neutral-300" />
          <Icon className="w-4 h-4" />
          {name}
        </li>
      ))}
      <li className="flex items-center gap-3 rounded-xl border border-neutral-900 ring-1 ring-neutral-900 px-3 py-2.5 text-sm font-semibold text-neutral-900">
        <span className="w-4 h-4 rounded-full border-[5px] border-neutral-900" />
        <img src="/ezeebit-icon-blue.webp" alt="" width={16} height={16} className="w-4 h-4" />
        Crypto
        <span className="ml-auto text-[11px] font-normal text-neutral-500">by Ezeebit</span>
      </li>
    </ul>
  </div>
)

/** An online store's own checkout page, with crypto among its payment methods. */
const Store = ({ onPay }: { onPay: (amount: number) => void }) => {
  const total = 1_250
  return (
    <MerchantScreen
      title="Checkout"
      sub="Your store"
      action={<button type="button" className={GO} onClick={() => onPay(total)}>Pay {rand(total)} with crypto</button>}
    >
      <div className="flex flex-col divide-y divide-neutral-100 rounded-xl border border-neutral-200 text-sm">
        <p className="flex gap-3 px-3 py-2.5"><span className="w-14 shrink-0 text-neutral-500">Contact</span>you@example.com</p>
        <p className="flex gap-3 px-3 py-2.5"><span className="w-14 shrink-0 text-neutral-500">Ship to</span>12 Bree St, Cape Town</p>
      </div>
      <div>
        <p className={LBL}>Order summary</p>
        <div className="mt-2 flex items-center gap-3 text-sm">
          <span className="w-11 h-11 shrink-0 rounded-lg bg-neutral-100 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-neutral-400" />
          </span>
          <span className="flex-1 min-w-0">
            <span className="block font-semibold text-neutral-900">Trail running shoes</span>
            <span className="block text-xs text-neutral-500">Size 9</span>
          </span>
          <span className="tabular-nums text-neutral-900">{rand(1_100)}</span>
        </div>
        <div className="mt-3 space-y-1.5 border-t border-neutral-100 pt-3 text-sm">
          <p className="flex justify-between text-neutral-500"><span>Shipping</span><span className="tabular-nums">{rand(150)}</span></p>
          <p className="flex justify-between font-semibold text-neutral-900"><span>Total</span><span className="tabular-nums">{rand(total)}</span></p>
        </div>
      </div>
      <Methods />
    </MerchantScreen>
  )
}

const AMOUNTS = [250, 500, 1_000, 2_000]

/** A platform's own deposit screen: the user picks an amount and deposits with crypto. */
const Cashier = ({ onPay }: { onPay: (amount: number) => void }) => {
  const [amount, setAmount] = useState(500)
  return (
    <MerchantScreen
      title="Deposit"
      sub="Your platform"
      action={<button type="button" className={GO} onClick={() => onPay(amount)}>Deposit {rand(amount)} with crypto</button>}
    >
      <div className="flex items-end justify-between">
        <div>
          <p className={LBL}>Balance</p>
          <p className="text-3xl font-semibold tracking-tight text-neutral-900 tabular-nums">{rand(1_240)}</p>
        </div>
        <span className="rounded-full bg-success-50 px-2 py-0.5 text-[11px] font-semibold text-success-700">Verified</span>
      </div>
      <div>
        <p className={LBL}>Amount</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {AMOUNTS.map((a) => (
            <button
              key={a}
              type="button"
              aria-pressed={amount === a}
              onClick={() => setAmount(a)}
              className={`min-h-[44px] rounded-xl border text-sm font-semibold tabular-nums ${amount === a ? 'border-neutral-900 ring-1 ring-neutral-900 text-neutral-900' : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'}`}
            >
              R{a.toLocaleString('en-US')}
            </button>
          ))}
        </div>
      </div>
      <Methods />
    </MerchantScreen>
  )
}

/**
 * One channel's pay-in. In a store the checkout opens on its keypad, where the
 * amount is keyed in. Online and on a platform the merchant's screen comes
 * first, then, once the customer chooses crypto, the same checkout with the
 * amount carried over; restarting, from the panel or the checkout's own button,
 * goes back to the merchant's screen.
 */
export function ChannelDemo({ channel }: { channel: Channel }) {
  // What the merchant's screen hands the checkout, or null while that screen is showing
  const [handoff, setHandoff] = useState<string | null>(null)
  const back = useCallback(() => setHandoff(null), [])

  if (channel === 'in-store')
    return (
      <FlowDemo
        fixed
        src="/demos/pay-in.html?start=amount"
        flow="payin"
        label={<Handoff from={FROM[channel]} at="checkout" />}
        title="Interactive demo of the Ezeebit checkout in a store"
      />
    )

  if (handoff)
    return (
      <FlowDemo
        fixed
        src={`/demos/pay-in.html?handoff&${handoff}`}
        flow="payin"
        label={<Handoff from={FROM[channel]} at="checkout" />}
        title="Interactive demo of the Ezeebit checkout"
        onRestart={back}
      />
    )

  const pay = (amount: number) => setHandoff(`amount=${amount}`)
  return (
    <DemoPanel fixed label={<Handoff from={FROM[channel]} at="from" />}>
      {channel === 'online' ? <Store onPay={pay} /> : <Cashier onPay={pay} />}
    </DemoPanel>
  )
}
