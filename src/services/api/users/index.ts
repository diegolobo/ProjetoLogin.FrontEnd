import { AxiosError } from "axios";

import { PostUser, UserListResponse } from "@/app/usuarios/types";
import { getAccessToken } from "@/commons/storage/accessToken";
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

    const { data } = await api.get<UserListResponse>(url, {
        headers: {
          Authorization: getAccessToken(),
        }
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

export const fetchUser = async (id: number) => {
  try {
    const { data } = await api.get<User>(`${userApi}/${id}`,
      {
        headers: {
          Authorization: getAccessToken(),
        }
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

export const createUser = async (user: PostUser) => {
  try {
    return await api.post(userApi, {
      nome: user.nome,
      email: user.email,
      password: user.senha
    });
  } catch (e) {
    if (e instanceof AxiosError && e.response) {
      throw new RequestError(e);
    }
    throw e;
  }
};

export const updateUser = async (user: User) => {
  try {
    await api.put(`${userApi}/${user.id}`, user, {
        headers: {
          Authorization: getAccessToken(),
        }
      }
    );
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
