import { Placement } from "@popperjs/core"
import { ReactNode } from "react"

export interface PopoverProps {
  anchor: HTMLElement
  onClickOutside?: (event: Event) => void
  placement?: Placement
  offsetAway?: number
  children: ReactNode
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}
