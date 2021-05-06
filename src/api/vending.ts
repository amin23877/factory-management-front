import Axios from 'axios';

export type IVending = {
    id?:string,
    VendorId: string,
    ItemId: string,
    leadTime: number,
    lastCheckedPrice: number,
    comment: string
}

export const createVending = async (data:IVending) => {
    try {
        const resp = await Axios.post('/vending', data);
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const getVendings = async () => {
    try {
        const resp = await Axios.get('/vending');
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const updateVending = async (id:string, data:IVending) => {
    try {
        const resp = await Axios.patch(`/vending/${id}`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const deleteVending = async (id:string) => {
    try {
        const resp = await Axios.delete(`/vending/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
}