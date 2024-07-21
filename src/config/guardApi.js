import axios from "axios";

export const guardApi = axios.create({
  baseURL: "https://wallet.b.goit.study",
});

export const setAuthHeader = (token) => {
  guardApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const clearAuthHeader = () => {
  guardApi.defaults.headers.common.Authorization = ``;
};
