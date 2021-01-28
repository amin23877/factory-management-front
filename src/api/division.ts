import Axios from "axios";

interface IDivision {
    name:string
}

export const getAllModelDivision = async (model: string, id: string) => {
    try {
        const resp = await Axios.get(`/division/${model}/${id}`);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const createAModelDivision = async (model: string, id: string, data: IDivision) => {
    try {
        const resp = await Axios.post(`/division/${model}/${id}`, data);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const updateAModelDivision = async (id: string, data: IDivision) => {
    try {
        const resp = await Axios.patch(`/division/${id}`, data);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const deleteAModelDivision = async (id: number) => {
    try {
        const resp = await Axios.delete(`/division/${id}`);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};
