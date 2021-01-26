import Axios from 'axios';

export const getFamilies = async () => {
    try {
        const resp = await Axios.get('/itemfamily');
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const createFamily = async (name:string) => {
    try {
        const resp = await Axios.post('/itemfamily', {name});
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateFamily = async (familyId:number, name:string) => {
    try {
        const resp = await Axios.patch(`/itemfamily/${familyId}`, {name});
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteFamily = async (familyId:number) => {
    try {
        const resp = await Axios.delete(`/itemfamily/${familyId}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}