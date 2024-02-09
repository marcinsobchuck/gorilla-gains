import { z } from "zod"

const strengthEnduranceActivityTypeSchema = z.object({
  activityType: z.object({
    category: z.string(),
    label: z.string(),
    value: z.string(),
  }),
  date: z.date({ required_error: "Date is required" }),
})

const otherActivityTypeFieldsSchema = z
  .object({
    activityType: z.object({
      category: z.string(),
      label: z.string(),
      value: z.string(),
    }),
    duration: z
      .object({
        hours: z.coerce.number(),
        minutes: z.coerce.number(),
        seconds: z.coerce.number(),
      })
      .superRefine((data, ctx) => {
        if (!data.hours && !data.minutes && !data.seconds) {
          const fields = ["hours", "minutes", "seconds"]
          fields.forEach((field) => {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `At least one`,
              path: [field],
            })
          })
        }
      }),
    distance: z.coerce.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.activityType.category === "other") {
      if (data.distance === undefined || data.distance === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "This field is required bruv",
          path: ["distance"],
        })
      }
    }
  })

export const addActivityFormSchema = z.intersection(
  otherActivityTypeFieldsSchema,
  strengthEnduranceActivityTypeSchema
)
