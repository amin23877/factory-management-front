import Axios from 'axios';

export const getCategories = async () => {
    try {
        const resp = await Axios.get('/itemcategory');
        return resp.data;
    } catch (error) {
        console.error(error);
    }
}

export const createCategory = async (name:string) => {
    try {
        const resp = await Axios.post('/itemcategory', {name});
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateCategory = async (catId:string, name:string) => {
    try {
        const resp = await Axios.patch(`/itemcategory/${catId}`, {name});
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteCategory = async (catId:string) => {
    try {
        const resp = await Axios.delete(`/itemcategory/${catId}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}