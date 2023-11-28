export interface ModalProps {
  children: React.ReactNode
  onCloseButtonClick: () => void
  title: string
  isVisible: boolean
}
