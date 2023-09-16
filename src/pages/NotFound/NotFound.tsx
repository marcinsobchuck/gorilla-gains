import { Link } from "react-router-dom"

import { ContentWrapper, NotFoundImage, Wrapper } from "./NotFound.styled"
import notFound from "../../assets/notFound.png"

export const NotFound = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <NotFoundImage src={notFound} />
        <div>
          <h1>Page not found!</h1>
          <Link to='/'>Go home</Link>
        </div>
      </ContentWrapper>
    </Wrapper>
  )
}
