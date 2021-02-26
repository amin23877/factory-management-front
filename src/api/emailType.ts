import Axios from 'axios';

export interface IEmailType {
    name: string
}

export const getEmailTypes = async () => {
    try {
        const resp = await Axios.get('/emailType');
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const addEmailType = async (name:String) => {
    try {
        const resp = await Axios.post('/emailType', {name});
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const editEmailType = async (id:number, name:string) => {
    try {
        const resp = await Axios.patch(`/emailType/${id}`, {name});
        return resp.data;
    } catch (error) {
        console.log(error);        
    }
}

export const deleteEmailType = async (id:number) => {
    try {
        const resp = await Axios.delete(`/emailType/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}