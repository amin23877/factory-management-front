import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const StorageKey = "phocus_session";

export const getToken = () => {
    const emp = localStorage.getItem(StorageKey);
    if (emp) {
        return emp;
    } else {
        return null;
    }
};

export const fetcher = async (url: string) => {
    try {
        const resp = await get(url);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const get = (path: string, config?:AxiosRequestConfig, withPagination: boolean = false) => {
    const onSuccess = (response: AxiosResponse<any>) => {
        // console.info("Get Request Successful!", response);
        if (withPagination) {
            // with patgination
            return response.data;
        } else {
            return response.data;
        }
    };

    const onError = (error: any) => {
        console.error("Get Request Failed:", error.config);

        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
            toast.error(error.response.data.error);
            console.error("Headers:", error.response.headers);
        } else {
            console.error("Error Message ---------------:", error.message);
        }

        return Promise.reject(error.response || error.message);
    };

    return Axios.get(path, config)
        .then(onSuccess)
        .catch(onError);
};

export const delete_ = (path: string, params: AxiosRequestConfig["params"] = null, data: any = null) => {
    let headers = {};

    const onSuccess = (response: AxiosResponse<any>) => {
        // console.error("Get Request Successful!", response);
        return response.data;
    };

    const onError = (error: any) => {
        console.error("Get Request Failed:", error.config);

        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
            toast.error(error.response.data.Message);
            console.error("Headers:", error.response.headers);
        } else {
            console.error("Error Message:", error.message);
        }

        return Promise.reject(error.response || error.message);
    };

    return Axios.delete(path, {
        params,
        headers,
        data,
    })
        .then(onSuccess)
        .catch(onError);
};

export function post(path: string, data: any, params?: any) {
    let headers = {
        "Content-Type": "application/json",
    };

    const onSuccess = (response: AxiosResponse<any>) => {
        // console.error("Post Request Successful!", response);
        return response.data;
    };

    const onError = (error: any) => {
        console.error("Post Request Failed:", error.config);

        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
            toast.error(error.response.data.Message || error.response.data.error);
            console.error("Headers:", error.response.headers);
        } else {
            console.error("Error Message:", error.message);
        }

        return Promise.reject(error.response || error.message);
    };

    return Axios.post(path, data, {
        headers,
        params,
    })
        .then(onSuccess)
        .catch(onError);
}

export function put(path: string, data: any, headers = { "Content-Type": "application/json" }, params?: any) {
    const onSuccess = (response: AxiosResponse<any>) => {
        // console.error("Post Request Successful!", response);
        return response.data;
    };

    const onError = (error: any) => {
        console.error("Post Request Failed:", error.config);

        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
            toast.error(error.response.data.error);
            console.error("Headers:", error.response.headers);
        } else {
            console.error("Error Message:", error.message);
        }

        return Promise.reject(error.response || error.message);
    };

    return Axios.put(path, data, {
        headers,
        params,
    })
        .then(onSuccess)
        .catch(onError);
}

export function patch(path: string, data: any, headers = { "Content-Type": "application/json" }, params?: any) {
    const onSuccess = (response: AxiosResponse<any>) => {
        // console.error("Post Request Successful!", response);
        return response.data;
    };

    const onError = (error: any) => {
        console.error("Post Request Failed:", error.config);

        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
            toast.error(error.response.data.error);
            console.error("Headers:", error.response.headers);
        } else {
            console.error("Error Message:", error.message);
        }

        return Promise.reject(error.response || error.message);
    };

    return Axios.patch(path, data, {
        headers,
        params,
    })
        .then(onSuccess)
        .catch(onError);
}

export function uploadFile(file: any) {
    const formData = new FormData();
    formData.append("file", file);

    return post("/upload", formData);
}
