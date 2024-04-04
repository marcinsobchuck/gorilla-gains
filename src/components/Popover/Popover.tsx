import { useState } from "react"
import { usePopper } from "react-popper"

import { useOnClickOutside } from "@hooks/useOnClickOutside"

import { PopoverContainer } from "./Popover.styled"
import { PopoverProps } from "./Popover.types"

export const Popover: React.FC<PopoverProps> = ({
  children,
  anchor,
  onClickOutside = () => {},
  placement,
  offsetAway,
}) => {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)

  useOnClickOutside({ current: popperElement }, onClickOutside)

  const { styles, attributes } = usePopper(anchor, popperElement, {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, offsetAway],
        },
      },
    ],
    placement,
  })

  return (
    <PopoverContainer ref={setPopperElement} style={styles.popper} {...attributes.popper}>
      {children}
    </PopoverContainer>
  )
}
