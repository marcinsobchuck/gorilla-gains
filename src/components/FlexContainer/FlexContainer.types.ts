export type Direction = "row" | "column"

export type Justify =
  | "center"
  | "space-between"
  | "space-around"
  | "flex-end"
  | "flex-start"
  | "space-evenly"

export type Align = "center" | "flex-end" | "flex-start" | "stretch"

export interface FlexContainerProps {
  direction?: Direction
  justify?: Justify
  align?: Align
  gap?: number
}
