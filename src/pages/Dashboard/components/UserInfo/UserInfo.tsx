import "react-loading-skeleton/dist/skeleton.css"

import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { getCurrentUserInfoAction } from "@features/user/userActions"
import { capitalizeFirstLetter } from "@layouts/RootLayout/components/AddActivityForm/utils"

import { UserInfoItem } from "./components/UserInfoItem"
import { UserInfoItems, UserInfoTitle, Wrapper } from "./UserInfo.styled"

export const UserInfo = () => {
  const userInfo = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const { name, surname, age, weight, desiredWeight, height, gender, goals } = {
    ...userInfo.data,
  }

  const userItems = [
    { label: "Name", value: name },
    { label: "Surname", value: surname },
    { label: "Age", value: age },
    { label: "Gender", value: gender },
    { label: "Height", value: height ? `${height}  cm` : "-" },
    { label: "Weight", value: weight ? `${weight}  kg` : "-" },
    { label: "Desired weight", value: desiredWeight ? `${desiredWeight}  kg` : "-" },
    { label: "Current focus", value: goals?.join(", ") },
  ]

  useEffect(() => {
    if (!userInfo.data) {
      const promise = dispatch(getCurrentUserInfoAction())

      return () => promise.abort()
    }
  }, [dispatch, userInfo.data])

  return (
    <Wrapper>
      <UserInfoTitle>Basic info</UserInfoTitle>
      <UserInfoItems>
        {userItems.map((item) => {
          return (
            <UserInfoItem
              key={item.label}
              label={item.label}
              value={
                typeof item.value === "string"
                  ? capitalizeFirstLetter(item.value) || "-"
                  : item.value || "-"
              }
            />
          )
        })}
      </UserInfoItems>
    </Wrapper>
  )
}
