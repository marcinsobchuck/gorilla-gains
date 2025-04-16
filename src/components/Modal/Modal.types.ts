export interface ModalProps {
  id?: string
  children: React.ReactNode
  onCloseButtonClick: () => void
  title: string
  isVisible: boolean
  scrollToTop?: boolean
}
