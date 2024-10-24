import { useAppDispatch, useAppSelector } from "@app/hooks"
import { ActivityDetailsContainer } from "@components/ActivityDetailsContainer/ActivityDetailsContainer"
import { deleteActivityAction } from "@features/activities/activitiesActions"
import {
  removePreset,
  setCurrentlyEditedActivity,
  setIsAddEditModalOpen,
  setIsEditing,
} from "@features/activities/activitiesSlice"
import {
  setActiveEvent,
  setIsActiveEventOpen,
} from "@features/calendarScheduler/calendarSchedulerSlice"
import { MainContentWrapper, Sidebar } from "@layouts/RootLayout/RootLayout.styled"

import { CalendarScheduler } from "./components/CalendarScheduler/CalendarScheduler"
import { DayInfo } from "./components/DayInfo/DayInfo"

export const Calendar = () => {
  const dispatch = useAppDispatch()

  const activeEvent = useAppSelector((state) => state.calendarScheduler.activeEvent)
  const isActiveEventOpen = useAppSelector((state) => state.calendarScheduler.isActiveEventOpen)

  const handleRemoveActivity = async () => {
    if (activeEvent) {
      await dispatch(deleteActivityAction(activeEvent._id))

      dispatch(setIsActiveEventOpen(false))
      dispatch(setActiveEvent(undefined))
      dispatch(removePreset(activeEvent._id))
    }
  }

  const handleClose = () => {
    dispatch(setIsActiveEventOpen(false))
    dispatch(setActiveEvent(undefined))
  }

  const handleEditActivity = () => {
    dispatch(setIsEditing(true))
    dispatch(setIsAddEditModalOpen(true))
    dispatch(setCurrentlyEditedActivity(activeEvent))
  }

  return (
    <>
      <Sidebar>
        <DayInfo />
      </Sidebar>
      <MainContentWrapper>
        <CalendarScheduler />
        <ActivityDetailsContainer
          isOpen={isActiveEventOpen}
          onClose={handleClose}
          onEdit={handleEditActivity}
          onRemove={handleRemoveActivity}
          activeActivityEvent={activeEvent}
        />
      </MainContentWrapper>
    </>
  )
}
