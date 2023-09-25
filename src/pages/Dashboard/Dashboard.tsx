import { Button } from "../../components/Button/Button"

export const Dashboard = () => {
  return (
    <div>
      <Button buttonType='link' to='auth/register' text='Dashboard' variant='primary' width={200} />
    </div>
  )
}
