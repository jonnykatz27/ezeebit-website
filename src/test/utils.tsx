import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

interface WrapperOptions extends RenderOptions {
  routerProps?: MemoryRouterProps
}

function renderWithProviders(ui: ReactElement, options: WrapperOptions = {}) {
  const { routerProps, ...renderOptions } = options

  function Wrapper({ children }: { children: ReactElement }) {
    return (
      <HelmetProvider>
        <MemoryRouter {...routerProps}>{children}</MemoryRouter>
      </HelmetProvider>
    )
  }

  return render(ui, { wrapper: Wrapper as RenderOptions['wrapper'], ...renderOptions })
}

export * from '@testing-library/react'
export { renderWithProviders as render }
