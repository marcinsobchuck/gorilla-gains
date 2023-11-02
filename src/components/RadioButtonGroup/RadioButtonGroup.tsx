import { RadioButton } from "@components/RadioButton/RadioButton"

import { GroupTitle, RadioButtonGroupWrapper, RadiosWrapper } from "./RadioButtonGroup.styled"
import { RadioButtonGroupProps } from "./RadioButtonGroup.types"

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ items, groupTitle, name }) => {
  return (
    <RadioButtonGroupWrapper>
      <GroupTitle>{groupTitle}</GroupTitle>
      <RadiosWrapper>
        {items.map((item) => (
          <RadioButton key={item.value} name={name} labelText={item.labelText} value={item.value} />
        ))}
      </RadiosWrapper>
    </RadioButtonGroupWrapper>
  )
}
