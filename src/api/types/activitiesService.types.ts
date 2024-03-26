interface Set {
  reps?: number
  load?: number
  duration?: Duration
  distance?: number
  break?: number
}

export interface Duration {
  hours?: number
  minutes?: number
  seconds?: number
}

interface Exercise {
  exercise: string
  sets: Set[]
  withBreaks: boolean
}

export interface CreateActivityData {
  title: string
  type: string
  exercises?: Exercise[]
  date: Date
  notes?: string
  warmup: boolean
  repeatExercisesCount?: number
}
