import { useState } from "react"
import { useTheme } from "styled-components"

import { Icon } from "@components/Icon/Icon"
import { Popover } from "@components/Popover/Popover"

import { LabelText, TooltipContainer, ValueText, Wrapper } from "./BasicCard.styled"
import { BasicCardProps } from "./BasicCard.types"

const isValueNegative = (value: number) => (value < 0 ? true : false)

export const BasicCard: React.FC<BasicCardProps> = ({
  label,
  value,
  tooltipInfo,
  source,
  withTooltip = true,
}) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)

  const theme = useTheme()

  return (
    <Wrapper direction='column' align='center' justify='center'>
      <ValueText $isNegative={isValueNegative(+value)}>{value}</ValueText>
      <LabelText>{label}</LabelText>

      {withTooltip && (
        <div ref={setAnchor}>
          <Icon
            name='info'
            height={18}
            width={18}
            color={theme.primaryMedium}
            isInteractive
            onMouseEnter={() => setIsTooltipOpen(true)}
            onMouseLeave={() => setIsTooltipOpen(false)}
          />
        </div>
      )}

      {anchor && isTooltipOpen && withTooltip && (
        <Popover
          anchor={anchor}
          onMouseEnter={() => setIsTooltipOpen(true)}
          onMouseLeave={() => setIsTooltipOpen(false)}
        >
          <TooltipContainer>
            <h3>{label}</h3>
            <p>{tooltipInfo}</p>
            <a href={source} rel='noopener noreferrer' target='_blank'>
              Source
            </a>
          </TooltipContainer>
        </Popover>
      )}
    </Wrapper>
  )
}
