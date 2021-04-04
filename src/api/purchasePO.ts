import Axios from 'axios';

export type IPurchasePO = {
    id?: number,
    number: string,
    requester: number,
    VendorId: number,
    ContactId: number,
    EmployeeId: number
}

export type IPurchasePOLine = {
    id?:number,
    ItemId: number,
    description: string,
    quantity: number,
    price: number,
    tax: boolean,
    index: number,
}

export const getPurchasePOs = async () => {
    try {
        const resp = await Axios.get('/purchasePo');
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const createPurchasePO = async (data:IPurchasePO) => {
    try {
        const resp = await Axios.post(`/purchasePo`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const updatePurchasePO = async (id:number, data:IPurchasePO) => {
    try {
        const resp = await Axios.patch(`/purchasePo/${id}`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const deletePurchasePO = async (id:number) => {
    try {
        const resp = await Axios.delete(`/purchasePo/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const getPurchasePOLines = async (id:number) => {
    try {
        const resp = await Axios.get(`/purchasePo/${id}/line`);
        return resp.data;
    } catch (error) { 
        throw error;
    }
}

export const createPurchasePOLine = async (id:number,data:IPurchasePOLine) => {
    try {
        const resp = await Axios.post(`/purchasePo/${id}/line`, data);
        return resp.data;    
    } catch (error) {
        throw error;
    }
}
