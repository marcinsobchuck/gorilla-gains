import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import {
  NavSectionTitle,
  NavSubsectionTitle,
  SectionListItem,
  SettingsTitle,
  SubsectionList,
  SubsectionListItem,
  Wrapper,
} from "./FormNavigation.styled"
import { settingsFormData } from "../../config"

export const FormNavigation = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [currentTab, setCurrentTab] = useState("")

  const hashTab = location.hash.slice(1)

  const observerRef = useRef<IntersectionObserver | null>(null)

  const isActive = (tab: string) => {
    return tab === currentTab
  }

  const handleSectionTitleClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault()
    const sectionElement = document.querySelector(`#${sectionId}`)
    sectionElement?.scrollIntoView()

    navigate(`#${sectionId}`)
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
              navigate(`#${elementName}`, { replace: true })
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
  }, [navigate])

  useEffect(() => {
    if (hashTab) {
      const currentElement = document.querySelector(`#${hashTab}`)
      currentElement?.scrollIntoView()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        {settingsFormData.map((section) => (
          <SectionListItem key={section.id}>
            <NavSectionTitle
              href={section.href}
              onClick={(e) => handleSectionTitleClick(e, section.sectionContainerId)}
              $isActive={isActive(section.id)}
            >
              {section.sectionTitle}
            </NavSectionTitle>
            <SubsectionList>
              {section.subSections.map((subsection) => (
                <SubsectionListItem key={subsection.id}>
                  <NavSubsectionTitle href={subsection.href} $isActive={isActive(subsection.id)}>
                    {subsection.subsectionTitle}
                  </NavSubsectionTitle>
                </SubsectionListItem>
              ))}
            </SubsectionList>
          </SectionListItem>
        ))}
      </ul>
    </Wrapper>
  )
}
