import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { Routes } from "@enums/routes.enum"
import { verifyPasswordResetTokenAction } from "@features/auth/authActions"

export const useCountdown = (start: boolean, initialCount: number, onCountdownEnd?: () => void) => {
  const [count, setCount] = useState(initialCount)

  useEffect(() => {
    if (!start) return

    if (count <= 0) {
      onCountdownEnd && onCountdownEnd()
      return
    }

    const interval = setInterval(() => {
      setCount((count) => count - 1)
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [count, onCountdownEnd, start])

  return count
}

export const useIsPasswordResetTokenValid = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")
  const isTokenValid = useAppSelector((state) => state.auth.isPasswordResetTokenValid)
  const error = useAppSelector((state) => state.auth.verifyPasswordResetTokenError)

  useEffect(() => {
    const handleTokenValidation = async () => {
      if (!token) {
        navigate(Routes.LOGIN)
        return
      }

      if (!isTokenValid) {
        await dispatch(verifyPasswordResetTokenAction(token))
      }
    }

    handleTokenValidation()
  }, [dispatch, isTokenValid, navigate, token])

  return { isTokenValid, error, token }
}
