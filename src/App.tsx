import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { UserList } from './components/user-list'
import { type User, SortBy } from './types/random-user'
// import { SortBy } from './types/ux'

const API_URL = 'https://randomuser.me/api?results=10'

// eslint-disable-next-line @typescript-eslint/space-before-function-paren
function App() {
  const [users, setUsers] = useState<User[]>([])
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
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
  const handleSorting = () => {
    const newSorting = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSorting)
  }

  const filteredUsers = useMemo(() => {
    return typeof nameCountryFilter === 'string' && nameCountryFilter.length > 0
      ? users.filter((user) => user.location.country.toLowerCase().includes(nameCountryFilter.toLowerCase()))
      : users
  }, [nameCountryFilter, users])

  const sortedUsers = useMemo(() => {
    const sortingObject: Record<string, (userA: User, userB: User) => number> = {
      [SortBy.COUNTRY]: (userA: User, userB: User) => userA.location.country.localeCompare(userB.location.country),
      [SortBy.NAME]: (userA: User, userB: User) => userA.name.first.localeCompare(userB.name.first),
      [SortBy.LASTNAME]: (userA: User, userB: User) => userA.name.last.localeCompare(userB.name.last)
    }

    return sorting !== SortBy.NONE
      ? [...filteredUsers].sort(sortingObject[sorting])
      : filteredUsers
  }, [filteredUsers, sorting])

  return (
    <>
      <div>
        <header>
          <button onClick={() => { }}>Show color</button>
          <button onClick={() => { handleSorting() }}>Order by country</button>
          <button onClick={() => { handleReset() }}>Reset list</button>
          <div>
            <label htmlFor="">Filter by country name</label>
            <input type="text" placeholder={'Colombia, Ecutador, etc...'} onChange={(e) => { setNameCountryFilter(e.target.value) }} />
          </div>
        </header>
        <main>
          <UserList users={sortedUsers} handleDelete={handleDelete} changeSorting={setSorting} />
        </main>
      </div>
    </>
  )
}

export default App
