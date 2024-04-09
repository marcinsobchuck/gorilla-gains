import { AsyncOption } from "@components/SelectAsync/SelectAsync.types"

export interface PresetsViewProps {
  setIsPresetsVisible: React.Dispatch<React.SetStateAction<boolean>>
  setSelectValue: React.Dispatch<React.SetStateAction<AsyncOption | null>>
}
