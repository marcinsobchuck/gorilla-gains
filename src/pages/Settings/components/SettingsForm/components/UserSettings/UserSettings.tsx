import { getSectionItems } from "@pages/Settings/config"

import { FieldsWrapper, SectionTitle } from "../../SettingsForm.styled"
import { Subsection } from "../Subsection/Subsection"

export const UserSettings = () => {
  const userSettings = getSectionItems("user-settings")

  return (
    <section id={userSettings.sectionContainerId}>
      <SectionTitle id={userSettings.id} data-name={userSettings.id}>
        {userSettings.sectionTitle}
      </SectionTitle>
      <FieldsWrapper>
        {userSettings.subSections.map((subsection) => (
          <Subsection key={subsection.id} subsectionData={subsection} />
        ))}
      </FieldsWrapper>
    </section>
  )
}
