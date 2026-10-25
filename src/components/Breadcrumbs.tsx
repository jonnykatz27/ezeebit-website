import { Link } from 'react-router-dom'
import type { Crumb } from '../lib/schema'

type BreadcrumbNavProps = {
  items: Crumb[]
  centered?: boolean
}

const BreadcrumbNav = ({ items, centered = false }: BreadcrumbNavProps) => (
  <nav aria-label="Breadcrumb" className={centered ? 'mb-4 flex justify-center' : 'mb-4'}>
    <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-neutral-500 ${centered ? 'justify-center' : ''}`}>
      <li>
        <Link to="/" className="hover:text-primary-600">Home</Link>
      </li>
      {items.map((item, index) => {
        const last = index === items.length - 1
        return (
          <li key={`${item.path}-${item.name}`} className="flex items-center gap-2 min-w-0">
            <span aria-hidden="true" className="text-neutral-300">/</span>
            {last ? (
              <span className="text-neutral-800 truncate max-w-[16rem] sm:max-w-md" aria-current="page">{item.name}</span>
            ) : (
              <Link to={item.path} className="hover:text-primary-600">{item.name}</Link>
            )}
          </li>
        )
      })}
    </ol>
  </nav>
)

export default BreadcrumbNav
