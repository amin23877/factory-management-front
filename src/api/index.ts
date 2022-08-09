import { apiAgent } from "./config";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const StorageKey = "phocus_session";

export const getToken = () => {
  const token = localStorage.getItem(StorageKey);
  return token || null;
};

export const fetcher = async (url: string) => {
  try {
    const resp = await get(url);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const get = async (path: string, config?: AxiosRequestConfig) => {
  const onSuccess = (response: AxiosResponse<any>) => {
    if (response.headers && response.headers["content-type"].indexOf("application/json") !== -1) {
      return response.data;
    }
    throw new Error(`The response of this API endpoint is not JSON, URL: ${response.config.url}`);
  };

  const onError = (error: any) => {
    if (error.response) {
      console.error({ response: error.response, config: error.config });
      toast.error(error.response.data.error);
    } else {
      console.error("Error Message: ", error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  try {
    const response = await apiAgent.get(path, config);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

export const delete_ = async (path: string, params: AxiosRequestConfig["params"] = null, data: any = null) => {
  let headers = {};

  const onSuccess = (response: AxiosResponse<any>) => {
    return response.data;
  };

  const onError = (error: any) => {
    console.error("Delete Request Failed:", error.config);

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

  try {
    const response = await apiAgent.delete(path, {
      params,
      headers,
      data,
    });
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

export async function post<T>(path: string, data: any, params?: any) {
  let headers = {
    "Content-Type": "application/json",
  };

  const onSuccess = (response: AxiosResponse<any>) => {
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

  try {
    const response = await apiAgent.post<T>(path, data, {
      headers,
      params,
    });
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
}

export async function put(path: string, data: any, headers = { "Content-Type": "application/json" }, params?: any) {
  const onSuccess = (response: AxiosResponse<any>) => {
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

  try {
    const response = await apiAgent.put(path, data, {
      headers,
      params,
    });
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
}

export async function patch(path: string, data: any, headers = { "Content-Type": "application/json" }, params?: any) {
  const onSuccess = (response: AxiosResponse<any>) => {
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

  try {
    const response = await apiAgent.patch(path, data, {
      headers,
      params,
    });
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
}

export function uploadFile(name: string, file: any) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("sampleFile", name);
  formData.append("name", name);

  return post("/upload", formData);
}
