import { Placement } from "@popperjs/core"
import { ReactNode } from "react"

export interface PopoverProps {
  anchor: HTMLElement
  onClickOutside?: (event: Event) => void
  placement?: Placement
  offsetAway?: number
  children: ReactNode
}
