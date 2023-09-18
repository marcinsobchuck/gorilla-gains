import { createGlobalStyle } from "styled-components"

const styled = { createGlobalStyle }

export const GlobalStyle = styled.createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
    text-decoration: none;
    list-style: none;
    outline: none;
    font-family: "Montserrat", sans-serif;
    color: ${({ theme }) => theme.primary};
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  button {
    border: none;
    cursor: pointer;
  }

  body {
    background-color: ${({ theme }) => theme.backgroundColor};
    transition: background-color 0.3s;
  }
`
