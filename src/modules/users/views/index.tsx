import { useEffect, useState } from 'react';
import CreateUser from '../components/create-user.component';
import UserGroup from '../components/user-group.component';
import User from '../components/user.component';
import UserCacheProvider from '../components/user-cache-provider.component';
import userApiCache from '../services/api-cache.service';
import { toast } from 'react-toastify';

export default function UsersView() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    userApiCache.get('http://localhost:8080/users').then(response => {
      setUsers(response.data);
      toast(response.message);
    });
  }, []);

  function handlerNetworkOnline(users: User[]) {
    setUsers(users);
  }

  function handlerCreatedUser(users: User[]) {
    setUsers(users);
  }
  return (
    <UserCacheProvider onNetworkOnline={handlerNetworkOnline}>
      <div className='user-container'>
        <h2>Usuarios</h2>
        <h3>Agregar</h3>
        <CreateUser users={users} onCreated={handlerCreatedUser} />
        <hr />
        <h3>Listado</h3>
        <UserGroup>{!!users?.length && users.map((user, index) => <User key={index} user={user} />)}</UserGroup>
      </div>
    </UserCacheProvider>
  );
}
