import { HeaderWrapper } from "./AuthFormHeader.styled"
import { AuthFormHeaderProps } from "./AuthFormHeader.types"
import { Button } from "../../../../../../components/Button/Button"
import { Accent, AuthActionContainer, Subtitle, Title, ViewInfoHeading } from "../../shared.styled"

export const AuthFormHeader: React.FC<AuthFormHeaderProps> = ({
  heading,
  title,
  subtitle,
  actionText,
  buttonText,
  to,
}) => {
  return (
    <HeaderWrapper>
      <ViewInfoHeading>{heading}</ViewInfoHeading>
      <Title>
        {title}
        <Accent>.</Accent>
      </Title>
      <Subtitle>
        {subtitle}
        <Accent>.</Accent>
      </Subtitle>
      <AuthActionContainer>
        <span>{actionText}</span>
        <Button buttonType='link' to={to} variant='secondary'>
          {buttonText}
        </Button>
      </AuthActionContainer>
    </HeaderWrapper>
  )
}
