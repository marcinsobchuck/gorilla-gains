import { StyledLoaderSpinner } from "./LoaderSpinner.styled"
import { LoaderSpinnerProps } from "./LoaderSpinner.types"

export const LoaderSpinner: React.FC<LoaderSpinnerProps> = ({
  activeColor,
  activeColor2,
  height,
  inactiveColor,
  width,
  ...rest
}) => {
  return (
    <StyledLoaderSpinner
      $activeColor={activeColor}
      $activeColor2={activeColor2}
      $inactiveColor={inactiveColor}
      $height={height}
      $width={width}
      {...rest}
    />
  )
}
