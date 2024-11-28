import { API_URL } from '@/commons/config';
import { getAccessToken } from '@/commons/storage/accessToken';
import axios, { AxiosError, HttpStatusCode } from 'axios';

export const api = axios.create({ baseURL: API_URL, headers: {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': getAccessToken() || ''
}});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === HttpStatusCode.Unauthorized) {
      // removeAccessToken();
      // location.href = APP_ROUTES.public.signin;
      console.log("Usuário não autenticado")
    }
    return Promise.reject(error);
  }
);

export const setAuthorizationToken = () => {
  const token = getAccessToken();
  if (token) {
    api.defaults.headers.common['Authorization'] = `${token}`;
  }
};
