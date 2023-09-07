import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom"

import store from "./store.ts"
import { CustomThemeProvider as ThemeProvider } from "../features/theme/CustomThemeProvider.tsx"
import { router } from "../routing/router.tsx"
import { GlobalStyle } from "../styles/GlobalStyle.ts"

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
        <GlobalStyle />
      </ThemeProvider>
    </Provider>
  )
}
