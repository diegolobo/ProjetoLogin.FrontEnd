import { Storage } from "./types";

export const getUserEmail = () => {
  return localStorage.getItem(Storage.USER_EMAIL);
};

export const setUserEmail = (email: string) => {
  return localStorage.setItem(Storage.USER_EMAIL, email);
};