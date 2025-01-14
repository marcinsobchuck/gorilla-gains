import { Goals } from "@pages/Entry/components/UserDetails/components/UserDetailsForm/steps/Goals/Goals"
import { PersonalInfo } from "@pages/Entry/components/UserDetails/components/UserDetailsForm/steps/PersonalInfo/PersonalInfo"
import { PhysicalDetails } from "@pages/Entry/components/UserDetails/components/UserDetailsForm/steps/PhysicalDetails/PhysicalDetails"

import { Credentials } from "./components/SettingsForm/components/AccountInformation/subsections/Credentials/Credentials"

export const getSectionItems = (sectionId: "account-information" | "user-settings") => {
  return settingsFormData.filter((navItem) => navItem.id === sectionId)[0]
}

export interface SubsectionData {
  id: string
  subsectionTitle: string
  href: string
  component: JSX.Element
}

export const settingsFormData = [
  {
    id: "account-information",
    sectionContainerId: "account-information-section",
    sectionTitle: "Account information",
    href: "#account-information",
    subSections: [
      {
        id: "credentials",
        subsectionTitle: "Credentials",
        href: "#credentials",
        component: <Credentials />,
      },
    ],
  },
  {
    id: "user-settings",
    sectionContainerId: "user-settings-section",
    sectionTitle: "User settings",
    href: "#user-settings",
    subSections: [
      {
        id: "personal-info",
        subsectionTitle: "Personal info",
        href: "#personal-info",
        component: <PersonalInfo />,
      },
      {
        id: "physical-details",
        subsectionTitle: "Physical details",
        href: "#physical-details",
        component: <PhysicalDetails />,
      },
      {
        id: "goals",
        subsectionTitle: "Goals",
        href: "#goals",
        component: <Goals />,
      },
    ],
  },
]
