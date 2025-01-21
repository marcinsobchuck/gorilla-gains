import styled from "styled-components"

interface StyledLoaderSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  $height?: number
  $width?: number
  $activeColor?: string
  $activeColor2?: string
  $inactiveColor?: string
}

export const StyledLoaderSpinner = styled.div<StyledLoaderSpinnerProps>`
  height: ${({ $height }) => ($height ? `${$height}px` : "20px")};
  width: ${({ $width }) => ($width ? `${$width}px` : "20px")};
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0);
  border-top-color: ${({ theme, $activeColor }) => ($activeColor ? $activeColor : theme.secondary)};
  border-right-color: ${({ theme, $activeColor }) =>
    $activeColor ? $activeColor : theme.secondary};
  border-left-color: ${({ theme, $inactiveColor }) =>
    $inactiveColor ? $inactiveColor : theme.secondaryOpacity};
  border-bottom-color: ${({ theme, $inactiveColor }) =>
    $inactiveColor ? $inactiveColor : theme.secondaryOpacity};
  -webkit-animation: single2 4s infinite linear;
  animation: single2 4s infinite linear;

  @-webkit-keyframes single2 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
      border-top-color: ${({ theme, $activeColor }) =>
        $activeColor ? $activeColor : theme.secondary};
      border-right-color: ${({ theme, $activeColor }) =>
        $activeColor ? $activeColor : theme.secondary};
    }
    50% {
      border-top-color: ${({ theme, $activeColor2 }) =>
        $activeColor2 ? $activeColor2 : theme.secondaryText};
      border-right-color: ${({ theme, $activeColor2 }) =>
        $activeColor2 ? $activeColor2 : theme.secondaryText};
    }
    100% {
      -webkit-transform: rotate(720deg);
      transform: rotate(720deg);
      border-top-color: ${({ theme, $activeColor }) =>
        $activeColor ? $activeColor : theme.secondary};
      border-right-color: ${({ theme, $activeColor }) =>
        $activeColor ? $activeColor : theme.secondary};
    }
  }

  @keyframes single2 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
      border-top-color: ${({ theme, $activeColor }) =>
        $activeColor ? $activeColor : theme.secondary};
      border-right-color: ${({ theme, $activeColor }) =>
        $activeColor ? $activeColor : theme.secondary};
    }
    50% {
      border-top-color: ${({ theme, $activeColor2 }) =>
        $activeColor2 ? $activeColor2 : theme.secondaryText};
      border-right-color: ${({ theme, $activeColor2 }) =>
        $activeColor2 ? $activeColor2 : theme.secondaryText};
    }
    100% {
      -webkit-transform: rotate(720deg);
      transform: rotate(720deg);
      border-top-color: ${({ theme, $activeColor }) =>
        $activeColor ? $activeColor : theme.secondary};
      border-right-color: ${({ theme, $activeColor }) =>
        $activeColor ? $activeColor : theme.secondary};
    }
  }
`
