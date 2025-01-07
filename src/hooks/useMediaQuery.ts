import { useEffect, useState } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const matchMedia = window.matchMedia(query)

    function handleChange() {
      setMatches(window.matchMedia(query).matches)
    }
    handleChange()

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}
