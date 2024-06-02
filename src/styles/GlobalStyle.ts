import styled, { createGlobalStyle } from "styled-components"

const globalStyle = { createGlobalStyle }

export const Background = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  transition: background-color 0.3s;
`

export const GlobalStyle = globalStyle.createGlobalStyle`
  :root {
    --header-height: 84px;
    --activity-list-container-height: 46%;
    --sidebar-width-m: 31%;
    --sidebar-width-l: 25%;
    --menu-width-s: 70%;
    --menu-width-m: 5%;
    --menu-width-l: 14%;

    --toastify-color-light: ${({ theme }) => theme.backgroundColor};
    --toastify-text-color-light: ${({ theme }) => theme.primary};
    --toastify-color-progress-light: ${({ theme }) => theme.secondary}
  }

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

  
`
