import { getSectionItems } from "@pages/Settings/config"

import { FieldsWrapper, SectionTitle } from "../../SettingsForm.styled"
import { Subsection } from "../Subsection/Subsection"

export const AccountInformation = () => {
  const accountInformation = getSectionItems("account-information")

  return (
    <section id={accountInformation.sectionContainerId}>
      <SectionTitle id={accountInformation.id} data-name={accountInformation.id}>
        {accountInformation.sectionTitle}
      </SectionTitle>
      <FieldsWrapper>
        {accountInformation.subSections.map((subsection) => (
          <Subsection key={subsection.id} subsectionData={subsection} />
        ))}
      </FieldsWrapper>
    </section>
  )
}
