import Axios from 'axios';

export const BaseUrl = 'http://cla99ic.ir:3100/api/';

Axios.defaults.baseURL = 'http://cla99ic.ir:3100/api/';

Axios.interceptors.request.use(config => {
    if(!config.headers.authorization){
        config.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE2MDU4ODI2NDR9.WUJ--kYBSsqgCdT4iM6TZuaFtKXGPeuKmDiyhn51yus';
        // config.headers['Content-Type'] = 'application/json';
    }

    return config;
}, error => {
    console.log(error);
    return Promise.reject(error);
});