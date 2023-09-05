import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"

import { AuthLayout } from "../layouts/AuthLayout"
import { RootLayout } from "../layouts/RootLayout"
import { ActivityHistory } from "../pages/ActivityHistory/ActivityHistory"
import { ActivityHistoryDetails } from "../pages/ActivityHistory/ActivityHistoryDetails"
import { Login } from "../pages/Auth/Login"
import { Register } from "../pages/Auth/Register"
import { Dashboard } from "../pages/Dashboard"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='history' element={<ActivityHistory />}>
          <Route path=':id' element={<ActivityHistoryDetails />} />
        </Route>
      </Route>
      <Route path='/auth' element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>
    </>
  )
)
