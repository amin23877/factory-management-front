import Axios from "axios";

export const addCall = async (data: any) => {
    try {
        const resp = await Axios.post("/calls", data);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const deleteCall = async (id: string) => {
    try {
        const resp = await Axios.delete(`/calls/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const editCall = async (id: string, data: any) => {
    try {
        const resp = await Axios.patch(`/calls/${id}`, data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
