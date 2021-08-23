import Axios from "axios";

export interface IPPOType {
    id?: string;
    inputValue?: string;
    name: string;
}

export const getPPOTypes = async () => {
    try {
        const resp = await Axios.get("/ppot");
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const addPPOType = async (name: string) => {
    try {
        const resp = await Axios.post("/ppot", { name });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const editPPOType = async (id: string, name: string) => {
    try {
        const resp = await Axios.patch(`/ppot/${id}`, { name });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deletePPOType = async (id: string) => {
    try {
        const resp = await Axios.delete(`/ppot/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
