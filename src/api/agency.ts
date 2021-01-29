import Axios from "axios";

export interface IAgency {
    id?:number;
    name:string
}

export const getAllModelAgency = async (model: string, id: string) => {
    try {
        const resp = await Axios.get(`/agency/${model}/${id}`);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const createAModelAgency = async (model: string, id: string, data: IAgency) => {
    try {
        const resp = await Axios.post(`/agency/${model}/${id}`, data);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const updateAModelAgency = async (id: number, data: IAgency) => {
    try {
        const resp = await Axios.patch(`/agency/${id}`, data);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const deleteAModelAgency = async (id: number) => {
    try {
        const resp = await Axios.delete(`/agency/${id}`);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};
