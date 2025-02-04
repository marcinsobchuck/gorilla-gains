import { SkeletonTheme as ReactSkeletonTheme, SkeletonThemeProps } from "react-loading-skeleton"
import { useTheme } from "styled-components"

export const SkeletonTheme: React.FC<SkeletonThemeProps> = ({ children, ...props }) => {
  const theme = useTheme()

  return (
    <ReactSkeletonTheme
      baseColor={theme.inputBackgroundColor}
      highlightColor={theme.secondaryOpacity}
      borderRadius={12}
      {...props}
    >
      {children}
    </ReactSkeletonTheme>
  )
}
