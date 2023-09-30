import { Navigate, Outlet } from "react-router-dom"

import { useAppSelector } from "../app/hooks"

export const PrivateRoute = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken)
  return accessToken ? <Outlet /> : <Navigate to='auth/login' />
}
