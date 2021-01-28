import Axios from 'axios';

export interface IContactType {
    name: string
}

export const getContactTypes = async () => {
    try {
        const resp = await Axios.get('/contactType');
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const addContactType = async (name:String) => {
    try {
        const resp = await Axios.post('/contactType', {name});
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const editContactType = async (id:number, name:string) => {
    try {
        const resp = await Axios.patch(`/contactType/${id}`, {name});
        return resp.data;
    } catch (error) {
        console.log(error);        
    }
}

export const deleteContactType = async (id:number) => {
    try {
        const resp = await Axios.delete(`/contactType/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}