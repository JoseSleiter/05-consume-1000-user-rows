import { type User } from '../../types/random-user'

interface UserListProps {
  users: User[]
}

export const UserList = ({ users }: UserListProps) => {
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
            <td><img src={user.picture.thumbnail} alt="this-is-a-img-thumbnail-from-random-users" width={'100%'} /></td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td>{user.id.value}</td>
          </tr>
        ))
        }
      </tbody>
    </table>
  )
}
