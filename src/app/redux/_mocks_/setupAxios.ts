import { AxiosStatic } from "axios";
type Props = {
  axios: AxiosStatic;
  store: any;
};
export function setupAxios({ axios, store }: Props) {
  axios.defaults.baseURL = "http://localhost:3001"
  axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem("TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}
