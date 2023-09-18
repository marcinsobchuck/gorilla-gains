import { Link } from "react-router-dom"

export const Login = () => {
  return (
    <div>
      <h1>Sign in Gorilla.</h1>
      <p>Time to train.</p>
      <p>
        Not a member? <Link to='/auth/register'>Go to Register view</Link>
      </p>
    </div>
  )
}
