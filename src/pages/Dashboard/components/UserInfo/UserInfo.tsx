import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { getCurrentUserInfoAction } from "@features/user/userActions"

export const UserInfo = () => {
  const userInfo = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const { name } = { ...userInfo.data }

  useEffect(() => {
    if (!userInfo.data) {
      dispatch(getCurrentUserInfoAction())
    }
  }, [])

  return <div>{name}</div>
}
