interface Set {
  reps: number
  load: number
}

interface Exercise {
  exercise: string
  sets: Set[]
}

export interface Activity {
  type: string
  exercises: Exercise[]
  date: Date
  duration: number
}
