import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { format, parseISO } from "date-fns"
import { toast } from "react-toastify"

import { Activity } from "@api/types/activitiesService.types"
import { RequestStatuses } from "@enums/requestStatuses.enum"

import {
  createActivityAction,
  deleteActivityAction,
  editActivityAction,
  getActivitiesForCurrentUserAction,
  getActivitiesForSelectedDate,
} from "./activitiesActions"
import { InitialState } from "./activitiesSlice.types"

const initialState: InitialState = {
  activitiesStatus: RequestStatuses.IDLE,
  createActivityStatus: RequestStatuses.IDLE,
  deleteActivityStatus: RequestStatuses.IDLE,
  editActivityStatus: RequestStatuses.IDLE,
  limit: 3,
  hasMore: true,
  isEditing: false,
  isAddEditModalOpen: false,
  shouldFetchActivities: true,
  activitiesData: [],
  selectedDate: "",
  currentlyProcessedActivityId: null,
  isActivityDetailsOpen: false,
}

export const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    setHasMore(state, action) {
      state.hasMore = action.payload
    },
    setActivitiesData(state, action) {
      state.activitiesData = action.payload
    },
    setActiveActivity(
      state,
      action: PayloadAction<{ activityId?: string; activities?: Activity[] }>
    ) {
      if (!action.payload.activityId) {
        state.activeActivity = undefined
      } else {
        state.activeActivity = action.payload.activities?.find(
          (activity) => activity._id === action.payload.activityId
        )
      }
    },
    setIsActivityDetailsOpen(state, action) {
      state.isActivityDetailsOpen = action.payload
    },
    setSelectedDate(state, action) {
      state.selectedDate = action.payload
    },
    resetActivitiesData(state) {
      state.activitiesData = []
    },
    setShouldFetchActivities(state, action) {
      state.shouldFetchActivities = action.payload
    },
    setIsEditing(state, action) {
      state.isEditing = action.payload
    },
    setIsAddEditModalOpen(state, action) {
      state.isAddEditModalOpen = action.payload
    },
    setCurrentlyEditedActivity(state, action) {
      state.currentlyEditedActivity = action.payload
    },
    setCurrentlyProcessedActivityId(state, action) {
      state.currentlyProcessedActivityId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getActivitiesForCurrentUserAction.pending, (state) => {
      state.activitiesStatus = RequestStatuses.LOADING
    })
    builder.addCase(getActivitiesForCurrentUserAction.fulfilled, (state, action) => {
      state.activitiesData = [...state.activitiesData, ...action.payload]
      state.hasMore = action.payload.length < state.limit ? false : true
      state.activitiesStatus = RequestStatuses.SUCCESS
    })
    builder.addCase(getActivitiesForCurrentUserAction.rejected, (state, action) => {
      state.activitiesStatus = RequestStatuses.FAILED
      if (action.payload) {
        state.activitiesError = action.payload
      }
    })

    builder.addCase(getActivitiesForSelectedDate.pending, (state) => {
      state.activitiesStatus = RequestStatuses.LOADING
    })
    builder.addCase(getActivitiesForSelectedDate.fulfilled, (state, action) => {
      state.activitiesData = [...action.payload]
      state.activitiesStatus = RequestStatuses.SUCCESS
    })
    builder.addCase(getActivitiesForSelectedDate.rejected, (state, action) => {
      state.activitiesStatus = RequestStatuses.FAILED
      if (action.payload) {
        state.activitiesError = action.payload
      }
    })
    builder.addCase(createActivityAction.pending, (state) => {
      state.createActivityStatus = RequestStatuses.LOADING
    })
    builder.addCase(createActivityAction.fulfilled, (state, action) => {
      if (action.payload) {
        const isNewActivityInThePast = new Date(action.payload.date) <= new Date()

        state.createActivityStatus = RequestStatuses.SUCCESS
        state.isAddEditModalOpen = false
        const newActivityDate = format(new Date(action.payload.date), "yyyy-MM-dd")

        if (state.selectedDate === newActivityDate && isNewActivityInThePast) {
          state.activitiesData = [action.payload, ...state.activitiesData]
        }
        toast("Succesfully created activity")
      }
    })
    builder.addCase(createActivityAction.rejected, (state, action) => {
      state.createActivityStatus = RequestStatuses.FAILED
      if (action.payload) {
        state.createActivityError = action.payload
        toast("There was a problem creating activity")
      }
    })

    builder.addCase(deleteActivityAction.pending, (state) => {
      state.deleteActivityStatus = RequestStatuses.LOADING
    })
    builder.addCase(deleteActivityAction.fulfilled, (state, action) => {
      state.isActivityDetailsOpen = false
      state.deleteActivityStatus = RequestStatuses.SUCCESS
      state.activitiesData = state.activitiesData?.filter(
        (activity) => activity._id !== action.payload._id
      )
      state.currentlyProcessedActivityId = null
      toast("Succesfully deleted activity")
    })
    builder.addCase(deleteActivityAction.rejected, (state, action) => {
      state.deleteActivityStatus = RequestStatuses.FAILED
      if (action.payload) {
        state.deleteActivityError = action.payload
        toast("There was a problem deleting activity")
      }
    })

    builder.addCase(editActivityAction.pending, (state) => {
      state.editActivityStatus = RequestStatuses.LOADING
    })
    builder.addCase(editActivityAction.fulfilled, (state, action) => {
      const isEditedActivityInThePast = new Date(action.payload.date) <= new Date()
      const newDate = format(parseISO(action.payload.date), "yyyy-MM-dd")

      if (state.isEditing) {
        state.isAddEditModalOpen = false
        state.isEditing = false

        if (!isEditedActivityInThePast || state.selectedDate !== newDate) {
          state.activitiesData = state.activitiesData?.filter(
            (activity) => activity._id !== action.payload._id
          )
        }
      }
      state.editActivityStatus = RequestStatuses.SUCCESS
      state.currentlyProcessedActivityId = null
      state.isActivityDetailsOpen = false

      if (state.selectedDate === newDate && isEditedActivityInThePast) {
        state.activitiesData = state.activitiesData.map((activity) =>
          activity._id === action.payload._id ? action.payload : activity
        )
      }

      toast("Succesfully edited activity")
    })
    builder.addCase(editActivityAction.rejected, (state, action) => {
      state.editActivityStatus = RequestStatuses.FAILED
      if (action.payload) {
        state.editActivityError = action.payload
        toast("There was a problem editing activity")
      }
    })
  },
})

export default activitiesSlice.reducer
export const {
  setHasMore,
  resetActivitiesData,
  setIsEditing,
  setShouldFetchActivities,
  setIsAddEditModalOpen,
  setCurrentlyEditedActivity,
  setCurrentlyProcessedActivityId,
  setSelectedDate,
  setActiveActivity,
  setActivitiesData,
  setIsActivityDetailsOpen,
} = activitiesSlice.actions
