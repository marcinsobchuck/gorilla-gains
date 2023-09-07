import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"

import { AuthLayout } from "../layouts/AuthLayout"
import { RootLayout } from "../layouts/RootLayout"
import { Activities } from "../pages/Activities/Activities"
import { ActivitiesOfUser } from "../pages/Activities/ActivitiesOfUser"
import { Login } from "../pages/Auth/Login"
import { Register } from "../pages/Auth/Register"
import { Calendar } from "../pages/Calendar"
import { Dashboard } from "../pages/Dashboard"
import { NotFound } from "../pages/NotFound"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='activities'>
          <Route index element={<Activities />} />
          <Route path=':id' element={<ActivitiesOfUser />} />
        </Route>
        <Route path='calendar' element={<Calendar />} />
      </Route>
      <Route path='/auth' element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </>
  )
)
