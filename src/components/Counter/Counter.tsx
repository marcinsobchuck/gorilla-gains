import { useFormContext } from "react-hook-form"

import { CountInput, CounterWrapper, StyledButton, StyledLabel, Wrapper } from "./Counter.styled"
import { CounterProps } from "./Counter.types"

export const Counter: React.FC<CounterProps> = ({ id, label, minValue = 1, maxValue = 20 }) => {
  const { register, setValue, watch } = useFormContext()
  const count = watch(id)

  return (
    <Wrapper>
      {label && <StyledLabel>{label}</StyledLabel>}
      <CounterWrapper>
        <StyledButton
          buttonType='button'
          variant='tertiary'
          disabled={count === minValue}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            setValue(id, count - 1)
          }}
        >
          -
        </StyledButton>

        <CountInput
          type='number'
          {...register(id, {
            valueAsNumber: true,
            onChange: (e) => {
              const value = parseInt(e.currentTarget.value)
              return value <= minValue
                ? setValue(id, minValue)
                : value > maxValue
                  ? setValue(id, maxValue)
                  : setValue(id, value)
            },
            onBlur: (e) => {
              const value = parseInt(e.currentTarget.value)
              return isNaN(value) && setValue(id, minValue)
            },
          })}
        />
        <StyledButton
          buttonType='button'
          variant='tertiary'
          disabled={count === maxValue}
          onClick={(e) => {
            e.preventDefault()
            setValue(id, count + 1)
          }}
        >
          +
        </StyledButton>
      </CounterWrapper>
    </Wrapper>
  )
}
