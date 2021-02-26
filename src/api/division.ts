import Axios from "axios";

export interface IDivison {
    id?: number;
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

export const getClientDivisons = async (id:number) => {
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

export const updateAModelDivison = async (id: number, data: IDivison) => {
    try {
        const resp = await Axios.patch(`/divison/${id}`, data);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const deleteAModelDivison = async (id: number) => {
    try {
        const resp = await Axios.delete(`/divison/${id}`);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};
