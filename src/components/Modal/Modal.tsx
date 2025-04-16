import { useEffect, useRef } from "react"

import { useScrollLock } from "@hooks/useLockScroll"
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

export const Modal: React.FC<ModalProps> = ({
  children,
  title,
  onCloseButtonClick,
  isVisible,
  scrollToTop = false,
  id,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, onCloseButtonClick)
  useScrollLock({ autoLock: isVisible })

  useEffect(() => {
    if (ref.current && scrollToTop) {
      ref.current.scrollTop = 0
    }
  }, [scrollToTop])

  if (!isVisible) {
    return null
  }

  return (
    <ModalOverlay>
      <ModalWrapper ref={ref} id={id}>
        <ModalHeader>
          <Heading>{title}</Heading>
          <CloseIcon name='close' width={32} height={32} onClick={onCloseButtonClick} />
        </ModalHeader>
        <ContentWrapper>{children}</ContentWrapper>
      </ModalWrapper>
    </ModalOverlay>
  )
}
