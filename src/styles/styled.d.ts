import {} from "styled-components"

import { lightTheme } from "./themes"

declare module "styled-components" {
  type Theme = typeof lightTheme
  export interface DefaultTheme extends Theme {}
}
