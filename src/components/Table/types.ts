export interface User {
  id?: number;
  nome?: string;
  email?: string;
  tipoUsuario?: string;
  status?: string;
}

export interface TableProps {
  users: User[];
}