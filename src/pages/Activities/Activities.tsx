import { Outlet } from "react-router-dom"

import { useAppSelector } from "../../app/hooks"

export const Activities = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfo)

  console.log(userInfo)

  return (
    <>
      <div>
        {userInfo && (
          <div>
            <p>{userInfo.id}</p>
            <p>{userInfo.name}</p>
            <p>{userInfo.email}</p>
          </div>
        )}
      </div>
      <Outlet />
    </>
  )
}
