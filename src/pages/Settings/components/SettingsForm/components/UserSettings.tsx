import { Goals } from "@pages/Entry/components/UserDetails/components/UserDetailsForm/steps/Goals/Goals"
import { PersonalInfo } from "@pages/Entry/components/UserDetails/components/UserDetailsForm/steps/PersonalInfo/PersonalInfo"
import { PhysicalDetails } from "@pages/Entry/components/UserDetails/components/UserDetailsForm/steps/PhysicalDetails/PhysicalDetails"

import {
  FieldsWrapper,
  SectionTitle,
  SubsectionTitle,
  SubsectionWrapper,
} from "../SettingsForm.styled"

export const UserSettings = () => {
  return (
    <section id='user-settings-section'>
      <SectionTitle id='user-settings' data-name='user-settings'>
        User settings
      </SectionTitle>
      <FieldsWrapper>
        <SubsectionWrapper id='personal-info' data-name='personal-info'>
          <SubsectionTitle>Personal info</SubsectionTitle>
          <PersonalInfo />
        </SubsectionWrapper>
        <SubsectionWrapper id='physical-details' data-name='physical-details'>
          <SubsectionTitle>Physical details</SubsectionTitle>
          <PhysicalDetails />
        </SubsectionWrapper>
        <SubsectionWrapper id='goals' data-name='goals'>
          <SubsectionTitle>Goals</SubsectionTitle>
          <Goals />
        </SubsectionWrapper>
      </FieldsWrapper>
    </section>
  )
}
