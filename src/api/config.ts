import Axios from "axios";

import { getToken } from "./";

<<<<<<< HEAD
export const BaseUrl = 'http://zarph.ir:3100/api/';
=======
export const BaseUrl = "http://zarph.ir:3100/api/";
>>>>>>> 4b3ed054ec771e504a918c0c92a83a58af68f2b8

Axios.defaults.baseURL = BaseUrl;

Axios.interceptors.request.use(
    (config) => {
        if (!config.headers.authorization) {
            config.headers.authorization = `Bearer ${getToken()}`;
            // config.headers['Content-Type'] = 'application/json';
        }

<<<<<<< HEAD
    return config;
}, error => {
    console.log(error);
    return Promise.reject(error);
});
=======
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);
>>>>>>> 4b3ed054ec771e504a918c0c92a83a58af68f2b8
