import notFound from "@assets/notFound.png"
import { Button } from "@components/Button/Button"
import { Routes } from "@enums/routes.enum"

import { ContentWrapper, NotFoundImage, Wrapper } from "./NotFound.styled"

export const NotFound = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <NotFoundImage src={notFound} />
        <div>
          <h1>Page not found!</h1>
          <Button buttonType='navLink' to={Routes.DASHBOARD} variant='secondary'>
            Go home
          </Button>
        </div>
      </ContentWrapper>
    </Wrapper>
  )
}
