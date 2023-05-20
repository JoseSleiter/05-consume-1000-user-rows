import { type User } from '../../types/random-user'

interface UserListProps {
  users: User[]
  handleDelete: (email: string) => void
}

export const UserList = ({ users, handleDelete }: UserListProps) => {
  return (
    <table width={'100%'}>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Pais</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 && users.map((user, key) => (
          <tr key={`${user.email}_${key}`}>
            <td><img src={user.picture.thumbnail} alt="this-is-a-img-thumbnail-from-random-users" width={'64px'} height={'64px'} /></td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td>{user.id.value} {user.email}<button onClick={() => { handleDelete(user.email) }}>remove</button></td>
          </tr>
        ))
        }
      </tbody>
    </table>
  )
}
