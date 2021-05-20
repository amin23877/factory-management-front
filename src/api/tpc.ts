import Axios from "axios";

export interface ITPC {
    id?: string;
    inputValue?: string;
    name: string;
}

export const getTPCs = async () => {
    try {
        const resp = await Axios.get("/tpc");
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const createTPC = async (data: ITPC) => {
    try {
        const resp = await Axios.post("/tpc", data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const updateTPC = async (id: string, data: ITPC) => {
    try {
        const resp = await Axios.patch(`/tpc/${id}`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const deleteTPC = async (id: string) => {
    try {
        const resp = await Axios.delete(`/tpc/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};
