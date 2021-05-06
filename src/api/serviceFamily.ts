import Axios from 'axios';

export interface IServiceFamily {
    id?:string;
    name:string
}

export const getServiceFamilies = async () => {
    try {
        const resp = await Axios.get('/serviceFamily');
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const createServiceFamily = async (name:string) => {
    try {
        const resp = await Axios.post('/serviceFamily', {name});
        return resp.data;
    } catch (error) {
        throw error;
    }
} 

export const updateServiceFamily = async (id:string,name:string) => {
    try {
        const resp = await Axios.patch(`/serviceFamily/${id}`, {name});
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const deleteServiceFamily = async (id:string) => {
    try {
        const resp = await Axios.delete(`/serviceFamily/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
}