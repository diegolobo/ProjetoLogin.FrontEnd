import { AxiosError } from "axios";

import { UserListResponse } from "@/app/usuarios/types";
import { api } from "..";
import { RequestError } from "../RequestError";
import { User } from "./types";

export const userApi: string = "/api/Usuarios";

export const authenticate = async (email: string, password: string) => {
  try {
    const { data } = await api.post<{ token: string }>(
      `${userApi}/authenticate`,
      {
        username: email,
        password,
      }
    );
    return data;
  } catch (e) {
    if (e instanceof AxiosError && e.response) {
      throw new RequestError(e);
    }
    throw e;
  }
};

export const fetchUsers = async (
  id?: number, 
  nome?: string, 
  email?: string, 
  tipoUsuario?:string, 
  status?: string,
  pageNumber?: number,
  pageSize?: number,
  order?: string) => {
  try {
    let url = `${userApi}?`;

    if (id) {
      url += `id=${id}&`;
    }

    if (nome) {
      url += `nome=${nome}&`;
    }

    if (email) {
      url += `email=${email}&`;
    }

    if (tipoUsuario) {
      url += `tipoUsuario=${tipoUsuario}&`;
    }

    if (status) {
      url += `status=${status}&`;
    }

    if (pageNumber) {
      url += `pageNumber=${pageNumber}&`;
    }

    if (pageSize) {
      url += `pageSize=${pageSize}&`;
    }

    if (order) {
      url += `order=${order}`;
    }

    const { data } = await api.get<UserListResponse>(url);
    return data;
  } catch (e) {
    if (e instanceof AxiosError && e.response) {
      throw new RequestError(e);
    }
    throw e;
  }
};

export const fetchUser = async (id: number) => {
  try {
    const { data } = await api.get<User>(`${userApi}/${id}`);
    return data;
  } catch (e) {
    if (e instanceof AxiosError && e.response) {
      throw new RequestError(e);
    }
    throw e;
  }
};

export const createUser = async (user: User) => {
  try {
    await api.post(userApi, user);
  } catch (e) {
    if (e instanceof AxiosError && e.response) {
      throw new RequestError(e);
    }
    throw e;
  }
};

export const updateUser = async (user: User) => {
  try {
    await api.put(`${userApi}/${user.id}`, user);
  } catch (e) {
    if (e instanceof AxiosError && e.response) {
      throw new RequestError(e);
    }
    throw e;
  }
};

export const deleteUser = async (id: number) => {
  try {
    await api.delete(`${userApi}/${id}`);
  } catch (e) {
    if (e instanceof AxiosError && e.response) {
      throw new RequestError(e);
    }
    throw e;
  }
};
