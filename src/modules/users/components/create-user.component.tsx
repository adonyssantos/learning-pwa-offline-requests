import userApiCache from '../services/api-cache.service';
import { toast } from 'react-toastify';

export default function CreateUser({ users, onCreated }: CreateUserProps) {
  function handleCreateUser(event: any) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const newUser: User = {
      name: formData.get('name') as string,
      title: formData.get('title') as string,
      age: formData.get('age') as string,
      status: 'pending',
    };

    userApiCache
      .post('http://localhost:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
      .then(response => {
        onCreated(response.data || [...users, newUser]);
        form.reset();
        toast(response.message);
      });
  }

  return (
    <form onSubmit={handleCreateUser}>
      <div>
        <input type='text' placeholder='Name' name='name' required />
      </div>
      <div>
        <input type='text' placeholder='Title' name='title' required />
      </div>
      <div>
        <input type='text' placeholder='Age' name='age' required />
      </div>
      <button type='submit'>Agregar</button>
    </form>
  );
}
