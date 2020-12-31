import Axios from 'axios';

export const getAllTypes = async () => {
    try {
        const resp = await Axios.get('/type');
        return resp.data;
    } catch (error) {
        console.log(error);       
    }
}

export const getAllSubTypes = async () => {
    try {
        const resp = await Axios.get('/subtype');
        return resp.data;
    } catch (error) {
        console.log(error);       
    }
}