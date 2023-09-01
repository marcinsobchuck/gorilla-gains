import { useState } from "react"

export const App = () => {
  const [count, setCount] = useState(0)
  return (
    <>
      <h1>test</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count} {import.meta.env.VITE_APP_TITLE}
        </button>
      </div>
    </>
  )
}
