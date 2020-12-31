import Axios from 'axios';

export const getCategories = async () => {
    try {
        const resp = await Axios.get('/category');
        return resp.data;
    } catch (error) {
        console.error(error);
    }
}

export const getACategory = async (catId:string) => {
    try {
        const resp = await Axios.get(`/category/${catId}`);
        return resp.data;
    } catch (error) {
        console.error(error);
    }
}

export const createCategory = async (name:string) => {
    try {
        const resp = await Axios.post('/category', {name});
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateACategory = async (catId:string, name:string) => {
    try {
        const resp = await Axios.patch(`/category/${catId}`, {name});
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteACategory = async (catId:string) => {
    try {
        const resp = await Axios.delete(`/category/${catId}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}