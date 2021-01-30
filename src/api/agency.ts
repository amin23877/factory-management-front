import Axios from "axios";

export interface IAgency {
    id?:number;
    name:string
}

export const getAllAgencies = async () => {
    try {
        const resp = await Axios.get(`/agency`);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const createAModelAgency = async (id: string, name: string) => {
    try {
        const resp = await Axios.post(`/agency`, {ClientId:id, name});
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
