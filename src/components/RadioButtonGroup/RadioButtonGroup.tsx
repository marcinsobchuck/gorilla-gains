import { RadioButton } from "@components/RadioButton/RadioButton"

import { GroupTitle, RadioButtonGroupWrapper, RadiosWrapper } from "./RadioButtonGroup.styled"
import { RadioButtonGroupProps } from "./RadioButtonGroup.types"

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  items,
  groupTitle,
  name,
  buttonVariant,
  className,
}) => {
  return (
    <RadioButtonGroupWrapper className={className}>
      {groupTitle && <GroupTitle>{groupTitle}</GroupTitle>}
      <RadiosWrapper>
        {items.map((item) => (
          <RadioButton
            key={`${name}-${item.value}`}
            name={name}
            labelText={item.labelText}
            value={item.value}
            variant={buttonVariant}
          />
        ))}
      </RadiosWrapper>
    </RadioButtonGroupWrapper>
  )
}
