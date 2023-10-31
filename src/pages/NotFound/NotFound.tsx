import { Link } from "react-router-dom"

import notFound from "@assets/notFound.png"
import { Routes } from "@enums/routes.enum"

import { ContentWrapper, NotFoundImage, Wrapper } from "./NotFound.styled"

export const NotFound = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <NotFoundImage src={notFound} />
        <div>
          <h1>Page not found!</h1>
          <Link to={Routes.HOME}>Go home</Link>
        </div>
      </ContentWrapper>
    </Wrapper>
  )
}
