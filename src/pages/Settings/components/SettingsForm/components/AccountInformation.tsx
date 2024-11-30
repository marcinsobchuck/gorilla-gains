import { Input } from "@components/Input/Input"

import { accountInformationInputsData } from "../config"
import {
  FieldsWrapper,
  SectionTitle,
  SubsectionTitle,
  SubsectionWrapper,
} from "../SettingsForm.styled"

export const AccountInformation = () => {
  return (
    <section>
      <SectionTitle id='account-information' data-name='account-information'>
        Account information
      </SectionTitle>
      <FieldsWrapper>
        <SubsectionWrapper id='credentials' data-name='credentials'>
          <SubsectionTitle>Credentials</SubsectionTitle>
          {accountInformationInputsData.map((input) => {
            const { id, label, type } = input

            return <Input key={id} id={id} label={label} type={type} />
          })}
        </SubsectionWrapper>
      </FieldsWrapper>
    </section>
  )
}
