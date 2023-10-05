import jwt_decode from "jwt-decode"
import { useEffect, useState } from "react"

import { useAppSelector } from "../app/hooks"

interface DecodedToken {
  email: string
  name: string
}

export const useJwtDecoded = () => {
  const [value, setValue] = useState<DecodedToken>()
  const token = useAppSelector((state) => state.auth.accessToken)

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode<DecodedToken>(token)
      setValue(decoded)
    }
  }, [token])

  return value
}
