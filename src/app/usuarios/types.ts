export interface User extends PostUser {
  id?: number;
  tipoUsuario?: string;
  status?: string;
}

export interface PostUser {
  nome: string;
  email: string;
  senha?: string;
  senhaConfirmacao?: string;
}

export interface UserFilter {
  id?: number;
  name?: string;
  email?: string;
  userType?: string;
  status?: string;
  pageNumber?: number;
  pageSize?: number;
  order?: string;
}

export interface UserListResponse {
  users: User[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

export enum PaginationConfig {
  ITEMS_PER_PAGE = 5
}