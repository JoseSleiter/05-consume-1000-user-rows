import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { UserList } from './components/user-list'
import { type User } from './types/random-user'

const API_URL = 'https://randomuser.me/api?results=10'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [orderByCountry, setOrderByCountry] = useState<boolean>(false)
  const [nameCountryFilter, setNameCountryFilter] = useState<string | null>(null)

  const originalUSers = useRef<User[]>([])

  const getUsers = useCallback(async (): Promise<void> => {
    try {
      const request = await fetch(API_URL)
      const response = await request.json()
      setUsers(response.results)
      originalUSers.current = response.results
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    void getUsers()
  }, [getUsers])

  const handleReset = () => {
    setUsers(originalUSers.current)
  }
  const handleDelete = (email: string) => {
    const filteredUsers = users.filter(user => user.email !== email)
    setUsers(filteredUsers)
  }

  const filteredUsers = useMemo(() => {
    return typeof nameCountryFilter === 'string' && nameCountryFilter.length > 0
      ? users.filter((user) => user.location.country.toLowerCase().includes(nameCountryFilter.toLowerCase()))
      : users
  }, [nameCountryFilter, users])

  const sortedUsers = useMemo(() => {
    return orderByCountry
      ? [...filteredUsers].sort((userA, userB) => userA.location.country.localeCompare(userB.location.country))
      : filteredUsers
  }, [filteredUsers, orderByCountry])

  return (
    <>
      <div>
        <header>
          <button onClick={() => { }}>Show color</button>
          <button onClick={() => { setOrderByCountry(!orderByCountry) }}>Order by country</button>
          <button onClick={() => { handleReset() }}>Reset list</button>
          <input type="text" placeholder={'Colombia, Ecutador, etc...'} onChange={(e) => { setNameCountryFilter(e.target.value) }} />
        </header>
        <main>
          <UserList users={sortedUsers} handleDelete={handleDelete} />
        </main>
      </div>
    </>
  )
}

export default App
