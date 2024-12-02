export const getSectionItems = (sectionId: "account-information" | "user-settings") => {
  return navigationItems.filter((navItem) => navItem.id === sectionId)[0]
}

export const navigationItems = [
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
      },
      {
        id: "physical-details",
        subsectionTitle: "Physical details",
        href: "#physical-details",
      },
      {
        id: "goals",
        subsectionTitle: "Goals",
        href: "#goals",
      },
    ],
  },
]
