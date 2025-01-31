import React from "react"
import styled from "styled-components"

const StyledIframe = styled.iframe`
  aspect-ratio: 16 / 9;
  height: 320px;
  width: 60%;
  max-width: 500px;
  border-radius: 9px;
  border: none;
`

interface YoutubeVideoEmbedProps {
  title: string
  url: string
}

export const YoutubeVideoEmbed: React.FC<YoutubeVideoEmbedProps> = ({ title, url }) => {
  const src = url.replace("watch?v=", "embed/")

  return (
    <StyledIframe
      src={src}
      title={title}
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      referrerPolicy='strict-origin-when-cross-origin'
      allowFullScreen
    ></StyledIframe>
  )
}
