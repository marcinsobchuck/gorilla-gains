import { useState } from "react"
import { usePopper } from "react-popper"

import { useOnClickOutside } from "@hooks/useOnClickOutside"

import { PopoverArrow, PopoverContainer } from "./Popover.styled"
import { PopoverProps } from "./Popover.types"

export const Popover: React.FC<PopoverProps> = ({
  children,
  anchor,
  onClickOutside = () => {},
  placement,
  offsetAway,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)

  useOnClickOutside({ current: popperElement }, onClickOutside)

  const { styles, attributes } = usePopper(anchor, popperElement, {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, offsetAway],
        },
      },
      {
        name: "flip",
        options: {
          fallbackPlacements: ["top-start"],
        },
      },
      {
        name: "arrow",
        options: {
          element: arrowElement,
        },
      },
    ],
    placement,
  })

  return (
    <PopoverContainer
      ref={setPopperElement}
      style={styles.popper}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...attributes.popper}
    >
      <PopoverArrow ref={setArrowElement} />

      {children}
    </PopoverContainer>
  )
}
