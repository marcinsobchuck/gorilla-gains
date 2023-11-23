import "react-loading-skeleton/dist/skeleton.css"

import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { getCurrentUserInfoAction } from "@features/user/userActions"

import { UserInfoItem } from "./components/UserInfoItem"
import { UserInfoItems, UserInfoTitle, Wrapper } from "./UserInfo.styled"

export const UserInfo = () => {
  const userInfo = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const { name, surname, age, weight, desiredWeight, height, gender, activityLevel } = {
    ...userInfo.data,
  }

  const userItems = [
    { label: "Name", value: name },
    { label: "Surname", value: surname || "-" },
    { label: "Age", value: age },
    { label: "Gender", value: gender },
    { label: "Height", value: height },
    { label: "Weight", value: weight },
    { label: "Desired weight", value: desiredWeight },
    { label: "Activity level", value: activityLevel },
  ]

  useEffect(() => {
    if (!userInfo.data) {
      dispatch(getCurrentUserInfoAction())
    }
  }, [dispatch, userInfo.data])

  return (
    <Wrapper>
      <UserInfoTitle>Basic info</UserInfoTitle>
      <UserInfoItems>
        {userItems.map((item) => (
          <UserInfoItem key={item.label} label={item.label} value={item.value} />
        ))}
      </UserInfoItems>
    </Wrapper>
  )
}
