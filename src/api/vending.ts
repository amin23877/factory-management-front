import Axios from 'axios';

export type IVending = {
    id?:number,
    VendorId: number,
    ItemId: number,
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

export const updateVending = async (id:number, data:IVending) => {
    try {
        const resp = await Axios.patch(`/vending/${id}`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const deleteVending = async (id:number) => {
    try {
        const resp = await Axios.delete(`/vending/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
}