import Axios from "axios";

export type IVendor = {
    id?: string;
    name: string;
    description: string;
};

export const createVendor = async (data: IVendor) => {
    try {
        const resp = await Axios.post("/vendor", data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const getVendors = async () => {
    try {
        const resp = await Axios.get("/vendor");
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const updateVendor = async (id: string, data: IVendor) => {
    try {
        const resp = await Axios.patch(`/vendor/${id}`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const deleteVendor = async (id: string) => {
    try {
        const resp = await Axios.delete(`/vendor/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const getVendorItems = async (VendorId: string) => {
    try {
        const resp = await Axios.get(`/vendor/${VendorId}/items`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const getItemVendors = async (itemId: string) => {
    try {
        const resp = await Axios.get(`/item/${itemId}/vendors`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const getVendorVendings = async (VendorId: string) => {
    try {
        const resp = await Axios.get(`/vending`, { params: { VendorId } });
        return resp.data;
    } catch (error) {
        throw error;
    }
};
