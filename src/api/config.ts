import Axios from "axios";
import { logout } from "../features/Session/sessionsSlice";
import { store } from "../store";

import { getToken, StorageKey } from "./";
import { host } from "../host";

export const BaseUrl = `http://${host}/api/`;
export const WebsiteUrl = "https://phazify.com/dspm";

Axios.defaults.baseURL = BaseUrl;

Axios.interceptors.request.use(
    (config) => {
        if (!config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${getToken()}`;
            // config.headers['Content-Type'] = 'application/json';
        }

        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    (config) => config,
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem(StorageKey);
            store.dispatch(logout());
        }

        return Promise.reject(error);
    }
);
