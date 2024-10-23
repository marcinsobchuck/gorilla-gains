import { isWithinInterval, parseISO } from "date-fns"

export const isNewActivityWithinInterval = ({
  start,
  end,
  activityDate,
}: {
  start: string
  end: string
  activityDate: Date
}) => {
  return isWithinInterval(activityDate, {
    start: parseISO(start),
    end: parseISO(end),
  })
}
