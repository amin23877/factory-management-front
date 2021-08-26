import Axios from "axios";

export interface IVendorType {
    id?: string;
    inputValue?: string;
    name: string;
}

export const getVendorTypes = async () => {
    try {
        const resp = await Axios.get("/vendortype");
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const addVendorType = async (name: string) => {
    try {
        const resp = await Axios.post("/vendortype", { name });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const editVendorType = async (id: string, name: string) => {
    try {
        const resp = await Axios.patch(`/vendortype/${id}`, { name });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteVendorType = async (id: string) => {
    try {
        const resp = await Axios.delete(`/vendortype/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
