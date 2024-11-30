import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"

import {
  NavSectionTitle,
  NavSubsectionTitle,
  SectionListItem,
  SettingsTitle,
  SubsectionList,
  SubsectionListItem,
  Wrapper,
} from "./FormNavigation.styled"

export const FormNavigation = () => {
  const location = useLocation()
  const [currentTab, setCurrentTab] = useState("")
  const [hashTab, setHashTab] = useState(location.hash.slice(1))
  const observerRef = useRef<IntersectionObserver | null>(null)
  const isActive = (tab: string) => {
    return tab === currentTab
  }

  useEffect(() => {
    const sections = document.querySelectorAll("[data-name]")

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementName = entry.target.getAttribute("data-name")
            if (elementName) {
              setCurrentTab(elementName)
            }
          }
        })
      },
      {
        rootMargin: "-50% 0px -50% 0px",
      }
    )

    sections.forEach((section) => observerRef.current?.observe(section))

    return () => {
      sections.forEach((section) => observerRef.current?.unobserve(section))
    }
  })

  useEffect(() => {
    if (hashTab) {
      const currentElement = document.querySelector(`#${hashTab}`)
      currentElement?.scrollIntoView()
      setHashTab("")
    }
  }, [hashTab])

  return (
    <Wrapper>
      <SettingsTitle>Settings</SettingsTitle>
      {/* <div
        style={{
          height: "2px",
          width: "100%",
          backgroundColor: "white",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%)`,
        }}
      /> */}
      {/* intersection indicator */}
      <ul>
        <SectionListItem>
          <NavSectionTitle href='#account-information' $isActive={isActive("account-information")}>
            Account information
          </NavSectionTitle>
          <SubsectionList>
            <SubsectionListItem>
              <NavSubsectionTitle href='#credentials' $isActive={isActive("credentials")}>
                Credentials
              </NavSubsectionTitle>
            </SubsectionListItem>
          </SubsectionList>
        </SectionListItem>

        <SectionListItem>
          <NavSectionTitle href='#user-settings' $isActive={isActive("user-settings")}>
            User settings
          </NavSectionTitle>
          <SubsectionList>
            <SubsectionListItem>
              <NavSubsectionTitle href='#personal-info' $isActive={isActive("personal-info")}>
                Personal info
              </NavSubsectionTitle>
            </SubsectionListItem>
            <SubsectionListItem>
              <NavSubsectionTitle href='#physical-details' $isActive={isActive("physical-details")}>
                Physical details
              </NavSubsectionTitle>
            </SubsectionListItem>
            <SubsectionListItem>
              <NavSubsectionTitle href='#goals' $isActive={isActive("goals")}>
                Goals
              </NavSubsectionTitle>
            </SubsectionListItem>
          </SubsectionList>
        </SectionListItem>
      </ul>
    </Wrapper>
  )
}
