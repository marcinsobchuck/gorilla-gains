import { useAppSelector } from "../../app/hooks"

export const ActivityHistory = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfo)

  console.log(userInfo)

  return (
    <div>
      <aside></aside>
    </div>
  )
}
