import Axios from "axios";

export interface ICustomerType {
    id?:string;
    inputValue?: string;
    name: string;
}

export const getCustomerTypes = async () => {
    try {
        const resp = await Axios.get("/customerType");
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const addCustomerType = async (name: string) => {
    try {
        const resp = await Axios.post("/customerType", { name });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const editCustomerType = async (id: string, name: string) => {
    try {
        const resp = await Axios.patch(`/customerType/${id}`, { name });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteCustomerType = async (id: string) => {
    try {
        const resp = await Axios.delete(`/customerType/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
