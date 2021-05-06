import Axios from "axios";

export interface IEmailAddressType {
    name: string;
}

export const getEmailAddressTypes = async () => {
    try {
        const resp = await Axios.get("/emailAddressType");
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const addEmailAddressType = async (name: string) => {
    try {
        const resp = await Axios.post("/emailAddressType", { name });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const editEmailAddressType = async (id: string, name: string) => {
    try {
        const resp = await Axios.patch(`/emailAddressType/${id}`, { name });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteEmailAddressType = async (id: string) => {
    try {
        const resp = await Axios.delete(`/emailAddressType/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
