import Axios from "axios";

export interface IPhoneType {
    name: string;
}

export const getPhoneTypes = async () => {
    try {
        const resp = await Axios.get("/phoneType");
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const addPhoneType = async (name: string) => {
    try {
        const resp = await Axios.post("/phoneType", { name });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const editPhoneType = async (id: string, name: string) => {
    try {
        const resp = await Axios.patch(`/phoneType/${id}`, { name });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deletePhoneType = async (id: string) => {
    try {
        const resp = await Axios.delete(`/phoneType/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
