import Axios from "axios";
import { logout } from "../features/Session/sessionsSlice";
import { store } from "../store";

import { getToken, StorageKey } from "./";
import { host } from "../host";

export const BaseUrl = `https://${host}/api/`;
export const WebsiteUrl = "https://phazify.com/dspm";
export const SocketUrl = `https://${host}/`;

export const apiAgent = Axios.create({ baseURL: BaseUrl });

apiAgent.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${getToken()}`;
    }

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

apiAgent.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem(StorageKey);
      store.dispatch(logout());
    }

    return Promise.reject(error);
  }
);
