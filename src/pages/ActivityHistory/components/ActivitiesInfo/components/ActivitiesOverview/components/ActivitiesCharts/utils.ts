/* eslint-disable @typescript-eslint/no-explicit-any */
import { intervalToDuration } from "date-fns"
import { ValueType } from "recharts/types/component/DefaultTooltipContent"

import { Activity, ExerciseSet, ResponseExercise } from "@api/types/activitiesService.types"
import { Option } from "@components/Select/Select.types"
import { YAxis } from "@features/activitiesOverview/activitiesOverview.types"

const calculate1RM = (set: ExerciseSet) => {
  if (!set.load || !set.reps) {
    return 0
  }

  const oneRepMax = set.load * (1 + set.reps / 30)

  return oneRepMax
}

const getYAxisValue = (data: ResponseExercise[], key: YAxis) => {
  switch (key) {
    case "distance": {
      const totalDistance = data.reduce((sum, exercise) => {
        const exerciseDistance = exercise.sets.reduce((setSum, set) => {
          return setSum + (set.distance || 0)
        }, 0)

        return sum + exerciseDistance
      }, 0)
      return totalDistance
    }
    case "duration": {
      const totalDuration = data.reduce((sum, exercise) => {
        const exerciseDuration = exercise.sets.reduce(
          (acc, currSet) =>
            acc +
            (currSet.break || 0) +
            (currSet.duration?.seconds || 0) +
            (currSet.duration?.minutes || 0) * 60 +
            (currSet.duration?.hours || 0) * 60 * 60,
          0
        )
        return sum + exerciseDuration
      }, 0)

      return totalDuration
    }
    case "load": {
      const totalLoad = data.reduce((sum, exercise) => {
        const exerciseLoad = exercise.sets.reduce((setSum, set) => {
          return setSum + (set.load || 0) * (set.reps || 1)
        }, 0)
        return sum + exerciseLoad
      }, 0)
      return totalLoad
    }
    case "reps": {
      const totalReps = data.reduce((sum, exercise) => {
        const exerciseReps = exercise.sets.reduce((setSum, set) => {
          return setSum + (set.reps || 0)
        }, 0)
        return sum + exerciseReps
      }, 0)
      return totalReps
    }
    case "1RM": {
      const oneRepExercisesMaxes = data.flatMap((exercise) => {
        const oneRepSetsMaxes = exercise.sets.map((set) => {
          return calculate1RM(set)
        })
        return Math.max(...oneRepSetsMaxes)
      })

      const oneRepMax = Math.max(...oneRepExercisesMaxes)

      return oneRepMax
    }
    default: {
      return 0
    }
  }
}

export const transformActivitiesIntoChartData = (
  data: Activity[],
  exerciseId: string,
  yAxisKey: YAxis
) => {
  const chartData = data
    .map((activity) => {
      const filteredExercises = activity.exercises.filter(
        (exercise) => exercise.exercise._id === exerciseId
      )

      if (filteredExercises.length === 0 || getYAxisValue(filteredExercises, yAxisKey) === 0) {
        return null
      }

      const shouldAddLoad =
        getYAxisValue(filteredExercises, "load") > 0 && yAxisKey !== "load" && yAxisKey !== "1RM"

      return {
        [yAxisKey]: getYAxisValue(filteredExercises, yAxisKey),
        date: new Date(activity.date).getTime(),
        activityId: activity._id,
        ...(shouldAddLoad && { load: getYAxisValue(filteredExercises, "load") }),
      }
    })
    .filter((item) => item !== null)
    .sort((a, b) => a!.date - b!.date)

  return chartData
}

export const getAvailableChartMetrics = (data: Activity[], exerciseId: string) => {
  const keys = new Set<string>()

  data.forEach((activity) => {
    activity.exercises.forEach((exercise) => {
      if (exercise.exercise._id === exerciseId) {
        exercise.sets.forEach((set) => {
          Object.keys(set).forEach((key) => keys.add(key))
        })
      }
    })
  })

  const availableMetrics = Array.from(keys).filter(
    (key) => key !== "break" && key !== "repeatCount"
  )

  if (availableMetrics.includes("load")) {
    return [...availableMetrics, "1RM"]
  }

  return availableMetrics
}

export const getAvailableChartOptions = (availableMetrics: string[]): Option[] => {
  const options = availableMetrics.map((key) => {
    return {
      value: key,
      label: `${key}/date`,
    }
  })

  return options
}

export const getFormattedDuration = (value: number) => {
  const duration = intervalToDuration({
    start: 0,
    end: value * 1000,
  })

  if (duration.hours) {
    const hours = Math.ceil(value / 3600).toFixed()
    return {
      duration: hours,
      unit: "h",
    }
  }
  if (!duration.hours && duration.minutes) {
    const minutes = Math.ceil((value / 3600) * 60).toFixed()
    return {
      duration: minutes,
      unit: "min",
    }
  } else {
    const seconds = Math.ceil((value / 3600) * 60 * 60).toFixed()
    return {
      duration: seconds,
      unit: "s",
    }
  }
}

export const YAxisTickFormatter = (value: any, yAxis: YAxis) => {
  if (yAxis === "duration") {
    return getFormattedDuration(value).duration
  }

  return value
}

interface ChartDataItem {
  activityId: string
  date: number
  distance?: number
  duration?: number
  load?: number
  reps?: number
}

export const getExerciseUnit = (data: (ChartDataItem | null)[], yAxis: YAxis) => {
  if (yAxis === "duration") {
    const values = data.filter((item) => item !== null).map((item) => item.duration as number)
    if (values.length === 0) {
      return
    }

    const highestValue = Math.max(...values)
    return getFormattedDuration(highestValue).unit
  }
  if (yAxis === "distance") {
    return "km"
  }

  if (yAxis === "load" || yAxis === "1RM") {
    return "kg"
  }

  if (yAxis === "reps") {
    return "reps"
  }
}

type DurationValue = Record<string, { value?: number; unit: string }>
export type TooltipValue = ValueType | DurationValue

export const getTooltipValue = (value: ValueType, yAxis: YAxis): TooltipValue => {
  if (yAxis === "duration" && typeof value === "number") {
    const duration = intervalToDuration({
      start: 0,
      end: value * 1000,
    })

    return {
      days: {
        value: duration.days,
        unit: "d",
      },
      hours: {
        value: duration.hours,
        unit: "h",
      },
      minutes: { value: duration.minutes, unit: "m" },
      seconds: { value: duration.seconds, unit: "s" },
    }
  }

  if (typeof value === "number") {
    return Number.isInteger(value) ? value : value.toFixed(2)
  }

  return value
}
