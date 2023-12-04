export interface Option {
  value: string
  label: string
}

export interface Props {
  options: Option[]
  labelText?: string
  name: string
}

export type SelectProps = Props & React.HTMLAttributes<HTMLDivElement>
