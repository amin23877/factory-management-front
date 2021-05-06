import Axios from "axios";

export interface IItemType {
    id?: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
}

export const getTypes = async () => {
    try {
        const resp = await Axios.get("/itemtype");
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const createType = async (name: string) => {
    try {
        const resp = await Axios.post(`/itemtype`, { name });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateType = async (id: string, name: string) => {
    try {
        const resp = await Axios.patch(`/itemtype/${id}`, { name });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteType = async (id: string) => {
    try {
        const resp = await Axios.delete(`/itemtype/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
