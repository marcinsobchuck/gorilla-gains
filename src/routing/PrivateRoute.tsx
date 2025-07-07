import { Navigate, Outlet, useNavigate } from "react-router-dom"

import { setUpResponseInterceptor } from "@api/api"
import { useAppSelector } from "@app/hooks"
import { Routes } from "@enums/routes.enum"

export const PrivateRoute = () => {
  const navigate = useNavigate()
  setUpResponseInterceptor(navigate)

  const accessToken = useAppSelector((state) => state.auth.accessToken)

  if (!accessToken) {
    return <Navigate to={Routes.LOGIN} replace={true} />
  }

  return <Outlet />
}
