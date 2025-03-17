import { AsyncOption } from "@components/SelectAsync/SelectAsync.types"

export interface PresetsViewProps {
  setSelectValue: React.Dispatch<React.SetStateAction<AsyncOption | null>>
}
