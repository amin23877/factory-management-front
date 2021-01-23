import Axios from 'axios';

export const BaseUrl = 'http://quizupp.ir:3100/api/';

Axios.defaults.baseURL = BaseUrl;

Axios.interceptors.request.use(config => {
    if(!config.headers.authorization){
        config.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE2MDk0MzE1NTh9.SfdFzJRnFORw7MbdcTDPdBnfQT-1BXyyA2EZmFizRLg';
        // config.headers['Content-Type'] = 'application/json';
    }

    return config;
}, error => {
    console.log(error);
    return Promise.reject(error);
});