import Skeleton from "react-loading-skeleton"

import { useAppSelector } from "@app/hooks"
import { SkeletonTheme } from "@components/SkeletonTheme/SkeletonTheme"
import { RequestStatuses } from "@enums/requestStatuses.enum"

import { ItemLabel, ItemText, ItemWrapper } from "./UserInfoItem.styled"
import { UserInfoItemProps } from "./UserInfoItem.types"

export const UserInfoItem: React.FC<UserInfoItemProps> = ({ label, value }) => {
  const userInfo = useAppSelector((state) => state.user)

  const loading = userInfo.status === RequestStatuses.LOADING

  return (
    <SkeletonTheme>
      <ItemWrapper justify='space-between'>
        <ItemLabel>{loading ? <Skeleton width='35%' /> : label}</ItemLabel>
        <ItemText>{loading ? <Skeleton /> : value}</ItemText>
      </ItemWrapper>
    </SkeletonTheme>
  )
}
