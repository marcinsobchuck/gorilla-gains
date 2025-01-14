import { EventInput } from "@fullcalendar/core/index.js"

import { Activity } from "@api/types/activitiesService.types"

export type ActivityEvent = Activity & Omit<EventInput, "date" | "title">
