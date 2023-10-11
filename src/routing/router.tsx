import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"

import { PrivateRoute } from "./PrivateRoute"
import { Routes } from "../enums/routes.enum"
import { EntryLayout } from "../layouts/EntryLayout"
import { RootLayout } from "../layouts/RootLayout/RootLayout"
import { ActivityHistory } from "../pages/ActivityHistory/ActivityHistory"
import { Calendar } from "../pages/Calendar/Calendar"
import { Dashboard } from "../pages/Dashboard/Dashboard"
import { Login } from "../pages/Entry/Login"
import { Register } from "../pages/Entry/Register"
import { NotFound } from "../pages/NotFound/NotFound"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={Routes.HOME} element={<RootLayout />}>
        <Route element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          <Route path={Routes.DASHBOARD} element={<Dashboard />} />
          <Route path={Routes.ACTIVITY_HISTORY} element={<ActivityHistory />} />
          <Route path={Routes.CALENDAR} element={<Calendar />} />
        </Route>
      </Route>
      <Route path={Routes.ENTRY} element={<EntryLayout />}>
        <Route index element={<Login />} />
        <Route path={Routes.LOGIN} element={<Login />} />
        <Route path={Routes.REGISTER} element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path={Routes.USER_DETAILS} element={<div>Multistep form</div>} />
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </>
  )
)
