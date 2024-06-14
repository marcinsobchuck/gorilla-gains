import { useFormContext } from "react-hook-form"

import { FormError } from "@components/FormError/FormError"
import { RadioButton } from "@components/RadioButton/RadioButton"

import { GroupTitle, RadioButtonGroupWrapper, RadiosWrapper } from "./RadioButtonGroup.styled"
import { RadioButtonGroupProps } from "./RadioButtonGroup.types"

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  items,
  groupTitle,
  name,
  buttonVariant,
  className,
  withError = true,
  direction,
  align,
  justify,
  gap,
  onChange,
}) => {
  const formContext = useFormContext()

  return (
    <RadioButtonGroupWrapper className={className}>
      {groupTitle && <GroupTitle>{groupTitle}</GroupTitle>}
      <RadiosWrapper direction={direction} align={align} justify={justify} gap={gap}>
        {items.map((item) => (
          <RadioButton
            key={`${name}-${item.value}`}
            name={name}
            labelText={item.labelText}
            value={item.value}
            variant={buttonVariant}
            onChange={onChange}
            checked={item.checked}
          />
        ))}
      </RadiosWrapper>
      {withError && formContext && <FormError errors={formContext.formState.errors} name={name} />}
    </RadioButtonGroupWrapper>
  )
}
