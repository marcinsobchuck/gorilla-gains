import { SubsectionTitle, SubsectionWrapper } from "./Subsection.styled"
import { SubsectionProps } from "./Subsection.types"

export const Subsection: React.FC<SubsectionProps> = ({ subsectionData }) => {
  return (
    <SubsectionWrapper key={subsectionData.id} id={subsectionData.id} data-name={subsectionData.id}>
      <SubsectionTitle>{subsectionData.subsectionTitle}</SubsectionTitle>
      {subsectionData.component}
    </SubsectionWrapper>
  )
}
