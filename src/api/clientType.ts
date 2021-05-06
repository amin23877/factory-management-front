import Axios from 'axios';

export interface IClientType {
    name: string
}

export const getClientTypes = async () => {
    try {
        const resp = await Axios.get('/clientType');
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const addClientType = async (name:string) => {
    try {
        const resp = await Axios.post('/clientType', {name});
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const editClientType = async (id:string, name:string) => {
    try {
        const resp = await Axios.patch(`/clientType/${id}`, {name});
        return resp.data;
    } catch (error) {
        console.log(error);        
    }
}

export const deleteClientType = async (id:string) => {
    try {
        const resp = await Axios.delete(`/clientType/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}