import jwt_decode from "jwt-decode"

import { getActivitiesForCurrentUser } from "../../api/activitiesService"
import { useAppSelector } from "../../app/hooks"
import { Button } from "../../components/Button/Button"

export const Dashboard = () => {
  const token = useAppSelector((state) => state.auth.accessToken)
  const info =
    token &&
    jwt_decode<{
      id: string
      name: string
      email: string
    }>(token)

  const hadnleClick = async () => {
    const xd = await getActivitiesForCurrentUser()
    console.log(xd)
  }
  return (
    <div>
      <Button
        onClick={hadnleClick}
        buttonType='link'
        to='/activities'
        text='Activities'
        variant='primary'
        width={200}
      />
      {info && (
        <div>
          <h2>Decoded</h2>
          <p>{info.id}</p>
          <p>{info.email}</p>
          <p>{info.name}</p>
        </div>
      )}
    </div>
  )
}
