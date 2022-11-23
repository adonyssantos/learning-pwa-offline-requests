import { UserGroupProps } from '../models/user-group-props';

export default function UserGroup({ children }: UserGroupProps) {
  if (!children) {
    return <p>No hay usuarios</p>;
  }

  return <>{children}</>;
}
