import { render } from "@testing-library/react"
import type { RenderOptions } from "@testing-library/react"
import React, { PropsWithChildren } from "react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"

import { AppStore, RootState, setupStore } from "@app/store"
import { CustomThemeProvider as ThemeProvider } from "@features/theme/CustomThemeProvider.tsx"

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

export const renderWithProviders = (
  ui: React.ReactElement,
  { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: PropsWithChildren): JSX.Element => {
    return (
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>{children}</MemoryRouter>
        </ThemeProvider>
      </Provider>
    )
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
