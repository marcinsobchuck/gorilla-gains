import { useAppSelector } from "@app/hooks"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { LoaderSpinner } from "@components/LoaderSpinner/LoaderSpinner"
import { RequestStatuses } from "@enums/requestStatuses.enum"

import { SidebarHeaderProps } from "./SidebarHeader.types"

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ title }) => {
  const eventsStatus = useAppSelector((state) => state.historyCalendar.eventsStatus)

  return (
    <FlexContainer justify='space-between'>
      <h1>{title}</h1>
      {eventsStatus === RequestStatuses.LOADING && <LoaderSpinner />}
    </FlexContainer>
  )
}
