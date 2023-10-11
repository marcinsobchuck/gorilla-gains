import { Button } from "../../../components/Button/Button"
import {
  Accent,
  AuthActionContainer,
  FormHeaderWrapper,
  Subtitle,
  Title,
  ViewInfoHeading,
} from "../shared.styled"
import { FormHeaderProps } from "../types/FormHeader.types"

export const FormHeader: React.FC<FormHeaderProps> = ({
  heading,
  title,
  subtitle,
  actionText,
  buttonText,
  to,
}) => {
  return (
    <FormHeaderWrapper>
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
    </FormHeaderWrapper>
  )
}
