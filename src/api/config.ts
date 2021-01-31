import Axios from 'axios';

import {getToken} from '../store';

export const BaseUrl = 'http://quizupp.ir:3100/api/';

Axios.defaults.baseURL = BaseUrl;

Axios.interceptors.request.use(config => {
    if(!config.headers.authorization){
        config.headers.authorization = `Bearer ${getToken()}`;
        // config.headers['Content-Type'] = 'application/json';
    }

    return config;
}, error => {
    console.log(error);
    return Promise.reject(error);
});