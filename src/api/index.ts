import Axios from 'axios';

export const baseGet = async (url:string, params?:string) => {
    try {
        const resp = await Axios.get(url, {params})
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const basePost = async (url:string, data:any) => {
    try {
        const resp = await Axios.post(url, data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const basePatch = async (url:string, data:any) => {
    try {
        const resp = await Axios.patch(url, data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const baseDelete = async (url:string) => {
    try {
        const resp = await Axios.delete(url)
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}