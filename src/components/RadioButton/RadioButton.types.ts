export interface RadioButtonProps {
  labelText: string
  name: string
  value: string | number
  variant?: "tile"
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  checked?: boolean
}
