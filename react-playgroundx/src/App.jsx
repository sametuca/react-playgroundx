import { useState } from 'react'
import './App.css'
import UserList from './components/User/UserList'
import UserDetail from './components/User/UserDetail'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UserList />
      <UserDetail />
    </>
  )
}

export default App
