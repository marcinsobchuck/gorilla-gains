import { useState } from "react"
import { Navigate, Outlet } from "react-router-dom"

export const PrivateRoute = () => {
  const [currentUser] = useState(true)

  return currentUser ? <Outlet /> : <Navigate to='/' />
}
