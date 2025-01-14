import "react-loading-skeleton/dist/skeleton.css"

import { differenceInYears, parseISO } from "date-fns"
import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { getCurrentUserInfoAction } from "@features/user/userActions"
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter"

import { UserInfoItem } from "./components/UserInfoItem"
import {
  GoalTile,
  GoalsWrapper,
  UserInfoItems,
  UserInfoSection,
  UserInfoTitle,
  Wrapper,
} from "./UserInfo.styled"

export const UserInfo = () => {
  const userInfo = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const { name, surname, dob, weight, desiredWeight, height, gender, goals } = {
    ...userInfo.data,
  }

  const userItems = [
    { label: "Name", value: name },
    { label: "Surname", value: surname },
    { label: "Age", value: dob ? differenceInYears(new Date(), parseISO(dob)) : "-" },
    { label: "Gender", value: gender },
    { label: "Height", value: height ? `${height}  cm` : "-" },
    { label: "Weight", value: weight ? `${weight}  kg` : "-" },
    { label: "Desired weight", value: desiredWeight ? `${desiredWeight}  kg` : "-" },
  ]

  useEffect(() => {
    if (!userInfo.data) {
      const promise = dispatch(getCurrentUserInfoAction())

      return () => promise.abort()
    }
  }, [dispatch, userInfo.data])

  return (
    <Wrapper>
      <UserInfoSection>
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
      </UserInfoSection>
      <UserInfoSection>
        <UserInfoTitle>Current focus</UserInfoTitle>
        <GoalsWrapper>
          {goals?.map((goal) => {
            return <GoalTile key={goal}>{capitalizeFirstLetter(goal)}</GoalTile>
          })}
        </GoalsWrapper>
      </UserInfoSection>
    </Wrapper>
  )
}
