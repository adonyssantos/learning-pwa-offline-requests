import { UserProps } from '../models/user-props';

export default function User({ user }: UserProps) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '1rem',
        margin: '1rem 0',
      }}
    >
      <h4>{user.name}</h4>
      <p>{user.title}</p>
      <p>{user.age}</p>
      <small>
        Status:{' '}
        <pre
          style={{
            display: 'inline',
          }}
        >
          {user.status}
        </pre>
      </small>
    </div>
  );
}
