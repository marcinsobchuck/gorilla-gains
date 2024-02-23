import get from "lodash.get"

import { StyledError } from "./FormError.styled"
import { FormErrorProps } from "./FormError.types"
import { getErrorMessage } from "./utils"

export const FormError: React.FC<FormErrorProps> = ({ errors, name, className }) => {
  const isError = Boolean(get(errors, name))
  const errorMessage = getErrorMessage(errors, name)

  return (
    <StyledError $isVisible={isError} className={className}>
      {errorMessage}
    </StyledError>
  )
}
