type Direction = "row" | "column"

type Justify =
  | "center"
  | "space-between"
  | "space-around"
  | "flex-end"
  | "flex-start"
  | "space-evenly"

type Align = "center" | "flex-end" | "flex-start" | "stretch"

export interface FlexContainerProps {
  direction?: Direction
  justify?: Justify
  align?: Align
}
