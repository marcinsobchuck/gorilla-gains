import { useRef } from "react"

import { useOnClickOutside } from "@hooks/useOnClickOutside"

import {
  CloseIcon,
  ContentWrapper,
  Heading,
  ModalHeader,
  ModalOverlay,
  ModalWrapper,
} from "./Modal.styled"
import { ModalProps } from "./Modal.types"

export const Modal: React.FC<ModalProps> = ({ children, title, onCloseButtonClick, isVisible }) => {
  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, onCloseButtonClick)

  if (!isVisible) {
    return null
  }

  return (
    <ModalOverlay>
      <ModalWrapper ref={ref}>
        <ModalHeader>
          <Heading>{title}</Heading>
          <CloseIcon name='close' width={32} height={32} onClick={onCloseButtonClick} />
        </ModalHeader>
        <ContentWrapper>{children}</ContentWrapper>
      </ModalWrapper>
    </ModalOverlay>
  )
}
