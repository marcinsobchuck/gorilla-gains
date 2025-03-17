import { useAppDispatch, useAppSelector } from "@app/hooks"
import { ActivityDetailsContainer } from "@components/ActivityDetailsContainer/ActivityDetailsContainer"
import { deleteActivityAction } from "@features/activities/activitiesActions"
import {
  setActiveActivity,
  setCurrentlyEditedActivity,
  setIsActivityEventOpen,
  setIsAddEditModalOpen,
  setIsEditing,
} from "@features/activities/activitiesSlice"
import { MainContentWrapper, Sidebar } from "@layouts/RootLayout/RootLayout.styled"

import { ActivitiesInfo } from "./components/ActivitiesInfo/ActivitiesInfo"
import { ActivityList } from "./components/ActivityList/ActivityList"
import { ChartFilters } from "./components/ChartFilters/ChartFilters"
import { HistoryCalendar } from "./components/HistoryCalendar/HistoryCalendar"
import { SidebarHeader } from "./components/SidebarHeader/SidebarHeader"

export const ActivityHistory = () => {
  const dispatch = useAppDispatch()

  const activeEvent = useAppSelector((state) => state.activities.activeActivity)
  const isActivityEventOpen = useAppSelector((state) => state.activities.isActivityEventOpen)

  const handleRemoveActivity = async () => {
    if (activeEvent) {
      await dispatch(deleteActivityAction(activeEvent._id))

      dispatch(setIsActivityEventOpen(false))
      dispatch(setActiveActivity({}))
    }
  }

  const handleClose = () => {
    dispatch(setIsActivityEventOpen(false))
    dispatch(setActiveActivity({}))
  }

  const handleEditActivity = () => {
    dispatch(setIsEditing(true))
    dispatch(setIsAddEditModalOpen(true))
    dispatch(setCurrentlyEditedActivity(activeEvent))
  }
  return (
    <>
      <Sidebar>
        <SidebarHeader title='History' />
        <HistoryCalendar />
        <ChartFilters />
      </Sidebar>
      <MainContentWrapper>
        <ActivityList />
        <ActivitiesInfo />
        <ActivityDetailsContainer
          isOpen={isActivityEventOpen}
          onClose={handleClose}
          onEdit={handleEditActivity}
          onRemove={handleRemoveActivity}
          activeActivityEvent={activeEvent}
        />
      </MainContentWrapper>
    </>
  )
}
