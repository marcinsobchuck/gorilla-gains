import { ActivityEvent } from "@features/types/types"

export interface ActivityDetailsContainerProps {
  onClose: () => void
  onEdit: () => void
  onRemove: () => void
  activeActivityEvent?: ActivityEvent
  isOpen: boolean
}
