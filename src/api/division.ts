import Axios from "axios";

export interface IDivison {
    id?: string;
    name:string
}

export const getAllDivison = async () => {
    try {
        const resp = await Axios.get(`/divison`);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const getClientDivisons = async (id:string) => {
    try {
        const resp = await Axios.get(`/client/${id}/division`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const createDivison = async (id: string, name: string) => {
    try {
        const resp = await Axios.post(`/divison`, {ClientId:id, name});
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const updateAModelDivison = async (id: string, data: IDivison) => {
    try {
        const resp = await Axios.patch(`/divison/${id}`, data);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const deleteAModelDivison = async (id: string) => {
    try {
        const resp = await Axios.delete(`/divison/${id}`);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};
