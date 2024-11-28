export interface User {
  id: number;
  nome: string;
  email: string;
  tipoUsuario: string;
  status: string;
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