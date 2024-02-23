import get from "lodash.get"
import { FieldErrors, FieldValues } from "react-hook-form"

export const getErrorMessage = (errorObject: FieldErrors<FieldValues>, name: string) => {
  const error = get(errorObject, name)

  if (!error) return

  if (error?.root) {
    return error?.root?.message?.toString()
  }

  return error?.message?.toString()
}
