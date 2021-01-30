import Axios from 'axios';

export const addRole = async (name:string) => {
    try {
        const resp = await Axios.post('/role', {name});
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const getRoles = async () => {
    try {
        const resp = await Axios.get('/role');
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}