import Axios from 'axios';

export interface IAddressType {
    name: string
}

export const getAddressTypes = async () => {
    try {
        const resp = await Axios.get('/addressType');
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const addAddressType = async (name:String) => {
    try {
        const resp = await Axios.post('/addressType', {name});
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const editAddressType = async (id:string, name:string) => {
    try {
        const resp = await Axios.patch(`/addressType/${id}`, {name});
        return resp.data;
    } catch (error) {
        console.log(error);        
    }
}

export const deleteAddressType = async (id:string) => {
    try {
        const resp = await Axios.delete(`/addressType/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}