import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { type User } from './types/random-user'
import { UserList } from './components/user-list'

const API_URL = 'https://randomuser.me/api?results=100'

function App() {
  const [users, setUsers] = useState<User[]>([])

  const getUsers = useCallback(async (): Promise<void> => {
    try {
      const request = await fetch(API_URL)
      const response = await request.json()
      setUsers(response.results)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    void getUsers()
  }, [getUsers])

  return (
    <>
      <div>
        Click on the Vite and React logos to learn more
        <UserList users={users} />
      </div>
    </>
  )
}

export default App
