import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom"

import { CustomThemeProvider as ThemeProvider } from "@features/theme/CustomThemeProvider.tsx"

import store from "./store.ts"
import { router } from "../routing/router.tsx"
import { GlobalStyle } from "../styles/GlobalStyle.ts"

import "react-toastify/dist/ReactToastify.css"

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
