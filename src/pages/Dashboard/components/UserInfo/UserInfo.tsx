import "react-loading-skeleton/dist/skeleton.css"

import { differenceInYears, parseISO } from "date-fns"
import { useEffect, useState } from "react"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { getCurrentUserInfoAction } from "@features/user/userActions"
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter"

import { ManageActivities } from "./components/ManageActivities/ManageActivities"
import { UserInfoItem } from "./components/UserInfoItem/UserInfoItem"
import {
  CardStackingContext,
  GoalTile,
  GoalsWrapper,
  ManageButton,
  StyledEventCard,
  UserInfoItems,
  UserInfoSection,
  UserInfoTitle,
  Wrapper,
} from "./UserInfo.styled"

export const UserInfo = () => {
  const [isManagedListOpen, setIsManagedListOpen] = useState(false)
  const userInfo = useAppSelector((state) => state.user)
  const userActivityStatistics = useAppSelector(
    (state) => state.activitiesSummary.activitiesSummaryData?.activitiesStatistics
  )
  const unresolvedActivities = userActivityStatistics?.unresolvedActivities
  const plannedActivities = userActivityStatistics?.plannedActivities
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
    <Wrapper direction='column'>
      {unresolvedActivities && (
        <ManageActivities
          isOpen={isManagedListOpen}
          title='Unresolved activities'
          activities={unresolvedActivities}
          onBack={() => setIsManagedListOpen(false)}
        />
      )}
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
      <UserInfoSection>
        <UserInfoTitle>Manage</UserInfoTitle>

        <UserInfoItems>
          {unresolvedActivities && unresolvedActivities.length > 0 && (
            <FlexContainer direction='column' gap={unresolvedActivities.length > 1 ? 6 : 0}>
              <UserInfoItem label='Unresolved' value={unresolvedActivities.length} />
              <CardStackingContext direction='column' gap={6}>
                <StyledEventCard
                  activity={unresolvedActivities[0]}
                  withButton={false}
                  stacked={unresolvedActivities.length > 1}
                />
                <ManageButton
                  variant='secondary'
                  buttonType='button'
                  onClick={() => setIsManagedListOpen(true)}
                >
                  Manage
                </ManageButton>
              </CardStackingContext>
            </FlexContainer>
          )}
          {plannedActivities && plannedActivities.length > 0 && (
            <>
              <UserInfoItem label='Upcoming next' value={plannedActivities?.length} />

              <CardStackingContext direction='column' gap={6}>
                <StyledEventCard activity={plannedActivities[0]} withButton={false} />
              </CardStackingContext>
            </>
          )}
        </UserInfoItems>
      </UserInfoSection>
    </Wrapper>
  )
}
