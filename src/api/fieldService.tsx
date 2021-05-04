import Axios from "axios";

export interface IFieldService {
    id?: string;
    name: string;
    ItemId: string;
    length: number;
    price: number;
}

export const getFieldServices = async (ItemId?: string) => {
    try {
        const resp = await Axios.get("/service", { params: { ItemId } });
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const createFieldService = async (data: IFieldService) => {
    try {
        const resp = await Axios.post("/service", data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const updateFieldService = async (id: string, data: IFieldService) => {
    try {
        const resp = await Axios.patch(`/service/${id}`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const deleteFieldService = async (id: string) => {
    try {
        const resp = await Axios.delete(`/service/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};
